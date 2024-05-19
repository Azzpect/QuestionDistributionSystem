//message event handlers
function showMessage(type, message) {
    document.querySelector(".message-container").style.display = "flex";
    document.querySelector(".message-container").style.backgroundColor = type === "error"? "red": "green";
    document.querySelector(".message-container>.message-body").innerHTML = `${type.toUpperCase()}! ${message}`;
}
function hideMessage() {
    document.querySelector(".message-container").style.display = "none";
}

//form submission
async function formSubmission(uri, options) {
    return new Promise(async (resolve, reject) => {
        try {
           const res = await fetch(uri, options);
           const data = await res.json();
           if(data.status != "success") {
            throw new Error(data.message);
           }
           resolve(data);
        } catch (err) {
            reject({status: "error", message: err.message});
        }
    })
}