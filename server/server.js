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

    socket.on("disconnect", () => {
        console.log("All user are offline");
    })

    socket.emit("newMessage", {
        from: "Mike",
        text: "Hey, what's going on today?",
        createAt: 123
    });

    socket.on("createMessage", (newMessage) => {
        console.log("createmsg", newMessage);
    })
});

app.use(express.static(publicPath));

server.listen(port, () => console.log(`Server is running on port ${port}`));
