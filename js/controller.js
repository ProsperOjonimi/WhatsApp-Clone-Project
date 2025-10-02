"use strict";
import { app } from "./view.js";
import { chatList } from "./view.js";
import { chats } from "./model.js";

const initializeApp = function () {
  app.init();
  chatList.renderMarkup(chats);
};
initializeApp();
