// next.config.js
const path = require("path");

/** @type {import("next").NextConfig} */
module.exports = {
  webpack(config) {
    // Alias "@/..." → radice progetto
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
};
