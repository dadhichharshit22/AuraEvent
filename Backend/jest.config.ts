export default {
  preset: "ts-jest",
  maxWorkers: 1,
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};
