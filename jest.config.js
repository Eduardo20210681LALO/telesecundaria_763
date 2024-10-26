// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(png|jpg|jpeg|gif)$': 'jest-transform-stub', // Agrega esta línea
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transform: {
      "^.+\\.jsx?$": ["babel-jest", { sourceType: "module" }]
    },
};

/*
testEnvironment: 'jsdom', // Esto es importante para pruebas en React
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transform: {
      "^.+\\.jsx?$": ["babel-jest", { sourceType: "module" }]
    },
*/