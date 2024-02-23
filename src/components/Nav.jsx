import React from 'react';
import '../styles/Nav.css';
import logo from '../images/logo.png';

const Nav = () => {
  return (
    <header className="l-header">
      <nav className="nav bd-grid">
        <div style={{display: 'flex', alignItems: 'center'}}>
          <img src={logo} alt="Logo TeleSecundaria 763" className="nav__logo-img" style={{width: '50px', height: '40px', marginRight: '10px'}} />
          <a href="#" className="nav__logo" style={{textDecoration: 'none'}}>TeleSecundaria 763</a>
        </div>

        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item"><a href="#home" className="nav__link active" style={{textDecoration: 'none'}}>Home</a></li>
            <li className="nav__item"><a href="#misión" className="nav__link" style={{textDecoration: 'none'}}>Misión</a></li>
            <li className="nav__item"><a href="#visión" className="nav__link" style={{textDecoration: 'none'}}>Visión</a></li>
            <li className="nav__item"><a href="#valores" className="nav__link" style={{textDecoration: 'none'}}>Valores</a></li>
            <li className="nav__item"><a href="#quienessomos" className="nav__link" style={{textDecoration: 'none'}}>Quienes Somos</a></li>
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