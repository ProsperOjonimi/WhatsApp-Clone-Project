"use strict";
import { app } from "./view.js";
import { chatList } from "./view.js";
import { chats } from "./model.js";
import { addChats } from "./view.js";
import { inputBar } from "./view.js";
import { unreadMessages } from "./view.js";
import { allBtn, unreadBtn } from "./view.js";
import { status } from "./status.js";

const statusIcon = document.querySelector(".status-icon-cont");
const messagesIcon = document.querySelector(".messages-icon-cont");
const chatContainer = document.querySelector(".chat-list");
const statusContainer = document.querySelector(".status-page");
const blankDiv = document.querySelector(".blankDiv");
const blankDivStatus = document.querySelector(".blankDiv-status");
const chatInterface = document.querySelector(".chat-interface");

if (!localStorage.getItem("chats")) {
  localStorage.setItem("chats", JSON.stringify(chats));
}
export const storedChatsInfo = JSON.parse(localStorage.getItem("chats"));
export const renderSendButton = function (data) {
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
    chatList.showMessage(message, data[id].msgSent, data, id, storedChatsInfo);
    chatList.renderMarkup(data);

    const chatProper = document.querySelectorAll(".chat-list-link");
    chatList.renderChatsOnInterface(chatProper, data);
    chatList.renderFavoritesDropdown();
  });
};

export const initializeApp = function (data) {
  app.init();
  console.log(data);
  addChats.removeChatContainer();
  addChats.showAddChatContainer();
  chatList.sortChats(data);
  chatList.renderMarkup(data);
  chatList.renderFavoritesDropdown();
  const chatProper = document.querySelectorAll(".chat-list-link");
  chatList.renderChatsOnInterface(chatProper, data);
  const noOfUnreadMessages = data.filter((d) => d.unread === true).length;
  unreadMessages.textContent = noOfUnreadMessages;
  if (noOfUnreadMessages === 0) unreadMessages.classList.add("hidden");

  // status
  console.log(statusIcon);
  console.log(messagesIcon);

  statusIcon.addEventListener("click", function () {
    statusIcon.innerHTML = "";
    const html = `
    <span aria-hidden="true" data-icon="status-filled-refreshed" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>status-filled-refreshed</title><path d="M13.5628 3.1366C13.6587 2.5927 14.1794 2.22462 14.711 2.37435C15.7905 2.67838 16.8135 3.16253 17.736 3.80854C18.9323 4.64621 19.9305 5.73571 20.6606 7.00047C21.3907 8.26523 21.8349 9.67454 21.962 11.1294C22.0601 12.2513 21.9677 13.3793 21.6911 14.4662C21.5549 15.0014 20.9758 15.2682 20.4568 15.0792C19.9378 14.8903 19.677 14.317 19.7998 13.7785C19.9843 12.9693 20.0422 12.1343 19.9696 11.3035C19.8679 10.1396 19.5126 9.01215 18.9285 8.00035C18.3444 6.98854 17.5458 6.11694 16.5888 5.44681C15.9057 4.96841 15.1536 4.60097 14.3606 4.35607C13.8329 4.19311 13.4669 3.68049 13.5628 3.1366Z" fill="currentColor"></path><path d="M18.8944 17.785C19.3175 18.14 19.3759 18.7749 18.9804 19.1604C18.1774 19.9433 17.2466 20.5872 16.2259 21.0631C14.9023 21.6802 13.4597 22 11.9993 21.9999C10.5389 21.9998 9.09633 21.6798 7.77287 21.0625C6.7522 20.5864 5.82149 19.9424 5.01855 19.1594C4.62314 18.7739 4.68167 18.1389 5.10479 17.784C5.52792 17.429 6.15484 17.4898 6.55976 17.8653C7.16828 18.4297 7.86245 18.8974 8.61829 19.25C9.67707 19.7438 10.8312 19.9998 11.9994 19.9999C13.1677 19.9999 14.3218 19.7441 15.3807 19.2504C16.1366 18.898 16.8308 18.4304 17.4394 17.8661C17.8444 17.4906 18.4713 17.4299 18.8944 17.785Z" fill="currentColor"></path><path d="M3.54277 15.078C3.02379 15.2669 2.4447 15.0001 2.30857 14.4648C2.03215 13.378 1.9399 12.2501 2.03806 11.1283C2.16533 9.67358 2.60965 8.26441 3.33978 6.9998C4.06991 5.7352 5.06815 4.64584 6.26432 3.80828C7.1868 3.16237 8.20975 2.6783 9.28915 2.37431C9.82075 2.22459 10.3414 2.59268 10.4373 3.13657C10.5332 3.68047 10.1672 4.19308 9.6395 4.35604C8.84657 4.60091 8.09458 4.96828 7.41146 5.4466C6.45452 6.11664 5.65593 6.98813 5.07183 7.99982C4.48772 9.0115 4.13226 10.1388 4.03045 11.3026C3.95776 12.1334 4.01559 12.9683 4.19998 13.7774C4.3227 14.3159 4.06175 14.8892 3.54277 15.078Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 18C15.3138 18 18.0001 15.3137 18.0001 12C18.0001 8.68628 15.3138 5.99999 12.0001 5.99999C8.68635 5.99999 6.00006 8.68628 6.00006 12C6.00006 15.3137 8.68635 18 12.0001 18Z" fill="currentColor"></path></svg></span>
    `;
    statusIcon.insertAdjacentHTML("afterbegin", html);
    // messsages icon change appearence
    messagesIcon.innerHTML = "";
    const html2 = `
    <span aria-hidden="true" data-icon="chat-refreshed" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>chat-refreshed</title><path fill-rule="evenodd" clip-rule="evenodd" d="M3.00013 9L0.940133 5.53C0.540219 4.86348 1.01283 4 1.79012 4H19.3335C20.8062 4 22.0001 5.19391 22.0001 6.66667V17.3333C22.0001 18.8061 20.8062 20 19.3335 20H5.6668C4.19404 20 3.00013 18.8061 3.00013 17.3333V9ZM5.00013 8.44603L3.53252 6H19.3335C19.7017 6 20.0001 6.29848 20.0001 6.66667V17.3333C20.0001 17.7015 19.7017 18 19.3335 18H5.6668C5.29861 18 5.00013 17.7015 5.00013 17.3333V8.44603Z" fill="currentColor"></path><path d="M7.00013 10C7.00013 9.44772 7.44785 9 8.00013 9H17.0001C17.5524 9 18.0001 9.44772 18.0001 10C18.0001 10.5523 17.5524 11 17.0001 11H8.00013C7.44785 11 7.00013 10.5523 7.00013 10Z" fill="currentColor"></path><path d="M7.00013 14C7.00013 13.4477 7.44785 13 8.00013 13H14.0001C14.5524 13 15.0001 13.4477 15.0001 14C15.0001 14.5523 14.5524 15 14.0001 15H8.00013C7.44785 15 7.00013 14.5523 7.00013 14Z" fill="currentColor"></path></svg></span>
    
    `;
    messagesIcon.insertAdjacentHTML("afterbegin", html2);
    // Rendering status page
    status.renderStatusPage(storedChatsInfo);
  });
  statusIcon.addEventListener("mouseover", function () {
    this.classList.add("active-icon");
  });
  statusIcon.addEventListener("mouseout", function () {
    this.classList.remove("active-icon");
  });
  // messages icon click
  messagesIcon.addEventListener("click", function () {
    messagesIcon.innerHTML = "";
    const html = `
    <span aria-hidden="true" data-icon="chat-filled-refreshed" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>chat-filled-refreshed</title><path fill-rule="evenodd" clip-rule="evenodd" d="M22.0002 6.66667C22.0002 5.19391 20.8062 4 19.3335 4H1.79015C1.01286 4 0.540213 4.86348 0.940127 5.53L3.00016 9V17.3333C3.00016 18.8061 4.19406 20 5.66682 20H19.3335C20.8062 20 22.0002 18.8061 22.0002 17.3333V6.66667ZM7.00016 10C7.00016 9.44772 7.44787 9 8.00016 9H17.0002C17.5524 9 18.0002 9.44772 18.0002 10C18.0002 10.5523 17.5524 11 17.0002 11H8.00016C7.44787 11 7.00016 10.5523 7.00016 10ZM8.00016 13C7.44787 13 7.00016 13.4477 7.00016 14C7.00016 14.5523 7.44787 15 8.00016 15H14.0002C14.5524 15 15.0002 14.5523 15.0002 14C15.0002 13.4477 14.5524 13 14.0002 13H8.00016Z" fill="currentColor"></path></svg></span>
    `;
    messagesIcon.insertAdjacentHTML("afterbegin", html);
    // messsages icon change appearence
    statusIcon.innerHTML = "";
    const html2 = `
   <span aria-hidden="true" data-icon="status-refreshed" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>status-refreshed</title><path d="M13.5628 3.13661C13.6587 2.59272 14.1794 2.22464 14.711 2.37436C15.7905 2.6784 16.8135 3.16254 17.736 3.80856C18.9323 4.64623 19.9305 5.73573 20.6606 7.00048C21.3907 8.26524 21.8349 9.67455 21.962 11.1294C22.0601 12.2513 21.9677 13.3794 21.6911 14.4662C21.5549 15.0014 20.9758 15.2682 20.4568 15.0792C19.9378 14.8903 19.677 14.317 19.7998 13.7785C19.9843 12.9693 20.0422 12.1343 19.9696 11.3035C19.8679 10.1396 19.5126 9.01217 18.9285 8.00036C18.3444 6.98856 17.5458 6.11696 16.5888 5.44682C15.9057 4.96842 15.1536 4.60099 14.3606 4.35609C13.8329 4.19312 13.4669 3.6805 13.5628 3.13661Z" fill="currentColor"></path><path d="M18.8944 17.785C19.3175 18.14 19.3759 18.7749 18.9804 19.1604C18.1774 19.9433 17.2466 20.5872 16.2259 21.0631C14.9023 21.6802 13.4597 22 11.9993 21.9999C10.5389 21.9998 9.09633 21.6798 7.77287 21.0625C6.7522 20.5864 5.82149 19.9424 5.01855 19.1594C4.62314 18.7739 4.68167 18.1389 5.10479 17.784C5.52792 17.4291 6.15484 17.4898 6.55976 17.8654C7.16828 18.4298 7.86245 18.8974 8.61829 19.25C9.67707 19.7438 10.8312 19.9998 11.9994 19.9999C13.1677 20 14.3218 19.7442 15.3807 19.2505C16.1366 18.898 16.8308 18.4304 17.4394 17.8661C17.8444 17.4906 18.4713 17.43 18.8944 17.785Z" fill="currentColor"></path><path d="M3.54277 15.0781C3.02379 15.267 2.4447 15.0001 2.30857 14.4649C2.03215 13.3781 1.9399 12.2501 2.03806 11.1283C2.16533 9.6736 2.60965 8.26443 3.33978 6.99982C4.06991 5.73521 5.06815 4.64585 6.26432 3.8083C7.1868 3.16239 8.20975 2.67832 9.28915 2.37433C9.82075 2.22461 10.3414 2.59269 10.4373 3.13659C10.5332 3.68048 10.1672 4.1931 9.6395 4.35605C8.84657 4.60092 8.09458 4.9683 7.41146 5.44662C6.45452 6.11666 5.65593 6.98815 5.07183 7.99983C4.48772 9.01152 4.13226 10.1389 4.03045 11.3026C3.95776 12.1334 4.01559 12.9683 4.19998 13.7774C4.3227 14.3159 4.06175 14.8892 3.54277 15.0781Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 16C14.2092 16 16.0001 14.2091 16.0001 12C16.0001 9.79086 14.2092 8 12.0001 8C9.79092 8 8.00006 9.79086 8.00006 12C8.00006 14.2091 9.79092 16 12.0001 16ZM12.0001 18C15.3138 18 18.0001 15.3137 18.0001 12C18.0001 8.68629 15.3138 6 12.0001 6C8.68635 6 6.00006 8.68629 6.00006 12C6.00006 15.3137 8.68635 18 12.0001 18Z" fill="currentColor"></path></svg></span>
    
    `;
    statusIcon.insertAdjacentHTML("afterbegin", html2);

    // Rendering chat list page
    chatContainer.classList.remove("hidden");
    statusContainer.classList.add("hidden");

    blankDiv.style.display = "flex";
    chatInterface.style.display = "flex";
    blankDivStatus.style.display = "none";
  });

  messagesIcon.addEventListener("mouseover", function () {
    this.classList.add("active-icon");
  });
  messagesIcon.addEventListener("mouseout", function () {
    this.classList.remove("active-icon");
  });
};
renderSendButton(storedChatsInfo);
const updateUnreadChats = function (data) {
  unreadBtn.addEventListener("click", function () {
    chatList.toggleUnreadActive();
    chatList.renderUnreadChats(data, storedChatsInfo);
    chatList.renderFavoritesDropdown();
  });
};
updateUnreadChats(storedChatsInfo);

const allChats = function () {
  allBtn.addEventListener("click", function () {
    chatList.clearContainer();
    chatList.toggleAll();
    chatList.sortChats(storedChatsInfo);
    chatList.renderMarkup(storedChatsInfo);
    chatList.renderFavoritesDropdown();
    const chatProper = document.querySelectorAll(".chat-list-link");
    chatList.renderChatsOnInterface(chatProper, storedChatsInfo);
  });
};

inputBar.addEventListener("input", chatList.filterSearch);
allChats();
initializeApp(storedChatsInfo);
