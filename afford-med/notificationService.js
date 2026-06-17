const axios = require("axios");
const Log = require("./logger");

const TOKEN = require("./tokens");

async function getNotifications() {
  try {
    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    await Log(
      "frontend",
      "info",
      "api",
      "Notifications fetched successfully"
    );

    return response.data.notifications;
  } catch (error) {
    await Log(
  "frontend",
  "error",
  "api",
  "Failed to fetch notifications"
);

    throw error;
  }
}

module.exports = getNotifications;