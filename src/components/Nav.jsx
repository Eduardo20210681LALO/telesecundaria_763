import React from 'react';
import '../styles/Nav.css';
import logo from '../images/logo.png';
import logotelesecundaria763 from '../images/logotelesecundaria763.png';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <header className="l-header" style={{ backgroundColor: '#fefefe' }}> {/* Color marfil */}
      <nav className="nav bd-grid" style={{ height: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logotelesecundaria763} alt="Logo TeleSecundaria 763" className="nav__logo-img" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
          <a href="#" className="nav__logo" style={{ textDecoration: 'none' }}>TeleSecundaria 763</a>
        </div>

        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item"><a href="#inicio" className="nav__link" style={{ textDecoration: 'none' }}>Inicio</a></li>
            <li className="nav__item"><a href="#misión" className="nav__link" style={{ textDecoration: 'none' }}>Misión</a></li>
            <li className="nav__item"><a href="#visión" className="nav__link" style={{ textDecoration: 'none' }}>Visión</a></li>
            <li className="nav__item"><a href="#valores" className="nav__link" style={{ textDecoration: 'none' }}>Valores</a></li>
            <li className="nav__item"><Link to="/QuienesSomos" className="nav__link" style={{ textDecoration: 'none' }}>Quiénes Somos</Link></li>
          </ul>
        </div>

        <div className="nav__toggle" id="nav-toggle">
          <i className='bx bx-menu'></i>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
