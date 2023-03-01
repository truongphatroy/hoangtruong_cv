"use strict";

/* MAIN */
if (activeUser) {
  // Declare variable
  const pageSizeInput = document.getElementById("input-page-size");
  const categoryInput = document.getElementById("input-category");
  const btnSubmit = document.getElementById("btn-submit");

  // Validate function
  function validate() {
    let isValidate = true;
    // check page size content = 0 or was not input
    if (+pageSizeInput.value <= 0) {
      alert("The number of news per page is invalid!");
      isValidate = false;
    }
    return isValidate;
  }

  // setting button event
  btnSubmit.addEventListener("click", function () {
    // check validate
    if (validate()) {
      // Update new infor for activeUser
      activeUser.category = categoryInput.value.toLowerCase();
      activeUser.pageSize = pageSizeInput.value;

      // save activeUser to storage web
      saveToStorage("activeUser", activeUser);
      // Update new infor for userArr
      const index = userArr.findIndex(
        (userIndex) =>
          //find element in userArr
          userIndex.username === activeUser.username
      );
      userArr[index] = activeUser; // update infor of the element
      saveToStorage("userArr", userArr); //save
      // display OK
      alert("Setting successfully!");
      pageSizeInput.value = "";
      categoryInput.value = categoryInput.children[0].value;
    }
  });
} else {
  // Display infor to comback login page
  alert(
    "Please sign in before setting news!\n\nThe page will automaticaly forward to login page."
  );
  // Go to login page
  window.location.href = "../pages/login.html";
}
