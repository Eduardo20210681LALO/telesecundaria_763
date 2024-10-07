import React, { useState, useEffect } from 'react';
import { Breadcrumb, Select, Typography, Card, Button, message, Spin, Alert, Empty } from 'antd'; // Ant Design components
import SIDEBARDIRECT from '../../../components/SIDEBARDIRECT';
import BreadcrumDirect from './BreadcrumDirect';
import axios from 'axios';
import Chart from 'react-apexcharts';  // Importamos ApexCharts para los gráficos
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const { Option } = Select;

function EstadisticasGeneral() {
    const [periodos, setPeriodos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [estadisticas, setEstadisticas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selectedPeriodo, setSelectedPeriodo] = useState(null);
    const [selectedGrado, setSelectedGrado] = useState(null);
    const [selectedGrupo, setSelectedGrupo] = useState(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [periodosRes, gradosRes, gruposRes] = await Promise.all([
                    axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php'),
                    axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php'),
                    axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php'),
                ]);
                setPeriodos(periodosRes.data);
                setGrados(gradosRes.data);
                setGrupos(gruposRes.data);
            } catch (err) {
                message.error('Error al cargar los datos iniciales');
            }
        };

        fetchInitialData();
    }, []);

    const fetchEstadisticasGeneral = async () => {
        if (!selectedPeriodo || !selectedGrado || !selectedGrupo) {
            message.warning('Por favor seleccione todos los campos');
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost/TeleSecundaria763/Directivos/ObtenerEstadisticasGenerales.php', {
                params: {
                    periodo: selectedPeriodo,
                    grado: selectedGrado,
                    grupo: selectedGrupo,
                },
            });

            if (response.data && Array.isArray(response.data.estadisticas)) {
                setEstadisticas(response.data.estadisticas);
            } else {
                setError('No se encontraron estadísticas para la selección realizada.');
            }
        } catch (err) {
            setError('Error al obtener las estadísticas generales.');
        } finally {
            setLoading(false);
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

    // Configuración para el gráfico de barras con ApexCharts
    const optionsBar = {
        chart: {
            type: 'bar',
            height: 300,
            stacked: false,
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff']
            }
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            categories: labels || [],
        },
    };

    const seriesBar = [
        {
            name: 'Trimestre 1',
            data: T1 || [],
        },
        {
            name: 'Trimestre 2',
            data: T2 || [],
        },
        {
            name: 'Trimestre 3',
            data: T3 || [],
        },
        {
            name: 'Promedio General',
            data: promedioGeneral || [],
        },
    ];

    // Gráfico de Líneas (ApexCharts como área)
    const seriesLine = labels.map((label, idx) => ({
        name: label,
        data: [T1[idx], T2[idx], T3[idx], promedioGeneral[idx]]
    }));

    const optionsLine = {
        chart: {
            type: 'area',
            height: 300,
            zoom: {
                enabled: false
            }
        },
        colors: ['#00E396', '#FEB019', '#FF4560', '#775DD0'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 80, 100]
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        xaxis: {
            categories: ['Trimestre 1', 'Trimestre 2', 'Trimestre 3', 'Promedio Final'],
        },
        yaxis: {
            opposite: true,
        },
        legend: {
            horizontalAlign: 'left'
        }
    };

    // Nueva configuración para la gráfica de pastel (Pie) con ApexCharts
    const seriesPie = [T1.reduce((a, b) => a + b, 0), T2.reduce((a, b) => a + b, 0), T3.reduce((a, b) => a + b, 0)];
    const optionsPie = {
        colors: ['#008FFB', '#00E396', '#FEB019'],
        labels: ['Promedio T1', 'Promedio T2', 'Promedio T3'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };


    return (
        <SIDEBARDIRECT>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 60px)', padding: '20px', overflow: 'hidden' }}>
                <BreadcrumDirect />

                <Typography.Title level={2}>Estadísticas Generales</Typography.Title>

                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <Card
                        style={{
                            background: '#fff',
                            padding: '20px',
                            flexGrow: 1,
                            overflowY: 'auto',
                            overflowX: 'hidden', // Asegura que no haya scroll horizontal
                        }}
                    >
                        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <div style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '100%' }}> {/* Aseguramos que no se exceda del 100% */}
                                <div style={{ flex: 1 }}>
                                    <label className="block mb-2">Periodo:</label>
                                    <Select
                                        value={selectedPeriodo}
                                        placeholder="Seleccionar Periodo"
                                        onChange={setSelectedPeriodo}
                                        style={{
                                            width: '100%',
                                            height: '40px',
                                            borderRadius: '8px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    >
                                        {periodos.map(periodo => (
                                            <Option key={periodo.intClvPeriodo} value={periodo.intClvPeriodo}>
                                                {periodo.vchPeriodo}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <label className="block mb-2">Grado:</label>
                                    <Select
                                        value={selectedGrado}
                                        placeholder="Seleccionar Grado"
                                        onChange={setSelectedGrado}
                                        style={{
                                            width: '100%',
                                            height: '40px',
                                            borderRadius: '8px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    >
                                        {grados.map(grado => (
                                            <Option key={grado.intClvGrado} value={grado.intClvGrado}>
                                                {grado.vchGrado}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <label className="block mb-2">Grupo:</label>
                                    <Select
                                        value={selectedGrupo}
                                        placeholder="Seleccionar Grupo"
                                        onChange={setSelectedGrupo}
                                        style={{
                                            width: '100%',
                                            height: '40px',
                                            borderRadius: '8px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    >
                                        {grupos.map(grupo => (
                                            <Option key={grupo.intClvGrupo} value={grupo.intClvGrupo}>
                                                {grupo.vchGrupo}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <Button
                                    onClick={fetchEstadisticasGeneral}
                                    type="button"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'var(--first-color)',
                                        borderColor: 'transparent',
                                        color: '#fff',
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        height: '40px',
                                        width: '400px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                    onMouseOver={(event) => {
                                        event.currentTarget.style.backgroundColor = 'black';
                                    }}
                                    onMouseOut={(event) => {
                                        event.currentTarget.style.backgroundColor = 'var(--first-color)';
                                    }}
                                >
                                    Ver Estadísticas Generales
                                </Button>
                            </div>
                        </form>

                        {estadisticas.length === 0 ? (
                            <div className="flex justify-center items-center w-full h-64">
                                <Empty description="No hay datos" />
                            </div>
                        ) : (
                            <>
                                {/* Primer gráfico: Gráfico de Barras (ApexCharts) */}
                                <div className="flex flex-col items-center" style={{ maxWidth: '100%' }}>
                                    <br></br><br></br>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 text-center">Gráfico de Barras</h3>
                                    <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}> {/* Añadido overflow hidden aquí */}
                                        <Chart options={optionsBar} series={seriesBar} type="bar" height={300} />
                                    </div>
                                </div>

                                {/* Segundo gráfico: Gráfico de Líneas (ApexCharts como área) */}
                                <div className="flex flex-col items-center" style={{ maxWidth: '100%' }}>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 text-center">Gráfico de Líneas</h3>
                                    <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}> {/* Añadido overflow hidden aquí */}
                                        <Chart options={optionsLine} series={seriesLine} type="area" height={300} />
                                    </div>
                                </div>

                                {/* Gráfico de Pastel (ApexCharts Pie) */}
                                <div className="flex flex-col items-center" style={{ maxWidth: '100%' }}>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 text-center">Gráfico de Pastel</h3>
                                    <div style={{ width: '35%', maxWidth: '100%', overflow: 'hidden' }}>
                                        <Chart options={optionsPie} series={seriesPie} type="pie" height={300} />
                                    </div>
                                </div>
                            </>
                        )}
                    </Card>
                </div>
            </div>
        </SIDEBARDIRECT>
    );
}

export default EstadisticasGeneral;
