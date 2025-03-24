// functions.js
// Function to handle search input
export function handleSearchInput() {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.querySelector(".clear-btn");

  searchInput.addEventListener("input", function () {
    toggleClearButtonVisibility(searchInput.value);
  });

  function toggleClearButtonVisibility(value) {
    clearBtn.style.display = value ? "block" : "none";
  }
}

// Function to handle clear button click
export function handleClearButtonClick() {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.querySelector(".clear-btn");

  clearBtn.addEventListener("click", function () {
    clearSearchInput();
  });

  function clearSearchInput() {
    searchInput.value = "";
    clearBtn.style.display = "none";
    searchInput.blur();
  }
}

export function handleHamburgerButtonClick() {
  const hamburgerBtn = document.getElementById("menuToggle");
  const sideBar = document.getElementById("side-bar");
  const rightSide = document.getElementById("right-side");

  hamburgerBtn.addEventListener("click", function () {
    const activeMenu = document.querySelector(".side-bar .item.active");

    const header = rightSide.querySelector(".main-today .header");

    if (sideBar.style.display === "none" || sideBar.style.display === null) {
      sideBar.style.display = "flex";
      if (header) {
        header.classList.remove("sidebar-hidden");
      }
    } else {
      sideBar.style.display = "none";

      if (activeMenu && activeMenu.id === "todayMenu") {
        if (header) {
          header.classList.add("sidebar-hidden");
        }
      } else {
        console.log("for other page");
      }
    }
  });
}

