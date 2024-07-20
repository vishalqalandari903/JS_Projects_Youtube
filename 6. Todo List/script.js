// HTML Elements
const todosContainer = document.querySelector(".todosContainer");
const todoForm = document.querySelector(".todoForm");
const todoFormInput = document.querySelector(".todoFormInput");
const todoFormButton = document.querySelector(".todoFormButton");

// localStorage.removeItem("todos");

// localStorage.setItem(
//   "todos",
//   JSON.stringify([
//     {
//       id: 1,
//       todo: "vishal",
//       completed: true,
//     },
//   ])
// );

let todos = getTodosFromLocalStorage();
todos.forEach((todo) => {
  createTodoElement(todo);
});

todoForm.addEventListener("submit", addTodo);

function getTodosFromLocalStorage() {
  let todosData = JSON.parse(localStorage.getItem("todos")) ?? [];
  return todosData;
}

function addTodo(e) {
  e.preventDefault();

  let todoValue = todoFormInput.value;
  if (todoValue.trim() !== "") {
    if (!todos.some((savedTodo) => savedTodo.todo == todoValue)) {
      let todoId = todos[todos.length - 1].id + 1;

      let todo = {
        todo: todoValue,
        id: todoId,
        completed: false,
      };

      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));

      createTodoElement(todo);

      todoFormInput.value = "";
    } else {
      // TODO : show error on duplicate add todo
      console.log("cannot add duplicate todo");
    }
  } else {
    // TODO : show error on empty add todo
    console.log("cannot add empty todo");
  }
}

function deleteTodo(todo, todoDiv) {
  todos = todos.filter((savedTodo) => savedTodo.id !== todo.id);
  localStorage.setItem("todos", JSON.stringify(todos));

  todosContainer.removeChild(todoDiv);
}

function completeTodo(todo, todoDiv) {
  let checkboxInput = todoDiv.querySelector(".todoCheckbox");
  let currentTodoIndex = todos.findIndex(
    (savedTodo) => savedTodo.id == todo.id
  );
  todos[currentTodoIndex].completed = checkboxInput.checked;
  localStorage.setItem("todos", JSON.stringify(todos));

  if (checkboxInput.checked) {
    let isTodoSaved = saveTodo(todo, todoDiv);
    if (isTodoSaved) {
      todoDiv.classList.add("completed");
    } else {
      todoDiv.classList.remove("completed");
      checkboxInput.checked = false;
    }
  } else {
    todoDiv.classList.remove("completed");
  }
}

function editTodo(todo, todoDiv) {
  let todoTextInput = todoDiv.querySelector(".todoText");
  let editTodoButton = todoDiv.querySelector(".editTodoButton");

  todoTextInput.classList.add("editable");
  todoTextInput.removeAttribute("readOnly");

  editTodoButton.innerHTML = '<i class="fa-solid fa-folder icon"></i>';
}

function saveTodo(todo, todoDiv) {
  let todoTextInput = todoDiv.querySelector(".todoText");
  let editTodoButton = todoDiv.querySelector(".editTodoButton");

  if (todoTextInput.value.trim() !== "") {
    if (
      !todos.some(
        (savedTodo) =>
          savedTodo.todo == todoTextInput.value && savedTodo.id !== todo.id
      )
    ) {
      let currentTodoIndex = todos.findIndex(
        (savedTodo) => savedTodo.id === todo.id
      );
      todos[currentTodoIndex].todo = todoTextInput.value;

      localStorage.setItem("todos", JSON.stringify(todos));

      todoTextInput.classList.remove("editable");
      todoTextInput.setAttribute("readOnly", true);
      editTodoButton.innerHTML = '<i class="fa-solid fa-pen icon"></i>';

      return true;
    } else {
      // TODO : show error on duplicate edit
      console.log("found duplicate on edit");
      return false;
    }
  } else {
    // TODO : show error on empty edit
    console.log("cannot empty on edit");
    return false;
  }
}

function createTodoElement(todo) {
  let todoDiv = document.createElement("div");
  todoDiv.className = `todo ${todo.completed ? "completed" : ""}`;

  let checkboxDiv = document.createElement("div");
  checkboxDiv.className = "checkbox-wrapper-15";

  let checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";
  checkboxInput.className = "inp-cbx todoCheckbox";
  checkboxInput.id = `cbx-${todo.id}`;
  checkboxInput.checked = todo.completed;

  checkboxInput.addEventListener("change", (e) => {
    completeTodo(todo, todoDiv);
  });

  let checkboxLabel = document.createElement("label");
  checkboxLabel.className = "cbx";
  checkboxLabel.setAttribute("for", `cbx-${todo.id}`);
  checkboxLabel.innerHTML =
    '<span><svg width="12px" height="9px" viewbox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span>';

  checkboxDiv.appendChild(checkboxInput);
  checkboxDiv.appendChild(checkboxLabel);

  let todoTextInput = document.createElement("input");
  todoTextInput.className = "todoText";
  todoTextInput.value = todo.todo;
  todoTextInput.setAttribute("readOnly", true);

  let editTodoButton = document.createElement("button");
  editTodoButton.className = "todoActionButton editTodoButton";
  editTodoButton.innerHTML = '<i class="fa-solid fa-pen icon"></i>';

  document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      if (document.activeElement === todoTextInput) {
        saveTodo(todo, todoDiv);
      }
    }
  });

  editTodoButton.addEventListener("click", (e) => {
    editTodoButton.blur();
    if (todoTextInput.classList.contains("editable")) {
      saveTodo(todo, todoDiv);
    } else {
      editTodo(todo, todoDiv);
    }
  });

  let deleteTodoButton = document.createElement("button");
  deleteTodoButton.className = "todoActionButton deleteTodoButton";
  deleteTodoButton.innerHTML = '<i class="fa-solid fa-trash icon"></i>';

  deleteTodoButton.addEventListener("click", (e) => {
    deleteTodo(todo, todoDiv);
  });

  todoDiv.appendChild(checkboxDiv);
  todoDiv.appendChild(todoTextInput);
  todoDiv.appendChild(editTodoButton);
  todoDiv.appendChild(deleteTodoButton);

  todosContainer.prepend(todoDiv);
}
