import { loadContent } from "./side-bar.js";
import { handleLoadContentToToday, addTodoToList } from "./today.js";
import { searchTodos } from "./api.js";
import { showLoading } from "./util.js";

let isFocus = false;

export function handleSearchCountLoading(total) {
  const rightSide = document.getElementById("right-side");
  if (!rightSide) {
    console.error("Error: Right-side element not found!");
    return;
  }

  const searchCount = document.getElementById("search-count");
  searchCount.innerText = total;
}

export function handleGlobalSearchClick() {
  const searchInput = document.getElementById("searchInput");

  if (!searchInput) return;

  searchInput.addEventListener("click", searchInputClickEvent);
  searchInput.addEventListener("focusout", searchInputBlurEvent);
  searchInput.addEventListener("input", searchInputChangeEvent);
  searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Backspace" && searchInput.value.trim() === "") {
      searchInputChangeEvent(event);
      const searchNotFound = document.getElementById("search-notfound");
      searchNotFound.classList.add("show");
      const searchingItem = document.getElementById("searching-item");
      searchingItem.innerText = `កំពុងស្វែងរក""`;
    }
  });
}

function searchInputClickEvent(event) {
  if (isFocus) {
    event.preventDefault();
    return;
  }

  const menuItems = document.querySelectorAll(".side-bar .item");
  const isAnyActive = [...menuItems].some((item) =>
    item.classList.contains("active")
  );

  menuItems.forEach((item) => item.classList.remove("active"));

  if (!isFocus && isAnyActive) {
    loadContent("html/search.html");
  }
  isFocus = true;

  const searchValue = event.target.value.trim();
  handleSearchVisibility(searchValue);
}

function searchInputBlurEvent(event) {
  if (!event.relatedTarget || !event.relatedTarget.closest("#searchInput")) {
    isFocus = false;
    const searchValue = event.target.value.trim();
    handleSearchVisibility(searchValue);
    const searchNotFound = document.getElementById("search-notfound");
    if (searchValue === "") {
      const clearBtn = document.querySelector(".clear-btn");
      const todayMenu = document.getElementById("todayMenu");
      clearSearchInput();

      function clearSearchInput() {
        searchInput.value = "";
        clearBtn.style.display = "none";
        // searchInput.blur();
        isFocus = false;

        loadContent("html/today.html");
        handleLoadContentToToday();

        document
          .querySelectorAll(".side-bar .item")
          .forEach((item) => item.classList.remove("active"));
        todayMenu?.classList.add("active");
      }
    }
  }
}

function searchInputChangeEvent(event) {
  const searchValue = event.target.value.trim();
  handleSearchVisibility(searchValue);
}

function handleSearchVisibility(searchValue) {
  const dropDownHeader = document.getElementById("search-drop-down-header");
  const searchContent = document.getElementById("search-completed-tasks");
  const searchNotFound = document.getElementById("search-notfound");

  if (!dropDownHeader || !searchContent || !searchNotFound) return;

  if (searchValue.length > 0) {
    handleSearchResults(searchValue);
  } else {
    dropDownHeader.style.display = "none";
    searchContent.style.display = "none";
    searchNotFound.classList.remove("show");
  }
}

async function handleSearchResults(query) {
  try {
    const response = await searchTodos(query);
    const total = response.total;
    const data = response.data;

    const dropDownHeader = document.getElementById("search-drop-down-header");
    const dropdownContent = document.getElementById("search-completed-tasks");
    const searchNotFound = document.getElementById("search-notfound");
    const searchingItem = document.getElementById("searching-item");
    searchingItem.innerText = `កំពុងស្វែងរក"${query}"`;

    if (!dropDownHeader || !dropdownContent || !searchNotFound) return;

    if (data.length === 0) {
      dropDownHeader.style.display = "none";
      dropdownContent.style.display = "none";
      searchNotFound.classList.add("show");
    } else {
      searchNotFound.classList.remove("show");
      handleSearchCountLoading(total);
      dropdownContent.innerHTML = "";
      data.forEach((todo) => {
        addTodoToList(dropdownContent, todo, "search");
      });
      dropDownHeader.style.display = "flex";
      dropdownContent.style.display = "flex";
    }
  } catch (error) {
    console.error("Search error:", error);
    const dropDownHeader = document.getElementById("search-drop-down-header");
    const dropdownContent = document.getElementById("search-completed-tasks");
    const searchNotFound = document.getElementById("search-notfound");

    if (dropDownHeader) dropDownHeader.style.display = "none";
    if (dropdownContent) dropdownContent.style.display = "none";
    if (searchNotFound) searchNotFound.classList.add("show");
  }
}

export function handleSearchDropdownToggle() {
  const rightSide = document.getElementById("right-side");
  if (!rightSide) {
    console.error("Right-side element not found!");
    return;
  }

  rightSide.addEventListener("click", async function (event) {
    event.stopPropagation();
    const dropDownHeader = event.target.closest(".search-drop-down-header");

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

        if (isShown && dropdownContent.childElementCount === 0) {
          try {
            showLoading(true);
            const searchInput = document.getElementById("searchInput");
            const todos = await searchTodos(searchInput.value);
            if (todos.data.length === 0) {
              dropdownContent.innerHTML = "<p>No completed tasks.</p>";
            } else {
              handleSearchCountLoading(todos.total);
              todos.data.forEach((todo) => {
                addTodoToList(dropdownContent, todo, "search");
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

export function handleClearButtonClick() {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.querySelector(".clear-btn");
  const todayMenu = document.getElementById("todayMenu");

  if (!searchInput || !clearBtn) return;

  clearBtn.addEventListener("click", function () {
    clearSearchInput();
  });

  function clearSearchInput() {
    searchInput.value = "";
    clearBtn.style.display = "none";
    searchInput.blur();
    isFocus = false;

    loadContent("html/today.html");
    handleLoadContentToToday();

    document
      .querySelectorAll(".side-bar .item")
      .forEach((item) => item.classList.remove("active"));
    todayMenu?.classList.add("active");
  }
}
