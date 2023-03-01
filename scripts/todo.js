"use strict";

if (activeUser) {
  console.log(activeUser);

  // Declare variable
  const todoList = document.getElementById("todo-list");
  const btnAdd = document.getElementById("btn-add");
  const inputTask = document.getElementById("input-task");
  // display todo list
  function displayTodoList() {
    let html = "";
    todoArr
      .filter((todo) => todo.owner === activeUser.username)
      .forEach((todo) => {
        html += `
    <li class=${todo.isDone ? "checked" : ""}>
    ${todo.task}
    <span class="close">x</span>
    </li>
    `;
      });
    todoList.innerHTML = html;

    // Attack events
    eventToggleTask();
    eventDeleteTask();
  }

  // Attack event when click into "x" button
  function eventDeleteTask() {
    document.querySelectorAll("#todo-list .close").forEach((element) => {
      element.addEventListener("click", function () {
        // Confirm that user is sure to delete
        if (confirm("Are you sure to delete this taks?!")) {
          // find element is to delete
          const deleteIndex = todoArr.findIndex(
            (indexEl) =>
              indexEl.task ===
                element.parentElement.textContent.slice(0, -6).trim() && //find task is to delete
              indexEl.owner === activeUser.username // find user
          );
          // delete element in todoArr
          todoArr.splice(deleteIndex, 1);
          // Save todoArr
          saveToStorage("todoArr", todoArr);
          // Display new task list
          displayTodoList();
        }
      });
    });
  }

  // Attack event when click into any task to check finishing
  function eventToggleTask() {
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (element) {
        // if dont click into "x" button
        if (element.target !== liEl.children[0]) {
          // remove or add "checked" to liEl
          liEl.classList.toggle("checked");
          // find task has just clicked on page
          const todo = todoArr.find(
            (todoItem) =>
              /* // Find position of x in string
          console.log(liEl.textContent.length);
          console.log(liEl.textContent.indexOf("x"));
          console.log(liEl.textContent.slice(0, -6)); */

              todoItem.owner === activeUser.username &&
              //compare text content that contains task after delete space and "x" string
              todoItem.task === liEl.textContent.slice(0, -6).trim()
          );
          // change isDone
          todo.isDone = liEl.classList.contains("checked") ? true : false;
          // save
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }

  /* MAIN */
  // Check logged in or not
  // display todo list when load page
  displayTodoList();

  // attack event when click into Add button
  btnAdd.addEventListener("click", function () {
    // check inputed or not
    //   console.log(inputTask.value);
    if (inputTask.value.trim().length === 0) {
      alert("Please input task content");
    } else {
      const todo = new Task(inputTask.value, activeUser.username, false);

      // add task into todoArr array
      todoArr.push(todo);
      // Save
      saveToStorage("todoArr", todoArr);
      // Show content
      displayTodoList();
      // delete content on input task
      inputTask.value = "";
    }
  });
} else {
  alert(
    "Please sign in before open todo lists!\n\nThe page will automaticaly forward to login page."
  );
  // Go to login page
  window.location.href = "../pages/login.html";
}
