import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button, Select, TextInput } from "flowbite-react";
import NavDocentes from '../../../../components/NavDocentes';
import DashboardDocentes from '../../../../components/DashboardDocentes';

function CapturarCalificaciones() {
    const [idUsuario, setIdUsuario] = useState('');
    const [alumnos, setAlumnos] = useState([]);
    const [cargandoAlumnos, setCargandoAlumnos] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [periodos, setPeriodos] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);

    const [selectedPeriodo, setSelectedPeriodo] = useState('');
    const [selectedGrado, setSelectedGrado] = useState('');
    const [selectedGrupo, setSelectedGrupo] = useState('');
    const [selectedTrimestre, setSelectedTrimestre] = useState('');
    const [calificaciones, setCalificaciones] = useState([]);

    useEffect(() => {
        const idUsuarioLocalStorage = localStorage.getItem('idUsuario');
        setIdUsuario(idUsuarioLocalStorage);
    }, []);

    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                if (!idUsuario) {
                    throw new Error('No se proporcionó el ID de usuario en el frontend');
                }
                const url = `http://localhost/TeleSecundaria763/traerAlumnosDelDocente.php`;
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
                } else {
                    console.error('La respuesta indica un error:', responseData.message);
                }

                setCargandoAlumnos(false);
            } catch (error) {
                console.error('Error al obtener los datos de los alumnos:', error.message);
            }
        };

        fetchAlumnos();
    }, [idUsuario]);

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const response = await fetch('http://localhost/TeleSecundaria763/traerMaterias.php');
                if (!response.ok) {
                    throw new Error('Error al obtener las materias');
                }
                const data = await response.json();
                setMaterias(data);
                const initialCalificaciones = data.map(materia => ({
                    idMateria: materia.vchClvMateria,
                    calificacion: ''
                }));
                setCalificaciones(initialCalificaciones);
            } catch (error) {
                console.error('Error al obtener las materias:', error);
            }
        };

        fetchMaterias();
    }, []);

    useEffect(() => {
        const fetchGrados = async () => {
            try {
                const response = await fetch('http://localhost/TeleSecundaria763/traerGrados.php');
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
                const response = await fetch('http://localhost/TeleSecundaria763/traerGrupos.php');
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

    useEffect(() => {
        const fetchPeriodos = async () => {
            try {
                const response = await fetch('http://localhost/TeleSecundaria763/traerPeriodos.php');
                if (!response.ok) {
                    throw new Error('Error al obtener los periodos');
                }
                const datoss = await response.json();
                setPeriodos(datoss);
            } catch (error) {
                console.error('Error al obtener los periodos:', error);
            }
        };
        fetchPeriodos();
    }, []);

    const agarrarDatoDelPeriodo = (e) => {
        setSelectedPeriodo(e.target.value);
    };

    const agarrarDatoDelGrado = (e) => {
        setSelectedGrado(e.target.value);
    };

    const agarrarDatoDelGrupo = (e) => {
        setSelectedGrupo(e.target.value);
    };

    const handleTrimestreChange = (e) => {
        setSelectedTrimestre(e.target.value);
    };

    const handleAlumnoChange = (e) => {
        const selectedId = e.target.value;
        const selected = alumnos.find(alumno => alumno.intClvAlumnos === selectedId);
        setSelectedStudent(selected);
        // Limpiar calificaciones anteriores al cambiar de alumno
        const initialCalificaciones = materias.map(materia => ({
            idMateria: materia.vchClvMateria,
            calificacion: ''
        }));
        setCalificaciones(initialCalificaciones);
    };
    

    const handleCalificacionChange = (index, value) => {
        const newCalificaciones = [...calificaciones];
        newCalificaciones[index].calificacion = value;
        setCalificaciones(newCalificaciones);
    };

    const handleSubmit = async () => {
        // Verificar que se hayan seleccionado alumno, periodo y trimestre
        if (!selectedStudent || !selectedPeriodo || !selectedTrimestre) {
            console.error('Debes seleccionar alumno, periodo y trimestre');
            return;
        }
    
        // Crear objeto de datos de calificaciones
        const calificacionData = {
            intClvAlumnos: selectedStudent.intClvAlumnos,
            intClvPeriodo: selectedPeriodo,
            Trimestre: selectedTrimestre,
            calificaciones: calificaciones // Calificaciones almacenadas en el estado
        };
    
        // Enviar los datos al servidor  
        try {
            console.log('datos a enviarse', calificacionData);
            const url = 'http://localhost/TeleSecundaria763/insertarCalificacionDelAlumno.php'; // URL del servidor
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(calificacionData) // Enviar datos directamente sin el nivel 'concentrados'
            };
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error('Error al enviar los datos al servidor');
            }
            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
        } catch (error) {
            console.error('Error al enviar los datos al servidor:', error.message);
        }
    };

    return (
        <div className='flex h-screen'>
            <DashboardDocentes/>

            <div className='flex-grow'>
                <NavDocentes />
                <div className=''>
                    
                    <main className='mt-5 pl-52 mx-auto pl-28'>
                        <section class="flex justify-center">
                            <div class="mx-auto max-w-screen-xl px-4 lg:px-12 w-5/5 bg-gray-50 dark:bg-gray-900 p-32">
                                <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                                    <div class="overflow-x-auto ">
                                        <div className='container'>

                                            <div className='mb-2 block'>
                                                <label htmlFor="periodoSelect">Seleccione Periodo:</label>
                                                <Select id="periodoSelect" onChange={agarrarDatoDelPeriodo} value={selectedPeriodo}>
                                                    <option value="">Seleccione un periodo</option>
                                                    {periodos.map(periodo => (
                                                        <option key={periodo.id} value={periodo.intClvPeriodo}>{periodo.vchPeriodo}</option>
                                                    ))}
                                                </Select>
                                            </div>

                                            <div className='mb-2 block'>
                                                <label htmlFor="gradoSelect">Seleccione Grado:</label>
                                                <Select id="gradoSelect" onChange={agarrarDatoDelGrado} value={selectedGrado}>
                                                    <option value="">Seleccione un grado</option>
                                                    {grados.map(grado => (
                                                        <option key={grado.id} value={grado.intClvGrado}>{grado.vchGrado}</option>
                                                    ))}
                                                </Select>
                                            </div>

                                            <div className='mb-2 block'>
                                                <label htmlFor="grupoSelect">Seleccione Grupo:</label>
                                                <Select id="grupoSelect" onChange={agarrarDatoDelGrupo} value={selectedGrupo}>
                                                    <option value="">Seleccione un grupo</option>
                                                    {grupos.map(grupo => (
                                                        <option key={grupo.id} value={grupo.intClvGrupo}>{grupo.vchGrupo}</option>
                                                    ))}
                                                </Select>
                                            </div>

                                            <div className='mb-2 block'>
                                                <label htmlFor="trimestreSelect">Seleccione Trimestre:</label>
                                                <Select id="trimestreSelect" onChange={handleTrimestreChange} value={selectedTrimestre}>
                                                    <option value="">Seleccione un trimestre</option>
                                                    <option value="Trimestre1">Trimestre 1</option>
                                                    <option value="Trimestre2">Trimestre 2</option>
                                                    <option value="Trimestre3">Trimestre 3</option>
                                                </Select>
                                            </div>

                                            <div className='mb-2 block'>
                                                <label htmlFor="alumnoSelect">Seleccione Alumno:</label>
                                                <Select id="alumnoSelect" onChange={handleAlumnoChange}>
                                                    <option value="">Seleccione un alumno</option>
                                                    {alumnos.map(alumno => (
                                                        <option key={alumno.intClvAlumnos} value={alumno.intClvAlumnos}>{`${alumno.vchNombre} ${alumno.vchAPaterno} ${alumno.vchAMaterno}`}</option>
                                                    ))}
                                                </Select>
                                            </div>

                                            {selectedStudent && (
                                                <div className="overflow-x-auto">
                                                    <Table>
                                                        <TableHead>
                                                            <TableHeadCell>Matricula</TableHeadCell>
                                                            <TableHeadCell>Nombre del Alumno</TableHeadCell>
                                                            {materias.map(materia => (
                                                                <TableHeadCell key={materia.id}>{materia.vchNomMateria}</TableHeadCell>
                                                            ))}
                                                        </TableHead>
                                                        
                                                        <TableBody className="divide-y">
                                                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                                <TableCell>{selectedStudent.intClvAlumnos}</TableCell>
                                                                <TableCell>{`${selectedStudent.vchNombre} ${selectedStudent.vchAPaterno} ${selectedStudent.vchAMaterno}`}</TableCell>
                                                                {calificaciones.map((calificacion, index) => (
                                                                    <TableCell key={index}>
                                                                        <TextInput 
                                                                            type="number" 
                                                                            step="0.01" 
                                                                            placeholder="0.0" 
                                                                            required 
                                                                            min="0" 
                                                                            max="100" 
                                                                            value={calificacion.calificacion} 
                                                                            onChange={(e) => handleCalificacionChange(index, e.target.value)} 
                                                                        />
                                                                        <input type="hidden" value={calificacion.idMateria} />
                                                                    </TableCell>
                                                                ))}
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                    <Button onClick={handleSubmit}>Guardar Calificaciones</Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default CapturarCalificaciones;
