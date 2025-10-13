"use strict";
import { app } from "./view.js";
import { chatList } from "./view.js";
import { chats } from "./model.js";
import { addChats } from "./view.js";
import { inputBar } from "./view.js";
import { unreadMessages } from "./view.js";
import { allBtn, unreadBtn } from "./view.js";

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
    chatList.hoverFavoritesDropdown();
  });
};

export const initializeApp = function (data) {
  app.init();
  console.log(data);
  addChats.removeChatContainer();
  addChats.showAddChatContainer();
  chatList.sortChats(data);
  chatList.renderMarkup(data);
  chatList.hoverFavoritesDropdown();
  const chatProper = document.querySelectorAll(".chat-list-link");
  chatList.renderChatsOnInterface(chatProper, data);
  const noOfUnreadMessages = data.filter((d) => d.unread === true).length;
  unreadMessages.textContent = noOfUnreadMessages;
  if (noOfUnreadMessages === 0) unreadMessages.classList.add("hidden");
};
renderSendButton(storedChatsInfo);
const updateUnreadChats = function (data) {
  unreadBtn.addEventListener("click", function () {
    chatList.toggleUnreadActive();
    chatList.renderUnreadChats(data, storedChatsInfo);
    chatList.hoverFavoritesDropdown();
  });
};
updateUnreadChats(storedChatsInfo);

const allChats = function () {
  allBtn.addEventListener("click", function () {
    chatList.clearContainer();
    chatList.toggleAll();
    chatList.sortChats(storedChatsInfo);
    chatList.renderMarkup(storedChatsInfo);
    chatList.hoverFavoritesDropdown();
    const chatProper = document.querySelectorAll(".chat-list-link");
    chatList.renderChatsOnInterface(chatProper, storedChatsInfo);
  });
};

inputBar.addEventListener("input", chatList.filterSearch);
allChats();
initializeApp(storedChatsInfo);
