"use strict";
// tạo biến key để truyền vào phương thức localStorage
let userArr = "userArr";
// tạo mãng data để chứa dữ liệu
let data = [];
// tạo hàm lưu dữ liệu lên localStorage
const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};
// tạo hàm để lấy dữ liệu từ localStorage xuống
const getStorage = function (key) {
  data = JSON.parse(localStorage.getItem(key));
};
// kiểm tra xem ô dữ liệu đã được tạo ở localStorage hay chưa? nếu chưa thì tiến hành tạo ô dữ liệu
if (!localStorage.getItem(userArr)) {
  saveToStorage(userArr, data);
} else {
  // nếu đã được tạo ô dữ liệu từ localStorage rồi thì tiến hành lấy dữ liệu xuống
  getStorage(userArr);
}
