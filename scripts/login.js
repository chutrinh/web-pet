"use strict";
// selecelement
const btnSubmit = document.querySelector("#btn-submit");
const inputUsername = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");
// xữ lý sự kiện khi nhấn nút logout
btnSubmit.addEventListener("click", function () {
  // kiểm tra xát nhận dữ liệu đã được nhập vào các trường hay chưa ?
  (function () {
    let isvalidate = true;
    if (inputUsername.value === "") {
      alert("Vui lòng nhập  username!");
      isvalidate = false;
    }
    if (inputPassword.value === "") {
      alert("Vui lòng nhập  password!");
      isvalidate = false;
    }
    // nếu đủ điều kiện thì tiến hành đăng nhập vào hệ thống
    if (isvalidate) {
      let islogin = false;
      getStorage(userArr);
      data.forEach((el, i) => {
        if (
          el.username === inputUsername.value &&
          el.password === inputPassword.value
        ) {
          localStorage.setItem("currUser", JSON.stringify(el));
          islogin = true;
        }
      });
      // hiển thị thông báo cho người dùng đã đăng nhập thành công
      if (islogin) {
        alert("Đăng nhập thành công 🎇");
        inputUsername.value = "";
        inputPassword.value = "";
        window.location.href = "../index.html";
      } else {
        // hiển thị thông báo cho người dùng đã đăng nhập thất bại
        alert(
          "Đăng nhập thất bại, Vui lòng kiểm tra lại thông tin tài khoản 😥"
        );
      }
    }
  })();
});

// --------------------
