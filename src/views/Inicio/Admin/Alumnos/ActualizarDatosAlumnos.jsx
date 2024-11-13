import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Select, Button, message, Modal, Form, Input } from 'antd';
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';

const { Option } = Select;

function ActualizarDatosAlumnos() {
    const [periodos, setPeriodos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [selectedPeriodo, setSelectedPeriodo] = useState('');
    const [selectedGrado, setSelectedGrado] = useState('');
    const [selectedGrupo, setSelectedGrupo] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentAlumno, setCurrentAlumno] = useState(null);

    useEffect(() => {
        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php')  //  http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php
            .then(response => setPeriodos(response.data))
            .catch(error => message.error('Error al obtener los periodos'));

        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php')  //   http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php
            .then(response => setGrados(response.data))
            .catch(error => message.error('Error al obtener los grados'));

        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php')  //   http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php
            .then(response => setGrupos(response.data))
            .catch(error => message.error('Error al obtener los grupos'));
    }, []);

    const fetchAlumnos = () => {
        if (selectedPeriodo && selectedGrado && selectedGrupo) {
            setLoading(true);
            axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerAlumnos.php', {   //  http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerAlumnos.php
                params: { periodo: selectedPeriodo, grado: selectedGrado, grupo: selectedGrupo }
            })
                .then(response => {
                    setAlumnos(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    message.error('Error al obtener los alumnos');
                    setLoading(false);
                });
        } else {
            message.warning('Por favor seleccione todos los campos');
        }
    };

    const handleEdit = (alumno) => {
        setCurrentAlumno(alumno);
        setIsModalVisible(true);
    };

    const handleDelete = (curp) => {
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/EliminarAlumno.php', { vchCurpAlumno: curp })  //  http://localhost/TeleSecundaria763/AdminAlumnos/EliminarAlumno.php
            .then(response => {
                message.success('Alumno eliminado correctamente');
                fetchAlumnos();
            })
            .catch(error => message.error('Error al eliminar el alumno'));
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
        setCurrentAlumno(null);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setCurrentAlumno(null);
    };

    const handleFormSubmit = (values) => {
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ActualizarAlumno.php', { ...values, vchCurpAlumno: currentAlumno.vchCurpAlumno })   // http://localhost/TeleSecundaria763/AdminAlumnos/ActualizarAlumno.php
            .then(response => {
                message.success('Alumno actualizado correctamente');
                fetchAlumnos();
                handleModalOk();
            })
            .catch(error => message.error('Error al actualizar el alumno'));
    };

    const columns = [
        { title: 'CURP', dataIndex: 'vchCurpAlumno', key: 'curp' },
        { title: 'Apellido Paterno', dataIndex: 'vchAPaterno', key: 'aPaterno' },
        { title: 'Apellido Materno', dataIndex: 'vchAMaterno', key: 'aMaterno' },
        { title: 'Nombre', dataIndex: 'vchNombre', key: 'nombre' },
        { title: 'Fecha Nacimiento', dataIndex: 'dtFchNacAlum', key: 'fchNac' },
        { title: 'Sexo', dataIndex: 'chrSexoAlum', key: 'sexo' },
        { title: 'Tutor', dataIndex: 'vchNombreTutor', key: 'tutor' },
        { title: 'Estado', dataIndex: 'vchEstado', key: 'estado' },
        { title: 'Municipio', dataIndex: 'vchMunicipio', key: 'municipio' },
        { title: 'Localidad', dataIndex: 'vchLocalidad', key: 'localidad' },
        { title: 'Calle', dataIndex: 'vchCalle', key: 'calle' },
        { title: 'Código Postal', dataIndex: 'vchCodPostal', key: 'codPostal' },
        { title: 'Teléfono Tutor', dataIndex: 'vchTelTutor', key: 'telTutor' },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <span>
                    <Button type="primary" onClick={() => handleEdit(record)}>Editar</Button>
                    <Button type="danger" onClick={() => handleDelete(record.vchCurpAlumno)} style={{ marginLeft: '10px' }}>Eliminar</Button>
                </span>
            )
        }
    ];

    return (
        <SIDEBARADMIN>
            <div className="flex justify-center w-full mx-auto mt-10">
                <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-900">
                    <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-6 max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-6" style={{ color: '#B8860B' }}>Actualizar Datos de Alumnos</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div>
                                <label htmlFor="select-periodo" className="block text-gray-700 dark:text-gray-300 mb-2">Seleccionar Periodo</label>
                                <Select
                                    id="select-periodo"
                                    placeholder="Seleccionar Periodo"
                                    onChange={(value) => setSelectedPeriodo(value)}
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
                                <label htmlFor="select-grado" className="block text-gray-700 dark:text-gray-300 mb-2">Seleccionar Grado</label>
                                <Select
                                    id="select-grado"
                                    placeholder="Seleccionar Grado"
                                    onChange={(value) => setSelectedGrado(value)}
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
                                <label htmlFor="select-grupo" className="block text-gray-700 dark:text-gray-300 mb-2">Seleccionar Grupo</label>
                                <Select
                                    id="select-grupo"
                                    placeholder="Seleccionar Grupo"
                                    onChange={(value) => setSelectedGrupo(value)}
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
                        <Button type="primary" className="w-full mb-6" onClick={fetchAlumnos}>Buscar Alumnos</Button>
                        <Table
                            dataSource={alumnos}
                            columns={columns}
                            rowKey="vchCurpAlumno"
                            loading={loading}
                            className="mb-6"
                            scroll={{ x: 1000 }}
                        />
    
                        <Modal
                            title="Actualizar Alumno"
                            visible={isModalVisible}
                            onCancel={handleModalCancel}
                            footer={null}
                        >
                            <Form
                                initialValues={currentAlumno}
                                onFinish={handleFormSubmit}
                                layout="vertical"
                            >
                                <Form.Item name="vchAPaterno" label="Apellido Paterno">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="vchAMaterno" label="Apellido Materno">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="vchNombre" label="Nombre">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="dtFchNacAlum" label="Fecha de Nacimiento">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="chrSexoAlum" label="Sexo">
                                    <Select>
                                        <Option value="M">Masculino</Option>
                                        <Option value="F">Femenino</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="vchNombreTutor" label="Tutor">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="vchEstado" label="Estado">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="vchMunicipio" label="Municipio">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="vchLocalidad" label="Localidad">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="vchCalle" label="Calle">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="vchCodPostal" label="Código Postal">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="vchTelTutor" label="Teléfono Tutor">
                                    <Input />
                                </Form.Item>
                                <Button type="primary" htmlType="submit" className="w-full">Actualizar</Button>
                            </Form>
                        </Modal>
                    </div>
                </main>
            </div>
        </SIDEBARADMIN>
    );
}

export default ActualizarDatosAlumnos;
