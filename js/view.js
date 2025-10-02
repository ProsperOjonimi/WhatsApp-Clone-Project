const initialBackground = document.querySelector(".whatsapp-open");
const inputBar = document.querySelector(".search-space");
const searchBar = document.querySelector(".chat-list_search-bar");

class App {
  constructor() {
    inputBar.addEventListener("focus", this.focusSearchBar.bind(this));
    inputBar.addEventListener("blur", this.blurSearchBar.bind(this));
  }
  focusSearchBar() {
    console.log("focus");
    inputBar.style.backgroundColor = "#FFFFFF";
    searchBar.style.backgroundColor = "#FFFFFF";
    searchBar.style.border = "2px solid #1DAA61";
  }
  blurSearchBar() {
    console.log("blur");
    inputBar.style.backgroundColor = "#f6f5f3";
    searchBar.style.backgroundColor = "#f6f5f3";
    searchBar.style.border = "none";
  }
  init() {
    setTimeout(() => {
      initialBackground.classList.add("hidden");
    }, 2000);
  }
}

export const app = new App();
