// gpioController.ts
import { Gpio } from "onoff";

// Check if GPIO is available on this system
const gpioAvailable = Gpio.accessible;

const button = gpioAvailable ? new Gpio(0, "in", "both") : null;
const led1 = gpioAvailable ? new Gpio(1, "out") : null;
const led2 = gpioAvailable ? new Gpio(2, "out") : null;
const led3 = gpioAvailable ? new Gpio(3, "out") : null;
const speaker = gpioAvailable ? new Gpio(4, "out") : null;

export const setupGPIO = () => {
  if (!gpioAvailable) {
    console.log("GPIO not available on this system.");
    return;
  }

  // Initial LED state
  led1?.writeSync(0);
  led2?.writeSync(0);
  led3?.writeSync(0);

  // Example: Turn on an LED
  // led1?.writeSync(1);

  // Handle cleanup on exit
  process.on("SIGINT", () => {
    button?.unexport();
    led1?.unexport();
    led2?.unexport();
    led3?.unexport();
    speaker?.unexport();
    process.exit();
  });
};

console.log("GPIO setup complete.");
