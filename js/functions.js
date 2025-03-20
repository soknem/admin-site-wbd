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
  const header = document.querySelector(".main-today .header");

  hamburgerBtn.addEventListener("click", function () {
    if (sideBar.style.display === "none" || sideBar.style.display === "") {
   
      sideBar.style.display = "flex";

      header.classList.remove("sidebar-hidden");
      console.log("Sidebar is visible");
    } else {
      
      sideBar.style.display = "none";
     
      header.classList.add("sidebar-hidden");
      console.log("Sidebar is hidden");
    }
  });
}

// Function to handle active sidebar
export function handleActiveSidebar() {
  const menuItems = document.querySelectorAll(".side-bar .item");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });
}

export function handleSidebarContentLoading() {
  const rightSide = document.getElementById("right-side");
  const menuItems = document.querySelectorAll(".side-bar .item");

  function loadContent(url) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        const bodyContent = extractBodyTag(data);
        if (bodyContent) {
          rightSide.innerHTML = bodyContent;
        } else {
          console.warn("No content found in the fetched file.");
        }
      })
      .catch((error) => {
        console.error("Error loading content:", error);
      });
  }

  function extractBodyTag(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.outerHTML;
  }

  loadContent("html/today.html");

  // Add click event listeners to menu items
  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      const page = this.getAttribute("data-page");
      loadContent(page);
    });
  });
}
