import React, { useState, useEffect } from 'react';
import { Breadcrumb, Select, Typography, Card, Button, message, Spin, Alert, Empty } from 'antd'; // Ant Design components
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';
import BreadcrumbAdmin from '../BreadcrumbAdmin';
import Chart from "react-apexcharts";  // Cambiamos a ApexCharts
import axios from 'axios';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, LineElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, LineElement, CategoryScale, LinearScale);

const { Option } = Select;

function EstadisticasIndividualXAdmin() { 
    const [periodos, setPeriodos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [calificaciones, setCalificaciones] = useState([]);
    const [promediosGenerales, setPromediosGenerales] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selectedPeriodo, setSelectedPeriodo] = useState(null); // Inicializa en null para placeholder
    const [selectedGrado, setSelectedGrado] = useState(null);
    const [selectedGrupo, setSelectedGrupo] = useState(null);
    const [selectedAlumno, setSelectedAlumno] = useState(null);

    useEffect(() => {
        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php')   //  http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php
            .then(response => setPeriodos(response.data))
            .catch(error => message.error('Error al obtener los periodos'));

        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php')   //   http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php
            .then(response => setGrados(response.data))
            .catch(error => message.error('Error al obtener los grados'));

        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php')   //   http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php
            .then(response => setGrupos(response.data))
            .catch(error => message.error('Error al obtener los grupos'));
    }, []);

    useEffect(() => {
        if (selectedPeriodo && selectedGrado && selectedGrupo) {
            axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/Directivos/ObtenerAlumnosPorGrupo.php', {   //  http://localhost/TeleSecundaria763/Directivos/ObtenerAlumnosPorGrupo.php
                params: {
                    periodo: selectedPeriodo,
                    grado: selectedGrado,
                    grupo: selectedGrupo,
                }
            })
                .then(response => setAlumnos(response.data))
                .catch(error => message.error('Error al obtener los alumnos'));
        }
    }, [selectedPeriodo, selectedGrado, selectedGrupo]);

    const fetchCalificaciones = () => {
        // Validación para asegurarse de que todas las opciones estén seleccionadas
        if (!selectedPeriodo) {
            message.warning('Por favor selecciona un Periodo');
            return;
        }
        if (!selectedGrado) {
            message.warning('Por favor selecciona un Grado');
            return;
        }
        if (!selectedGrupo) {
            message.warning('Por favor selecciona un Grupo');
            return;
        }
        if (!selectedAlumno) {
            message.warning('Por favor selecciona un Alumno');
            return;
        }

        // Si todas las validaciones pasan, se procede con las llamadas a la API
        setLoading(true);
        setError(null);

        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/Directivos/ObtenerCalificacionesAlumno.php', {   //   http://localhost/TeleSecundaria763/Directivos/ObtenerCalificacionesAlumno.php
            params: {
                periodo: selectedPeriodo,
                grado: selectedGrado,
                grupo: selectedGrupo,
                alumno: selectedAlumno,
            }
        })
            .then(response => {
                if (response.data && Array.isArray(response.data.calificaciones)) {
                    setCalificaciones(response.data.calificaciones);
                } else {
                    setError('No se encontraron calificaciones para el alumno seleccionado.');
                }
                setLoading(false);
            })
            .catch(error => {
                setError('Error al obtener las calificaciones.');
                setLoading(false);
            });

        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/Directivos/ObtenerPromediosGenerales.php', {    //   http://localhost/TeleSecundaria763/Directivos/ObtenerPromediosGenerales.php
            params: {
                alumno: selectedAlumno,
                periodo: selectedPeriodo,
            }
        })
            .then(response => {
                if (response.data && response.data.promedios) {
                    setPromediosGenerales(response.data.promedios);
                } else {
                    setError('No se encontraron promedios generales para el alumno seleccionado.');
                }
                setLoading(false);
            })
            .catch(error => {
                setError('Error al obtener los promedios generales.');
                setLoading(false);
            });
    };

    const procesarDatos = (calificaciones) => {
        const materias = [];
        const trimestre1 = [];
        const trimestre2 = [];
        const trimestre3 = [];
        const promedioFinal = [];

        calificaciones.forEach(calif => {
            materias.push(calif.Materia);
            trimestre1.push(calif.PromedioTrimestre1);
            trimestre2.push(calif.PromedioTrimestre2);
            trimestre3.push(calif.PromedioTrimestre3);
            promedioFinal.push(calif.PromedioFinal);
        });

        return { materias, trimestre1, trimestre2, trimestre3, promedioFinal };
    };

    const { materias, trimestre1, trimestre2, trimestre3, promedioFinal } = procesarDatos(calificaciones);

    const dataBar = {
        labels: materias,
        datasets: [
            {
                label: 'Trimestre 1',
                data: trimestre1,
                backgroundColor: materias.map(() => 'rgba(75, 192, 192, 0.2)'),
                borderColor: materias.map(() => 'rgba(75, 192, 192, 1)'),
                borderWidth: 1,
            },
            {
                label: 'Trimestre 2',
                data: trimestre2,
                backgroundColor: materias.map(() => 'rgba(54, 162, 235, 0.2)'),
                borderColor: materias.map(() => 'rgba(54, 162, 235, 1)'),
                borderWidth: 1,
            },
            {
                label: 'Trimestre 3',
                data: trimestre3,
                backgroundColor: materias.map(() => 'rgba(255, 206, 86, 0.2)'),
                borderColor: materias.map(() => 'rgba(255, 206, 86, 1)'),
                borderWidth: 1,
            },
            {
                label: 'Promedio Final',
                data: promedioFinal,
                backgroundColor: materias.map(() => 'rgba(153, 102, 255, 0.2)'),
                borderColor: materias.map(() => 'rgba(153, 102, 255, 1)'),
                borderWidth: 1,
            },
        ],
    };

    const dataDoughnut = {
        labels: ['Trimestre 1', 'Trimestre 2', 'Trimestre 3', 'Promedio General'],
        datasets: [
            {
                data: [
                    promediosGenerales.Trimestre1 || 0,
                    promediosGenerales.Trimestre2 || 0,
                    promediosGenerales.Trimestre3 || 0,
                    promediosGenerales.PromedioGeneralPeriodo || 0
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
                cutout: '70%', // Ajusta el tamaño del agujero en el centro
            },
        ],
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
        <SIDEBARADMIN>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 60px)', padding: '20px', overflowX: 'hidden' }}>
                <BreadcrumbAdmin />

                <Typography.Title level={2}>Estadísticas por Alumnos</Typography.Title>

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
                        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onClick={fetchCalificaciones} disabled={!selectedAlumno}>
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

                                <div style={{ flex: 1 }}>
                                    <label className="block mb-2">Alumno:</label>
                                    <Select
                                        value={selectedAlumno}
                                        placeholder="Seleccionar Alumno"
                                        onChange={setSelectedAlumno}
                                        disabled={!selectedGrupo}
                                        style={{
                                            width: '100%',
                                            height: '40px',
                                            borderRadius: '8px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    >
                                        {alumnos.map(alumno => (
                                            <Option key={alumno.vchCurpAlumno} value={alumno.vchCurpAlumno}>
                                                {alumno.vchNombre} {alumno.vchAPaterno} {alumno.vchAMaterno}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>

                            </div>

                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                <Button
                                    type="submit"
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
                                    Visualizar Calificaciones
                                </Button>
                            </div>
                        </form>

                        {calificaciones.length === 0 ? (
                            <div className="flex justify-center items-center w-full h-64">
                                <Empty description="No hay datos" />
                            </div>
                        ) : (
                            <>
                                <div className="mt-6">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 text-center">Gráfico de Barras</h3>
                                    <Bar data={dataBar} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                                </div>

                                <div className="mt-10">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 text-center">Gráfico de Líneas</h3>
                                    <Line data={dataBar} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                                </div>

                                <div className="mt-10 flex justify-center">
                                    <div style={{ width: '400px', height: '400px' }}>
                                        <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 text-center">Gráfico de Dona</h3>
                                        <Doughnut 
                                            data={dataDoughnut} 
                                            options={{ 
                                                responsive: true, 
                                                plugins: { 
                                                    legend: { position: 'top' } 
                                                }
                                            }} 
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </Card>
                </div>
            </div>
        </SIDEBARADMIN>
    )
}

export default EstadisticasIndividualXAdmin