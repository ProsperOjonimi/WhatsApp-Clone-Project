import {
  initializeApp,
  storedChatsInfo,
  renderSendButton,
} from "./controller.js";
import { chats } from "./model.js";

export const inputBar = document.querySelector(".search-space");
export const unreadMessages = document.querySelector(".unread-messages");
export const allBtn = document.querySelector(".state-all");
export const unreadBtn = document.querySelector(".state-unread");

const initialBackground = document.querySelector(".whatsapp-open");
const sideBarSocials = document.querySelector(".side-bar_socials");
const sideBar = document.querySelector(".side-bar");
const sideBarFunc = document.querySelector(".side-bar_functional");

const searchBar = document.querySelector(".chat-list_search-bar");
const chatContainer = document.querySelector(".chat-list");
const chatListContainer = document.querySelector(".chat-list_chats");
const addNewBtn = document.querySelector(".new-chat");
const addChatsContainer = document.querySelector(".add-chats");
const addChatsBack = document.querySelector(".btn_add-chats-back");
const messages = document.querySelector(".socials-icon_messages");
// const whatsappHeader = document.querySelector(".xgz6z4f");
// const messageIcon = document.querySelector(".message-icon");

// const channelsIcon = document.querySelectorAll(".channels-icon");
// const communityIcon = document.querySelectorAll(".community-icon");
// const settingsIcon = document.querySelectorAll(".settings-icon");
// const stateUnread = document.querySelector(".state-unread");
// const stateFav = document.querySelector(".state-favorites");
// const stategroups = document.querySelector(".state-groups");
// const addIcon = document.querySelectorAll(".add-icon");
// const moreIcon = document.querySelector(".more-icon");

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
  constructor() {}
  filterSearch() {
    const chatListLink = document.querySelectorAll(".chat-list-link");
    const input = inputBar.value.toLowerCase();
    chatListLink.forEach((c) => {
      if (
        c.querySelector(".person-name").innerHTML.toLowerCase().includes(input)
      ) {
        c.style.display = "inline-block";
      } else {
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
  renderUnreadChats(datas, datas2) {
    this.clearContainer();

    const unreadChats = datas.filter((c) => c.unread === true);
    datas = unreadChats;

    // unreadChats.forEach((c) => {
    //   const hr = c.chatTime.at(-1).timeOfLastChatHour;
    //   const min = c.chatTime.at(-1).timeOfLastChatMins;
    //   const minString = String(min).padStart(2, 0);
    //   const time = `${hr}:${minString}`;
    //   const html2 = `
    // <a  class="chat-list-link "data-id=${c.id}>
    //       <div class="chat-list_proper">
    //         <div class="message-profile-img">
    //           <ion-icon name="person" class="person-icon"></ion-icon>
    //         </div>
    //       <div class="message-description">
    //           <p class="person-name">${c.chatName}</p>
    //           <p class="person-text">${c.msgRecieved[0]}</p>

    //       </div>
    //       <div class="message-information">
    //         <p class="message-time">${time}</p>
    //       <div class="message-no" >${c.msgRecieved.length}</div>
    //       </div>

    //       </div>
    //       </a>

    // `;
    //   chatListContainer.insertAdjacentHTML("beforeend", html2);
    //   const unreadChatLink = document.querySelectorAll("chat-list-link");
    //   this.renderChatsOnInterface(unreadChatLink, c);
    // });
    // localStorage.setItem("chats", JSON.stringify(data));
    this.renderMarkup(datas);
    const chatProper = document.querySelectorAll(".chat-list-link");
    this.renderUnreadChatsInterface(chatProper, datas, datas2);
  }

  sortChats(chatsData) {
    const sortedData = chatsData.sort((a, b) => {
      const dateA = `${a.chatTime.at(-1).dayOfMessage}T${String(
        a.chatTime.at(-1).timeOfLastChatHour
      ).padStart(2, 0)}:${String(a.chatTime.at(-1).timeOfLastChatMins).padStart(
        2,
        0
      )}:${String(a.chatTime.at(-1).timeOfLastChatSec).padStart(2, 0)}`;

      const dateB = `${b.chatTime.at(-1).dayOfMessage}T${String(
        b.chatTime.at(-1).timeOfLastChatHour
      ).padStart(2, 0)}:${String(b.chatTime.at(-1).timeOfLastChatMins).padStart(
        2,
        0
      )}:${String(b.chatTime.at(-1).timeOfLastChatSec).padStart(2, 0)}`;

      const dateMilliA = new Date(dateA);
      const dateMilliB = new Date(dateB);

      return dateMilliB - dateMilliA;
    });
    console.log(chatsData);
    localStorage.setItem("chats", JSON.stringify(chatsData));
  }
  renderUnreadChatsInterface(arr, data, data2) {
    const chatProperArr = Array.from(arr);
    chatProperArr.forEach((l, i) => {
      l.addEventListener("click", function () {
        console.log(data);
        console.log(data2);
        if (data[i].unread === true) data[i].unread = false;
        // if (data2[i].unread === true) data2[i].unread = false;
        localStorage.setItem("chats", JSON.stringify(data2));
        const noOfUnreadMessages = data.filter((d) => d.unread === true).length;
        unreadMessages.textContent = noOfUnreadMessages;
        if (noOfUnreadMessages === 0) unreadMessages.classList.add("hidden");

        if (data[i].msgRecieved.length > 0 && data[i].msgSent.length === 0) {
          const generateMarkup = function () {
            let markup;
            if (data[i].msgSent.length > 0) {
              const chatsArray = data[i].msgSent.map((c, ix) => {
                const hour = String(
                  data[i].chatTime[ix + 1].timeOfLastChatHour
                ).padStart(2, 0);
                const minutes = String(
                  data[i].chatTime[ix + 1].timeOfLastChatMins
                ).padStart(2, 0);

                const timeOfSend = `${hour}:${minutes}`;

                const chatBoxTwo = document.querySelector(".chat-box-two");

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
           <span aria-hidden="true" data-icon="video-call-refreshed" class="video"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H16C16.55 4 17.0208 4.19583 17.4125 4.5875C17.8042 4.97917 18 5.45 18 6V10.5L21.15 7.35C21.3167 7.18333 21.5 7.14167 21.7 7.225C21.9 7.30833 22 7.46667 22 7.7V16.3C22 16.5333 21.9 16.6917 21.7 16.775C21.5 16.8583 21.3167 16.8167 21.15 16.65L18 13.5V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H4ZM4 18H16V6H4V18Z" class='video-icon' fill="currentColor"></path></svg></span>
           <span aria-hidden="true" data-icon="ic-chevron-down-menu" class="xdwrcjd"><svg viewBox="0 0 20 20" height="20" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.99971 12.1L14.8997 7.2C15.083 7.01667 15.3164 6.925 15.5997 6.925C15.883 6.925 16.1164 7.01667 16.2997 7.2C16.483 7.38333 16.5747 7.61667 16.5747 7.9C16.5747 8.18333 16.483 8.41667 16.2997 8.6L10.6997 14.2C10.4997 14.4 10.2664 14.5 9.99971 14.5C9.73304 14.5 9.49971 14.4 9.29971 14.2L3.69971 8.6C3.51637 8.41667 3.42471 8.18333 3.42471 7.9C3.42471 7.61667 3.51637 7.38333 3.69971 7.2C3.88304 7.01667 4.11637 6.925 4.39971 6.925C4.68304 6.925 4.91637 7.01667 5.09971 7.2L9.99971 12.1Z" class='drop-icon' fill="currentColor"></path></svg></span>
            </div>
           <span aria-hidden="true" data-icon="search-refreshed" class="search"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" class='search-icon' fill="#0A0A0A"></path></svg></span>
          <span aria-hidden="true" data-icon="more-refreshed" class="options"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z"  class='options-icon'fill="currentColor"></path></svg></span>

          </div>

        </div>
        <div class="chat-interface_chats">
          <div class="chat-box-one">
            <div>

<p>${data[i].msgRecieved[0]}</p>
                <span>${data[i].chatTime[0].timeOfLastChatHour}:${String(
            data[i].chatTime[0].timeOfLastChatMins
          ).padStart(2, 0)}</span>


            </div>

          </div>
          <div class="chat-box-two">

          ${generateMarkup()?.join("") || ""}
    
     

          </div>
        </div>
        <div class="chat-interface_message-bar">
          <div class="accessory-icons">
          <span aria-hidden="true" data-icon="plus-rounded" class="attachment"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class="x11xpdln x1d8287x x1h4ghdb" fill="none"><title></title><path d="M11 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11V5.5C11 4.94772 11.4477 4.5 12 4.5C12.5523 4.5 13 4.94772 13 5.5V11H18.5C19.0523 11 19.5 11.4477 19.5 12C19.5 12.5523 19.0523 13 18.5 13H13V18.5C13 19.0523 12.5523 19.5 12 19.5C11.4477 19.5 11 19.0523 11 18.5V13Z"class='plus' fill="currentColor"></path></svg></span>

          <span aria-hidden="true" data-icon="expressions" class="emoji"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M8.49893 10.2521C9.32736 10.2521 9.99893 9.5805 9.99893 8.75208C9.99893 7.92365 9.32736 7.25208 8.49893 7.25208C7.6705 7.25208 6.99893 7.92365 6.99893 8.75208C6.99893 9.5805 7.6705 10.2521 8.49893 10.2521Z" fill="currentColor"></path><path d="M17.0011 8.75208C17.0011 9.5805 16.3295 10.2521 15.5011 10.2521C14.6726 10.2521 14.0011 9.5805 14.0011 8.75208C14.0011 7.92365 14.6726 7.25208 15.5011 7.25208C16.3295 7.25208 17.0011 7.92365 17.0011 8.75208Z" class='emoji' fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.8221 19.9799C15.5379 21.2537 13.8087 21.9781 12 22H9.27273C5.25611 22 2 18.7439 2 14.7273V9.27273C2 5.25611 5.25611 2 9.27273 2H14.7273C18.7439 2 22 5.25611 22 9.27273V11.8141C22 13.7532 21.2256 15.612 19.8489 16.9776L16.8221 19.9799ZM14.7273 4H9.27273C6.36068 4 4 6.36068 4 9.27273V14.7273C4 17.6393 6.36068 20 9.27273 20H11.3331C11.722 19.8971 12.0081 19.5417 12.0058 19.1204L11.9935 16.8564C11.9933 16.8201 11.9935 16.784 11.9941 16.7479C11.0454 16.7473 10.159 16.514 9.33502 16.0479C8.51002 15.5812 7.84752 14.9479 7.34752 14.1479C7.24752 13.9479 7.25585 13.7479 7.37252 13.5479C7.48919 13.3479 7.66419 13.2479 7.89752 13.2479L13.5939 13.2479C14.4494 12.481 15.5811 12.016 16.8216 12.0208L19.0806 12.0296C19.5817 12.0315 19.9889 11.6259 19.9889 11.1248V9.07648H19.9964C19.8932 6.25535 17.5736 4 14.7273 4ZM14.0057 19.1095C14.0066 19.2605 13.9959 19.4089 13.9744 19.5537C14.5044 19.3124 14.9926 18.9776 15.4136 18.5599L18.4405 15.5576C18.8989 15.1029 19.2653 14.5726 19.5274 13.996C19.3793 14.0187 19.2275 14.0301 19.0729 14.0295L16.8138 14.0208C15.252 14.0147 13.985 15.2837 13.9935 16.8455L14.0057 19.1095Z"class='emoji' fill="currentColor"></path></svg></span>
          </div>
         <input type="text" class="message-space" placeholder="Type a message">

         <button aria-label="Send" class="send-button hidden" data-id=${i}><span aria-hidden="true" data-icon="wds-ic-send-filled" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M5.4 19.425C5.06667 19.5583 4.75 19.5291 4.45 19.3375C4.15 19.1458 4 18.8666 4 18.5V14L12 12L4 9.99997V5.49997C4 5.1333 4.15 4.85414 4.45 4.66247C4.75 4.4708 5.06667 4.44164 5.4 4.57497L20.8 11.075C21.2167 11.2583 21.425 11.5666 21.425 12C21.425 12.4333 21.2167 12.7416 20.8 12.925L5.4 19.425Z" class='send' fill="#FFFFFF"></path></svg></span></button>
        
         <div class="voice-recording-icon" >
        <span aria-hidden="true" data-icon="mic-outlined" class="microphone"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class=""><title></title><path d="M12 14C11.1667 14 10.4583 13.7083 9.875 13.125C9.29167 12.5417 9 11.8333 9 11V5C9 4.16667 9.29167 3.45833 9.875 2.875C10.4583 2.29167 11.1667 2 12 2C12.8333 2 13.5417 2.29167 14.125 2.875C14.7083 3.45833 15 4.16667 15 5V11C15 11.8333 14.7083 12.5417 14.125 13.125C13.5417 13.7083 12.8333 14 12 14ZM12 21C11.4477 21 11 20.5523 11 20V17.925C9.26667 17.6917 7.83333 16.9167 6.7 15.6C5.78727 14.5396 5.24207 13.3387 5.06441 11.9973C4.9919 11.4498 5.44772 11 6 11C6.55228 11 6.98782 11.4518 7.0905 11.9945C7.27271 12.9574 7.73004 13.805 8.4625 14.5375C9.4375 15.5125 10.6167 16 12 16C13.3833 16 14.5625 15.5125 15.5375 14.5375C16.27 13.805 16.7273 12.9574 16.9095 11.9945C17.0122 11.4518 17.4477 11 18 11C18.5523 11 19.0081 11.4498 18.9356 11.9973C18.7579 13.3387 18.2127 14.5396 17.3 15.6C16.1667 16.9167 14.7333 17.6917 13 17.925V20C13 20.5523 12.5523 21 12 21ZM12 12C12.2833 12 12.5208 11.9042 12.7125 11.7125C12.9042 11.5208 13 11.2833 13 11V5C13 4.71667 12.9042 4.47917 12.7125 4.2875C12.5208 4.09583 12.2833 4 12 4C11.7167 4 11.4792 4.09583 11.2875 4.2875C11.0958 4.47917 11 4.71667 11 5V11C11 11.2833 11.0958 11.5208 11.2875 11.7125C11.4792 11.9042 11.7167 12 12 12Z"class='voice' fill="currentColor"></path></svg></span>
         </div>
        </div>
          
          `;
          chatInterface.innerHTML = "";
          chatInterface.insertAdjacentHTML("afterbegin", markup);
          chatInterface.classList.remove("hidden");
        }

        if (data[i].msgRecieved.length > 0 && data[i].msgSent.length > 0) {
          const generateMarkup = function () {
            let markup;

            if (data[i].msgSent.length > 0) {
              const chatsArray = data[i].msgSent.map((c, ix) => {
                const hour = String(
                  data[i].chatTime[ix + 1].timeOfLastChatHour
                ).padStart(2, 0);
                const minutes = String(
                  data[i].chatTime[ix + 1].timeOfLastChatMins
                ).padStart(2, 0);

                const timeOfSend = `${hour}:${minutes}`;

                const chatBoxTwo = document.querySelector(".chat-box-two");

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
           <span aria-hidden="true" data-icon="video-call-refreshed" class="video"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H16C16.55 4 17.0208 4.19583 17.4125 4.5875C17.8042 4.97917 18 5.45 18 6V10.5L21.15 7.35C21.3167 7.18333 21.5 7.14167 21.7 7.225C21.9 7.30833 22 7.46667 22 7.7V16.3C22 16.5333 21.9 16.6917 21.7 16.775C21.5 16.8583 21.3167 16.8167 21.15 16.65L18 13.5V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H4ZM4 18H16V6H4V18Z" class='video-icon'fill="currentColor"></path></svg></span>
           <span aria-hidden="true" data-icon="ic-chevron-down-menu" class="xdwrcjd"><svg viewBox="0 0 20 20" height="20" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.99971 12.1L14.8997 7.2C15.083 7.01667 15.3164 6.925 15.5997 6.925C15.883 6.925 16.1164 7.01667 16.2997 7.2C16.483 7.38333 16.5747 7.61667 16.5747 7.9C16.5747 8.18333 16.483 8.41667 16.2997 8.6L10.6997 14.2C10.4997 14.4 10.2664 14.5 9.99971 14.5C9.73304 14.5 9.49971 14.4 9.29971 14.2L3.69971 8.6C3.51637 8.41667 3.42471 8.18333 3.42471 7.9C3.42471 7.61667 3.51637 7.38333 3.69971 7.2C3.88304 7.01667 4.11637 6.925 4.39971 6.925C4.68304 6.925 4.91637 7.01667 5.09971 7.2L9.99971 12.1Z" class='drop-icon'fill="currentColor"></path></svg></span>
            </div>
           <span aria-hidden="true" data-icon="search-refreshed" class="search"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" class='search-icon'fill="#0A0A0A"></path></svg></span>
          <span aria-hidden="true" data-icon="more-refreshed" class="options"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z" class='options-icon'fill="currentColor"></path></svg></span>

          </div>

        </div>
        <div class="chat-interface_chats">
          <div class="chat-box-one">
            <div>

<p>${data[i].msgRecieved[0]}</p>
                <span>${data[i].chatTime[0].timeOfLastChatHour}:${String(
            data[i].chatTime[0].timeOfLastChatMins
          ).padStart(2, 0)}</span>


            </div>

          </div>
          <div class="chat-box-two">

          ${generateMarkup()?.join("") || ""}
    
     

          </div>
        </div>
        <div class="chat-interface_message-bar">
           <div class="accessory-icons">
          <span aria-hidden="true" data-icon="plus-rounded" class="attachment"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class="x11xpdln x1d8287x x1h4ghdb" fill="none"><title></title><path d="M11 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11V5.5C11 4.94772 11.4477 4.5 12 4.5C12.5523 4.5 13 4.94772 13 5.5V11H18.5C19.0523 11 19.5 11.4477 19.5 12C19.5 12.5523 19.0523 13 18.5 13H13V18.5C13 19.0523 12.5523 19.5 12 19.5C11.4477 19.5 11 19.0523 11 18.5V13Z"class='plus' fill="currentColor"></path></svg></span>

          <span aria-hidden="true" data-icon="expressions" class="emoji"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M8.49893 10.2521C9.32736 10.2521 9.99893 9.5805 9.99893 8.75208C9.99893 7.92365 9.32736 7.25208 8.49893 7.25208C7.6705 7.25208 6.99893 7.92365 6.99893 8.75208C6.99893 9.5805 7.6705 10.2521 8.49893 10.2521Z" fill="currentColor"></path><path d="M17.0011 8.75208C17.0011 9.5805 16.3295 10.2521 15.5011 10.2521C14.6726 10.2521 14.0011 9.5805 14.0011 8.75208C14.0011 7.92365 14.6726 7.25208 15.5011 7.25208C16.3295 7.25208 17.0011 7.92365 17.0011 8.75208Z" class='emoji' fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.8221 19.9799C15.5379 21.2537 13.8087 21.9781 12 22H9.27273C5.25611 22 2 18.7439 2 14.7273V9.27273C2 5.25611 5.25611 2 9.27273 2H14.7273C18.7439 2 22 5.25611 22 9.27273V11.8141C22 13.7532 21.2256 15.612 19.8489 16.9776L16.8221 19.9799ZM14.7273 4H9.27273C6.36068 4 4 6.36068 4 9.27273V14.7273C4 17.6393 6.36068 20 9.27273 20H11.3331C11.722 19.8971 12.0081 19.5417 12.0058 19.1204L11.9935 16.8564C11.9933 16.8201 11.9935 16.784 11.9941 16.7479C11.0454 16.7473 10.159 16.514 9.33502 16.0479C8.51002 15.5812 7.84752 14.9479 7.34752 14.1479C7.24752 13.9479 7.25585 13.7479 7.37252 13.5479C7.48919 13.3479 7.66419 13.2479 7.89752 13.2479L13.5939 13.2479C14.4494 12.481 15.5811 12.016 16.8216 12.0208L19.0806 12.0296C19.5817 12.0315 19.9889 11.6259 19.9889 11.1248V9.07648H19.9964C19.8932 6.25535 17.5736 4 14.7273 4ZM14.0057 19.1095C14.0066 19.2605 13.9959 19.4089 13.9744 19.5537C14.5044 19.3124 14.9926 18.9776 15.4136 18.5599L18.4405 15.5576C18.8989 15.1029 19.2653 14.5726 19.5274 13.996C19.3793 14.0187 19.2275 14.0301 19.0729 14.0295L16.8138 14.0208C15.252 14.0147 13.985 15.2837 13.9935 16.8455L14.0057 19.1095Z"class='emoji' fill="currentColor"></path></svg></span>
          </div>
         <input type="text" class="message-space" placeholder="Type a message">

         <button aria-label="Send" class="send-button hidden" data-id=${i}><span aria-hidden="true" data-icon="wds-ic-send-filled" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M5.4 19.425C5.06667 19.5583 4.75 19.5291 4.45 19.3375C4.15 19.1458 4 18.8666 4 18.5V14L12 12L4 9.99997V5.49997C4 5.1333 4.15 4.85414 4.45 4.66247C4.75 4.4708 5.06667 4.44164 5.4 4.57497L20.8 11.075C21.2167 11.2583 21.425 11.5666 21.425 12C21.425 12.4333 21.2167 12.7416 20.8 12.925L5.4 19.425Z" class='send' fill="#FFFFFF"></path></svg></span></button>
        
         <div class="voice-recording-icon" >
        <span aria-hidden="true" data-icon="mic-outlined" class="microphone"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class=""><title></title><path d="M12 14C11.1667 14 10.4583 13.7083 9.875 13.125C9.29167 12.5417 9 11.8333 9 11V5C9 4.16667 9.29167 3.45833 9.875 2.875C10.4583 2.29167 11.1667 2 12 2C12.8333 2 13.5417 2.29167 14.125 2.875C14.7083 3.45833 15 4.16667 15 5V11C15 11.8333 14.7083 12.5417 14.125 13.125C13.5417 13.7083 12.8333 14 12 14ZM12 21C11.4477 21 11 20.5523 11 20V17.925C9.26667 17.6917 7.83333 16.9167 6.7 15.6C5.78727 14.5396 5.24207 13.3387 5.06441 11.9973C4.9919 11.4498 5.44772 11 6 11C6.55228 11 6.98782 11.4518 7.0905 11.9945C7.27271 12.9574 7.73004 13.805 8.4625 14.5375C9.4375 15.5125 10.6167 16 12 16C13.3833 16 14.5625 15.5125 15.5375 14.5375C16.27 13.805 16.7273 12.9574 16.9095 11.9945C17.0122 11.4518 17.4477 11 18 11C18.5523 11 19.0081 11.4498 18.9356 11.9973C18.7579 13.3387 18.2127 14.5396 17.3 15.6C16.1667 16.9167 14.7333 17.6917 13 17.925V20C13 20.5523 12.5523 21 12 21ZM12 12C12.2833 12 12.5208 11.9042 12.7125 11.7125C12.9042 11.5208 13 11.2833 13 11V5C13 4.71667 12.9042 4.47917 12.7125 4.2875C12.5208 4.09583 12.2833 4 12 4C11.7167 4 11.4792 4.09583 11.2875 4.2875C11.0958 4.47917 11 4.71667 11 5V11C11 11.2833 11.0958 11.5208 11.2875 11.7125C11.4792 11.9042 11.7167 12 12 12Z"class='voice' fill="currentColor"></path></svg></span>
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
              const chatsArray = data[i].msgSent.map((c, ix) => {
                const hour = String(
                  data[i].chatTime[ix].timeOfLastChatHour
                ).padStart(2, 0);
                const minutes = String(
                  data[i].chatTime[ix].timeOfLastChatMins
                ).padStart(2, 0);
                const timeOfSend = `${hour}:${minutes}`;
                const chatBoxTwo = document.querySelector(".chat-box-two");

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
           <span aria-hidden="true" data-icon="video-call-refreshed" class="video"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H16C16.55 4 17.0208 4.19583 17.4125 4.5875C17.8042 4.97917 18 5.45 18 6V10.5L21.15 7.35C21.3167 7.18333 21.5 7.14167 21.7 7.225C21.9 7.30833 22 7.46667 22 7.7V16.3C22 16.5333 21.9 16.6917 21.7 16.775C21.5 16.8583 21.3167 16.8167 21.15 16.65L18 13.5V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H4ZM4 18H16V6H4V18Z" class='video-icon' fill="currentColor"></path></svg></span>
           <span aria-hidden="true" data-icon="ic-chevron-down-menu" class="xdwrcjd"><svg viewBox="0 0 20 20" height="20" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.99971 12.1L14.8997 7.2C15.083 7.01667 15.3164 6.925 15.5997 6.925C15.883 6.925 16.1164 7.01667 16.2997 7.2C16.483 7.38333 16.5747 7.61667 16.5747 7.9C16.5747 8.18333 16.483 8.41667 16.2997 8.6L10.6997 14.2C10.4997 14.4 10.2664 14.5 9.99971 14.5C9.73304 14.5 9.49971 14.4 9.29971 14.2L3.69971 8.6C3.51637 8.41667 3.42471 8.18333 3.42471 7.9C3.42471 7.61667 3.51637 7.38333 3.69971 7.2C3.88304 7.01667 4.11637 6.925 4.39971 6.925C4.68304 6.925 4.91637 7.01667 5.09971 7.2L9.99971 12.1Z" class='drop-icon' fill="currentColor"></path></svg></span>
            </div>
           <span aria-hidden="true" data-icon="search-refreshed" class="search"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" class='search-icon' fill="#0A0A0A"></path></svg></span>
          <span aria-hidden="true" data-icon="more-refreshed" class="options"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z" class='options-icon 'fill="currentColor"></path></svg></span>

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
          <span aria-hidden="true" data-icon="plus-rounded" class="attachment"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class="x11xpdln x1d8287x x1h4ghdb" fill="none"><title></title><path d="M11 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11V5.5C11 4.94772 11.4477 4.5 12 4.5C12.5523 4.5 13 4.94772 13 5.5V11H18.5C19.0523 11 19.5 11.4477 19.5 12C19.5 12.5523 19.0523 13 18.5 13H13V18.5C13 19.0523 12.5523 19.5 12 19.5C11.4477 19.5 11 19.0523 11 18.5V13Z"class='plus' fill="currentColor"></path></svg></span>

          <span aria-hidden="true" data-icon="expressions" class="emoji"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M8.49893 10.2521C9.32736 10.2521 9.99893 9.5805 9.99893 8.75208C9.99893 7.92365 9.32736 7.25208 8.49893 7.25208C7.6705 7.25208 6.99893 7.92365 6.99893 8.75208C6.99893 9.5805 7.6705 10.2521 8.49893 10.2521Z" fill="currentColor"></path><path d="M17.0011 8.75208C17.0011 9.5805 16.3295 10.2521 15.5011 10.2521C14.6726 10.2521 14.0011 9.5805 14.0011 8.75208C14.0011 7.92365 14.6726 7.25208 15.5011 7.25208C16.3295 7.25208 17.0011 7.92365 17.0011 8.75208Z" class='emoji' fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.8221 19.9799C15.5379 21.2537 13.8087 21.9781 12 22H9.27273C5.25611 22 2 18.7439 2 14.7273V9.27273C2 5.25611 5.25611 2 9.27273 2H14.7273C18.7439 2 22 5.25611 22 9.27273V11.8141C22 13.7532 21.2256 15.612 19.8489 16.9776L16.8221 19.9799ZM14.7273 4H9.27273C6.36068 4 4 6.36068 4 9.27273V14.7273C4 17.6393 6.36068 20 9.27273 20H11.3331C11.722 19.8971 12.0081 19.5417 12.0058 19.1204L11.9935 16.8564C11.9933 16.8201 11.9935 16.784 11.9941 16.7479C11.0454 16.7473 10.159 16.514 9.33502 16.0479C8.51002 15.5812 7.84752 14.9479 7.34752 14.1479C7.24752 13.9479 7.25585 13.7479 7.37252 13.5479C7.48919 13.3479 7.66419 13.2479 7.89752 13.2479L13.5939 13.2479C14.4494 12.481 15.5811 12.016 16.8216 12.0208L19.0806 12.0296C19.5817 12.0315 19.9889 11.6259 19.9889 11.1248V9.07648H19.9964C19.8932 6.25535 17.5736 4 14.7273 4ZM14.0057 19.1095C14.0066 19.2605 13.9959 19.4089 13.9744 19.5537C14.5044 19.3124 14.9926 18.9776 15.4136 18.5599L18.4405 15.5576C18.8989 15.1029 19.2653 14.5726 19.5274 13.996C19.3793 14.0187 19.2275 14.0301 19.0729 14.0295L16.8138 14.0208C15.252 14.0147 13.985 15.2837 13.9935 16.8455L14.0057 19.1095Z"class='emoji' fill="currentColor"></path></svg></span>
          </div>
         <input type="text" class="message-space" placeholder="Type a message">

         <button aria-label="Send" class="send-button hidden" data-id=${i}><span aria-hidden="true" data-icon="wds-ic-send-filled" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M5.4 19.425C5.06667 19.5583 4.75 19.5291 4.45 19.3375C4.15 19.1458 4 18.8666 4 18.5V14L12 12L4 9.99997V5.49997C4 5.1333 4.15 4.85414 4.45 4.66247C4.75 4.4708 5.06667 4.44164 5.4 4.57497L20.8 11.075C21.2167 11.2583 21.425 11.5666 21.425 12C21.425 12.4333 21.2167 12.7416 20.8 12.925L5.4 19.425Z" class='send' fill="#FFFFFF"></path></svg></span></button>
        
         <div class="voice-recording-icon" >
        <span aria-hidden="true" data-icon="mic-outlined" class="microphone"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class=""><title></title><path d="M12 14C11.1667 14 10.4583 13.7083 9.875 13.125C9.29167 12.5417 9 11.8333 9 11V5C9 4.16667 9.29167 3.45833 9.875 2.875C10.4583 2.29167 11.1667 2 12 2C12.8333 2 13.5417 2.29167 14.125 2.875C14.7083 3.45833 15 4.16667 15 5V11C15 11.8333 14.7083 12.5417 14.125 13.125C13.5417 13.7083 12.8333 14 12 14ZM12 21C11.4477 21 11 20.5523 11 20V17.925C9.26667 17.6917 7.83333 16.9167 6.7 15.6C5.78727 14.5396 5.24207 13.3387 5.06441 11.9973C4.9919 11.4498 5.44772 11 6 11C6.55228 11 6.98782 11.4518 7.0905 11.9945C7.27271 12.9574 7.73004 13.805 8.4625 14.5375C9.4375 15.5125 10.6167 16 12 16C13.3833 16 14.5625 15.5125 15.5375 14.5375C16.27 13.805 16.7273 12.9574 16.9095 11.9945C17.0122 11.4518 17.4477 11 18 11C18.5523 11 19.0081 11.4498 18.9356 11.9973C18.7579 13.3387 18.2127 14.5396 17.3 15.6C16.1667 16.9167 14.7333 17.6917 13 17.925V20C13 20.5523 12.5523 21 12 21ZM12 12C12.2833 12 12.5208 11.9042 12.7125 11.7125C12.9042 11.5208 13 11.2833 13 11V5C13 4.71667 12.9042 4.47917 12.7125 4.2875C12.5208 4.09583 12.2833 4 12 4C11.7167 4 11.4792 4.09583 11.2875 4.2875C11.0958 4.47917 11 4.71667 11 5V11C11 11.2833 11.0958 11.5208 11.2875 11.7125C11.4792 11.9042 11.7167 12 12 12Z"class='voice' fill="currentColor"></path></svg></span>
         </div>
        </div>
          
          `;
          chatInterface.innerHTML = "";
          chatInterface.insertAdjacentHTML("afterbegin", markup);
          chatInterface.classList.remove("hidden");
        }
        chatList.renderMarkup(data);
        const chatProper = document.querySelectorAll(".chat-list-link");
        chatList.renderUnreadChatsInterface(chatProper, data, storedChatsInfo);

        const renderSendButton = function (data) {
          const messageSpace = document.querySelector(".message-space");
          const sendButton = document.querySelector(".send-button");
          const voiceRecord = document.querySelector(".voice-recording-icon");
          messageSpace.addEventListener("input", function () {
            sendButton.classList.remove("hidden");
            voiceRecord.classList.add("hidden");
            if (messageSpace.value.trim() === "") {
              sendButton.classList.add("hidden");
              voiceRecord.classList.remove("hidden");
            }
          });
          sendButton?.addEventListener("click", function () {
            const id = +sendButton.dataset.id;
            const message = messageSpace.value.trim();
            messageSpace.value = "";
            if (messageSpace.value.trim() === "") {
              sendButton.classList.add("hidden");
              voiceRecord.classList.remove("hidden");
            }
            chatList.showMessage(
              message,
              data[id].msgSent,
              data,
              id,
              storedChatsInfo
            );
            console.log(data);
            chatList.renderMarkup(data);
            const chatProper = document.querySelectorAll(".chat-list-link");
            chatList.renderUnreadChatsInterface(
              chatProper,
              data,
              storedChatsInfo
            );
          });
        };
        renderSendButton(data);
      });
    });
  }
  renderMarkup(chats) {
    this.clearContainer();
    chats.forEach((obj) => {
      const renderedMessageArr =
        obj.msgSent.length >= 1 ? obj.msgSent : obj.msgRecieved;
      const hr = obj.chatTime.at(-1).timeOfLastChatHour;
      const min = obj.chatTime.at(-1).timeOfLastChatMins;
      const minString = String(min).padStart(2, 0);
      const hrString = String(hr).padStart(2, 0);
      const time = `${hrString}:${minString}`;
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
              obj.unread === false ? "greyColor" : ""
            }">${time}</p>
            <div class='flex'>
          <div class="message-no  ${obj.unread === false ? "hidden" : ""}" ">${
        renderedMessageArr.length
      }</div>
      <span aria-hidden="true" data-icon="ic-chevron-down-menu" data-id=${
        obj.id
      } class="favorites-dropdown hidden"><svg viewBox="0 0 20 20" height="20" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.99971 12.1L14.8997 7.2C15.083 7.01667 15.3164 6.925 15.5997 6.925C15.883 6.925 16.1164 7.01667 16.2997 7.2C16.483 7.38333 16.5747 7.61667 16.5747 7.9C16.5747 8.18333 16.483 8.41667 16.2997 8.6L10.6997 14.2C10.4997 14.4 10.2664 14.5 9.99971 14.5C9.73304 14.5 9.49971 14.4 9.29971 14.2L3.69971 8.6C3.51637 8.41667 3.42471 8.18333 3.42471 7.9C3.42471 7.61667 3.51637 7.38333 3.69971 7.2C3.88304 7.01667 4.11637 6.925 4.39971 6.925C4.68304 6.925 4.91637 7.01667 5.09971 7.2L9.99971 12.1Z" class='drop-icon' fill="#626262"></path></svg></span>
        <div class="dropdown-menu hidden">
        <div class="chats-options">
        <div>
        <span aria-hidden="true" data-icon="archive-refreshed" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>archive-refreshed</title><path d="M5 8V19H19V8H5ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V6.525C3 6.29167 3.0375 6.06667 3.1125 5.85C3.1875 5.63333 3.3 5.43333 3.45 5.25L4.7 3.725C4.88333 3.49167 5.1125 3.3125 5.3875 3.1875C5.6625 3.0625 5.95 3 6.25 3H17.75C18.05 3 18.3375 3.0625 18.6125 3.1875C18.8875 3.3125 19.1167 3.49167 19.3 3.725L20.55 5.25C20.7 5.43333 20.8125 5.63333 20.8875 5.85C20.9625 6.06667 21 6.29167 21 6.525V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5.4 6H18.6L17.75 5H6.25L5.4 6Z" fill="#626262"></path><path d="M15.3 14.45L12 17.75L8.7 14.45C8.3134 14.0634 8.3134 13.4366 8.7 13.05C9.0866 12.6634 9.7134 12.6634 10.1 13.05L11 13.95V10.75C11 10.1977 11.4477 9.75 12 9.75C12.5523 9.75 13 10.1977 13 10.75V13.95L13.9 13.05C14.2866 12.6634 14.9134 12.6634 15.3 13.05C15.6866 13.4366 15.6866 14.0634 15.3 14.45Z" fill="#626262" class=""></path></svg></span>
        <p>Archive chat</p>
        </div>
         <div>
        <span aria-hidden="true" data-icon="mute-notifications-refreshed" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>mute-notifications-refreshed</title><path d="M5.00039 19C4.44811 19 4.00039 18.5523 4.00039 18C4.00039 17.4477 4.44811 17 5.00039 17H6.00039V10C6.00039 9.45 6.07122 8.90833 6.21289 8.375C6.35456 7.84167 6.56706 7.33333 6.85039 6.85L8.35039 8.35C8.23372 8.61667 8.14622 8.8875 8.08789 9.1625C8.02956 9.4375 8.00039 9.71667 8.00039 10V17H14.2004L2.10039 4.9C1.71379 4.5134 1.71379 3.8866 2.10039 3.5C2.48699 3.1134 3.11379 3.1134 3.50039 3.5L20.498 20.4976C20.8859 20.8855 20.8859 21.5145 20.498 21.9024C20.1119 22.2885 19.4867 22.2906 19.098 21.9072L16.1504 19H5.00039ZM18.0004 15.15L16.0004 13.15V10C16.0004 8.9 15.6087 7.95833 14.8254 7.175C14.0421 6.39167 13.1004 6 12.0004 6C11.5671 6 11.1504 6.06667 10.7504 6.2C10.3504 6.33333 9.98372 6.53333 9.65039 6.8L8.20039 5.35C8.53372 5.08333 8.89206 4.85 9.27539 4.65C9.65872 4.45 10.0671 4.3 10.5004 4.2V3.5C10.5004 3.08333 10.6462 2.72917 10.9379 2.4375C11.2296 2.14583 11.5837 2 12.0004 2C12.4171 2 12.7712 2.14583 13.0629 2.4375C13.3546 2.72917 13.5004 3.08333 13.5004 3.5V4.2C14.8337 4.53333 15.9171 5.2375 16.7504 6.3125C17.5837 7.3875 18.0004 8.61667 18.0004 10V15.15ZM12.0004 22C11.4504 22 10.9796 21.8042 10.5879 21.4125C10.1962 21.0208 10.0004 20.55 10.0004 20H14.0004C14.0004 20.55 13.8046 21.0208 13.4129 21.4125C13.0212 21.8042 12.5504 22 12.0004 22Z" fill="currentColor"></path></svg></span>
        <p>Mute notifications</p>
        </div>
        <div>
        <span aria-hidden="true" data-icon="pin-refreshed" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>pin-refreshed</title><path d="M16 5V12L17.7 13.7C17.8 13.8 17.875 13.9125 17.925 14.0375C17.975 14.1625 18 14.2917 18 14.425V15C18 15.2833 17.9042 15.5208 17.7125 15.7125C17.5208 15.9042 17.2833 16 17 16H13V21.85C13 22.1333 12.9042 22.3708 12.7125 22.5625C12.5208 22.7542 12.2833 22.85 12 22.85C11.7167 22.85 11.4792 22.7542 11.2875 22.5625C11.0958 22.3708 11 22.1333 11 21.85V16H7C6.71667 16 6.47917 15.9042 6.2875 15.7125C6.09583 15.5208 6 15.2833 6 15V14.425C6 14.2917 6.025 14.1625 6.075 14.0375C6.125 13.9125 6.2 13.8 6.3 13.7L8 12V5C7.71667 5 7.47917 4.90417 7.2875 4.7125C7.09583 4.52083 7 4.28333 7 4C7 3.71667 7.09583 3.47917 7.2875 3.2875C7.47917 3.09583 7.71667 3 8 3H16C16.2833 3 16.5208 3.09583 16.7125 3.2875C16.9042 3.47917 17 3.71667 17 4C17 4.28333 16.9042 4.52083 16.7125 4.7125C16.5208 4.90417 16.2833 5 16 5ZM8.85 14H15.15L14 12.85V5H10V12.85L8.85 14Z" fill="currentColor"></path></svg></span>
        <p>Pin Chat</p>
        </div>
        <div>
       <span aria-hidden="true" data-icon="chat-unread-refreshed" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>chat-unread-refreshed</title><path d="M7.00016 10C7.00016 9.44772 7.44787 9 8.00016 9H17.0002C17.5524 9 18.0002 9.44772 18.0002 10C18.0002 10.5523 17.5524 11 17.0002 11H8.00016C7.44787 11 7.00016 10.5523 7.00016 10Z" fill="currentColor"></path><path d="M7.00016 14C7.00016 13.4477 7.44787 13 8.00016 13H14.0002C14.5524 13 15.0002 13.4477 15.0002 14C15.0002 14.5523 14.5524 15 14.0002 15H8.00016C7.44787 15 7.00016 14.5523 7.00016 14Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.0002 5C16.0002 4.44772 15.5524 4 15.0002 4H1.79015C1.01286 4 0.540213 4.86348 0.940127 5.53L3.00016 9V17.3333C3.00016 18.8061 4.19406 20 5.66682 20H19.3335C20.8062 20 22.0002 18.8061 22.0002 17.3333V11C22.0002 10.4477 21.5524 10 21.0002 10C20.4479 10 20.0002 10.4477 20.0002 11V17.3333C20.0002 17.7015 19.7017 18 19.3335 18H5.66682C5.29863 18 5.00016 17.7015 5.00016 17.3333V8.44603L3.53254 6H15.0002C15.5524 6 16.0002 5.55228 16.0002 5Z" fill="currentColor"></path><path d="M21.0002 8C21.8002 8 22.5602 7.68 23.1202 7.12C23.6802 6.56 24.0002 5.79 24.0002 5C24.0002 4.21 23.6802 3.44 23.1202 2.88C22.5602 2.32 21.7902 2 21.0002 2C20.2102 2 19.4402 2.32 18.8802 2.88C18.3202 3.44 18.0002 4.21 18.0002 5C18.0002 5.79 18.3202 6.56 18.8802 7.12C19.4402 7.68 20.2102 8 21.0002 8Z" fill="currentColor"></path></svg></span>
        <p>Mark as Unread</p>
        </div>
         <div>
      <span aria-hidden="true" data-icon="favorite-refreshed" class="" data-id=${
        obj.id
      }><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>favorite-refreshed</title><path fill-rule="evenodd" clip-rule="evenodd" d="M12 20.9951C11.7667 20.9951 11.5292 20.9534 11.2875 20.8701C11.0458 20.7867 10.8333 20.6534 10.65 20.4701L8.925 18.8951C7.15833 17.2784 5.5625 15.6742 4.1375 14.0826C2.7125 12.4909 2 10.7367 2 8.82007C2 7.2534 2.525 5.94507 3.575 4.89507C4.625 3.84507 5.93333 3.32007 7.5 3.32007C8.38333 3.32007 9.21667 3.50757 10 3.88257C10.7833 4.25757 11.45 4.77007 12 5.42007C12.55 4.77007 13.2167 4.25757 14 3.88257C14.7833 3.50757 15.6167 3.32007 16.5 3.32007C18.0667 3.32007 19.375 3.84507 20.425 4.89507C21.475 5.94507 22 7.2534 22 8.82007C22 10.7367 21.2917 12.4951 19.875 14.0951C18.4583 15.6951 16.85 17.3034 15.05 18.9201L13.35 20.4701C13.1667 20.6534 12.9542 20.7867 12.7125 20.8701C12.4708 20.9534 12.2333 20.9951 12 20.9951ZM11.05 7.42007C10.5667 6.73674 10.05 6.2159 9.5 5.85757C8.95 5.49924 8.28333 5.32007 7.5 5.32007C6.5 5.32007 5.66667 5.6534 5 6.32007C4.33333 6.98674 4 7.82007 4 8.82007C4 9.68674 4.30833 10.6076 4.925 11.5826C5.54167 12.5576 6.27917 13.5034 7.1375 14.4201C7.99583 15.3367 8.87917 16.1951 9.7875 16.9951C10.6958 17.7951 11.4333 18.4534 12 18.9701C12.5667 18.4534 13.3042 17.7951 14.2125 16.9951C15.1208 16.1951 16.0042 15.3367 16.8625 14.4201C17.7208 13.5034 18.4583 12.5576 19.075 11.5826C19.6917 10.6076 20 9.68674 20 8.82007C20 7.82007 19.6667 6.98674 19 6.32007C18.3333 5.6534 17.5 5.32007 16.5 5.32007C15.7167 5.32007 15.05 5.49924 14.5 5.85757C13.95 6.2159 13.4333 6.73674 12.95 7.42007C12.8333 7.58674 12.6917 7.71174 12.525 7.79507C12.3583 7.8784 12.1833 7.92007 12 7.92007C11.8167 7.92007 11.6417 7.8784 11.475 7.79507C11.3083 7.71174 11.1667 7.58674 11.05 7.42007Z" fill="currentColor"></path></svg></span>
        <p>Add to favorites</p>
        </div>
        <hr class="seperator"></hr>
         <div>
     <span aria-hidden="true" data-icon="block-refreshed" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>block-refreshed</title><path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C12.9 20 13.7667 19.8542 14.6 19.5625C15.4333 19.2708 16.2 18.85 16.9 18.3L5.7 7.1C5.15 7.8 4.72917 8.56667 4.4375 9.4C4.14583 10.2333 4 11.1 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20ZM18.3 16.9C18.85 16.2 19.2708 15.4333 19.5625 14.6C19.8542 13.7667 20 12.9 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C11.1 4 10.2333 4.14583 9.4 4.4375C8.56667 4.72917 7.8 5.15 7.1 5.7L18.3 16.9Z" fill="currentColor"></path></svg></span>
        <p>Block</p>
        </div>
        <div>
    <span aria-hidden="true" data-icon="delete" class=""><svg viewBox="0 0 24 25" height="25" width="24" preserveAspectRatio="xMidYMid meet" class=""><title>delete</title><path d="M7 21.5C6.45 21.5 5.97917 21.3042 5.5875 20.9125C5.19583 20.5208 5 20.05 5 19.5V6.5C4.71667 6.5 4.47917 6.40417 4.2875 6.2125C4.09583 6.02083 4 5.78333 4 5.5C4 5.21667 4.09583 4.97917 4.2875 4.7875C4.47917 4.59583 4.71667 4.5 5 4.5H9C9 4.21667 9.09583 3.97917 9.2875 3.7875C9.47917 3.59583 9.71667 3.5 10 3.5H14C14.2833 3.5 14.5208 3.59583 14.7125 3.7875C14.9042 3.97917 15 4.21667 15 4.5H19C19.2833 4.5 19.5208 4.59583 19.7125 4.7875C19.9042 4.97917 20 5.21667 20 5.5C20 5.78333 19.9042 6.02083 19.7125 6.2125C19.5208 6.40417 19.2833 6.5 19 6.5V19.5C19 20.05 18.8042 20.5208 18.4125 20.9125C18.0208 21.3042 17.55 21.5 17 21.5H7ZM17 6.5H7V19.5H17V6.5ZM10 17.5C10.2833 17.5 10.5208 17.4042 10.7125 17.2125C10.9042 17.0208 11 16.7833 11 16.5V9.5C11 9.21667 10.9042 8.97917 10.7125 8.7875C10.5208 8.59583 10.2833 8.5 10 8.5C9.71667 8.5 9.47917 8.59583 9.2875 8.7875C9.09583 8.97917 9 9.21667 9 9.5V16.5C9 16.7833 9.09583 17.0208 9.2875 17.2125C9.47917 17.4042 9.71667 17.5 10 17.5ZM14 17.5C14.2833 17.5 14.5208 17.4042 14.7125 17.2125C14.9042 17.0208 15 16.7833 15 16.5V9.5C15 9.21667 14.9042 8.97917 14.7125 8.7875C14.5208 8.59583 14.2833 8.5 14 8.5C13.7167 8.5 13.4792 8.59583 13.2875 8.7875C13.0958 8.97917 13 9.21667 13 9.5V16.5C13 16.7833 13.0958 17.0208 13.2875 17.2125C13.4792 17.4042 13.7167 17.5 14 17.5Z" fill="currentColor"></path></svg></span>
        <p>Delete chat</p>
        </div>
        </div>
      </div>
      
      </div>
          </div>

          </div>
          </a>
    
    `;
      chatListContainer.insertAdjacentHTML("beforeend", html);
    });
  }
  renderFavoritesDropdown() {
    const chatProper = document.querySelectorAll(".chat-list-link");
    chatProper.forEach((c) => {
      c.addEventListener("mouseover", function (e) {
        e.stopPropagation();
        const dropdown = c.querySelector(".favorites-dropdown");
        dropdown.classList.remove("hidden");
        dropdown.addEventListener("click", function (e) {
          e.stopPropagation();

          const parent = dropdown.closest(".flex");
          const dropdownMenu = parent.querySelector(".dropdown-menu");
          dropdownMenu.classList.remove("hidden");
          setTimeout(() => {
            const chatListRect = chatContainer.getBoundingClientRect();
            const dropdownMenuRect = dropdownMenu.getBoundingClientRect();
            const spaceBelow = chatListRect.bottom - dropdownMenuRect.bottom;

            if (spaceBelow < 10) {
              console.log("no space down");
              dropdownMenu.style.top = "auto"; // reset top
              dropdownMenu.style.bottom = "100%"; // position above parent
            } else {
              console.log("space dey");
              dropdownMenu.style.bottom = "auto"; // reset bottom
              dropdownMenu.style.top = "100%"; // position below parent
            }
          }, 0);

          dropdownMenu.addEventListener("click", function (e) {
            e.stopPropagation();
          });
          const dropdownMenuDiv = dropdownMenu.querySelector(".chats-options");
          const children = dropdownMenuDiv.querySelectorAll("div");
          children.forEach((d) => {
            d.addEventListener("mouseover", function (e) {
              e.stopPropagation();
              // d.style.backgroundColor = "#F6F5F3";
            });
            d.addEventListener("mouseout", function (e) {
              e.stopPropagation();
              d.style.backgroundColor = "#FFFFFF";
            });
          });
        });
      });
      c.addEventListener("mouseout", function (e) {
        e.stopPropagation();
        c.querySelector(".favorites-dropdown").classList.add("hidden");
      });
    });
    document.addEventListener("click", function (e) {
      const isClickInside =
        e.target.closest(".dropdown-menu") ||
        e.target.closest(".favorites-dropdown");
      if (!isClickInside) {
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
          menu.classList.add("hidden");
        });
      }
    });
  }
  showMessage(message, arr, data, id, main) {
    const now = new Date();
    console.log(now);
    console.log(now.getDay());
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const dateString = `${year}-${String(month).padStart(2, 0)}-${String(
      day
    ).padStart(2, 0)}`;

    arr.push(message);

    const chatBoxTwo = document.querySelector(".chat-box-two");
    console.log(dateString);

    data[id].seen = false;
    const timeObj = {
      dayOfMessage: dateString,
      timeOfLastChatHour: hour,
      timeOfLastChatMins: minutes,
      timeOfLastChatSec: seconds,
    };
    const timeOfSend = `${String(timeObj.timeOfLastChatHour).padStart(
      2,
      0
    )}:${String(timeObj.timeOfLastChatMins).padStart(2, 0)}`;
    data[id].chatTime.push(timeObj);
    this.sortChats(data);
    console.log(data);
    localStorage.setItem("chats", JSON.stringify(main));
    // const targetedChat = data.find((c) => c.id === id);
    // console.log(targetedChat);

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
    const chatBoxTwos = document.querySelector(".message-tag-d");
    chatBoxTwo.insertAdjacentHTML("beforeend", html);
  }

  renderChatsOnInterface(arr, data) {
    const chatProperArr = Array.from(arr);
    chatProperArr.forEach((l, i) => {
      l.addEventListener("click", function () {
        if (data[i].unread === true) data[i].unread = false;
        console.log(data);
        localStorage.setItem("chats", JSON.stringify(data));
        const noOfUnreadMessages = data.filter((d) => d.unread === true).length;
        unreadMessages.textContent = noOfUnreadMessages;
        if (noOfUnreadMessages === 0) unreadMessages.classList.add("hidden");

        if (data[i].msgRecieved.length > 0 && data[i].msgSent.length === 0) {
          const generateMarkup = function () {
            let markup;
            if (data[i].msgSent.length > 0) {
              const chatsArray = data[i].msgSent.map((c, ix) => {
                const hour = String(
                  data[i].chatTime[ix + 1].timeOfLastChatHour
                ).padStart(2, 0);
                const minutes = String(
                  data[i].chatTime[ix + 1].timeOfLastChatMins
                ).padStart(2, 0);

                const timeOfSend = `${hour}:${minutes}`;

                const chatBoxTwo = document.querySelector(".chat-box-two");

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
           <span aria-hidden="true" data-icon="video-call-refreshed" class="video"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H16C16.55 4 17.0208 4.19583 17.4125 4.5875C17.8042 4.97917 18 5.45 18 6V10.5L21.15 7.35C21.3167 7.18333 21.5 7.14167 21.7 7.225C21.9 7.30833 22 7.46667 22 7.7V16.3C22 16.5333 21.9 16.6917 21.7 16.775C21.5 16.8583 21.3167 16.8167 21.15 16.65L18 13.5V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H4ZM4 18H16V6H4V18Z" class='video-icon' fill="currentColor"></path></svg></span>
           <span aria-hidden="true" data-icon="ic-chevron-down-menu" class="xdwrcjd"><svg viewBox="0 0 20 20" height="20" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.99971 12.1L14.8997 7.2C15.083 7.01667 15.3164 6.925 15.5997 6.925C15.883 6.925 16.1164 7.01667 16.2997 7.2C16.483 7.38333 16.5747 7.61667 16.5747 7.9C16.5747 8.18333 16.483 8.41667 16.2997 8.6L10.6997 14.2C10.4997 14.4 10.2664 14.5 9.99971 14.5C9.73304 14.5 9.49971 14.4 9.29971 14.2L3.69971 8.6C3.51637 8.41667 3.42471 8.18333 3.42471 7.9C3.42471 7.61667 3.51637 7.38333 3.69971 7.2C3.88304 7.01667 4.11637 6.925 4.39971 6.925C4.68304 6.925 4.91637 7.01667 5.09971 7.2L9.99971 12.1Z" class='drop-icon' fill="currentColor"></path></svg></span>
            </div>
           <span aria-hidden="true" data-icon="search-refreshed" class="search"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" class='search-icon' fill="#0A0A0A"></path></svg></span>
          <span aria-hidden="true" data-icon="more-refreshed" class="options"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z"  class='options-icon'fill="currentColor"></path></svg></span>

          </div>

        </div>
        <div class="chat-interface_chats">
          <div class="chat-box-one">
            <div>

<p>${data[i].msgRecieved[0]}</p>
                <span>${data[i].chatTime[0].timeOfLastChatHour}:${String(
            data[i].chatTime[0].timeOfLastChatMins
          ).padStart(2, 0)}</span>


            </div>

          </div>
          <div class="chat-box-two">

          ${generateMarkup()?.join("") || ""}
    
     

          </div>
        </div>
        <div class="chat-interface_message-bar">
          <div class="accessory-icons">
          <span aria-hidden="true" data-icon="plus-rounded" class="attachment"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class="x11xpdln x1d8287x x1h4ghdb" fill="none"><title></title><path d="M11 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11V5.5C11 4.94772 11.4477 4.5 12 4.5C12.5523 4.5 13 4.94772 13 5.5V11H18.5C19.0523 11 19.5 11.4477 19.5 12C19.5 12.5523 19.0523 13 18.5 13H13V18.5C13 19.0523 12.5523 19.5 12 19.5C11.4477 19.5 11 19.0523 11 18.5V13Z"class='plus' fill="currentColor"></path></svg></span>

          <span aria-hidden="true" data-icon="expressions" class="emoji"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M8.49893 10.2521C9.32736 10.2521 9.99893 9.5805 9.99893 8.75208C9.99893 7.92365 9.32736 7.25208 8.49893 7.25208C7.6705 7.25208 6.99893 7.92365 6.99893 8.75208C6.99893 9.5805 7.6705 10.2521 8.49893 10.2521Z" fill="currentColor"></path><path d="M17.0011 8.75208C17.0011 9.5805 16.3295 10.2521 15.5011 10.2521C14.6726 10.2521 14.0011 9.5805 14.0011 8.75208C14.0011 7.92365 14.6726 7.25208 15.5011 7.25208C16.3295 7.25208 17.0011 7.92365 17.0011 8.75208Z" class='emoji' fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.8221 19.9799C15.5379 21.2537 13.8087 21.9781 12 22H9.27273C5.25611 22 2 18.7439 2 14.7273V9.27273C2 5.25611 5.25611 2 9.27273 2H14.7273C18.7439 2 22 5.25611 22 9.27273V11.8141C22 13.7532 21.2256 15.612 19.8489 16.9776L16.8221 19.9799ZM14.7273 4H9.27273C6.36068 4 4 6.36068 4 9.27273V14.7273C4 17.6393 6.36068 20 9.27273 20H11.3331C11.722 19.8971 12.0081 19.5417 12.0058 19.1204L11.9935 16.8564C11.9933 16.8201 11.9935 16.784 11.9941 16.7479C11.0454 16.7473 10.159 16.514 9.33502 16.0479C8.51002 15.5812 7.84752 14.9479 7.34752 14.1479C7.24752 13.9479 7.25585 13.7479 7.37252 13.5479C7.48919 13.3479 7.66419 13.2479 7.89752 13.2479L13.5939 13.2479C14.4494 12.481 15.5811 12.016 16.8216 12.0208L19.0806 12.0296C19.5817 12.0315 19.9889 11.6259 19.9889 11.1248V9.07648H19.9964C19.8932 6.25535 17.5736 4 14.7273 4ZM14.0057 19.1095C14.0066 19.2605 13.9959 19.4089 13.9744 19.5537C14.5044 19.3124 14.9926 18.9776 15.4136 18.5599L18.4405 15.5576C18.8989 15.1029 19.2653 14.5726 19.5274 13.996C19.3793 14.0187 19.2275 14.0301 19.0729 14.0295L16.8138 14.0208C15.252 14.0147 13.985 15.2837 13.9935 16.8455L14.0057 19.1095Z"class='emoji' fill="currentColor"></path></svg></span>
          </div>
         <input type="text" class="message-space" placeholder="Type a message">

         <button aria-label="Send" class="send-button hidden" data-id=${i}><span aria-hidden="true" data-icon="wds-ic-send-filled" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M5.4 19.425C5.06667 19.5583 4.75 19.5291 4.45 19.3375C4.15 19.1458 4 18.8666 4 18.5V14L12 12L4 9.99997V5.49997C4 5.1333 4.15 4.85414 4.45 4.66247C4.75 4.4708 5.06667 4.44164 5.4 4.57497L20.8 11.075C21.2167 11.2583 21.425 11.5666 21.425 12C21.425 12.4333 21.2167 12.7416 20.8 12.925L5.4 19.425Z" class='send' fill="#FFFFFF"></path></svg></span></button>
        
         <div class="voice-recording-icon" >
        <span aria-hidden="true" data-icon="mic-outlined" class="microphone"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class=""><title></title><path d="M12 14C11.1667 14 10.4583 13.7083 9.875 13.125C9.29167 12.5417 9 11.8333 9 11V5C9 4.16667 9.29167 3.45833 9.875 2.875C10.4583 2.29167 11.1667 2 12 2C12.8333 2 13.5417 2.29167 14.125 2.875C14.7083 3.45833 15 4.16667 15 5V11C15 11.8333 14.7083 12.5417 14.125 13.125C13.5417 13.7083 12.8333 14 12 14ZM12 21C11.4477 21 11 20.5523 11 20V17.925C9.26667 17.6917 7.83333 16.9167 6.7 15.6C5.78727 14.5396 5.24207 13.3387 5.06441 11.9973C4.9919 11.4498 5.44772 11 6 11C6.55228 11 6.98782 11.4518 7.0905 11.9945C7.27271 12.9574 7.73004 13.805 8.4625 14.5375C9.4375 15.5125 10.6167 16 12 16C13.3833 16 14.5625 15.5125 15.5375 14.5375C16.27 13.805 16.7273 12.9574 16.9095 11.9945C17.0122 11.4518 17.4477 11 18 11C18.5523 11 19.0081 11.4498 18.9356 11.9973C18.7579 13.3387 18.2127 14.5396 17.3 15.6C16.1667 16.9167 14.7333 17.6917 13 17.925V20C13 20.5523 12.5523 21 12 21ZM12 12C12.2833 12 12.5208 11.9042 12.7125 11.7125C12.9042 11.5208 13 11.2833 13 11V5C13 4.71667 12.9042 4.47917 12.7125 4.2875C12.5208 4.09583 12.2833 4 12 4C11.7167 4 11.4792 4.09583 11.2875 4.2875C11.0958 4.47917 11 4.71667 11 5V11C11 11.2833 11.0958 11.5208 11.2875 11.7125C11.4792 11.9042 11.7167 12 12 12Z"class='voice' fill="currentColor"></path></svg></span>
         </div>
        </div>
          
          `;
          chatInterface.innerHTML = "";
          chatInterface.insertAdjacentHTML("afterbegin", markup);
          chatInterface.classList.remove("hidden");
        }

        if (data[i].msgRecieved.length > 0 && data[i].msgSent.length > 0) {
          const generateMarkup = function () {
            let markup;

            if (data[i].msgSent.length > 0) {
              const chatsArray = data[i].msgSent.map((c, ix) => {
                const hour = String(
                  data[i].chatTime[ix + 1].timeOfLastChatHour
                ).padStart(2, 0);
                const minutes = String(
                  data[i].chatTime[ix + 1].timeOfLastChatMins
                ).padStart(2, 0);

                const timeOfSend = `${hour}:${minutes}`;

                const chatBoxTwo = document.querySelector(".chat-box-two");

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
           <span aria-hidden="true" data-icon="video-call-refreshed" class="video"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H16C16.55 4 17.0208 4.19583 17.4125 4.5875C17.8042 4.97917 18 5.45 18 6V10.5L21.15 7.35C21.3167 7.18333 21.5 7.14167 21.7 7.225C21.9 7.30833 22 7.46667 22 7.7V16.3C22 16.5333 21.9 16.6917 21.7 16.775C21.5 16.8583 21.3167 16.8167 21.15 16.65L18 13.5V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H4ZM4 18H16V6H4V18Z" class='video-icon'fill="currentColor"></path></svg></span>
           <span aria-hidden="true" data-icon="ic-chevron-down-menu" class="xdwrcjd"><svg viewBox="0 0 20 20" height="20" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.99971 12.1L14.8997 7.2C15.083 7.01667 15.3164 6.925 15.5997 6.925C15.883 6.925 16.1164 7.01667 16.2997 7.2C16.483 7.38333 16.5747 7.61667 16.5747 7.9C16.5747 8.18333 16.483 8.41667 16.2997 8.6L10.6997 14.2C10.4997 14.4 10.2664 14.5 9.99971 14.5C9.73304 14.5 9.49971 14.4 9.29971 14.2L3.69971 8.6C3.51637 8.41667 3.42471 8.18333 3.42471 7.9C3.42471 7.61667 3.51637 7.38333 3.69971 7.2C3.88304 7.01667 4.11637 6.925 4.39971 6.925C4.68304 6.925 4.91637 7.01667 5.09971 7.2L9.99971 12.1Z" class='drop-icon'fill="currentColor"></path></svg></span>
            </div>
           <span aria-hidden="true" data-icon="search-refreshed" class="search"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" class='search-icon'fill="#0A0A0A"></path></svg></span>
          <span aria-hidden="true" data-icon="more-refreshed" class="options"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z" class='options-icon'fill="currentColor"></path></svg></span>

          </div>

        </div>
        <div class="chat-interface_chats">
          <div class="chat-box-one">
            <div>

<p>${data[i].msgRecieved[0]}</p>
                <span>${data[i].chatTime[0].timeOfLastChatHour}:${String(
            data[i].chatTime[0].timeOfLastChatMins
          ).padStart(2, 0)}</span>


            </div>

          </div>
          <div class="chat-box-two">

          ${generateMarkup()?.join("") || ""}
    
     

          </div>
        </div>
        <div class="chat-interface_message-bar">
           <div class="accessory-icons">
          <span aria-hidden="true" data-icon="plus-rounded" class="attachment"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class="x11xpdln x1d8287x x1h4ghdb" fill="none"><title></title><path d="M11 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11V5.5C11 4.94772 11.4477 4.5 12 4.5C12.5523 4.5 13 4.94772 13 5.5V11H18.5C19.0523 11 19.5 11.4477 19.5 12C19.5 12.5523 19.0523 13 18.5 13H13V18.5C13 19.0523 12.5523 19.5 12 19.5C11.4477 19.5 11 19.0523 11 18.5V13Z"class='plus' fill="currentColor"></path></svg></span>

          <span aria-hidden="true" data-icon="expressions" class="emoji"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M8.49893 10.2521C9.32736 10.2521 9.99893 9.5805 9.99893 8.75208C9.99893 7.92365 9.32736 7.25208 8.49893 7.25208C7.6705 7.25208 6.99893 7.92365 6.99893 8.75208C6.99893 9.5805 7.6705 10.2521 8.49893 10.2521Z" fill="currentColor"></path><path d="M17.0011 8.75208C17.0011 9.5805 16.3295 10.2521 15.5011 10.2521C14.6726 10.2521 14.0011 9.5805 14.0011 8.75208C14.0011 7.92365 14.6726 7.25208 15.5011 7.25208C16.3295 7.25208 17.0011 7.92365 17.0011 8.75208Z" class='emoji' fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.8221 19.9799C15.5379 21.2537 13.8087 21.9781 12 22H9.27273C5.25611 22 2 18.7439 2 14.7273V9.27273C2 5.25611 5.25611 2 9.27273 2H14.7273C18.7439 2 22 5.25611 22 9.27273V11.8141C22 13.7532 21.2256 15.612 19.8489 16.9776L16.8221 19.9799ZM14.7273 4H9.27273C6.36068 4 4 6.36068 4 9.27273V14.7273C4 17.6393 6.36068 20 9.27273 20H11.3331C11.722 19.8971 12.0081 19.5417 12.0058 19.1204L11.9935 16.8564C11.9933 16.8201 11.9935 16.784 11.9941 16.7479C11.0454 16.7473 10.159 16.514 9.33502 16.0479C8.51002 15.5812 7.84752 14.9479 7.34752 14.1479C7.24752 13.9479 7.25585 13.7479 7.37252 13.5479C7.48919 13.3479 7.66419 13.2479 7.89752 13.2479L13.5939 13.2479C14.4494 12.481 15.5811 12.016 16.8216 12.0208L19.0806 12.0296C19.5817 12.0315 19.9889 11.6259 19.9889 11.1248V9.07648H19.9964C19.8932 6.25535 17.5736 4 14.7273 4ZM14.0057 19.1095C14.0066 19.2605 13.9959 19.4089 13.9744 19.5537C14.5044 19.3124 14.9926 18.9776 15.4136 18.5599L18.4405 15.5576C18.8989 15.1029 19.2653 14.5726 19.5274 13.996C19.3793 14.0187 19.2275 14.0301 19.0729 14.0295L16.8138 14.0208C15.252 14.0147 13.985 15.2837 13.9935 16.8455L14.0057 19.1095Z"class='emoji' fill="currentColor"></path></svg></span>
          </div>
         <input type="text" class="message-space" placeholder="Type a message">

         <button aria-label="Send" class="send-button hidden" data-id=${i}><span aria-hidden="true" data-icon="wds-ic-send-filled" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M5.4 19.425C5.06667 19.5583 4.75 19.5291 4.45 19.3375C4.15 19.1458 4 18.8666 4 18.5V14L12 12L4 9.99997V5.49997C4 5.1333 4.15 4.85414 4.45 4.66247C4.75 4.4708 5.06667 4.44164 5.4 4.57497L20.8 11.075C21.2167 11.2583 21.425 11.5666 21.425 12C21.425 12.4333 21.2167 12.7416 20.8 12.925L5.4 19.425Z" class='send' fill="#FFFFFF"></path></svg></span></button>
        
         <div class="voice-recording-icon" >
        <span aria-hidden="true" data-icon="mic-outlined" class="microphone"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class=""><title></title><path d="M12 14C11.1667 14 10.4583 13.7083 9.875 13.125C9.29167 12.5417 9 11.8333 9 11V5C9 4.16667 9.29167 3.45833 9.875 2.875C10.4583 2.29167 11.1667 2 12 2C12.8333 2 13.5417 2.29167 14.125 2.875C14.7083 3.45833 15 4.16667 15 5V11C15 11.8333 14.7083 12.5417 14.125 13.125C13.5417 13.7083 12.8333 14 12 14ZM12 21C11.4477 21 11 20.5523 11 20V17.925C9.26667 17.6917 7.83333 16.9167 6.7 15.6C5.78727 14.5396 5.24207 13.3387 5.06441 11.9973C4.9919 11.4498 5.44772 11 6 11C6.55228 11 6.98782 11.4518 7.0905 11.9945C7.27271 12.9574 7.73004 13.805 8.4625 14.5375C9.4375 15.5125 10.6167 16 12 16C13.3833 16 14.5625 15.5125 15.5375 14.5375C16.27 13.805 16.7273 12.9574 16.9095 11.9945C17.0122 11.4518 17.4477 11 18 11C18.5523 11 19.0081 11.4498 18.9356 11.9973C18.7579 13.3387 18.2127 14.5396 17.3 15.6C16.1667 16.9167 14.7333 17.6917 13 17.925V20C13 20.5523 12.5523 21 12 21ZM12 12C12.2833 12 12.5208 11.9042 12.7125 11.7125C12.9042 11.5208 13 11.2833 13 11V5C13 4.71667 12.9042 4.47917 12.7125 4.2875C12.5208 4.09583 12.2833 4 12 4C11.7167 4 11.4792 4.09583 11.2875 4.2875C11.0958 4.47917 11 4.71667 11 5V11C11 11.2833 11.0958 11.5208 11.2875 11.7125C11.4792 11.9042 11.7167 12 12 12Z"class='voice' fill="currentColor"></path></svg></span>
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
              const chatsArray = data[i].msgSent.map((c, ix) => {
                const hour = String(
                  data[i].chatTime[ix].timeOfLastChatHour
                ).padStart(2, 0);
                const minutes = String(
                  data[i].chatTime[ix].timeOfLastChatMins
                ).padStart(2, 0);
                const timeOfSend = `${hour}:${minutes}`;
                const chatBoxTwo = document.querySelector(".chat-box-two");

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
           <span aria-hidden="true" data-icon="video-call-refreshed" class="video"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H16C16.55 4 17.0208 4.19583 17.4125 4.5875C17.8042 4.97917 18 5.45 18 6V10.5L21.15 7.35C21.3167 7.18333 21.5 7.14167 21.7 7.225C21.9 7.30833 22 7.46667 22 7.7V16.3C22 16.5333 21.9 16.6917 21.7 16.775C21.5 16.8583 21.3167 16.8167 21.15 16.65L18 13.5V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H4ZM4 18H16V6H4V18Z" class='video-icon' fill="currentColor"></path></svg></span>
           <span aria-hidden="true" data-icon="ic-chevron-down-menu" class="xdwrcjd"><svg viewBox="0 0 20 20" height="20" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.99971 12.1L14.8997 7.2C15.083 7.01667 15.3164 6.925 15.5997 6.925C15.883 6.925 16.1164 7.01667 16.2997 7.2C16.483 7.38333 16.5747 7.61667 16.5747 7.9C16.5747 8.18333 16.483 8.41667 16.2997 8.6L10.6997 14.2C10.4997 14.4 10.2664 14.5 9.99971 14.5C9.73304 14.5 9.49971 14.4 9.29971 14.2L3.69971 8.6C3.51637 8.41667 3.42471 8.18333 3.42471 7.9C3.42471 7.61667 3.51637 7.38333 3.69971 7.2C3.88304 7.01667 4.11637 6.925 4.39971 6.925C4.68304 6.925 4.91637 7.01667 5.09971 7.2L9.99971 12.1Z" class='drop-icon' fill="currentColor"></path></svg></span>
            </div>
           <span aria-hidden="true" data-icon="search-refreshed" class="search"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" class='search-icon' fill="#0A0A0A"></path></svg></span>
          <span aria-hidden="true" data-icon="more-refreshed" class="options"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z" class='options-icon 'fill="currentColor"></path></svg></span>

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
          <span aria-hidden="true" data-icon="plus-rounded" class="attachment"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class="x11xpdln x1d8287x x1h4ghdb" fill="none"><title></title><path d="M11 13H5.5C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11H11V5.5C11 4.94772 11.4477 4.5 12 4.5C12.5523 4.5 13 4.94772 13 5.5V11H18.5C19.0523 11 19.5 11.4477 19.5 12C19.5 12.5523 19.0523 13 18.5 13H13V18.5C13 19.0523 12.5523 19.5 12 19.5C11.4477 19.5 11 19.0523 11 18.5V13Z"class='plus' fill="currentColor"></path></svg></span>

          <span aria-hidden="true" data-icon="expressions" class="emoji"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M8.49893 10.2521C9.32736 10.2521 9.99893 9.5805 9.99893 8.75208C9.99893 7.92365 9.32736 7.25208 8.49893 7.25208C7.6705 7.25208 6.99893 7.92365 6.99893 8.75208C6.99893 9.5805 7.6705 10.2521 8.49893 10.2521Z" fill="currentColor"></path><path d="M17.0011 8.75208C17.0011 9.5805 16.3295 10.2521 15.5011 10.2521C14.6726 10.2521 14.0011 9.5805 14.0011 8.75208C14.0011 7.92365 14.6726 7.25208 15.5011 7.25208C16.3295 7.25208 17.0011 7.92365 17.0011 8.75208Z" class='emoji' fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.8221 19.9799C15.5379 21.2537 13.8087 21.9781 12 22H9.27273C5.25611 22 2 18.7439 2 14.7273V9.27273C2 5.25611 5.25611 2 9.27273 2H14.7273C18.7439 2 22 5.25611 22 9.27273V11.8141C22 13.7532 21.2256 15.612 19.8489 16.9776L16.8221 19.9799ZM14.7273 4H9.27273C6.36068 4 4 6.36068 4 9.27273V14.7273C4 17.6393 6.36068 20 9.27273 20H11.3331C11.722 19.8971 12.0081 19.5417 12.0058 19.1204L11.9935 16.8564C11.9933 16.8201 11.9935 16.784 11.9941 16.7479C11.0454 16.7473 10.159 16.514 9.33502 16.0479C8.51002 15.5812 7.84752 14.9479 7.34752 14.1479C7.24752 13.9479 7.25585 13.7479 7.37252 13.5479C7.48919 13.3479 7.66419 13.2479 7.89752 13.2479L13.5939 13.2479C14.4494 12.481 15.5811 12.016 16.8216 12.0208L19.0806 12.0296C19.5817 12.0315 19.9889 11.6259 19.9889 11.1248V9.07648H19.9964C19.8932 6.25535 17.5736 4 14.7273 4ZM14.0057 19.1095C14.0066 19.2605 13.9959 19.4089 13.9744 19.5537C14.5044 19.3124 14.9926 18.9776 15.4136 18.5599L18.4405 15.5576C18.8989 15.1029 19.2653 14.5726 19.5274 13.996C19.3793 14.0187 19.2275 14.0301 19.0729 14.0295L16.8138 14.0208C15.252 14.0147 13.985 15.2837 13.9935 16.8455L14.0057 19.1095Z"class='emoji' fill="currentColor"></path></svg></span>
          </div>
         <input type="text" class="message-space" placeholder="Type a message">

         <button aria-label="Send" class="send-button hidden" data-id=${i}><span aria-hidden="true" data-icon="wds-ic-send-filled" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title></title><path d="M5.4 19.425C5.06667 19.5583 4.75 19.5291 4.45 19.3375C4.15 19.1458 4 18.8666 4 18.5V14L12 12L4 9.99997V5.49997C4 5.1333 4.15 4.85414 4.45 4.66247C4.75 4.4708 5.06667 4.44164 5.4 4.57497L20.8 11.075C21.2167 11.2583 21.425 11.5666 21.425 12C21.425 12.4333 21.2167 12.7416 20.8 12.925L5.4 19.425Z" class='send' fill="#FFFFFF"></path></svg></span></button>
        
         <div class="voice-recording-icon" >
        <span aria-hidden="true" data-icon="mic-outlined" class="microphone"><svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class=""><title></title><path d="M12 14C11.1667 14 10.4583 13.7083 9.875 13.125C9.29167 12.5417 9 11.8333 9 11V5C9 4.16667 9.29167 3.45833 9.875 2.875C10.4583 2.29167 11.1667 2 12 2C12.8333 2 13.5417 2.29167 14.125 2.875C14.7083 3.45833 15 4.16667 15 5V11C15 11.8333 14.7083 12.5417 14.125 13.125C13.5417 13.7083 12.8333 14 12 14ZM12 21C11.4477 21 11 20.5523 11 20V17.925C9.26667 17.6917 7.83333 16.9167 6.7 15.6C5.78727 14.5396 5.24207 13.3387 5.06441 11.9973C4.9919 11.4498 5.44772 11 6 11C6.55228 11 6.98782 11.4518 7.0905 11.9945C7.27271 12.9574 7.73004 13.805 8.4625 14.5375C9.4375 15.5125 10.6167 16 12 16C13.3833 16 14.5625 15.5125 15.5375 14.5375C16.27 13.805 16.7273 12.9574 16.9095 11.9945C17.0122 11.4518 17.4477 11 18 11C18.5523 11 19.0081 11.4498 18.9356 11.9973C18.7579 13.3387 18.2127 14.5396 17.3 15.6C16.1667 16.9167 14.7333 17.6917 13 17.925V20C13 20.5523 12.5523 21 12 21ZM12 12C12.2833 12 12.5208 11.9042 12.7125 11.7125C12.9042 11.5208 13 11.2833 13 11V5C13 4.71667 12.9042 4.47917 12.7125 4.2875C12.5208 4.09583 12.2833 4 12 4C11.7167 4 11.4792 4.09583 11.2875 4.2875C11.0958 4.47917 11 4.71667 11 5V11C11 11.2833 11.0958 11.5208 11.2875 11.7125C11.4792 11.9042 11.7167 12 12 12Z"class='voice' fill="currentColor"></path></svg></span>
         </div>
        </div>
          
          `;
          chatInterface.innerHTML = "";
          chatInterface.insertAdjacentHTML("afterbegin", markup);
          chatInterface.classList.remove("hidden");
        }
        initializeApp(storedChatsInfo);
        renderSendButton(storedChatsInfo);
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
    inputBar.style.backgroundColor = "#FFFFFF";
    searchBar.style.backgroundColor = "#FFFFFF";
    searchBar.style.border = "2px solid #1DAA61";
  }
  blurSearchBar() {
    inputBar.style.backgroundColor = "#f6f5f3";
    searchBar.style.backgroundColor = "#f6f5f3";
    searchBar.style.border = "none";
  }
  // darkMode() {
  //   const personIcon = document.querySelectorAll(".message-profile-img");
  //   const chatListLink = document.querySelectorAll(".chat-list-link");
  //   const chatInterfaceHeader = document.querySelector(
  //     ".chat-interface_header"
  //   );
  //   const personProfileImg = document.querySelector(".person-profile-img");
  //   const videoIcon = document.querySelector(".video-icon");
  //   const dropIcon = document.querySelector(".drop-icon");
  //   const searchIcon = document.querySelector(".search-icon");
  //   const optionsIcon = document.querySelector(".options-icon");
  //   const chatInterface = document.querySelector(".chat-interface");
  //   const chatBoxOne = document.querySelector(".chat-box-one");
  //   const chatBoxTwo = document.querySelector(".message-tag-d");
  //   const chatBoxOneDiv = chatBoxOne.querySelector("div");
  //   // const chatBoxTwoDiv = chatBoxTwo.querySelector("div");
  //   const chatInterfaceMessageBar = document.querySelector(
  //     ".chat-interface_message-bar"
  //   );
  //   const messageSpace = document.querySelector(".message-space");
  //   const voiceIcon = document.querySelector(".voice");
  //   const plusIcon = document.querySelector(".plus");
  //   const emoji = document.querySelectorAll(".emoji");
  //   const sendBtn = document.querySelector(".send");

  //   chatContainer.style.backgroundColor = " #161717";
  //   sideBarSocials.style.backgroundColor = "#1D1F1F";
  //   sideBarSocials.style.borderBottom = "1px solid #2E2F2F";
  //   whatsappHeader.setAttribute("fill", "#FFFFFF");
  //   messageIcon.setAttribute("fill", "#FFFFFF");
  //   statusIcon.forEach((i) => {
  //     i.setAttribute("fill", "#A9AAAA");
  //   });
  //   channelsIcon.forEach((i) => {
  //     i.setAttribute("fill", "#A9AAAA");
  //   });
  //   communityIcon.forEach((i) => {
  //     i.setAttribute("fill", "#A9AAAA");
  //   });
  //   settingsIcon.forEach((i) => {
  //     i.setAttribute("fill", "#A9AAAA");
  //   });
  //   sideBar.style.backgroundColor = "#1D1F1F";
  //   sideBarFunc.backgroundColor = "#1D1F1F";
  //   inputBar.style.backgroundColor = "#2E2F2F";
  //   inputBar.style.color = "#ABACAC";
  //   searchBar.style.backgroundColor = "#2E2F2F";
  //   allBtn.style.backgroundColor = "#103529";
  //   allBtn.style.border = "1px solid #2d453eff";
  //   allBtn.style.color = "#D9FDD3";
  //   [stateUnread, stateFav, stategroups].forEach((b) => {
  //     b.style.color = "#abacac";
  //     b.style.border = "1px solid #404141";
  //     addIcon.forEach((i) => {
  //       i.setAttribute("fill", "#ffffff");
  //     });
  //     moreIcon.setAttribute("fill", "#ffffff");
  //   });
  //   const chatName = document.querySelectorAll(".person-name");

  //   chatName.forEach((i) => {
  //     i.style.setProperty("color", "#FFFFFF", "important");
  //   });

  //   personIcon.forEach((i) => {
  //     i.style.backgroundColor = "#242626";
  //     i.style.border = "0.1px solid #3b3c3cff";
  //   });
  //   chatListLink.forEach((l) => {
  //     l.addEventListener("mouseenter", function () {
  //       l.style.backgroundColor = "#2E2F2F";
  //     });
  //   });
  //   chatListLink.forEach((l) => {
  //     l.addEventListener("mouseleave", function () {
  //       l.style.backgroundColor = "#161717";
  //     });
  //   });
  //   chatInterfaceHeader.style.backgroundColor = "#161717";
  //   personProfileImg.style.backgroundColor = "#242626";
  //   personProfileImg.style.border = "1px solid #3b3c3cff";
  //   // videoIcon.setAttribute("fill", "#FFFFFF");

  //   [videoIcon, dropIcon, searchIcon, optionsIcon].forEach((i) => {
  //     i.setAttribute("fill", "#FFFFFF");
  //   });
  //   chatInterface.style.backgroundColor = "#161717";

  //   if (chatBoxOneDiv) {
  //     chatBoxOneDiv.style.color = "#FFFFFF";
  //     chatBoxOneDiv.style.backgroundColor = "#242626";
  //   }
  //   if (chatBoxTwo) {
  //     chatBoxTwo.style.backgroundColor = "#144D37";
  //     chatBoxTwo.style.color = "#FFFFFF";
  //   }

  //   chatInterfaceMessageBar.style.backgroundColor = "#242626";
  //   messageSpace.style.backgroundColor = "#242626";
  //   messageSpace.style.color = "#FFFFFF";

  //   // plusIcon?.setAttribute("fill", "#FFFFFF");
  //   [plusIcon, voiceIcon].forEach((i) => {
  //     i?.setAttribute("fill", "#FFFFFF");
  //   });
  //   emoji.forEach((i) => {
  //     i?.setAttribute("fill", "#FFFFFF");
  //   });
  //   sendBtn?.setAttribute("fill", "#0A0A0A");
  // }

  init() {
    setTimeout(() => {
      initialBackground.classList.add("hidden");
    }, 2000);
  }
}

export const app = new App();
export const chatList = new ChatList();
export const addChats = new AddChats();
