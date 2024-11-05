import React, { useState, useEffect } from 'react';
import { Select, Typography, Card, Button, message, Table } from 'antd'; // Importamos los componentes de Ant Design
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';
import BreadcrumbAdmin from '../BreadcrumbAdmin';
import axios from 'axios';

const { Title } = Typography;
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

    // Función para obtener datos de periodos, grados y grupos
    const fetchData = async () => {
        try {
            const [periodosResponse, gradosResponse, gruposResponse] = await Promise.all([
                axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php'),  //  http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php
                axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php'),   //  http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php
                axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php')   //   http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php
            ]);

            if (Array.isArray(periodosResponse.data)) {
                setPeriodos(periodosResponse.data);
            } else {
                throw new Error('Error en el formato de los periodos');
            }

            if (Array.isArray(gradosResponse.data)) {
                setGrados(gradosResponse.data);
            } else {
                throw new Error('Error en el formato de los grados');
            }

            if (Array.isArray(gruposResponse.data)) {
                setGrupos(gruposResponse.data);
            } else {
                throw new Error('Error en el formato de los grupos');
            }

        } catch (error) {
            console.error('Error al cargar datos:', error);
            message.error('Error al obtener los datos. Por favor, inténtalo de nuevo.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchMejoresPromedios = () => {
        if (selectedPeriodo && selectedGrado && selectedGrupo) {
            setLoading(true);
            axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/Directivos/ObtenerMejoresPromedios.php', {   //   http://localhost/TeleSecundaria763/Directivos/ObtenerMejoresPromedios.php
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
                })
                .catch(error => {
                    message.error('Error al obtener los mejores promedios');
                })
                .finally(() => setLoading(false)); // Asegurar que setLoading se ejecute al final
        } else {
            message.warning('Por favor, selecciona Periodo, Grado y Grupo.');
        }
    };

    const columns = [
        { title: 'CURP', dataIndex: 'vchCurpAlumno', key: 'vchCurpAlumno' },
        { title: 'Nombre', dataIndex: 'vchNombre', key: 'vchNombre' },
        { title: 'Apellido Paterno', dataIndex: 'vchAPaterno', key: 'vchAPaterno' },
        { title: 'Apellido Materno', dataIndex: 'vchAMaterno', key: 'vchAMaterno' },
        { title: 'Mejor Promedio', dataIndex: 'MejorPromedio', key: 'MejorPromedio' }
    ];

    return (
        <SIDEBARADMIN>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 'calc(100vh - 60px)',
                    padding: '20px',
                }}
            >
                <BreadcrumbAdmin />

                <Title level={2}>Mejores Promedios</Title>

                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Card
                        style={{
                            background: '#fff',
                            padding: '20px',
                            flexGrow: 1,
                            overflowY: 'auto',
                        }}
                    >
                        <form style={{ width: '100%' }}>
                            <div style={{ flex: 1, marginBottom: '20px' }}>
                                <Title level={4} style={{ color: 'black', marginBottom: '20px' }}>
                                    Seleccionar los datos para visualización de mejores calificaciones
                                </Title>

                                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                                    <div style={{ flex: 1 }}>
                                        <label htmlFor="grado" className="block mb-2">
                                            Seleccionar Periodo:
                                        </label>
                                        <Select
                                            id="select-periodo"
                                            placeholder="Seleccionar Periodo"
                                            onChange={(value) => setSelectedPeriodo(value)}
                                            style={{
                                                width: '100%',
                                                height: '40px',
                                                borderRadius: '8px',
                                                border: '1px solid #d9d9d9',
                                            }}
                                        >
                                            {periodos.map((periodo) => (
                                                <Option key={periodo.intClvPeriodo} value={periodo.intClvPeriodo}>
                                                    {periodo.vchPeriodo}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <label htmlFor="grado" className="block mb-2">
                                            Seleccionar Grado:
                                        </label>
                                        <Select
                                            id="select-grado"
                                            placeholder="Seleccionar Grado"
                                            onChange={(value) => setSelectedGrado(value)}
                                            style={{
                                                width: '100%',
                                                height: '40px',
                                                borderRadius: '8px',
                                                border: '1px solid #d9d9d9',
                                            }}
                                        >
                                            {grados.map((grado) => (
                                                <Option key={grado.intClvGrado} value={grado.intClvGrado}>
                                                    {grado.vchGrado}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <label htmlFor="grado" className="block mb-2">
                                            Seleccionar Grupo:
                                        </label>
                                        <Select
                                            id="select-grupo"
                                            placeholder="Seleccionar Grupo"
                                            onChange={(value) => setSelectedGrupo(value)}
                                            style={{
                                                width: '100%',
                                                height: '40px',
                                                borderRadius: '8px',
                                                border: '1px solid #d9d9d9',
                                            }}
                                        >
                                            {grupos.map((grupo) => (
                                                <Option key={grupo.intClvGrupo} value={grupo.intClvGrupo}>
                                                    {grupo.vchGrupo}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <label htmlFor="grado" className="block mb-2">
                                            Seleccionar Trimestre:
                                        </label>
                                        <Select
                                            id="select-trimestre"
                                            placeholder="Seleccionar Trimestre"
                                            onChange={(value) => setSelectedTrimestre(value)}
                                            style={{
                                                width: '100%',
                                                height: '40px',
                                                borderRadius: '8px',
                                                border: '1px solid #d9d9d9',
                                            }}
                                        >
                                            <Option value="T1">Trimestre 1</Option>
                                            <Option value="T2">Trimestre 2</Option>
                                            <Option value="T3">Trimestre 3</Option>
                                            <Option value="PromMateriaF">Promedio General</Option>
                                        </Select>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    <Button
                                        onClick={fetchMejoresPromedios}
                                        type="primary"
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
                                            transition: 'background-color 0.3s ease',
                                        }}
                                        onMouseOver={(event) => {
                                            event.currentTarget.style.backgroundColor = 'black';
                                        }}
                                        onMouseOut={(event) => {
                                            event.currentTarget.style.backgroundColor = 'var(--first-color)';
                                        }}
                                    >
                                        Buscar Mejores Promedios
                                    </Button>
                                </div>
                            </div>
                        </form>

                        <Table
                            dataSource={mejoresPromedios}
                            columns={columns}
                            rowKey="vchCurpAlumno"
                            loading={loading}
                            pagination={false} // Sin paginación
                        />
                    </Card>
                </div>
            </div>
        </SIDEBARADMIN>
    );
}

export default MejoresPromediosXAdmin;
