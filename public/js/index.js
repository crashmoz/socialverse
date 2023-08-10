const socket = io();

const username = document.getElementById("username");
const rooms = document.getElementById("room");
const list = document.createElement("option");
const submit = document.getElementById("btn");
const btnroom = document.getElementById("createRoom");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const modalVal = document.getElementById("room-name");
const btnAdd = document.getElementById("add");
const noRoom = document.getElementById("no-room");

socket.emit("index");

socket.on("fetchRoom", (data) => {
  if (data.length > 0) {
    if (typeof data === "string") {
      console.log(typeof data);
      outputRoom(data);
    } else {
      outputRooms(data);
    }
    document.getElementById("text-no-room").hidden = true;
  } else {
    document.getElementById("text-no-room").hidden = false;
  }
});

// Show modal
btnroom.addEventListener("click", (event) => {
  modal.style.display = "block";
  setTimeout(() => {
    modal.style.opacity = "1"; // Change opacity to 1 after display block (fade in)
  }, 10);
  btnAdd.disabled = true;

  modalVal.addEventListener("input", () => {
    if (modalVal.value.trim() !== "") {
      // btnAdd.removeAttribute("disabled");
      btnAdd.disabled = false;
    } else {
      btnAdd.disabled = true;
      // btnAdd.setAttribute("disabled", "disabled");
    }
  });
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  modal.style.opacity = "0"; // Change opacity to 0 (fade out)
  modalVal.value = ""; // Reset room value
  setTimeout(() => {
    modal.style.display = "none"; // Hide modal after fade out
  }, 300); // Match the duration of the transition (0.3 seconds)
});

// Create room
btnAdd.addEventListener("click", () => {
  const val = modalVal.value;
  socket.emit("addRoom", val);
  closeModalBtn.click();
});

function outputRooms(data) {
  // Loop melalui data opsi dan tambahkan ke elemen select
  data.forEach(function (option) {
    var optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    rooms.appendChild(optionElement);
  });
}

function outputRoom(data) {
  var optionElement = document.createElement("option");
  optionElement.value = data;
  optionElement.textContent = data;
  rooms.appendChild(optionElement);
}
