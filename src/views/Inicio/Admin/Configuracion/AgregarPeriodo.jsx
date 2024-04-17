import React, { useState, useEffect } from 'react';
import Sidebar1 from '../../../../components/Sidebar1';
import NavBar1 from '../../../../components/NavBar1';
import { message } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AgregarPeriodo() {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [periodo, setPeriodo] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const [periodos, setPeriodos] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);




    useEffect(() => {
        async function fetchPeriodos() {
            try {
                const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerPeriodos.php');   //      http://localhost/TeleSecundaria763/traerPeriodos.php
                if (!response.ok) {
                    message.error('Error al cargar los periodos');
                }
                const data = await response.json();
                if (data.success) {
                    setPeriodos(data.periodos);
                } else {
                    message.error(data.message);
                }
            } catch (error) {
                console.error('Error al cargar los periodos:', error);
            }
        }
        fetchPeriodos();
    }, []);

    const limpiarCampos = () => {
        setPeriodo('');
        setFechaInicio('');
        setFechaFin('');
    };


    const InsertarNuevoPeriodo = async () => {
        if (!periodo || !fechaInicio || !fechaFin) {
            message.warning('Por favor, complete todos los campos....');
            return;
        }
        const datos = {
            periodo: periodo,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin
        };
        try {
            const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/insertarNuevoPeriodo.php', {  //   http://localhost/TeleSecundaria763/insertarNuevoPeriodo.php
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            const { success, message: respMessage } = await response.json();
            if (success === true) {
                limpiarCampos();
                message.success('Periodo insertado correctamente');
            } else {
                message.error(respMessage);
            }
        } catch (error) {
            console.error('Error al intentar registrar el periodo:', error);
            message.error('Error del servidor');
        }
    };


    const EliminarPeriodo = async (idPeriodo) => {
        console.log(idPeriodo)
        try {
            const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/eliminarPeriodo.php', {   //   http://localhost/TeleSecundaria763/eliminarPeriodo.php
                method: 'DELETE',
                body: JSON.stringify({ idPeriodo }), // Envía el ID como parte del cuerpo de la solicitud
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                message.error('Error al eliminar el período');
                return;
            }
    
            const data = await response.json();
            if (data.success) {
                message.success('Período eliminado correctamente');
                // Realiza cualquier otra acción necesaria después de eliminar el período
            } else {
                message.error(data.message);
            }
        } catch (error) {
            console.error('Error al eliminar el período:', error);
        }
    };

    const [users, setUsers] = useState([]);

    
    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/pruebaDatos.php').then(function(response) {  //   http://localhost/TeleSecundaria763/pruebaDatos.php
            console.log(response.data);
            setUsers(response.data);
        });
    }

    const deleteUser = (id) => {
        axios.delete(`https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/borrarPeriodo.php/${id}`).then(function(response) { //       http://localhost/TeleSecundaria763/borrarPeriodo.php
            console.log(response.data);
            getUsers();
        });
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col w-full items-center mt-80">
                <div className="p-1 flex-grow w-full max-w-xl">
                    <h1 className="text-2xl font-semibold mb-8">Gestión de Periodos Escolares</h1>
                    <form onSubmit={(e) => { e.preventDefault()}} className="w-full">

                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Todos los Periodos</h2>
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-400 px-4 py-2">Periodo</th>
                                        <th className="border border-gray-400 px-4 py-2">Fecha de Inicio</th>
                                        <th className="border border-gray-400 px-4 py-2">Fecha de Fin</th>
                                        <th className="border border-gray-400 px-4 py-2">Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {periodos.map(periodo => {
                                        const handleEliminarPeriodo = () => {
                                            EliminarPeriodo(periodo.id);
                                        };

                                        return (
                                            <tr key={periodo.id}>
                                                <td className="border border-gray-400 px-4 py-2">{periodo.vchPeriodo}</td>
                                                <td className="border border-gray-400 px-4 py-2">{periodo.dtFechaInicio}</td>
                                                <td className="border border-gray-400 px-4 py-2">{periodo.dtFechaFin}</td>
                                                <td className="border border-gray-400 px-4 py-2">
                                                    <button onClick={() => handleEdit(periodo.id)} className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 mr-2">Editar</button>
                                                    <button onClick={handleEliminarPeriodo} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Eliminar periodo</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>


                            </table>
                        </div>

                        <h1>Lista de users</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user, key) =>
                                    <tr key={key}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.mobile}</td>
                                        <td>
                                            <Link to={`user/${user.id}/edit`}/>
                                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>


                        </table>




            <br></br><br></br><br></br><br></br><br></br><br></br>
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Periodo</h2>
                            
                            <div>
                                <div className="flex items-center mb-6">
                                    <label htmlFor="periodo" className="mr-2">Periodo:</label>
                                    <input type="text" id="periodo" value={periodo} onChange={(e) => setPeriodo(e.target.value)}
                                        className="border border-gray-400 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="flex items-center mb-6">
                                    <label htmlFor="fechaInicio" className="mr-2">Fecha de Inicio:</label>
                                    <input type="date" id="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)}
                                        className="border border-gray-400 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="flex items-center mb-6">
                                    <label htmlFor="fechaFin" className="mr-2">Fecha de Fin:</label>
                                    <input type="date" id="fechaFin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)}
                                        className="border border-gray-400 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
                                        onClick={() => InsertarNuevoPeriodo()}>
                                        Guardar
                                    </button>
                                    <button type="button" onClick={limpiarCampos} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>























                    </form>
                </div>
            </div>
            
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
                        <h2>Editar Periodo</h2>
                        <div className="flex flex-col">
                            <label htmlFor="editPeriodo" className="mb-2">Periodo:</label>
                            <input type="text" id="editPeriodo" value={periodo1} onChange={(e) => setPeriodo1(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="editFechaInicio" className="mb-2">Fecha de Inicio:</label>
                            <input type="date" id="editFechaInicio"  value={fechaInicio1} onChange={(e) => setFechaInicio1(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="editFechaFin" className="mb-2">Fecha de Fin:</label>
                            <input type="date" id="editFechaFin"  value={fechaFin1} onChange={(e) => setFechaFin1(e.target.value)} />
                        </div>
                        <button onClick={() => handleSaveEdit(editPeriodo)}>Guardar</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AgregarPeriodo;