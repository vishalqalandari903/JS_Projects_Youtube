// HTML Elements
const todosContainer = document.querySelector(".todosContainer");
const todoForm = document.querySelector(".todoForm");
const todoFormInput = document.querySelector(".todoFormInput");
const todoForButton = document.querySelector(".todoFormButton");
// localStorage.removeItem("todos");

let todos = getTodosFromLocalStorage();

todos.forEach((todo) => {
  createTodoElement(todo);
});

todoForm.addEventListener("submit", addTodo);

function getTodosFromLocalStorage() {
  let initialState = [];
  let todosData = JSON.parse(localStorage.getItem("todos")) ?? initialState;

  return todosData;
}

function addTodo(e) {
  e.preventDefault();

  let todoText = todoFormInput.value;

  if (!todos.some((todo) => todo.todo == todoText)) {
    let todoId = todos[todos.length - 1].id + 1;

    let todo = {
      todo: todoText,
      id: todoId,
      completed: false,
    };

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    createTodoElement(todo);

    todoFormInput.value = "";
  } else {
    // TODO : Show error on duplicate
  }
}

function deleteTodo(e, todoDiv, todo) {
  todos = todos.filter((savedTodo) => savedTodo.id !== todo.id);
  localStorage.setItem("todos", JSON.stringify(todos));

  todosContainer.removeChild(todoDiv);
}

function completeTodo(e, todoDiv, todoCheckbox, todoTextInput, todo) {
  let currentTodoIndex = todos.findIndex(
    (savedTodo) => savedTodo.id == todo.id
  );

  if (todoCheckbox.checked) {
    todoDiv.classList.add("completed");
  } else {
    todoDiv.classList.remove("completed");
  }

  todoTextInput.classList.remove("editable");
  todoTextInput.setAttribute("readOnly", true);

  todoDiv.querySelector(".editTodoButton").innerHTML =
    '<i class="fa-solid fa-pen icon"></i>';
  if (todoTextInput.value == "") {
    todoTextInput.value = todos[currentTodoIndex].todo;
  } else {
    if (todos.some((savedTodo) => savedTodo.todo == todo.todo)) {
      todoTextInput.value = todos[currentTodoIndex].todo;
    }
  }

  todos[currentTodoIndex].completed = todoCheckbox.checked;

  localStorage.setItem("todos", JSON.stringify(todos));
}

function editTodo(e, todoTextInput, todoEditButton) {
  todoTextInput.removeAttribute("readOnly");
  todoTextInput.classList.add("editable");
  todoTextInput.focus();

  todoEditButton.innerHTML = '<i class="fa-solid fa-folder icon"></i>';
}

function saveTodo(e, todoTextInput, todoEditButton, todo) {
  if (todoTextInput.value !== "") {
    if (
      !todos.some(
        (savedTodo) =>
          savedTodo.todo == todoTextInput.value && saveTodo.id == todo.id
      )
    ) {
      todoTextInput.classList.remove("editable");
      todoEditButton.innerHTML = '<i class="fa-solid fa-pen icon"></i>';
      todoTextInput.setAttribute("readOnly", true);

      let currentTodoIndex = todos.findIndex(
        (savedTodo) => savedTodo.id == todo.id
      );
      todos[currentTodoIndex].todo = todoTextInput.value;
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      // TODO : Show error on duplicate edit
    }
  } else {
    // TODO : Show error on empty edit
  }
}

function createTodoElement(todo) {
  const todoDiv = document.createElement("div");
  todoDiv.className = `todo ${todo.completed ? "completed" : ""}`;

  const todoCheckboxDiv = document.createElement("div");
  todoCheckboxDiv.className = "checkbox-wrapper-15";

  const todoCheckboxInput = document.createElement("input");
  todoCheckboxInput.className = "inp-cbx todoCheckbox";
  todoCheckboxInput.id = `cbx-${todo.id}`;
  todoCheckboxInput.type = "checkbox";
  todoCheckboxInput.checked = todo.completed;

  todoCheckboxInput.addEventListener("change", (e) => {
    completeTodo(e, todoDiv, todoCheckboxInput, todoTextInput, todo);
  });

  const todoCheckboxLabel = document.createElement("label");
  todoCheckboxLabel.className = "cbx";
  todoCheckboxLabel.setAttribute("for", `cbx-${todo.id}`);

  todoCheckboxLabel.innerHTML =
    '<span><svg width="12px" height="9px" viewbox="0 0 12 9"> <polyline points="1 5 4 8 11 1"></polyline></svg></span>';

  todoCheckboxDiv.appendChild(todoCheckboxInput);
  todoCheckboxDiv.appendChild(todoCheckboxLabel);

  const todoTextInput = document.createElement("input");
  todoTextInput.value = todo.todo;
  todoTextInput.className = "todoText";
  todoTextInput.setAttribute("readOnly", true);

  const todoEditButton = document.createElement("button");
  todoEditButton.className = "editTodoButton todoActionButton";
  todoEditButton.innerHTML = '<i class="fa-solid fa-pen icon"></i>';

  todoEditButton.addEventListener("click", (e) => {
    if (todoTextInput.classList.contains("editable")) {
      saveTodo(e, todoTextInput, todoEditButton, todo);
    } else {
      editTodo(e, todoTextInput, todoEditButton);
    }
  });

  const todoDeleteButton = document.createElement("button");
  todoDeleteButton.className = "deleteTodoButton todoActionButton";
  todoDeleteButton.innerHTML = '<i class="fa-solid fa-trash icon"></i>';

  todoDeleteButton.addEventListener("click", (e) => {
    deleteTodo(e, todoDiv, todo);
  });

  todoDiv.appendChild(todoCheckboxDiv);
  todoDiv.appendChild(todoTextInput);
  todoDiv.appendChild(todoEditButton);
  todoDiv.appendChild(todoDeleteButton);

  todosContainer.prepend(todoDiv);
}
