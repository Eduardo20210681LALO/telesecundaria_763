import React, { useState } from 'react';
import { FaCog, FaHome, FaPoll, FaRegEnvelope, FaUserGraduate } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Sidebar2 = ({sidebarToggle2}) => {
    const [showOptions, setShowOptions] = useState(false);
    const [showOptions2, setShowOptions2] = useState(false);
    const [showOptions3, setShowOptions3] = useState(false);
    
    const handleItemClick = () => {
        setShowOptions(!showOptions);
    };

    const handleItemClick2 = () => {
        setShowOptions2(!showOptions2);
    };

    const handleItemClick3 = () => {
        setShowOptions3(!showOptions3);
    };

    return (
    <div className={`${sidebarToggle2? " hidden " : " block "}w-64 bg-gray-800 fixed h-full px-4 py-2`}>
        <div className='my-2 mb-4'>
            <h1 className='text-2x text-white font-bold'>Panel de Administración</h1>
        </div>
        <hr/>
        <ul className='mt-3 text-white fond-bold'>

            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                <Link to='/HomeAdministrativos' className='px-3'>
                    <FaHome className='inline-block w-6 h-6 mr-2 -mt-2'></FaHome>
                    Inicio
                </Link>
            </li>
            
            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                <a className='px-3' onClick={handleItemClick}>
                    <FaUserGraduate className='inline-block w-6 h-6 mr-2 -mt-2' />
                    Alumnos
                </a>
                {showOptions && (
                    <div className='ml-6'>
                        <ul>
                        <li><Link to="/CapturaCalificaciones"><button>Capturar Calificaciones</button></Link></li>
                        <li><Link to="/CrearGradoygrupo"><button>Consulta Calificaciones</button></Link></li>
                        <li><Link to="/AsignarDocenteGradoYgrupo"><button>Listar Alumnos</button></Link></li>
                        </ul>
                    </div>
                )}
            </li>


            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                <a href='#' className='px-3' onClick={handleItemClick3}>
                    <FaPoll className='inline-block w-6 h-6 mr-2 -mt-2'></FaPoll>
                    Estadisticas
                </a>
                {showOptions3 && (
                    <div className='ml-6'>
                        <ul>
                            <li>Ver estadisticas</li>
                            <li>Ver Diagramas</li>
                            <li>Ver Periodos</li>
                        </ul>
                    </div>
                )}
            </li>

            <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                <a href='' className='px-3'>
                    <FaCog className='inline-block w-6 h-6 mr-2 -mt-2'></FaCog>
                    Ajustes
                </a>
            </li>

        </ul>

    </div>
    )
}

export default Sidebar2