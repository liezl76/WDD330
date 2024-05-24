let menuToggle = document.getElementById("bars");
let menu = document.querySelector("nav span ul");
menuToggle.addEventListener("click", function () {
    menu.classList.toggle("show");
});