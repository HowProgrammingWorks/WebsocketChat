var username = prompt("Enter username!");
var ws;
if (username) {
    var ws = new WebSocket("ws://localhost:8085/chat");
    ws.onopen = function() {
        alert("Connection established!");
        ws.send(username + " joined to chat!");
    };

    ws.onmessage = function(evt) {
        document.getElementById("chatTextArea").value += evt.data+"\n";
    };

    ws.onclose = function() {
        alert("Connection is closed...");
    };
} else {
    alert("Username not entered!");
}

function sendMessage() {
    var message = document.getElementById("inputMessage").value;
    if (message&&ws) {
        var content = "[" + username + "] " + message;
        ws.send(content);
    }
}