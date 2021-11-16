const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const { nanoid } = require('nanoid')

const port = process.env.PORT || 4001;
const index = require("../routes/index");

/* var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
} */

const app = express();
app.use(index);
app.use(cors())

const server = http.createServer(app);

const io = require('socket.io')(server, {cors: {origin: "*"}});

let interval;
let playerID;

io.on("connection", (socket) => {
  console.log("New client connected");
  playerID = nanoid();
/*   if (interval) {
    clearInterval(interval);
  } */
  if(!socket.isIDSent){
    socket.emit("playerID", playerID);
    socket.isIDSent = true;
  }
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));