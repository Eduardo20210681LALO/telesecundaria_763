<<<<<<< HEAD
import React, { useState } from "react";
import { FiAlignRight } from "react-icons/fi"; // Icono de menú
import { CiCircleRemove } from "react-icons/ci"; // Icono de cerrar
import './../styles/ColorGuinda.css'; // Asegúrate de importar el archivo de estilos global
=======
import React from 'react';
import '../styles/Nav.css';
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
import logotelesecundaria763 from '../images/logotelesecundaria763.png';
import { Link } from 'react-router-dom';

const Nav = () => {
<<<<<<< HEAD
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* Nav fijo en la parte superior */}
      <nav className="fixed top-0 left-0 right-0 border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 shadow-lg z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={logotelesecundaria763}
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              TeleSecundaria 763
            </span>
          </a>

          {/* Botón hamburguesa solo visible en pantallas pequeñas */}
          <button
            onClick={toggleDrawer}
            type="button"
            className="text-gray-500 dark:text-gray-400 focus:outline-none md:hidden" // El botón solo se muestra en pantallas pequeñas
            aria-controls="navbar-hamburger"
            aria-expanded={isDrawerOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <FiAlignRight className="w-6 h-6" />
          </button>

          {/* Menú visible en pantallas grandes */}
          <div className="hidden md:flex space-x-8 font-medium">
            <a href="#inicio" className="text-[var(--first-color)] font-bold hover:text-black dark:text-[var(--first-color)] dark:hover:text-black">
              Inicio
            </a>

            <a href="#misión" className="text-[var(--first-color)] font-bold hover:text-black dark:text-[var(--first-color)] dark:hover:text-black">
              Misión
            </a>

            <a href="#visión" className="text-[var(--first-color)] font-bold hover:text-black dark:text-[var(--first-color)] dark:hover:text-black">
              Visión
            </a>

            <a href="#valores" className="text-[var(--first-color)] font-bold hover:text-black dark:text-[var(--first-color)] dark:hover:text-black">
              Valores
            </a>

            <a href="#" to="/QuienesSomos" className="text-[var(--first-color)] font-bold hover:text-black dark:text-[var(--first-color)] dark:hover:text-black">
              <Link>Quienes Somos</Link>
            </a>
          </div>

          {/* Drawer (menú lateral) en pantallas pequeñas */}
          <div
            className={`fixed top-0 right-0 h-full w-80 bg-gray-800 bg-opacity-30 z-40 md:hidden backdrop-blur-[2px] transition-all ease-out duration-400 transform ${
              isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Botón de cerrar en la parte superior derecha */}
            <button
              onClick={toggleDrawer}
              className="absolute top-4 right-4 text-black text-xl"
            >
              <CiCircleRemove className="w-8 h-8 text-black" /> {/* Icono de cerrar */}
            </button>

            {/* Contenedor con blur aplicado al contenido */}
            <div className="flex flex-col h-full p-4">
              <ul className="flex flex-col font-medium space-y-4">
                <li>
                  <a href="#inicio" className="block py-2 px-3 text-[var(--first-color)] font-bold hover:text-white dark:text-[var(--first-color)]">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#misión" className="block py-2 px-3 text-[var(--first-color)] font-bold hover:text-white dark:text-[var(--first-color)]">
                    Misión
                  </a>
                </li>
                <li>
                  <a href="#visión" className="block py-2 px-3 text-[var(--first-color)] font-bold hover:text-white dark:text-[var(--first-color)]">
                    Visión
                  </a>
                </li>
                <li>
                  <a href="#valores" className="block py-2 px-3 text-[var(--first-color)] font-bold hover:text-white dark:text-[var(--first-color)]">
                    Valores
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 text-[var(--first-color)] font-bold hover:text-white dark:text-[var(--first-color)]">
                    <Link to="/QuienesSomos" >Quienes Somos</Link>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
=======
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
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
