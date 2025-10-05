"use strict";
import { app } from "./view.js";
import { chatList } from "./view.js";
import { chats } from "./model.js";
import { addChats } from "./view.js";
import { inputBar } from "./view.js";
import { unreadMessages } from "./view.js";
// import { setArray, restoreChats } from "./model.js";
import { allBtn, unreadBtn } from "./view.js";
// import { chatClone } from "./model.js";

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
  // app.darkMode();
  const chatProper = document.querySelectorAll(".chat-list-link");
  const noOfUnreadMessages = storedChatsInfo.filter(
    (d) => d.seen === false && d.msgRecieved.length > 0
  ).length;
  unreadMessages.querySelector("span").textContent = noOfUnreadMessages;
  if (noOfUnreadMessages === 0) unreadMessages.classList.add("hidden");

  const renderSendButton = function () {
    chatList.renderChatsOnInterface(chatProper, storedChatsInfo);
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
      const chatProper = document.querySelectorAll(".chat-list-link");
      chatList.renderChatsOnInterface(chatProper, storedChatsInfo);
      chatList.renderMarkup(storedChatsInfo);
      // app.darkMode();

      // initializeApp();
    });
  };

  renderSendButton();
};
// export const updateState = function (chatData) {
//   chatList.clearContainer();
//   chatData = chats;

//   // chatList.renderMarkup(chats);
// };

const updateUnreadChats = function (data) {
  unreadBtn.addEventListener("click", function () {
    chatList.toggleUnreadActive();
    chatList.renderUnreadChats(data);
    const chatProper = document.querySelectorAll(".chat-list-link");

    // setArray(unreadChats);
    // chatList.renderChatsOnInterface(chatProper, data);
    // chatProper.forEach((c, i) => {
    //   c.addEventListener("click", function () {
    //     console.log(c, +c.dataset.id);

    //     chats[c.dataset.id].seen = true;
    //     console.log(chats);
    //   });
    // });
  });
};
updateUnreadChats(storedChatsInfo);

const allChats = function () {
  allBtn.addEventListener("click", function () {
    chatList.clearContainer();
    chatList.toggleAll();
    // const readChats = chatClone.filter((c) => c.seen === true);
    // console.log(readChats);
    // const updatedChat = [...chats, ...readChats];
    // console.log(updatedChat);
    // // restoreChats(updatedChat);
    // console.log(chats);
    console.log(chats);
    // chats.forEach((c) => {
    //   const id = c.id;
    //   chatClone[id].seen = c.seen;
    // });
    // console.log(chatClone);
    // restoreChats(chatClone);
    chatList.renderMarkup(storedChatsInfo);
    const chatProper = document.querySelectorAll(".chat-list-link");
    chatList.renderChatsOnInterface(chatProper, storedChatsInfo);
  });
};

inputBar.addEventListener("input", chatList.filterSearch);

// console.log(messageSpace);
// messageSpace.addEventListener("input", function () {
//   console.log(sendButton);
//   console.log(voiceRecord);
//   sendButton.classList.remove("hidden");
//   voiceRecord.classList.add("hidden");
// });
allChats();
initializeApp();
// localStorage.setItem("chats", JSON.stringify(chats));
