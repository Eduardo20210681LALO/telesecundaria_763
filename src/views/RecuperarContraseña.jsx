import React, { useState } from 'react';
import '../styles/OlvidasteContra.css';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../components/url';

function RecuperarContraseña() {
    const [correo, setCorreo] = useState('');
    const [errorText, setErrorText] = useState('');
    
    const handleTokenRequest = () => {
        axios.post(`${BASE_URL}/enviarCorreo.php`, {
          correo: correo,
        })
        .then(response => {
          if (response.data.status === 'success') {
            setErrorText('Correo electrónico enviado exitosamente');
          } else {
            setErrorText('Error al enviar correo electrónico: ' + response.data.message);
          }
        })
        .catch(error => {
          setErrorText('Error de red: ' + error.message);
          console.log(error.message);
        });
    };      
    
    return (
        <div className="container-olvContra">
            <div className="container-Olvi">
                <img src={logo} alt="Logo de la Empresa" className="company-logo-olvi" />
                <h1>TeleSecundaria 763</h1>
                <h2>¿Olvidaste tu contraseña?</h2>
                <p>¡No te preocupes!, introduce tu correo electrónico para que puedamos mandarte un token de autenticación, si eres tu, da click en acceptar con eso, podras actualizar tu contraseña.</p>

                <form onSubmit={handleTokenRequest}>
                    <div className="input-group">
                        <label htmlFor="correo">Correo Electrónico:</label>

                        {errorText && <p style={{ color: 'red' }}>{errorText}</p>}

                        <input type="email" id="correo" name="correo" placeholder='Introduce tu correo electronico' value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                    </div>
                    <div className="button-group">
                        <Link to='/Login' type="button" className="secondary">Regresar</Link>
                        <button type="submit" className="primary">Continuar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RecuperarContraseña