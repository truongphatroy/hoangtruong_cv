"use strict";

if (activeUser) {
  // DECLARE VARIABLE
  const newsContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const pageNum = document.getElementById("page-num");
  // console.log(pageNum);
  let totalResults = 0;
  // Get news when load page
  getDataNews("us", 1);

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

  // displayNews Function
  function displayNews(data) {
    // asign value to number of articles
    totalResults = data.totalResults;
    console.log(data);

    // check next/prev button
    checkBtnPrev();
    checkBtnNext();

    let html = "";
    // Add HTML to display content news
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
  // Get data from API
  async function getDataNews(country, page) {
    try {
      // Connect to API to get data
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${activeUser.pageSize}&category=${activeUser.category}&page=${page}&apiKey=d075d66e45b14a69a21acb7a14b68719`
      );
      // other apiKey for test: c795fab8fea34c868f749998341e9540

      const data = await res.json();
      // console.log(data);

      // Check status error and rate limited error
      if (data.status === "error" && data.code === "rateLimitied") {
        // console.log(data.message);
        throw new Error(data.message);
      }

      // Check errro open application without cross localhost
      if (data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }

      // Display news
      // console.log(data);

      displayNews(data);
    } catch (err) {
      // display error
      alert("Error: " + err.message);
    }
  }

  // Attack event when click on prev button
  btnPrev.addEventListener("click", function () {
    getDataNews("us", --pageNum.textContent);
  });
  // Attack event when click on next button
  btnNext.addEventListener("click", function () {
    getDataNews("us", ++pageNum.textContent);
  });
} else {
  // Display infor to comback login page
  alert(
    "Please sign in before open news page!\n\nThe page will automaticaly forward to login page."
  );
  // Go to login page
  window.location.href = "../pages/login.html";
}
