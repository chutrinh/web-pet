"use strict";

// selector element
const newsContainer = document.querySelector("#news-container");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const pageNum = document.querySelector("#page-num");

// kiểm tra người dùng đã đăng nhập vào hệ thống hay chưa, nếu chưa thì đưa người dùng về trang đăng nhập
if (!localStorage.getItem("currUser")) {
  newsContainer.classList.add("hidden");
  window.location.href = "../index.html";
} else {
  // nếu người dùng đã đăng nhập thì tiến hành mở trang cho người dùng
  newsContainer.classList.remove("hidden");
  // xữ lý sự kiện khi người dùng nhấn vào nút next chuyển trang
  let page = 1;
  let sum;
  btnNext.addEventListener("click", function () {
    btnPrev.classList.remove("hidden");
    page++;
    pageNum.textContent = page;
    API(
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
  // xữ lý sự kiện khi người dùng nhấn vào nút prev quay lại trang
  btnPrev.addEventListener("click", function () {
    btnNext.classList.remove("hidden");
    page--;
    pageNum.textContent = page;
    API(
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
  // lấy dự liệu từ API về xữ lý hiên thị cho người dùng xem
  const API = async function (
    country,
    numberPage,
    newsPerPage,
    newsCategory,
    apikey
  ) {
    try {
      // 0dce433255314c708487fa7cedc66e2f
      const respone = await fetch(
        `https://newsapi.org/v2/top-headlines?&country=${country}&category=${newsCategory}&pageSize=${newsPerPage}&page=${numberPage}&apiKey=${apikey}`
      );

      const data = await respone.json();
      renderArticle(data.articles);
      return data;
    } catch (error) {
      alert(error);
    }
  };
  // khi vừa nhấp vào trang thì hệ thống tự động mặc định sẽ mở một số trang bài viết cho người dùng
  getStorage("currUser");
  API(
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
    })
    .catch((error) => {
      alert(error);
    });
  // render bài viết lấy từ api về ra ngoài hiển thị cho người dùng xem
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
    }, 1000);
  };
}
// ----------------------------
