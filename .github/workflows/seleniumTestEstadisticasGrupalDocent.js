const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testEstadisticasGrupalDocent() {
  let options = new chrome.Options();
  options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage'); // Opciones para modo headless en CI/CD

  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    // Accede a la página de estadísticas
    await driver.get('http://localhost:5173/EstadisticasGrupalDocent');

    // Espera a que el selector de periodos esté visible
    await driver.wait(until.elementLocated(By.css('select[placeholder="Seleccionar Periodo"]')), 5000);
    console.log("Selector de Periodo cargado exitosamente.");

    // Selecciona un período
    const periodoSelect = await driver.findElement(By.css('select[placeholder="Seleccionar Periodo"]'));
    await periodoSelect.click();
    await driver.findElement(By.xpath("//option[contains(text(), 'Periodo 1')]")).click();

    // Selecciona un grado
    const gradoSelect = await driver.findElement(By.css('select[placeholder="Seleccionar Grado"]'));
    await gradoSelect.click();
    await driver.findElement(By.xpath("//option[contains(text(), 'Grado 1')]")).click();

    // Selecciona un grupo
    const grupoSelect = await driver.findElement(By.css('select[placeholder="Seleccionar Grupo"]'));
    await grupoSelect.click();
    await driver.findElement(By.xpath("//option[contains(text(), 'Grupo A')]")).click();

    // Haz clic en el botón para ver las calificaciones
    const viewGradesButton = await driver.findElement(By.xpath("//button[contains(text(), 'Ver Calificaciones del Grupo')]"));
    await viewGradesButton.click();

    // Espera a que el gráfico de barras se cargue
    await driver.wait(until.elementLocated(By.css(".apexcharts-canvas")), 5000);
    console.log("Gráfico de barras cargado correctamente.");

    // Verificar que el gráfico tenga las barras correspondientes al trimestre 1
    const bars = await driver.findElements(By.css(".apexcharts-bar-area"));
    if (bars.length > 0) {
      console.log("Prueba exitosa: Gráfico de estadísticas cargado con barras.");
    } else {
      console.error("Prueba fallida: No se encontraron barras en el gráfico.");
    }

  } catch (error) {
    console.error("Prueba fallida:", error);
  } finally {
    await driver.quit();
  }
}

testEstadisticasGrupalDocent();

