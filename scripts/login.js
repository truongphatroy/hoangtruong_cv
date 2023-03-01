"use strict";

// Declare variable
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const submitBtn = document.getElementById("btn-submit");

// Attache an event with submit button
submitBtn.addEventListener("click", function () {
  const isValidate = validate();
  if (validate) {
    // if all codition is OK
    // confirm username and password was registered
    const user = userArr.find(
      (element) =>
        // request both username and password are similar
        element.username === usernameInput.value &&
        element.password === passwordInput.value
    );

    if (user) {
      alert("Signed in successfully!");
      // save active user to storage web
      saveToStorage("activeUser", user);
      // go to home page
      window.location.href = "../index.html";
    } else {
      alert("User information is wrong! please check again!"); //display for check again
    }
  }
});

// Validate function
function validate() {
  let isValidate = true;
  //   check username is null or not
  if (usernameInput.value === "") {
    alert("Please input username");
    isValidate = false;
  }
  // check password is null or not
  if (passwordInput.value === "") {
    alert("Please input Password");
    isValidate = false;
  }
  return isValidate;
}
