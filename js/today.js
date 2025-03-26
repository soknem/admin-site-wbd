import { showToast, showLoading } from "./util.js";
import {
  addTodo,
  deleteTodo,
  getTodos,
  toggleTodoDone,
  getTodoCountIsDone,
  getMyDayDate,
  toggleTodoImportant,
} from "./api.js";
import { handleSidebarCountLoading } from "./side-bar.js";

export function handleAddButtonClick() {
  const rightSide = document.getElementById("right-side");

  const attachInputEventListener = () => {
    const textInput = rightSide.querySelector(
      ".main-today .add-container .input-container .text-input"
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
      const section = liToDelete.dataset.section;

      if (todoUuid) {
        try {
          showLoading(true);
          await deleteTodo(todoUuid);
          liToDelete.remove();
          handleSidebarCountLoading();
          if (section === "myDay") {
            handleIsDoneCountLoading();
          }
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
      ".main-today .add-container .input-container .text-input"
    );

    if (textInput && textInput.value.trim() !== "") {
      try {
        showLoading(true);
        const newTodo = await addTodo({
          title: textInput.value,
          description: null,
          deadLine: null,
          isMyDay: true,
          isImportant: false,
        });

        if (newTodo && newTodo.uuid) {
          const ul = rightSide.querySelector(".main-today .data .ul");
          addTodoToList(ul, newTodo, "myDay");
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

export async function handleLoadContentToToday() {
  const rightSide = document.getElementById("right-side");
  if (!rightSide) {
    console.error("Error: Right-side element not found!");
    return;
  }

  const observer = new MutationObserver((mutations, obs) => {
    const ul = rightSide.querySelector(".main-today .data .ul");
    handleMyDayDateLoading();
    if (ul) {
      obs.disconnect();
      ul.innerHTML = "";
      loadTodos(ul);
    }
  });

  observer.observe(rightSide, { childList: true, subtree: true });
}

async function loadTodos(ul) {
  try {
    showLoading(true);
    const todos = await getTodos("myDay");
    console.log("Fetched todos:", todos);
    handleIsDoneCountLoading();
    todos.forEach((todo) => {
      if (!todo) {
        console.error("Invalid todo object:", todo);
        return;
      }
      addTodoToList(ul, todo, "myDay");
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

  const newItem = document.createElement("li");
  newItem.classList.add("item");
  newItem.dataset.uuid = todo.uuid;
  newItem.dataset.section = section;

  newItem.innerHTML = `
    <input type="checkbox" class="circle" ${todo.isDone ? "checked" : ""} />
    <span class="title">${todo.title}</span>
    <span class="material-icons-outlined delete-btn btn-icon">delete</span>
    <span class="material-icons-outlined important-btn btn-icon">${
      todo.isImportant ? "star" : "star_rate"
    }</span>
  `;
  ul.appendChild(newItem);
}

export function handleToggleTodoClick() {
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
      const section = item ? item.dataset.section : null;

      if (uuid) {
        try {
          const todo = await toggleTodoDone(uuid);
          if (checkbox.checked) {
            handleSidebarCountLoading();
            showToast("Task is done!", "success");
            item.remove();
            const ul = rightSide.querySelector(
              ".main-today .data .dropdown-content"
            );
            addTodoToList(ul, todo, "myDay");
          } else if (!checkbox.checkbox) {
            handleSidebarCountLoading();
            showToast("Task is remove from done!", "success");
            item.remove();
            const ul = rightSide.querySelector(".main-today .data .ul");
            addTodoToList(ul, todo, "myDay");
          }

          if (section === "myDay") {
            handleIsDoneCountLoading();
          }
        } catch (error) {
          showToast("Failed to update todo status!", "error");
        }
      }
    }
  });
}

export function handleLiClick() {
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
      const section = item ? item.dataset.section : null;
      if (section === "myDay") {
        alert("uuid:" + uuid + section);
      } else if (section === "search") {
        alert("uuid:" + uuid + section + "??");
      }
    }
  });
}

export function handleDropdownToggle() {
  const rightSide = document.getElementById("right-side");
  if (!rightSide) {
    console.error("Right-side element not found!");
    return;
  }

  rightSide.addEventListener("click", async function (event) {
    event.stopPropagation();
    const dropDownHeader = event.target.closest(".drop-down-header");

    if (dropDownHeader) {
      const dropdownContent = dropDownHeader.nextElementSibling;
      const arrowIcon = dropDownHeader.querySelector(".arrow-icon");

      if (dropdownContent) {
        const isShown = dropdownContent.classList.toggle("show");

        if (arrowIcon) {
          dropDownHeader.classList.toggle("rotate-down");
        }

        if (isShown) {
          dropDownHeader.style.outline = "none";
        } else {
          dropDownHeader.style.boxShadow =
            "inset 0px -1px 0px 0px rgba(185, 183, 182, 0.623)";
        }

        // Fetch and populate only when showing
        if (isShown && dropdownContent.childElementCount === 0) {
          try {
            showLoading(true);
            const todos = await getTodos("taskDone");
            if (todos.length === 0) {
              dropdownContent.innerHTML = "<p>No completed tasks.</p>";
            } else {
              todos.forEach((todo) => {
                addTodoToList(dropdownContent, todo, "myDay");
              });
            }
          } catch (error) {
            console.error("Error loading completed todos:", error);
            dropdownContent.innerHTML = "<p>Failed to load data.</p>";
          } finally {
            showLoading(false);
          }
        }

        if (!isShown) {
          dropdownContent.innerHTML = "";
        }
      }
    }
  });
}

export async function handleIsDoneCountLoading() {
  const rightSide = document.getElementById("right-side");
  if (!rightSide) {
    console.error("Error: Right-side element not found!");
    return;
  }

  const doneCount = rightSide.querySelector(
    ".main-today .data .drop-down-header .done-count"
  );

  if (doneCount) {
    const myDayCountIsDone = await getTodoCountIsDone("myDay");
    doneCount.innerText = myDayCountIsDone.done;
  }
}

export async function handleMyDayDateLoading() {
  const rightSide = document.getElementById("right-side");
  if (!rightSide) {
    console.error("Error: Right-side element not found!");
    return;
  }

  const myDateDateElm = rightSide.querySelector(
    ".main-today .header .column1 .item1 .day-detail"
  );

  if (myDateDateElm) {
    const myDayDate = await getMyDayDate();
    myDateDateElm.innerText = myDayDate.date;
  }
}
