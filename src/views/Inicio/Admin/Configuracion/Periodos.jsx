import React, { useState, useEffect } from 'react';
import { Typography, Card, Input, DatePicker, Button, message, Modal, Table } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';
import BreadcrumbAdmin from '../BreadcrumbAdmin';
import axios from 'axios';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { confirm } = Modal;

function Periodos() {
    const [cajaPeriodoNuevo, setCajaPeriodoNuevo] = useState({ vchPeriodo: '', dtFechaInicio: '', dtFechaFin: '' });
    const [periodos, setPeriodos] = useState([]);
    const [idPeriodoActualizar, setIdPeriodoActualizar] = useState(null);
    const [estadoModal, setEstadoModal] = useState(false);

    const [editadovchPeriodo, seteditadovchPeriodo] = useState('');
    const [editadodtFechaInicio, setEditadodtFechaInicio] = useState('');
    const [editadodtFechaFin, setEditadodtFechaFin] = useState('');

    useEffect(() => {
        getTraerPeriodos();
    }, []);

    const datosPeriodo = (event) => {   //  https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763
        const { name, value } = event.target;
        setCajaPeriodoNuevo((values) => ({ ...values, [name]: value }));
    };

    const verificacion = (event) => {
        event.preventDefault();
        if (!cajaPeriodoNuevo.vchPeriodo) {
            message.warning('Por favor, ingrese el nombre del periodo');
            return;
        }
        if (!cajaPeriodoNuevo.dtFechaInicio) {
            message.warning('Por favor, ingrese la fecha de inicio');
            return;
        }
        if (!cajaPeriodoNuevo.dtFechaFin) {
            message.warning('Por favor, ingrese la fecha de fin');
            return;
        }
        showConfirmCreate(); // Muestra el modal de confirmación antes de crear el periodo
    };

    const showConfirmCreate = () => {
        confirm({
            title: '¿Está seguro de agregar un nuevo periodo?',
            icon: <ExclamationCircleOutlined />,
            content: 'Se agregará un nuevo periodo a la lista.',
            onOk() {
                return crearNuevoPeriodo(); // Llama a la función para crear el periodo
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const crearNuevoPeriodo = () => {
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/crearPeriodo.php', cajaPeriodoNuevo)   //   http://localhost/TeleSecundaria763/crearPeriodo.php
            .then(response => {
                message.success('Periodo creado con éxito');
                getTraerPeriodos();
                setCajaPeriodoNuevo({ vchPeriodo: '', dtFechaInicio: '', dtFechaFin: '' });
            })
            .catch(error => {
                console.error('Error al crear el periodo:', error);
                message.error('Error al crear el periodo');
            });
    };

    const getTraerPeriodos = () => {
        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/listarPeriodos.php')   //   http://localhost/TeleSecundaria763/listarPeriodos.php
            .then(response => {
                setPeriodos(response.data || []);
            })
            .catch(error => {
                console.error('Error al traer los periodos:', error);
                setPeriodos([]);
            });
    };

    const showConfirmUpdate = () => {
        confirm({
            title: '¿Está seguro de actualizar el periodo?',
            icon: <ExclamationCircleOutlined />,
            content: 'Los datos del periodo se actualizarán.',
            onOk() {
                return actualizarDatosPeriodo(); // Llama a la función para actualizar el periodo
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const showDeleteConfirm = (intClvPeriodo) => {
        confirm({
            title: '¿Está seguro de eliminar este periodo?',
            icon: <ExclamationCircleOutlined />,
            content: 'El periodo será eliminado de la lista.',
            okText: 'Sí',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                return deleteUser(intClvPeriodo); // Llama a la función para eliminar el periodo
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const deleteUser = (intClvPeriodo) => {
        const data = { intClvPeriodo };

        fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/eliminarPeriodo.php', {  //   http://localhost/TeleSecundaria763/eliminarPeriodo.php
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                message.success('Periodo eliminado con éxito');
                getTraerPeriodos();
            })
            .catch(error => {
                console.error('Error al intentar eliminar el periodo:', error);
                message.error('Error al eliminar el periodo');
            });
    };

    const abrirModalEditar = (idPeriodoActualizar) => {
        setEstadoModal(true);
        setIdPeriodoActualizar(idPeriodoActualizar);
        getPeriodoActualizado(idPeriodoActualizar);
    };

    const cerrarModalEditar = () => {
        setEstadoModal(false);
    };

    const getPeriodoActualizado = (idPeriodoActualizar) => {
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerDatosDelPeriodo.php', { intClvPeriodo: idPeriodoActualizar })   //   http://localhost/TeleSecundaria763/traerDatosDelPeriodo.php
            .then(response => {
                const datoPeriodo = response.data.periodo[0];
                seteditadovchPeriodo(datoPeriodo.vchPeriodo);
                setEditadodtFechaInicio(datoPeriodo.dtFechaInicio);
                setEditadodtFechaFin(datoPeriodo.dtFechaFin);
            })
            .catch(error => {
                console.error('Error al obtener los datos del periodo:', error);
            });
    };

    const actualizarDatosPeriodo = () => {
        const data = {
            intClvPeriodo: idPeriodoActualizar,
            vchPeriodo: editadovchPeriodo,
            dtFechaInicio: editadodtFechaInicio,
            dtFechaFin: editadodtFechaFin
        };

        return fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/actualizarDatosPeriodo.php', {   //   http://localhost/TeleSecundaria763/actualizarDatosPeriodo.php
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                message.success('Periodo actualizado con éxito');
                cerrarModalEditar();
                getTraerPeriodos();
            })
            .catch(error => {
                console.error('Error al actualizar los datos del periodo:', error);
                message.error('Error al actualizar el periodo');
            });
    };

    const onDateChange = (dates, dateStrings) => {
        setCajaPeriodoNuevo({
            ...cajaPeriodoNuevo,
            dtFechaInicio: dateStrings[0],
            dtFechaFin: dateStrings[1],
        });
    };

    const columns = [
        { title: 'ID', dataIndex: 'intClvPeriodo', key: 'id' },
        { title: 'Periodo', dataIndex: 'vchPeriodo', key: 'periodo' },
        { title: 'Fecha Inicio', dataIndex: 'dtFechaInicio', key: 'fechaInicio' },
        { title: 'Fecha Fin', dataIndex: 'dtFechaFin', key: 'fechaFin' },
        {
            title: 'Acciones',
            dataIndex: '',
            key: 'x',
            render: (record) => (
                <>
                    <Button 
                        style={{ 
                            marginRight: 8, 
                            borderColor: '#007bff', // Borde azul
                            color: '#007bff', // Texto azul
                            backgroundColor: 'transparent', // Fondo transparente
                            transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                        }}
                        onClick={() => abrirModalEditar(record.intClvPeriodo)} 
                        onMouseOver={(event) => { 
                            event.currentTarget.style.backgroundColor = '#007bff'; // Fondo azul al pasar el ratón
                            event.currentTarget.style.color = '#fff'; // Texto blanco al pasar el ratón
                        }}
                        onMouseOut={(event) => { 
                            event.currentTarget.style.backgroundColor = 'transparent'; // Vuelve a transparente
                            event.currentTarget.style.color = '#007bff'; // Texto azul
                        }}
                    >
                        Editar
                    </Button>
                    <Button 
                        style={{ 
                            marginRight: 8, 
                            borderColor: '#dc3545', // Borde rojo
                            color: '#dc3545', // Texto rojo
                            backgroundColor: 'transparent', // Fondo transparente
                            transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                        }}
                        onClick={() => showDeleteConfirm(record.intClvPeriodo)} // Mostrar el modal de confirmación de eliminación
                        onMouseOver={(event) => { 
                            event.currentTarget.style.backgroundColor = '#dc3545'; // Fondo rojo al pasar el ratón
                            event.currentTarget.style.color = '#fff'; // Texto blanco al pasar el ratón
                        }}
                        onMouseOut={(event) => { 
                            event.currentTarget.style.backgroundColor = 'transparent'; // Vuelve a transparente
                            event.currentTarget.style.color = '#dc3545'; // Texto rojo
                        }}
                    >
                        Eliminar
                    </Button>
                </>
            ),
        },
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

                <Title level={2}>Periodos y Visualización</Title>

                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Card
                        style={{
                            background: '#fff',
                            padding: '20px',
                            flexGrow: 1,
                            overflowY: 'auto',
                        }}
                    >
                        <form onSubmit={verificacion} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                            <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
                                <div style={{ flex: '1' }}>
                                    <label htmlFor="vchPeriodo" className="block mb-2">
                                        Nuevo Periodo
                                    </label>
                                    <Input
                                        id="vchPeriodo"
                                        placeholder="Ingrese Nuevo Periodo"
                                        type="text"
                                        name="vchPeriodo"
                                        value={cajaPeriodoNuevo.vchPeriodo}
                                        onChange={datosPeriodo}
                                        style={{
                                            width: '100%',
                                            marginBottom: '20px',
                                            borderRadius: '8px',
                                            border: '1px solid #d9d9d9',
                                            height: '40px',
                                        }}
                                    />
                                </div>

                                <div style={{ flex: '1' }}>
                                    <label htmlFor="dtFecha" className="block mb-2">
                                        Seleccionar fechas del periodo
                                    </label>
                                    <RangePicker
                                        onChange={onDateChange}
                                        placeholder={['Fecha de inicio', 'Fecha de fin']}
                                        style={{
                                            width: '100%',
                                            marginBottom: '20px',
                                            borderRadius: '8px',
                                            height: '40px',
                                            padding: '8px',
                                        }}
                                        format="YYYY-MM-DD"
                                    />  
                                </div>
                            </div>

                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                <Button
                                    type="primary"
                                    htmlType='submit'
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
                                    Agregar Periodo
                                </Button>
                            </div>
                        </form>

                        <div style={{ flex: 1, marginTop: '20px', marginBottom: '20px' }}>
                            <Title level={4} style={{ color: 'black', marginBottom: '10px' }}>
                                Visualización de Periodos
                            </Title>
                        </div>

                        <Table
                            style={{ flex: 1, marginTop: '30px', marginBottom: '20px' }}
                            columns={columns}
                            dataSource={periodos}
                            rowKey="intClvPeriodo"
                            expandable={{
                                expandedRowRender: (record) => (
                                    <p style={{ margin: 0 }}>
                                        Periodo: {record.vchPeriodo}, Inicio: {record.dtFechaInicio}, Fin: {record.dtFechaFin}
                                    </p>
                                ),
                                rowExpandable: (record) => record.vchPeriodo !== 'Not Expandable',
                            }}
                        />

                        {/* Modal para Editar Periodo */}
                        {estadoModal && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                                <div className="bg-white dark:bg-gray-800 rounded shadow-lg w-full max-w-md">
                                    <div className="flex justify-between items-center border-b p-4 rounded">
                                        <h5 className="text-xl font-bold">Editar Periodo</h5>
                                        <button onClick={cerrarModalEditar} className="text-gray-600 hover:text-gray-800">
                                            &times;
                                        </button>
                                    </div>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        showConfirmUpdate(); // Mostrar confirmación antes de actualizar
                                    }} className="p-4 space-y-4">
                                        <div className="form-group">
                                            <label htmlFor="editadovchPeriodo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Periodo:</label>
                                            <input
                                                type="text"
                                                value={editadovchPeriodo}
                                                id="editadovchPeriodo"
                                                onChange={(e) => seteditadovchPeriodo(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="editadodtFechaInicio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Inicio:</label>
                                            <input
                                                type="date"
                                                value={editadodtFechaInicio}
                                                id="editadodtFechaInicio"
                                                onChange={(e) => setEditadodtFechaInicio(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="editadodtFechaFin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Fin:</label>
                                            <input
                                                type="date"
                                                value={editadodtFechaFin}
                                                id="editadodtFechaFin"
                                                onChange={(e) => setEditadodtFechaFin(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-4">
                                            <button 
                                                type="button" 
                                                className="px-4 py-2 border rounded text-red-500 border-red-500 transition-colors duration-300 hover:bg-red-500 hover:text-white"
                                                onClick={cerrarModalEditar}
                                            >
                                                Cancelar
                                            </button>
                                            <button 
                                                type="submit" 
                                                className="px-4 py-2 border rounded text-blue-500 border-blue-500 transition-colors duration-300 hover:bg-blue-500 hover:text-white"
                                            >
                                                Guardar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                    </Card>
                </div>
            </div>
        </SIDEBARADMIN>
    );
}

export default Periodos;
