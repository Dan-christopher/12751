const axios = require("axios");

const TOKEN = require("./tokens");

async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Log Created:", response.data);
  } catch (error) {
    console.error("Log Error:", error.message);
  }
}

module.exports = Log;