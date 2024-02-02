import { Gpio } from 'onoff';

// Setup GPIO pins
const button = new Gpio(0, 'in', 'rising', { debounceTimeout: 10 });
const leds = [new Gpio(1, 'out'), new Gpio(2, 'out'), new Gpio(3, 'out')];
const speaker = new Gpio(4, 'out'); // For the beep, you might need PWM support

// Utility function to sleep for a given number of milliseconds
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const turnOffAllLEDs = () => {
  leds.forEach(led => led.writeSync(0));
}

// Turn on a specific LED for a certain amount of milliseconds
const lightLED = async (ledIndex: number, duration: number) => {
  leds[ledIndex].writeSync(1);
  await sleep(duration);
  leds[ledIndex].writeSync(0);
};

// Spin the LEDs like a roulette wheel
const spinLEDs = async () => {
  let speed = 10; // Start with a fast speed (low duration)
  for (let i = 0; speed <= 500; i = (i + 1) % leds.length) { // Gradually increase the duration/slow down
    await lightLED(i, speed);
    speed *= 1.1; // Increase the "speed" by increasing the delay
  }
};

// Blink all LEDs 3 times
const blinkAllLEDs = async () => {
  for (let i = 0; i < 3; i++) {
    leds.forEach(led => led.writeSync(1));
    await sleep(500);
    leds.forEach(led => led.writeSync(0));
    await sleep(500);
  }
};

const initialize = () => {
  turnOffAllLEDs();
  // Listen for the button to be pressed to start the LED roulette
  button.watch(async (err, value) => {
    if (err) {
      console.error('Button watch error', err);
      return;
    }
    if (value === 1) { // Button pressed
      await spinLEDs();
      await blinkAllLEDs();
      // Here you could also trigger the WebSocket message to the React app to start the randomization
    }
  });
};

// Cleanup on exit
process.on('SIGINT', () => {
  button.unexport();
  leds.forEach(led => led.unexport());
  speaker.unexport();
});

export const GPIO = {
  initialize,
  turnOffAllLEDs,
  lightLED,
  spinLEDs,
  blinkAllLEDs,
};