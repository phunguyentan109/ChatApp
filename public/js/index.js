var socket = io();

socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("disconnect", () => {
    console.log("Disconnected from server");
});

socket.on("newMessage", ({from, text}) => {
    let li = $("<li></li>");
    li.text(`${from}: ${text}`);
    $("#messages").append(li);
});

$("#message-form").on("submit", (e) => {
    e.preventDefault();

    socket.emit("createMessage", {
        from: "User",
        text: $('[name=message]').val()
    }, () => console.log("[Got it]"));
})