import React, { useState, useEffect } from 'react';
import { Typography, Card, message, Button, Select, Table, Modal } from 'antd';
import axios from 'axios';

import * as Sentry from "@sentry/react"; // Importa Sentry

import SIDEBARDOCENT from '../../../components/SIDEBARDOCENT';
import BreadcrumDocent from './BreadcrumDocent';

const { Title } = Typography;

function VisualizarCapturaCalificaciones() {
    const [studentsData, setStudentsData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [calificaciones, setCalificaciones] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [selectedPeriodo, setSelectedPeriodo] = useState('');
    const [selectedGrado, setSelectedGrado] = useState('');
    const [selectedGrupo, setSelectedGrupo] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const docenteId = localStorage.getItem('idUsuario'); // Obtener ID del docente del localStorage

    useEffect(() => {
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

                Sentry.captureException(error); // Captura el error en Sentry
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

                Sentry.captureMessage(`Se obtuvieron alumnos para el docente ${docenteId} en el periodo ${selectedPeriodo}, grado ${selectedGrado}, grupo ${selectedGrupo}`); // Registro en Sentry

                if (!res.data.alumnos?.length) {
                    message.info('No se encontraron alumnos para los criterios seleccionados.');
                }
            } catch (error) {
                console.error('Error al obtener alumnos:', error);
                message.error('Error al obtener alumnos');

                Sentry.captureException(error); // Captura el error en Sentry

            }
        } else {
            message.error('Por favor, selecciona todos los criterios (periodo, grado y grupo)');

            Sentry.captureMessage('Intento fallido al buscar alumnos: faltan criterios');
        }
    };

    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
        fetchCalificaciones(student.vchCurpAlumno, selectedPeriodo, selectedGrado, selectedGrupo);
        setIsModalVisible(true); // Mostrar el modal

        Sentry.captureMessage(`El docente visualizó las calificaciones del alumno ${student.vchCurpAlumno}`); // Registro en Sentry
    };

    const fetchCalificaciones = async (matricula, periodo, grado, grupo) => {
        try {
            const res = await axios.get(
                `https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/Docentes/ObtenerCalificaciones.php?matricula=${matricula}&periodo=${periodo}&grado=${grado}&grupo=${grupo}`
            );
            if (res.data.success) {
                setCalificaciones(res.data.calificaciones || []);

                Sentry.captureMessage(`Se visualizaron las calificaciones del alumno ${matricula} en el periodo ${periodo}, grado ${grado}, grupo ${grupo}`); // Registro en Sentry

            } else {
                message.error('Error al obtener calificaciones');

                Sentry.captureMessage(`Error al obtener calificaciones para el alumno ${matricula}`);
            }
        } catch (error) {
            console.error('Error al obtener calificaciones:', error);
            message.error('Error del servidor al obtener calificaciones');

            Sentry.captureException(error); // Captura el error en Sentry
        }
    };

    const studentColumns = [
        { title: 'CURP', dataIndex: 'vchCurpAlumno', key: 'vchCurpAlumno' },
        { title: 'Apellido Paterno', dataIndex: 'vchAPaterno', key: 'vchAPaterno' },
        { title: 'Apellido Materno', dataIndex: 'vchAMaterno', key: 'vchAMaterno' },
        { title: 'Nombre', dataIndex: 'vchNombre', key: 'vchNombre' },
        {
            title: 'Seleccionar',
            key: 'select',
            render: (_, record) => (
                <Button
                    onClick={() => handleStudentSelect(record)}
                    style={{
                        marginRight: 8,
                        borderColor: '#007bff',
                        color: '#007bff',
                        backgroundColor: 'transparent',
                        transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                    }}
                    onMouseOver={(event) => {
                        event.currentTarget.style.backgroundColor = '#007bff';
                        event.currentTarget.style.color = '#fff';
                    }}
                    onMouseOut={(event) => {
                        event.currentTarget.style.backgroundColor = 'transparent';
                        event.currentTarget.style.color = '#007bff';
                    }}
                >
                    Seleccionar
                </Button>
            ),
        },
    ];
    
    const gradesColumns = [
        { title: 'Materia', dataIndex: 'materia', key: 'materia' },
        { title: 'M1', dataIndex: 'M1', key: 'M1' },
        { title: 'M2', dataIndex: 'M2', key: 'M2' },
        { title: 'M3', dataIndex: 'M3', key: 'M3' },
        { title: 'Final', dataIndex: 'Final', key: 'Final' },
    ];

    const average =
        calificaciones.length > 0
            ? (calificaciones.reduce((sum, grade) => sum + parseFloat(grade.Final || 0), 0) / calificaciones.length).toFixed(2)
            : 'N/A';

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedStudent(null);
        setCalificaciones([]);
    };

    return (
        <SIDEBARDOCENT>
            <div style={{ padding: '20px' }}>
                <BreadcrumDocent />
                <Title level={2}>Visualización de Calificaciones</Title>
                <Card className="data-card" style={{ maxHeight: '80vh', overflowY: 'hidden' }}>

                    <Title level={4} style={{ color: 'black', marginBottom: '10px' }}>
                        Por favor seleccione los siguientes datos para visualización
                    </Title>

                    <div className="filters" style={{ marginBottom: '20px' }}>
                        {/* Contenedor de los Selects alineados horizontalmente */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '20px',
                                marginBottom: '20px',
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
                                        width: '100%', // Asegura que ocupe el espacio asignado por el contenedor
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
                                    Seleccionar Grado
                                </label>
                                <Select
                                    value={selectedGrado || undefined}
                                    onChange={(value) => setSelectedGrado(value)}
                                    style={{
                                        width: '100%', // Asegura que ocupe el espacio asignado por el contenedor
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
                                    Seleccionar Grupo
                                </label>
                                <Select
                                    value={selectedGrupo || undefined}
                                    onChange={(value) => setSelectedGrupo(value)}
                                    style={{
                                        width: '100%', // Asegura que ocupe el espacio asignado por el contenedor
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
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={fetchStudents}
                                style={{
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
                                    transition: 'background-color 0.3s ease',
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
                    </div>

                    <Title level={4}>Visualización de Alumnos</Title>
                    <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #f0f0f0', padding: '10px' }}>
                        <Table
                            columns={studentColumns}
                            dataSource={studentsData}
                            rowKey="vchCurpAlumno"
                            pagination={false}
                        />
                    </div>
                </Card>

                {/* Modal para mostrar las calificaciones */}
                <Modal
                    title={`CALIFICACIONES DE: ${selectedStudent?.vchNombre} ${selectedStudent?.vchAPaterno} ${selectedStudent?.vchAMaterno}`}
                    visible={isModalVisible}
                    onCancel={closeModal}
                    footer={<Button onClick={closeModal}>Cerrar</Button>}
                >
                    <Table
                        columns={gradesColumns}
                        dataSource={calificaciones}
                        pagination={false}
                        footer={() => <div>Promedio Final: {average}</div>}
                        size="small"
                    />
                </Modal>
            </div>
        </SIDEBARDOCENT>
    );
}

export default VisualizarCapturaCalificaciones;
