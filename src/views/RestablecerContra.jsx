import React, { useState, useEffect } from 'react';
import '../styles/OlvidasteContra.css';
import logo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../components/url';

function RestablecerContra({correo}) {
    const navigate = useNavigate();
    const [correo2, setCorreo2] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmarContrasenia, setConfirmarContrasenia] = useState('');
    const [errorText, setErrorText] = useState('');
    const [errorTextConfirmacion, setErrorTextConfirmacion] = useState('');
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
    const [mostrarContrasenia2, setMostrarContrasenia2] = useState(false);

    useEffect(() => {
        if (errorText !== '') {
            const timer = setTimeout(() => {
                setErrorText('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorText]);

    useEffect(() => {
        if (errorTextConfirmacion !== '') {
            const timer = setTimeout(() => {
                setErrorTextConfirmacion('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errorTextConfirmacion]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(contrasenia)) {
            setErrorText('La contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y al menos un caracter especial.');
        } else {
            validarConfirmacionContrasenia();
        }
    };

    const validarConfirmacionContrasenia = () => {
        if (confirmarContrasenia === contrasenia) {
            actualizarContrasenia();
        } else {
            setErrorTextConfirmacion('Las contraseñas no coinciden');
        }
    };

    const actualizarContrasenia = async () => {
        setCorreo2(correo);
        const datos = {
            correo: correo2,
            contrasenia: contrasenia
        };
        try {
            const response = await fetch(`${BASE_URL}/actualizaContraUsuario.php`, {
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
                    navigate('/Login');
                } else {
                    console.log('no')
                }
            } else {
                console.log('peor')
            }
        } catch (error) {
            console.error(error);
            console.log('Error al actualizar los datos...');
        }
    };
    
    const toggleMostrarContrasenia = () => {
        setMostrarContrasenia(!mostrarContrasenia);
    };
    
    const toggleMostrarContrasenia2 = () => {
        setMostrarContrasenia2(!mostrarContrasenia2);
    };

    return (
        <div className="container-olvContra" style={{ textAlign: 'center' }}>
            <div className="container-Olvi">
                <img src={logo} alt="Logo de la Empresa" className="company-logo-olvi" />
                <h1>TeleSecundaria 763</h1>
                <h2>Actualice su contraseña</h2>
                <p>¡Estás a punto de actualizar tu contraseña!</p>
                <p>Introduce una nueva contraseña.</p>

                {errorText && <p style={{ color: 'red' }}>{errorText}</p>}
                {errorTextConfirmacion && <p style={{ color: 'red' }}>{errorTextConfirmacion}</p>}

                <form onSubmit={handleFormSubmit}>
                <div className="input-group" style={{ position: 'relative' }}>
                    <label htmlFor="contrasenia">Nueva contraseña:</label>

                    <input type={mostrarContrasenia ? 'text' : 'password'} id="contrasenia" name="contrasenia" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} required />
                    
                    <button type="button" onClick={toggleMostrarContrasenia} style={{ position: 'absolute', right: '5px', top: '70%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                        {mostrarContrasenia ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                    </button>
                </div>

                    <div className="input-group">
                        <label htmlFor="confirmarContrasenia">Confirmar contraseña:</label>
                        <input type={mostrarContrasenia2 ? 'text' : 'password'} id="confirmarContrasenia" name="confirmarContrasenia" value={confirmarContrasenia} onChange={(e) => setConfirmarContrasenia(e.target.value)} required />
                        
                        <button type="button" onClick={toggleMostrarContrasenia2} style={{ position: 'absolute', right: '5px', top: '70%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                            {mostrarContrasenia2 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                        </button>
                    </div>

                    <div className="button-group" style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to='/OlvidateContra' type="button" className="secondary" style={{ marginRight: '10px' }}>Regresar</Link>
                        <button type="submit" className="btn btn-lg btn-primary" style={{ backgroundColor: 'var(--first-color)', borderColor: '#004b9b', color: '#fff', padding: '10px 20px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}>Actualizar Contraseña</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RestablecerContra;