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
const pigpio_1 = require("pigpio");
// Setup GPIO pins
const button = new pigpio_1.Gpio(17, {
    mode: pigpio_1.Gpio.INPUT,
    pullUpDown: pigpio_1.Gpio.PUD_UP,
    alert: true,
});
const leds = [
    new pigpio_1.Gpio(18, { mode: pigpio_1.Gpio.OUTPUT }),
    new pigpio_1.Gpio(23, { mode: pigpio_1.Gpio.OUTPUT }),
    new pigpio_1.Gpio(24, { mode: pigpio_1.Gpio.OUTPUT }),
];
const speaker = new pigpio_1.Gpio(12, { mode: pigpio_1.Gpio.OUTPUT });
// Utility function to sleep for a given number of milliseconds
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const turnOffAllLEDs = () => {
    leds.forEach((led) => led.digitalWrite(0));
};
// Turn on a specific LED for a certain amount of milliseconds
const lightLED = (ledIndex, duration) => __awaiter(void 0, void 0, void 0, function* () {
    leds[ledIndex].digitalWrite(1);
    yield sleep(duration);
    leds[ledIndex].digitalWrite(0);
});
// Spin the LEDs like a roulette wheel
const spinLEDs = () => __awaiter(void 0, void 0, void 0, function* () {
    let speed = 50; // Start with a fast speed (low duration)
    for (let i = 0; speed <= 500; i = (i + 1) % leds.length) {
        // Gradually increase the duration/slow down
        playTone(400 + i * 100, speed);
        yield lightLED(i, speed);
        speed *= 1.05; // Increase the "speed" by increasing the delay
    }
});
// Blink all LEDs 3 times
const blinkAllLEDs = () => __awaiter(void 0, void 0, void 0, function* () {
    playFanfare();
    for (let i = 0; i < 3; i++) {
        leds.forEach((led) => led.digitalWrite(1));
        yield sleep(500);
        leds.forEach((led) => led.digitalWrite(0));
        yield sleep(500);
    }
});
const playTone = (frequency, duration) => __awaiter(void 0, void 0, void 0, function* () {
    speaker.hardwarePwmWrite(frequency, 500000); // 50% duty cycle
    yield sleep(duration).then(() => speaker.hardwarePwmWrite(0, 0));
});
const playFanfare = () => __awaiter(void 0, void 0, void 0, function* () {
    // Extended sequence of notes for a longer fanfare
    const melody = [
        { frequency: 392, duration: 150 },
        { frequency: 369, duration: 150 },
        { frequency: 311, duration: 150 },
        { frequency: 220, duration: 150 },
        { frequency: 207, duration: 150 },
        { frequency: 329, duration: 150 },
        { frequency: 415, duration: 150 },
        { frequency: 523, duration: 250 },
    ];
    for (const note of melody) {
        if (note.frequency === 0) {
            // If frequency is 0, treat as a pause
            yield sleep(note.duration);
        }
        else {
            yield playTone(note.frequency, note.duration);
        }
    }
});
const initialize = ({ onButtonPress }) => {
    console.log("init");
    turnOffAllLEDs();
    button.glitchFilter(10000);
    button.on("alert", (level, tick) => __awaiter(void 0, void 0, void 0, function* () {
        if (level === 0) {
            onButtonPress();
            yield spinLEDs();
            yield blinkAllLEDs();
        }
    }));
};
// Cleanup function to be called on SIGINT
const cleanupOnExit = () => {
    turnOffAllLEDs();
    // Clean up speaker (stop any PWM signal)
    speaker.hardwarePwmWrite(0, 0);
    process.exit(0);
};
process.on("SIGINT", cleanupOnExit);
exports.GPIO = {
    initialize,
    turnOffAllLEDs,
    lightLED,
    spinLEDs,
    blinkAllLEDs,
    playTone,
    playFanfare,
};
