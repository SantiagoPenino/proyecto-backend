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
    if (input.value) {
      username = input.value;
      socketClient.emit("newUser", username);
    }
  });
}

const message = document.getElementById("message");
const send = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

send.addEventListener("click", () => {
  socketClient.emit("chat:message", {
    username: username,
    message: message.value,
  });
  message.value = "";
});

socketClient.on("messages", (data) => {
  actions.innerHTML = "";
  const chatRender = data
    .map((message) => {
      return `
    <div class="message">
      <strong>${message.username}</strong>:
      <p>${message.message}</p>
    </div>
    `;
    })
    .join(" ");
  output.innerHTML = chatRender;
});

message.addEventListener("keypress", () => {
  socketClient.emit("chat:typing", username);
});

socketClient.on("chat:typing", (data) => {
  actions.innerHTML = `<p>${data} is typing a message...</p>`;
});

window.addEventListener("beforeunload", () => {
  socketClient.disconnect();
});
