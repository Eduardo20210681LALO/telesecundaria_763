import React, { useState, useEffect } from 'react';
import { Typography, Card, message, Button, Select, Table } from 'antd';
import axios from 'axios';
import SIDEBARDOCENT from '../../../components/SIDEBARDOCENT';
import BreadcrumDocent from './BreadcrumDocent';

const { Title } = Typography;

function VisualizarAlumnosDDocente() {
    const [studentsData, setStudentsData] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [selectedPeriodo, setSelectedPeriodo] = useState('');
    const [selectedGrado, setSelectedGrado] = useState('');
    const [selectedGrupo, setSelectedGrupo] = useState('');
    const docenteId = localStorage.getItem('idUsuario'); // Obtener ID del docente del localStorage

    useEffect(() => {
        console.log(docenteId)
        const fetchData = async () => {
            try {
                const [periodosRes, gradosRes, gruposRes] = await Promise.all([
                    axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php'),
                    axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php'),
                    axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php'),
                ]);
                setPeriodos(periodosRes.data || []);
                setGrados(gradosRes.data || []);
                setGrupos(gruposRes.data || []);
            } catch (error) {
                console.error('Error al obtener datos iniciales:', error);
                message.error('Error al cargar información inicial');
            }
        };
        fetchData();
    }, []);

    const fetchStudents = async () => {
        if (selectedPeriodo && selectedGrado && selectedGrupo && docenteId) {
            try {
                const res = await axios.get(
                    `https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/Docentes/TraerAlumnosPorDocente.php?periodo=${selectedPeriodo}&grado=${selectedGrado}&grupo=${selectedGrupo}&docenteId=${docenteId}`
                );
                setStudentsData(res.data.alumnos || []);
                if (!res.data.alumnos?.length) {
                    message.info('No se encontraron alumnos para los criterios seleccionados.');
                }
            } catch (error) {
                console.error('Error al obtener alumnos:', error);
                message.error('Error al obtener alumnos');
            }
        } else {
            message.error('Por favor, selecciona todos los criterios (periodo, grado y grupo)');
        }
    };

    const studentColumns = [
        { title: 'CURP', dataIndex: 'vchCurpAlumno', key: 'vchCurpAlumno' },
        { title: 'Apellido Paterno', dataIndex: 'vchAPaterno', key: 'vchAPaterno' },
        { title: 'Apellido Materno', dataIndex: 'vchAMaterno', key: 'vchAMaterno' },
        { title: 'Nombre', dataIndex: 'vchNombre', key: 'vchNombre' },
    ];

    return (
        <SIDEBARDOCENT>
            <div style={{ padding: '20px', overflowX: 'hidden' }}>
                <BreadcrumDocent />
                <Title level={2}>Visualización de Alumnos</Title>

                <Card className="data-card" style={{ maxHeight: '80vh', overflowY: 'hidden' }}>
                    <Title level={4} style={{ color: 'black', marginBottom: '10px' }}>
                        Por favor seleccione los siguientes datos para visualizar los alumnos
                    </Title>
                    <div className="filters" style={{ marginBottom: '20px' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '20px', // Espaciado entre los elementos
                                alignItems: 'flex-end', // Alinea el botón con los selectores
                            }}
                        >
                            {/* Select para Periodo */}
                            <div style={{ flex: 1 }}>
                                <label htmlFor="periodo" className="block mb-2">
                                    Seleccionar Periodo:
                                </label>
                                <Select
                                    value={selectedPeriodo || undefined}
                                    onChange={(value) => setSelectedPeriodo(value)}
                                    style={{
                                        width: '100%',
                                        borderRadius: '8px',
                                        border: '1px solid #d9d9d9',
                                        height: '40px',
                                    }}
                                    placeholder="Seleccione un periodo"
                                    allowClear
                                >
                                    {periodos.map((periodo) => (
                                        <Select.Option key={periodo.intClvPeriodo} value={periodo.intClvPeriodo}>
                                            {periodo.vchPeriodo}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>

                            {/* Select para Grado */}
                            <div style={{ flex: 1 }}>
                                <label htmlFor="grado" className="block mb-2">
                                    Seleccionar Grado:
                                </label>
                                <Select
                                    value={selectedGrado || undefined}
                                    onChange={(value) => setSelectedGrado(value)}
                                    style={{
                                        width: '100%',
                                        borderRadius: '8px',
                                        border: '1px solid #d9d9d9',
                                        height: '40px',
                                    }}
                                    placeholder="Seleccione un grado"
                                    allowClear
                                >
                                    {grados.map((grado) => (
                                        <Select.Option key={grado.intClvGrado} value={grado.intClvGrado}>
                                            {grado.vchGrado}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>

                            {/* Select para Grupo */}
                            <div style={{ flex: 1 }}>
                                <label htmlFor="grupo" className="block mb-2">
                                    Seleccionar Grupo:
                                </label>
                                <Select
                                    value={selectedGrupo || undefined}
                                    onChange={(value) => setSelectedGrupo(value)}
                                    style={{
                                        width: '100%',
                                        borderRadius: '8px',
                                        border: '1px solid #d9d9d9',
                                        height: '40px',
                                    }}
                                    placeholder="Seleccione un grupo"
                                    allowClear
                                >
                                    {grupos.map((grupo) => (
                                        <Select.Option key={grupo.intClvGrupo} value={grupo.intClvGrupo}>
                                            {grupo.vchGrupo}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>

                            {/* Botón Visualizar Alumnos */}
                            <div style={{ flex: 1 }}>
                                <Button
                                    type="primary"
                                    onClick={fetchStudents}
                                    style={{
                                        backgroundColor: 'var(--first-color)',
                                        borderColor: 'transparent',
                                        color: '#fff',
                                        height: '40px', // Misma altura que los selectores
                                        width: '100%', // Ocupa el mismo ancho
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease',
                                    }}
                                    onMouseOver={(event) => {
                                        event.currentTarget.style.backgroundColor = 'black';
                                    }}
                                    onMouseOut={(event) => {
                                        event.currentTarget.style.backgroundColor = 'var(--first-color)';
                                    }}
                                >
                                    Visualizar Alumnos
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Title level={3}>Visualización de Alumnos</Title>
                    <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #f0f0f0', padding: '10px' }}>
                        <Table
                            columns={studentColumns}
                            dataSource={studentsData}
                            rowKey="vchCurpAlumno"
                            pagination={false}
                            scroll={{ y: 300 }} // Solo habilita el scroll vertical
                            style={{ marginTop: '20px', width: '100%' }} // Asegura que ocupe el ancho total
                        />
                    </div>
                </Card>
            </div>
        </SIDEBARDOCENT>

    );
}

export default VisualizarAlumnosDDocente;
