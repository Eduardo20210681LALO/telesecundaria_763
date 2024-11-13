import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Select, Card, Typography, Form, message, Tag } from 'antd';
import SIDEBARDIRECT from '../../../components/SIDEBARDIRECT';
import BreadcrumDirect from '../Directivos/BreadcrumDirect';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

function TdosUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchUsuarios();
    }, [tipoUsuario]);

    const fetchUsuarios = async () => { 
        try {
            const response = await axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminUsuarios/TraerUsuarios.php', { tipoUsuario });  //    http://localhost/TeleSecundaria763/AdminUsuarios/TraerUsuarios.php 
            if (Array.isArray(response.data)) {
                setUsuarios(response.data);
            } else {
                setUsuarios([]);
                console.error('Error: Datos de respuesta no son un arreglo:', response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setUsuarios([]);
        }
    };

    const handleTipoUsuarioChange = (value) => {
        setTipoUsuario(value);
    };

    const showModal = (usuario) => {
        setSelectedUsuario(usuario);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedUsuario(null);
    };

    const handleUpdate = async (values) => {
        try {
            const response = await axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminUsuarios/ActualizarUsuario.php', { id_usuario: selectedUsuario.id_usuario, ...values });  //   http://localhost/TeleSecundaria763/AdminUsuarios/ActualizarUsuario.php
            if (response.data.success) {
                message.success('Usuario actualizado exitosamente');
                fetchUsuarios();
                setIsModalVisible(false);
                setSelectedUsuario(null);
            } else {
                message.error('Error al actualizar el usuario');
            }
        } catch (error) {
            message.error('Error al actualizar el usuario');
            console.error('Error al hacer la petición de actualización:', error);
        }
    };

    const handleDelete = async (id_usuario) => {
        try {
            const response = await axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminUsuarios/EliminarUsuario.php', { id_usuario });  //  http://localhost/TeleSecundaria763/AdminUsuarios/EliminarUsuario.php
            if (response.data.success) {
                message.success('Usuario eliminado exitosamente');
                fetchUsuarios();
            } else {
                message.error('Error al eliminar el usuario');
            }
        } catch (error) {
            message.error('Error al eliminar el usuario');
            console.error('Error al hacer la petición de eliminación:', error);
        }
    };

    // Renderizado de etiquetas de estado con color
    const renderEstadoTag = (id_estatus) => {
        let color;
        let label;
        if (id_estatus === 1) {
            color = 'green';
            label = 'ACTIVO';
        } else if (id_estatus === 2) {
            color = 'blue';
            label = 'INACTIVO';
        } else if (id_estatus === 3) {
            color = 'red';
            label = 'BLOQUEADO';
        }
        return <Tag color={color}>{label}</Tag>;
    };

    // Columnas para la tabla de usuarios
    const columns = [
        {
            title: 'Nombre Completo',
            dataIndex: 'nombreCompleto',
            key: 'nombreCompleto',
            render: (_, usuario) => `${usuario.vch_nombre} ${usuario.vch_APaterno} ${usuario.vch_AMaterno}`,
        },
        {
            title: 'Usuario',
            dataIndex: 'vch_usuario',
            key: 'vch_usuario',
        },
        {
            title: 'Correo Electrónico',
            dataIndex: 'vch_correo',
            key: 'vch_correo',
        },
        {
            title: 'Teléfono',
            dataIndex: 'vch_telefono',
            key: 'vch_telefono',
        },
        {
            title: 'Rol',
            dataIndex: 'id_rol',
            key: 'id_rol',
            render: (id_rol) => {
                return id_rol === 1 ? 'Directivo' : id_rol === 2 ? 'Administrativo' : id_rol === 3 ? 'Docente' : 'Ninguno';
            },
        },
        {
            title: 'Estado de Cuenta',
            dataIndex: 'id_estatus',
            key: 'id_estatus',
            render: (id_estatus) => renderEstadoTag(id_estatus),
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_, usuario) => (
                <span>
                    <Button type="link" onClick={() => showModal(usuario)}>Editar</Button>
                    <Button type="link" danger onClick={() => handleDelete(usuario.id_usuario)}>Eliminar</Button>
                </span>
            ),
        },
    ];
    
    return (
        <SIDEBARDIRECT>
            {/* Contenedor principal con padding */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 'calc(100vh - 60px)',
                    padding: '20px',
                }}
            >
                <BreadcrumDirect />
                <Title level={2}>Visualización Usuarios</Title>

                {/* Contenedor principal */}
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Card
                        style={{
                            background: '#fff',
                            padding: '20px',
                            flexGrow: 1,
                            overflowY: 'auto',
                        }}
                    >
                        {/* Formulario para agregar o filtrar usuarios */}
                        <form style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <div style={{ display: 'flex', gap: '20px', width: '30%' }}>
                                {/* Filtro de tipo de usuario */}
                                <div style={{ flex: '1' }}>
                                    <label htmlFor="tipoUsuario" className="block mb-2">
                                        Filtrar por tipo de usuario:
                                    </label>
                                    <Select
                                        value={tipoUsuario}
                                        onChange={handleTipoUsuarioChange}
                                        style={{
                                            width: '100%',
                                            marginBottom: '20px',
                                            borderRadius: '8px',
                                            height: '40px',
                                        }}
                                    >
                                        <Option value="">Todos</Option>
                                        <Option value="1">Directivo</Option>
                                        <Option value="2">Administrativo</Option>
                                        <Option value="3">Docente</Option>
                                    </Select>
                                </div>
                            </div>
                        </form>

                        {/* Visualización de usuarios en la tabla */}
                        <Table
                            columns={columns}
                            dataSource={usuarios}
                            rowKey="id_usuario"
                            style={{ marginTop: '20px' }}
                            expandable={{
                                expandedRowRender: (record) => (
                                    <p style={{ margin: 0 }}>
                                        Usuario: {record.vch_usuario}, Correo: {record.vch_correo}, Teléfono: {record.vch_telefono}
                                    </p>
                                ),
                                rowExpandable: (record) => record.id_usuario !== 'Not Expandable',
                            }}
                        />


                        {selectedUsuario && (
                            <Modal
                                title="Actualizar Usuario"
                                visible={isModalVisible}
                                onCancel={handleCancel}
                                footer={null}
                                centered
                                className="custom-modal"
                            >
                                <Form
                                    initialValues={selectedUsuario}
                                    onFinish={handleUpdate}
                                    layout="vertical"
                                    className="p-4"
                                    requiredMark={true}
                                >
                                    <Form.Item
                                        name="vch_correo"
                                        label="Correo Electrónico"
                                        rules={[{ required: true, message: 'Por favor ingrese el correo electrónico' }]}
                                        style={{ marginBottom: '16px' }}
                                    >
                                        <Input
                                            style={{
                                                borderRadius: '8px',
                                                height: '40px', 
                                                padding: '10px',
                                                border: '1px solid #d9d9d9',
                                            }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="id_rol"
                                        label="Rol"
                                        rules={[{ required: true, message: 'Por favor seleccione un rol' }]}
                                        style={{ marginBottom: '16px' }} 
                                    >
                                        <Select
                                            style={{
                                                borderRadius: '8px',
                                                height: '40px',
                                                padding: '0px',  // Ajustamos el padding para evitar un doble borde
                                                border: '1px solid #d9d9d9',
                                            }}
                                        >
                                            <Option value={1}>Directivo</Option>
                                            <Option value={2}>Administrativo</Option>
                                            <Option value={3}>Docente</Option>
                                            <Option value={4}>Ninguno</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="id_estatus"
                                        label="Estado"
                                        rules={[{ required: true, message: 'Por favor seleccione un estado' }]}
                                        style={{ marginBottom: '16px' }} 
                                    >
                                        <Select
                                            style={{
                                                borderRadius: '8px',
                                                height: '40px',
                                                padding: '0px',  // Ajustamos el padding para evitar un doble borde
                                                border: '1px solid #d9d9d9',
                                            }}
                                        >
                                            <Option value={1}>ACTIVO</Option>
                                            <Option value={2}>INACTIVO</Option>
                                            <Option value={3}>BLOQUEADO</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            style={{
                                                width: '100%',
                                                borderRadius: '8px',
                                                height: '40px',
                                            }}
                                        >
                                            Actualizar
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        )}


                    </Card>
                </div>
            </div>
        </SIDEBARDIRECT>
        
    );
}

export default TdosUsuarios;
