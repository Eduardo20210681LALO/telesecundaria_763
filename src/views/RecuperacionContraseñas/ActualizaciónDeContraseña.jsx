import React, { useState, useEffect } from 'react'
import Nav2 from '../../components/Nav2'
import logotelesecundaria763 from '../../images/logotelesecundaria763.png';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { LoginOutlined, UserAddOutlined, TeamOutlined, HomeOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer.jsx";
import { FiAlignRight } from "react-icons/fi";
import { Drawer, Menu, Modal, Select, message, Input } from "antd";

function ActualizaciónDeContraseña() {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmarContrasenia, setConfirmarContrasenia] = useState('');

    const [errorText, setErrorText] = useState('');
    const [errorTextConfirmacion, setErrorTextConfirmacion] = useState('');

    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
    const [mostrarContrasenia2, setMostrarContrasenia2] = useState(false);

    const [drawerVisible, setDrawerVisible] = useState(false);
    const toggleDrawer = () => setDrawerVisible(!drawerVisible);
    const handleClose = () => setDrawerVisible(false);

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

    const toggleMostrarContrasenia = () => {
        setMostrarContrasenia(!mostrarContrasenia);
    };

    const toggleMostrarContrasenia2 = () => {
        setMostrarContrasenia2(!mostrarContrasenia2);
    };

    const actualizarContrasenia = async () => {
        const datos = {
            correo: correo,
            contrasenia: contrasenia
        };
        try {
            console.log(datos);  
            const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/actualizaContraUsuario.php', {   //  'http://localhost/TeleSecundaria763/actualizaContraUsuario.php
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

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">

            <div className="w-full h-[60px] bg-white border-b border-gray-200 flex items-center px-4 fixed top-0 left-0 z-50">
                <button onClick={toggleDrawer} className="border-none bg-none cursor-pointer" aria-label="Abrir menú">
                    <FiAlignRight className="text-2xl" />
                </button>
                <img src={logotelesecundaria763} alt="Logo" className="h-8 md:h-10 ml-4"
            />

            </div>
                <Drawer
                    title={<h2 className="text-2xl font-bold">Menú</h2>}
                    placement="left"
                    onClose={handleClose}
                    open={drawerVisible}
                    bodyStyle={{ padding: 0 }}
                >
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

                <div className="flex-grow flex items-center justify-center px-4 py-12 mt-[60px]">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-extrabold text-center mb-4 text-gray-800">Recuperación de Cuenta</h1>
                    <p className="text-center text-gray-600 mb-4">Actualización de Contraseña</p>
                    <p className="text-center text-gray-600 mb-6">Introduce una nueva contraseña segura.</p>

                    {errorText && <p className="text-red-500 mb-2">{errorText}</p>}
                    {errorTextConfirmacion && <p className="text-red-500 mb-2">{errorTextConfirmacion}</p>}

                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="correo" className="block mb-2 text-gray-700 font-medium">
                                Correo Electrónico:
                            </label>
                            <input
                                type="text"
                                id="correo"
                                name="correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                                placeholder="Ingrese su correo como verificación"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="contrasenia" className="block mb-2 text-gray-700 font-medium">
                                Ingrese su nueva contraseña:
                            </label>
                            <Input.Password
                                value={contrasenia}
                                type={mostrarContrasenia ? 'text' : 'password'}
                                placeholder="Ingrese nueva contraseña"
                                required
                                id="contrasenia"
                                name="contrasenia"
                            onChange={(e) => {
                                setContrasenia(e.target.value);
                                const erro = Validaciones_Contras(e.target.value);
                                setErrorText(erro);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmarContrasenia" className="block mb-2 text-gray-700 font-medium">
                                Confirmar contraseña:
                            </label>
                            <Input.Password
                                value={confirmarContrasenia}
                                type={mostrarContrasenia2 ? 'text' : 'password'}
                                placeholder="Confirme su nueva contraseña"
                                required
                                id="confirmarContrasenia"
                                name="confirmarContrasenia"
                                onChange={(e) => setConfirmarContrasenia(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#800000] hover:bg-black text-white font-bold py-2 rounded-md transition duration-300"
                        >
                            Actualizar Contraseña
                        </button>

                        <Link
                            to="/Login"
                            className="w-full block text-center bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-md transition duration-300"
                        >
                            Atrás
                        </Link>

                    </form>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default ActualizaciónDeContraseña