import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, message } from 'antd';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import SIDEBARDIRECT from "../../../components/SIDEBARDIRECT";

const { Option } = Select;

const colors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(102, 51, 153, 0.6)',
    'rgba(255, 140, 0, 0.6)',
    'rgba(60, 179, 113, 0.6)',
    'rgba(199, 21, 133, 0.6)',
    'rgba(218, 165, 32, 0.6)',
    'rgba(100, 149, 237, 0.6)',
    'rgba(210, 105, 30, 0.6)',
    'rgba(144, 238, 144, 0.6)',
    'rgba(139, 69, 19, 0.6)'
];

function AprovechamientoPMaterias() {
    const [periodos, setPeriodos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [datos, setDatos] = useState([]);
    const [selectedPeriodo, setSelectedPeriodo] = useState('');
    const [selectedGrado, setSelectedGrado] = useState('');
    const [selectedGrupo, setSelectedGrupo] = useState('');
    const [selectedTrimestre, setSelectedTrimestre] = useState('');

    useEffect(() => {
        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php')  //    http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php
            .then(response => setPeriodos(response.data))
            .catch(error => message.error('Error al obtener los periodos'));
        
        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php')  //      http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php
            .then(response => setGrados(response.data))
            .catch(error => message.error('Error al obtener los grados'));

        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php')   //     http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php
            .then(response => setGrupos(response.data))
            .catch(error => message.error('Error al obtener los grupos'));
    }, []);

    const fetchDatos = () => {
        console.log('datos a mandar', selectedPeriodo, selectedGrado, selectedGrupo, selectedTrimestre)
        if (selectedPeriodo && selectedGrado && selectedGrupo && selectedTrimestre) {
            axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/Directivos/ObtenerAprovechamientoPorMaterias.php', {   //    http://localhost/TeleSecundaria763/Directivos/ObtenerAprovechamientoPorMaterias.php
                params: {
                    periodo: selectedPeriodo,
                    grado: selectedGrado,
                    grupo: selectedGrupo,
                    trimestre: selectedTrimestre
                }
            })
                .then(response => {
                    if (Array.isArray(response.data)) {
                        setDatos(response.data);
                    } else {
                        message.error('Formato de datos incorrecto recibido de la API');
                    }
                })
                .catch(error => {
                    message.error('Error al obtener los datos de aprovechamiento por materia');
                });
        } else {
            message.error('Por favor seleccione todos los campos');
        }
    };

    const chartData = {
        labels: datos.map(d => d.vchNomMateria),
        datasets: [
            {
                label: 'Promedio de Materia',
                data: datos.map(d => d.Promedio_Materia),
                backgroundColor: datos.map((d, i) => colors[i % colors.length]),
                borderColor: datos.map((d, i) => colors[i % colors.length].replace('0.6', '1')),
                borderWidth: 1,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 10
            }
        }
    };

    return (
        <SIDEBARDIRECT>
            <div className="flex flex-col md:flex-row justify-between md:w-3/4 w-full mx-auto mt-10 gap-6">
                {/* Bloque de Información de Usuario */}

                <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-900">
                    <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700 dark:text-gray-300">Aprovechamiento por Materia</h2>
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
                            <button
                                onClick={fetchDatos}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Buscar Aprovechamiento
                            </button>
                        </div>
                        {datos.length > 0 && (
                            <div style={{ width: '100%', height: '500px' }}>
                                <Bar data={chartData} options={options} />
                            </div>
                        )}
                    </div>
                </main>

            </div>
        </SIDEBARDIRECT>
    );
}

export default AprovechamientoPMaterias;
