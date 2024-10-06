import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Select, Spin, Alert, Button, message, Empty } from 'antd';
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const { Option } = Select;

function EstadisticasGrupalXAdmin() {
    const [periodos, setPeriodos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [calificaciones, setCalificaciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
            message.error('Por favor seleccione todos los campos');
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

    const dataBar = {
      labels: alumnos,
      datasets: [
          {
              label: 'Trimestre 1',
              data: trimestre1,
              backgroundColor: 'rgba(255, 99, 132, 0.8)',  // Mayor opacidad para destacar
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,  // Bordes más gruesos para resaltar
          },
          {
              label: 'Trimestre 2',
              data: trimestre2,
              backgroundColor: 'rgba(54, 162, 235, 0.4)',  // Opacidad reducida
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
          },
          {
              label: 'Trimestre 3',
              data: trimestre3,
              backgroundColor: 'rgba(255, 206, 86, 0.4)',  // Opacidad reducida
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1,
          },
          {
              label: 'Promedio General',
              data: promedioGeneral,
              backgroundColor: 'rgba(75, 192, 192, 0.4)',  // Opacidad reducida
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
          },
      ],
  };
  
    const options = {
        indexAxis: 'y',  // Cambia la gráfica a horizontal
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
        },
        animation: {
            duration: 1000,  // Duración de la animación al cargar
            onComplete: () => {
                // Restaurar las opacidades una vez que la animación esté completa
                dataBar.datasets[1].backgroundColor = 'rgba(54, 162, 235, 0.6)';
                dataBar.datasets[2].backgroundColor = 'rgba(255, 206, 86, 0.6)';
                dataBar.datasets[3].backgroundColor = 'rgba(75, 192, 192, 0.6)';
            }
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
        <SIDEBARADMIN>
            <div className="flex flex-col md:flex-row justify-center w-full mx-auto mt-10 gap-6">
                <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-900">
                    <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-6 w-full max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-6" style={{ color: '#B8860B' }}>Calificaciones por Grupos</h2>

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
                        <Button type="primary" onClick={fetchCalificacionesGrupo}>
                            Ver Calificaciones del Grupo
                        </Button>
    
                        {calificaciones.length === 0 ? (
                            <div className="flex justify-center items-center w-full h-64">
                                <Empty description="No hay datos" />
                            </div>
                        ) : (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 text-center">Gráfico de Barras</h3>
                                <Bar data={dataBar} options={options} />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </SIDEBARADMIN>
    )
    
}

export default EstadisticasGrupalXAdmin