module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/../../src"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"], // этот путь должен указывать на правильный файл
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx)"],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/../../src/$1",
    "^@config/(.*)$": "<rootDir>/../$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/../../src/__mocks__/svgMock.js"
  },
  clearMocks: true,
};