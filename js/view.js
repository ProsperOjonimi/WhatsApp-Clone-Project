import { initializeApp } from "./controller.js";
import { chats } from "./model.js";

const initialBackground = document.querySelector(".whatsapp-open");
export const inputBar = document.querySelector(".search-space");
const searchBar = document.querySelector(".chat-list_search-bar");
const chatContainer = document.querySelector(".chat-list");
const chatListContainer = document.querySelector(".chat-list_chats");
const addNewBtn = document.querySelector(".new-chat");
const addChatsContainer = document.querySelector(".add-chats");
const addChatsBack = document.querySelector(".btn_add-chats-back");
const messages = document.querySelector(".socials-icon_messages");
export const allBtn = document.querySelector(".state-all");
export const unreadBtn = document.querySelector(".state-unread");

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
    // this.clearContainer();
  }
  filterSearch() {
    const chatListLink = document.querySelectorAll(".chat-list-link");
    const input = inputBar.value.toLowerCase();
    chatListLink.forEach((c) => {
      // console.log(c);
      console.log(input);
      console.log(
        c.querySelector(".person-name").innerHTML.toLowerCase().includes(input)
      );
      if (
        c.querySelector(".person-name").innerHTML.toLowerCase().includes(input)
      ) {
        console.log(c, "I will show");
        c.style.display = "inline-block";
      } else {
        console.log(c, "Nope");
        c.style.display = "none";
      }
    });
  }
  clearContainer() {
    chatListContainer.innerHTML = "";
  }
  toggleUnreadActive() {
    unreadBtn.style.backgroundColor = "#d7fbd3";
    unreadBtn.style.color = " #658e6c";
    allBtn.style.backgroundColor = "#FFFFFF";
    allBtn.style.color = "#615f62";
  }
  toggleAll() {
    unreadBtn.style.backgroundColor = "#FFFFFF";
    unreadBtn.style.color = " #615f62 ";

    allBtn.style.backgroundColor = "#d7fbd3";
    allBtn.style.color = "#658e6c";
  }
  renderUnreadChats(datas) {
    this.clearContainer();

    const unreadChats = datas.filter(
      (c) => c.msgSent.length === 0 && c.seen === false
    );
    // unreadChats.forEach((c) => {
    //   const id = c.id;
    //   datas[id].seen = c.seen;
    // });
    console.log(datas, unreadChats);

    unreadChats.forEach((c) => {
      const html2 = `
    <a  class="chat-list-link "data-id=${c.id}>
          <div class="chat-list_proper">
            <div class="message-profile-img">
              <ion-icon name="person" class="person-icon"></ion-icon>
            </div>
          <div class="message-description">
              <p class="person-name">${c.chatName}</p>
              <p class="person-text">${c.msgRecieved[0]}</p>

          </div>
          <div class="message-information">
            <p class="message-time">${c.timeOfLastChat}</p>
          <div class="message-no" >${c.msgRecieved.length}</div>
          </div>

          </div>
          </a>
    
    `;
      console.log(c.msgRecieved.length);
      chatListContainer.insertAdjacentHTML("beforeend", html2);
    });
  }
  renderMarkup(chats) {
    this.clearContainer();
    chats.forEach((obj) => {
      const renderedMessageArr =
        obj.msgSent.length >= 1 ? obj.msgSent : obj.msgRecieved;
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
    <a  class="chat-list-link " data-id=${obj.id}>
          <div class="chat-list_proper">
            <div class="message-profile-img">
              <ion-icon name="person" class="person-icon"></ion-icon>
            </div>
          <div class="message-description">
              <p class="person-name">${obj.chatName}</p>
              <p class="person-text">${renderCheckmark()}${renderedMessageArr.at(
        -1
      )}</p>

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
  // renderUpdatedMsgSend(chats) {
  //   this.clearContainer();
  //   chats.forEach((obj) => {
  //     const now = new Date();
  //     const hour = now.getHours(); // 0–59
  //     const minutes = now.getMinutes(); // 0–59

  //     const timeOfSend = `${hour}:${minutes}`;
  //     const renderedMessageArr = obj.sentMessages[obj.length - 1];
  //     const renderCheckmark = function () {
  //       return '<ion-icon name="checkmark-done-outline" class="checkmark-icon"></ion-icon>';
  //     };
  //     const html = `
  //   <a  class="chat-list-link " data-id=${obj.id}>
  //         <div class="chat-list_proper">
  //           <div class="message-profile-img">
  //             <ion-icon name="person" class="person-icon"></ion-icon>
  //           </div>
  //         <div class="message-description">
  //             <p class="person-name">${obj.chatName}</p>
  //             <p class="person-text">${renderCheckmark()}${renderedMessageArr}</p>

  //         </div>
  //         <div class="message-information">
  //           <p class="message-time">${timeOfSend}</p>
  //         <div class="message-no">${obj.length}</div>
  //         </div>

  //         </div>
  //         </a>

  //   `;
  //     chatListContainer.insertAdjacentHTML("beforeend", html);
  //   });
  // }
  showMessage(message, arr, data, id) {
    const now = new Date();
    const hour = now.getHours(); // 0–59
    const minutes = now.getMinutes(); // 0–59
    arr.push(message);
    localStorage.setItem("chats", JSON.stringify(data));

    const timeOfSend = `${hour}:${minutes}`;
    const chatBoxTwo = document.querySelector(".chat-box-two");
    console.log(data[id].seen);

    const html = `
    <div class="message-tag-d">
              <p>${message}
                 <span>
${timeOfSend} <ion-icon name="checkmark-done-outline" class="checkmark-icon ${
      data[id].seen ? "checkmark-icon_blue" : ""
    }"></ion-icon>
              </span></p>
            </div>
    `;
    chatBoxTwo.insertAdjacentHTML("beforeend", html);
    // this.renderMarkup(data);
  }

  renderChatsOnInterface(arr, data) {
    const chatProperArr = Array.from(arr);
    chatProperArr.forEach((l, i) => {
      l.addEventListener("click", function () {
        if (data[i].msgSent.length === 0) data[i].seen = true;
        localStorage.setItem("chats", JSON.stringify(data));
        console.log(data[i].seen);
        // updateState(data);
        console.log(data, chats);

        if (data[i].msgRecieved.length > 0 && data[i].msgSent.length === 0) {
          console.log(data[i].sentMessages);
          const generateMarkup = function () {
            let markup;
            if (data[i].msgSent.length > 0) {
              console.log(data[i].sentMessages);
              const chatsArray = data[i].msgSent.map((c) => {
                const now = new Date();
                const hour = now.getHours(); // 0–59
                const minutes = now.getMinutes(); // 0–59

                const timeOfSend = `${hour}:${minutes}`;
                const chatBoxTwo = document.querySelector(".chat-box-two");
                console.log(c);
                console.log(chatBoxTwo);

                const html = `
    <div class="message-tag-d">
              <p>${c}
                 <span>
${timeOfSend} <ion-icon name="checkmark-done-outline" class="checkmark-icon ${
                  data[i].seen ? "checkmark-icon_blue" : ""
                }"></ion-icon>
              </span></p>
            </div>
    `;

                return html;
              });
              markup = chatsArray;
            }
            return markup;
          };
          generateMarkup();
          const blankDiv = document.querySelector(".blankDiv");
          const chatInterface = document.querySelector(".chat-interface");
          blankDiv.style.display = "none";
          const markup = `
           <div class="chat-interface_header">
          <div class="person-profile-img">
             <ion-icon name="person" class="person-icon"></ion-icon>
            </div>
              <div class="person-description">
              <p class="person-name">${data[i].chatName}</p>
             
          </div>
          <div class="message-icons">
            <div class="video-record">
           <span aria-hidden="true" data-icon="video-call-refreshed" class="video"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H16C16.55 4 17.0208 4.19583 17.4125 4.5875C17.8042 4.97917 18 5.45 18 6V10.5L21.15 7.35C21.3167 7.18333 21.5 7.14167 21.7 7.225C21.9 7.30833 22 7.46667 22 7.7V16.3C22 16.5333 21.9 16.6917 21.7 16.775C21.5 16.8583 21.3167 16.8167 21.15 16.65L18 13.5V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H4ZM4 18H16V6H4V18Z" fill="currentColor"></path></svg></span>
           <span aria-hidden="true" data-icon="ic-chevron-down-menu" class="xdwrcjd"><svg viewBox="0 0 20 20" height="20" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.99971 12.1L14.8997 7.2C15.083 7.01667 15.3164 6.925 15.5997 6.925C15.883 6.925 16.1164 7.01667 16.2997 7.2C16.483 7.38333 16.5747 7.61667 16.5747 7.9C16.5747 8.18333 16.483 8.41667 16.2997 8.6L10.6997 14.2C10.4997 14.4 10.2664 14.5 9.99971 14.5C9.73304 14.5 9.49971 14.4 9.29971 14.2L3.69971 8.6C3.51637 8.41667 3.42471 8.18333 3.42471 7.9C3.42471 7.61667 3.51637 7.38333 3.69971 7.2C3.88304 7.01667 4.11637 6.925 4.39971 6.925C4.68304 6.925 4.91637 7.01667 5.09971 7.2L9.99971 12.1Z" fill="currentColor"></path></svg></span>
            </div>
           <span aria-hidden="true" data-icon="search-refreshed" class="search"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" fill="currentColor"></path></svg></span>
          <span aria-hidden="true" data-icon="more-refreshed" class="options"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z" fill="currentColor"></path></svg></span>

          </div>

        </div>
        <div class="chat-interface_chats">
          <div class="chat-box-one">
            <div>

<p>${data[i].msgRecieved[0]}</p>
                <span>${data[i].timeOfLastChat}</span>


            </div>

          </div>
          <div class="chat-box-two">

          ${generateMarkup()?.join("") || ""}
    
     

          </div>
        </div>
        <div class="chat-interface_message-bar">
          <div class="accessory-icons">
          <span aria-hidden="true" data-icon="plus-rounded" class="attachment"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class="x11xpdln x1d8287x x1h4ghdb" fill="none"><title></title><path d="M11 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11V5.5C11 4.94772 11.4477 4.5 12 4.5C12.5523 4.5 13 4.94772 13 5.5V11H18.5C19.0523 11 19.5 11.4477 19.5 12C19.5 12.5523 19.0523 13 18.5 13H13V18.5C13 19.0523 12.5523 19.5 12 19.5C11.4477 19.5 11 19.0523 11 18.5V13Z" fill="currentColor"></path></svg></span>
          <span aria-hidden="true" data-icon="expressions" class="emoji"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M8.49893 10.2521C9.32736 10.2521 9.99893 9.5805 9.99893 8.75208C9.99893 7.92365 9.32736 7.25208 8.49893 7.25208C7.6705 7.25208 6.99893 7.92365 6.99893 8.75208C6.99893 9.5805 7.6705 10.2521 8.49893 10.2521Z" fill="currentColor"></path><path d="M17.0011 8.75208C17.0011 9.5805 16.3295 10.2521 15.5011 10.2521C14.6726 10.2521 14.0011 9.5805 14.0011 8.75208C14.0011 7.92365 14.6726 7.25208 15.5011 7.25208C16.3295 7.25208 17.0011 7.92365 17.0011 8.75208Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.8221 19.9799C15.5379 21.2537 13.8087 21.9781 12 22H9.27273C5.25611 22 2 18.7439 2 14.7273V9.27273C2 5.25611 5.25611 2 9.27273 2H14.7273C18.7439 2 22 5.25611 22 9.27273V11.8141C22 13.7532 21.2256 15.612 19.8489 16.9776L16.8221 19.9799ZM14.7273 4H9.27273C6.36068 4 4 6.36068 4 9.27273V14.7273C4 17.6393 6.36068 20 9.27273 20H11.3331C11.722 19.8971 12.0081 19.5417 12.0058 19.1204L11.9935 16.8564C11.9933 16.8201 11.9935 16.784 11.9941 16.7479C11.0454 16.7473 10.159 16.514 9.33502 16.0479C8.51002 15.5812 7.84752 14.9479 7.34752 14.1479C7.24752 13.9479 7.25585 13.7479 7.37252 13.5479C7.48919 13.3479 7.66419 13.2479 7.89752 13.2479L13.5939 13.2479C14.4494 12.481 15.5811 12.016 16.8216 12.0208L19.0806 12.0296C19.5817 12.0315 19.9889 11.6259 19.9889 11.1248V9.07648H19.9964C19.8932 6.25535 17.5736 4 14.7273 4ZM14.0057 19.1095C14.0066 19.2605 13.9959 19.4089 13.9744 19.5537C14.5044 19.3124 14.9926 18.9776 15.4136 18.5599L18.4405 15.5576C18.8989 15.1029 19.2653 14.5726 19.5274 13.996C19.3793 14.0187 19.2275 14.0301 19.0729 14.0295L16.8138 14.0208C15.252 14.0147 13.985 15.2837 13.9935 16.8455L14.0057 19.1095Z" fill="currentColor"></path></svg></span>
          </div>
         <input type="text" class="message-space" placeholder="Type a message">

         <button aria-label="Send" class="send-button hidden" data-id=${i}><span aria-hidden="true" data-icon="wds-ic-send-filled" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M5.4 19.425C5.06667 19.5583 4.75 19.5291 4.45 19.3375C4.15 19.1458 4 18.8666 4 18.5V14L12 12L4 9.99997V5.49997C4 5.1333 4.15 4.85414 4.45 4.66247C4.75 4.4708 5.06667 4.44164 5.4 4.57497L20.8 11.075C21.2167 11.2583 21.425 11.5666 21.425 12C21.425 12.4333 21.2167 12.7416 20.8 12.925L5.4 19.425Z" fill="#FFFFFF"></path></svg></span></button>
         <div class="voice-recording-icon" >
        <span aria-hidden="true" data-icon="mic-outlined" class="microphone"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class=""><title></title><path d="M12 14C11.1667 14 10.4583 13.7083 9.875 13.125C9.29167 12.5417 9 11.8333 9 11V5C9 4.16667 9.29167 3.45833 9.875 2.875C10.4583 2.29167 11.1667 2 12 2C12.8333 2 13.5417 2.29167 14.125 2.875C14.7083 3.45833 15 4.16667 15 5V11C15 11.8333 14.7083 12.5417 14.125 13.125C13.5417 13.7083 12.8333 14 12 14ZM12 21C11.4477 21 11 20.5523 11 20V17.925C9.26667 17.6917 7.83333 16.9167 6.7 15.6C5.78727 14.5396 5.24207 13.3387 5.06441 11.9973C4.9919 11.4498 5.44772 11 6 11C6.55228 11 6.98782 11.4518 7.0905 11.9945C7.27271 12.9574 7.73004 13.805 8.4625 14.5375C9.4375 15.5125 10.6167 16 12 16C13.3833 16 14.5625 15.5125 15.5375 14.5375C16.27 13.805 16.7273 12.9574 16.9095 11.9945C17.0122 11.4518 17.4477 11 18 11C18.5523 11 19.0081 11.4498 18.9356 11.9973C18.7579 13.3387 18.2127 14.5396 17.3 15.6C16.1667 16.9167 14.7333 17.6917 13 17.925V20C13 20.5523 12.5523 21 12 21ZM12 12C12.2833 12 12.5208 11.9042 12.7125 11.7125C12.9042 11.5208 13 11.2833 13 11V5C13 4.71667 12.9042 4.47917 12.7125 4.2875C12.5208 4.09583 12.2833 4 12 4C11.7167 4 11.4792 4.09583 11.2875 4.2875C11.0958 4.47917 11 4.71667 11 5V11C11 11.2833 11.0958 11.5208 11.2875 11.7125C11.4792 11.9042 11.7167 12 12 12Z" fill="currentColor"></path></svg></span>
         </div>
        </div>
          
          `;
          chatInterface.innerHTML = "";
          chatInterface.insertAdjacentHTML("afterbegin", markup);
          chatInterface.classList.remove("hidden");
        }

        if (data[i].msgRecieved.length > 0 && data[i].msgSent.length > 0) {
          console.log(data[i].sentMessages);
          const generateMarkup = function () {
            let markup;
            if (data[i].msgSent.length > 0) {
              console.log(data[i].sentMessages);
              const chatsArray = data[i].msgSent.map((c) => {
                const now = new Date();
                const hour = now.getHours(); // 0–59
                const minutes = now.getMinutes(); // 0–59

                const timeOfSend = `${hour}:${minutes}`;
                const chatBoxTwo = document.querySelector(".chat-box-two");
                console.log(c);
                console.log(chatBoxTwo);

                const html = `
    <div class="message-tag-d">
              <p>${c}
                 <span>
${timeOfSend} <ion-icon name="checkmark-done-outline" class="checkmark-icon ${
                  data[i].seen ? "checkmark-icon_blue" : ""
                }"></ion-icon>
              </span></p>
            </div>
    `;

                return html;
              });
              markup = chatsArray;
            }
            return markup;
          };
          generateMarkup();
          const blankDiv = document.querySelector(".blankDiv");
          const chatInterface = document.querySelector(".chat-interface");
          blankDiv.style.display = "none";
          const markup = `
           <div class="chat-interface_header">
          <div class="person-profile-img">
             <ion-icon name="person" class="person-icon"></ion-icon>
            </div>
              <div class="person-description">
              <p class="person-name">${data[i].chatName}</p>
             
          </div>
          <div class="message-icons">
            <div class="video-record">
           <span aria-hidden="true" data-icon="video-call-refreshed" class="video"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H16C16.55 4 17.0208 4.19583 17.4125 4.5875C17.8042 4.97917 18 5.45 18 6V10.5L21.15 7.35C21.3167 7.18333 21.5 7.14167 21.7 7.225C21.9 7.30833 22 7.46667 22 7.7V16.3C22 16.5333 21.9 16.6917 21.7 16.775C21.5 16.8583 21.3167 16.8167 21.15 16.65L18 13.5V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H4ZM4 18H16V6H4V18Z" fill="currentColor"></path></svg></span>
           <span aria-hidden="true" data-icon="ic-chevron-down-menu" class="xdwrcjd"><svg viewBox="0 0 20 20" height="20" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.99971 12.1L14.8997 7.2C15.083 7.01667 15.3164 6.925 15.5997 6.925C15.883 6.925 16.1164 7.01667 16.2997 7.2C16.483 7.38333 16.5747 7.61667 16.5747 7.9C16.5747 8.18333 16.483 8.41667 16.2997 8.6L10.6997 14.2C10.4997 14.4 10.2664 14.5 9.99971 14.5C9.73304 14.5 9.49971 14.4 9.29971 14.2L3.69971 8.6C3.51637 8.41667 3.42471 8.18333 3.42471 7.9C3.42471 7.61667 3.51637 7.38333 3.69971 7.2C3.88304 7.01667 4.11637 6.925 4.39971 6.925C4.68304 6.925 4.91637 7.01667 5.09971 7.2L9.99971 12.1Z" fill="currentColor"></path></svg></span>
            </div>
           <span aria-hidden="true" data-icon="search-refreshed" class="search"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" fill="currentColor"></path></svg></span>
          <span aria-hidden="true" data-icon="more-refreshed" class="options"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z" fill="currentColor"></path></svg></span>

          </div>

        </div>
        <div class="chat-interface_chats">
          <div class="chat-box-one">
            <div>

<p>${data[i].msgRecieved[0]}</p>
                <span>${data[i].timeOfLastChat}</span>


            </div>

          </div>
          <div class="chat-box-two">

          ${generateMarkup()?.join("") || ""}
    
     

          </div>
        </div>
        <div class="chat-interface_message-bar">
          <div class="accessory-icons">
          <span aria-hidden="true" data-icon="plus-rounded" class="attachment"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class="x11xpdln x1d8287x x1h4ghdb" fill="none"><title></title><path d="M11 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11V5.5C11 4.94772 11.4477 4.5 12 4.5C12.5523 4.5 13 4.94772 13 5.5V11H18.5C19.0523 11 19.5 11.4477 19.5 12C19.5 12.5523 19.0523 13 18.5 13H13V18.5C13 19.0523 12.5523 19.5 12 19.5C11.4477 19.5 11 19.0523 11 18.5V13Z" fill="currentColor"></path></svg></span>
          <span aria-hidden="true" data-icon="expressions" class="emoji"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M8.49893 10.2521C9.32736 10.2521 9.99893 9.5805 9.99893 8.75208C9.99893 7.92365 9.32736 7.25208 8.49893 7.25208C7.6705 7.25208 6.99893 7.92365 6.99893 8.75208C6.99893 9.5805 7.6705 10.2521 8.49893 10.2521Z" fill="currentColor"></path><path d="M17.0011 8.75208C17.0011 9.5805 16.3295 10.2521 15.5011 10.2521C14.6726 10.2521 14.0011 9.5805 14.0011 8.75208C14.0011 7.92365 14.6726 7.25208 15.5011 7.25208C16.3295 7.25208 17.0011 7.92365 17.0011 8.75208Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.8221 19.9799C15.5379 21.2537 13.8087 21.9781 12 22H9.27273C5.25611 22 2 18.7439 2 14.7273V9.27273C2 5.25611 5.25611 2 9.27273 2H14.7273C18.7439 2 22 5.25611 22 9.27273V11.8141C22 13.7532 21.2256 15.612 19.8489 16.9776L16.8221 19.9799ZM14.7273 4H9.27273C6.36068 4 4 6.36068 4 9.27273V14.7273C4 17.6393 6.36068 20 9.27273 20H11.3331C11.722 19.8971 12.0081 19.5417 12.0058 19.1204L11.9935 16.8564C11.9933 16.8201 11.9935 16.784 11.9941 16.7479C11.0454 16.7473 10.159 16.514 9.33502 16.0479C8.51002 15.5812 7.84752 14.9479 7.34752 14.1479C7.24752 13.9479 7.25585 13.7479 7.37252 13.5479C7.48919 13.3479 7.66419 13.2479 7.89752 13.2479L13.5939 13.2479C14.4494 12.481 15.5811 12.016 16.8216 12.0208L19.0806 12.0296C19.5817 12.0315 19.9889 11.6259 19.9889 11.1248V9.07648H19.9964C19.8932 6.25535 17.5736 4 14.7273 4ZM14.0057 19.1095C14.0066 19.2605 13.9959 19.4089 13.9744 19.5537C14.5044 19.3124 14.9926 18.9776 15.4136 18.5599L18.4405 15.5576C18.8989 15.1029 19.2653 14.5726 19.5274 13.996C19.3793 14.0187 19.2275 14.0301 19.0729 14.0295L16.8138 14.0208C15.252 14.0147 13.985 15.2837 13.9935 16.8455L14.0057 19.1095Z" fill="currentColor"></path></svg></span>
          </div>
         <input type="text" class="message-space" placeholder="Type a message">

         <button aria-label="Send" class="send-button hidden" data-id=${i}><span aria-hidden="true" data-icon="wds-ic-send-filled" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M5.4 19.425C5.06667 19.5583 4.75 19.5291 4.45 19.3375C4.15 19.1458 4 18.8666 4 18.5V14L12 12L4 9.99997V5.49997C4 5.1333 4.15 4.85414 4.45 4.66247C4.75 4.4708 5.06667 4.44164 5.4 4.57497L20.8 11.075C21.2167 11.2583 21.425 11.5666 21.425 12C21.425 12.4333 21.2167 12.7416 20.8 12.925L5.4 19.425Z" fill="#FFFFFF"></path></svg></span></button>
         <div class="voice-recording-icon" >
        <span aria-hidden="true" data-icon="mic-outlined" class="microphone"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class=""><title></title><path d="M12 14C11.1667 14 10.4583 13.7083 9.875 13.125C9.29167 12.5417 9 11.8333 9 11V5C9 4.16667 9.29167 3.45833 9.875 2.875C10.4583 2.29167 11.1667 2 12 2C12.8333 2 13.5417 2.29167 14.125 2.875C14.7083 3.45833 15 4.16667 15 5V11C15 11.8333 14.7083 12.5417 14.125 13.125C13.5417 13.7083 12.8333 14 12 14ZM12 21C11.4477 21 11 20.5523 11 20V17.925C9.26667 17.6917 7.83333 16.9167 6.7 15.6C5.78727 14.5396 5.24207 13.3387 5.06441 11.9973C4.9919 11.4498 5.44772 11 6 11C6.55228 11 6.98782 11.4518 7.0905 11.9945C7.27271 12.9574 7.73004 13.805 8.4625 14.5375C9.4375 15.5125 10.6167 16 12 16C13.3833 16 14.5625 15.5125 15.5375 14.5375C16.27 13.805 16.7273 12.9574 16.9095 11.9945C17.0122 11.4518 17.4477 11 18 11C18.5523 11 19.0081 11.4498 18.9356 11.9973C18.7579 13.3387 18.2127 14.5396 17.3 15.6C16.1667 16.9167 14.7333 17.6917 13 17.925V20C13 20.5523 12.5523 21 12 21ZM12 12C12.2833 12 12.5208 11.9042 12.7125 11.7125C12.9042 11.5208 13 11.2833 13 11V5C13 4.71667 12.9042 4.47917 12.7125 4.2875C12.5208 4.09583 12.2833 4 12 4C11.7167 4 11.4792 4.09583 11.2875 4.2875C11.0958 4.47917 11 4.71667 11 5V11C11 11.2833 11.0958 11.5208 11.2875 11.7125C11.4792 11.9042 11.7167 12 12 12Z" fill="currentColor"></path></svg></span>
         </div>
        </div>
          
          `;
          chatInterface.innerHTML = "";
          chatInterface.insertAdjacentHTML("afterbegin", markup);
          chatInterface.classList.remove("hidden");
        }
        if (data[i].msgSent.length > 0 && data[i].msgRecieved.length === 0) {
          const generateMarkup = function () {
            let markup;
            if (data[i].msgSent.length > 0) {
              console.log(data[i].sentMessages);
              const chatsArray = data[i].msgSent.map((c) => {
                const now = new Date();
                const hour = now.getHours(); // 0–59
                const minutes = now.getMinutes(); // 0–59

                const timeOfSend = `${hour}:${minutes}`;
                const chatBoxTwo = document.querySelector(".chat-box-two");
                console.log(c);
                console.log(chatBoxTwo);

                const html = `
    <div class="message-tag-d">
              <p>${c}
                 <span>
${timeOfSend} <ion-icon name="checkmark-done-outline" class="checkmark-icon ${
                  data[i].seen ? "checkmark-icon_blue" : ""
                }"></ion-icon>
              </span></p>
            </div>
           
    `;

                return html;
              });
              markup = chatsArray;
            }
            return markup;
          };
          const blankDiv = document.querySelector(".blankDiv");
          const chatInterface = document.querySelector(".chat-interface");
          blankDiv.style.display = "none";
          const markup = `
           <div class="chat-interface_header">
          <div class="person-profile-img">
             <ion-icon name="person" class="person-icon"></ion-icon>
            </div>
              <div class="person-description">
              <p class="person-name">${data[i].chatName}</p>
             
          </div>
          <div class="message-icons">
            <div class="video-record">
           <span aria-hidden="true" data-icon="video-call-refreshed" class="video"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H16C16.55 4 17.0208 4.19583 17.4125 4.5875C17.8042 4.97917 18 5.45 18 6V10.5L21.15 7.35C21.3167 7.18333 21.5 7.14167 21.7 7.225C21.9 7.30833 22 7.46667 22 7.7V16.3C22 16.5333 21.9 16.6917 21.7 16.775C21.5 16.8583 21.3167 16.8167 21.15 16.65L18 13.5V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H4ZM4 18H16V6H4V18Z" fill="currentColor"></path></svg></span>
           <span aria-hidden="true" data-icon="ic-chevron-down-menu" class="xdwrcjd"><svg viewBox="0 0 20 20" height="20" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.99971 12.1L14.8997 7.2C15.083 7.01667 15.3164 6.925 15.5997 6.925C15.883 6.925 16.1164 7.01667 16.2997 7.2C16.483 7.38333 16.5747 7.61667 16.5747 7.9C16.5747 8.18333 16.483 8.41667 16.2997 8.6L10.6997 14.2C10.4997 14.4 10.2664 14.5 9.99971 14.5C9.73304 14.5 9.49971 14.4 9.29971 14.2L3.69971 8.6C3.51637 8.41667 3.42471 8.18333 3.42471 7.9C3.42471 7.61667 3.51637 7.38333 3.69971 7.2C3.88304 7.01667 4.11637 6.925 4.39971 6.925C4.68304 6.925 4.91637 7.01667 5.09971 7.2L9.99971 12.1Z" fill="currentColor"></path></svg></span>
            </div>
           <span aria-hidden="true" data-icon="search-refreshed" class="search"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" fill="currentColor"></path></svg></span>
          <span aria-hidden="true" data-icon="more-refreshed" class="options"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z" fill="currentColor"></path></svg></span>

          </div>

        </div>
        <div class="chat-interface_chats">
          <div class="chat-box-one">
            

          </div>
          <div class="chat-box-two">
         
        ${generateMarkup()?.join("") || ""}
           

          </div>
         
        </div>
        <div class="chat-interface_message-bar">
          <div class="accessory-icons">
          <span aria-hidden="true" data-icon="plus-rounded" class="attachment"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class="x11xpdln x1d8287x x1h4ghdb" fill="none"><title></title><path d="M11 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11V5.5C11 4.94772 11.4477 4.5 12 4.5C12.5523 4.5 13 4.94772 13 5.5V11H18.5C19.0523 11 19.5 11.4477 19.5 12C19.5 12.5523 19.0523 13 18.5 13H13V18.5C13 19.0523 12.5523 19.5 12 19.5C11.4477 19.5 11 19.0523 11 18.5V13Z" fill="currentColor"></path></svg></span>
          <span aria-hidden="true" data-icon="expressions" class="emoji"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M8.49893 10.2521C9.32736 10.2521 9.99893 9.5805 9.99893 8.75208C9.99893 7.92365 9.32736 7.25208 8.49893 7.25208C7.6705 7.25208 6.99893 7.92365 6.99893 8.75208C6.99893 9.5805 7.6705 10.2521 8.49893 10.2521Z" fill="currentColor"></path><path d="M17.0011 8.75208C17.0011 9.5805 16.3295 10.2521 15.5011 10.2521C14.6726 10.2521 14.0011 9.5805 14.0011 8.75208C14.0011 7.92365 14.6726 7.25208 15.5011 7.25208C16.3295 7.25208 17.0011 7.92365 17.0011 8.75208Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.8221 19.9799C15.5379 21.2537 13.8087 21.9781 12 22H9.27273C5.25611 22 2 18.7439 2 14.7273V9.27273C2 5.25611 5.25611 2 9.27273 2H14.7273C18.7439 2 22 5.25611 22 9.27273V11.8141C22 13.7532 21.2256 15.612 19.8489 16.9776L16.8221 19.9799ZM14.7273 4H9.27273C6.36068 4 4 6.36068 4 9.27273V14.7273C4 17.6393 6.36068 20 9.27273 20H11.3331C11.722 19.8971 12.0081 19.5417 12.0058 19.1204L11.9935 16.8564C11.9933 16.8201 11.9935 16.784 11.9941 16.7479C11.0454 16.7473 10.159 16.514 9.33502 16.0479C8.51002 15.5812 7.84752 14.9479 7.34752 14.1479C7.24752 13.9479 7.25585 13.7479 7.37252 13.5479C7.48919 13.3479 7.66419 13.2479 7.89752 13.2479L13.5939 13.2479C14.4494 12.481 15.5811 12.016 16.8216 12.0208L19.0806 12.0296C19.5817 12.0315 19.9889 11.6259 19.9889 11.1248V9.07648H19.9964C19.8932 6.25535 17.5736 4 14.7273 4ZM14.0057 19.1095C14.0066 19.2605 13.9959 19.4089 13.9744 19.5537C14.5044 19.3124 14.9926 18.9776 15.4136 18.5599L18.4405 15.5576C18.8989 15.1029 19.2653 14.5726 19.5274 13.996C19.3793 14.0187 19.2275 14.0301 19.0729 14.0295L16.8138 14.0208C15.252 14.0147 13.985 15.2837 13.9935 16.8455L14.0057 19.1095Z" fill="currentColor"></path></svg></span>
          </div>
         <input type="text" class="message-space" placeholder="Type a message">

         <button aria-label="Send" class="send-button hidden" data-id=${i}><span aria-hidden="true" data-icon="wds-ic-send-filled" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M5.4 19.425C5.06667 19.5583 4.75 19.5291 4.45 19.3375C4.15 19.1458 4 18.8666 4 18.5V14L12 12L4 9.99997V5.49997C4 5.1333 4.15 4.85414 4.45 4.66247C4.75 4.4708 5.06667 4.44164 5.4 4.57497L20.8 11.075C21.2167 11.2583 21.425 11.5666 21.425 12C21.425 12.4333 21.2167 12.7416 20.8 12.925L5.4 19.425Z" fill="#FFFFFF"></path></svg></span></button>
        
         <div class="voice-recording-icon" >
        <span aria-hidden="true" data-icon="mic-outlined" class="microphone"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class=""><title></title><path d="M12 14C11.1667 14 10.4583 13.7083 9.875 13.125C9.29167 12.5417 9 11.8333 9 11V5C9 4.16667 9.29167 3.45833 9.875 2.875C10.4583 2.29167 11.1667 2 12 2C12.8333 2 13.5417 2.29167 14.125 2.875C14.7083 3.45833 15 4.16667 15 5V11C15 11.8333 14.7083 12.5417 14.125 13.125C13.5417 13.7083 12.8333 14 12 14ZM12 21C11.4477 21 11 20.5523 11 20V17.925C9.26667 17.6917 7.83333 16.9167 6.7 15.6C5.78727 14.5396 5.24207 13.3387 5.06441 11.9973C4.9919 11.4498 5.44772 11 6 11C6.55228 11 6.98782 11.4518 7.0905 11.9945C7.27271 12.9574 7.73004 13.805 8.4625 14.5375C9.4375 15.5125 10.6167 16 12 16C13.3833 16 14.5625 15.5125 15.5375 14.5375C16.27 13.805 16.7273 12.9574 16.9095 11.9945C17.0122 11.4518 17.4477 11 18 11C18.5523 11 19.0081 11.4498 18.9356 11.9973C18.7579 13.3387 18.2127 14.5396 17.3 15.6C16.1667 16.9167 14.7333 17.6917 13 17.925V20C13 20.5523 12.5523 21 12 21ZM12 12C12.2833 12 12.5208 11.9042 12.7125 11.7125C12.9042 11.5208 13 11.2833 13 11V5C13 4.71667 12.9042 4.47917 12.7125 4.2875C12.5208 4.09583 12.2833 4 12 4C11.7167 4 11.4792 4.09583 11.2875 4.2875C11.0958 4.47917 11 4.71667 11 5V11C11 11.2833 11.0958 11.5208 11.2875 11.7125C11.4792 11.9042 11.7167 12 12 12Z" fill="currentColor"></path></svg></span>
         </div>
        </div>
          
          `;
          chatInterface.innerHTML = "";
          chatInterface.insertAdjacentHTML("afterbegin", markup);
          chatInterface.classList.remove("hidden");
        }
        initializeApp();
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
