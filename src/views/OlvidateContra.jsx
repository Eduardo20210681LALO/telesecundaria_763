import React, { useState } from 'react';
import '../styles/OlvidasteContra.css';
import logo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import BreadCrumb from './BreadCrumbView';
import { BASE_URL } from '../components/url';

function OlvidateContra() {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [errorText, setErrorText] = useState('');
    
    const VerificarUsuarioActivo = async (e) => {
        e.preventDefault()
        const datos = {
            correo: correo,
            telefono: telefono
        };
        console.log(datos)

        try {
            const response = await fetch(`${BASE_URL}/verificarUsuario.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData)
                if (responseData.success === true) {
                    console.log('si')
                    navigate('/RestablecerContra', correo);
                } else {
                    setErrorText('Datos incorrectos');
                }
            } else {
                console.log('peor')
                setErrorText('No se pudo completar el registro');
            }
        } catch (error) {
            console.error('Error al intentar registrar:', error);
            setErrorText('Error del servidor');
        }
    };
    
    return (
        <div className="container-olvContra" style={{ backgroundColor: '#f7f7f7', minHeight: '110vh' }}>
            <div className="container-Olvi">
                <img src={logo} alt="Logo de la Empresa" className="company-logo-olvi" />
                <h1>TeleSecundaria 763</h1>
                <h2>¿Olvidaste tu contraseña?</h2>
                <p>¡No te preocupes!, introduce tu correo electrónico y tu número telefónico asociados con la cuenta para iniciar el proceso de restablecimiento de contraseña.</p>
                {errorText && <p style={{ color: 'red' }}>{errorText}</p>}

                <form onSubmit={VerificarUsuarioActivo}>
                    <div className="input-group">
                        <label htmlFor="correo">Correo Electrónico:</label>
                        <input type="correo" id="correo" name="correo" placeholder='Introduce tu correo electronico' value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="telefono">Número Telefonico:</label>
                        <input type="text" id="telefono" name="telefono" placeholder='Introduce tu numero de telefono' value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                    </div>
                    
                    <div className="button-group">
                        <Link to='/Login' type="button" className="secondary">Regresar</Link>
                        <button type="submit" className="primary">Continuar</button>
                    </div>
                </form>
                <BreadCrumb/>
            </div>
        </div>
    );
}

export default OlvidateContra;