"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const path_1 = __importDefault(require("path"));
const gpioController_1 = require("./gpioController");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer);
const PORT = process.env.PORT || 3000;
gpioController_1.GPIO.initialize();
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
// Serve static files from the React app build directory
app.use(express_1.default.static(path_1.default.join(__dirname, "../build")));
// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../build", "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
