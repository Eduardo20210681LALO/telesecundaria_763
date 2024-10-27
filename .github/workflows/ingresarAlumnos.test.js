import { Selector } from 'testcafe';

fixture`Ingreso de Alumnos`
    .page`http://localhost:5173/IngresarAlumnos`;

test('Verificar ingreso manual de alumno', async t => {
    // Cambia a ingreso manual
    const radioManual = Selector('input[type="radio"][value="manual"]');
    await t.click(radioManual);

    // Completa los campos de entrada manual
    await t
        .typeText(Selector('#CURP'), 'ABC123456789')
        .typeText(Selector('#APELLIDO PATERNO'), 'García')
        .typeText(Selector('#APELLIDO MATERNO'), 'López')
        .typeText(Selector('#NOMBRE'), 'Juan')
        .typeText(Selector('#FECHA NAC'), '2000-01-01')
        .click(Selector('#SEXO DEL ALUMNO').find('option').withText('MASCULINO'))
        .typeText(Selector('#NOMBRE DEL TUTOR'), 'Carlos García')
        .typeText(Selector('#ESTADO'), 'Hidalgo')
        .typeText(Selector('#MUNICIPIO'), 'Pachuca')
        .typeText(Selector('#LOCALIDAD'), 'Centro')
        .typeText(Selector('#CALLE'), 'Av. Principal')
        .typeText(Selector('#CODIGO POSTAL'), '42000')
        .typeText(Selector('#TELEFONO TUTOR'), '5551234567');

    // Envía el formulario
    const submitButton = Selector('button').withText('Guardar');
    await t.click(submitButton);

    // Verifica el resultado
    const resultMessage = Selector('.ant-message').withText('Datos guardados en la base de datos correctamente.');
    await t.expect(resultMessage.exists).ok('El alumno fue ingresado correctamente.');
});
