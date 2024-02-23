import React, { useState } from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../components/url';

function ActualizarContraseña() {
  const [correo, setCorreo] = useState('');

  const enviarCorreo = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/enviarCorreo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ correo })
        });
        
        if (!response.ok) {
            throw new Error("Failed to fetch - " + response.statusText);
        }
        
        const data = await response.json();
        // Manejar la respuesta del servidor si es necesario
    } catch(error) {
        console.error(error);
        alert("Error al enviar la solicitud: " + error.message);
    }
  }

  return (
      <div className="container-olvContra">
          <div className="container-Olvi">
              <img src={logo} alt="Logo de la Empresa" className="company-logo-olvi" />
              <h1>TeleSecundaria 763</h1>
              <h2>¿Olvidaste tu contraseña?</h2>
              <p>¡No te preocupes!, introduce tu correo electrónico y te enviaremos un token de verificación, por favor verifica...</p>

              <form onSubmit={(e) => {
                  e.preventDefault();
                  enviarCorreo(); // Llamar a la función enviarCorreo
              }}>
                  <div className="input-group">
                      <label htmlFor="correo">Correo Electrónico:</label>
                      <input type="correo" id="correo" name="correo" placeholder="Introduce tu correo electrónico"
                          onChange={(e) => setCorreo(e.target.value)} value={correo}
                      />
                  </div>

                  <div className="button-group">
                      <Link to="/Login" type="button" className="secondary">
                          Regresar
                      </Link>
                      <button type="submit" className="primary">
                          Continuar
                      </button>
                  </div>
              </form>
          </div>
      </div>
  );
}

export default ActualizarContraseña;
