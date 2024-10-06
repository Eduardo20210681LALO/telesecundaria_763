import { Selector, fixture } from "testcafe";

fixture `App test`
    .page `https://telesecundaria763.host8b.me/login`;

    test('Mostrar y ocultar contraseña', async t => {
        await t
            .click('#inputPassword + button') // Hacer clic en el botón para mostrar la contraseña
            .expect(Selector('#inputPassword').getAttribute('type')).eql('text') // Verificar que el tipo de entrada sea 'text'
            .wait(1000) // Pausa de 1 segundo para observar el cambio
    
            .click('#inputPassword + button') // Hacer clic en el botón para ocultar la contraseña
            .expect(Selector('#inputPassword').getAttribute('type')).eql('password') // Verificar que el tipo de entrada vuelva a ser 'password'
            .wait(1000); // Pausa de 1 segundo para observar el cambio
    });
 
