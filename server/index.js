const express = require("express");
const http = require("http");
const port = process.env.PORT || 8080;
const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const users = new Users();

const app = express();
const server = http.createServer(app);
const io = new Server(
  server,
  process.env.MODE === "stg"
    ? undefined
    : {
        cors: {
          origin: "http://localhost:3000",
        },
      }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/build"));

io.on("connection", (socket) => {
  socket.on("join", (params) => {
    socket.join(params.room);

    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit("updateUserList", users.getUserList(params.room));

    socket.emit(
      "newMessage",
      generateMessage("Admin", "Welcome to the chat app")
    );

    socket.broadcast
      .to(params.room)
      .emit(
        "newMessage",
        generateMessage("Admin", `${params.name} has joined.`)
      );
  });

  socket.on("createMessage", (message) => {
    let user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit(
        "newMessage",
        generateMessage(user.name, message.text)
      );
    }
  });

  socket.on("createLocationMessage", ({ latitude, longitude }) => {
    let user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "newLocationMessage",
        generateLocationMessage(user.name, latitude, longitude)
      );
    }
  });

  socket.on("disconnect", () => {
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit(
        "newMessage",
        generateMessage("Admin", `${user.name} has left the room.`)
      );
    }
  });
});

app.post("/login", (req, res) => {
  const { name, room } = req.body;

  if (!name || !room) {
    return res.json({ error: "Name and room name are required." });
  }

  return res
    .status(200)
    .json({ name, room, roles: { "perm.chat": true, "perm.about": true } });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
