// src/setupTests.js
import '@testing-library/jest-dom'; // Sin /extend-expect
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost',
});

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
