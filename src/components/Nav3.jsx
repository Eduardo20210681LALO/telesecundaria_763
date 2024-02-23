import React from 'react';
import '../styles/Nav.css';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

const Nav3 = () => {
  return (
    <header className="l-header">
      <nav className="nav bd-grid">
        <div style={{display: 'flex', alignItems: 'center'}}>
          <img src={logo} alt="Logo TeleSecundaria 763" className="nav__logo-img" style={{width: '50px', height: '40px', marginRight: '10px'}} />
          <Link to='/home' className="nav__logo" style={{textDecoration: 'none'}} >TeleSecundaria 763</Link>
        </div>
        
        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
          <li className="nav__item"><Link to='/home' className="nav__link active" style={{textDecoration: 'none'}}>Home</Link></li>
          </ul>
        </div>

        <div className="nav__toggle" id="nav-toggle">
          <i className='bx bx-menu'></i>
        </div>
      </nav>
    </header>
  );
};

export default Nav3;