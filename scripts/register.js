"use strict";

// selector element
const btnSubmit = document.querySelector("#btn-submit");
const inputFirstName = document.querySelector("#input-firstname");
const inputLastName = document.querySelector("#input-lastname");
const inputUsername = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");
const inputPasswordConfirm = document.querySelector("#input-password-confirm");
// sử dụng tính chất thừa kế của oop để áp dụng cho việc thừa kế các tính chất từ class User
class Register extends User {
  constructor(firstName, lastName, username, password, confirmPassword) {
    super(firstName, lastName, username, password);
    this.confirmPassword = confirmPassword;
  }
  // kiểm tra xác nhận dữ liệu người dùng đã nhập vào các trường
  validate() {
    let isValidate = true;
    if (this.firstName === "") {
      alert("Please enter first Name");
      isValidate = false;
    }
    if (this.lastName === "") {
      alert("Please enter Last Name");
      isValidate = false;
    }
    if (this.username === "") {
      alert("Please enter Username");
      isValidate = false;
    } else {
      getStorage(userArr);
      data.forEach((el) => {
        if (el.username === this.username) {
          alert("Username must be Unique!");
          isValidate = false;
        }
      });
    }
    if (this.password === "") {
      alert("Please enter Password");
      isValidate = false;
    } else {
      if (this.password.length < 8) {
        alert("Vui lòng nhập mật khẫu ít nhất 8 ký tự");
        isValidate = false;
      }
    }
    if (this.confirmPassword === "") {
      alert("Please confirm Password");
      isValidate = false;
    } else {
      if (this.password !== this.confirmPassword) {
        alert("Mật khẫu xát nhận không trùng khớp !");
        isValidate = false;
      }
    }
    let dataArr = {};
    // nếu xát nhận các trường nhập đầy đủ vào hớp lý thì cho phép tiến hành đăng ký
    if (isValidate) {
      return (dataArr = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword,
        newsPerPage: 5,
        newsCategory: "sport",
      });
    }
  }
}

// xữ lý sự kiện khi click vào nút đăng ký thì sẽ đăng ký user người dùng
btnSubmit.addEventListener("click", function () {
  const register = new Register(
    inputFirstName.value,
    inputLastName.value,
    inputUsername.value,
    inputPassword.value,
    inputPasswordConfirm.value
  );
  const dataValidated = register.validate();
  // nếu phương thức validate() có trả về dữ liệu tức có nghĩa là dữ liệu nhập vào hợp lý, tức có nghĩa rằng biến dataValidated là true.
  if (dataValidated) {
    data.push(dataValidated);
    saveToStorage(userArr, data);
    // hiện thị thông báo người dùng đã đăng ký thành công
    alert("Đăng ký thành công 🎇");
    // reset trang trường input
    inputFirstName.value = "";
    inputLastName.value = "";
    inputUsername.value = "";
    inputPassword.value = "";
    inputPasswordConfirm.value = "";
    // chuyển hướng người dùng đến trang đăng nhập sau khi đã đăng ký thành công
    window.location.href = "../pages/login.html";
  }
});
