"use strict";

// DECLARE VARIABLE
const loginModal = document.querySelector("#login-modal");
const mainContent = document.querySelector("#main-content");
const welcomeMessage = document.querySelector("#welcome-message");
const logoutBtn = document.querySelector("#btn-logout");

/* DECLARE FUNCTION */
/**
 * Display Home page according to active information
 */
function displayHome() {
  if (activeUser) {
    // hide login modal
    loginModal.style.display = "none";
    // show main content block
    mainContent.style.display = "block";
    // show welcome message
    welcomeMessage.innerHTML = `Welcom ${activeUser.username}`;
  } else {
    // display login modal
    loginModal.style.display = "block";
    // show main content block
    mainContent.style.display = "none";
  }
}
/* MAIN */
displayHome();

/**
 * Event when click on Logout button
 */
logoutBtn.addEventListener("click", function () {
  const logoutConfirm = confirm("Are sure to logout?!");
  if (logoutConfirm) {
    // Set activeUser is null
    activeUser = null;
    // Save to storage web
    saveToStorage("activeUser", activeUser);
    // display to comeback beginning window
    displayHome();
  }
});
