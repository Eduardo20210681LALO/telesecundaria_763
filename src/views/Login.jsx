import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import work3 from '../images/work3.jpg';
import Nav2 from '../components/Nav2';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import BreadCrumb from './BreadCrumbView';
import { BASE_URL } from '../components/url.js';
import ReCAPTCHA from 'react-google-recaptcha';

const Captcha = ({ onCaptchaVerify }) => {
  const handleCaptchaChange = () => {
    onCaptchaVerify(true)
  }
  
  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <h6 className="text-1xl font-bold mb-4 text-black">¡Completa el Captha como verificación!</h6>
      <ReCAPTCHA
        sitekey={'6Lc1ZHUpAAAAAJ7n4rCpSyhLD2NpMmbo4Q_qPNuh'}
        onChange={handleCaptchaChange}
        className="mb-4"
      />
    </div>
  );
};

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLoginBlocked, setIsLoginBlocked] = useState(false);
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState('');

  const handleCaptchaVerify = (verified) => {
    setIsCaptchaVerified(verified);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (isLoginBlocked) {
      return;
    }

    if (!isCaptchaVerified) {
      setCaptchaError('Por favor, completa el CAPTCHA antes de logearse');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/login.php`, {
        email,
        password,
        usuario
      });
      const { success, token, id_rol } = response.data;
      const newIdRol = id_rol;

      if (success) {
        Cookies.set('token', token, { expires: 7 });
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
        setLoginAttempts(loginAttempts + 1);
        if (loginAttempts + 1 >= 3) {
          setIsLoginBlocked(true);
          setTimeout(() => {
            setIsLoginBlocked(false);
            setLoginAttempts(0);
          }, 120000);
        }
        setErrorText('Datos incorrectos');
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
      
      <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '110vh', backgroundColor: '#f7f7f7' }}>
        <div className="login-card" style={{ width: '100%', maxWidth: '60%', display: 'flex', flexDirection: 'row', border: 'none', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', padding: '40px', backgroundColor: '#fff' }}>
          <form className="form-signin" onSubmit={handleLogin} style={{ width: '50%' }}>
            <h2 className="form-signin-heading" style={{ marginBottom: '30px', color: '#333', fontWeight: 'bold' }}>Hola, Bienvenido</h2>

            <p>Ingrese los datos para ingresar al sistema.</p>
            {errorText && <p style={{ color: 'red' }}>{errorText}</p>}

            <div className="col-md-6" style={{ width: '100%' }}>
              <label htmlFor="contraseña">Ingrese tipo de usuario:</label>
              <select className="cajas form-control" id="usuario" onChange={handleUsuarioChange} required style={{ marginBottom: '20px', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}>
                <option value="">Selecciona un tipo de usuario</option>
                <option value="1">Directivo</option>
                <option value="2">Administrativo</option>
                <option value="3">Docente</option>
              </select>
            </div>
            
            <label htmlFor="correo">Correo Electrónico:</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Ingrese el correo electronico" required autoFocus onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: '20px', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }} />
            
            <label htmlFor="contraseña">Contraseña:</label>
            <div style={{ position: 'relative' }}>
              <input type={mostrarContrasenia ? 'text' : 'password'} id="inputPassword" className="form-control" placeholder="ingrese la contraseña" required onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '20px', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }} />
              <button type="button" onClick={toggleMostrarContrasenia} style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                {mostrarContrasenia ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </button>
            </div>
            
            <button type="submit" className="btn btn-lg btn-primary btn-block" style={{ backgroundColor: 'var(--first-color)', borderColor: '#004b9b', color: '#fff', padding: '10px 20px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }} disabled={isLoginBlocked}>Iniciar sesión</button>
            {isLoginBlocked && <p style={{ color: 'red' }}>Máximo número de intentos. Por favor, inténtalo de nuevo después de dos minutos.</p>}
            {captchaError && <p style={{ color: 'red' }}>{captchaError}</p>}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
              <Captcha onCaptchaVerify={handleCaptchaVerify} />
            </div>
            <p className="mt-4 text-center">¿No tienes una cuenta? <Link to="/Registro" style={{ color: 'var(--first-color)', textDecoration: 'none' }}>Regístrate</Link></p>
            <p className="mt-4 text-center">¿Se te olvidó la contraseña? <Link to="/OlvidateContra" style={{ color: 'var(--first-color)', textDecoration: 'none' }}>Recupérala</Link></p>
            <BreadCrumb/>
          </form>
          <div className="login-image-container" style={{ width: '50%', padding: '20px' }}>
            <img src={work3} alt="Imagen decorativa" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;