import React, { useState, useEffect } from 'react';
import { FaBars, FaBell, FaSearch, FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Define la función BorrarCookies fuera del componente funcional
const BorrarCookies = () => {
    Cookies.remove('token');
};

const NavBar2 = ({sidebarToggle2, setSidebarToggle2}) => {
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        setShowOptions(!showOptions);
    };

    const handleOptionClick = (path) => {
        navigate(path);
        setShowOptions(false);
        BorrarCookies(); // Llama a la función BorrarCookies aquí
    };

    return (
        <nav className='bg-gray-800 px-4 py-3 flex justify-between items-center fixed left-0 w-full z-50'>
        <div className='flex items-center text-xl'>
            <FaBars className='text-white mr-4 cursor-pointer' onClick={() => setSidebarToggle2(!sidebarToggle2)} />
            <span className='text-white font-semibold'>Telesecundaria 763</span>
        </div>

        <div className='flex items-center gap-x-5'>
            <div className='relative md:w-48'>
                <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                    <button className='p-1 focus:outline-none text-white'><FaSearch /></button>
                </span>
                <input type='text' className='w-full px-4 py-1 pl-10 rounded shadow outline-none hidden md:block bg-gray-700 text-white' placeholder='Search...' />
            </div>

            <div>
                <FaBell className='text-white w-6 h-6' />
            </div>

            <div className='relative'>
                <button className='text-white group' onClick={handleProfileClick}>
                    <FaUserCircle className='w-6 h-6 mt-1' />
                    <div className={`absolute bg-white rounded-lg shadow-md w-32 mt-2 top-full right-0 ${showOptions ? 'block' : 'hidden'}`}>
                        <ul className='py-2 text-sm text-gray-900'>
                            <li><button className="w-full px-4 py-2 text-left" onClick={() => handleOptionClick('/PerfilDocente')}>Perfil</button></li>
                            <li><button className="w-full px-4 py-2 text-left" onClick={() => handleOptionClick('/Home')}>Configuración</button></li>
                            <li><button className="w-full px-4 py-2 text-left" onClick={() => handleOptionClick('/Home')}>Cerrar Sesión</button></li>
                        </ul>
                    </div>
                </button>
            </div>


        </div>
    </nav>
    )
}

export default NavBar2