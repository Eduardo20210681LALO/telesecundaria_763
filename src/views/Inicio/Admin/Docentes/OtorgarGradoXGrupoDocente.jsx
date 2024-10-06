import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';

// Funciones para obtener docentes, grados, grupos y periodos
const getDocentes = () => {
    return axios.get('http://localhost/TeleSecundaria763/AdminDocentes/ListDocentes.php');
};

const getGrados = () => {
    return axios.get('http://localhost/TeleSecundaria763/AdminDocentes/ListGrados.php');
};

const getGrupos = () => {
    return axios.get('http://localhost/TeleSecundaria763/AdminDocentes/ListGrupos.php');
};

const getPeriodos = () => {
    return axios.get('http://localhost/TeleSecundaria763/AdminDocentes/ListPeriodos.php');
};

// Función para asignar grado y grupo a un docente
const assignGradoGrupo = (docenteId, gradoId, grupoId, periodoId) => {
    return axios.post('http://localhost/TeleSecundaria763/AdminDocentes/AssignGradoGrupo.php', {
        docenteId,
        gradoId,
        grupoId,
        periodoId
    });
};

function OtorgarGradoXGrupoDocente() {
    const [docentes, setDocentes] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [selectedDocente, setSelectedDocente] = useState('');
    const [selectedGrado, setSelectedGrado] = useState('');
    const [selectedGrupo, setSelectedGrupo] = useState('');
    const [selectedPeriodo, setSelectedPeriodo] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const docentesResponse = await getDocentes();
            const gradosResponse = await getGrados();
            const gruposResponse = await getGrupos();
            const periodosResponse = await getPeriodos();

            // Verificar si la respuesta es un arreglo
            setDocentes(Array.isArray(docentesResponse.data) ? docentesResponse.data : []);
            setGrados(Array.isArray(gradosResponse.data) ? gradosResponse.data : []);
            setGrupos(Array.isArray(gruposResponse.data) ? gruposResponse.data : []);
            setPeriodos(Array.isArray(periodosResponse.data) ? periodosResponse.data : []);

            console.log('Docentes:', docentesResponse.data);
            console.log('Grados:', gradosResponse.data);
            console.log('Grupos:', gruposResponse.data);
            console.log('Periodos:', periodosResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await assignGradoGrupo(selectedDocente, selectedGrado, selectedGrupo, selectedPeriodo);
            alert('Grado y grupo asignados correctamente');
            // Limpiar los campos seleccionados
            setSelectedDocente('');
            setSelectedGrado('');
            setSelectedGrupo('');
            setSelectedPeriodo('');
        } catch (error) {
            console.error('Error assigning grado and grupo:', error);
            alert('Error al asignar grado y grupo');
        }
    };
    return (
        <SIDEBARADMIN>
            <div className="flex justify-center w-full mx-auto mt-10">
                <div className="flex flex-col w-full overflow-y-auto p-6">
                    <div className="mt-10 mx-auto w-full max-w-screen-lg">
                        <section className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden p-8">
                            <h2 className="text-3xl font-bold text-center mb-6" style={{ color: '#B8860B' }}>Asignar Grado y Grupo a Docente</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Docente:</label>
                                        <select
                                            value={selectedDocente}
                                            onChange={(e) => setSelectedDocente(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                        >
                                            <option value="">Seleccione un docente</option>
                                            {docentes.map((docente) => (
                                                <option key={docente.id} value={docente.id}>{docente.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grado:</label>
                                        <select
                                            value={selectedGrado}
                                            onChange={(e) => setSelectedGrado(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                        >
                                            <option value="">Seleccione un grado</option>
                                            {grados.map((grado) => (
                                                <option key={grado.id} value={grado.id}>{grado.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grupo:</label>
                                        <select
                                            value={selectedGrupo}
                                            onChange={(e) => setSelectedGrupo(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                        >
                                            <option value="">Seleccione un grupo</option>
                                            {grupos.map((grupo) => (
                                                <option key={grupo.id} value={grupo.id}>{grupo.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Periodo:</label>
                                        <select
                                            value={selectedPeriodo}
                                            onChange={(e) => setSelectedPeriodo(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                        >
                                            <option value="">Seleccione un periodo</option>
                                            {periodos.map((periodo) => (
                                                <option key={periodo.id} value={periodo.id}>{periodo.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button type="submit" className="mt-4 w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700">Asignar Grado y Grupo a Docente</button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </SIDEBARADMIN>
    );
    
}

export default OtorgarGradoXGrupoDocente;
