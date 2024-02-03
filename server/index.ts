import express from "express";
import { createServer } from "http";
import path from "path";
import { GPIO } from "./gpioController";
import { Server as SocketIO } from "socket.io";
import { Display } from "./displayController";

const app = express();
const httpServer = createServer(app);
const io = new SocketIO(httpServer);
const PORT = process.env.PORT || 3000;
let displayTimer;

const startSleepTimer = () => {
  displayTimer = setInterval(() => {
    Display.turnOff();
  }, 60000);
};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("clientEvent", (data) => {
    console.log("Received from client:", data);
  });

  socket.on("gameSelected", async (game) => {
    console.log("Game selected:", game.Title);
    await GPIO.stopSpinningLEDs();
    GPIO.blinkAllLEDs();
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

GPIO.initialize({
  onButtonPress: () => {
    clearInterval(displayTimer);
    Display.turnOn();
    console.log("on button press");
    io.emit("buttonPressed", {
      /* payload */
    });
    startSleepTimer();
  },
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "../build")));

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

startSleepTimer();

process.on("SIGINT", () => {
  clearInterval(displayTimer);
  Display.turnOn();
  process.exit(0);
});
