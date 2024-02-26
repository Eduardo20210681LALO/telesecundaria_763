import React, { useState } from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

function ActualizarContraseña() {
    const navigate = useNavigate();

    const [correo, setCorreo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        enviarCorreo();
    }

    const enviarCorreo = async () => {
        const datos = {
            correo: correo
        };
        try {
            const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/correoLalo.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            const responseData = await response.json();
            if (responseData.done === true) {
                message.success('¡Éxito! Correo Enviado Exitosamente.');
                message.info('Verifica tu bandeja de entrada de tu correo electronico.');
                navigate('/Home');
            } else {
                message.error('¡Error! No se pudo mandar el Correo, verifique nuevamente.');
            }
        } catch (error) {
            message.error('Error del servidor');
        }
    };
    
    return (
        <div className="container-olvContra">
            <div className="container-Olvi">
                <img src={logo} alt="Logo de la Empresa" className="company-logo-olvi" />
                <h1>TeleSecundaria 763</h1>
                <h2>¿Olvidaste tu contraseña?</h2>
                <p>¡No te preocupes!, introduce tu correo electrónico y revisa tu bandeja de entrada de tu correo electronico.</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="correo">Correo Electrónico:</label>
                        <input
                            type="correo"
                            id="correo"
                            name="correo"
                            placeholder="Introduce tu correo electrónico"
                            onChange={(e) => setCorreo(e.target.value)}
                            value={correo}
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
