var socket = io();

// JQuery handling
const scrollToBottom = () => {
    let messages = $("#messages");
    let newMessage = messages.children("li:last-child");

    let clientHeight = messages.prop("clientHeight");
    let scrollTop = messages.prop("scrollTop");
    let scrollHeight = messages.prop("scrollHeight");
    let newMessageHeight = newMessage.innerHeight();
    let secondNewMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + secondNewMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

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
    let params = $.deparam(window.location.search);

    socket.emit("join", params, (err) => {
        if(err) {
            alert(err);
            window.location.href = "/";
        } else {
            console.log("No error");
        }
    })
});

socket.on("disconnect", () => {
    console.log("Disconnected from server");
});

socket.on("updateUserList", (users) => {
    console.log("List", users);
})

socket.on("newMessage", ({from, text, createdAt}) => {
    let formattedTime = moment(createdAt).format("H:mm a");
    $("#messages").append(messageTemp(from, text, formattedTime));
    scrollToBottom();
});

socket.on("newLocationMessage", ({from, url, createdAt}) => {
    let formattedTime = moment(createdAt).format("H:mm a");
    $("#messages").append(locationTemp(from, url, formattedTime));
    scrollToBottom();
})

socket.on("updateUserList", (users) => {
    let ol = $(`<ol></ol>`);
    users.forEach(user => {
        ol.append($("<li></li>").text(user));
    })
    $("#users").html(ol);
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

// Render html
const messageTemp = (from, text, createdAt) => {
    return $(`
        <li class="message">
            <div class="message__title">
                <h4>${from}</h4>
                <span>${createdAt}</span>
            </div>
            <div class="message__body">
                <p>${text}</p>
            </div>
        </li>
    `)
}

const locationTemp = (from, url, createdAt) => {
    return $(`
        <li class="message">
            <div class="message__title">
                <h4>${from}</h4>
                <span>${createdAt}</span>
            </div>
            <div class="message__body">
                <a href="${url}" target="_blank">My current location</a>
            </div>
        </li>
    `)
}
