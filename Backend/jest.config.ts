export default {
  preset: "ts-jest",
  maxWorkers: 1,
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};
require("dotenv").config();

module.exports = {
  setupFiles: ["dotenv/config"], // Ensures environment variables are available
};
