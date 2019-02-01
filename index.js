const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on("connection", (socket) => {

    socket.on("join", (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback("Name and room name are required.");
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit("updateUserList", users.getUserList(params.room));
        socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has joined.`));

        callback();
    })

    socket.on("createMessage", ({from, text}, cb) => {
        console.log("createMessage", {from, text});
        io.emit("newMessage", generateMessage(from, text));
        cb()
    })

    socket.on("createLocationMessage", ({latitude, longitude}) => {
        io.emit("newLocationMessage", generateLocationMessage("Admin", latitude, longitude));
    })

    socket.on("disconnect", () => {
        let user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left the room.`));
        }
    })
});

app.get("/", (req, res) => res.render("index"));

app.get("/chat", (req, res) => res.render("chat"));

server.listen(port, () => console.log(`Server is running on port ${port}`));
