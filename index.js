const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require("./utils/message");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var server = http.createServer(app);
var io = socketIO(server);

io.on("connection", (socket) => {

    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));

    socket.broadcast.emit("hasJoin", generateMessage("Admin", "New user has joined"));

    socket.on("createMessage", ({from, text}, cb) => {
        console.log("createMessage", {from, text});
        io.emit("newMessage", generateMessage(from, text));
        cb()
    })

    socket.on("createLocationMessage", ({latitude, longitude}) => {
        io.emit("newLocationMessage", generateLocationMessage("Admin", latitude, longitude));
    })

    socket.on("disconnect", () => {
        console.log("All user are offline");
    })
});

app.get("/", (req, res) => res.render("index"));

server.listen(port, () => console.log(`Server is running on port ${port}`));
