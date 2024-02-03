require("dotenv").config({ path: "../.env" });
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

// Replace 'YOUR_RAWG_API_KEY' with your actual RAWG.io API key
const apiKey = process.env.RAWG_API_KEY;
const apiUrl = process.env.RAWG_API_URL;
const gameDataPath = "../src/data/game_collection.json";
const imageDirectory = "../assets/"; // Ensure this directory exists

// Function to fetch game details from RAWG.io
async function fetchGameArt(gameName, platform) {
  try {
    console.log(`Fetching game art for ${gameName} on ${platform}...`);
    const response = await axios.get(`${apiUrl}/games`, {
      params: {
        key: apiKey,
        search: gameName,
        platforms: platform,
      },
    });

    console.log("Response data is:", JSON.stringify(response.data));

    if (response.data && response.data.results.length > 0) {
      // Assuming the first result is the correct game
      const imageUrl = response.data.results[0].background_image;
      console.log("Image URL is:", imageUrl);
      return imageUrl;
    }
  } catch (error) {
    console.error(`Failed to fetch game art for ${gameName}: ${error}`);
    return null;
  }
}

// Function to update game data with image paths
async function updateGameData(gameData) {
  for (const game of gameData) {
    const imageUrl = await fetchGameArt(game.Title, game.PlatformId);
    if (imageUrl) {
      console.log(`Updating game data for ${game.Title}...`);
      const imageName = path.basename(imageUrl);
      const imagePath = path.join(imageDirectory, imageName);
      game.image_path = imagePath;

      // Download and save the image
      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });
      await writeFileAsync(imagePath, response.data);
    }
  }

  // Write the updated game data back to the JSON file
  await writeFileAsync(gameDataPath, JSON.stringify(gameData, null, 2));
  console.log("Game data updated with image paths.");
}

// Main function to read game data and update it
async function main() {
  try {
    const gameData = require(path.resolve(gameDataPath));
    await updateGameData(gameData);
  } catch (error) {
    console.error(`Failed to update game data: ${error}`);
  }
}

main();
