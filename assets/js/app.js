// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//
import socket from "./socket";
import "phoenix_html"

const channel = socket.channel("room:lobby", {});

channel.on("shout", ({ name = "guest", message }) => {
  const newMsg = document.createElement("li");
  newMsg.innerHTML = `<b>${name}</b>: ${message}`;
  msgList.appendChild(newMsg);
});

channel.join();

const msgList = document.getElementById("msg-list");
const msgInput = document.getElementById("msg");
const nameInput = document.getElementById("name");

msgInput.addEventListener("keypress", (event) => {
  if (event.key == "Enter" && msgInput.value.length > 0) {
    channel.push("shout", {
      name: nameInput.value,
      message: msgInput.value,
    });
    msgInput.value = "";
  }
});