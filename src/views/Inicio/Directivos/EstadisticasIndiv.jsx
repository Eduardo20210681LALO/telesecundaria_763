import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, LineElement, CategoryScale, LinearScale } from 'chart.js';
import { Select, Spin, Alert, Button, message, Empty } from 'antd';
import SIDEBARDIRECT from '../../../components/SIDEBARDIRECT';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, LineElement, CategoryScale, LinearScale);

const { Option } = Select;

function EstadisticasIndiv() {
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

    useEffect(() => {
        if (selectedPeriodo && selectedGrado && selectedGrupo) {
            axios.get('http://localhost/TeleSecundaria763/Directivos/ObtenerAlumnosPorGrupo.php', {
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
        if (selectedPeriodo && selectedGrado && selectedGrupo && selectedAlumno) {
            setLoading(true);
            setError(null);

            axios.get('http://localhost/TeleSecundaria763/Directivos/ObtenerCalificacionesAlumno.php', {
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

            axios.get('http://localhost/TeleSecundaria763/Directivos/ObtenerPromediosGenerales.php', {
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
        }
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
        <SIDEBARDIRECT>
            <div className="flex flex-col md:flex-row justify-center w-full mx-auto mt-10 gap-6">
                <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-900">
                    <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-6 w-full max-w-7xl mx-auto pb-16">
                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700 dark:text-gray-300">Promedios por Materia</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 mb-2">Alumno</label>
                                <Select
                                    placeholder="Seleccionar Alumno"
                                    onChange={setSelectedAlumno}
                                    value={selectedAlumno}
                                    className="w-full"
                                    disabled={!selectedGrupo}
                                >
                                    {alumnos.map(alumno => (
                                        <Option key={alumno.vchCurpAlumno} value={alumno.vchCurpAlumno}>
                                            {alumno.vchNombre} {alumno.vchAPaterno} {alumno.vchAMaterno}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <Button type="primary" onClick={fetchCalificaciones} disabled={!selectedAlumno}>
                            Ver Calificaciones
                        </Button>

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
                    </div>
                </main>
            </div>
        </SIDEBARDIRECT>
    );
}

export default EstadisticasIndiv;
