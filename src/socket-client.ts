import { Manager, Socket } from "socket.io-client";

let socket: Socket;

//Connect to the server
export const connectToServer = (token: string) => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js", {
    extraHeaders: {
      hola: "mundo",
      authentication: token,
    },
  });

  socket?.removeAllListeners(); //Remove all listeners from the socket
  socket = manager.socket("/"); //Connect to the namespace. This obtein the client id

  //console.log({ socket });

  addListeners();
};

//Add listeners to the socket
const addListeners = () => {
  const clientsUl = document.querySelector("#clients-ul")!; //Get the ul element to show the clients
  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
  const messageInput =
    document.querySelector<HTMLInputElement>("#message-input")!;
  const messagesUl = document.querySelector<HTMLUListElement>("#messages-ul")!; //Get the ul element to show the clients
  const serverStatusLabel = document.querySelector("#server-status-label")!; //Get the span element to show the server status

  //on: Listen to an event from the server / emit: Send an event to the server
  socket.on("connect", () => {
    serverStatusLabel.innerHTML = "connected";
  });

  socket.on("disconnect", () => {
    serverStatusLabel.innerHTML = "disconnected";
  });

  socket.on("clients-updated", (clients: string[]) => {
    let clientsHtml = "";
    clients.forEach((clientId) => {
      clientsHtml += `
                <li>${clientId}</li>
            `;
    });
    clientsUl.innerHTML = clientsHtml;
  });

    //Send a message to the server
  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return;

    socket.emit("message-from-client", {
      id: "YO!!",
      message: messageInput.value,
    });

    messageInput.value = "";
  });

  socket.on(
    "message-from-server",
    (payload: { fullName: string; message: string }) => {
      const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `;
      const li = document.createElement("li");
      li.innerHTML = newMessage;
      messagesUl.append(li);
    }
  );
};
