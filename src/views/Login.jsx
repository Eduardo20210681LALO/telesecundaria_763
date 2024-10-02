import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Nav2 from '../components/Nav2';
import Cookies from 'js-cookie';
import BreadCrumb from './BreadCrumbView';
import { message } from 'antd';
//import { toast } from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [contadorIntentos, setContadorIntentos] = useState(0);
  const [isLoginBlocked, setIsLoginBlocked] = useState(false);
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const [datosIncorrectos, setDatosIncorrectos] = useState('');
  const [datosIncorrectos2, setDatosIncorrectos2] = useState('');

  const toggleMostrarOpciones = () => {
    setMostrarOpciones(!mostrarOpciones);
  };
  
  useEffect(() => {
    if (isLoginBlocked) {
      message.error('Máximo número de intentos. Por favor, inténtalo de nuevo mas tarde...');
    }
  }, [isLoginBlocked]);

  const habilitarCuentaEnBaseDeDatos = async () => {
    try {
      const response = await fetch('http://localhost/TeleSecundaria763/ActivarEstadoUsuario.php', {//        https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/ActivarEstadoUsuario.php
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario,
          email,
          password
        }),
      });
      const { success } = await response.json();
      if (success === true ) {
        setIsLoginBlocked(false);
        setIsButtonEnabled(true);
        setContadorIntentos(0);
      } else {
        console.log('Error al habilitar la cuenta');
      }
    } catch (error) {
      
      navigate('/NotServe');
    }
  };

  const bloquerUsuario = async () => {
    console.log(usuario, email, password);
    try {
      const response = await fetch('http://localhost/TeleSecundaria763/bloquearUsuario.php', {//      https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/disableAccount.php
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario,
          email,
          password
        }),
      });
      const { success } = await response.json();
      if (success === true) {
        console.log('Usuario Bloqueado');
      }
      else {
        console.log('Error al bloquear la cuenta del usuario');
      }
    } catch (error) {
      console.error('Error al deshabilitar la cuenta:', error);
      navigate('/NotServe');
    }

    const timeout = setTimeout(async () => {
      habilitarCuentaEnBaseDeDatos();
      message.success('Boton Habilitado Nuevamente.');
    }, 60000);
    setIsButtonEnabled(false);
    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    if (isLoginBlocked === true) {
      bloquerUsuario();
    }
  }, [isLoginBlocked]);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoginBlocked) {
      return;
    }
    try {
      console.log(email, password, usuario);
      const response = await fetch('http://localhost/TeleSecundaria763/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          usuario
        })
      });
      if (response.ok) {
        const { success, id_usuario, id_rol, id_estatus, messages } = await response.json();
  
        console.log(id_usuario);
        console.log(id_rol);
        console.log(id_estatus);
        console.log(messages);
  
        if (success === true) {
          const token = generateToken();
          Cookies.set('token', token, { expires: 7 });
          localStorage.setItem('idUsuario', id_usuario);
  
          if (id_estatus === '1') {
            switch (id_rol) {
              case '1':
                navigate('/HomeDirectivos');
                break;
              case '2':
                navigate('/HomeAdministrativos');
                break;
              case '3':
                navigate('/HomeDocentes');
                break;
              default:
                setDatosIncorrectos2('Tu cuenta aún no tiene ningún rol, por favor espere a que el administrador le asigne uno.');
                setTimeout(() => setDatosIncorrectos2(null), 3000);
                break;
            }
          } else {
            console.log('Tu cuenta está bloqueada, por favor comunícate con el administrador');
          }
        } else {
          console.log(messages);
          message.warning('Datos Incorrectos');
          setDatosIncorrectos('Datos Incorrectos');
          setTimeout(() => setDatosIncorrectos(null), 3000);
          setContadorIntentos(contadorIntentos + 1);
          if (contadorIntentos >= 5) {
            console.log("Se activó el bloqueo del botón");
            setIsLoginBlocked(true);
          }
        }
      } else {
        console.log('Error en la respuesta del servidor:', response.status);
        // Muestra un mensaje de error al usuario o maneja la situación de otra manera
      }
    } catch (error) {
      console.error(error);
      console.log('Error en el catch.');
      navigate('/NotServe');
    }
  };  

  const generateToken = () => {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);//se
  };
  
  const toggleMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const handleUsuarioChange = (e) => {
    const tipoUsuario = e.target.value;
    setUsuario(tipoUsuario);
  };

  const handleUsuarioChange1 = (e) => {
    const opcion_Rec = e.target.value;
    if (opcion_Rec === '1') {
      navigate('/EnviarMensaje');
    } else if (opcion_Rec === '2') {
      navigate('/EnviarCorreo');
    } else if (opcion_Rec === '3') {
      navigate('/EnviarCorreoTelefono');
    }
  };
  
  return (
    <div>
      <Nav2 />
      <div className="container-fluid" style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
        <div className="row justify-content-center align-items-center" style={{ minHeight: '110vh' }}>
          <div className="col-md-4">

            <form className="bg-light p-4 rounded shadow" onSubmit={handleLogin}>
            <h2 className="mb-4 text-2xl font-bold text-center text-magenta">Inicio de Sesión</h2>
            <p className="mb-6 text-sm text-center text-gray-700">Ingresa los datos para iniciar sesión.</p>
            
              {datosIncorrectos && <p style={{ color: 'red' }}>{datosIncorrectos}</p>}
              {datosIncorrectos2 && <p style={{ color: 'red' }}>{datosIncorrectos2}</p>}
              {errorText && <p className="text-danger text-center">{errorText}</p>}

              <div className="mb-3">
                <label htmlFor="usuario" className="block text-sm font-medium text-gray-700"><b>Tipo de usuario:</b></label>
                <select id="usuario" onChange={handleUsuarioChange} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none sm:text-sm rounded-md">
                  <option value="">Selecciona un tipo de usuario</option>
                  <option value="1">Directivo</option>
                  <option value="2">Administrativo</option>
                  <option value="3">Docente</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label"><b>Correo Electrónico:</b></label>
                <input type="email" id="inputEmail" className="form-control rounded-md" placeholder="Ingresa tu correo electrónico" required autoFocus onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="mb-3 position-relative">
                <label htmlFor="inputPassword" className="form-label"><b>Contraseña:</b></label>
                <div style={{ position: 'relative' }}>
                  <input type={mostrarContrasenia ? 'text' : 'password'} id="inputPassword" className="form-control rounded-md" placeholder="Ingresa tu contraseña" required onChange={(e) => setPassword(e.target.value)} />
                  <button type="button" onClick={toggleMostrarContrasenia} style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                    {mostrarContrasenia ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center'}}>
                <button disabled={isLoginBlocked} type="submit" className="btn btn-lg btn-primary btn-block" 
                  style={{ backgroundColor: 'var(--first-color)', borderColor: 'transparent', color: '#fff', padding: '10px 20px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}
                  onMouseOver={(event) => { event.target.style.backgroundColor = 'black';}}
                  onMouseOut={(event) => { event.target.style.backgroundColor = 'var(--first-color)';}}
                >
                  Iniciar sesión
                </button>
              </div>
              
              <p className="mt-4 text-center">¿No tienes una cuenta? <Link to="/Registro"  style={{ color: '#7d0430', textDecoration: 'none' }}><b>Regístrate</b></Link></p>
              
              <section>
                <div className="text-center mt-4">
                  <p className="mt-2 mb-0">
                      ¿Se te olvidó la contraseña?  
                      <span style={{ color: '#7d0430', textDecoration: 'none', cursor: 'pointer' }} onClick={toggleMostrarOpciones}>
                          <b> Recuperar</b>
                      </span>
                  </p>
                </div>
                {mostrarOpciones && (
                  <select id="usuario" onChange={handleUsuarioChange1} required 
                    className="block w-full px-4 py-2 mt-1 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                    <option value="">Selecciona el método de recuperación</option>
                    <option value="1">Teléfono</option>
                    <option value="2">Correo</option>
                    <option value="3">Correo y Teléfono</option>
                  </select>
                  )
                }
              </section>
          
              <BreadCrumb />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;