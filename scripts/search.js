"use strict";

// selector element
const newsContainer = document.querySelector("#news-container");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const pageNum = document.querySelector("#page-num");
const inputQuery = document.querySelector("#input-query");
const btnSubmit = document.querySelector("#btn-submit");
// kiểm tra người dùng đã đăng nhập hãy chưa? nếu chưa thì chuyển hướng người dùng đến trang đăng nhập
if (!localStorage.getItem("currUser")) {
  newsContainer.classList.add("hidden");
  window.location.href = "../index.html";
} else {
  // nếu người dùng đã đăng nhập tiến hành mở trang cho người dùng
  newsContainer.classList.remove("hidden");
  btnNext.classList.add("hidden");
  btnPrev.classList.add("hidden");
  pageNum.classList.add("hidden");
  // xữ lý sự kiện khi người dùng nhấn vào nút next để chuyển sang trang tiếp theo
  let page = 1;
  let sum;
  btnNext.addEventListener("click", function () {
    btnPrev.classList.remove("hidden");
    page++;
    pageNum.textContent = page;
    // truyền các tham số vào hàm API để lấy dữ liệu về
    API(
      inputQuery.value,
      "us",
      page,
      data.newsPerPage,
      data.newsCategory,
      "44e8ff0482704a579fdfb2af002d2900"
    )
      .then((el) => {
        sum = sum + el.articles.length;
        if (sum >= el.totalResults) {
          btnNext.classList.add("hidden");
        }
      })
      .catch((error) => {
        alert(error);
      });
  });
  // xữ lý sự kiện khi người dùng nhấn vào nút prev để quay lại trang
  btnPrev.addEventListener("click", function () {
    btnNext.classList.remove("hidden");
    page--;
    pageNum.textContent = page;
    // truyền các tham số vào hàm API để lấy dữ liệu về
    API(
      inputQuery.value,
      "us",
      page,
      data.newsPerPage,
      data.newsCategory,
      "44e8ff0482704a579fdfb2af002d2900"
    )
      .then((el) => {
        sum = sum - el.articles.length;
        if (page === 1) {
          btnPrev.classList.add("hidden");
        }
      })
      .catch((error) => {
        alert(error);
      });
  });
  // lấy dữ liệu từ API về để hiển thị ra cho người dùng
  const API = async function (
    search,
    country,
    numberPage,
    newsPerPage,
    newsCategory,
    apikey
  ) {
    try {
      const respone = await fetch(
        `https://newsapi.org/v2/top-headlines?&country=${country}&category=${newsCategory}&q=${search}&pageSize=${newsPerPage}&page=${numberPage}&apiKey=${apikey}`
      );

      const data = await respone.json();
      renderArticle(data.articles);
      return data;
    } catch (error) {
      alert(error);
    }
  };
  // xữ lý sự kiện khi nhấn vào nút search
  btnSubmit.addEventListener("click", function () {
    if (inputQuery.value === "") {
      alert("Vui lòng nhập ô tìm kiếm bài viết !");
    } else {
      page = 1;
      sum = 0;
      btnNext.classList.remove("hidden");
      btnPrev.classList.remove("hidden");
      pageNum.classList.remove("hidden");
      pageNum.textContent = page;
      getStorage("currUser");
      // truyền các tham số vào hàm API để lấy dữ liệu về
      API(
        inputQuery.value,
        "us",
        page,
        data.newsPerPage,
        data.newsCategory,
        "44e8ff0482704a579fdfb2af002d2900"
      )
        .then((el) => {
          if (el.articles.length) {
            sum = el.articles.length;
            btnPrev.classList.add("hidden");
          }
          if (sum >= el.totalResults) {
            btnNext.classList.add("hidden");
          }
          if (el.totalResults === 0) {
            btnPrev.classList.add("hidden");
            btnNext.classList.add("hidden");
            alert("Không tìm thấy bài viết với từ khóa hiện tại đang nhập !");
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  });

  // render kết quả tìm kiếm bài viết lấy từ dữ liệu API ra ngoài hiển thị cho người dùng xem
  const renderArticle = function (arrArticle) {
    newsContainer.textContent = "";
    let counter = 0;
    // kiểm tra link hình ảnh có lỗi hay không? nếu có thì đưa ra thông báo cho người dùng.
    arrArticle.forEach((article, i) => {
      function checkImg() {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = article.urlToImage;
          if (!article.title) {
            article.title = "không có dữ liệu";
          }
          if (!article.description) {
            article.description = "không có dữ liệu";
          }
          img.addEventListener("load", function () {
            resolve();
          });
          img.addEventListener("error", function () {
            counter++;
            reject();
          });
        });
      }
      checkImg()
        .then((el) => {
          render("card");
        })
        .catch((error) => {
          article.urlToImage = "";
          render("");
        });
      function render(card) {
        let html = `<div class=" ${card} flex-row flex-wrap"> 
        <div class="card mb-3" style="">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src= "${article.urlToImage}" 
                class="card-img" 
                alt="hình ảnh này không tồn tại">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${article.description}</p>
                <a href= ${article.url} class="btn btn-primary">View</a>
              </div>
            </div>
          </div>
        </div>
      </div>`;
        // chèn bài viết vào thẻ cha
        newsContainer.insertAdjacentHTML("beforeend", html);
      }
    });
    setTimeout(() => {
      if (counter > 0) {
        alert(`Có ${counter} hình ảnh bài viết không thể hiển thị !`);
      }
    }, 0);
  };
}
// ---------------------------
