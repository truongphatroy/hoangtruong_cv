"use strict";
// Create a Class User
class User {
  constructor(
    firstname,
    lastname,
    username,
    password,

    // Set default value
    pageSize = 20,
    category = "general"
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;

    // add for request No.9
    this.category = category;
    this.pageSize = pageSize;
  }
}

// Class includes infor for todo list
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
