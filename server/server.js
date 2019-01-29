const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const {generateMessage} = require("./utils/message");

const app = express();
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);

io.on("connection", (socket) => {

    socket.emit("Welcome", generateMessage("Admin", "Welcome to the chat app"));

    socket.broadcast.emit("hasJoin", generateMessage("Admin", "New user has joined"));

    socket.on("createMessage", ({from, text}) => {
        console.log("createMessage", {from, text});
        io.emit("newMessage", generateMessage(from, text));
    })

    socket.on("disconnect", () => {
        console.log("All user are offline");
    })
});

app.use(express.static(publicPath));

server.listen(port, () => console.log(`Server is running on port ${port}`));
