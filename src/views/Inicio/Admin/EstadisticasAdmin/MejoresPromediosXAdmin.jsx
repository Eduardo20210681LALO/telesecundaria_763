import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, message, Table, Button } from 'antd';
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';

const { Option } = Select;

function MejoresPromediosXAdmin() {
    const [periodos, setPeriodos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [selectedPeriodo, setSelectedPeriodo] = useState('');
    const [selectedGrado, setSelectedGrado] = useState('');
    const [selectedGrupo, setSelectedGrupo] = useState('');
    const [selectedTrimestre, setSelectedTrimestre] = useState('PromMateriaF');
    const [mejoresPromedios, setMejoresPromedios] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php')
            .then(response => setPeriodos(response.data))
            .catch(error => message.error('Error al obtener los periodos'));

        axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php')
            .then(response => setGrados(response.data))
            .catch(error => message.error('Error al obtener los grados'));

        axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php')
            .then(response => setGrupos(response.data))
            .catch(error => message.error('Error al obtener los grupos'));
    }, []);

    const fetchMejoresPromedios = () => {
        if (selectedPeriodo && selectedGrado && selectedGrupo) {
            setLoading(true);
            axios.get('http://localhost/TeleSecundaria763/Directivos/ObtenerMejoresPromedios.php', {
                params: {
                    periodo: selectedPeriodo,
                    grado: selectedGrado,
                    grupo: selectedGrupo,
                    trimestre: selectedTrimestre
                }
            })
                .then(response => {
                    if (Array.isArray(response.data)) {
                        setMejoresPromedios(response.data);
                    } else {
                        console.error('Los datos recibidos no son un array:', response.data);
                        message.error('Formato de datos incorrecto recibido de la API');
                    }
                    setLoading(false);
                })
                .catch(error => {
                    message.error('Error al obtener los mejores promedios');
                    setLoading(false);
                }
            );
        }
    };

    const columns = [
        { title: 'CURP', dataIndex: 'vchCurpAlumno', key: 'vchCurpAlumno' },
        { title: 'Nombre', dataIndex: 'vchNombre', key: 'vchNombre' },
        { title: 'Apellido Paterno', dataIndex: 'vchAPaterno', key: 'vchAPaterno' },
        { title: 'Apellido Materno', dataIndex: 'vchAMaterno', key: 'vchAMaterno' },
        { title: 'Mejor Promedio', dataIndex: 'MejorPromedio', key: 'MejorPromedio' },
    ];

    return (
        <SIDEBARADMIN>
            <div className="flex flex-col md:flex-row justify-between md:w-3/4 w-full mx-auto mt-10 gap-6">
                {/* Bloque de Información de Usuario */}

                <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-6">
                    <h2 className="text-3xl font-bold text-center mb-6" style={{ color: '#B8860B' }}>Mejores Promedios de Alumnos</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div>
                            <label htmlFor="select-periodo" className="block text-gray-700 dark:text-gray-300 mb-2">Seleccionar Periodo</label>
                            <Select
                                id="select-periodo"
                                placeholder="Seleccionar Periodo"
                                onChange={(value) => setSelectedPeriodo(value)}
                                className="w-full"
                            >
                                {periodos.map(periodo => (
                                    <Option key={periodo.intClvPeriodo} value={periodo.intClvPeriodo}>
                                        {periodo.vchPeriodo}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="select-grado" className="block text-gray-700 dark:text-gray-300 mb-2">Seleccionar Grado</label>
                            <Select
                                id="select-grado"
                                placeholder="Seleccionar Grado"
                                onChange={(value) => setSelectedGrado(value)}
                                className="w-full"
                            >
                                {grados.map(grado => (
                                    <Option key={grado.intClvGrado} value={grado.intClvGrado}>
                                        {grado.vchGrado}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="select-grupo" className="block text-gray-700 dark:text-gray-300 mb-2">Seleccionar Grupo</label>
                            <Select
                                id="select-grupo"
                                placeholder="Seleccionar Grupo"
                                onChange={(value) => setSelectedGrupo(value)}
                                className="w-full"
                            >
                                {grupos.map(grupo => (
                                    <Option key={grupo.intClvGrupo} value={grupo.intClvGrupo}>
                                        {grupo.vchGrupo}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="select-trimestre" className="block text-gray-700 dark:text-gray-300 mb-2">Seleccionar Trimestre</label>
                            <Select
                                id="select-trimestre"
                                placeholder="Seleccionar Trimestre"
                                onChange={(value) => setSelectedTrimestre(value)}
                                className="w-full"
                            >
                                <Option value="T1">Trimestre 1</Option>
                                <Option value="T2">Trimestre 2</Option>
                                <Option value="T3">Trimestre 3</Option>
                                <Option value="PromMateriaF">Promedio General</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-center mb-6">
                        <Button
                            onClick={fetchMejoresPromedios}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Buscar Promedios
                        </Button>
                    </div>
                    <Table
                        dataSource={mejoresPromedios}
                        columns={columns}
                        rowKey="vchCurpAlumno"
                        loading={loading}
                        pagination={false}
                        className="min-w-full bg-white dark:bg-gray-800 dark:text-gray-400"
                    />
                </div>
            </main>

            </div>
        </SIDEBARADMIN>
    );
    
}

export default MejoresPromediosXAdmin