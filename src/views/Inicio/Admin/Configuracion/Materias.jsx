import React, { useState, useEffect } from 'react';
import { Select, Typography, Card, Input, Button, message, Table } from 'antd'; // Importamos los componentes de Ant Design
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';
import BreadcrumbAdmin from '../BreadcrumbAdmin';
import axios from 'axios';

const { Title } = Typography;

const Materias = () => {
    const [inputs, setInputs] = useState({ clave: '', nombre: '', grado: '' });
    const [materias, setMaterias] = useState([]);
    const [editMateriaId, setEditMateriaId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editNombre, setEditNombre] = useState('');
    const [editGrado, setEditGrado] = useState('');
    const [selectedGrado, setSelectedGrado] = useState('');

    useEffect(() => {
        getMaterias();
    }, [selectedGrado]);

    // Manejo de cambios en los inputs
    const handleChange = (value, name) => {
        setInputs(values => ({ ...values, [name]: value }));
    };

    const CrearMaterias = (event) => {
        event.preventDefault();

        // Validación antes de crear la materia
        if (!inputs.clave) {
            message.warning('Por favor, ingrese la clave de la materia');
            return;
        }
        if (!inputs.nombre) {
            message.warning('Por favor, ingrese el nombre de la materia');
            return;
        }
        if (!inputs.grado) {
            message.warning('Por favor, seleccione un grado');
            return;
        }

        axios.post('http://localhost/TeleSecundaria763/Materias/CreateMaterias.php', inputs)
            .then(function (response) {
                message.success('Materia creada con éxito');
                getMaterias();
                setInputs({ clave: '', nombre: '', grado: '' });
            })
            .catch(error => {
                console.error('Error al crear la materia:', error);
                message.error('Error al crear la materia');
            });
    };

    const getMaterias = () => {
        axios.post('http://localhost/TeleSecundaria763/Materias/ListMaterias.php', { grado: selectedGrado })
            .then(function (response) {
                if (Array.isArray(response.data)) {
                    setMaterias(response.data);
                } else {
                    setMaterias([]);
                    console.error("La respuesta no es un arreglo:", response.data);
                }
            })
            .catch(function (error) {
                console.error("Error al obtener las materias:", error);
                message.error('Error al obtener las materias');
                setMaterias([]);
            });
    };

    const deleteMateria = (id) => {
        const data = { id: id };
        fetch('http://localhost/TeleSecundaria763/Materias/EliminarMateria.php', {
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
                message.success('Materia eliminada con éxito');
                getMaterias();
            })
            .catch(error => {
                console.error('Error al eliminar la materia:', error);
                message.error('Error al eliminar la materia');
            });
    };

    const openEditModal = (materiaId) => {
        setIsEditModalOpen(true);
        setEditMateriaId(materiaId);
        getMateria(materiaId);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const getMateria = (materiaId) => {
        axios.post('http://localhost/TeleSecundaria763/Materias/TraerDatosDeLaMateria.php', { id: materiaId })
            .then(function (response) {
                const materiaData = response.data.materia;
                setEditNombre(materiaData.vchNomMateria);
                setEditGrado(materiaData.intClvGrado);
            })
            .catch(function (error) {
                console.error('Error al obtener los datos de la materia:', error);
                message.error('Error al obtener los datos de la materia');
            });
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();

        // Validación antes de actualizar la materia
        if (!editNombre) {
            message.warning('Por favor, ingrese el nombre de la materia');
            return;
        }
        if (!editGrado) {
            message.warning('Por favor, seleccione un grado');
            return;
        }

        const data = {
            id: editMateriaId,
            nombre: editNombre,
            grado: editGrado
        };

        fetch('http://localhost/TeleSecundaria763/Materias/UpdateMateria.php', {
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
                message.success('Materia actualizada con éxito');
                closeEditModal();
                getMaterias();
            })
            .catch(error => {
                console.error('Error al actualizar la materia:', error);
                message.error('Error al actualizar la materia');
            });
    };

    const handleGradoChange = (value) => {
        setSelectedGrado(value);
    };

    const columns = [
        { title: 'Clave', dataIndex: 'vchClvMateria', key: 'clave' },
        { title: 'Nombre Materia', dataIndex: 'vchNomMateria', key: 'nombre' },
        ...(selectedGrado === '' ? [{ title: 'Grado', dataIndex: 'intClvGrado', key: 'grado' }] : []),
        {
            title: 'Acciones',
            key: 'acciones',
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
                        onClick={() => openEditModal(record.id_MarxGrado)} // Usar el ID correcto
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
                        onClick={() => deleteMateria(record.id_MarxGrado)} // Usar el ID correcto
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
            {/* Contenedor principal con padding */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 'calc(100vh - 60px)', 
                    padding: '20px',
                }}
            >
                <BreadcrumbAdmin />

                <Title level={2}>Materias y Visualización</Title>

                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Card
                        style={{
                            background: '#fff',
                            padding: '20px',
                            flexGrow: 1, 
                            overflowY: 'auto', 
                        }}
                    >
                        {/* Formulario para agregar materia */}
                        <form onSubmit={CrearMaterias} style={{ width: '100%' }}>

                            {/* Contenedor principal */}
                            <div style={{ flex: 1, marginBottom: '20px' }}>

                                {/* Título para la creación de materias */}
                                <Title level={4} style={{ color: 'black', marginBottom: '20px' }}>
                                    Crear Materias
                                </Title>

                                {/* Inputs de Clave, Nombre y Select en la misma fila */}
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                                    <div style={{ flex: 1 }}>
                                        <label htmlFor="clave" className="block mb-2">
                                            Clave Materia:
                                        </label>
                                        <Input
                                            name="clave"
                                            placeholder="Ingrese Clave Materia"
                                            type="text"
                                            value={inputs.clave}
                                            onChange={(e) => handleChange(e.target.value, 'clave')}
                                            style={{
                                                width: '100%', // Ocupa todo el espacio disponible
                                                borderRadius: '8px',
                                                border: '1px solid #d9d9d9',
                                                height: '40px',
                                            }}
                                        />
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <label htmlFor="nombre" className="block mb-2">
                                            Nombre Materia:
                                        </label>
                                        <Input
                                            name="nombre"
                                            placeholder="Nombre de la Materia"
                                            value={inputs.nombre}
                                            onChange={(e) => handleChange(e.target.value, 'nombre')}
                                            type="text"
                                            style={{
                                                width: '100%', // Ocupa todo el espacio disponible
                                                borderRadius: '8px',
                                                border: '1px solid #d9d9d9',
                                                height: '40px',
                                            }}
                                        />
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <label htmlFor="grado" className="block mb-2">
                                            Grado:
                                        </label>
                                        <Select
                                            name="grado"
                                            value={inputs.grado}
                                            onChange={(value) => handleChange(value, 'grado')}
                                            style={{
                                                width: '100%', // Ocupa todo el espacio disponible
                                                height: '40px',
                                                borderRadius: '8px',
                                                border: '1px solid #d9d9d9',
                                            }}
                                        >
                                            <Select.Option value="">Seleccione un Grado:</Select.Option>
                                            <Select.Option value="1">Primero</Select.Option>
                                            <Select.Option value="2">Segundo</Select.Option>
                                            <Select.Option value="3">Tercero</Select.Option>
                                        </Select>
                                    </div>
                                </div>

                                {/* Botón centrado */}
                                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{
                                            backgroundColor: '#7d0430',
                                            borderColor: '#7d0430',
                                            height: '40px',
                                            width: '400px', // Ajusta el ancho del botón
                                            borderRadius: '8px',
                                            padding: '0 24px',
                                        }}
                                    >
                                        Agregar Materia
                                    </Button>
                                </div>
                            </div>
                        </form>

                        <div style={{ flex: 1, marginTop: '20px', marginBottom: '20px', maxWidth: '300px' }}>
                            <Title level={4} style={{ color: 'black', marginBottom: '10px' }}>
                                Visualización de Materias por Grado
                            </Title>
                            
                            <label htmlFor="grado" className="block mb-2">
                                Seleccionar Grado:
                            </label>
                            <Select
                                value={selectedGrado}
                                onChange={handleGradoChange}
                                style={{
                                    width: '100%',
                                    borderRadius: '8px',
                                    border: '1px solid #d9d9d9',
                                    height: '40px', // Igualamos la altura al select superior
                                }}
                            >
                                <Select.Option value="">Todos:</Select.Option>
                                <Select.Option value="1">Primero</Select.Option>
                                <Select.Option value="2">Segundo</Select.Option>
                                <Select.Option value="3">Tercero</Select.Option>
                            </Select>
                        </div>

                        {/* Visualización de materias en la tabla */}
                        <Table
                            columns={columns}
                            dataSource={materias}
                            rowKey="id_MarxGrado"
                            pagination={false} // Sin paginación
                        />

                        {/* Modal para Editar Materia */}
                        {isEditModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
                                    <div className="flex justify-between items-center border-b p-4 rounded-t-lg">
                                        <h5 className="text-xl font-bold">Editar Materia</h5>
                                        <button onClick={closeEditModal} className="text-gray-600 hover:text-gray-800">
                                            &times;
                                        </button>
                                    </div>
                                    <form onSubmit={handleEditSubmit} className="p-4 space-y-4">
                                        <div className="form-group">
                                            <label htmlFor="editNombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre:</label>
                                            <input
                                                value={editNombre}
                                                type="text"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                id="editNombre"
                                                onChange={(e) => setEditNombre(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="editGrado" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grado:</label>
                                            <select
                                                value={editGrado}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                id="editGrado"
                                                onChange={(e) => setEditGrado(e.target.value)}
                                            >
                                                <option value="">Seleccione un grado</option>
                                                <option value="1">Primero</option>
                                                <option value="2">Segundo</option>
                                                <option value="3">Tercero</option>
                                            </select>
                                        </div>

                                        <div className="flex justify-end space-x-4">
                                            <button
                                                type="button"
                                                className="btn btn-secondary text-gray-600 hover:text-gray-800"
                                                onClick={closeEditModal}
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
};

export default Materias;
