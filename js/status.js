const chatContainer = document.querySelector(".chat-list");
const statusContainer = document.querySelector(".status-page");
const blankDiv = document.querySelector(".blankDiv");
const blankDivStatus = document.querySelector(".blankDiv-status");
const chatInterface = document.querySelector(".chat-interface");
class Status {
  renderStatusPage(data) {
    chatContainer.classList.add("hidden");
    statusContainer.classList.remove("hidden");
    blankDiv.style.display = "none";
    chatInterface.style.display = "none";
    blankDivStatus.style.display = "flex";
  }
}

export const status = new Status();
