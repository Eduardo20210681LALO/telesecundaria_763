import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';

function ReinscribirAlumXAdmin() {
    const [periodos, setPeriodos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [docentes, setDocentes] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [selectedPeriodo, setSelectedPeriodo] = useState('');
    const [selectedGrado, setSelectedGrado] = useState('');
    const [selectedGrupo, setSelectedGrupo] = useState('');
    const [selectedAlumnos, setSelectedAlumnos] = useState([]); // Para almacenar los alumnos seleccionados
    const [reinscritos, setReinscritos] = useState([]); // Para almacenar los alumnos que ya han sido reinscritos
    const [showModal, setShowModal] = useState(false); // Para manejar el estado del modal

    // Estados para los nuevos valores a asignar en el modal
    const [nuevoPeriodo, setNuevoPeriodo] = useState('');
    const [nuevoGrado, setNuevoGrado] = useState('');
    const [nuevoGrupo, setNuevoGrupo] = useState('');
    const [nuevoDocente, setNuevoDocente] = useState('');

    // Obtener periodos, grados, grupos y docentes al montar el componente 
    useEffect(() => {
        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php').then(res => {  //  http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php
            setPeriodos(res.data);
        }).catch(err => console.error('Error al obtener periodos:', err));

        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php').then(res => {  //   http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php
            setGrados(res.data);
        }).catch(err => console.error('Error al obtener grados:', err));

        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php').then(res => {   //   http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php
            setGrupos(res.data);
        }).catch(err => console.error('Error al obtener grupos:', err));

        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerDocentes.php').then(res => {   // http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerDocentes.php
            setDocentes(res.data);
        }).catch(err => console.error('Error al obtener docentes:', err));
    }, []);

    // Obtener alumnos cuando cambian el periodo, grado o grupo seleccionados
    useEffect(() => {
        if (selectedPeriodo && selectedGrado && selectedGrupo) {
            axios.get(`https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/TraerAlumnos.php?periodo=${selectedPeriodo}&grado=${selectedGrado}&grupo=${selectedGrupo}`)    //   http://localhost/TeleSecundaria763/AdminAlumnos/TraerAlumnos.php?periodo=${selectedPeriodo}&grado=${selectedGrado}&grupo=${selectedGrupo}
                .then(res => {
                    setAlumnos(res.data);
                    setSelectedAlumnos([]); // Limpiar selección previa
                })
                .catch(err => console.error('Error al obtener alumnos:', err));
        }
    }, [selectedPeriodo, selectedGrado, selectedGrupo]);

    // Manejar la selección de alumnos
    const handleSelectAlumno = (curp) => {
        setSelectedAlumnos(prevSelected => {
            if (prevSelected.includes(curp)) {
                return prevSelected.filter(alumno => alumno !== curp); // Desmarcar
            } else {
                return [...prevSelected, curp]; // Marcar
            }
        });
    };

    // Manejar la selección de todos los alumnos
    const handleSelectAll = () => {
        if (selectedAlumnos.length === alumnos.length) {
            setSelectedAlumnos([]); // Desmarcar todos
        } else {
            const noReinscritos = alumnos.filter(alumno => !reinscritos.includes(alumno.vchCurpAlumno));
            setSelectedAlumnos(noReinscritos.map(alumno => alumno.vchCurpAlumno)); // Marcar todos los que no están reinscritos
        }
    };

    // Mostrar modal para definir el nuevo periodo, grado, grupo y docente
    const handleReinscribir = () => {
        if (selectedAlumnos.length > 0) {
            setShowModal(true);
        } else {
            alert('Por favor, selecciona al menos un alumno.');
        }
    };

    // Confirmar reinscripción
    const handleConfirmReinscribir = () => {
        if (!nuevoPeriodo || !nuevoGrado || !nuevoGrupo || !nuevoDocente) {
            alert('Por favor completa todos los campos del modal.');
            return;
        }

        // Llamada a la API para reinscribir a los alumnos seleccionados
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ReinscribirAlumnos.php', {   //   http://localhost/TeleSecundaria763/AdminAlumnos/ReinscribirAlumnos.php
            alumnos: selectedAlumnos,
            nuevoGrado,
            nuevoGrupo,
            nuevoPeriodo,
            nuevoDocente
        }).then(res => {
            alert('Alumnos reinscritos correctamente.');

            // Agregar los alumnos reinscritos a la lista de "reinscritos"
            setReinscritos([...reinscritos, ...selectedAlumnos]);

            setShowModal(false);
            setSelectedAlumnos([]); // Limpiar la selección
            setNuevoPeriodo(''); // Limpiar los valores del modal
            setNuevoGrado('');
            setNuevoGrupo('');
            setNuevoDocente('');
        }).catch(err => {
            console.error('Error al reinscribir alumnos:', err);
            alert('Error al reinscribir alumnos.');
        });
    };

    return (
        <SIDEBARADMIN>
            <div className="flex flex-col md:flex-row justify-center w-full mx-auto mt-10 gap-6">
                <div className="flex-grow p-4">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-6" style={{ color: '#B8860B' }}>Reinscripción de Alumnos</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            {/* Filtros de periodo, grado y grupo */}
                            <div>
                                <label htmlFor="select-periodo" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Periodo:</label>
                                <select
                                    id="select-periodo"
                                    onChange={e => setSelectedPeriodo(e.target.value)}
                                    value={selectedPeriodo}
                                    className="block w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm"
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
                                    className="block w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm"
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
                                    className="block w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Seleccione un grupo</option>
                                    {grupos.map(grupo => (
                                        <option key={grupo.intClvGrupo} value={grupo.intClvGrupo}>{grupo.vchGrupo}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Checkbox para seleccionar todos */}
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Alumnos</h4>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600 rounded-lg"
                                    checked={selectedAlumnos.length === alumnos.length && alumnos.length > 0} // Selecciona todos si todos están seleccionados
                                    onChange={handleSelectAll}
                                />
                                <span className="ml-2 text-gray-700 dark:text-gray-300">Seleccionar Todos</span>
                            </label>
                        </div>

                        {/* Listado de alumnos con checkboxes a la derecha */}
                        <div className="h-60 overflow-y-auto">
                            {alumnos.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {alumnos.map(alumno => (
                                        <div key={alumno.vchCurpAlumno} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow-md flex justify-between items-center">
                                            <div className="text-gray-800 dark:text-gray-200 font-medium">
                                                <p>{alumno.vchNombre} {alumno.vchAPaterno} {alumno.vchAMaterno}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">CURP: {alumno.vchCurpAlumno}</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                className={`form-checkbox h-8 w-8 rounded-lg ${reinscritos.includes(alumno.vchCurpAlumno) ? 'text-green-600' : 'text-blue-600'}`}
                                                checked={selectedAlumnos.includes(alumno.vchCurpAlumno)}
                                                onChange={() => handleSelectAlumno(alumno.vchCurpAlumno)}
                                                disabled={reinscritos.includes(alumno.vchCurpAlumno)} // Deshabilitar si ya fue reinscrito
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-700 dark:text-gray-300">No hay alumnos para los filtros seleccionados.</p>
                            )}
                        </div>

                        {/* Botón para reinscribir alumnos */}
                        <button onClick={handleReinscribir} className="btn btn-primary mt-6">
                            Reinscribir Alumnos
                        </button>

                        {/* Modal para definir nuevo periodo, grado, grupo y docente */}
                        {showModal && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                                    <h3 className="text-lg font-semibold mb-4">Definir Nuevo Periodo, Grado, Grupo y Docente</h3>

                                    {/* Select de Nuevo Periodo */}
                                    <label htmlFor="nuevo-periodo" className="block text-sm font-medium text-gray-700 mb-2">Nuevo Periodo:</label>
                                    <select
                                        id="nuevo-periodo"
                                        value={nuevoPeriodo}
                                        onChange={(e) => setNuevoPeriodo(e.target.value)}
                                        className="block w-full p-3 border border-gray-300 rounded-md shadow-sm mb-4"
                                    >
                                        <option value="">Seleccione un nuevo periodo</option>
                                        {periodos.map(periodo => (
                                            <option key={periodo.intClvPeriodo} value={periodo.intClvPeriodo}>{periodo.vchPeriodo}</option>
                                        ))}
                                    </select>

                                    {/* Select de Nuevo Grado */}
                                    <label htmlFor="nuevo-grado" className="block text-sm font-medium text-gray-700 mb-2">Nuevo Grado:</label>
                                    <select
                                        id="nuevo-grado"
                                        value={nuevoGrado}
                                        onChange={(e) => setNuevoGrado(e.target.value)}
                                        className="block w-full p-3 border border-gray-300 rounded-md shadow-sm mb-4"
                                    >
                                        <option value="">Seleccione un nuevo grado</option>
                                        {grados.map(grado => (
                                            <option key={grado.intClvGrado} value={grado.intClvGrado}>{grado.vchGrado}</option>
                                        ))}
                                    </select>

                                    {/* Select de Nuevo Grupo */}
                                    <label htmlFor="nuevo-grupo" className="block text-sm font-medium text-gray-700 mb-2">Nuevo Grupo:</label>
                                    <select
                                        id="nuevo-grupo"
                                        value={nuevoGrupo}
                                        onChange={(e) => setNuevoGrupo(e.target.value)}
                                        className="block w-full p-3 border border-gray-300 rounded-md shadow-sm mb-4"
                                    >
                                        <option value="">Seleccione un nuevo grupo</option>
                                        {grupos.map(grupo => (
                                            <option key={grupo.intClvGrupo} value={grupo.intClvGrupo}>{grupo.vchGrupo}</option>
                                        ))}
                                    </select>

                                    <label htmlFor="nuevo-docente" className="block text-sm font-medium text-gray-700 mb-2">Nuevo Docente:</label>
                                    <select
                                        id="nuevo-docente"
                                        value={nuevoDocente}
                                        onChange={(e) => setNuevoDocente(e.target.value)}
                                        className="block w-full p-3 border border-gray-300 rounded-md shadow-sm mb-4"
                                    >
                                        <option value="">Seleccione un nuevo docente</option>
                                        {docentes.length > 0 ? (
                                            docentes.map(docente => (
                                                <option key={docente.id_usuario} value={docente.id_usuario}>
                                                    {docente.vch_nombre} {docente.vch_APaterno} {docente.vch_AMaterno}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">No hay docentes disponibles</option>
                                        )}
                                    </select>

                                    <button onClick={handleConfirmReinscribir} className="btn btn-success mt-4">Confirmar Reinscripción</button>
                                    <button onClick={() => setShowModal(false)} className="btn btn-secondary mt-4">Cancelar</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </SIDEBARADMIN>
    );
}

export default ReinscribirAlumXAdmin;
