import React, { useState, useEffect } from 'react';
import { Typography, Card, Input, DatePicker, Button, message, Empty, Table } from 'antd'; // Importamos los componentes de Ant Design
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';
import BreadcrumbAdmin from '../BreadcrumbAdmin';
import axios from 'axios';

const { Title } = Typography;

function CrearGradoYgrupo() {
    const [nuevoGrado, setNuevoGrado] = useState('');//nuevos grados
    const [grados, setGrados] = useState([]);//almacenan todos los grados que se trae de la base de datos
    const [idGradoAct, setIdGradoAct] = useState(null);//id del grado seleccionado
    const [estadoModal1, setEstadoModal1] = useState(false);//modal
    const [editadovchGrado, seteditadovchGrado] = useState('');//dato grado nuevo

    const [nuevoGrupo, setNuevoGrupo] = useState('');//nuevos grupos
    const [grupos, setGrupos] = useState([]);//almacenan todos los grados que se trae de la base de datos
    const [idGrupoAct, setIdGrupoAct] = useState(null);//id del grado seleccionado
    const [estadoModal2, setEstadoModal2] = useState(false);//modal
    const [editadovchGrupo, seteditadovchGrupo] = useState('');//dato grado nuevo

    const datoGrado = (event) => {
        setNuevoGrado(event.target.value);
    };

    const verificacion1 = (event) => {
        event.preventDefault();
        if (!nuevoGrado) {
            message.warning('Por favor, introduzca algún dato.');
        } else {
            crearNuevoGrado();
        }
    };

    const crearNuevoGrado = () => {
        axios.post('http://localhost/TeleSecundaria763/crearGrado.php', { vchGrado: nuevoGrado }) 
            .then(function(response){
                console.log(response.data);
                getTraerGrados();
                setNuevoGrado('');
            })
            .catch(function(error) {
                console.error('Error al crear el nuevo grado:', error);
            });
    };

    useEffect(() => {
        getTraerGrados();
    }, []);

    function getTraerGrados() {
        axios.get('http://localhost/TeleSecundaria763/listarGrados.php')
            .then(function(response) {
                setGrados(response.data);
            });
    }

    const deleteGrado = (intClvGrado) => {
        const data = { intClvGrado: intClvGrado };

        fetch('http://localhost/TeleSecundaria763/eliminarGrado.php', {
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
            console.log('Grado Eliminado con exito');
            getTraerGrados();
        })
        .catch(error => {
            console.error('Error al intentar eliminar el grado:', error);
        });
    };

    const abrirModalEditar1 = (idGradoAct) => {
        setEstadoModal1(true);
        setIdGradoAct(idGradoAct);
        getGradoActualizado(idGradoAct);
    };

    const cerrarModalEditar1 = () => {
        setEstadoModal1(false);
    };

    const getGradoActualizado = (idGradoAct) => {
        axios.post('http://localhost/TeleSecundaria763/traerDatoDelGrado.php', { intClvGrado: idGradoAct })
            .then(function(response) {
                const datoGrado = response.data.grado[0];
                seteditadovchGrado(datoGrado.vchGrado);
            })
            .catch(function(error) {
                console.error('Error al obtener los datos del grado:', error);
            });
    };

    const ActualizarDatoGrado = (event) => {
        event.preventDefault();
        const data = {
            intClvGrado: idGradoAct,
            vchGrado: editadovchGrado
        };
        fetch('http://localhost/TeleSecundaria763/actualizarDatoGrado.php', {
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
            console.log('Datos actualizados');
            cerrarModalEditar1();
            getTraerGrados();
        })
        .catch(error => {
            console.error('Error al actualizar datos del grado:', error);
        });
    };

    const datoGrupo = (event) => {
        setNuevoGrupo(event.target.value);
    };

    const verificaciondatoGrupo = (event) => {
        event.preventDefault();
        if (!nuevoGrupo) {
            message.warning('Por favor, introduzca algún dato.');
        } else {
            crearNuevoGrupo();
        }
    };

    const crearNuevoGrupo = () => {
        axios.post('http://localhost/TeleSecundaria763/crearGrupo.php', { vchGrupo: nuevoGrupo })
            .then(function(response){
                console.log(response.data);
                getTraerGrupos();
                setNuevoGrupo('');
            })
            .catch(function(error) {
                console.error('Error al crear el nuevo grupo:', error);
            });
    };

    useEffect(() => {
        getTraerGrupos();
    }, []);

    function getTraerGrupos() {
        axios.get('http://localhost/TeleSecundaria763/listarGrupos.php')
            .then(function(response) {
                setGrupos(response.data);
            }
        );
    }

    const deleteGrupo = (intClvGrupo) => {
        const data = { intClvGrupo: intClvGrupo };

        fetch('http://localhost/TeleSecundaria763/eliminarGrupo.php', {
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
            console.log('Grupo Eliminado con exito');
            getTraerGrupos();
        })
        .catch(error => {
            console.error('Error al intentar eliminar el grupo:', error);
        });
    };

    const abrirModalEditarGrupo = (idGrupoAct) => {
        setEstadoModal2(true);
        setIdGrupoAct(idGrupoAct);
        getGrupoActualizado(idGrupoAct);
    };

    const cerrarModalEditarGrupo = () => {
        setEstadoModal2(false);
    };

    const getGrupoActualizado = (idGrupoAct) => {
        axios.post('http://localhost/TeleSecundaria763/traerDatoDelGrupo.php', { intClvGrupo: idGrupoAct })
            .then(function(response) {
                const datoGrupo = response.data.grupo[0];
                seteditadovchGrupo(datoGrupo.vchGrupo);
            })
            .catch(function(error) {
                console.error('Error al obtener los datos del grupo:', error);
            }
        );
    };

    const ActualizarDatoGrupo = (event) => {
        event.preventDefault();
        const data = {
            intClvGrupo: idGrupoAct,
            vchGrupo: editadovchGrupo
        };
        fetch('http://localhost/TeleSecundaria763/actualizarDatosGrupo.php', {
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
            console.log('Datos actualizados');
            cerrarModalEditarGrupo();
            getTraerGrupos();
        })
        .catch(error => {
            console.error('Error al actualizar datos del grupo:', error);
        });
    };

    const columns = [
        { title: 'Grado', dataIndex: 'vchGrado', key: 'vchGrado' },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <>
                    <Button 
                        type="primary"
                        onClick={() => abrirModalEditar1(record.key)} 
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
                        Editar
                    </Button>

                    <Button
                        type="danger"
                        onClick={() => deleteGrado(record.key)}
                        style={{ 
                            marginRight: 8, 
                            borderColor: '#dc3545',
                            color: '#dc3545',
                            backgroundColor: 'transparent',
                            transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                        }}
                        onMouseOver={(event) => { 
                            event.currentTarget.style.backgroundColor = '#dc3545';
                            event.currentTarget.style.color = '#fff';
                        }}
                        onMouseOut={(event) => { 
                            event.currentTarget.style.backgroundColor = 'transparent';
                            event.currentTarget.style.color = '#dc3545';
                        }}
                    >
                        Eliminar
                    </Button>
                </>
            ),
        },
    ];

    const columns1 = [
        { title: 'Grupo', dataIndex: 'vchGrupo', key: 'vchGrupo' },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <>
                    <Button 
                        type="primary"
                        onClick={() => abrirModalEditarGrupo(record.key)} 
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
                        Editar
                    </Button>

                    <Button
                        type="danger"
                        onClick={() => deleteGrupo(record.key)}
                        style={{ 
                            marginRight: 8, 
                            borderColor: '#dc3545',
                            color: '#dc3545',
                            backgroundColor: 'transparent',
                            transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                        }}
                        onMouseOver={(event) => { 
                            event.currentTarget.style.backgroundColor = '#dc3545';
                            event.currentTarget.style.color = '#fff';
                        }}
                        onMouseOut={(event) => { 
                            event.currentTarget.style.backgroundColor = 'transparent';
                            event.currentTarget.style.color = '#dc3545';
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

                <Title level={2}>Grados y Grupos</Title>

                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Card
                        style={{
                            background: '#fff',
                            padding: '20px',
                            flexGrow: 1,
                            overflowY: 'auto',
                        }}
                    >
                        {/* Formulario para crear nuevo Grado */}
                        <form onSubmit={verificacion1} style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', width: '100%' }}>
                            <div style={{ flex: '0 0 30%' }}>
                                <label htmlFor="vchGrado" className="block mb-2">
                                    Nuevo Grado
                                </label>
                                <Input
                                    id="vchGrado"
                                    placeholder="Ingrese Nuevo Grado"
                                    type="text"
                                    name="vchGrado"
                                    value={nuevoGrado}
                                    onChange={datoGrado}
                                    style={{
                                        width: '100%',
                                        borderRadius: '8px',
                                        border: '1px solid #d9d9d9',
                                        height: '40px',
                                    }}
                                />
                            </div>

                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
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
                                        width: '200px',
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
                                    Agregar Grado
                                </Button>
                            </div>
                        </form>

                        {/* Tabla para visualizar los grados */}
                        <Table
                            columns={columns}
                            dataSource={grados.map(grado => ({
                                key: grado.intClvGrado,
                                vchGrado: grado.vchGrado,
                                intClvGrado: grado.intClvGrado,
                            }))}
                            pagination={false}
                            style={{ marginTop: '20px' }}
                        />

                        {estadoModal1 && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                                <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                                    <div className="flex justify-between items-center border-b p-4 rounded-t-lg">
                                        <h5 className="text-xl font-bold">Editar Grado</h5>
                                        <button onClick={cerrarModalEditar1} className="text-gray-600 hover:text-gray-800">
                                            &times;
                                        </button>
                                    </div>
                                    <form onSubmit={ActualizarDatoGrado} className="p-4 space-y-4">
                                        <div className="form-group">
                                            <label htmlFor="editadovchGrado" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grado:</label>
                                            <input
                                                type="text"
                                                value={editadovchGrado}
                                                id="editadovchGrado"
                                                onChange={(e) => seteditadovchGrado(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                required
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-4">
                                            <button type="button" className="btn btn-secondary text-gray-600 hover:text-gray-800" onClick={cerrarModalEditar1}>Cancelar</button>
                                            <button type="submit" className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Guardar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Formulario para crear nuevo Grupo con espacio extra */}
                        <form onSubmit={verificaciondatoGrupo} style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', width: '100%', marginTop: '40px' }}>
                            <div style={{ flex: '0 0 30%' }}>
                                <label htmlFor="vchGrupo" className="block mb-2">
                                    Nuevo Grupo
                                </label>
                                <Input
                                    id="vchGrupo"
                                    placeholder="Ingrese Nuevo Grupo"
                                    type="text"
                                    name="vchGrupo"
                                    value={nuevoGrupo}
                                    onChange={datoGrupo}
                                    style={{
                                        width: '100%',
                                        borderRadius: '8px',
                                        border: '1px solid #d9d9d9',
                                        height: '40px',
                                    }}
                                />
                            </div>

                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
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
                                        width: '200px',
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
                                    Agregar Grupo
                                </Button>
                            </div>

                        </form>

                        {/* Tabla para visualizar los grupos */}
                        <Table
                            columns={columns1}
                            dataSource={grupos.map(grupo => ({
                                key: grupo.intClvGrupo,
                                vchGrupo: grupo.vchGrupo,
                                intClvGrupo: grupo.intClvGrupo,
                            }))}
                            pagination={false}
                            style={{ marginTop: '20px' }}
                        />

                        {estadoModal2 && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                                <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                                    <div className="flex justify-between items-center border-b p-4 rounded-t-lg">
                                        <h5 className="text-xl font-bold">Editar Grupo</h5>
                                        <button onClick={cerrarModalEditarGrupo} className="text-gray-600 hover:text-gray-800">
                                            &times;
                                        </button>
                                    </div>
                                    <form onSubmit={ActualizarDatoGrupo} className="p-4 space-y-4">
                                        <div className="form-group">
                                            <label htmlFor="editadovchGrupo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grupo:</label>
                                            <input
                                                type="text"
                                                value={editadovchGrupo}
                                                id="editadovchGrupo"
                                                onChange={(e) => seteditadovchGrupo(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                required
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-4">
                                            <button type="button" className="btn btn-secondary text-gray-600 hover:text-gray-800" onClick={cerrarModalEditarGrupo}>Cancelar</button>
                                            <button type="submit" className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Guardar</button>
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

export default CrearGradoYgrupo;
