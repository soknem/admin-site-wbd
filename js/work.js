import { showToast, showLoading } from "./util.js";
import { addTodo, deleteTodo, getTodos, toggleTodoDone } from "./api.js";
import { handleSidebarCountLoading } from "./side-bar.js";

export function handleWorkAddButtonClick() {
  const rightSide = document.getElementById("right-side");

  const attachInputEventListener = () => {
    const textInput = rightSide.querySelector(
      ".main-work .add-container .input-container .text-input"
    );

    if (textInput) {
      textInput.removeEventListener("keydown", handleEnterKey);
      textInput.addEventListener("keydown", handleEnterKey);
    }
  };

  async function handleEnterKey(event) {
    if (event.key === "Enter" && document.activeElement === event.target) {
      await addTodoItem();
    }
  }

  const observer = new MutationObserver(() => {
    attachInputEventListener();
  });

  observer.observe(rightSide, { childList: true, subtree: true });

  rightSide.addEventListener("click", async function (event) {
    event.stopPropagation();
    const ul = rightSide.querySelector(".ul");
    if (!ul) {
      console.error("Error: UL element not found!");
      return;
    }

    if (event.target && event.target.id === "add-btn") {
      await addTodoItem();
    }

    if (event.target && event.target.classList.contains("delete-btn")) {
      const liToDelete = event.target.closest("li");
      const todoUuid = liToDelete.dataset.uuid;

      if (todoUuid) {
        try {
          showLoading(true);
          await deleteTodo(todoUuid);
          liToDelete.remove();
          handleSidebarCountLoading();
          showLoading(false);
          showToast("Successfully deleted!", "success");
        } catch (error) {
          showToast("Failed to delete todo!", "error");
        }
      }
    }
  });

  async function addTodoItem() {
    const textInput = rightSide.querySelector(
      ".main-work .add-container .input-container .text-input"
    );

    if (textInput && textInput.value.trim() !== "") {
      try {
        showLoading(true);
        const newTodo = await addTodo({
          title: textInput.value,
          description: null,
          deadLine: new Date(Date.now()).toISOString().split("T")[0],
          isMyDay: true,
          isImportant: false,
        });

        if (newTodo && newTodo.uuid) {
          const ul = rightSide.querySelector(".main-work .data .ul");
          addTodoToList(ul, newTodo, "section");
          handleSidebarCountLoading();
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
}

export async function handleLoadContentToWork() {
  const rightSide = document.getElementById("right-side");
  if (!rightSide) {
    console.error("Error: Right-side element not found!");
    return;
  }

  const observer = new MutationObserver((mutations, obs) => {
    const ul = rightSide.querySelector(".main-work .data .ul");
    if (ul) {
      obs.disconnect();
      ul.innerHTML = "";
      loadTodos(ul);
    }
  });

  observer.observe(rightSide, { childList: true, subtree: false });
}

async function loadTodos(ul) {
  try {
    showLoading(true);
    const todos = await getTodos("task");
    console.log("Fetched todos:", todos);

    ul.innerHTML = "";

    todos.forEach((todo) => {
      if (!todo) {
        console.error("Invalid todo object:", todo);
        return;
      }
      addTodoToList(ul, todo, "work");
    });
  } catch (error) {
    console.error("Error loading todos:", error);
    showToast("Failed to load todos!", "error");
  } finally {
    showLoading(false);
  }
}

export function addTodoToList(ul, todo, section) {
  if (!todo || !todo.uuid) {
    console.error("Todo object is invalid or does not have uuid:", todo);
    return;
  }

  const existingItem = ul.querySelector(`[data-uuid="${todo.uuid}"]`);
  if (existingItem) return;

  const newItem = document.createElement("li");
  newItem.classList.add("item");
  newItem.dataset.uuid = todo.uuid;
  newItem.dataset.section = section;
  newItem.innerHTML = `
      <input type="checkbox" class="circle" ${todo.isDone ? "checked" : ""} />
      <span class="title">${todo.title}</span>
      <span class="material-icons-outlined delete-btn">delete</span>
    `;

  ul.appendChild(newItem);
}

export function handleWorkToggleTodoClick() {
  const rightSide = document.getElementById("right-side");
  if (!rightSide) {
    console.error("Error: Right-side element not found!");
    return;
  }

  rightSide.addEventListener("change", async function (event) {
    event.stopPropagation();
    if (event.target && event.target.classList.contains("circle")) {
      const checkbox = event.target;
      const item = checkbox.closest(".item");
      const uuid = item ? item.dataset.uuid : null;

      if (uuid) {
        try {
          await toggleTodoDone(uuid);
          if (checkbox.checked) {
            handleSidebarCountLoading();
            showToast("Task is done!", "success");
            item.remove();
          }
        } catch (error) {
          showToast("Failed to update todo status!", "error");
        }
      }
    }
  });
}

export function handleWorkLiClick() {
  const rightSide = document.getElementById("right-side");
  if (!rightSide) {
    console.error("Error: Right-side element not found!");
    return;
  }

  rightSide.addEventListener("click", async function (event) {
    event.stopPropagation();
    if (event.target && event.target.classList.contains("title")) {
      const item = event.target.closest(".item");
      const uuid = item ? item.dataset.uuid : null;
      const section = item.dataset.section;
      if (section === "work") {
        alert("uuid:" + uuid+section);
      }
    }
  });
}
