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
<<<<<<< HEAD
// ActivarEstadoUsuario.php
//DisableAccount.php
//
=======

/// TEXTO DE PRUEBA PARA MANDAR UN PUSH
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(0);

  const INTENTOS_MAXIMOS = 5;
  const TIEMPO_BLOQUEO = 30; // en segundos

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

=======

  const [contadorIntentos, setContadorIntentos] = useState(0);
  const [isLoginBlocked, setIsLoginBlocked] = useState(false);
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const [datosIncorrectos, setDatosIncorrectos] = useState('');
  const [datosIncorrectos2, setDatosIncorrectos2] = useState('');
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668

  const toggleMostrarOpciones = () => {
    setMostrarOpciones(!mostrarOpciones);
  };
<<<<<<< HEAD

  const generateToken = () => {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);//se
  };

  const generarToken = (id_usuario) => {
    const token = generateToken();
    Cookies.set('token', token, { expires: 7 });

    //se guardara el id del usuario el el localStorage
    localStorage.setItem('idUsuario', id_usuario);
  }

  const VerificarRolUsuario = (id_usuario, id_rolUsuario) => {
    id_rolUsuario = parseInt(id_rolUsuario);

    if (id_rolUsuario === 1 && parseInt(usuario) === id_rolUsuario) {
      message.success('Bienvenido Directivo')
      console.log('Usuario con rol de Directivo');
      generarToken(id_usuario)
      navigate('/HomeDirect');

    } else if (id_rolUsuario === 2 && parseInt(usuario) === id_rolUsuario) {
      message.success('Bienvenido Administrativo')
      console.log('Usuario con rol de Administrativo');
      generarToken(id_usuario)
      //navigate('/HomeAdministrativos');
      navigate('/HomeAdmin');

    } else if (id_rolUsuario === 3 && parseInt(usuario) === id_rolUsuario) {
      message.success('Bienvenido Docente')
      console.log('Usuario con rol de Docente');
      generarToken(id_usuario)
      navigate('/HomeDocentes');

    } else if (id_rolUsuario === 4 && parseInt(usuario) === id_rolUsuario) {
      message.info('Atención, aún no se le ha asignado un rol. Comuníquese con el administrador.')

    } else {
      message.error('Datos incorrectos, el rol seleccionado no coincide con el rol del usuario.');
    }
  };
  
  const VerificarEstadoUsuario = (id_usuario, estadoUsuario, id_rolUsuario) => {
    if (estadoUsuario === '3') {
      message.info('Atencion, Su cuenta está bloqueada, comuníquese con el administrador.');
    } else if (estadoUsuario === '2') {
      message.info('Atención, su cuenta está inactiva, por favor comuníquese con el administrador.');
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
      const response = await fetch('http://localhost/TeleSecundaria763/InicioXUsuario/login.php', {
=======
  
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
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
<<<<<<< HEAD
          password
        })
      });
  
      const data = await response.json();
      console.log('Respuesta JSON recibida:', data);
  
      if (response.ok) {
        const { success, id_usuario, vch_correo_usuario, id_rol, id_estatus, messages } = data;
        console.log(success, id_usuario, vch_correo_usuario, id_rol, id_estatus, messages);
  
        if (success) {
          VerificarEstadoUsuario(id_usuario, id_estatus, id_rol);
        } else {
          const intentosFallidos = parseInt(localStorage.getItem('intentosFallidos')) || 0;
          const nuevosIntentos = intentosFallidos + 1;

          if (nuevosIntentos >= INTENTOS_MAXIMOS) {
            message.info('Ha superado el número máximo de intentos. El botón ha sido bloqueado.');
            bloquearBoton();
          } else {
            localStorage.setItem('intentosFallidos', nuevosIntentos);
            const intentosRestantes = INTENTOS_MAXIMOS - nuevosIntentos;
            message.error('Datos incorrectos, verifique nuevamente ...');
            message.warning(`Le quedan ${intentosRestantes} intento(s)`);
          }
        }
      } else {
        message.warning('Error al procesar la solicitud, intente nuevamente.');
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

  const toggleMostrarContrasenia = () => { // mostrar contraseña
=======
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
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const handleUsuarioChange = (e) => {
    const tipoUsuario = e.target.value;
    setUsuario(tipoUsuario);
  };

<<<<<<< HEAD
  const handleUsuarioChange1 = (e) => { //funcion para recuperar contraseñas
=======
  const handleUsuarioChange1 = (e) => {
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
    const opcion_Rec = e.target.value;
    if (opcion_Rec === '1') {
      navigate('/EnviarMensaje');
    } else if (opcion_Rec === '2') {
      navigate('/EnviarCorreo');
    } else if (opcion_Rec === '3') {
      navigate('/EnviarCorreoTelefono');
    }
  };
<<<<<<< HEAD

  /*const generateToken = () => { // funcion para que se genere el token
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);//se
  };*/

  const handleMouseLeave = () => {
    setMostrarOpciones(false); // Cierra el select cuando el mouse sale
  };

  return (
    <div>
      <Nav2 />
      <div className="min-h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col md:flex-row rounded shadow-lg w-full max-w-lg md:max-w-3xl bg-white mx-auto">
          
          {/* Formulario */}
          <div className="flex flex-col w-full md:w-1/2 p-6">
            <div className="flex flex-col justify-center mb-8">
              <h1 className="text-2xl sm:text-3xl text-center font-bold">Inicio de Sesión</h1>
              <div className="w-full mt-4">
                <form className="w-full" onSubmit={Validacion}>
                  <div className="mb-3">
                    <label htmlFor="usuario" className="block text-sm font-medium text-gray-700"><b>Tipo de usuario:</b></label>
                    <select id="usuario" onChange={(e) => setUsuario(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none sm:text-sm rounded">
                      <option value="">Selecciona un tipo de usuario</option>
                      <option value="1">Directivo</option>
                      <option value="2">Administrativo</option>
                      <option value="3">Docente</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label"><b>Correo Electrónico:</b></label>
                    <input type="email" id="inputEmail" className="form-control rounded w-full" placeholder="Ingresa tu correo electrónico" autoFocus onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="mb-3 relative">
                    <label htmlFor="inputPassword" className="form-label"><b>Contraseña:</b></label>
                    <div className="relative">
                      <input type={mostrarContrasenia ? 'text' : 'password'} id="inputPassword" className="form-control rounded w-full" placeholder="Ingresa tu contraseña" onChange={(e) => setPassword(e.target.value)} />
                      <button type="button" onClick={toggleMostrarContrasenia} className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer">
                        {mostrarContrasenia ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button type="submit" className="btn btn-lg btn-primary btn-block w-full rounded"
                      style={{ backgroundColor: 'var(--first-color)', borderColor: 'transparent', color: '#fff', padding: '10px 20px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}
                      onMouseOver={(event) => { event.target.style.backgroundColor = 'black'; }}
                      onMouseOut={(event) => { event.target.style.backgroundColor = 'var(--first-color)'; }}
                      disabled={bloqueado}
                    >
                      {bloqueado ? `Bloqueado (${tiempoRestante}s)` : 'Iniciar Sesión'}
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <span className="text-blue-dark text-xs no-underline">
                      No tienes Cuenta?
                    </span>
                    <Link to="/Registro" className="no-underline text-xs" style={{ color: '#800000' }}><b> Regístrate</b></Link>
                  </div>

                  <div className="text-center mt-2" style={{ position: 'relative' }}>
                    {mostrarOpciones && (
                      <div onMouseLeave={handleMouseLeave} style={{ position: 'absolute', top: '0', left: '0', right: '0', margin: 'auto' }}>
                        <select
                          id="metodoRecuperacion"
                          onChange={handleUsuarioChange1}
                          required
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none sm:text-sm rounded-md"
                        >
                          <option value="">Selecciona El Metodo</option>
                          <option value="1">Teléfono</option>
                          <option value="2">Correo</option>
                          <option value="3">Correo y Teléfono</option>
                        </select>
                      </div>
                    )}

                    <span className="text-blue-dark text-xs no-underline">
                      Se te olvidó la contraseña?
                      <span onClick={toggleMostrarOpciones}>
                        <b style={{ color: '#800000', cursor: 'pointer' }}> Recuperar</b>
                      </span>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Imagen de fondo que solo aparece en pantallas medianas y grandes */}
          <div className="hidden md:block md:w-1/2 rounded-r-lg" style={{ background: "url('https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80')", backgroundSize: 'cover', backgroundPosition: 'center center' }}>
=======
  
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
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
          </div>
        </div>
      </div>
    </div>
<<<<<<< HEAD

=======
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
  );
}

export default Login;