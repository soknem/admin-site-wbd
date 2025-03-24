import { handleLoadContentToToday } from "./today.js";
import { getTodoCount } from "./api.js";
// Function to handle active sidebar
export function handleActiveSidebar() {
    const menuItems = document.querySelectorAll(".side-bar .item");
  
    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Prevent click if the item is already active
  
        menuItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
  
        // alert(item)
        if (item.id === "todayMenu") {
          
          handleLoadContentToToday();
        }
      });
    });
  }
  

export function handleSidebarContentLoading() {
  const rightSide = document.getElementById("right-side");
  const menuItems = document.querySelectorAll(".side-bar .item");

  async function loadContent(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.text();
      const bodyContent = extractBodyTag(data);

      if (bodyContent) {
        rightSide.innerHTML = bodyContent;
      } else {
        console.warn("No content found in the fetched file.");
      }
    } catch (error) {
      console.error("Error loading content:", error);
    }
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

export async function handleSidebarCountLoading() {
  const counts = await getTodoCount();
  document.getElementById("my-day-count").innerText = counts.myDay;
  document.getElementById("important-count").innerText = counts.important;
  document.getElementById("planned-count").innerText = counts.planned;
  document.getElementById("assigned-count").innerText = counts.assigned;
  document.getElementById("work-count").innerText = counts.work;
}
