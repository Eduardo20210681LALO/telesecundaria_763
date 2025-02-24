import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { getToken } from 'firebase/messaging';
import { messaging } from '../firebase'; // Asegúrate de importar la configuración de Firebase

import logotelesecundaria763 from '../images/logotelesecundaria763.png';

import Footer from "../components/Footer";
import { FiAlignRight } from "react-icons/fi";
import { Drawer, Menu, Modal, Select, message, Input } from "antd";

import {
  LoginOutlined,
  UserAddOutlined,
  TeamOutlined,
  HomeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(0);

  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const handleClose = () => setDrawerVisible(false);
  const toggleMostrarOpciones = () => setMostrarOpciones(true);
  const handleCancel = () => setMostrarOpciones(false);

  const INTENTOS_MAXIMOS = 5;
  const TIEMPO_BLOQUEO = 30;

  useEffect(() => {
    const intentosFallidos = parseInt(localStorage.getItem('intentosFallidos')) || 0;
    const tiempoBloqueo = parseInt(localStorage.getItem('tiempoBloqueo')) || 0;

    if (tiempoBloqueo && tiempoBloqueo > Date.now()) {
      setBloqueado(true);
      setTiempoRestante(Math.ceil((tiempoBloqueo - Date.now()) / 1000));
    } else if (intentosFallidos >= INTENTOS_MAXIMOS) {
      bloquearBoton();
    }
  }, []);

  useEffect(() => {
    let timer;
    if (bloqueado && tiempoRestante > 0) {
      timer = setInterval(() => {
        setTiempoRestante(tiempoRestante - 1);
      }, 1000);
    } else if (bloqueado && tiempoRestante <= 0) {
      desbloquearBoton();
    }
    return () => clearInterval(timer);
  }, [bloqueado, tiempoRestante]);

  const bloquearBoton = () => {
    const tiempoDesbloqueo = Date.now() + TIEMPO_BLOQUEO * 1000;
    localStorage.setItem('tiempoBloqueo', tiempoDesbloqueo);
    setBloqueado(true);
    setTiempoRestante(TIEMPO_BLOQUEO);
  };

  const desbloquearBoton = () => {
    localStorage.removeItem('intentosFallidos');
    localStorage.removeItem('tiempoBloqueo');
    setBloqueado(false);
    setTiempoRestante(0);
  };

  // Función para generar un token único de sesión
  const generateToken = () => {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
  };

  const generarToken = (id_usuario) => {
    const token = generateToken();
    Cookies.set(`token_${id_usuario}`, token, { expires: 7 });
    localStorage.setItem('idUsuario', id_usuario);
  };

  const VerificarRolUsuario = async (id_usuario, id_rolUsuario) => {
    const roles = {
      1: { nombre: 'Directivo', rol: 'directivo', ruta: 'HomeDirect' },
      2: { nombre: 'Administrativo', rol: 'administrativo', ruta: 'HomeAdmin' },
      3: { nombre: 'Docente', rol: 'docente', ruta: 'HomeDocentes' }
    };

    const rolInfo = roles[id_rolUsuario];
    const id_rolUsuarioDOS = id_rolUsuario
    console.log('Rol identificado:', rolInfo);

    if (rolInfo) {
      console.log(`Bienvenido ${rolInfo.nombre}`);
      generarToken(id_usuario); // Generar token de sesión para el usuario
      localStorage.setItem('rol', rolInfo.rol);

      if (id_rolUsuarioDOS === '2') { // Verificación adicional para administradores
        try {
          console.log('Intentando obtener el token de Firebase para usuario administrativo...');
          const firebaseToken = await getToken(messaging, { vapidKey: 'BDAEbYvoVXa80RVcHFD0Y3DmRjpltzapP-PO9qlPdJ_JGv8Shk4yaSR8GSMd7Ch_Su-7_vSMTP656YjjFO6aNEU' });
          console.log('Token de Firebase obtenido:', firebaseToken);

          if (firebaseToken) {
            console.log('Enviando el token al backend...');
            const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminUsuarios/GuardarToken.php', { // http://localhost/TeleSecundaria763/AdminUsuarios/GuardarToken.php
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id_usuario: id_usuario,
                token: firebaseToken,
                rol: rolInfo.rol
              })
            });
            
            const responseData = await response.json();
            console.log('Respuesta del backend:', responseData);

            if (!responseData.success) {
              console.error('Error al guardar el token en la base de datos:', responseData.message);
            }
          }
        } catch (error) {
          console.error('Error al obtener el token de Firebase:', error);
        }
      }
      navigate(`/${rolInfo.rol}/${rolInfo.ruta}`); // Redirige después de guardar token de Firebase
    } else {
      message.info('Atención, aún no se le ha asignado un rol. Comuníquese con el administrador.');
    }
  };

  const VerificarEstadoUsuario = (id_usuario, estadoUsuario, id_rolUsuario) => {
    if (estadoUsuario === '3') {
      message.info('Atención, su cuenta está bloqueada. Comuníquese con el administrador.');
    } else if (estadoUsuario === '2') {
      message.info('Atención, su cuenta está inactiva. Comuníquese con el administrador.');
    } else if (estadoUsuario === '1') {
      VerificarRolUsuario(id_usuario, id_rolUsuario);
    }
  };

  const FuncionLogin = async () => {
    if (bloqueado) {
      message.error('El botón está bloqueado. Por favor, espera.');
      return;
    }
  
    try {
      const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/InicioXUsuario/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        // Si el servidor respondió con un código de error, muestra el mensaje de error y redirige
        console.error(`Error en la respuesta: ${response.status} ${response.statusText}`);
        navigate('/NotServe');
        return;
      }
  
      const data = await response.json(); // Procesa la respuesta como JSON solo si fue exitosa
  
      if (data.success) {
        VerificarEstadoUsuario(data.id_usuario, data.id_estatus, data.id_rol);
        localStorage.removeItem('intentosFallidos');
      } else {
        const intentosFallidos = parseInt(localStorage.getItem('intentosFallidos')) || 0;
        const nuevosIntentos = intentosFallidos + 1;
        localStorage.setItem('intentosFallidos', nuevosIntentos);
  
        if (nuevosIntentos >= INTENTOS_MAXIMOS) {
          bloquearBoton();
        } else {
          message.warning(`Datos incorrectos. Te quedan ${INTENTOS_MAXIMOS - nuevosIntentos} intentos.`);
        }
      }
    } catch (error) {
      console.error('Error en el catch:', error);
      navigate('/NotServe');
    }
  };
  






  const Validacion = async (e) => {
    e.preventDefault();
    if (!usuario) {
      message.warning('Por favor, seleccione un tipo de usuario.');
      return;
    }
    if (!email) {
      message.warning('Por favor, ingrese un correo electrónico.');
      return;
    }
    if (!password) {
      message.warning('Por favor, ingrese una contraseña.');
      return;
    }
    await FuncionLogin();
  };

  const handleUsuarioChange1 = (value) => {
    const opcion_Rec = value;
    if (opcion_Rec === '1') {
      navigate('/EnviarMensaje');
    } else if (opcion_Rec === '2') {
      navigate('/EnviarCorreo');
    } else if (opcion_Rec === '3') {
      navigate('/EnviarCorreoTelefono');
    }
    setMostrarOpciones(false);
  };  

  return (
    <div className="min-h-screen flex flex-col">
  
      {/* Nav Superior */}
      <div className="w-full h-[60px] bg-white border-b border-gray-200 flex items-center px-4 fixed top-0 left-0 z-50">
        <button
          onClick={toggleDrawer}
          className="border-none bg-none cursor-pointer"
          aria-label="Abrir menú"
        >
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
      <div className="min-h-screen w-full flex items-center justify-center px-4 py-6 mt-[20px]">
        <div className="flex flex-col md:flex-row rounded-lg shadow-lg w-full max-w-lg md:max-w-4xl bg-white mx-auto">
  
          {/* Formulario */}
          <div className="flex flex-col w-full md:w-1/2 p-6">
            

            <h1 className="text-3xl font-extrabold text-center mb-4 text-gray-800">Inicio de Sesión</h1>
  
            <form onSubmit={Validacion} className="space-y-4">

              {/* Selección de tipo de usuario */}
              <div>
                <label htmlFor="usuario" className="block mb-2 text-gray-700 font-medium">
                  Seleccione un tipo de usuario:
                </label>
                <Select
                  id="usuario"
                  onChange={(value) => setUsuario(value)}
                  className="w-full rounded-lg border border-gray-300 h-11 text-base"
                  placeholder="Seleccione una opción"
                >
                  <Select.Option value="1">Dirección</Select.Option>
                  <Select.Option value="2">Administrativo</Select.Option>
                  <Select.Option value="3">Docente</Select.Option>
                </Select>
              </div>

              {/* Input para correo electrónico */}
              <div>
                <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">
                  Correo Electrónico:
                </label>
                <Input
                  id="email"
                  placeholder="Ingrese su correo electrónico"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border border-gray-300 h-11 px-3 text-base"
                />
              </div>

              {/* Input para contraseña */}
              <div>
                <label htmlFor="password" className="block mb-2 text-gray-700 font-medium">
                  Ingrese su contraseña:
                </label>
                <Input.Password
                  id="password"
                  placeholder="Ingrese su contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded border border-gray-300 h-11 px-3 text-base"
                />
              </div>

              {/* Botón de envío */}
              <div>
                <button
                  type="submit"
                  className={`w-full bg-[#800000] hover:bg-black text-white font-bold h-11 rounded transition duration-300 ${
                    bloqueado ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={bloqueado}
                  style={{
                    backgroundColor: bloqueado ? '#800000' : '#800000',
                    borderColor: 'transparent',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: bloqueado ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseOver={(event) => {
                    if (!bloqueado) event.currentTarget.style.backgroundColor = 'black';
                  }}
                  onMouseOut={(event) => {
                    if (!bloqueado) event.currentTarget.style.backgroundColor = '#800000';
                  }}
                >
                  {bloqueado ? `Bloqueado (${tiempoRestante}s)` : "Iniciar Sesión"}
                </button>
              </div>

            </form>

  
              {/* Botones de Redirección */}
              <div className="text-center mt-4">
                <span className="text-black text-sm">¿No tienes Cuenta?</span>
                <Link to="/registro" className="text-sm font-bold" style={{ color: '#800000', marginLeft: '4px' }}> {/* Cambiado a guinda */}
                  Regístrate
                </Link>
              </div>

              <div className="text-center mt-4">
                <span className="text-black text-sm">
                  ¿Se te olvidó la contraseña?
                  <span
                    onClick={toggleMostrarOpciones}
                    className="font-bold cursor-pointer"
                    style={{ color: '#800000', marginLeft: '4px' }}
                  >
                    Recuperar
                  </span>
                </span>
              </div>

  
            <Modal
              title="Selecciona el método de recuperación"
              visible={mostrarOpciones}
              onCancel={handleCancel}
              footer={null}
            >
              <Select
                id="metodoRecuperacion"
                onChange={handleUsuarioChange1}
                required
                className="w-full rounded-lg border border-gray-300 h-11 text-base"
                placeholder="Seleccione una opción"
              >
                <Select.Option value="1">Teléfono</Select.Option>
                <Select.Option value="2">Correo</Select.Option>
                <Select.Option value="3">Correo y Teléfono</Select.Option>
              </Select>
            </Modal>
          </div>

          <div
            className="hidden md:block md:w-1/2 rounded-r-lg"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
  
      {/* Footer */}
      <Footer />
    </div>
  );
  
}

export default Login;