const path = require("path");

process.env.JEST_PLAYWRIGHT_CONFIG = path.resolve(__dirname, "jest-playwright.config.js");

module.exports = {};
