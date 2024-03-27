import React from 'react';
import error500 from '../images/error500.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function NotServe() {
  return (
    <div className="error-body">
      <div className="error-container text-center">
        <h6><b>¡Error del Servidor!</b></h6>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={error500} alt="Error 500" className="error-image" style={{ maxWidth: '40%', height: 'auto' }} />
        </div>
        <p className="error-message">Lo sentimos, hubo un problema con el servidor. Si crees que algo no funciona, por favor informa un problema.</p>
        <button onClick={() => window.history.back()} className="btn btn-primary" style={{ backgroundColor: 'var(--first-color)', borderColor: '#004b9b', color: '#fff', padding: '10px 20px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}>Volver</button>
        <p className="error-message-support" style={{ marginTop: '10px' }}>Si crees que es un error, contacta con nuestro equipo de soporte en <a href="mailto:soporte@gmail.com">soporte@gmail.com</a></p>
      </div>
    </div>
  );
}

export default NotServe;