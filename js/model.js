export let chats = [
  {
    chatName: "John 200L MBBS",
    msgSent: [],
    msgRecieved: ["alright thank you very much"],
    timeOfLastChat: "17:00",
    seen: false,
    id: 0,
    sentMessages: [],
  },
  {
    chatName: "Eniola 2",
    msgSent: [],
    msgRecieved: ["That's a good idea. Will do"],
    timeOfLastChat: "16:50",
    seen: false,
    id: 1,
    sentMessages: [],
  },
  {
    chatName: "Mercy",
    msgSent: [],
    msgRecieved: ["Okay Okay 😂"],
    timeOfLastChat: "16:50",
    seen: true,
    id: 2,
    sentMessages: [],
  },
  {
    chatName: "Shaydee Coder",
    msgSent: ["Alright, thanks"],
    msgRecieved: [],
    timeOfLastChat: "11:07",
    seen: false,
    id: 3,
    sentMessages: [],
  },
  {
    chatName: "Ojonimi",
    msgSent: ["Brooo"],
    msgRecieved: [],
    timeOfLastChat: "10:34",
    seen: true,
    id: 4,
    sentMessages: [],
  },
  {
    chatName: "Josiah Frank",
    msgSent: [],
    msgRecieved: ["Yh"],
    timeOfLastChat: "9:20",
    seen: true,
    id: 5,
    sentMessages: [],
  },
  {
    chatName: "Sis",
    msgSent: ["Alright, no problem"],
    msgRecieved: [],
    timeOfLastChat: "8:50",
    seen: true,
    id: 6,
    sentMessages: [],
  },
  {
    chatName: "Unana",
    msgSent: [],
    msgRecieved: ["Yeah"],
    timeOfLastChat: "8:32",
    seen: false,
    id: 7,
    sentMessages: [],
  },
  {
    chatName: "Francis S",
    msgSent: [],
    msgRecieved: ["Thanks bro 😭 😭"],
    timeOfLastChat: "8:00",
    seen: false,
    id: 8,
    sentMessages: [],
  },
  {
    chatName: "Adedapo 200L MBBS",
    msgSent: [],
    msgRecieved: ["Alright then 👌"],
    timeOfLastChat: "7:20",
    seen: false,
    id: 9,
    sentMessages: [],
  },
  {
    chatName: "Emmanuella",
    msgSent: ["Hey"],
    msgRecieved: [],
    timeOfLastChat: "4:45",
    seen: false,
    id: 10,
    sentMessages: [],
  },
];

// if (data[i].sentMessages.length > 0) {
//             data[i].sentMessages.forEach((c) => {
//               const now = new Date();
//               const hour = now.getHours(); // 0–59
//               const minutes = now.getMinutes(); // 0–59

//               const timeOfSend = `${hour}:${minutes}`;
//               const chatBoxTwo = document.querySelector(".chat-box-two");
//               console.log(c);
//               console.log(chatBoxTwo);

//               const html = `
//     <div class="message-tag-d">
//               <p>${c}
//                  <span>
// ${timeOfSend} <ion-icon name="checkmark-done-outline" class="checkmark-icon"></ion-icon>
//               </span></p>
//             </div>
//     `;
//               chatBoxTwo.insertAdjacentHTML('beforeend', html)
//             });

//         };
