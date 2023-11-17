"use strict";

// Selec element
const loginModal = document.querySelector("#login-modal");
const welcomeMessage = document.querySelector("#welcome-message");
const btnLogout = document.querySelector("#btn-logout");
// kiểm tra đã đăng nhập hay chưa?
if (localStorage.getItem("currUser")) {
  let user = JSON.parse(localStorage.getItem("currUser"));
  loginModal.classList.add("hidden");
  welcomeMessage.textContent = "Wellcome " + user.username;
  btnLogout.classList.remove("hidden");
} else {
  loginModal.classList.remove("hidden");
  btnLogout.classList.add("hidden");
}
// xữ lý sự kiện click để logout
btnLogout.addEventListener("click", function () {
  localStorage.removeItem("currUser");
  loginModal.classList.remove("hidden");
  welcomeMessage.textContent = "";
  btnLogout.classList.add("hidden");
});
