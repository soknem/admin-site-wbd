import { showToast } from "./functions.js";

export function handleAddButtonClick() {
  const rightSide = document.getElementById("right-side");

  rightSide.addEventListener("click", function (event) {
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
        const itemCount = ul.children.length + 1;

        // Create new list item
        const newItem = document.createElement("li");
        newItem.classList.add("item", `item${itemCount}`);
        newItem.id = `item${itemCount}`;

        newItem.innerHTML = `
          <input type="radio" class="circle" />
          <span class="title">${textInput.value}</span>
          <span class="material-icons-outlined delete-btn" id="delete-btn${itemCount}">delete</span>
        `;

        ul.appendChild(newItem);
        textInput.value = "";
          showToast("Successfully added!", "success");
      } else {
        showToast("Input field is empty!", "warning");
      }
    }

    // Handle delete button click
    if (event.target && event.target.classList.contains("delete-btn")) {
      const liToDelete = event.target.closest("li");
      if (liToDelete) {
        liToDelete.remove();
      }
    }
  });
}

export function testToast() {
  // showToast("Successfully added!", "success");
  // showToast("Something went wrong!", "error");
}
