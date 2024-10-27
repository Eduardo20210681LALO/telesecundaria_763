// jest.config.js
module.exports = {
    //testEnvironment: 'jest-environment-jsdom',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(png|jpg|jpeg|gif)$': 'jest-transform-stub', // Agrega esta línea
      '^.+\\.[t|j]sx?$': 'babel-jest'
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transform: {
      "^.+\\.jsx?$": ["babel-jest", { sourceType: "module" }]
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};
