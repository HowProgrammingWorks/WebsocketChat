var username = prompt("Enter username!");
var ws;
if (username) {
    var ws = new WebSocket("ws://localhost:8085/chat");
    ws.onopen = function() {
        alert("Connection established!");
        sendMessageToServer(username + " joined to chat!");
    };

    ws.onmessage = function (data) {
        var message = JSON.parse(data.data);
console.log(message);
        document.getElementById("chatTextArea").value += message.time+" ["+message.sender+"] "+message.text+"\n";
    };

    ws.onclose = function() {
        alert("Connection is closed...");
    };
} else {
    alert("Username not entered!");
}

function sendMessage() {
    var element = document.getElementById("inputMessage");
    sendMessageToServer(element.value);
    element.value = "";
}

function sendMessageToServer(text) {
    if (text && ws) {
        var message = {
            sender: username,
            text: text
        }
        var content = JSON.stringify(message);
        ws.send(content);
    }
}