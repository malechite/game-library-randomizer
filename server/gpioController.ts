import { Gpio } from "pigpio";

interface GPIOInitOptions {
  onButtonPress: () => void;
}

let keepSpinning = true;
let keepBreathing = true;
let isBreathing = false;
let isAnimating = false;
let randomizationInProgress = false;

// Setup GPIO pins
const button = new Gpio(17, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_UP,
  alert: true,
});

const leds = [
  new Gpio(18, { mode: Gpio.OUTPUT }), // Changed to common GPIO pins
  new Gpio(23, { mode: Gpio.OUTPUT }),
  new Gpio(24, { mode: Gpio.OUTPUT }),
];

const speaker = new Gpio(12, { mode: Gpio.OUTPUT });

// Utility function to sleep for a given number of milliseconds
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const turnOffAllLEDs = () => {
  leds.forEach((led) => led.digitalWrite(0));
};

// Turn on a specific LED for a certain amount of milliseconds
const lightLED = async (ledIndex: number, duration: number) => {
  leds[ledIndex].digitalWrite(1);
  await sleep(duration);
  leds[ledIndex].digitalWrite(0);
};

// Spin the LEDs like a roulette wheel
const spinLEDs = async () => {
  if (isAnimating) return;
  isAnimating = true;
  let speed = 50; // Start with a fast speed (low duration)
  keepSpinning = true; // Ensure spinning starts when this function is called

  for (let i = 0; speed <= 500; i = (i + 1) % leds.length) {
    // Gradually increase the duration/slow down
    playTone(400 + i * 100, speed);
    await lightLED(i, speed);
    speed *= 1.05; // Increase the "speed" by increasing the delay

    if (!keepSpinning) {
      break; // Exit the loop if keepSpinning has been set to false
    }
  }
  turnOffAllLEDs();
  isAnimating = false;
};

const stopSpinningLEDs = async () => {
  keepSpinning = false; // This will cause the spinLEDs loop to exit
  await sleep(200); // Wait for a second to ensure the loop has exited
  isAnimating = false;
};

// Blink all LEDs 3 times
const blinkAllLEDs = async () => {
  if (isAnimating) return;
  isAnimating = true;
  await sleep(500); // Wait for a short moment before playing the fanfare
  playFanfare();
  for (let i = 0; i < 3; i++) {
    leds.forEach((led) => led.digitalWrite(1));
    await sleep(500);
    leds.forEach((led) => led.digitalWrite(0));
    await sleep(500);
  }
  isAnimating = false;
  randomizationInProgress = false;
};

const breatheLEDs = async () => {
  if (isAnimating) return;
  if (isBreathing) return;
  isAnimating = true;
  keepBreathing = true;
  isBreathing = true;

  const maxBrightness = 128; // 50% of 255
  const step = 5; // Adjust for smoother or faster transitions
  const delay = 20; // Milliseconds for each step delay

  const breathe = async () => {
    for (const led of leds) {
      // Fade in
      for (
        let brightness = 0;
        brightness <= maxBrightness;
        brightness += step
      ) {
        led.pwmWrite(brightness);
        await sleep(delay);
      }

      if (!keepBreathing) {
        turnOffAllLEDs();
        isAnimating = false;
        break;
      }

      // Fade out
      for (
        let brightness = maxBrightness;
        brightness >= 0;
        brightness -= step
      ) {
        led.pwmWrite(brightness);
        await sleep(delay);
      }
      isAnimating = false;
      await sleep(delay);
    }
  };

  while (keepBreathing) {
    await breathe();
  }

  if (!keepBreathing) {
    stopBreathingLEDs(); // Ensure LEDs are turned off if exiting early
  }
};

const stopBreathingLEDs = async () => {
  turnOffAllLEDs();
  await sleep(200);
  keepBreathing = false;
  isBreathing = false;
  isAnimating = false;
};

const testSpin = async () => {
  await sleep(15000);
  await spinLEDs();
  await sleep(1000);
  await stopSpinningLEDs();
  await blinkAllLEDs();
};

const playTone = async (frequency: number, duration: number) => {
  speaker.hardwarePwmWrite(frequency, 500000); // 50% duty cycle
  await sleep(duration).then(() => speaker.hardwarePwmWrite(0, 0));
};

const playFanfare = async () => {
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
      await sleep(note.duration);
    } else {
      await playTone(note.frequency, note.duration);
    }
  }
};

const initialize = ({ onButtonPress }: GPIOInitOptions) => {
  turnOffAllLEDs();
  button.glitchFilter(10000);

  button.on("alert", async (level, tick) => {
    console.log("Button pressed");
    if (randomizationInProgress) {
      console.log("Randomization in progress");
      return;
    }
    console.log("Randomization not in progress");
    randomizationInProgress = true;
    console.log("Level: ", level);
    if (level === 0) {
      console.log("Level is 0, do action");
      onButtonPress();
      await spinLEDs();
    }
  });

  testSpin();
};

// Cleanup function to be called on SIGINT
const cleanupOnExit = () => {
  turnOffAllLEDs();
  // Clean up speaker (stop any PWM signal)
  speaker.hardwarePwmWrite(0, 0);
  process.exit(0);
};

process.on("SIGINT", cleanupOnExit);

export const GPIO = {
  initialize,
  turnOffAllLEDs,
  lightLED,
  spinLEDs,
  stopSpinningLEDs,
  blinkAllLEDs,
  breatheLEDs,
  stopBreathingLEDs,
  playTone,
  playFanfare,
};
