const kp1 = document.querySelector("#password");
const kp2 = document.querySelector("#password2");
const message = document.querySelector("#formmessage");

kp2.addEventListener("focusout", checkSame);

function checkSame() {
    if (kp1.value !== kp2.value) {
        showMessage("❗ Passwords DO NOT MATCH!");
        kp2.style.backgroundColor = "#fff0f3";
        kp2.value = "";
        kp2.focus();
    } else {
        hideMessage();
        kp2.style.backgroundColor = "#fff";
        kp2.style.color = "#000";
    }
}

function showMessage(msg) {
    message.textContent = msg;
    message.style.visibility = "visible";
}

function hideMessage() {
    message.style.visibility = "hidden";
}

document.getElementById('pagerating').addEventListener('input', function () {
    document.getElementById('ratingValue').innerText = this.value;
});

function validateForm() {
    // Existing form validation logic

    // If validation passes, redirect to record.html
    window.location.href = 'record.html';

    return false; // To prevent the default form submission
}