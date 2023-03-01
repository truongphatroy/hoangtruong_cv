"use strict";

// Declare Varialbe
const firstnameInput = document.getElementById("input-firstname");
const lastnameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const SubmitBtn = document.getElementById("btn-submit");
const passwordConfirmInput = document.getElementById("input-password-confirm");

// Validate function
function validate(user) {
  let isValidate = true;

  // fildes was input or not
  if (user.firstname.trim().length === 0) {
    alert("Please input Firstname!");
    isValidate = false;
  }
  if (user.lastname.trim().length === 0) {
    alert("Please input Lastname!");
    isValidate = false;
  }
  if (user.username.trim().length === 0) {
    alert("Please input Username!");
    isValidate = false;
  }

  if (user.password === "") {
    alert("Please input Password!");
    isValidate = false;
  }
  if (passwordConfirmInput === "") {
    alert("Please input Confirm Password!");
    isValidate = false;
  }
  // Check user was registered or not
  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].username === user.username) {
      alert("Username you input is registered!\n\nPlease try to input others!");
      isValidate = false;
      break;
    }
  }
  // check password and c/* MAIN */onfirm password should same
  if (user.password !== passwordConfirmInput.value) {
    alert("Password and Confirm password are difference!");
    isValidate = false;
  }
  // password have to more than 8 letters
  if (user.password.length <= 8) {
    alert("Letter number of Password has to more than 8 letters!");
    isValidate = false;
  }

  return isValidate;
}
/* MAIN */

// Event at Resgister button
SubmitBtn.addEventListener("click", function () {
  //take data from user
  const user = new User(
    firstnameInput.value,
    lastnameInput.value,
    usernameInput.value,
    passwordInput.value
  );
  // console.log(user);

  // Check Validate
  const isValidate = validate(user);
  if (isValidate) {
    // add user into userArr
    userArr.push(user);
    // save to storage web
    saveToStorage("userArr", userArr);
    alert("Register finished!");

    // go to login page
    window.location.href = "./login.html";
  }
});
