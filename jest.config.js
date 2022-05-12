module.exports = {
  roots: ["./package"],
  // setupFilesAfterEnv: ["./jest.setup.js"],
  moduleFileExtensions: ["js", "jsx"],
  testPathIgnorePatterns: ["node_modules/"],
  testMatch: ["**/*.test.(js|jsx)"],
  moduleNameMapper: {
    // Mocks out all these file formats when tests are run
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "identity-obj-proxy",
  },
};
