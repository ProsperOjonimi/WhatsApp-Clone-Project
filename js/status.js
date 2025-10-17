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
    const statusIcon = document.querySelector(".my-status-icon");
    statusIcon.style.background = `url("${data1[0].image.at(
      -1
    )}") center/cover no-repeat`;
    // overlay.style.background = `url(${data[0].image[0]}) center/cover no-repeat`;

    recentContainer.innerHTML = "";

    data2.forEach((d) => {
      const html = `

        <div class="recent-status" dataset-id="${d.id ?? ""}">
            <div class="my-status-icon-parent">
              <div class="recent-status-icon" data-id=${d.id}></div>
            </div>
            <div class="myStatus-info">
              <p>${d.name}</p>
              <p>${d.time.at(-1)}</p>
            </div>
          </div>
      
      `;

      recentContainer.insertAdjacentHTML("afterbegin", html);

      statusImage.innerHTML = "";
    });
    const recentStatusIcon = document.querySelectorAll(".recent-status-icon");
    recentStatusIcon.forEach((c) => {
      const id = +c.dataset.id;
      c.style.background = `url("${data2[id].image.at(
        -1
      )}") center/cover no-repeat`;
    });
    const viewedChats = data2.filter((d) => d.isViewed === true);
    if (viewedChats.length === 0) viewedContainer.innerHTML = "";
  }

  viewMyStatus(data) {
    const body = document.querySelector("body");
    body.style.overflowX = "hidden";
    const renderStatusImages = function (d) {
      let markup = [];
      d.forEach((d, i) => {
        const html = `
        <img src="${d}" class="statusImages statusImages${i + 1}" data-id="${
          i + 1
        }"/>

        
        `;
        markup.push(html);
      });
      return markup;
    };
    const html = `
       <div class="overlay">
       
       
       </div>
       <div class="statusImages-container">
       <span aria-hidden="true" data-icon="back" class="close-status-cont1"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="close-status" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title></title><path fill="#FFFFFF" d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"></path></svg>
   <button class="toleft-cont">
       <ion-icon name="chevron-back-outline" class="toleft-btn"></ion-icon>
       </button>
       </span>
       <div class="progress-container">
       <div class="progress-bar1">
       <div class="fill1"></div>
       </div>
       <div class="progress-bar2">
        <div class="fill2"></div>
       </div>
       </div>
        ${renderStatusImages(data.image).join("\n")}
   
  <span aria-hidden="true" data-icon="x-viewer" class="close-status-cont2"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="close-status" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title></title><path fill="#FFFFFF" d="M19.8,5.8l-1.6-1.6L12,10.4L5.8,4.2L4.2,5.8l6.2,6.2l-6.2,6.2l1.6,1.6l6.2-6.2l6.2,6.2l1.6-1.6L13.6,12 L19.8,5.8z"></path></svg>
       <button class="toright-cont">
      <ion-icon name="chevron-forward-outline" class="toright-btn"></ion-icon>
      </button>
       </span>

       

       <div class="reply-status">
       <span aria-hidden="true"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="x23j0i4 xd7y6wv" fill="none"><title>ic-mood</title><path d="M15.5 11C15.9167 11 16.2708 10.8542 16.5625 10.5625C16.8542 10.2708 17 9.91667 17 9.5C17 9.08333 16.8542 8.72917 16.5625 8.4375C16.2708 8.14583 15.9167 8 15.5 8C15.0833 8 14.7292 8.14583 14.4375 8.4375C14.1458 8.72917 14 9.08333 14 9.5C14 9.91667 14.1458 10.2708 14.4375 10.5625C14.7292 10.8542 15.0833 11 15.5 11ZM8.5 11C8.91667 11 9.27083 10.8542 9.5625 10.5625C9.85417 10.2708 10 9.91667 10 9.5C10 9.08333 9.85417 8.72917 9.5625 8.4375C9.27083 8.14583 8.91667 8 8.5 8C8.08333 8 7.72917 8.14583 7.4375 8.4375C7.14583 8.72917 7 9.08333 7 9.5C7 9.91667 7.14583 10.2708 7.4375 10.5625C7.72917 10.8542 8.08333 11 8.5 11ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20ZM12 17.5C12.9667 17.5 13.8583 17.2667 14.675 16.8C15.4917 16.3333 16.15 15.7 16.65 14.9C16.75 14.7 16.7417 14.5 16.625 14.3C16.5083 14.1 16.3333 14 16.1 14H7.9C7.66667 14 7.49167 14.1 7.375 14.3C7.25833 14.5 7.25 14.7 7.35 14.9C7.85 15.7 8.5125 16.3333 9.3375 16.8C10.1625 17.2667 11.05 17.5 12 17.5Z" fill="#FFFFFF"></path></svg></span>

       <span aria-hidden="true"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="x23j0i4 xd7y6wv" fill="none"><title>wds-ic-sticker</title><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C13.8087 21.9781 15.5379 21.2537 16.8221 19.9799L19.8489 16.9776C21.2256 15.612 22 13.7532 22 11.8141V9.27273C22 5.25611 18.7439 2 14.7273 2H9.27273C5.25611 2 2 5.25611 2 9.27273V14.7273C2 18.7439 5.25611 22 9.27273 22H12ZM9.27273 4H14.7273C17.5736 4 19.8932 6.25535 19.9964 9.07648H19.9889V11.1248C19.9889 11.6259 19.5817 12.0315 19.0806 12.0296L16.8216 12.0208C14.1479 12.0105 11.979 14.1827 11.9935 16.8564L12.0058 19.1204C12.0081 19.5417 11.722 19.8971 11.3331 20H9.27273C6.36068 20 4 17.6393 4 14.7273V9.27273C4 6.36068 6.36068 4 9.27273 4ZM13.9744 19.5537C13.9959 19.4089 14.0066 19.2605 14.0057 19.1095L13.9935 16.8455C13.985 15.2837 15.252 14.0147 16.8138 14.0208L19.0729 14.0295C19.2275 14.0301 19.3793 14.0187 19.5274 13.996C19.2653 14.5726 18.8989 15.1029 18.4405 15.5576L15.4136 18.5599C14.9926 18.9776 14.5044 19.3124 13.9744 19.5537Z" fill="#FFFFFF"></path></svg></span>

       <input type="text" placeholder="Type a reply..." class="reply-input"/>

       <span aria-hidden="true" data-icon="wds-ic-send-filled" class=""><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="x23j0i4 xd7y6wv x17t9dm2" fill="none"><title>wds-ic-send-filled</title><path d="M5.4 19.425C5.06667 19.5583 4.75 19.5291 4.45 19.3375C4.15 19.1458 4 18.8666 4 18.5V14L12 12L4 9.99997V5.49997C4 5.1333 4.15 4.85414 4.45 4.66247C4.75 4.4708 5.06667 4.44164 5.4 4.57497L20.8 11.075C21.2167 11.2583 21.425 11.5666 21.425 12C21.425 12.4333 21.2167 12.7416 20.8 12.925L5.4 19.425Z" fill="#FFFFFF"></path></svg></span>
       </div>
  
    </div>
    `;
    statusImage.style.display = "flex";
    statusImage.innerHTML = "";
    statusImage.insertAdjacentHTML("afterbegin", html);
    const imagesStatus = document.querySelectorAll(".statusImages");
    imagesStatus.forEach((i) => {
      const id = +i.dataset.id;
      i.style.transform = `translate(${id * 70}%)`;
    });
    this.changeStatus();
    const overlay = document.querySelector(".overlay");

    // overlay.style.background = `url(${data[0].image[0]}) center/cover no-repeat`;
    overlay.style.backgroundImage = `url('${data.image[0]}')`;
    overlay.style.backgroundPosition = "center";
    overlay.style.backgroundSize = "cover";
    overlay.style.backgroundRepeat = "no-repeat";
    const closeStatusBtn = document.querySelectorAll(".close-status");
    closeStatusBtn.forEach((b) => {
      b.addEventListener("click", function () {
        statusImage.style.display = "none";
        body.style.overflowX = "auto";
      });
    });
  }
  changeStatus() {
    const changeStatus1 = function () {
      const fill1 = document.querySelector(".fill1");
      console.log(fill1);
      let width = 0;
      const interval = setInterval(() => {
        width += 1 / 3;
        fill1.style.width = `${width}%`;
      }, 10);

      setTimeout(() => {
        clearInterval(interval);
        const statusImages = document.querySelectorAll(".statusImages");
        statusImages.forEach((i) => {
          if (+i.dataset.id === 2) {
            const id = +i.dataset.id;

            i.style.transform = `translate(${id * 70 - (id + 1) * 70}%)`;
            curStatus = i;
            const overlay = document.querySelector(".overlay");
            overlay.style.backgroundImage = `url('${curStatus.src}')`;
          }
          if (+i.dataset.id === 1) {
            i.style.transform = `translate(${-p * 140}%)`;
          }

          changeStatus2();
        });
      }, 3090);
    };
    changeStatus1();

    function changeStatus2() {
      const fill2 = document.querySelector(".fill2");
      console.log(fill2);
      let width = 0;
      const interval = setInterval(() => {
        width += 1 / 3;
        fill2.style.width = `${width}%`;
      }, 10);

      setTimeout(() => {
        clearInterval(interval);
        statusImage.style.display = "none";
        const body = document.querySelector("body");
        body.style.overflowX = "auto";
      }, 3090);
    }

    const toLeftBtn = document.querySelector(".toleft-cont");
    const toRightBtn = document.querySelector(".toright-cont");
    let n = 1;
    let p = 2;
    let curStatus;
    const statusImages = document.querySelectorAll(".statusImages");
    toRightBtn.addEventListener("click", function () {
      if (n < statusImages.length) {
        n++;
        p--;
      }

      statusImages.forEach((i) => {
        if (+i.dataset.id === n) {
          const id = +i.dataset.id;

          i.style.transform = `translate(${id * 70 - (id + 1) * 70}%)`;
          curStatus = i;
          const overlay = document.querySelector(".overlay");
          overlay.style.backgroundImage = `url('${curStatus.src}')`;
        }
        if (+i.dataset.id === p) {
          i.style.transform = `translate(${-p * 140}%)`;
        }
      });
    });
    toLeftBtn.addEventListener("click", function () {
      if (n < statusImages.length) {
        n++;
        p--;
      }

      statusImages.forEach((i) => {
        if (+i.dataset.id === 2) {
          const id = +i.dataset.id;

          i.style.transform = `translate(${id * 140}%)`;

          const overlay = document.querySelector(".overlay");
          overlay.style.backgroundImage = `url('${curStatus.src}')`;
        }
        if (+i.dataset.id === 1) {
          i.style.transform = `translate(70%)`;
          curStatus = i;
        }
        n = 1;
        p = 2;
      });
    });
  }
}

export const status = new Status();
