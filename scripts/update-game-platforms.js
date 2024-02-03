const fs = require("fs").promises;
const path = require("path");

// Path to your game collection JSON file
const gameDataPath = path.join(__dirname, "../src/data/game_collection.json");

const platforms = [
  {
    id: 4,
    name: "PC",
    slug: "pc",
  },
  {
    id: 187,
    name: "PlayStation 5",
    slug: "playstation5",
  },
  {
    id: 18,
    name: "PlayStation 4",
    slug: "playstation4",
  },
  {
    id: 1,
    name: "Xbox One",
    slug: "xbox-one",
  },
  {
    id: 186,
    name: "Xbox Series S/X",
    slug: "xbox-series-x",
  },
  {
    id: 7,
    name: "Nintendo Switch",
    slug: "nintendo-switch",
  },
  {
    id: 3,
    name: "iOS",
    slug: "ios",
  },
  {
    id: 21,
    name: "Android",
    slug: "android",
  },
  {
    id: 8,
    name: "Nintendo 3DS",
    slug: "nintendo-3ds",
  },
  {
    id: 9,
    name: "Nintendo DS",
    slug: "nintendo-ds",
  },
  {
    id: 13,
    name: "Nintendo DSi",
    slug: "nintendo-dsi",
  },
  {
    id: 5,
    name: "macOS",
    slug: "macos",
  },
  {
    id: 6,
    name: "Linux",
    slug: "linux",
  },
  {
    id: 14,
    name: "Xbox 360",
    slug: "xbox360",
  },
  {
    id: 80,
    name: "Xbox",
    slug: "xbox-old",
  },
  {
    id: 16,
    name: "PlayStation 3",
    slug: "playstation3",
  },
  {
    id: 15,
    name: "PlayStation 2",
    slug: "playstation2",
  },
  {
    id: 27,
    name: "PlayStation",
    slug: "playstation1",
  },
  {
    id: 19,
    name: "PS Vita",
    slug: "ps-vita",
  },
  {
    id: 17,
    name: "PSP",
    slug: "psp",
  },
  {
    id: 10,
    name: "Wii U",
    slug: "wii-u",
  },
  {
    id: 11,
    name: "Wii",
    slug: "wii",
  },
  {
    id: 105,
    name: "GameCube",
    slug: "gamecube",
  },
  {
    id: 83,
    name: "Nintendo 64",
    slug: "nintendo-64",
  },
  {
    id: 24,
    name: "Game Boy Advance",
    slug: "game-boy-advance",
  },
  {
    id: 43,
    name: "Game Boy Color",
    slug: "game-boy-color",
  },
  {
    id: 26,
    name: "Game Boy",
    slug: "game-boy",
  },
  {
    id: 79,
    name: "SNES",
    slug: "snes",
  },
  {
    id: 49,
    name: "NES",
    slug: "nes",
  },
  {
    id: 55,
    name: "Classic Macintosh",
    slug: "macintosh",
  },
  {
    id: 41,
    name: "Apple II",
    slug: "apple-ii",
  },
  {
    id: 166,
    name: "Commodore / Amiga",
    slug: "commodore-amiga",
  },
  {
    id: 28,
    name: "Atari 7800",
    slug: "atari-7800",
  },
  {
    id: 31,
    name: "Atari 5200",
    slug: "atari-5200",
  },
  {
    id: 23,
    name: "Atari 2600",
    slug: "atari-2600",
  },
  {
    id: 22,
    name: "Atari Flashback",
    slug: "atari-flashback",
  },
  {
    id: 25,
    name: "Atari 8-bit",
    slug: "atari-8-bit",
  },
  {
    id: 34,
    name: "Atari ST",
    slug: "atari-st",
  },
  {
    id: 46,
    name: "Atari Lynx",
    slug: "atari-lynx",
  },
  {
    id: 50,
    name: "Atari XEGS",
    slug: "atari-xegs",
  },
  {
    id: 167,
    name: "Genesis",
    slug: "genesis",
  },
  {
    id: 107,
    name: "SEGA Saturn",
    slug: "sega-saturn",
  },
  {
    id: 119,
    name: "SEGA CD",
    slug: "sega-cd",
  },
  {
    id: 117,
    name: "SEGA 32X",
    slug: "sega-32x",
  },
  {
    id: 74,
    name: "SEGA Master System",
    slug: "sega-master-system",
  },
  {
    id: 106,
    name: "Dreamcast",
    slug: "dreamcast",
  },
  {
    id: 111,
    name: "3DO",
    slug: "3do",
  },
  {
    id: 112,
    name: "Jaguar",
    slug: "jaguar",
  },
  {
    id: 77,
    name: "Game Gear",
    slug: "game-gear",
  },
  {
    id: 12,
    name: "Neo Geo",
    slug: "neogeo",
  },
  {
    id: 171,
    name: "Web",
    slug: "web",
  },
];

function findPlatformIdAndSlug(platformName) {
  const platform = platforms.find(
    (p) =>
      platformName.toLowerCase().includes(p.name.toLowerCase()) ||
      p.name.toLowerCase().includes(platformName.toLowerCase())
  );
  return platform ? { id: platform.id, slug: platform.slug } : null;
}

// Function to update each game with the appropriate PlatformId and PlatformSlug
async function updateGamePlatforms() {
  try {
    const gameDataRaw = await fs.readFile(gameDataPath, { encoding: "utf8" });
    const gameData = JSON.parse(gameDataRaw);

    // Iterate over each game and update PlatformId and PlatformSlug
    const updatedGameData = gameData.map((game) => {
      const platformMatch = findPlatformIdAndSlug(game.Platform);
      if (platformMatch) {
        game.PlatformId = platformMatch.id;
        game.PlatformSlug = platformMatch.slug;
      } else {
        // If no matching platform is found, you could leave it empty or mark it for review
        game.PlatformId = game.PlatformId || "REVIEW";
        game.PlatformSlug = game.PlatformSlug || "REVIEW";
      }
      return game;
    });

    // Write the updated game collection back to the JSON file
    await fs.writeFile(gameDataPath, JSON.stringify(updatedGameData, null, 2), {
      encoding: "utf8",
    });
    console.log("Game collection updated with PlatformIds and PlatformSlugs.");
  } catch (error) {
    console.error("Failed to update game platforms:", error);
  }
}
updateGamePlatforms();
