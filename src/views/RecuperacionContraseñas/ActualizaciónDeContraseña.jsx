import React, { useState, useEffect } from 'react'
import Nav2 from '../../components/Nav2'
import logotelesecundaria763 from '../../images/logotelesecundaria763.png';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { message } from 'antd';

function ActualizaciónDeContraseña() {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
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

    const Validaciones_Contras = (value) => {
        const errorMess = [];
        const contenerMayusculas = /[A-Z]/.test(value);
        const contenerMinusculas = /[a-z]/.test(value);
        const contenerNumeros = /\d/.test(value);
        const contenerCaracteresEsp = /[!@#$*]/.test(value);
        
        if (!contenerMayusculas) errorMess.push('Debe contener al menos una letra mayúscula.');
        if (!contenerMinusculas) errorMess.push('Debe contener al menos una letra minúscula.');
        if (!contenerNumeros) errorMess.push('Debe contener al menos un número.');
        if (!contenerCaracteresEsp) errorMess.push('Debe contener al menos uno de los siguientes caracteres especiales: !, @, #, $, *.');
        
        return errorMess.length === 0 ? '' : errorMess.join(' ');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (correo === '') {
            message.warning('Por favor, ingrese su correo electrónico.');
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
        const datos = {
            correo: correo,
            contrasenia: contrasenia
        };
        try {
            console.log(datos);
            const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/actualizaContraUsuario.php', {//http://localhost/TeleSecundaria763/actualizaContraUsuario.php
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            const { success } = await response.json();
            if (success === true) {
                message.success('Cambio de contraseña Exitoso.')
                navigate('/Login');
            } else {
                message.error('Error al actualizar la contraseña')
            }
        } catch (error) {
            console.log('Error al actualizar los datos...');
            navigate('/NotServe');
        }
    };

    const toggleMostrarContrasenia = () => {
        setMostrarContrasenia(!mostrarContrasenia);
    };

    const toggleMostrarContrasenia2 = () => {
        setMostrarContrasenia2(!mostrarContrasenia2);
    };

    return (
        <div>
        <Nav2/>
        <div className="container-olvContra" style={{ backgroundColor: '#f7f7f7', minHeight: '110vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container-Olvi">
            <img src={logotelesecundaria763} alt="Logo de la Empresa" className="company-logo-olvi" style={{ margin: '0 auto', display: 'block' }} />
            <h1>TeleSecundaria 763</h1>
            <h2>Actualice su contraseña</h2>
            <p>Introduce una nueva contraseña segura.</p>

            {errorText && <p style={{ color: 'red' }}>{errorText}</p>}
            {errorTextConfirmacion && <p style={{ color: 'red' }}>{errorTextConfirmacion}</p>}

            <form onSubmit={handleFormSubmit}>
                <div className="input-group" style={{ position: 'relative' }}>
                    <label htmlFor="correo">Correo electronico:</label>
                    <input type="text" id="correo" name="correo" value={correo}
                        onChange={(e) => { setCorreo(e.target.value) }} required
                        style={{ borderRadius: '5px' }} placeholder='Ingrese su correo como verificación'/>
                </div>

                <div className="input-group" style={{ position: 'relative' }}>
                    <label htmlFor="contrasenia">Nueva contraseña:</label>
                    <input type={mostrarContrasenia ? 'text' : 'password'} id="contrasenia" name="contrasenia" value={contrasenia}
                        onChange={(e) => { setContrasenia(e.target.value); const erro = Validaciones_Contras(e.target.value); setErrorText(erro); }} required
                        style={{ borderRadius: '5px' }} placeholder='Ingrese una nueva contraseña'/>
                    <button type="button" onClick={toggleMostrarContrasenia}
                        style={{ position: 'absolute', right: '5px', top: '70%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                        {mostrarContrasenia ? (<FontAwesomeIcon icon={faEyeSlash} />) : (<FontAwesomeIcon icon={faEye} />)}
                    </button>
                </div>

                <div className="input-group">
                    <label htmlFor="confirmarContrasenia">Confirmar contraseña:</label>
                    <input type={mostrarContrasenia2 ? 'text' : 'password'} id="confirmarContrasenia" name="confirmarContrasenia" value={confirmarContrasenia}
                        onChange={(e) => { setConfirmarContrasenia(e.target.value); setErrorTextConfirmacion(''); }} required
                        style={{ borderRadius: '5px' }} placeholder='Confirma la contraseña'/>
                    <button type="button" onClick={toggleMostrarContrasenia2}
                        style={{ position: 'absolute', right: '5px', top: '70%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                        {mostrarContrasenia2 ? (<FontAwesomeIcon icon={faEyeSlash} />) : (<FontAwesomeIcon icon={faEye} />)}
                    </button>
                </div>

                <div className="button-group" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to='/Login' type="button" className="secondary" style={{ marginRight: '10px' }}>Atras</Link>
                    <button type="submit" className="btn btn-lg btn-primary btn-block" 
                    style={{ backgroundColor: 'var(--first-color)', borderColor: 'transparent', color: '#fff', padding: '10px 20px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}
                    onMouseOver={(event) => { event.target.style.backgroundColor = 'black';}}
                    onMouseOut={(event) => { event.target.style.backgroundColor = 'var(--first-color)';}}
                    >
                    Actualizar Contraseña
                    </button>
                </div>
            </form>

            </div>
        </div>
        </div>
    )
}

export default ActualizaciónDeContraseña