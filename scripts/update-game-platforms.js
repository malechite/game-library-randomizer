const fs = require("fs").promises;
const path = require("path");

// Path to your game collection JSON file
const gameDataPath = path.join(__dirname, "../src/data/game_collection.json");

// Your provided platformSlugLookup mapping
const platformSlugLookup = [
  ["Nintendo (NES)", "nes"],
  ["Atari Jaguar", "jaguar"],
  ["Super Nintendo (SNES)", "snes"],
  ["Atari 2600", "atari-2600"],
  ["Nintendo 64", "nintendo-64"],
  ["Sony PlayStation", "playstation1"],
  ["Sega Dreamcast", "dreamcast"],
  ["TurboGrafx 16", ""],
  ["Nintendo Game Boy", "game-boy"],
  ["Nintendo Game Boy Color", "game-boy-color"],
  ["Nintendo DS", "nintendo-ds"],
  ["Nintendo 3DS", "nintendo-3ds"],
  ["Nintendo Wii", "wii"],
  ["Nintendo Wii U", "wii-u"],
  ["Sega Genesis", "genesis"],
  ["Sega 32X", "sega-32x"],
  ["Sony PSP", "psp"],
  ["Sony PS Vita", "ps-vita"],
  ["Sony PlayStation 3", "playstation3"],
  ["Nintendo GameCube", "gamecube"],
  ["Sony PlayStation 2", "playstation2"],
  ["Sega Master System", "sega-master-system"],
  ["Nintendo Switch", "nintendo-switch"],
  ["Sony PlayStation 4", "playstation4"],
  ["Nintendo Game Boy Advance", "game-boy-advance"],
  ["Intellivision", ""],
  ["Microsoft Xbox", "xbox-old"],
  ["Microsoft Xbox 360", "xbox360"],
  ["Sega CD", "sega-cd"],
  ["Sega Game Gear", "game-gear"],
  ["Nintendo Virtual Boy", ""],
  ["Nintendo Game & Watch", ""],
  ["Sony PlayStation 5", "playstation5"],
  ["Vectrex", ""],
  ["Mattel Aquarius", ""],
];

// Function to update each game with the appropriate PlatformSlug
async function updateGamePlatforms() {
  try {
    // Read the game collection JSON file
    const gameDataRaw = await fs.readFile(gameDataPath, { encoding: "utf8" });
    const gameData = JSON.parse(gameDataRaw);

    // Convert your platformSlugLookup array to a more accessible object format
    const lookup = platformSlugLookup.reduce((acc, [platform, slug]) => {
      acc[platform] = slug;
      return acc;
    }, {});

    // Iterate over each game and update PlatformSlug
    const updatedGameData = gameData.map((game) => {
      if (game.Platform && lookup[game.Platform]) {
        game.PlatformSlug = lookup[game.Platform];
      } else {
        // If no matching slug is found, you could leave it empty or mark it for review
        game.PlatformSlug = game.PlatformSlug || "REVIEW";
      }
      return game;
    });

    // Write the updated game collection back to the JSON file
    await fs.writeFile(gameDataPath, JSON.stringify(updatedGameData, null, 2), {
      encoding: "utf8",
    });
    console.log("Game collection updated with PlatformSlugs.");
  } catch (error) {
    console.error("Failed to update game platforms:", error);
  }
}

updateGamePlatforms();
