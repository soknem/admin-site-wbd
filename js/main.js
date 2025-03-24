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
  handleDropdownToggle,
  handleIsDoneCountLoading,
} from "./today.js";

import {
  handleWorkAddButtonClick,
  handleLoadContentToWork,
  handleWorkToggleTodoClick,
  handleWorkLiClick,
} from "./work.js";

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
  handleWorkAddButtonClick();
  handleLoadContentToWork();
  handleWorkToggleTodoClick();
  handleWorkLiClick();
  handleDropdownToggle()
  handleIsDoneCountLoading();
}

// Run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeEventListeners);
