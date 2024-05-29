import { connectToServer } from "./socket-client";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   
   <h2>Websocket - Client</h2>

   <input id="jwt-token" placeholder="Json Web Token"/>

   <button id="btn-connect">Connect</button>

   <br/>

   <span id="server-status-label">offline</span>

   <ul id="clients-ul"></ul>

   <form id="message-form">
   <input placeholder="message" id="message-input"/>
   </form>

   <h3>Messages</h3>
   <ul id="messages-ul"></ul>

  </div>
`;

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// connectToServer(); //Connect to the server
const jwtToken = document.querySelector<HTMLInputElement>("#jwt-token")!;
const btnConnect = document.querySelector<HTMLInputElement>("#btn-connect")!;

//Connect to the server when the button is clicked
btnConnect.addEventListener("click", () => {

  if( jwtToken.value.trim().length <= 0 ) return alert('Please enter a valid Json Web Token');

  connectToServer(jwtToken.value.trim());
});
