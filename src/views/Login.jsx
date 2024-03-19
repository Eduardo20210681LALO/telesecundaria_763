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
      const response = await fetch('http://192.168.1.95/TeleSecundaria763/ActivarEstadoUsuario.php', {//https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/ActivarEstadoUsuario.php
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });
      if (!response.ok) {
        throw new Error('Error al habilitar la cuenta');
      }
      console.log(response.ok)
      setIsLoginBlocked(false);
      setIsButtonEnabled(true);
      setContadorIntentos(0);
    } catch (error) {
      console.error('Error al habilitar la cuenta:', error);
      navigate('/NotServe');
    }
  };

  const activarBloqueoDesabilitarUsuarios = async () => {
    try {
      const response = await fetch('http://192.168.1.95/TeleSecundaria763/disableAccount.php', {//https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/disableAccount.php
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });
      if (!response.ok) {
        throw new Error('Error al deshabilitar la cuenta');
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
      activarBloqueoDesabilitarUsuarios();
    }
  }, [isLoginBlocked]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoginBlocked) {
      return;
    }
    try {
      const response = await fetch('http://192.168.1.95/TeleSecundaria763/login.php', {//'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/login.php'
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
      const { success, id_usuario, id_password, id_rol, id_estatus, message } = await response.json();
     
      const usuario_logueado = id_usuario; console.log(usuario_logueado);
      const contra_usuario = id_password; console.log(contra_usuario);
      const tipo_rol = id_rol; console.log(tipo_rol);
      const estado_usuario = id_estatus; console.log(estado_usuario, 'el estado de usuario');

      if (success === true) {
        const token = generateToken();
        Cookies.set('token', token, { expires: 7 });
        if (estado_usuario === '1') {
          if (tipo_rol === '1') {//verifica que tipo de rol tiene en la bd
            navigate('/HomeDirectivos');
          } else if (tipo_rol === '2') {
            navigate('/HomeAdministrativos');
          } else if (tipo_rol === '3') {
            navigate('/HomeDocentes');
          } else if (tipo_rol === '4') {
            setDatosIncorrectos2('Tu cuenta aun no tiene ningun rol, por favor espere a que el administrador le asigne uno.'); setTimeout(() => setDatosIncorrectos2(null), 3000);
          } else {
            navigate('/NotFound');
          }
        } else {
          console.log('Tu cuenta esta bloqueada, por favor comunicate con el administrador')
        }
      } else {
        
        console.log(message)
        setDatosIncorrectos('Datos Incorrectos'); setTimeout(() => setDatosIncorrectos(null), 3000);
        setContadorIntentos(contadorIntentos + 1);
        if (contadorIntentos >= 5) {
          console.log("Se activó el bloqueo del boton");
          setIsLoginBlocked(true);
        }
      }

    } catch (error) {
      console.log('error en el catch.');
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
    const selectedOption = e.target.value;
    if (selectedOption === '1') {
        window.location.href = '/EnviarMensaje';
    } else if (selectedOption === '2') {
        window.location.href = '/EnviarCorreo';
    } else if (selectedOption === '3') {
        window.location.href = '/EnviarCorreoTelefono';
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
