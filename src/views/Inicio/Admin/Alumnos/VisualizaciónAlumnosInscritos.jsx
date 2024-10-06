import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Select, message } from 'antd';
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';

const { Option } = Select;

function VisualizaciónAlumnosInscritos() {
    const [alumnos, setAlumnos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [docentes, setDocentes] = useState([]);
    const [selectedAlumnos, setSelectedAlumnos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchAlumnosNoInscritos();
        fetchGrados();
        fetchGrupos();
        fetchPeriodos();
        fetchDocentes();
    }, []);

    const fetchAlumnosNoInscritos = () => {
        axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerNuevosAlumnos.php')
            .then(response => {
                setAlumnos(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => {
                console.error('Error fetching alumnos:', error);
            });
    };

    const fetchGrados = () => {
        axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php')
            .then(response => {
                setGrados(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => {
                console.error('Error fetching grados:', error);
            });
    };

    const fetchGrupos = () => {
        axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php')
            .then(response => {
                setGrupos(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => {
                console.error('Error fetching grupos:', error);
            });
    };

    const fetchPeriodos = () => {
        axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php')
            .then(response => {
                setPeriodos(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => {
                console.error('Error fetching periodos:', error);
            });
    };

    const fetchDocentes = () => {
        axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerDocentes.php')
            .then(response => {
                setDocentes(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => {
                console.error('Error fetching docentes:', error);
            });
    };

    const showInscribirModal = () => {
        if (selectedAlumnos.length === 0) {
            message.warning('Seleccione al menos un alumno para inscribir.');
            return;
        }
        setModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            axios.post('http://localhost/TeleSecundaria763/AdminAlumnos/InscribirAlumnos.php', {
                alumnos: selectedAlumnos,
                gradoId: values.grado,
                grupoId: values.grupo,
                periodoId: values.periodo,
                docenteId: values.docente
            })
            .then(response => {
                response.data.forEach(res => {
                    if (res.message.includes("correctamente")) {
                        setAlumnos(alumnos.filter(alumno => alumno.vchCurpAlumno !== res.curp));
                    }
                    message.info(res.message);
                });
                setSelectedAlumnos([]);
                setModalVisible(false);
                fetchAlumnosNoInscritos(); // Actualiza la lista de alumnos no inscritos
            })
            .catch(error => {
                message.error('Error inscribiendo alumnos');
                console.error('Error inscribiendo alumnos:', error);
            });
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const onSelectChange = selectedRowKeys => {
        setSelectedAlumnos(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys: selectedAlumnos,
        onChange: onSelectChange,
    };

    const columns = [
        {
            title: 'CURP',
            dataIndex: 'vchCurpAlumno',
            key: 'vchCurpAlumno',
        },
        {
            title: 'Nombre',
            dataIndex: 'vchNombre',
            key: 'vchNombre',
        },
        {
            title: 'Apellido Paterno',
            dataIndex: 'vchAPaterno',
            key: 'vchAPaterno',
        },
        {
            title: 'Apellido Materno',
            dataIndex: 'vchAMaterno',
            key: 'vchAMaterno',
        }
    ];

    return (
        <SIDEBARADMIN>
            <div className="flex justify-center w-full mx-auto mt-10">
                <main className="flex-grow flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden p-8 w-full max-w-5xl">
                        <h2 className="text-3xl font-bold text-center mb-6" style={{ color: '#B8860B' }}>Alumnos No Inscritos</h2>

                        <Table
                            dataSource={alumnos}
                            columns={columns}
                            rowKey="vchCurpAlumno"
                            rowSelection={rowSelection}
                            pagination={false}
                            className="ant-table"
                        />
                        <Button type="primary" onClick={showInscribirModal} className="mt-4">
                            Inscribir Seleccionados
                        </Button>
                        <Modal
                            title="Inscribir Alumnos"
                            visible={modalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        >
                            <Form form={form} layout="vertical">
                                <Form.Item
                                    name="grado"
                                    label="Grado"
                                    rules={[{ required: true, message: 'Por favor selecciona un grado' }]}
                                >
                                    <Select placeholder="Selecciona un grado">
                                        {grados.map(grado => (
                                            <Option key={grado.intClvGrado} value={grado.intClvGrado}>
                                                {grado.vchGrado}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="grupo"
                                    label="Grupo"
                                    rules={[{ required: true, message: 'Por favor selecciona un grupo' }]}
                                >
                                    <Select placeholder="Selecciona un grupo">
                                        {grupos.map(grupo => (
                                            <Option key={grupo.intClvGrupo} value={grupo.intClvGrupo}>
                                                {grupo.vchGrupo}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="periodo"
                                    label="Periodo"
                                    rules={[{ required: true, message: 'Por favor selecciona un periodo' }]}
                                >
                                    <Select placeholder="Selecciona un periodo">
                                        {periodos.map(periodo => (
                                            <Option key={periodo.intClvPeriodo} value={periodo.intClvPeriodo}>
                                                {periodo.vchPeriodo}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="docente"
                                    label="Docente"
                                    rules={[{ required: true, message: 'Por favor selecciona un docente' }]}
                                >
                                    <Select placeholder="Selecciona un docente">
                                        {docentes.map(docente => (
                                            <Option key={docente.id_usuario} value={docente.id_usuario}>
                                                {docente.vch_nombre} {docente.vch_APaterno} {docente.vch_AMaterno}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </main>
            </div>
        </SIDEBARADMIN>
    );
    
}

export default VisualizaciónAlumnosInscritos;
