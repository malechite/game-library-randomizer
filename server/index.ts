import express from "express";
import { createServer } from "http";
import path from "path";
import { GPIO } from "./gpioController";
import { Server as SocketIO } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new SocketIO(httpServer);
const PORT = process.env.PORT || 3000;

GPIO.initialize();

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "../build")));

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
