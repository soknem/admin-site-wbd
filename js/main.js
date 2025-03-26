// main.js
import {
  handleSearchInput,
  handleHamburgerButtonClick,
} from "./functions.js";
import { handleGlobalSearchClick } from "./search.js";
import {
  handleActiveSidebar,
  handleSidebarContentLoading,
  handleSidebarCountLoading,
} from "./side-bar.js";

import { handleToggleTodoImportantClick } from "./util.js";

import { handleSearchDropdownToggle,handleClearButtonClick } from "./search.js";
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
  handleGlobalSearchClick();
  handleSearchDropdownToggle();
}

// Run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeEventListeners);
