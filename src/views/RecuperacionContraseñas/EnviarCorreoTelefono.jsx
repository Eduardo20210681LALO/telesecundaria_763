import React, { useState} from 'react';
import '../../styles/OlvidasteContra.css';
import logotelesecundaria763 from '../../images/logotelesecundaria763.png';
import { Link, useNavigate } from 'react-router-dom';

import { LoginOutlined, UserAddOutlined, TeamOutlined, HomeOutlined, InfoCircleOutlined } from "@ant-design/icons";

import Footer from "../../components/Footer.jsx";
import { FiAlignRight } from "react-icons/fi";
import { Drawer, Menu, message } from "antd";

function EnviarCorreoTelefono() {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');

    const [drawerVisible, setDrawerVisible] = useState(false);

    const toggleDrawer = () => setDrawerVisible(!drawerVisible);
    const handleClose = () => setDrawerVisible(false);

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
        <div className="min-h-screen flex flex-col bg-gray-100">

            {/* Nav Superior */}
            <div className="w-full h-[60px] bg-white border-b border-gray-200 flex items-center px-4 fixed top-0 left-0 z-50">
                <button onClick={toggleDrawer} className="border-none bg-none cursor-pointer" aria-label="Abrir menú">
                    <FiAlignRight className="text-2xl" />
                </button>
                <img src={logotelesecundaria763} alt="Logo" className="h-8 md:h-10 ml-4" />
            </div>

            {/* Drawer */}
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

            {/* Contenedor Principal */}
            <div className="flex-grow flex items-center justify-center px-4 py-12 mt-[60px]">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-extrabold text-center mb-4 text-gray-800">Recuperación de Cuenta</h1>

                    <p className="text-center text-gray-600 mb-4">
                        ¿Olvidaste tu contraseña?
                    </p>
                    <p className="text-center text-gray-600 mb-6">
                        ¡No te preocupes!, introduce tu correo electrónico y tu número telefónico para el proceso de restablecimiento de contraseña.
                    </p>

                    <form onSubmit={VerificarUsuarioActivo} className="space-y-4">

                    {/* Correo Electrónico */}
                    <div className="input-group">
                        <label htmlFor="correo" className="block mb-2 text-gray-700 font-medium">Correo Electrónico:</label>
                        <input
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            type="email"
                            id="correo"
                            name="correo"
                            placeholder="Introduce tu correo electrónico"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                    </div>

                    {/* Número Telefónico */}
                    <div className="input-group">
                        <label htmlFor="telefono" className="block mb-2 text-gray-700 font-medium">Número Telefónico:</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            type="text"
                            id="telefono"
                            name="telefono"
                            placeholder="Introduce tu número de teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                        />
                    </div>

                    {/* Botón de envío */}
                    <button
                        type="submit"
                        className="w-full bg-[#800000] hover:bg-black text-white font-bold py-2 rounded transition duration-300"
                    >
                        Verificar Información
                    </button>

                    {/* Botón Atrás */}
                    <Link
                        to="/Login"
                        className="w-full block text-center bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded transition duration-300"
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

export default EnviarCorreoTelefono