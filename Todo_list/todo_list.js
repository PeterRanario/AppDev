function saveName() {
    const name = document.getElementById("username").value;
    document.getElementById("greeting").textContent = "Hello, " + name + "!";
    logActivity("User entered name: " + name);
}

function logActivity(message) {
    const logList = document.getElementById("activityLog");
    const li = document.createElement("li");
    li.textContent = message;
    li.className = "log";
    logList.appendChild(li);
}