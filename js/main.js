// main.js
import {
  handleSearchInput,
  handleClearButtonClick,
  handleHamburgerButtonClick,
} from "./functions.js";

import {
  handleActiveSidebar,
  handleSidebarContentLoading,
  handleSidebarCountLoading,
} from "./side-bar.js";

import {
  handleAddButtonClick,
  handleLoadContentToToday,
  handleToggleTodoClick,
  handleLiClick,
} from "./today.js";

function initializeEventListeners() {
  handleSearchInput();
  handleClearButtonClick();
  handleHamburgerButtonClick();
  handleActiveSidebar();
  handleSidebarContentLoading();
  handleAddButtonClick();
  handleLoadContentToToday();
  handleSidebarCountLoading();
  handleToggleTodoClick();
  handleLiClick();
}

// Run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeEventListeners);
