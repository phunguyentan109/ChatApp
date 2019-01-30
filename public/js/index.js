var socket = io();

// JQuery handling
$("#message-form").on("submit", (e) => {
    e.preventDefault();

    socket.emit("createMessage", {
        from: "User",
        text: $('[name=message]').val()
    }, () => console.log("[Got it]"));
})

// Socket handling
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

socket.on("newLocationMessage", (message) => {
    let li = $(`<li></li>`);
    let a = $(`<a target="_blank">My current location</a>`);
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $("#messages").append(li);
})

let locationButton = $("#send-location");
locationButton.on("click", () => {
    if(!navigator.geolocation){
        return alert("Geolocation is not supported by your browser!");
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords;
        socket.emit("createLocationMessage", {latitude, longitude});
    }, () => alert("Unable to fetch location."))
})
