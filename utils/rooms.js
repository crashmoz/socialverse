const rooms = [];

function addRoom(room) {
  rooms.push(room);
}

function getRooms() {
  // let room = document.getElementById("room");
  // let list = document.createElement("option");
  // list.value = "Test";
  // list.textContent = "Ini cuma buat test";
  // room.appendChild(list);
  return rooms;
}

module.exports = { addRoom, getRooms };
