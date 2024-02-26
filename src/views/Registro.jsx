import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import BreadCrumb from './BreadCrumbView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../components/url';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { message } from 'antd';
import logo from '../images/logo.png';
import ReCAPTCHA from 'react-google-recaptcha';

const Captcha = ({ onCaptchaVerify }) => {
    const handleCaptchaChange = () => {
        onCaptchaVerify(true)
    };
    return (
        <div className="d-flex justify-content-center align-items-center vh-10">
            <div className="max-w-md p-6 bg-white rounded-md shadow-md">
                <h6 className="text-1xl font-bold mb-4 text-black">¡Completa el Captcha como verificación!</h6>
                <ReCAPTCHA
                    sitekey={'6Lc1ZHUpAAAAAJ7n4rCpSyhLD2NpMmbo4Q_qPNuh'}
                    onChange={handleCaptchaChange}
                    className="mb-4"
                />
            </div>
        </div>
    );
};

function Registro() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contrasenia, setContrasenia] = useState('');

    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
    const [mostrarContrasenia2, setMostrarContrasenia2] = useState(false);
    const [correoError, setCorreoError] = useState('');
    const [telefonoError, setTelefonoError] = useState('');
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const [registroExitoso2, setRegistroExitoso2] = useState(false);
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [aceptaTodo, setAceptaTodo] = useState(false);

    const handleCaptchaVerify = (verified) => {
        setIsCaptchaVerified(verified);
    }
      
    useEffect(() => {
        if (registroExitoso2) {
          message.success('¡Éxito! Cuenta creada');
        }
        if (registroExitoso) {
          message.success('Su cuenta ha sido registrada. Espere a que el administrador le asigne un rol.');
        }
    }, [registroExitoso, registroExitoso2]);

    const {register, handleSubmit, formState: {errors}, setValue, setError, watch } = useForm()
    const password = watch ('pass', '')
    const errorMess = []

    const toggleMostrarContrasenia = () => {
        setMostrarContrasenia(!mostrarContrasenia);
    };

    const toggleMostrarContrasenia2 = () => {
        setMostrarContrasenia2(!mostrarContrasenia2);
    };

    const RegistrarUsuarioValido = async () => {
        const datos = {
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            usuario: usuario,
            email: email,
            telefono: telefono,
            contrasenia: contrasenia
        };

        if (!aceptaTodo) {
            message.warning('Por favor, Acepta los Términos Y Condiciones antes de registrarte.');
            return;
        }

        if (!isCaptchaVerified) {
            message.warning('Por favor, completa el CAPTCHA antes de logearse.');
            return;
        }

        try {
            const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/registro.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            const responseData = await response.json();
        
            if (response.ok) {
                const { success, message } = responseData;
                if (success) {
                    Cookies.set('token', responseData.token, { expires: 7 });
                    
                    setRegistroExitoso2(true);
                    setRegistroExitoso(true);

                    setTimeout(() => {
                        navigate('/Login');
                    }, 5000);
                } else {
                    alert('Error', message);
                }
            } else {
                alert('Error', 'No se pudo completar el registro');
            }
        } catch (error) {
            console.error('Error al intentar registrar:', error);
            alert('Error del servidor');
        }
    };

    const VerificarTelefonoExistente = async (e) => {
        const datos = { 
            telefono: telefono
        };
        try {
            const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/telefonoExistente.php', {
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
                    message.warning('El telefono ya esta en uso, por favor intente con otro numero.'); setTimeout(() => setTelefonoError(null), 3000);
                } else {
                    RegistrarUsuarioValido();
                }
            } else {
                setTelefonoError('Error al intentar verificar si el telefono esta en uso:'); setTimeout(() => setTelefonoError(null), 3000);
            }
        } catch (error) {
            setTelefonoError('Error al intentar verificar el telefono:'); setTimeout(() => setTelefonoError(null), 3000);
        }
    };

    const verificarCorreoExistente = async (e) => {
        const datos = {
            email: email
        };
        try {
            const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/correoExistente.php', {
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
                    setCorreoError('El correo ya esta en uso, intente con otro correo por favor'); setTimeout(() => setCorreoError(null), 3000);
                } else {
                    VerificarTelefonoExistente();
                }
            } else {
                setCorreoError('Datos incorrectos'); setTimeout(() => setCorreoError(null), 3000);
            }
        } catch (error) {
            setCorreoError('Error al intentar verificar el correo:'); setTimeout(() => setCorreoError(null), 3000);
        }
    };

    function validCorreo(validacion) {
        console.log(validacion);
        message.loading('Verificando correo...');

        if (validacion === 'DELIVERABLE') {
            message.success('El correo es válido');
            verificarCorreoExistente();
        } else if (validacion === 'UNDELIVERABLE') {
            message.error('El correo no es válido');
        }
    }

    const consultarCorreoApi = async (email) => {
        const ApiKey = '289d98b1b45f4a4b8ce5a79510444552';
        try {
            const response = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${ApiKey}&email=${email}`);
            const data = await response.json();
            validCorreo(data.deliverability);
        } catch (error) {
            console.error('Error al consultar el servicio de validación de correo:', error);
        }
    };

    const ValidarTextos = (content,e) => {
        const texto = e.target.value.replace(/[^a-zA-ZñÑáéíóúüÁÉÍÓÚÜ\s]/g, '');
        setValue(content, texto);
    }

    const Validaciones_Contras = (value) => {
        const contenerMacusculas = /[A-Z]/.test(value)
        const contenerMinusculas = /[a-z]/.test(value)
        const contenerNumeros = /\d/.test(value)
        const contenerCaracteresEsp = /[!@#$*]/.test(value)
        
        if (!contenerMacusculas) errorMess.push('Debe contener al menos una letra mayúscula.')
        if (!contenerMinusculas) errorMess.push('Debe contener al menos una letra minúscula.')
        if (!contenerNumeros) errorMess.push('Debe contener al menos un número.')
        if (!contenerCaracteresEsp) errorMess.push('Debe contener al menos uno de los siguientes caracteres especiales: !, @, #, $, *.')
        
        return errorMess.length === 0 ? '' : errorMess.join(' ');
    };

    const validarTelefono =  (e) => {
        const inputValue = e.target.value.replace(/[^0-9]/g, '')
        setValue('telefono', inputValue)
    }

    function Registro() {
        const handleCheckboxChange = () => { setAceptaTodo(!aceptaTodo); };
        return (
            <div className="text-center"> {/* Contenedor para centrar los elementos */}
                <Form.Group controlId="terminos-politica">
                    <div className="d-inline-block text-center"> {/* Contenedor para el checkbox y el texto */}
                        <Form.Check
                            type="checkbox"
                            label={
                                <>
                                    Acepto los{' '}
                                    <Link to="/TerminosCondiciones">términos y condiciones</Link>
                                    {' '}y la{' '}
                                    <Link to="/TerminosCookies">política de cookies</Link>
                                </>
                            }
                            onChange={handleCheckboxChange}
                            checked={aceptaTodo}
                        />
                    </div>
                </Form.Group>
            </div>
        );
    }
    

    const onSubmit = handleSubmit(async (value, e) =>{
        const errorPass = Validaciones_Contras(value.pass)
        if (errorPass) {
          setError('pass', { type: 'manual', message: errorPass});2
          return
        }
        consultarCorreoApi(value.email);
    
    });

    return (
        <div className="login-container d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f7f7f7', height: '155vh', flexDirection: 'column' }}>
        <div className="login-card p-4" style={{ width: '100%', maxWidth: '50%', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', backgroundColor: '#fff', marginBottom: '20px' }}>
        <img src={logo} alt="Logo de la Empresa" className="company-logo-olvi" style={{ backgroundColor: '#f7f7f7', height: '10vh', width:'12vh', marginBottom: '-70px' }} />


          <form onSubmit={onSubmit} className="form" style={{ marginTop: '10px' }}>
                    <div className="datosReg container">
                        <h1 className="form-signin-heading mb-3 text-center" style={{ color: '#333', fontWeight: 'bold' }}>Bienvenido a Registro</h1>
                        <h3 className="form-signin-heading mb-4 text-center" style={{ color: '#333', fontWeight: 'bold' }}>Ingrese los datos correspondientes</h3>

                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <h4 className="titulo">Nombre(s)</h4>
                                <input type="text" className="form-control" placeholder="Ingrese nombre de usuario"
                                    {...register('nombre', { required: 'El nombre es requerido.',
                                    minLength: { value: 3, message: 'El Nombre debe ser mayor a 3 caracteres.', }, 
                                    maxLength: { value: 20, message: 'El Nombre debe ser menor a 20 caracteres.', },})}
                                    onChange={(e) => { ValidarTextos('nombre', e); setNombre(e.target.value); }}/>
                                {errors.nombre && <p className="text-danger">{errors.nombre.message}</p>}
                            </div>

                            <div className="col-md-6 mb-4">
                                <h4 className="titulo">Apellido Paterno</h4>
                                <input type="text" className="form-control" placeholder="Ingrese el apellido Paterno"
                                    {...register('app', { required: 'El Apellido Paterno es requerido.',
                                        minLength: { value: 3, message: 'El Apellido Paterno debe ser mayor a 3 caracteres.', },
                                        maxLength: { value: 20, message: 'El Apellido Paterno debe ser menor a 20 caracteres.', },
                                    })}
                                    onChange={(e) => { ValidarTextos('app', e); setApellidoPaterno(e.target.value); }} />
                                {errors.app && <p className="text-danger">{errors.app.message}</p>}
                            </div>

                            <div className="col-md-6 mb-4">
                                <h4 className="titulo">Apellido Materno</h4>
                                <input type="text" className="form-control" placeholder="Ingrese el apellido Materno"
                                    {...register('apm', {
                                        required: 'El Apellido Materno es requerido.',
                                        minLength: { value: 3, message: 'El Apellido Materno debe ser mayor a 3 caracteres.', },
                                        maxLength: { value: 20, message: 'El Apellido Materno debe ser menor a 20 caracteres.', },
                                    })}
                                    onChange={(e) => { ValidarTextos('apm', e); setApellidoMaterno(e.target.value); }}/>
                                {errors.apm && <p className="text-danger">{errors.apm.message}</p>}
                            </div>

                            <div className="col-md-6 mb-4">
                                <h4 className="titulo">Usuario</h4>
                                <input type="text" className="form-control" placeholder="Ingrese un nombre de usuario"
                                    {...register('usuario', { 
                                        required: 'El nombre de usuario es requerido.',
                                        minLength: { value: 8, message: 'El Nombre de usuario debe ser mayor a 8 caracteres.' },
                                        pattern: { value: /^[a-zA-Z0-9]+$/, message: 'Ingresa solo letras y números.' },
                                        maxLength: { value: 30, message: 'El Nombre de usuario debe ser menor a 30 caracteres.' }
                                    })}
                                    onChange={(e) => { ValidarTextos('usuario', e); setUsuario(e.target.value); }}/>
                                {errors.usuario && <p className="text-danger">{errors.usuario.message}</p>}
                            </div>


                            <div className="col-md-6 mb-4">
                                <h4 className="titulo">Correo Electronico</h4>
                                {correoError && <p style={{ color: 'red' }}>{correoError}</p>}
                                <input type="email" className="form-control" placeholder="Correo Electrónico"
                                    {...register('email', {
                                        required: 'El Correo Electrónico es requerido.',
                                        minLength: { value: 3, message: 'El Correo Electrónico debe ser mayor a 3 caracteres.', },
                                        maxLength: { value: 300, message: 'El Correo Electrónico debe ser menor a 300 caracteres.', },
                                    })}
                                    onChange={(e) => { setEmail(e.target.value); }}/>
                                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                            </div>

                            <div className="col-md-6 mb-4">
                                {telefonoError && <p style={{ color: 'red' }}>{telefonoError}</p>}
                                <h4 className="titulo">Telefono</h4>
                                <input type="tel" id='phone' className="form-control" placeholder="Ingrese numero de Telefono"
                                    {...register('telefono', {
                                        required: 'El teléfono es requerido.',
                                        minLength: { value: 3, message: 'El teléfono debe ser mayor a 3 caracteres.', },
                                        pattern: {value: /^[0-9]+$/, message: 'Ingresa solo números en el campo de teléfono.', },
                                        maxLength: { value: 16, message: 'El teléfono debe ser menor de 16 caracteres.',},
                                    })}
                                    onChange={(e) => { validarTelefono(e); setTelefono(e.target.value); }} />
                                {errors.telefono && <p className="text-danger">{errors.telefono.message}</p>}
                            </div>

                            <div className="col-md-6 mb-4" style={{ position: 'relative' }}>
                                <h4 className="titulo">Contraseña</h4>
                                <div style={{ position: 'relative' }}>
                                    <input type={mostrarContrasenia ? 'text' : 'password'} className="form-control" placeholder="Contraseña"
                                        {...register('pass', {
                                            required: 'La contraseña es requerida.',
                                            minLength: { value: 8, message: 'La contraseña debe ser mayor a 7 caracteres.', },
                                            maxLength: { value: 20, message: 'La contraseña debe ser menor a 20 caracteres.', },
                                        })}
                                        onChange={(e) => { setContrasenia(e.target.value); const erro = Validaciones_Contras(e.target.value); setError('pass', { type: 'manual', message: erro, });}}
                                    />
                                    <button type="button" onClick={toggleMostrarContrasenia} 
                                        style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} >
                                        {mostrarContrasenia ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                    </button>
                                </div>
                                {errors.pass && <p className="text-danger">{errors.pass.message}</p>}
                            </div>

                            <div className="col-md-6 mb-4" style={{ position: 'relative' }}>
                                <h4 className="titulo">Confirmar contraseña</h4>
                                <div style={{ position: 'relative' }}>
                                    <input type={mostrarContrasenia2 ? 'text' : 'password'} className="form-control" placeholder="Confirmar contraseña"
                                        {...register('passConf', { required: 'La confirmación de contraseña es requerida.', validate: (value) => value === password || 'La contraseña no coincide',})}
                                        onChange={(e) => { const err = e.target.value === password ? '' : 'La contraseña no coincide'; setError('passConf', { type: 'manual', message: err, });}}
                                    />
                                    <button type="button" onClick={toggleMostrarContrasenia2} 
                                        style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                                        {mostrarContrasenia2 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                    </button>
                                </div>
                                {errors.passConf && <p className="text-danger">{errors.passConf.message}</p>}
                            </div>

                            <Registro />
                            <Captcha onCaptchaVerify={handleCaptchaVerify} />

                            <div className="col-12 text-center mb-4">
                                <input type="submit" value="Crear cuenta" className="btn btn-primary"
                                    style={{ backgroundColor: 'var(--first-color)', borderColor: '#004b9b', padding: '15px 25px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}
                                />
                            </div>
    
                            <div className="col-12 text-center">
                                <p className="mt-1">¿Ya tienes una cuenta? <Link to="/Login" style={{ color: '#7d0430', textDecoration: 'none' }}>Ir a login</Link></p>
                            </div>
                        </div>
                    </div>
                </form>
                <BreadCrumb />
                </div>
            </div>
    )
}

export default Registro