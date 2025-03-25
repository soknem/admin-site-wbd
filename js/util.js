import { handleIsDoneCountLoading } from "./today.js";
import { handleSidebarCountLoading } from "./side-bar.js";
import { handleWorkIsDoneCountLoading } from "./work.js";
import { toggleTodoImportant } from "./api.js";
export function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container");

  toastContainer.innerHTML = "";

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
        <span>${message}</span>
        <button class="close-btn">&times;</button>
    `;

  toast.querySelector(".close-btn").addEventListener("click", () => {
    removeToast(toast);
  });

  toastContainer.appendChild(toast);

  setTimeout(() => removeToast(toast), 3500);
}

export function removeToast(toast) {
  toast.style.animation = "fadeOut 0.5s ease-out";
  setTimeout(() => toast.remove(), 200);
}

export function showLoading(isLoading) {
  const overlay = document.getElementById("loading-overlay");
  const rightSide = document.getElementById("right-side");

  if (isLoading) {
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "all";
    rightSide.classList.add("blur-background");
  } else {
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    rightSide.classList.remove("blur-background");
  }
}

export function handleToggleTodoImportantClick() {
  const rightSide = document.getElementById("right-side");
  if (!rightSide) {
    console.error("Error: Right-side element not found!");
    return;
  }

  rightSide.addEventListener("click", async function (event) {
    event.stopPropagation();
    if (event.target && event.target.classList.contains("important-btn")) {
      const importantIcon = event.target;
      const item = importantIcon.closest(".item");
      const uuid = item ? item.dataset.uuid : null;
      const section = item ? item.dataset.section : null;

      alert(item.innerHTML)

      if (uuid) {
        try {
          
          const todo = await toggleTodoImportant(uuid);
          if (todo) {
            alert(uuid)
            item.remove();
            handleSidebarCountLoading();
            if (section === "myDay") {
              handleIsDoneCountLoading();
            } else if (section === "work") {
              handleWorkIsDoneCountLoading();
            }
            showToast("Task is done!", "success");
          }
        } catch (error) {
          showToast("Failed to update todo status!" + error, "error");
        }
      }
    }
  });
}
