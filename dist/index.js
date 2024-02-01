"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Serve static files from the React app build directory
app.use(express_1.default.static(path_1.default.join(__dirname, "../build")));
// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../build", "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
