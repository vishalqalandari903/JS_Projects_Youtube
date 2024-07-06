const todoForm = document.querySelector(".todoForm");
const todoFormInput = document.querySelector(".todoFormInput");
const todoFormButton = document.querySelector(".todoFormButton");
const todosContainer = document.querySelector(".todosContainer");
// localStorage.removeItem("todos");
// localStorage.setItem(
//   "todos",
//   JSON.stringify([
//     {
//       id: 1,
//       todo: "Hello",
//       completed: true,
//     },
//     {
//       id: 2,
//       todo: "Vishal",
//       completed: false,
//     },
//   ])
// );

let todos = getTodosFromLocalStorage();
console.log(todos);

todos.map((todo) => {
  createTodoElement(todo);
});

todoForm.addEventListener("submit", (e) => {
  addTodo(e, todoFormInput.value);
  todoFormInput.value = "";
});

function addTodo(e, todoText) {
  e.preventDefault();

  if (todoFormInput.value.trim() !== "") {
    const todo = {
      id: todos[todos.length - 1].id + 1,
      todo: todoText,
      completed: false,
    };

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    createTodoElement(todo);
  }
}

function deleteTodo(e, todoElement, todo) {
  todosContainer.removeChild(todoElement);

  todos = todos.filter((savedTodo) => savedTodo.id !== todo.id);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function completeTodo(e, todoElement, todo, checkBox) {
  const indexOfTodo = todos
    .reverse()
    .findIndex((savedTodo) => savedTodo.id == todo.id);
  todos[indexOfTodo].completed = checkBox.checked;

  todos.reverse();

  localStorage.setItem("todos", JSON.stringify(todos));

  if (checkBox.checked) {
    todoElement.classList.add("completed");
  } else {
    todoElement.classList.remove("completed");
  }
}

function editTodo(e, editButton, todoInput, todoCheckbox) {
  if (!todoCheckbox.checked) {
    Array.from(todosContainer.querySelectorAll(".todo")).map((todo) => {
      todo.querySelector(".editTodoButton").innerHTML =
        '<i class="fa-solid fa-pen icon"></i>';

      todo.querySelector(".todoText").classList.remove("editable");
    });

    editButton.innerHTML = '<i class="fa-solid fa-folder icon"></i>';
    todoInput.classList.add("editable");
    todoInput.removeAttribute("readOnly");
  }
}

function saveTodo(e, editButton, todoInput, todo) {
  const newTodoText = todoInput.value;
  editButton.innerHTML = '<i class="fa-solid fa-pen icon"></i>';
  todoInput.classList.remove("editable");
  todoInput.setAttribute("readOnly", true);

  const todoIndex = todos
    .reverse()
    .findIndex((savedTodo) => savedTodo.id == todo.id);
  todos[todoIndex].todo = newTodoText;
  todos.reverse();

  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromLocalStorage() {
  return JSON.parse(localStorage.getItem("todos"));
}

function createTodoElement(todo) {
  const todoDiv = document.createElement("div");
  todoDiv.className = `todo ${todo.completed ? "completed" : ""}`;

  const checkboxDiv = document.createElement("div");
  checkboxDiv.className = "checkbox-wrapper-15";

  const checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";
  checkboxInput.checked = todo.completed;
  checkboxInput.className = "inp-cbx todoCheckbox";
  checkboxInput.id = todo.id;

  checkboxInput.addEventListener("change", (e) => {
    completeTodo(e, todoDiv, todo, checkboxInput);
  });

  const checkboxLabel = document.createElement("label");
  checkboxLabel.className = "cbx";
  checkboxLabel.setAttribute("for", todo.id);
  checkboxLabel.innerHTML =
    '<span> <svg width="12px" height="9px" viewbox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span>';

  checkboxDiv.appendChild(checkboxInput);
  checkboxDiv.appendChild(checkboxLabel);

  const todoTextInput = document.createElement("input");
  todoTextInput.value = todo.todo;
  todoTextInput.className = "todoText";
  todoTextInput.setAttribute("readOnly", true);

  const editButton = document.createElement("button");
  editButton.className = "editTodoButton todoActionButton";
  editButton.innerHTML = '<i class="fa-solid fa-pen icon"></i>';

  editButton.addEventListener("click", (e) => {
    if (!todoTextInput.classList.contains("editable")) {
      editTodo(e, editButton, todoTextInput, checkboxInput);
    } else {
      saveTodo(e, editButton, todoTextInput, todo);
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "deleteTodoButton todoActionButton";
  deleteButton.innerHTML = '<i class="fa-solid fa-trash icon"></i>';

  deleteButton.addEventListener("click", (e) => {
    deleteTodo(e, todoDiv, todo);
  });

  document.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      if (document.activeElement === todoTextInput) {
        saveTodo(e, editButton, todoTextInput, todo);
      }
    }
  });

  todoDiv.appendChild(checkboxDiv);
  todoDiv.appendChild(todoTextInput);
  todoDiv.appendChild(editButton);
  todoDiv.appendChild(deleteButton);

  todosContainer.prepend(todoDiv);
}
