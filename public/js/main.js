const socket = io();
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

// Get username and room from url
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// Join room
socket.emit("joinRoom", { username, room });

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on("message", (message) => {
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Submit message
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  socket.emit("chatMessage", msg);

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Put message to DOM
function outputMessage(msg) {
  const div = document.createElement("div");
  div.classList.add("wrapper");
  if (username == msg.username) {
    div.innerHTML = `
    <div class="bubble alt">
      <div class="txt">
        <p class="name alt">${msg.username}</p>
        <p class="message">${msg.text}</p>
        <span class="timestamp">${msg.time}</span>
      </div>
      <div class="bubble-arrow alt"></div>
    </div>
  `;
  } else {
    div.innerHTML = `
      <div class="bubble">
        <div class="txt">
          <p class="name">${msg.username}</p>
          <p class="message">${msg.text}</p>
          <span class="timestamp">${msg.time}</span>
        </div>
        <div class="bubble-arrow"></div>
      </div>
    `;
  }
  document.querySelector(".chat-messages").appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  userList.innerHTML = `${users
    .map((user) => `<li>${user.username}</li>`)
    .join("")}`;
}
