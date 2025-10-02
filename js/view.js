const initialBackground = document.querySelector(".whatsapp-open");
const inputBar = document.querySelector(".search-space");
const searchBar = document.querySelector(".chat-list_search-bar");
const chatContainer = document.querySelector(".chat-list");
const chatListContainer = document.querySelector(".chat-list_chats");
const addNewBtn = document.querySelector(".new-chat");
const addChatsContainer = document.querySelector(".add-chats");
const addChatsBack = document.querySelector(".btn_add-chats-back");
const messages = document.querySelector(".socials-icon_messages");

class AddChats {
  constructor() {
    addNewBtn.addEventListener("click", this.showAddChatContainer.bind(this));
  }

  removeChatContainer() {
    [addChatsBack, messages].forEach((b) => {
      b.addEventListener("click", function () {
        addChatsContainer.style.display = "none";
        chatContainer.classList.remove("hidden");
      });
    });
  }
  showAddChatContainer() {
    addNewBtn.addEventListener("click", function () {
      addChatsContainer.style.display = "flex";
      chatContainer.classList.add("hidden");
    });
  }
}
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
          return "";
        }
      };
      const html = `
    <a  class="chat-list-link">
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
  renderChatsOnInterface(arr, data) {
    const chatProperArr = Array.from(arr);
    chatProperArr.forEach((l, i) => {
      l.addEventListener("click", function () {
        if (data[i].msgSent.length === 0) {
          const blankDiv = document.querySelector(".blankDiv");
          const chatInterface = document.querySelector(".chat-interface");
          blankDiv.style.display = "none";
          chatInterface.classList.remove("hidden");
        } else {
          return;
        }
      });
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
export const addChats = new AddChats();
