import React, { useState} from 'react';
import '../../styles/OlvidasteContra.css';
import logotelesecundaria763 from '../../images/logotelesecundaria763.png';
import { Link, useNavigate } from 'react-router-dom';
import Nav2 from '../../components/Nav2';
import { message } from 'antd';

function EnviarCorreoTelefono() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  const VerificarUsuarioActivo = async (e) => {
        e.preventDefault();

        if (!correo || !telefono) {
            message.error('Por favor, completa todos los campos');
            return;
        }

        const datos = {
            correo: correo,
            telefono: telefono
        };
 
        try {
            const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/verificarUsuario.php', {  //  http://localhost/TeleSecundaria763/verificarUsuario.ph
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
                    message.success('Verificación Exitosa')
                    navigate('/ActualizaciónDeContraseña', correo);
                } else {
                    message.error('Datos Incorrectos')
                }
            } else {
                console.log('peor')
                setErrorText('No se pudo completar el registro');
            }
        } catch (error) {
            console.error('Error al intentar registrar:', error);
            setErrorText('Error del servidor');
            navigate('/NotServe');
        }
    };
  
    return (
        <div>
            <Nav2 />
            <div className="container-olvContra" style={{ backgroundColor: '#f7f7f7', minHeight: '110vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="container-Olvi">
                    <img src={logotelesecundaria763} alt="Logo de la Empresa" className="company-logo-olvi" style={{ margin: '0 auto', display: 'block' }} />
                    <h1>Actualización de contraseña</h1>
                    <h2>¿Olvidaste tu contraseña?</h2>
                    <p>¡No te preocupes!, introduce tu correo electrónico y tu número telefónico para el proceso de restablecimiento de contraseña.</p>

                    <form onSubmit={VerificarUsuarioActivo}>
                        <div className="input-group">
                            <label htmlFor="correo">Correo Electrónico:</label>
                            <input className="form-control rounded-md" type="email" id="correo" name="correo" placeholder='Introduce tu correo electronico' value={correo} onChange={(e) => setCorreo(e.target.value)} required style={{ borderRadius: '5px', width: '300px' }} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="telefono">Número Telefónico:</label>
                            <input className="form-control rounded-md" type="text" id="telefono" name="telefono" placeholder='Introduce tu numero de telefono' value={telefono} onChange={(e) => setTelefono(e.target.value)} required style={{ borderRadius: '5px', width: '300px' }} />
                        </div>
                        
                        <div className="button-group">
                            <Link to='/Login' type="button" className="secondary">Atras</Link>
                            <button type="submit" className="btn btn-lg btn-primary btn-block"
                                style={{ backgroundColor: 'var(--first-color)', borderColor: 'transparent', color: '#fff', padding: '10px 20px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}
                                onMouseOver={(event) => { event.target.style.backgroundColor = 'black'; }}
                                onMouseOut={(event) => { event.target.style.backgroundColor = 'var(--first-color)'; }}
                            >
                                Verificar Datos
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default EnviarCorreoTelefono