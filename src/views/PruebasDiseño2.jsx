import React, { useState } from 'react';
import PruebasDiseño from './PruebasDiseño'; // Asegúrate de que la ruta esté correcta
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons'; // Para el icono del menú (asegúrate de que la librería esté instalada)
import { Drawer, Button } from 'antd'; // Si estás usando Ant Design, mantén estas importaciones
import logotelesecundaria763 from '../images/logotelesecundaria763.png';
import { FiAlignRight } from "react-icons/fi"; // Icono de menú
import { CiCircleRemove } from "react-icons/ci"; // Icono de cerrar



function PruebasDiseño2() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 shadow-md"></nav>
      
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <nav className="container mx-auto flex justify-between items-center h-20 px-4">
      
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

     
          <div className="hidden md:flex">
            <ul className="flex space-x-8">
              <li>
                <a href="#inicio" className="text-gray-800 hover:text-[#7d0430]">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#misión" className="text-gray-800 hover:text-[#7d0430]">
                  Misión
                </a>
              </li>
              <li>
                <a href="#visión" className="text-gray-800 hover:text-[#7d0430]">
                  Visión
                </a>
              </li>
              <li>
                <a href="#valores" className="text-gray-800 hover:text-[#7d0430]">
                  Valores
                </a>
              </li>
              <li>
                <Link to="/QuienesSomos" className="text-gray-800 hover:text-[#7d0430]">
                  Quiénes Somos
                </Link>
              </li>
            </ul>
          </div>

          {/* Botón del menú para pantallas pequeñas */}
          <div className="flex md:hidden">
            <Button
              type="primary"
              onClick={showDrawer}
              icon={<MenuOutlined />}
              className="text-gray-800 bg-transparent hover:bg-gray-200"
            />
          </div>
          </nav>

          </div>
            {/* Menú visible en pantallas grandes */}
            <div className="hidden md:flex space-x-8 font-medium">
            <a href="#" className="text-[var(--first-color)] font-bold hover:text-black dark:text-[var(--first-color)] dark:hover:text-black">
              Inicio
            </a>

            <a href="#" className="text-[var(--first-color)] font-bold hover:text-black dark:text-[var(--first-color)] dark:hover:text-black">
              Misión
            </a>

            <a href="#" className="text-[var(--first-color)] font-bold hover:text-black dark:text-[var(--first-color)] dark:hover:text-black">
              Visión
            </a>

            <a href="#" className="text-[var(--first-color)] font-bold hover:text-black dark:text-[var(--first-color)] dark:hover:text-black">
              Valores
            </a>

            <a href="#" className="text-[var(--first-color)] font-bold hover:text-black dark:text-[var(--first-color)] dark:hover:text-black">
              Quienes Somos
            </a>

          </div>
        
        

 

      {/* Drawer para menú en dispositivos móviles */}
      <Drawer
        title="Menú"
        placement="right"
        onClose={closeDrawer}
        visible={visible}
        bodyStyle={{ backgroundColor: '#fff', color: '#000' }}
      >
        <ul className="flex flex-col space-y-4">
          <li>
            <a
              href="#inicio"
              className="text-gray-800 hover:text-[#7d0430]"
              onClick={closeDrawer}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#misión"
              className="text-gray-800 hover:text-[#7d0430]"
              onClick={closeDrawer}
            >
              Misión
            </a>
          </li>
          <li>
            <a
              href="#visión"
              className="text-gray-800 hover:text-[#7d0430]"
              onClick={closeDrawer}
            >
              Visión
            </a>
          </li>
          <li>
            <a
              href="#valores"
              className="text-gray-800 hover:text-[#7d0430]"
              onClick={closeDrawer}
            >
              Valores
            </a>
          </li>
          <li>
            <Link
              to="/QuienesSomos"
              className="text-gray-800 hover:text-[#7d0430]"
              onClick={closeDrawer}
            >
              Quiénes Somos
            </Link>
          </li>
        </ul>
      </Drawer>

    </>
    

  );
}

export default PruebasDiseño2;
