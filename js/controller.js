"use strict";
import { app } from "./view.js";
import { chatList } from "./view.js";
import { chats } from "./model.js";
import { addChats } from "./view.js";

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

  console.log("hey");
  console.log(chats);
  // chatList.renderMarkup(chats);
};

initializeApp();
