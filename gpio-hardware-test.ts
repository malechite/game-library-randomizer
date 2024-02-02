import { GPIO } from "./server/gpioController";

GPIO.initialize({
  onButtonPress: () => {
    console.log("Button pressed!");
  },
});

GPIO.spinLEDs();

GPIO.playFanfare();
