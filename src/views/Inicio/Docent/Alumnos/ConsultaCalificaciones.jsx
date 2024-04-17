import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardDocentes from '../../../../components/DashboardDocentes';
import NavDocentes from '../../../../components/NavDocentes';

function ConsultaCalificaciones() {
    const [alumnos, setAlumnos] = useState([]);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [calificaciones, setCalificaciones] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editCalificaciones, setEditCalificaciones] = useState([]);

    const idUsuario = localStorage.getItem('idUsuario');

    useEffect(() => {
        getAlumnos();
    }, []);

    const getAlumnos = () => {
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerAlumnosDelDocente.php', { //    http://localhost/TeleSecundaria763/traerAlumnosDelDocente.php
            idUsuario: idUsuario
        })
        .then(function(response) {
            setAlumnos(response.data.alumnos);
        })
        .catch(function(error) {
            console.error('Error al obtener los alumnos:', error);
        });
    };

    const getCalificacionesAlumno = (idAlumno) => {
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerCalificacionesAlumno.php', { // http://localhost/TeleSecundaria763/traerCalificacionesAlumno.php
            idAlumno: idAlumno
        })
        .then(function(response) {
            setCalificaciones(response.data.calificaciones);
            setModalOpen(true);
        })
        .catch(function(error) {
            console.error('Error al obtener las calificaciones:', error);
        });
    };

    const getEditCalificacionesAlumno = (idAlumno) => {
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerCalificacionAlumnoSoloAEditar.php', {//  http://localhost/TeleSecundaria763/traerCalificacionAlumnoSoloAEditar.php
            idAlumno: idAlumno
        })
        .then(function(response) {
            setEditCalificaciones(response.data.calificaciones);
            setEditModalOpen(true);
        })
        .catch(function(error) {
            console.error('Error al obtener las calificaciones:', error);
        });
    };

    const abrirModalSeleccionar = (idAlumno) => {
        setSelectedAlumno(idAlumno);
        getCalificacionesAlumno(idAlumno);
    };

    const abrirModalEditar = (idAlumno) => {
        setSelectedAlumno(idAlumno);
        getEditCalificacionesAlumno(idAlumno);
    };

    const cerrarModalEditar = () => {
        setEditModalOpen(false);
    };

    const ActualizarDatosPeriodo = (event) => {
        // Implementa la lógica para actualizar los datos del período
    };

    return (
        <div>
            <DashboardDocentes />
            <NavDocentes />
            <main className='mt-5 pl-52 mx-auto pl-28'>
                <section className="flex justify-center">
                    <div className="mx-auto max-w-screen-xl px-5 lg:px-12 w-4/6 bg-gray-50 dark:bg-gray-900 p-32">
                        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full whitespace-nowrap mt-2">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido Paterno</th>
                                            <th className="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido Materno</th>
                                            <th className="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                            <th className="px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {alumnos.map((alumno, index) => (
                                            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumno.vchAPaterno}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumno.vchAMaterno}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumno.vchNombre}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button onClick={() => abrirModalSeleccionar(alumno.intClvAlumnos)} className="text-blue-600 hover:text-blue-800 focus:outline-none">Seleccionar</button>
                                                    <button onClick={() => abrirModalEditar(alumno.intClvAlumnos)} className="text-blue-600 hover:text-blue-800 focus:outline-none">Editar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {modalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                    <div className="bg-white w-4/8 max-w-3xl:52rem p-6 rounded-lg shadow-lg overflow-x-auto">
                        <h3 className="text-lg font-semibold mb-4">Calificaciones de {selectedAlumno}</h3>
                        <table className="w-full whitespace-nowrap">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">Materia</th>
                                    <th className="border border-gray-300 px-4 py-2">Trimestre 1</th>
                                    <th className="border border-gray-300 px-4 py-2">Trimestre 2</th>
                                    <th className="border border-gray-300 px-4 py-2">Trimestre 3</th>
                                    <th className="border border-gray-300 px-4 py-2">Promedio Final</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calificaciones.map((calificacion, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                        <td className="border border-gray-300 px-4 py-2">{calificacion.materia}</td>
                                        <td className="border border-gray-300 px-4 py-2">{calificacion.Trimestre1}</td>
                                        <td className="border border-gray-300 px-4 py-2">{calificacion.Trimestre2}</td>
                                        <td className="border border-gray-300 px-4 py-2">{calificacion.Trimestre3}</td>
                                        <td className="border border-gray-300 px-4 py-2">{calificacion.PromFinal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={() => setModalOpen(false)} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Cerrar</button>
                    </div>
                </div>
            )}

            {editModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                    <div className="bg-white w-4/8 max-w-3xl p-6 rounded-lg shadow-lg overflow-x-auto">
                        <h3 className="text-lg font-semibold mb-4">Calificaciones de {selectedAlumno}</h3>
                        <table className="w-full whitespace-nowrap">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">Materia</th>
                                    <th className="border border-gray-300 px-4 py-2">Trimestre 1</th>
                                    <th className="border border-gray-300 px-4 py-2">Trimestre 2</th>
                                    <th className="border border-gray-300 px-4 py-2">Trimestre 3</th>
                                    <th className="border border-gray-300 px-4 py-2">Promedio Final</th>
                                </tr>
                            </thead>
                            <tbody>
                                {editCalificaciones.map((calificacion, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                        <td className="border border-gray-300 px-4 py-2">{calificacion.materia}</td>
                                        <td className="border border-gray-300 px-4 py-2">{calificacion.Trimestre1}</td>
                                        <td className="border border-gray-300 px-4 py-2">{calificacion.Trimestre2}</td>
                                        <td className="border border-gray-300 px-4 py-2">{calificacion.Trimestre3}</td>
                                        <td className="border border-gray-300 px-4 py-2">{calificacion.PromFinal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={cerrarModalEditar} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ConsultaCalificaciones;
