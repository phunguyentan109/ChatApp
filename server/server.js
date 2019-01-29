const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.emit("Welcome", {
        from: "Admin",
        text: "Welcome to the chat app!"
    })

    socket.broadcast.emit("hasJoin", {
        from: "Admin",
        text: "A new user has joined"
    })

    socket.on("createMessage", (message) => {
        console.log("createMessage", message);
        io.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit("newMessage", {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    })

    socket.on("disconnect", () => {
        console.log("All user are offline");
    })
});

app.use(express.static(publicPath));

server.listen(port, () => console.log(`Server is running on port ${port}`));
