require("dotenv").config({ path: "../.env" });
const axios = require("axios");
const fs = require("fs").promises;

const apiKey = process.env.RAWG_API_KEY; // Ensure your RAWG API key is stored in .env file
const apiUrl = process.env.RAWG_API_URL;

async function fetchAllPlatforms() {
  let platforms = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await axios.get(`${apiUrl}/platforms`, {
      params: {
        key: apiKey,
        page: page,
      },
    });

    platforms.push(...response.data.results);
    page += 1;
    hasMore = response.data.next !== null;
  }

  return platforms.map(({ id, name, slug }) => ({ id, name, slug }));
}

fetchAllPlatforms().then((platforms) => {
  console.log(platforms);
  // Optionally, save this to a file if needed
  fs.writeFile("platforms.json", JSON.stringify(platforms, null, 2), "utf8")
    .then(() => console.log("Platforms saved to platforms.json"))
    .catch((error) => console.error("Failed to save platforms:", error));
});
