import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import BreadCrumb from './BreadCrumbView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import logotelesecundaria763 from '../images/logotelesecundaria763.png';
import ReCAPTCHA from 'react-google-recaptcha';
import Nav2 from '../components/Nav2';
import { Drawer, Menu, Modal, Select, message, Input } from "antd";

import { FiAlignRight } from "react-icons/fi";

import Footer from "../components/Footer";

import {
    LoginOutlined,
    UserAddOutlined,
    TeamOutlined,
    HomeOutlined,
    InfoCircleOutlined,
  } from "@ant-design/icons";



function Registro() {
    const navigate = useNavigate();

    const toggleDrawer = () => setDrawerVisible(!drawerVisible);
    const handleClose = () => setDrawerVisible(false);
    const toggleMostrarOpciones = () => setMostrarOpciones(true);
    const handleCancel = () => setMostrarOpciones(false);
        
    const [drawerVisible, setDrawerVisible] = useState(false);


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
    };
      
    useEffect(() => {
        if (registroExitoso2) {
            message.success('¡Éxito! Cuenta creada');
        }
        if (registroExitoso) {
            message.success('Su cuenta ha sido registrada. Espere a que el administrador le asigne un rol.');
        }
    }, [registroExitoso, registroExitoso2]);

    const { register, handleSubmit, formState: { errors }, setValue, setError, watch } = useForm();
    const password = watch('pass', '');
    const errorMess = [];

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
            message.warning('Por favor, completa el CAPTCHA antes de registrarte.');
            return;
        }
    
        try {
            console.log('Datos a enviar:', datos);  
            const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/registro.php', {   //    http://localhost/TeleSecundaria763/registro.php
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            const responseData = await response.json();
            console.log(responseData, 'esto es lo que devuelve el backend');
            if (response.ok) {
                const { success, message } = responseData;
    
                if (success) {
                    console.log('se metio dentro del if del success');
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
            navigate('/NotServe');
        }
    };

    const VerificarTelefonoExistente = async () => {
        const datos = {
            telefono: telefono
        };
        try {
            const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/telefonoExistente.php', {   //  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                if (responseData.success === true) {
                    message.warning('El teléfono ya está en uso, por favor intente con otro número.'); setTimeout(() => setTelefonoError(null), 3000);
                } else {
                    console.log('ya jaló el teléfono');
                    RegistrarUsuarioValido();
                }
            } else {
                setTelefonoError('Error al intentar verificar si el teléfono está en uso:'); setTimeout(() => setTelefonoError(null), 3000);
            }
        } catch (error) {
            console.log('Error del servidor');
            navigate('/NotServe');
        }
    };

    const verificarCorreoExistente = async () => {
        const datos = {
            email: email
        };
        try {
            const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/correoExistente.php', {   //    http://localhost/TeleSecundaria763/correoExistente.php
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                if (responseData.success === true) {
                    setCorreoError('El correo ya está en uso, intente con otro correo por favor'); setTimeout(() => setCorreoError(null), 3000);
                } else {
                    console.log('ya jaló el correo existente');
                    VerificarTelefonoExistente();
                }
            } else {
                setCorreoError('Datos incorrectos'); setTimeout(() => setCorreoError(null), 3000);
            }
        } catch (error) {
            console.log('Error del servidor');
            navigate('/NotServe');
        }
    };

    const ValidarUsuario = (e) => {
        // Permitir solo letras, números, y comas, no permitir espacios ni caracteres especiales
        const texto = e.target.value.replace(/[^a-zA-ZñÑáéíóúüÁÉÍÓÚÜ0-9,]/g, '');
        setUsuario(texto);
    };
    
    
    const ValidarTextos = (content, e) => {
        // Permitir letras, espacios y acentos, no permitir números ni caracteres especiales
        const texto = e.target.value.replace(/[^a-zA-ZñÑáéíóúüÁÉÍÓÚÜ\s]/g, '');
        setValue(content, texto);
    };

    const Validaciones_Contras = (value) => {
        const contenerMacusculas = /[A-Z]/.test(value);
        const contenerMinusculas = /[a-z]/.test(value);
        const contenerNumeros = /\d/.test(value);
        const contenerCaracteresEsp = /[!@#$*]/.test(value);
        
        if (!contenerMacusculas) errorMess.push('Debe contener al menos una letra mayúscula.');
        if (!contenerMinusculas) errorMess.push('Debe contener al menos una letra minúscula.');
        if (!contenerNumeros) errorMess.push('Debe contener al menos un número.');
        if (!contenerCaracteresEsp) errorMess.push('Debe contener al menos uno de los siguientes caracteres especiales: !, @, #, $, *.');
        
        return errorMess.length === 0 ? '' : errorMess.join(' ');
    };

    const validarTelefono = (e) => {
        const inputValue = e.target.value.replace(/[^0-9]/g, '');
        setValue('telefono', inputValue);
    };

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
                                    <Link to="/TerminosCondiciones" style={{ color: 'blue' }}>términos y condiciones</Link>
                                    {' '}y la{' '}
                                    <Link to="/TerminosCookies" style={{ color: 'blue' }}>política de cookies</Link>
                                </>
                            }
                            onChange={handleCheckboxChange} checked={aceptaTodo}
                        />
                    </div>
                </Form.Group>
            </div>
        );
    }
    
    const onSubmit = handleSubmit(async (value) => {
        const errorPass = Validaciones_Contras(value.pass);
        if (errorPass) {
            setError('pass', { type: 'manual', message: errorPass });
            return;
        }
        verificarCorreoExistente();
    }); 

    return (
        <div className="min-h-screen flex flex-col">
    
          {/* Nav Superior */}
          <div className="w-full h-[60px] bg-white border-b border-gray-200 flex items-center px-4 fixed top-0 left-0 z-50">
            <button onClick={toggleDrawer} className="border-none bg-none cursor-pointer" aria-label="Abrir menú">
              <FiAlignRight className="text-2xl" />
            </button>
            <img src={logotelesecundaria763} alt="Logo" className="h-8 md:h-10 ml-4" />
          </div>
    
          {/* Drawer */}
          <Drawer title={<h2 className="text-2xl font-bold">Menú</h2>} placement="left" onClose={handleClose} open={drawerVisible} bodyStyle={{ padding: 0 }}>
            <Menu mode="inline" defaultSelectedKeys={["1"]} className="h-full">
              <Menu.Item key="1" icon={<HomeOutlined />} className="text-lg">
                <Link to="/">Inicio</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<LoginOutlined />} className="text-lg">
                <Link to="/login">Inicio de sesión</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UserAddOutlined />} className="text-lg">
                <Link to="/registro">Registro</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<TeamOutlined />} className="text-lg">
                <Link to="/QuienesSomos">Quiénes Somos</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<InfoCircleOutlined />} className="text-lg">
                <Link to="/contacto">Contacto</Link>
              </Menu.Item>
            </Menu>
          </Drawer>
    
          {/* Contenedor Principal */}
          <div className="flex-grow flex items-center justify-center px-4 py-6 mt-[60px]">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">

              <form onSubmit={onSubmit} className="p-3">
             
                <div className="datosReg container">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-4">Bienvenido a Registro</h1>
                    <h4 className="mb-4 text-center text-magenta">Ingrese los datos correspondientes</h4>

                    <div className="row">
                    {/* Nombre */}
                    <div className="col-12 col-md-6 mb-4">
                        <label htmlFor="nombre" className="form-label"><b>Nombre(s):</b></label>
                        <input type="text" className="form-control rounded" placeholder="Ingrese su nombre completo"
                        {...register('nombre', { required: 'El nombre es requerido.', minLength: { value: 3, message: 'El Nombre debe ser mayor a 3 caracteres.' }, maxLength: { value: 20, message: 'El Nombre debe ser menor a 20 caracteres.' }, })}
                        onChange={(e) => { ValidarTextos('nombre', e); setNombre(e.target.value); }} />
                        {errors.nombre && <p className="text-danger">{errors.nombre.message}</p>}
                    </div>

                    {/* Apellido Paterno */}
                    <div className="col-12 col-md-6 mb-4">
                        <label htmlFor="app" className="form-label"><b>Apellido Paterno:</b></label>
                        <input type="text" className="form-control rounded" placeholder="Ingrese su apellido Paterno"
                        {...register('app', { required: 'El Apellido Paterno es requerido.', minLength: { value: 3, message: 'El Apellido Paterno debe ser mayor a 3 caracteres.' }, maxLength: { value: 20, message: 'El Apellido Paterno debe ser menor a 20 caracteres.' }, })}
                        onChange={(e) => { ValidarTextos('app', e); setApellidoPaterno(e.target.value); }} />
                        {errors.app && <p className="text-danger">{errors.app.message}</p>}
                    </div>

                    {/* Apellido Materno */}
                    <div className="col-12 col-md-6 mb-4">
                        <label htmlFor="apm" className="form-label"><b>Apellido Materno:</b></label>
                        <input type="text" className="form-control rounded" placeholder="Ingrese su apellido Materno"
                        {...register('apm', { required: 'El Apellido Materno es requerido.', minLength: { value: 3, message: 'El Apellido Materno debe ser mayor a 3 caracteres.' }, maxLength: { value: 20, message: 'El Apellido Materno debe ser menor a 20 caracteres.' }, })}
                        onChange={(e) => { ValidarTextos('apm', e); setApellidoMaterno(e.target.value); }} />
                        {errors.apm && <p className="text-danger">{errors.apm.message}</p>}
                    </div>

                    {/* Usuario */}
                    <div className="col-12 col-md-6 mb-4">
                        <label htmlFor="usuario" className="form-label"><b>Usuario:</b></label>
                        <input type="text" className="form-control rounded" placeholder="Ingrese un nombre de usuario"
                        {...register('usuario', { required: 'El nombre de usuario es requerido.', minLength: { value: 8, message: 'El Nombre de usuario debe ser mayor a 8 caracteres.' }, maxLength: { value: 30, message: 'El Nombre de usuario debe ser menor a 30 caracteres.' } })}
                        onChange={ValidarUsuario} />
                        {errors.usuario && <p className="text-danger">{errors.usuario.message}</p>}
                    </div>

                    {/* Correo Electrónico */}
                    <div className="col-12 col-md-6 mb-4">
                        <label htmlFor="email" className="form-label"><b>Correo Electrónico:</b></label>
                        {correoError && <p style={{ color: 'red' }}>{correoError}</p>}
                        <input type="email" className="form-control rounded" placeholder="Ingrese un Correo Electrónico"
                        {...register('email', { required: 'El Correo Electrónico es requerido.', minLength: { value: 3, message: 'El Correo Electrónico debe ser mayor a 3 caracteres.' }, maxLength: { value: 300, message: 'El Correo Electrónico debe ser menor a 300 caracteres.' }, })}
                        onChange={(e) => { setEmail(e.target.value); }} />
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                    </div>

                    {/* Teléfono */}
                    <div className="col-12 col-md-6 mb-4">
                        <label htmlFor="telefono" className="form-label"><b>Teléfono:</b></label>
                        {telefonoError && <p style={{ color: 'red' }}>{telefonoError}</p>}
                        <input type="tel" id='phone' className="form-control rounded" placeholder="Ingrese un número de Teléfono"
                        {...register('telefono', { required: 'El teléfono es requerido.', minLength: { value: 3, message: 'El teléfono debe ser mayor a 3 caracteres.' }, pattern: { value: /^[0-9]+$/, message: 'Ingresa solo números en el campo de teléfono.' }, maxLength: { value: 16, message: 'El teléfono debe ser menor de 16 caracteres.' }, })}
                        onChange={(e) => { validarTelefono(e); setTelefono(e.target.value); }} />
                        {errors.telefono && <p className="text-danger">{errors.telefono.message}</p>}
                    </div>

                    {/* Contraseña */}
                    <div className="col-12 col-md-6 mb-4" style={{ position: 'relative' }}>
                        <label htmlFor="pass" className="form-label"><b>Contraseña:</b></label>
                        <div style={{ position: 'relative' }}>
                        <input type={mostrarContrasenia ? 'text' : 'password'} className="form-control rounded" placeholder="Ingrese una contraseña"
                            {...register('pass', { required: 'La contraseña es requerida.', minLength: { value: 8, message: 'La contraseña debe ser mayor a 7 caracteres.' }, maxLength: { value: 20, message: 'La contraseña debe ser menor a 20 caracteres.' }, })}
                            onChange={(e) => { setContrasenia(e.target.value); const erro = Validaciones_Contras(e.target.value); setError('pass', { type: 'manual', message: erro }); }} />
                        <button type="button" onClick={toggleMostrarContrasenia} 
                            style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                            {mostrarContrasenia ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                        </button>
                        </div>
                        {errors.pass && <p className="text-danger">{errors.pass.message}</p>}
                    </div>

                    {/* Confirmar Contraseña */}
                    <div className="col-12 col-md-6 mb-4" style={{ position: 'relative' }}>
                        <label htmlFor="passConf" className="form-label"><b>Confirmar Contraseña:</b></label>
                        <div style={{ position: 'relative' }}>
                        <input type={mostrarContrasenia2 ? 'text' : 'password'} className="form-control rounded" placeholder="Confirma la contraseña"
                            {...register('passConf', { required: 'La confirmación de contraseña es requerida.', validate: (value) => value === password || 'La contraseña no coincide', })}
                            onChange={(e) => { const err = e.target.value === password ? '' : 'La contraseña no coincide'; setError('passConf', { type: 'manual', message: err }); }} />
                        <button type="button" onClick={toggleMostrarContrasenia2} 
                            style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                            {mostrarContrasenia2 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                        </button>
                        </div>
                        {errors.passConf && <p className="text-danger">{errors.passConf.message}</p>}
                    </div>

                    {/* Botón de envío */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-[#800000] hover:bg-black text-white font-bold h-11 rounded transition duration-300"
                            style={{
                                backgroundColor: '#800000',
                                borderColor: 'transparent',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}
                                onMouseOver={(event) => {
                                event.currentTarget.style.backgroundColor = 'black';
                            }}
                                onMouseOut={(event) => {
                                event.currentTarget.style.backgroundColor = '#800000';
                            }}
                        >
                            Crear Cuenta
                        </button>
                    </div>


                    {/* Link a Login */}
                    <div className="col-12 text-center">
                        <p className="mt-1">¿Ya tienes una cuenta? <Link to="/Login" style={{ color: '#7d0430', textDecoration: 'none' }}><b>Login</b></Link></p>
                    </div>
                    </div>
                </div>
              </form>



            </div>
          </div>
          {/* Footer */}
          <Footer />
        </div>
      );
    
}

export default Registro;