module.exports = {
  testEnvironment: "jest-environment-jsdom",
  testEnvironmentOptions: {
    userAgent: "node.js",
    testURL: "http://localhost",
    features: {
      act: true,
    },
  },
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
};
