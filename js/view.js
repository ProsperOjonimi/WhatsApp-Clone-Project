const initialBackground = document.querySelector(".whatsapp-open");
const inputBar = document.querySelector(".search-space");
const searchBar = document.querySelector(".chat-list_search-bar");
const chatListContainer = document.querySelector(".chat-list_chats");

class ChatList {
  constructor() {
    chatListContainer.innerHTML = "";
  }
  renderMarkup(chats) {
    chats.forEach((obj) => {
      const renderedMessageArr =
        obj.msgRecieved.length === 0 ? obj.msgSent : obj.msgRecieved;
      const renderCheckmark = function () {
        if (renderedMessageArr === obj.msgSent && obj.seen === false) {
          return '<ion-icon name="checkmark-done-outline" class="checkmark-icon"></ion-icon>';
        } else if (renderedMessageArr === obj.msgSent && obj.seen === true) {
          return '<ion-icon name="checkmark-done-outline" class="checkmark-icon checkmark-icon_blue"></ion-icon>';
        } else {
          return;
        }
      };
      const html = `
    <a href="" class="chat-list-link">
          <div class="chat-list_proper">
            <div class="message-profile-img">
              <ion-icon name="person" class="person-icon"></ion-icon>
            </div>
          <div class="message-description">
              <p class="person-name">${obj.chatName}</p>
              <p class="person-text">${renderCheckmark()}${
        renderedMessageArr[0]
      }</p>

          </div>
          <div class="message-information">
            <p class="message-time ${
              (renderedMessageArr === obj.msgRecieved && obj.seen === true) ||
              renderedMessageArr === obj.msgSent
                ? "greyColor"
                : ""
            }">${obj.timeOfLastChat}</p>
          <div class="message-no  ${
            (renderedMessageArr === obj.msgRecieved && obj.seen === true) ||
            renderedMessageArr === obj.msgSent
              ? "hidden"
              : ""
          }" ">${renderedMessageArr.length}</div>
          </div>

          </div>
          </a>
    
    `;
      chatListContainer.insertAdjacentHTML("beforeend", html);
    });
  }
}
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
export const chatList = new ChatList();
