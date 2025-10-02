"use strict";
import { app } from "./view.js";
import { chatList } from "./view.js";
import { chats } from "./model.js";
import { addChats } from "./view.js";
const initializeApp = function () {
  app.init();
  addChats.removeChatContainer();
  addChats.showAddChatContainer();
  chatList.renderMarkup(chats);
};
initializeApp();
