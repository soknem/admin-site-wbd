
  
  export function showToast(message, type = "success") {
    const toastContainer = document.getElementById("toast-container");
  
    toastContainer.innerHTML = "";
  
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="close-btn">&times;</button>
    `;
  
    toast.querySelector(".close-btn").addEventListener("click", () => {
      removeToast(toast);
    });
  
    toastContainer.appendChild(toast);
  
    setTimeout(() => removeToast(toast), 3500);
  }
  
  export function removeToast(toast) {
    toast.style.animation = "fadeOut 0.5s ease-out";
    setTimeout(() => toast.remove(), 200);
  }
  
  export function showLoading(isLoading) {
    const overlay = document.getElementById("loading-overlay");
    const rightSide = document.getElementById("right-side");
  
    if (isLoading) {
  
      overlay.style.opacity = "1";
      overlay.style.pointerEvents = "all";
      rightSide.classList.add("blur-background");
    } else {
  
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      rightSide.classList.remove("blur-background");
    }
  }
  