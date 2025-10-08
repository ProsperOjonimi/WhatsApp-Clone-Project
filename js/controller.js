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
const storedChatsInfo = JSON.parse(localStorage.getItem("chats"));
console.log(storedChatsInfo);

export const initializeApp = function () {
  app.init();

  addChats.removeChatContainer();
  addChats.showAddChatContainer();
  chatList.renderMarkup(storedChatsInfo);
  console.log(storedChatsInfo);
  const chatProper = document.querySelectorAll(".chat-list-link");
  chatList.renderChatsOnInterface(chatProper, storedChatsInfo);
  const noOfUnreadMessages = storedChatsInfo.filter(
    (d) => d.unread === true
  ).length;
  unreadMessages.textContent = noOfUnreadMessages;
  if (noOfUnreadMessages === 0) unreadMessages.classList.add("hidden");

  const renderSendButton = function () {
    const messageSpace = document.querySelector(".message-space");
    const sendButton = document.querySelector(".send-button");
    const voiceRecord = document.querySelector(".voice-recording-icon");
    console.log(messageSpace);
    messageSpace.addEventListener("input", function () {
      sendButton.classList.remove("hidden");
      voiceRecord.classList.add("hidden");
      if (messageSpace.value.trim() === "") {
        sendButton.classList.add("hidden");
        voiceRecord.classList.remove("hidden");
      }
    });
    sendButton?.addEventListener("click", function () {
      console.log(sendButton);
      const id = +sendButton.dataset.id;
      const message = messageSpace.value.trim();
      messageSpace.value = "";
      if (messageSpace.value.trim() === "") {
        sendButton.classList.add("hidden");
        voiceRecord.classList.remove("hidden");
      }
      chatList.showMessage(
        message,
        storedChatsInfo[id].msgSent,
        storedChatsInfo,
        id
      );

      console.log(chats);
      chatList.renderMarkup(storedChatsInfo);
      const chatProper = document.querySelectorAll(".chat-list-link");
      chatList.renderChatsOnInterface(chatProper, storedChatsInfo);
    });
  };

  renderSendButton();
};
const updateUnreadChats = function (data) {
  unreadBtn.addEventListener("click", function () {
    chatList.toggleUnreadActive();
    chatList.renderUnreadChats(data);
  });
};
updateUnreadChats(storedChatsInfo);

const allChats = function () {
  allBtn.addEventListener("click", function () {
    chatList.clearContainer();
    chatList.toggleAll();
    console.log(chats);
    chatList.renderMarkup(storedChatsInfo);
    const chatProper = document.querySelectorAll(".chat-list-link");
    chatList.renderChatsOnInterface(chatProper, storedChatsInfo);
  });
};

inputBar.addEventListener("input", chatList.filterSearch);
allChats();
initializeApp();
