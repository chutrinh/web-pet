"use strict";

// selec element
const inputPageSize = document.querySelector("#input-page-size");
const inputCategory = document.querySelector("#input-category");
const btnSubmit = document.querySelector("#btn-submit");
// kiểm tra người dùng đã đăng nhập hãy chưa? nếu đã đăng nhập thì tiến hành mở trang cho người dùng
if (localStorage.getItem("currUser")) {
  // xữ lý sự kiện khi nhấn nút
  btnSubmit.addEventListener("click", function () {
    // kiêm tra xát nhận người dùng đã nhập dữ liêu vào các trường hay chưa?
    let isCheck = true;
    if (inputPageSize.value === "") {
      isCheck = false;
      alert("Vui lòng nhập số lượng bài viết !");
    }
    if (inputCategory.value === "General") {
      isCheck = false;
      alert("Vui lòng nhập danh mục của tin tức !");
    }
    // nếu người dùng đã nhập dữ liệu vào các trường thì tiến hành hiển thị trang bài viết theo như người dùng đã nhập
    if (isCheck) {
      getStorage("currUser");
      data.newsPerPage = inputPageSize.value;
      data.newsCategory = inputCategory.value;
      saveToStorage("currUser", data);
      inputPageSize.value = "";
      inputCategory.value = "General";
      alert("Cập nhật bài viết thành công !");
      // sau khi cập nhập bài viết thành công tiến hành chuyển hướng trang người dùng đến trang news để hiển thị nội dung
      window.location.href = "../pages/news.html";
    }
  });
} else {
  // nếu người dùng chưa đăng nhập thì chuyển hướng người dùng đến trang đăng nhập
  window.location.href = "../index.html";
}
