import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

// Initialize a new client
const client = new Client({
  authStrategy: new LocalAuth(),
});

console.log("STARTING CLIENT... PLEASE WAIT !");

// Show QR code for auth
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Scan the QR with your WhatsApp app");
});

// Log when client is ready
client.on("ready", () => {
  console.log("Client is ready");
});

// My numbers
const userone = "911234...@c.us"; 
const usertwo = "915678...@c.us"; 
// linked device with number - 919000

// Incoming messages
client.on("message", async (msg) => {
  if (msg.from === userone) {
    console.log(`User: ${userone} sent this message: ${msg.body}`);
    await client.sendMessage(usertwo, msg.body);
    console.log(`Message forwarded to ${usertwo}`);
  } else {
    console.log(`Message from ${msg.from}, not ${userone}, ignoring the msg`);
  }
});

client.on("disconnected", (offline) => {
  console.log("Client disconnected:", offline);
});

try {
  client.initialize();
} catch (error) {
  console.log("Error while initializing:", error);
}