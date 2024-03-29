const { exec } = require("child_process");

const turnOff = () => {
  exec(
    "xset dpms force off",
    (error: Error | null, stdout: string, stderr: string) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log("Display turned off");
    }
  );
};

const turnOn = () => {
  exec(
    "xset dpms force on",
    (error: Error | null, stdout: string, stderr: string) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log("Display turned on");
    }
  );
};

export const Display = { turnOn, turnOff };
