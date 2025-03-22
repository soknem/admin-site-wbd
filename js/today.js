import { showToast, showLoading } from "./util.js";
import { addTodo, deleteTodo, getTodos } from "./api.js";

export function handleAddButtonClick() {
  const rightSide = document.getElementById("right-side");

  rightSide.addEventListener("click", async function (event) {
    const ul = rightSide.querySelector(".ul");

    if (!ul) {
      console.error("Error: UL element not found!");
      return;
    }

    if (event.target && event.target.id === "add-btn") {
      const textInput = rightSide.querySelector(
        ".main-today .add-container .input-container .text-input"
      );

      if (textInput && textInput.value.trim() !== "") {
        try {
          showLoading(true);

          const newTodo = await addTodo({
            title: textInput.value,
            description: "No description",
            dateLine: "2024-06-30",
          });

          console.log(newTodo);

          if (newTodo && newTodo.uuid) {
            const ul = rightSide.querySelector(".ul");
            addTodoToList(ul, newTodo);
            showToast("Successfully added!", "success");
            textInput.value = "";
          } else {
            showToast("Failed to add todo!", "error");
          }
        } catch (error) {
          console.error("Error adding todo:", error);
          showToast("Failed to add todo!", "error");
        } finally {
          showLoading(false);
        }
      } else {
        showToast("Input field is empty!", "warning");
      }
    }

    // Handle delete button click
    if (event.target && event.target.classList.contains("delete-btn")) {
      const liToDelete = event.target.closest("li");
      const todoUuid = liToDelete.dataset.uuid;

      if (todoUuid) {
        try {
          showLoading(true);
          await deleteTodo(todoUuid);
          liToDelete.remove();
          showLoading(false);
          showToast("Successfully deleted!", "success");
        } catch (error) {
          showToast("Failed to delete todo!", "error");
        }
      }
    }
  });
}

export async function handleLoadContentToToday() {
  const rightSide = document.getElementById("right-side");
  if (!rightSide) {
    console.error("Error: Right-side element not found!");
    return;
  }

  const checkUlExists = setInterval(() => {
    const ul = rightSide.querySelector(".ul");
    if (ul) {
      clearInterval(checkUlExists);
      ul.innerHTML = "";
      loadTodos(ul);
    } else {
      console.log("Waiting for ul to be available...");
    }
  }, 1);
}

async function loadTodos(ul) {
  try {
    showLoading(true);
    const todos = await getTodos();
    console.log("Fetched todos:", todos);
    todos.forEach((todo) => {
      if (!todo) {
        console.error("Invalid todo object:", todo);
        return;
      }
      addTodoToList(ul, todo);
    });
  } catch (error) {
    console.error("Error loading todos:", error);
    showToast("Failed to load todos!", "error");
  } finally {
    showLoading(false);
  }
}

// 📌 Helper function to add a todo to the list
export function addTodoToList(ul, todo) {
  console.log(todo);
  if (!todo || !todo.uuid) {
    console.error("Todo object is invalid or does not have uuid:", todo);
    return;
  }

  const newItem = document.createElement("li");
  newItem.classList.add("item");
  newItem.dataset.uuid = todo.uuid;
  newItem.innerHTML = `
    <input type="radio" class="circle" />
    <span class="title">${todo.title}</span>
    <span class="material-icons-outlined delete-btn">delete</span>
  `;
  ul.appendChild(newItem);
}
