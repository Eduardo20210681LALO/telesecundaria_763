import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logotelesecundaria763 from "../../images/logotelesecundaria763.png";

import { LoginOutlined, UserAddOutlined, TeamOutlined, HomeOutlined, InfoCircleOutlined } from "@ant-design/icons";

import Footer from "../../components/Footer.jsx";
import { FiAlignRight } from "react-icons/fi";
import { Drawer, Menu, message } from "antd";


function EnviarCorreo() {
  const navigate = useNavigate();
  const [tokenrecibido, setTokenRecibido] = useState('');//token que recupero de la respuesta del servidor
  const [correo, setCorreo] = useState('');
  const [token, setToken] = useState('');//token que ingresa el usuario para hacer la comprobación
  const [mostrarVerificacion, setMostrarVerificacion] = useState(false);

  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const handleClose = () => setDrawerVisible(false);


  const enviarCorreo = async (e) => {
    e.preventDefault();
    if (correo === '') {
      message.warning('Por favor, ingrese algún dato en el campo de correo antes de enviar el código.');
    } else {
      const datos = { correo: correo };
      try {
        const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/correoLalo.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datos),
        });
        const responseData = await response.json();
        console.log('Response data:', responseData); // Añadir este console.log
        if (!responseData) {
          console.log('La respuesta del servidor está vacía');
          message.error('No hay respuesta del servidor');
          return;
        }
        if (responseData.done) {
          message.success('¡Éxito! Correo Enviado Exitosamente.');
          message.info('Verifica tu bandeja de entrada de tu correo electrónico.');
          console.log('Token recuperado:', responseData.token);
          setTokenRecibido(responseData.token);
          setMostrarVerificacion(true);
        } else {
          message.error(responseData.message || 'Error desconocido al enviar el correo.');
        }
      } catch (error) {
        message.error('¡Error! No se pudo mandar el Correo, verifica nuevamente.');
        console.log('Error al mandar los datos', error);
      }
    }
  };

  const verifyCode = async (e) => {
    e.preventDefault()
    if (token === '') {
      message.warning('Por favor, ingrese el código de verificación para poder hacer la confirmación')
    } else {
      if (String(token) === String(tokenrecibido)) {
        message.success('¡Bien! El código de verificación es correcto.')
        navigate('/ActualizaciónDeContraseña');
      } else {
        message.error('¡Error!, los datos no coinciden, verifica por favor')
      }
    }
  }

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

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded shadow-lg p-8">
            <h1 className="text-3xl font-extrabold text-center mb-4 text-gray-800">Recuperación de Cuenta</h1>

            <p className="text-center text-gray-600 mb-8">
              Introduce tu correo electrónico y revisa tu bandeja de entrada el token de verificación que te enviaremos.
            </p>

            <form>
              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label"><b>Correo Electronico:</b></label>
                <input type="email" id="correo" name="correo" className="form-control rounded"
                  placeholder="Introduce tu correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              {/* Botón de envío */}
              <div>
                <button
                    onClick={enviarCorreo}
                    
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
                    Enviar Codigo al correo
                </button>
              </div>

              {mostrarVerificacion && (
                <div>
                  <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label"><b>Token proporcionado:</b></label>
                    <input type="text" id="token" name="token" className="form-control rounded-md"
                      placeholder="Introduce el token proporcionado" value={token} onChange={(e) => setToken(e.target.value)}
                    />
                  </div>

                  {/* Botón de envío */}
                  <div>
                    <button
                        onClick={verifyCode}
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
                        Verificar Token Ingresado
                    </button>
                  </div>

                </div>
              )}

              <br></br>
              <div className="d-grid gap-3">
                <Link to="/Login" className="btn btn-secondary" style={{ backgroundColor: '#A9A9A9', borderColor: 'transparent', padding: '8px 25px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}>Atrás</Link>
              </div>

            </form>

        </div>
    </div>

    <Footer />
    </div>
  ); 
}

export default EnviarCorreo