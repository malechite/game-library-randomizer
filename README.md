# Game Library Randomizer

The Game Library Randomizer is a full-stack application designed to run on a Raspberry Pi, featuring a physical button interface to randomly select a game from your collection. When the button is pressed, a "roulette" of game titles is displayed on a connected screen, eventually slowing down to highlight the chosen game. This project integrates a React frontend, Node.js backend, and GPIO hardware interaction for a seamless user experience.

## Features

- Random Game Selection: Randomly highlights a game from your collection upon button press.
- Physical Button Interface: Uses GPIO pins on the Raspberry Pi to start the game selection process.
- WebSockets for Real-Time Communication: Updates the frontend in real-time as the backend processes the game selection.
- Audio Feedback: Plays sounds during the selection process for a dynamic user experience.

## Prerequisites

- Raspberry Pi (tested on Raspberry Pi 3 Model B) with internet connection 
- Node.js and npm installed
- Physical button and LEDs connected to the GPIO pins

## Hardware Setup

- Connect a physical button to GPIO 17.
- Connect LEDs to GPIO 18, GPIO 23, and GPIO 24 for visual feedback.
- Connect a speaker to GPIO 12 for audio feedback.

Refer to the Raspberry Pi GPIO documentation for detailed wiring instructions.

## Installation

### Clone the repository:
```
git clone https://github.com/malechite/game-library-randomizer.git
cd game-library-randomizer
```

### Install Node.js dependencies:
```
npm install
```

### Build the React frontend:
```
npm run build
```

### Running the Application
```
npm start
```

The application should now be running. Interact with the physical button to start the game selection process.

## Configuration

To adjust GPIO pin assignments, edit gpioController.ts with your specific hardware configuration.
To update the game library, modify game_collection.json with your game titles.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs, feature requests, or improvements.

## License

This project is open-source and available under the MIT License.

