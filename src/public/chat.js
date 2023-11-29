const socketClient = io();
let username = null;

if (!username) {
  Swal.fire({
    title: "Welcome to chat!",
    text: "Insert your username",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "Username is required!";
      }
    },
  }).then((input) => {
    username = input.value;
    socketClient.emit("newUser", username);
  });
}

const message = document.getElementById("message");
const send = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

send.addEventListener("click", () => {
  socketClient.emit("chat:message", {
    username,
    message: message.value,
  });
  message.value = "";
});

socketClient.on("messages", (data) => {
  actions.innerHTML = "";
  const chatRender = data
    .map((message) => {
      return `
    <p class="message">
      <strong>${message.username}</strong>:
      <p>${message.message}</p>
    </p>
    `;
    })
    .join(" ");
  output.innerHTML = chatRender;
});

socketClient.on("newUser", (username) => {
  Toastify({
    text: `${username} has joined the chat`,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
});

message.addEventListener("keypress", () => {
  socketClient.emit("chat:typing", username);
});

socketClient.on("chat:typing", (data) => {
  actions.innerHTML = `<p>${data} is typing a message...</p>`;
});
