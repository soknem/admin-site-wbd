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

import { handleToggleTodoImportantClick } from "./util.js";

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
  handleWorkDropdownToggle,
  handleWorkIsDoneCountLoading,
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
  handleDropdownToggle();
  handleIsDoneCountLoading();
  handleWorkDropdownToggle();
  handleWorkIsDoneCountLoading();
  handleToggleTodoImportantClick();
}

// Run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeEventListeners);
