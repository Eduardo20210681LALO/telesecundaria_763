import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">TELESECUNDARIA 763.</p>
      <p>
        TELESECUNDARIA 763
        CARRETERA NACIONAL HUEJUTLA-ORIZATLAN KILOMETRO 4, TEPEXITITLA, HUEJUTLA DE REYES HIDALGO, CP. 43005.
      </p>
      <p>Teléfono: 123-456-7890</p>
      <p>Correo Electrónico: info@telesecundaria763.edu.mx</p>
      <br/>
      <div className="footer__social">
        <a href="#" className="footer__icon"><i className='bx bxl-facebook'></i></a>
        <a href="#" className="footer__icon"><i className='bx bxl-instagram'></i></a>
        <a href="#" className="footer__icon"><i className='bx bxl-twitter'></i></a>
      </div>
      <p className="footer__copy">&#169; Grupo de Interacción Digital 763</p>
    </footer>
  )
}

export default Footer;
