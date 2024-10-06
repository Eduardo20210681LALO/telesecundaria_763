import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';

function TodosAlum() {
    const [periodos, setPeriodos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [selectedPeriodo, setSelectedPeriodo] = useState('');
    const [selectedGrado, setSelectedGrado] = useState('');
    const [selectedGrupo, setSelectedGrupo] = useState('');

    useEffect(() => {
        // Obtener periodos, grados y grupos al montar el componente
        axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php').then(res => {
            console.log('Periodos:', res.data);
            setPeriodos(res.data);
        }).catch(err => console.error('Error al obtener periodos:', err));  

        axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php').then(res => {
            console.log('Grados:', res.data);
            setGrados(res.data);
        }).catch(err => console.error('Error al obtener grados:', err));

        axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php').then(res => {
            console.log('Grupos:', res.data);
            setGrupos(res.data);
        }).catch(err => console.error('Error al obtener grupos:', err));
    }, []);

    useEffect(() => {
        // Obtener alumnos cuando cambian el periodo, grado o grupo seleccionados
        if (selectedPeriodo && selectedGrado && selectedGrupo) {
            console.log('Datos a mandar', { selectedGrado, selectedGrupo, selectedPeriodo });
            axios.get(`http://localhost/TeleSecundaria763/AdminAlumnos/TraerAlumnos.php?periodo=${selectedPeriodo}&grado=${selectedGrado}&grupo=${selectedGrupo}`)
                .then(res => {
                    console.log('Alumnos:', res.data);
                    setAlumnos(res.data);
                })
                .catch(err => console.error('Error al obtener alumnos:', err));
        }
    }, [selectedPeriodo, selectedGrado, selectedGrupo]);

    
    return (
        <SIDEBARADMIN>
            <div className="flex flex-col md:flex-row justify-center w-full mx-auto mt-10 gap-6">
                {/* Contenedor principal */}
                <div className="flex-grow p-4">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-6" style={{ color: '#B8860B' }}>Visualización Alumnos Inscritos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div>
                                <label htmlFor="select-periodo" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Periodo:</label>
                                <select
                                    id="select-periodo"
                                    onChange={e => setSelectedPeriodo(e.target.value)}
                                    value={selectedPeriodo}
                                    className="block w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Seleccione un periodo</option>
                                    {periodos.map(periodo => (
                                        <option key={periodo.intClvPeriodo} value={periodo.intClvPeriodo}>{periodo.vchPeriodo}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="select-grado" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Grado:</label>
                                <select
                                    id="select-grado"
                                    onChange={e => setSelectedGrado(e.target.value)}
                                    value={selectedGrado}
                                    className="block w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Seleccione un grado</option>
                                    {grados.map(grado => (
                                        <option key={grado.intClvGrado} value={grado.intClvGrado}>{grado.vchGrado}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="select-grupo" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Grupo:</label>
                                <select
                                    id="select-grupo"
                                    onChange={e => setSelectedGrupo(e.target.value)}
                                    value={selectedGrupo}
                                    className="block w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Seleccione un grupo</option>
                                    {grupos.map(grupo => (
                                        <option key={grupo.intClvGrupo} value={grupo.intClvGrupo}>{grupo.vchGrupo}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-2 text-center text-gray-700 dark:text-gray-300"></h4>
                            <div className="h-60 overflow-y-auto"> {/* Contenedor con altura fija y scroll reducido */}
                                {alumnos.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {alumnos.map(alumno => (
                                            <div key={alumno.vchCurpAlumno} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow-md flex flex-col items-center justify-between">
                                                <div className="text-gray-800 dark:text-gray-200 font-medium text-center">
                                                    <p>{alumno.vchNombre} {alumno.vchAPaterno} {alumno.vchAMaterno}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">CURP: {alumno.vchCurpAlumno}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-700 dark:text-gray-300">No hay alumnos para los filtros seleccionados.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SIDEBARADMIN>
    );
};

export default TodosAlum;
