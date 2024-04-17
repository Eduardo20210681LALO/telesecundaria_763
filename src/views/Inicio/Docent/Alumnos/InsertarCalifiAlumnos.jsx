import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput, Select } from "flowbite-react";
import NavDocentes from '../../../../components/NavDocentes';
import DashboardDocentes from '../../../../components/DashboardDocentes';

function InsertarCalifiAlumnos() {
    const [periodo, setPeriodo] = useState('');
    const [trimestre, setTrimestre] = useState('');
    const [grado, setGrado] = useState('');
    const [grupo, setGrupo] = useState('');
    const [alumnos, setAlumnos] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [calificaciones, setCalificaciones] = useState({});
    const [periodos, setPeriodos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    
    const [idUsuario, setIdUsuario] = useState('');

    useEffect(() => {
        const idUsuarioLocalStorage = localStorage.getItem('idUsuario');
        setIdUsuario(idUsuarioLocalStorage);
    }, []);

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerMaterias.php'); //            http://localhost/TeleSecundaria763/traerMaterias.php
                if (!response.ok) {
                    throw new Error('Error al obtener las materias');
                }
                const data = await response.json();
                setMaterias(data);
            } catch (error) {
                console.error('Error al obtener las materias:', error);
            }
        };

        fetchMaterias();
    }, []);

    useEffect(() => {
        const fetchPeriodos = async () => {
            try {
                const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerPeriodos.php'); //http://localhost/TeleSecundaria763/traerPeriodos.php
                if (!response.ok) {
                    throw new Error('Error al obtener los periodos');
                }
                const data = await response.json();
                setPeriodos(data);
            } catch (error) {
                console.error('Error al obtener los periodos:', error);
            }
        };

        fetchPeriodos();
    }, []);

    useEffect(() => {
        const fetchGrados = async () => {
            try {
                const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerGrados.php'); // http://localhost/TeleSecundaria763/traerGrados.php
                if (!response.ok) {
                    throw new Error('Error al obtener los grados');
                }
                const data = await response.json();
                setGrados(data);
            } catch (error) {
                console.error('Error al obtener los grados:', error);
            }
        };

        fetchGrados();
    }, []);

    useEffect(() => {
        const fetchGrupos = async () => {
            try {
                const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerGrupos.php'); // http://localhost/TeleSecundaria763/traerGrupos.php
                if (!response.ok) {
                    throw new Error('Error al obtener los grupos');
                }
                const data = await response.json();
                setGrupos(data);
            } catch (error) {
                console.error('Error al obtener los grupos:', error);
            }
        };

        fetchGrupos();
    }, []);

    const fetchAlumnos = async () => {
        try {
            if (!idUsuario) {
                throw new Error('No se proporcionó el ID de usuario en el frontend');
            }
            const url = 'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerAlumnosDelDocente.php'; //  http://localhost/TeleSecundaria763/traerAlumnosDelDocente.php
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idUsuario: idUsuario })
            };
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const responseData = await response.json();
            if (responseData.success) {
                setAlumnos(responseData.alumnos);
                // Inicializar calificaciones para cada alumno y materia
                const initialCalificaciones = {};
                responseData.alumnos.forEach(alumno => {
                    initialCalificaciones[alumno.intClvAlumnos] = {};
                    materias.forEach(materia => {
                        initialCalificaciones[alumno.intClvAlumnos][materia.intClvMateria] = '';
                    });
                });
                setCalificaciones(initialCalificaciones);
            } else {
                console.error('La respuesta indica un error:', responseData.message);
            }
        } catch (error) {
            console.error('Error al obtener los datos de los alumnos:', error.message);
        }
    };

    useEffect(() => {
        fetchAlumnos();
    }, [idUsuario]);

    const handleCalificacionChange = (alumnoId, materiaId, value) => {
        setCalificaciones(prevCalificaciones => ({
            ...prevCalificaciones,
            [alumnoId]: {
                ...prevCalificaciones[alumnoId],
                [materiaId]: value
            }
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        console.log('Datos a enviar al servidor:', {
            periodo,
            trimestre,
            grado,
            grupo,
            calificaciones
        });

        try {
            const response = await enviarCalificacionesAlServidor({
                periodo,
                trimestre,
                grado,
                grupo,
                calificaciones
            });
            console.log('Respuesta del servidor:', response);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center space-x-5">
                            <div className="h-14 w-14 bg-blue-500 rounded-full flex flex-shrink-0 justify-center items-center text-white text-2xl font-mono">i</div>
                            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                <h2 className="leading-relaxed">Captura de Calificaciones</h2>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">Ingrese las calificaciones para cada alumno.</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className='mb-2 block'>
                                        <label htmlFor="periodoSelect">Seleccione Periodo:</label>
                                        <Select id="periodoSelect" onChange={(e) => setPeriodo(e.target.value)} value={periodo}>
                                            <option value="">Seleccione un periodo</option>
                                            {periodos.map(periodo => (
                                                <option key={periodo.id} value={periodo.intClvPeriodo}>{periodo.vchPeriodo}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className='mb-2 block'>
                                        <label htmlFor="trimestreSelect">Seleccione Trimestre:</label>
                                        <Select id="trimestreSelect" onChange={(e) => setTrimestre(e.target.value)} value={trimestre}>
                                            <option value="">Seleccione un trimestre</option>
                                            <option value="Trimestre1">Trimestre 1</option>
                                            <option value="Trimestre2">Trimestre 2</option>
                                            <option value="Trimestre3">Trimestre 3</option>
                                        </Select>
                                    </div>
                                    <div className='mb-2 block'>
                                        <label htmlFor="gradoSelect">Seleccione Grado:</label>
                                        <Select id="gradoSelect" onChange={(e) => setGrado(e.target.value)} value={grado}>
                                            <option value="">Seleccione un grado</option>
                                            {grados.map(grado => (
                                                <option key={grado.id} value={grado.intClvGrado}>{grado.vchGrado}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className='mb-2 block'>
                                        <label htmlFor="grupoSelect">Seleccione Grupo:</label>
                                        <Select id="grupoSelect" onChange={(e) => setGrupo(e.target.value)} value={grupo}>
                                            <option value="">Seleccione un grupo</option>
                                            {grupos.map(grupo => (
                                                <option key={grupo.id} value={grupo.intClvGrupo}>{grupo.vchGrupo}</option>
                                            ))}
                                        </Select>
                                    </div>
                                    <Table>
                                        <TableHead>
                                            <TableHeadCell>Clave Alumno</TableHeadCell>
                                            <TableHeadCell>Nombre Completo</TableHeadCell>
                                            {materias.map(materia => (
                                                <TableHeadCell key={materia.intClvMateria}>{materia.vchNomMateria}</TableHeadCell>
                                            ))}
                                        </TableHead>
                                        <TableBody>
                                            {alumnos.map(alumno => (
                                                <TableRow key={alumno.intClvAlumnos}>
                                                    <TableCell>{alumno.intClvAlumnos}</TableCell>
                                                    <TableCell>{`${alumno.vchNombre} ${alumno.vchAPaterno} ${alumno.vchAMaterno}`}</TableCell>
                                                    {materias.map(materia => (
                                                        <TableCell key={materia.intClvMateria} >
                                                            <TextInput
                                                                type="number"
                                                                value={calificaciones[alumno.intClvAlumnos]?.[materia.intClvMateria] || ''}
                                                                onChange={(e) => handleCalificacionChange(alumno.intClvAlumnos, materia.intClvMateria, e.target.value)}
                                                            />
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="pt-4 flex items-center space-x-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                                    >
                                        Guardar Calificaciones
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InsertarCalifiAlumnos;
