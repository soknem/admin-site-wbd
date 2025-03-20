// main.js
import {
  handleSearchInput,
  handleClearButtonClick,
  handleHamburgerButtonClick,
  handleActiveSidebar,
  handleSidebarContentLoading,
} from "./functions.js";

function initializeEventListeners() {
  handleSearchInput();
  handleClearButtonClick();
  handleHamburgerButtonClick();
  handleActiveSidebar();
  handleSidebarContentLoading();
}

// Run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeEventListeners);
