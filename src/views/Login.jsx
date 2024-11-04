import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Nav2 from '../components/Nav2';
import Cookies from 'js-cookie';
import { message } from 'antd';

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(0);

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

  const toggleMostrarOpciones = () => {
    setMostrarOpciones(!mostrarOpciones);
  };










// Función para generar un token único
const generateToken = () => {
  return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
};

// Función para guardar el token con un identificador único para cada usuario
const generarToken = (id_usuario) => {
  const token = generateToken();
  // Guardar el token en una cookie con un identificador único basado en el id_usuario
  Cookies.set(`token_${id_usuario}`, token, { expires: 7 });
  // Guardar el id_usuario en localStorage como referencia del usuario autenticado
  localStorage.setItem('idUsuario', id_usuario);
};

// Verificar el rol del usuario y navegar a la ruta correspondiente
const VerificarRolUsuario = (id_usuario, id_rolUsuario) => {
  const roles = {
    1: { nombre: 'Directivo', rol: 'directivo', ruta: 'HomeDirect' },
    2: { nombre: 'Administrativo', rol: 'administrativo', ruta: 'HomeAdmin' },
    3: { nombre: 'Docente', rol: 'docente', ruta: 'HomeDocentes' }
  };

  const rolInfo = roles[id_rolUsuario];
  if (rolInfo) {
    message.success(`Bienvenido ${rolInfo.nombre}`);
    generarToken(id_usuario); // Generar y guardar el token para este usuario específico
    localStorage.setItem('rol', rolInfo.rol);
    navigate(`/${rolInfo.rol}/${rolInfo.ruta}`);
  } else {
    message.info('Atención, aún no se le ha asignado un rol. Comuníquese con el administrador.');
  }
};

// Verificar el estado del usuario y llamar a VerificarRolUsuario si el estado es activo
const VerificarEstadoUsuario = (id_usuario, estadoUsuario, id_rolUsuario) => {
  if (estadoUsuario === '3') {
    message.info('Atención, su cuenta está bloqueada. Comuníquese con el administrador.');
  } else if (estadoUsuario === '2') {
    message.info('Atención, su cuenta está inactiva. Comuníquese con el administrador.');
  } else if (estadoUsuario === '1') {
    VerificarRolUsuario(id_usuario, id_rolUsuario);
  }
};

// Función de login principal
const FuncionLogin = async () => {
  if (bloqueado) {
    message.error('El botón está bloqueado. Por favor, espera.');
    return;
  }

  try {
    const response = await fetch('http://localhost/TeleSecundaria763/InicioXUsuario/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok && data.success) {
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

  const toggleMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
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

  const handleMouseLeave = () => {
    setMostrarOpciones(false);
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
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login;