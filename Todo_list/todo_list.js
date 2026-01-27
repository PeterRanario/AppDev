function saveName() {
    const name = document.getElementById("username").value;
    document.getElementById("greeting").textContent = "Hello, " + name + "!";
    logActivity("User entered name: " + name);
}