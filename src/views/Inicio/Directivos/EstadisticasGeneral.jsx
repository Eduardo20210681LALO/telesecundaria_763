import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, LineElement, PointElement, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import { Select, Spin, Alert, Button, message, Empty } from 'antd';
import SIDEBARDIRECT from '../../../components/SIDEBARDIRECT';

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, PointElement, ArcElement, CategoryScale, LinearScale);

const { Option } = Select;

function EstadisticasGeneral() {
    const [periodos, setPeriodos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [estadisticas, setEstadisticas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Inicializar los estados como null para que los placeholders aparezcan
    const [selectedPeriodo, setSelectedPeriodo] = useState(null);
    const [selectedGrado, setSelectedGrado] = useState(null);
    const [selectedGrupo, setSelectedGrupo] = useState(null);

    useEffect(() => {
        axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php')
            .then(response => setPeriodos(response.data))
            .catch(() => message.error('Error al obtener los periodos'));

        axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php')
            .then(response => setGrados(response.data))
            .catch(() => message.error('Error al obtener los grados'));

        axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php')
            .then(response => setGrupos(response.data))
            .catch(() => message.error('Error al obtener los grupos'));
    }, []);

    const fetchEstadisticasGeneral = () => {
        if (selectedPeriodo && selectedGrado && selectedGrupo) {
            setLoading(true);
            setError(null);

            axios.get('http://localhost/TeleSecundaria763/Directivos/ObtenerEstadisticasGenerales.php', {
                params: {
                    periodo: selectedPeriodo,
                    grado: selectedGrado,
                    grupo: selectedGrupo,
                }
            })
                .then(response => {
                    if (response.data && Array.isArray(response.data.estadisticas)) {
                        setEstadisticas(response.data.estadisticas);
                    } else {
                        setError('No se encontraron estadísticas para la selección realizada.');
                    }
                    setLoading(false);
                })
                .catch(() => {
                    setError('Error al obtener las estadísticas generales.');
                    setLoading(false);
                });
        } else {
            message.error('Por favor seleccione todos los campos');
        }
    };

    const procesarDatos = (estadisticas) => {
        const grupos = [];
        const T1 = [];
        const T2 = [];
        const T3 = [];
        const promedioGeneral = [];

        estadisticas.forEach(est => {
            const nombreGrupo = `${est.vchGrado} ${est.vchGrupo}`;
            grupos.push(nombreGrupo);
            T1.push(est.T1);
            T2.push(est.T2);
            T3.push(est.T3);
            promedioGeneral.push(est.PromedioGeneralPeriodo);
        });

        return { grupos, T1, T2, T3, promedioGeneral };
    };

    const { grupos: labels, T1, T2, T3, promedioGeneral } = procesarDatos(estadisticas);

    const dataBar = {
        labels: labels,
        datasets: [
            {
                label: 'Trimestre 1',
                data: T1,
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
            },
            {
                label: 'Trimestre 2',
                data: T2,
                backgroundColor: 'rgba(54, 162, 235, 0.4)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Trimestre 3',
                data: T3,
                backgroundColor: 'rgba(255, 206, 86, 0.4)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
            {
                label: 'Promedio General',
                data: promedioGeneral,
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const dataDoughnut = {
        labels: ['Promedio T1', 'Promedio T2', 'Promedio T3'],
        datasets: [
            {
                data: [T1.reduce((a, b) => a + b, 0), T2.reduce((a, b) => a + b, 0), T3.reduce((a, b) => a + b, 0)],
                backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'],
                hoverBackgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            },
        ],
    };

    const dataLine = {
        labels: ['Trimestre 1', 'Trimestre 2', 'Trimestre 3', 'Promedio Final'],
        datasets: [
            {
                label: labels[0],
                data: [T1[0], T2[0], T3[0], promedioGeneral[0]],
                fill: false,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: 'rgba(54, 162, 235, 1)',
                pointRadius: 4,
                tension: 0.1,
            },
        ],
    };

    const optionsBar = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    const optionsLine = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 7,
                max: 10,
                ticks: {
                    stepSize: 0.5,
                },
                title: {
                    display: true,
                    text: 'Calificaciones',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Trimestres',
                },
            },
        },
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Alert message="Error" description={error} type="error" showIcon />
            </div>
        );
    }

    return (
        <SIDEBARDIRECT>
            <div className="flex flex-col justify-center items-center w-full mx-auto mt-10 gap-6 p-4">
                <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-6 w-full max-w-5xl">
                    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700 dark:text-gray-300">Estadísticas Generales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Periodo</label>
                            <Select
                                placeholder="Seleccionar Periodo"
                                onChange={setSelectedPeriodo}
                                value={selectedPeriodo}
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
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Grado</label>
                            <Select
                                placeholder="Seleccionar Grado"
                                onChange={setSelectedGrado}
                                value={selectedGrado}
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
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Grupo</label>
                            <Select
                                placeholder="Seleccionar Grupo"
                                onChange={setSelectedGrupo}
                                value={selectedGrupo}
                                className="w-full"
                            >
                                {grupos.map(grupo => (
                                    <Option key={grupo.intClvGrupo} value={grupo.intClvGrupo}>
                                        {grupo.vchGrupo}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <Button type="primary" onClick={fetchEstadisticasGeneral} className="mb-6 w-full">
                        Ver Estadísticas Generales
                    </Button>

                    {estadisticas.length === 0 ? (
                        <div className="flex justify-center items-center w-full h-64">
                            <Empty description="No hay datos" />
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-row justify-between gap-6 mb-6">
                                <div className="flex flex-col items-center flex-1">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 text-center">Gráfico de Barras</h3>
                                    <div className="w-full h-64">
                                        <Bar data={dataBar} options={optionsBar} />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 text-center">Gráfico de Dona</h3>
                                    <div className="flex justify-center w-full h-64">
                                        <Doughnut data={dataDoughnut} options={optionsBar} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 text-center">Gráfico de Líneas</h3>
                                <div className="flex justify-center w-full h-64">
                                    <Line data={dataLine} options={optionsLine} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </SIDEBARDIRECT>
    );
}

export default EstadisticasGeneral;
