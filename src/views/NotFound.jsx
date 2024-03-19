import React from 'react'
import error404 from '../images/error404.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function NotFound() {
  return (
    <div className="error-body">
      <div className="error-container text-center">
        <h1>Uops!</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={error404} alt="Error 404" className="error-image" />
        </div>
        <h2 className="error-heading">La Página no se ha encontrado</h2>
        <p className="error-message">Lo sentimos, la página que estás buscando no existe. Si cree que algo no funciona, por favor informe un problema.</p>
        <button onClick={() => window.history.back()} className="btn btn-primary" style={{ backgroundColor: 'var(--first-color)', borderColor: '#004b9b', color: '#fff', padding: '10px 20px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}>Volver</button>
        <p className="error-message-support">Si crees que es un error, contacta con nuestro equipo de soporte en <a href="mailto:soporte@gmail.com">soporte@gmail.com</a></p>
      </div>
    </div>
  );
}

export default NotFound