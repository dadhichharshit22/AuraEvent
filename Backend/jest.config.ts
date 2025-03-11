
require("dotenv").config();

module.exports = {
  setupFiles: ["dotenv/config"], // Ensures environment variables are available
};
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
    transformIgnorePatterns: ["/node_modules/(?!your-package)"],
  
  
};
