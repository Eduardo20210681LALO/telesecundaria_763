import React, { useState, useEffect } from 'react';
import { Breadcrumb, Select, Typography, Card, Button, message, Spin, Alert, Empty } from 'antd'; // Ant Design components
import SIDEBARDOCENT from '../../../../components/SIDEBARDOCENT';
import BreadcrumDocent from '../BreadcrumDocent';
import Chart from "react-apexcharts";  // Cambiamos a ApexCharts
import axios from 'axios';

const { Option } = Select;

function EstadisticasGrupalDocent() {
    const [periodos, setPeriodos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [calificaciones, setCalificaciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Estado para controlar la visibilidad de los trimestres
    const [visibleTrimestre2, setVisibleTrimestre2] = useState(false);
    const [visibleTrimestre3, setVisibleTrimestre3] = useState(false);
    const [visiblePromedio, setVisiblePromedio] = useState(false);
    
    // Inicializa los selectores como null para que los placeholders funcionen correctamente
    const [selectedPeriodo, setSelectedPeriodo] = useState(null);
    const [selectedGrado, setSelectedGrado] = useState(null);
    const [selectedGrupo, setSelectedGrupo] = useState(null);

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

    const fetchCalificacionesGrupo = () => {
        if (selectedPeriodo && selectedGrado && selectedGrupo) {
            setLoading(true);
            setError(null);

            axios.get('http://localhost/TeleSecundaria763/Directivos/ObtenerCalificacionesGrupo.php', {
                params: {
                    periodo: selectedPeriodo,
                    grado: selectedGrado,
                    grupo: selectedGrupo,
                }
            })
                .then(response => {
                    if (response.data && Array.isArray(response.data.calificaciones)) {
                        setCalificaciones(response.data.calificaciones);
                    } else {
                        setError('No se encontraron calificaciones para el grupo seleccionado.');
                    }
                    setLoading(false);
                })
                .catch(error => {
                    setError('Error al obtener las calificaciones del grupo.');
                    setLoading(false);
                });
        } else {
            message.warning('Por favor seleccione todos los campos');
        }
    };

    const procesarDatos = (calificaciones) => {
        const alumnos = [];
        const trimestre1 = [];
        const trimestre2 = [];
        const trimestre3 = [];
        const promedioGeneral = [];

        calificaciones.forEach(calif => {
            const nombreCompleto = `${calif.vchNombre} ${calif.vchAPaterno} ${calif.vchAMaterno}`;
            alumnos.push(nombreCompleto);
            trimestre1.push(calif.Trimestre1);
            trimestre2.push(calif.Trimestre2);
            trimestre3.push(calif.Trimestre3);
            promedioGeneral.push(calif.PromedioGeneralPeriodo);
        });

        return { alumnos, trimestre1, trimestre2, trimestre3, promedioGeneral };
    };

    const { alumnos, trimestre1, trimestre2, trimestre3, promedioGeneral } = procesarDatos(calificaciones);

    // Series dinámicas, dependiendo de qué trimestres están habilitados
    const series = [
        {
            name: 'Trimestre 1',
            data: trimestre1
        },
        visibleTrimestre2 && {
            name: 'Trimestre 2',
            data: trimestre2
        },
        visibleTrimestre3 && {
            name: 'Trimestre 3',
            data: trimestre3
        },
        visiblePromedio && {
            name: 'Promedio General',
            data: promedioGeneral
        }
    ].filter(Boolean); // Filtra los que están en `false` para que no se muestren

    const options = {
        chart: {
            type: 'bar',
            height: 60 * alumnos.length  // Ajuste dinámico de altura en función de la cantidad de alumnos
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '80%',  // Ajuste del grosor de las barras
                dataLabels: {
                    position: 'top'
                },
            }
        },
        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],  // Colores personalizados para las barras
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
            categories: alumnos,  // Los nombres de los alumnos
        },
        grid: {
            padding: {
                left: 20,
                right: 20,
                bottom: 10,
                top: 10
            }
        }
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
        <SIDEBARDOCENT>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 60px)', padding: '20px', overflowX: 'hidden' }}>
                <BreadcrumDocent />

                <Typography.Title level={2}>Estadísticas Alumnos por Grupo</Typography.Title>

                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <Card
                        style={{
                            background: '#fff',
                            padding: '20px',
                            flexGrow: 1,
                            overflowY: 'auto',
                            overflowX: 'hidden',
                        }}
                    >
                        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
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

                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                <Button
                                    onClick={fetchCalificacionesGrupo}
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
                                    Ver Calificaciones del Grupo
                                </Button>
                            </div>
                        </form>

                        {calificaciones.length === 0 ? (
                            <div className="flex justify-center items-center w-full h-64">
                                <Empty description="No hay datos" />
                            </div>
                        ) : (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 text-center">Gráfico de Barras</h3>
                                <Chart options={options} series={series} type="bar" height={60 * alumnos.length} />
                                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                    {!visibleTrimestre2 && (
                                        <Button onClick={() => setVisibleTrimestre2(true)} style={{ margin: '0 10px' }}>
                                            Mostrar Trimestre 2
                                        </Button>
                                    )}
                                    {!visibleTrimestre3 && visibleTrimestre2 && (
                                        <Button onClick={() => setVisibleTrimestre3(true)} style={{ margin: '0 10px' }}>
                                            Mostrar Trimestre 3
                                        </Button>
                                    )}
                                    {!visiblePromedio && visibleTrimestre3 && (
                                        <Button onClick={() => setVisiblePromedio(true)} style={{ margin: '0 10px' }}>
                                            Mostrar Promedio General
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </SIDEBARDOCENT>
    )
}

export default EstadisticasGrupalDocent