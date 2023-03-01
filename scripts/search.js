"use strict";

if (activeUser) {
  // DECLARE VARIABLE
  const navPageNum = document.getElementById("nav-page-num");
  const inputQuery = document.getElementById("input-query");
  const btnSubmit = document.getElementById("btn-submit");

  const newsContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const pageNum = document.getElementById("page-num");

  //   setting start
  let totalResults = 0;
  let keywords = "";
  navPageNum.style.display = "none";
  // Get news when load page

  // DECLARE FUNCTION
  // Check condition to show or hide button prev/next
  function checkBtnPrev() {
    // console.log(pageNum);
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }

  // Check conditon of next button
  function checkBtnNext() {
    if (pageNum.textContent == Math.ceil(totalResults / activeUser.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }

  // renderNews Function
  function renderNews(data) {
    // asign value to number of articles
    totalResults = data.totalResults;

    // check next/prev button
    checkBtnPrev();
    checkBtnNext();

    let html = "";
    // Create and add HTML code
    data.articles.forEach((article) => {
      html += `
        <div class="row bg-light mb-2">
          <div class="col-sm-3" style ="max-width:160px">
            <div class="card" style="width: 10rem;">
              <img src=${
                article.urlToImage
                  ? article.urlToImage
                  : "../image/no-image.jpg"
              } 
              class="card-img-top" alt="...">
            </div>
          </div>
          <div class="col-sm-9">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${
                article.description ? article.description : ""
              }</p>
              <a href="${article.url}" class="btn btn-primary">View</a>
            </div>
          </div>
        </div>`;
    });
    newsContainer.innerHTML = html;
  }

  /* MAIN */
  // Search button click event
  btnSubmit.addEventListener("click", function () {
    pageNum.textContent = "1";
    newsContainer.innerHTML = "";
    // check condition of input
    if (inputQuery.value.trim().length === 0) {
      // Hide page number
      navPageNum.style.display = "none";
      alert("Please input keyword for search!");
    } else {
      keywords = inputQuery.value;
      // render news
      getDataNewsWithKeyword(keywords, 1);
    }
  });

  // Get data from API
  async function getDataNewsWithKeyword(keywords, page) {
    try {
      // Connect to API to get data
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${activeUser.pageSize}&page=${page}&apiKey=d075d66e45b14a69a21acb7a14b68719`
      );
      // other apiKey for test: c795fab8fea34c868f749998341e9540
      const data = await res.json();
      console.log(data);

      // Check status error and rate limited error
      if (data.status === "error" && data.code === "rateLimitied") {
        // console.log(data.message);
        throw new Error(data.message);
      }

      // Check errro open application without cross localhost
      if (data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }

      // check if result has no article
      if ((data.totalResults = 0)) {
        // Hide page changing button
        navPageNum.style.display = "none";
        throw new Error(
          "There are not any article fit to your keywords!\n/n Please again with others."
        );
      }

      // Display page changing button
      navPageNum.style.display = "block";

      // Display news
      //   console.log(data);
      renderNews(data);
    } catch (err) {
      // display error
      alert("Error: " + err.message);
    }
  }

  // Attack event when click on prev button
  btnPrev.addEventListener("click", function () {
    getDataNewsWithKeyword(keywords, --pageNum.textContent);
  });
  // Attack event when click on next button
  btnNext.addEventListener("click", function () {
    getDataNewsWithKeyword(keywords, ++pageNum.textContent);
  });
} else {
  // Display infor to comback login page
  alert(
    "Please sign in before open news page!\n\nThe page will automaticaly forward to login page."
  );
  // Go to login page
  window.location.href = "../pages/login.html";
}
