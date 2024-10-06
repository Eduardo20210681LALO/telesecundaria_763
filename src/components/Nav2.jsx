import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';
import logotelesecundaria763 from '../images/logotelesecundaria763.png';

const Nav2 = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <header className="l-header">
      <nav className="nav bd-grid">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logotelesecundaria763} alt="Logo TeleSecundaria 763" className="nav__logo-img" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
          <Link to='/home' className="nav__logo" style={{ textDecoration: 'none' }}>TeleSecundaria 763</Link>
        </div>

        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to='/home' className={`nav__link ${activeLink === 'home' ? 'active' : ''}`} style={{ textDecoration: 'none' }} onClick={() => handleLinkClick('home')}>Inicio</Link>
            </li>
            <li className="nav__item">
              <Link to='/Login'className={`nav__link ${activeLink === 'login' ? 'active' : ''}`}style={{ textDecoration: 'none' }}onClick={() => handleLinkClick('login')}>Login</Link>
            </li>
            <li className="nav__item">
              <Link to='/Registro'className={`nav__link ${activeLink === 'registro' ? 'active' : ''}`}style={{ textDecoration: 'none' }}onClick={() => handleLinkClick('registro')}>Registro</Link>
            </li>
          </ul>
        </div>

        <div className="nav__toggle" id="nav-toggle">
          <i className='bx bx-menu'></i>
        </div>
      </nav>
    </header>
  );
};

export default Nav2;