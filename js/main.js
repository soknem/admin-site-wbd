// main.js
import {
  handleSearchInput,
  handleClearButtonClick,
  handleHamburgerButtonClick,
  handleActiveSidebar,
  handleSidebarContentLoading,
} from "./functions.js";

import { handleAddButtonClick, handleLoadContentToToday } from "./today.js";

function initializeEventListeners() {
  handleSearchInput();
  handleClearButtonClick();
  handleHamburgerButtonClick();
  handleActiveSidebar();
  handleSidebarContentLoading();
  handleAddButtonClick();
  handleLoadContentToToday();
}

// Run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeEventListeners);
