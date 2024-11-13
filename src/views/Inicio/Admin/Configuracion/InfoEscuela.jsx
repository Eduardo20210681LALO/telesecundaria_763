import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Input, Form, message } from 'antd';
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';

function InfoEscuela() {
    const [escuelas, setEscuelas] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedEscuela, setSelectedEscuela] = useState(null);
    const [form] = Form.useForm();
    const [modalForm] = Form.useForm();

    useEffect(() => {
        fetchEscuelas();
    }, []);

    const fetchEscuelas = async () => {
        try {
            const response = await axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/InfoEscuela/TraerInfoEscuela.php');   // http://localhost/TeleSecundaria763/InfoEscuela/TraerInfoEscuela.php
            setEscuelas(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setEscuelas([]);
        }
    };

    const validarCampos = (values) => {
        const { ubicacion, documentos, fecha, costo } = values;
        if (!ubicacion || !documentos || !fecha || !costo) {
            message.info('Por favor, complete todos los campos');
            return false;
        }
        return true;
    };
    

    const agregarEscuela = (values) => {
        if (!validarCampos(values)) return;

        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/InfoEscuela/InsertaInfo.php', values)   //   http://localhost/TeleSecundaria763/InfoEscuela/InsertaInfo.php
            .then(response => {
                message.success('Datos agregados exitosamente');
                form.resetFields();
                setIsAddModalVisible(false);
                fetchEscuelas();
            })
            .catch(error => {
                message.error('Error al agregar datos');
                console.error('Error al hacer la petición de agregar:', error);
            });
    };

    const editarEscuela = (escuela) => {
        setSelectedEscuela(escuela);
        setIsEditModalVisible(true);
        modalForm.setFieldsValue({
            ubicacion: escuela.vch_UbicEscuela,
            documentos: escuela.vch_DocRequeridos,
            fecha: escuela.vch_fechaInscrip,
            costo: escuela.vch_CostoInscrip,
        });
    };

    const actualizarEscuela = (values) => {
        if (!validarCampos(values)) return;
    
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/InfoEscuela/ActualizarDatosEscuela.php', {   //   http://localhost/TeleSecundaria763/InfoEscuela/ActualizarDatosEscuela.php
            id: selectedEscuela.id,
            ...values
        })
        .then(response => {
            message.success('Datos Actualizados exitosamente');
            setIsEditModalVisible(false);
            setSelectedEscuela(null);
            fetchEscuelas();
        })
        .catch(error => {
            message.error('Error al actualizar la escuela');
            console.error('Error al hacer la petición de actualización:', error);
        });
    };

    const eliminarEscuela = (id) => {
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/InfoEscuela/EliminarInfoEsc.php', { id })   //    http://localhost/TeleSecundaria763/InfoEscuela/EliminarInfoEsc.php
            .then(response => {
                message.success('Datos eliminados exitosamente');
                fetchEscuelas();
            })
            .catch(error => {
                message.error('Error al eliminar los datos');
                console.error('Error al hacer la petición de eliminación:', error);
            });
    };

    const handleAddCancel = () => {
        setIsAddModalVisible(false);
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        setSelectedEscuela(null);
    };

    return (
        <div className="flex h-screen">
            <SIDEBARADMIN />
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                        <div className="flex justify-between items-center pb-4">
                            <h2 className="text-2xl font-semibold leading-tight">Información de la Escuela</h2>
                            <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
                                Agregar Datos
                            </Button>
                        </div>
                        <h2 className="mt-8 text-2xl font-semibold leading-tight"></h2>
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación de la Escuela</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documentos Requeridos</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Inscripción</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo de Inscripción</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {escuelas.length > 0 ? (
                                            escuelas.map((escuela) => (
                                                <tr key={escuela.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{escuela.vch_UbicEscuela}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{escuela.vch_DocRequeridos}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{escuela.vch_fechaInscrip}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{escuela.vch_CostoInscrip}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <Button className="btn btn-warning btn-sm mr-2" type="link" onClick={() => editarEscuela(escuela)}>Editar</Button>
                                                        <Button className="btn btn-danger btn-sm" type="link" onClick={() => eliminarEscuela(escuela.id)}>Eliminar</Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                                    No hay escuelas disponibles
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                title="Agregar Datos de la Escuela"
                visible={isAddModalVisible}
                onCancel={handleAddCancel}
                footer={null}
                centered
                className="custom-modal"
            >
                <Form
                    form={form}
                    onFinish={agregarEscuela}
                    layout="vertical"
                    className="p-4"
                >
                    <Form.Item
                        name="ubicacion"
                        label="Ubicación de la Escuela"
                        rules={[{ required: true, message: 'Por favor, complete este campo' }]}
                    >
                        <Input className="rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    </Form.Item>
                    <Form.Item
                        name="documentos"
                        label="Documentos Requeridos"
                        rules={[{ required: true, message: 'Por favor, complete este campo' }]}
                    >
                        <Input className="rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    </Form.Item>
                    <Form.Item
                        name="fecha"
                        label="Fecha de Inscripción"
                        rules={[{ required: true, message: 'Por favor, complete este campo' }]}
                    >
                        <Input className="rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    </Form.Item>
                    <Form.Item
                        name="costo"
                        label="Costo de Inscripción"
                        rules={[{ required: true, message: 'Por favor, complete este campo' }]}
                    >
                        <Input className="rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                    </Form.Item>
                    <Form.Item className="mb-4">
                        <Button type="primary" htmlType="submit" className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg p-3">
                            Agregar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {selectedEscuela && (
                <Modal
                    title="Actualizar Escuela"
                    visible={isEditModalVisible}
                    onCancel={handleEditCancel}
                    footer={null}
                    centered
                    className="custom-modal"
                >
                    <Form
                        form={modalForm}
                        onFinish={actualizarEscuela}
                        layout="vertical"
                        className="p-4"
                    >
                        <Form.Item
                            name="ubicacion"
                            label="Ubicación de la Escuela"
                            rules={[{ required: true, message: 'Por favor, complete este campo' }]}
                        >
                            <Input className="rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                        </Form.Item>
                        <Form.Item
                            name="documentos"
                            label="Documentos Requeridos"
                            rules={[{ required: true, message: 'Por favor, complete este campo' }]}
                        >
                            <Input className="rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                        </Form.Item>
                        <Form.Item
                            name="fecha"
                            label="Fecha de Inscripción"
                            rules={[{ required: true, message: 'Por favor, complete este campo' }]}
                        >
                            <Input className="rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                        </Form.Item>
                        <Form.Item
                            name="costo"
                            label="Costo de Inscripción"
                            rules={[{ required: true, message: 'Por favor, complete este campo' }]}
                        >
                            <Input className="rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                        </Form.Item>
                        <Form.Item className="mb-4">
                            <Button type="primary" htmlType="submit" className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg p-3">
                                Actualizar
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
}

export default InfoEscuela;
