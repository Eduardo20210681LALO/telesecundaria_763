import React, { useState, useEffect } from 'react';
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';

function EgresarAlumnos() {
    const [periodos, setPeriodos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [selectedPeriodo, setSelectedPeriodo] = useState('');
    const [selectedGrado, setSelectedGrado] = useState('');
    const [selectedGrupo, setSelectedGrupo] = useState('');
    const [selectedAlumnos, setSelectedAlumnos] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // Obtener periodos, grados y grupos al montar el componente
    useEffect(() => {
        fetch('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php')
            .then(response => response.json())
            .then(data => {
                setPeriodos(data);
            })
            .catch(err => console.error('Error al obtener periodos:', err));

        fetch('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php') // Obtener grados dinámicamente
            .then(response => response.json())
            .then(data => {
                setGrados(data);
            })
            .catch(err => console.error('Error al obtener grados:', err));

        fetch('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php')
            .then(response => response.json())
            .then(data => {
                setGrupos(data);
            })
            .catch(err => console.error('Error al obtener grupos:', err));
    }, []);

    // Obtener alumnos del grado y el grupo seleccionado
    useEffect(() => {
        if (selectedPeriodo && selectedGrado && selectedGrupo) {
            fetch(`http://localhost/TeleSecundaria763/AdminAlumnos/TraerAlumnos.php?periodo=${selectedPeriodo}&grado=${selectedGrado}&grupo=${selectedGrupo}`)
                .then(response => response.json())
                .then(data => {
                    setAlumnos(data);
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

    // Mostrar modal para confirmar egreso
    const handleEgresar = () => {
        if (selectedAlumnos.length > 0) {
            setShowModal(true);
        } else {
            alert('Por favor, selecciona al menos un alumno.');
        }
    };

    // Confirmar egreso de los alumnos seleccionados
    const handleConfirmEgresar = () => {
        fetch('http://localhost/TeleSecundaria763/AdminAlumnos/RegistrarAlumnosEgresados.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                alumnos: selectedAlumnos,
                grupo: selectedGrupo,
                periodo: selectedPeriodo,
                grado: selectedGrado
            })
        }).then(response => response.json())
          .then(data => {
            if (data.success) {
                alert('Alumnos egresados correctamente.');
                setShowModal(false);
                setSelectedAlumnos([]); // Limpiar la selección
            } else {
                alert('Error al egresar alumnos.');
            }
        }).catch(err => {
            console.error('Error al egresar alumnos:', err);
            alert('Error al egresar alumnos.');
        });
    };

    return (
        <SIDEBARADMIN>
            <div className="flex flex-col md:flex-row justify-center w-full mx-auto mt-10 gap-6">
                <div className="flex-grow p-4">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-6" style={{ color: '#B8860B' }}>Egresar Alumnos</h2>

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

                        {/* Listado de alumnos con checkboxes */}
                        <div>
                            <h4 className="text-xl font-semibold mb-2 text-center text-gray-700 dark:text-gray-300">Alumnos</h4>
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
                                                    // type="checkbox"
                                                    className="form-checkbox h-8 w-8 text-blue-600 rounded-lg"
                                                    checked={selectedAlumnos.includes(alumno.vchCurpAlumno)}
                                                    onChange={() => handleSelectAlumno(alumno.vchCurpAlumno)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-700 dark:text-gray-300">No hay alumnos para los filtros seleccionados.</p>
                                )}
                            </div>
                        </div>

                        {/* Botón para egresar alumnos */}
                        <button onClick={handleEgresar} className="btn btn-primary mt-6">
                            Egresar Alumnos
                        </button>

                        {/* Modal para confirmar el egreso */}
                        {showModal && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                                    <h3 className="text-lg font-semibold mb-4">Confirmar Egreso de Alumnos</h3>
                                    <p>¿Estás seguro de que deseas egresar a los alumnos seleccionados?</p>
                                    <button onClick={handleConfirmEgresar} className="btn btn-success mt-4">Confirmar</button>
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

export default EgresarAlumnos;
