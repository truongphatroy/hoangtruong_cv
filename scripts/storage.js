"use strict";

// Save to Storage Web
function saveToStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

// Reading data from Storage Web
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// JS Object into Class Instance Function for userData
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,

    // add more items for search page
    userData.pageSize,
    userData.category
  );

  return user;
}

// JS Object into Class Instance Function for taskData
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}

/* MAIN */

/* FOR USER ARRRY */
// get data from Storage Web
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
console.log(users);

// change into Class Instance
const userArr = users.map((user) => parseUser(user));
console.log(userArr);

/* FOR ACTIVE USER ARRRY */
// Get data active user
let activeUser = getFromStorage("activeUser")
  ? parseUser(getFromStorage("activeUser"))
  : null;

/* FOR TODO LIST ARRRY */
// Get data for todo list from Storage Web
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

// Change obj todoArr to Class instance format
const todoArr = todos.map((todo) => parseTask(todo));
