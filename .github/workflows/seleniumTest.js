const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runComprehensiveTest() {
  let options = new chrome.Options();
  options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');

  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  try {
    await driver.get('http://localhost:5173/CapturaCalificacionesAlum');
    let inputField = await driver.findElement(By.css('#campoEntrada'));
    let submitButton = await driver.findElement(By.css('#botonEnviar'));
    await driver.wait(until.elementIsVisible(inputField), 3000);
    await driver.wait(until.elementIsVisible(submitButton), 3000);

    await inputField.sendKeys("Prueba de entrada");
    await submitButton.click();

    let result = await driver.wait(until.elementLocated(By.css('#resultado')), 5000);
    let resultText = await result.getText();
    if (resultText.includes("Resultado esperado")) {
      console.log("Prueba exitosa: Resultado esperado obtenido.");
    } else {
      console.error("Prueba fallida: Resultado inesperado.");
    }
  } catch (error) {
    console.error("Prueba fallida:", error);
  } finally {
    await driver.quit();
  }
}

runComprehensiveTest();