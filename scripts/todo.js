"use strict";

// select element
const btnAdd = document.querySelector("#btn-add");
const inputTask = document.querySelector("#input-task");
const todoList = document.querySelector("#todo-list");
// kiểm tra người dùng đã đăng nhập hãy chưa? nếu đã đăng nhập thì tiến hành mở trang cho người dùng
if (localStorage.getItem("currUser")) {
  // tạo mãng todo để lưu thông tin lấy từ localStorage về
  let todo = [];
  if (localStorage.getItem("todoArr")) {
    todo = JSON.parse(localStorage.getItem("todoArr"));
  } else {
    localStorage.setItem("todoArr", JSON.stringify([]));
  }
  // khi người dùng nhấn vào nút add thì tiến hành thêm các instance vào todo
  btnAdd.addEventListener("click", function () {
    if (inputTask.value === "") {
      alert("Vui lòng nhập vào ô input Task !");
    } else {
      getStorage("currUser");
      let tast = new Task(inputTask.value, data.username, false);
      todo = JSON.parse(localStorage.getItem("todoArr"));
      todo.push(tast);
      localStorage.setItem("todoArr", JSON.stringify(todo));
      todo = JSON.parse(localStorage.getItem("todoArr"));
      filter(todo);
      inputTask.value = "";
    }
  });

  // render tast todo theo username của người dùng đang đăng nhập vào hệ thống ra ngoài cho người dùng xem
  const renderTask = function (tasts) {
    todoList.textContent = "";
    tasts.forEach((element) => {
      let check = "";
      if (element.isDone) {
        check = "checked";
      }
      // chèn các dữ liệu vào các tag mẫu
      let html = `
    <li data-index="${element.index}" class="${check}">${element.task}<span class="close">×</span></li>`;
      todoList.insertAdjacentHTML("beforeend", html);
    });
    todoList.addEventListener("click", tickTodo);
  };

  // lọc dữ liệu theo task theo username
  const filter = function (tasks) {
    getStorage("currUser");
    const list = tasks.filter((el, i) => {
      if (el.owner === data.username) {
        el.index = i;
        return el;
      }
    });
    // gọi lại hàm render để render những tast todo theo username của người dùng đang đăng nhập vào hệ thống ra ngoài cho người dùng xem
    renderTask(list);
  };
  // dữ liệu sẽ được lấy về từ localStorage khi dừng dùng mới đăng nhập vào để hiển thị ra cho người đùng xem
  todo = JSON.parse(localStorage.getItem("todoArr"));
  filter(todo);

  function tickTodo(el) {
    // khi người dùng nhấp vào tast công việc thì sẽ gạch ngang text để báo hiệu răng công việc tast này đã hoàn thành
    if (el.target.nodeName === "LI") {
      el.target.classList.toggle("checked");
      if (el.target.classList.contains("checked")) {
        todo = JSON.parse(localStorage.getItem("todoArr"));
        todo[Number(el.target.dataset.index)].isDone = true;
        localStorage.setItem("todoArr", JSON.stringify(todo));
      } else {
        todo = JSON.parse(localStorage.getItem("todoArr"));
        todo[Number(el.target.dataset.index)].isDone = false;
        localStorage.setItem("todoArr", JSON.stringify(todo));
      }
    } else {
      // nếu người dùng nhấn vào dẫu X thì sẽ xóa công việc hiện tại ra khỏi localStorage
      if (el.target.nodeName === "SPAN") {
        // đưa ra  thông báo để người dùng có muốn xóa công việc này hay không.
        let isdelete = confirm("Bạn có muốn xóa công việc này không?");
        if (isdelete) {
          todo = JSON.parse(localStorage.getItem("todoArr"));
          todo.splice(Number(el.target.parentElement.dataset.index), 1);
          localStorage.setItem("todoArr", JSON.stringify(todo));
          todo = JSON.parse(localStorage.getItem("todoArr"));
          filter(todo);
        }
      }
    }
  }
} else {
  // nếu người dùng chưa đăng nhập thì tiến hành đưa người dùng dến trang đăng nhập
  window.location.href = "../index.html";
}
