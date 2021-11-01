const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

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

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));