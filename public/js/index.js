var socket = io();

// JQuery handling
let txtForm = $("#message-form");
let txtbox = $("[name=message]");

txtForm.on("submit", (e) => {
    e.preventDefault();

    socket.emit("createMessage", {
        from: "User",
        text: txtbox.val()
    }, () => txtbox.val(""));
})

// Socket handling
socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("disconnect", () => {
    console.log("Disconnected from server");
});

socket.on("newMessage", ({from, text, createdAt}) => {
    let formattedTime = moment(createdAt).format("H:mm a");
    let li = $("<li></li>");
    li.text(`${from} ${formattedTime}: ${text}`);
    $("#messages").append(li);
});

socket.on("newLocationMessage", (message) => {
    let formattedTime = moment(message.createdAt).format("H:mm a");
    let li = $(`<li></li>`);
    let a = $(`<a target="_blank">My current location</a>`);
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    $("#messages").append(li);
})

let locationButton = $("#send-location");
locationButton.on("click", () => {
    if(!navigator.geolocation){
        return alert("Geolocation is not supported by your browser!");
    }

    locationButton.attr("disabled", "disabled").text("Sending location...");

    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr("disabled").text("Send location");
        const {latitude, longitude} = position.coords;
        socket.emit("createLocationMessage", {latitude, longitude});
    }, () => {
        locationButton.removeAttr("disabled").text("Send location");
        alert("Unable to fetch location.");
    })
})
