const chatContainer = document.querySelector(".chat-list");
const statusContainer = document.querySelector(".status-page");
const blankDiv = document.querySelector(".blankDiv");
const blankDivStatus = document.querySelector(".blankDiv-status");
const chatInterface = document.querySelector(".chat-interface");
const myStatusContainer = document.querySelector(".my-status");
const recentContainer = document.querySelector(".recent-status-container");
const viewedContainer = document.querySelector(".viewed-status-container");
const statusImage = document.querySelector(".statusImages-cont");
class Status {
  renderStatusPage(data1, data2) {
    chatContainer.classList.add("hidden");
    statusContainer.style.display = "flex";
    statusContainer.style.marginLeft = "0rem";
    blankDiv.style.display = "none";
    chatInterface.style.display = "none";
    blankDivStatus.style.display = "flex";

    this.renderStatusMarkup(data1, data2);
  }

  renderStatusMarkup(data1, data2) {
    const html1 = `
     <div class="my-status-icon-parent">
            <div class="my-status-icon"></div>
          </div>
          <div class="myStatus-info">
            <p>${data1[0].name}</p>
            <p>${data1[0].time.at(-1)}</p>
          </div>
    
    `;

    myStatusContainer.innerHTML = "";
    myStatusContainer.insertAdjacentHTML("afterbegin", html1);

    recentContainer.innerHTML = "";

    data2.forEach((d) => {
      const html = `

        <div class="recent-status">
            <div class="my-status-icon-parent">
              <div class="my-status-icon"></div>
            </div>
            <div class="myStatus-info">
              <p>${d.name}</p>
              <p>${d.time.at(-1)}</p>
            </div>
          </div>
      
      `;

      recentContainer.insertAdjacentHTML("afterbegin", html);
    });

    const viewedChats = data2.filter((d) => d.isViewed === true);
    if (viewedChats.length === 0) viewedContainer.innerHTML = "";
  }

  viewMyStatus(data) {
    const html = `
    <img src="${data[0].image[0]}" class="statusImages"/>
    `;
    statusImage.style.display = "flex";

    statusImage.insertAdjacentHTML("afterbegin", html);

    statusImage.addEventListener("click", function () {
      statusImage.style.display = "none";
      statusImage.innerHTML = "";
    });
  }
}

export const status = new Status();
