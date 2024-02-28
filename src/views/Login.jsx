import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Nav2 from '../components/Nav2';
import BreadCrumb from './BreadCrumbView';
import { message } from 'antd';

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
  const [telefonoError, setTelefonoError] = useState('');

  useEffect(() => {
    if (isLoginBlocked) {
      message.error('Máximo número de intentos. Por favor, inténtalo de nuevo dentro de un minuto.');
    }
  }, [isLoginBlocked]);

  const habilitarCuentaEnBaseDeDatos = async () => {
    try {
      const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/ActivarEstadoUsuario.php', {
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
    }
  };

  const activarBloqueoDesabilitarUsuarios = async () => {
    try {
      const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/disableAccount.php', {
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
      const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/login.php', {
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
      const { success, id_rol, vch_estado } = await response.json();
      const newIdRol = id_rol;
      const tipoestadoUsuario = vch_estado;
      console.log(usuario);
      if (success) {
        if (tipoestadoUsuario === 'activo') {
          if (newIdRol === '1') {
            navigate('/HomeDirectivo');
          } else if (newIdRol === '2') {
            navigate('/HomeAdministrativo');
          } else if (newIdRol === '3') {
            navigate('/HomeDocente');
          } else {
            navigate('/NotFound');
          }
        } else {
          message.warning('Tu cuenta aun no esta permitida acceder, espera a que el administrador autorice el acceso');
        }
      } else {
        setContadorIntentos(contadorIntentos + 1);
        setTelefonoError('Datos Incorrectos'); setTimeout(() => setTelefonoError(null), 3000);

        if (contadorIntentos >= 3) {
          setIsLoginBlocked(true);
          console.log("Se activó el login blocked");
        }
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de inicio de sesión:', error);
    }
  };

  const toggleMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const handleUsuarioChange = (e) => {
    const tipoUsuario = e.target.value;
    setUsuario(tipoUsuario);
  };
  
  return (
    <div>
      <Nav2 />
      <div className="container-fluid" style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
        <div className="row justify-content-center align-items-center" style={{ minHeight: '110vh' }}>
          <div className="col-md-4">

            <form className="bg-light p-4 rounded shadow" onSubmit={handleLogin}>
              <h2 className="mb-11 text-center text-magenta">¡Bienvenido! Inicia sesión</h2>
              <p className="mb-3 text-center">Ingresa tus datos para iniciar sesión.</p>
              {errorText && <p className="text-danger text-center">{errorText}</p>}

              {telefonoError && <p style={{ color: 'red' }}>{telefonoError}</p>}

              <div className="mb-3">
                <label htmlFor="usuario" className="form-label">Tipo de usuario:</label>
                <select className="form-select" id="usuario" onChange={handleUsuarioChange} required>
                  <option value="">Selecciona un tipo de usuario</option>
                  <option value="1">Directivo</option>
                  <option value="2">Administrativo</option>
                  <option value="3">Docente</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">Correo Electrónico:</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Ingresa tu correo electrónico" required autoFocus onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="mb-3 position-relative">
                <label htmlFor="inputPassword" className="form-label">Contraseña:</label>
                <div className="input-group">
                  <input type={mostrarContrasenia ? 'text' : 'password'} id="inputPassword" className="form-control" placeholder="Ingresa tu contraseña" required onChange={(e) => setPassword(e.target.value)} />
                  
                  <button type="button" onClick={toggleMostrarContrasenia} 
                    style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)',
                             backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} >
                  {mostrarContrasenia ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                  </button>

                </div>
              </div>

              <button type="submit" className="btn btn-lg btn-primary btn-block" 
                  style={{ backgroundColor: 'var(--first-color)', borderColor: '#004b9b', color: '#fff', padding: '10px 20px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }} disabled={isLoginBlocked}
                  onMouseOver={(event) => { event.target.style.backgroundColor = 'black';}}
                  onMouseOut={(event) => { event.target.style.backgroundColor = 'var(--first-color)';}}
                > Iniciar sesión
              </button>

              <p className="mt-4 text-center">¿No tienes una cuenta? <Link to="/Registro"  style={{ color: '#7d0430', textDecoration: 'none' }}>Regístrate</Link></p>
              <p className="mt-2 text-center">¿Se te olvidó la contraseña? <Link to="/ActualizarContraseña"  style={{ color: '#7d0430', textDecoration: 'none' }}>Recupérala</Link></p>
              <BreadCrumb />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
