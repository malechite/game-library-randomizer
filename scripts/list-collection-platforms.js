const fs = require("fs");
const path = require("path");

const gameDataPath = path.join(__dirname, "../src/data/game_collection.json"); // Update with your actual path

// Function to read the game data JSON and print unique platforms
function printUniquePlatforms() {
  fs.readFile(gameDataPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    // Parse the JSON data
    const games = JSON.parse(data);
    const uniquePlatforms = new Set(); // Use a Set to store unique platforms

    // Iterate over games and add platforms to the Set
    games.forEach((game) => {
      if (game.Platform) {
        // Ensure the game has a Platform property
        uniquePlatforms.add(game.Platform);
      }
    });

    // Convert the Set to an array and print the unique platforms
    console.log(Array.from(uniquePlatforms));
  });
}

printUniquePlatforms();
