//message event handlers
function showMessage(type, message) {
    document.querySelector(".message-container").style.display = "flex";
    document.querySelector(".message-container").style.backgroundColor = type === "error"? "red": "green";
    document.querySelector(".message-container>.message-body").innerHTML = `${type.toUpperCase()}! ${message}`;
}
function hideMessage() {
    document.querySelector(".message-container").style.display = "none";
}