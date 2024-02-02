import { Gpio } from "onoff";

// Assuming LED is connected to GPIO 1 as per your setup
const led = new Gpio(1, "out");

const blinkLED = (duration: number) => {
  // Turn the LED on
  led.writeSync(1);
  console.log("LED turned on");

  // Turn the LED off after 'duration' milliseconds
  setTimeout(() => {
    led.writeSync(0);
    console.log("LED turned off");
    led.unexport(); // Cleanup GPIO resources
  }, duration);
};

// Test the LED for 5 seconds
blinkLED(5000);
