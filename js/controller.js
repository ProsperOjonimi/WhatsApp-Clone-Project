"use strict";
import { app } from "./view.js";
import { chatList } from "./view.js";
import { chats } from "./model.js";
import { addChats } from "./view.js";
import { inputBar } from "./view.js";
// import { setArray, restoreChats } from "./model.js";
import { allBtn, unreadBtn } from "./view.js";
// import { chatClone } from "./model.js";

export const initializeApp = function () {
  app.init();
  addChats.removeChatContainer();
  addChats.showAddChatContainer();
  chatList.renderMarkup(chats);
  const chatProper = document.querySelectorAll(".chat-list-link");

  chatList.renderChatsOnInterface(chatProper, chats);
};
export const updateState = function (chatData) {
  chatList.clearContainer();
  chatData = chats;

  // chatList.renderMarkup(chats);
};

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
updateUnreadChats(chats);

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
    chatList.renderMarkup(chats);
    const chatProper = document.querySelectorAll(".chat-list-link");
    chatList.renderChatsOnInterface(chatProper, chats);
  });
};

inputBar.addEventListener("input", chatList.filterSearch);
allChats();
initializeApp();
