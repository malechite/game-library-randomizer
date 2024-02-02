"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPIO = void 0;
const onoff_1 = require("onoff");
// Setup GPIO pins
const button = new onoff_1.Gpio(0, 'in', 'rising', { debounceTimeout: 10 });
const leds = [new onoff_1.Gpio(1, 'out'), new onoff_1.Gpio(2, 'out'), new onoff_1.Gpio(3, 'out')];
const speaker = new onoff_1.Gpio(4, 'out'); // For the beep, you might need PWM support
// Utility function to sleep for a given number of milliseconds
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const turnOffAllLEDs = () => {
    leds.forEach(led => led.writeSync(0));
};
// Turn on a specific LED for a certain amount of milliseconds
const lightLED = (ledIndex, duration) => __awaiter(void 0, void 0, void 0, function* () {
    leds[ledIndex].writeSync(1);
    yield sleep(duration);
    leds[ledIndex].writeSync(0);
});
// Spin the LEDs like a roulette wheel
const spinLEDs = () => __awaiter(void 0, void 0, void 0, function* () {
    let speed = 10; // Start with a fast speed (low duration)
    for (let i = 0; speed <= 500; i = (i + 1) % leds.length) { // Gradually increase the duration/slow down
        yield lightLED(i, speed);
        speed *= 1.1; // Increase the "speed" by increasing the delay
    }
});
// Blink all LEDs 3 times
const blinkAllLEDs = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 3; i++) {
        leds.forEach(led => led.writeSync(1));
        yield sleep(500);
        leds.forEach(led => led.writeSync(0));
        yield sleep(500);
    }
});
const initialize = () => {
    turnOffAllLEDs();
    // Listen for the button to be pressed to start the LED roulette
    button.watch((err, value) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error('Button watch error', err);
            return;
        }
        if (value === 1) { // Button pressed
            yield spinLEDs();
            yield blinkAllLEDs();
            // Here you could also trigger the WebSocket message to the React app to start the randomization
        }
    }));
};
// Cleanup on exit
process.on('SIGINT', () => {
    button.unexport();
    leds.forEach(led => led.unexport());
    speaker.unexport();
});
exports.GPIO = {
    initialize,
    turnOffAllLEDs,
    lightLED,
    spinLEDs,
    blinkAllLEDs,
};
