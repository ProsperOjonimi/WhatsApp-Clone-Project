"use strict";
import { app } from "./view.js";
import { chatList } from "./view.js";
import { chats } from "./model.js";
import { addChats } from "./view.js";
import { setArray } from "./model.js";

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
  const unreadBtn = document.querySelector(".state-unread");
  unreadBtn.addEventListener("click", function () {
    chatList.renderUnreadChats(data);
    const chatProper = document.querySelectorAll(".chat-list-link");
    const unreadChats = data.filter(
      (c) => c.msgSent.length === 0 && c.seen === false
    );
    setArray(unreadChats);
    chatList.renderChatsOnInterface(chatProper, unreadChats);
  });
};
updateUnreadChats(chats);
initializeApp();
