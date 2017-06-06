//Establish the WebSocket connection and set up event handlers
var webSocket = new WebSocket("ws://" + location.hostname + ":" + location.port + "/chat");
webSocket.onmessage = function (msg) { updateChat(msg); };
webSocket.onclose = function () { alert("WebSocket connection closed") };

id("send").addEventListener("click", function () {
    sendMessage(id("message").value);
});

id("message").addEventListener("keypress", function (e) {
    if (e.keyCode === 13) { sendMessage(e.target.value); }
});

function sendMessage(message) {
    if (message !== "") {
        webSocket.send(message);
        id("message").value = "";
    }
}

function updateChat(msg) {
    var data = JSON.parse(msg.data);
    id("chat").value += data.userMessage +"\n";
}

function id(id) {
    return document.getElementById(id);
}
