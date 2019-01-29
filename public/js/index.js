var socket = io();

socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("newMessage", (message) => {
    console.log("New message", message);
});

socket.on("hasJoin", (message) => {
    console.log(message);
})

socket.on("Welcome", (message) => {
    console.log(message);
})

socket.on("disconnect", () => {
    console.log("Disconnected from server");
});
