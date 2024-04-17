import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import NavAdministrativos from '../../../../components/NavAdministrativos';
import DashboardAdministrativos from '../../../../components/DashboardAdministrativos';
import { Button } from "flowbite-react";

function Periodos() {


    const [cajaPeriodoNuevo, setCajaPeriodoNuevo] = useState({ vchPeriodo: '', dtFechaInicio: '', dtFechaFin: '' });
    const [periodos, setPeriodos] = useState([]);
    const [idPeriodoActualizar, setIdPeriodoActualizar] = useState(null);
    const [estadoModal, setEstadoModal] = useState(false);

    const [editadovchPeriodo, seteditadovchPeriodo] = useState('');
    const [editadodtFechaInicio, setEditadodtFechaInicio] = useState('');
    const [editadodtFechaFin, setEditadodtFechaFin] = useState('');

    const datosPeriodo = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setCajaPeriodoNuevo(values => ({ ...values, [name]: value }));
    }
    
    const verificacion = (event) => {
        event.preventDefault();
        if (!cajaPeriodoNuevo.vchPeriodo && !cajaPeriodoNuevo.dtFechaInicio && !cajaPeriodoNuevo.dtFechaFin) {
            message.warning('Por favor, introduzca algún dato...');
            console.log('Faltan datos');
        } else {
            crearNuevoPeriodo();
        }
    }

    const crearNuevoPeriodo = () => {
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/crearPeriodo.php', cajaPeriodoNuevo) //      http://localhost/TeleSecundaria763/crearPeriodo.php
            .then(function(response){
                console.log(response.data);
                getTraerPeridos();
                setCajaPeriodoNuevo({ vchPeriodo: '', dtFechaInicio: '', dtFechaFin: '' });
            });
    }

    function onCloseModal() {
        setOpenModal(false);
       
      }
    
    

    useEffect(() => {
        getTraerPeridos();
    }, []);

    function getTraerPeridos() {
        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/listarPeriodos.php') //  http://localhost/TeleSecundaria763/listarPeriodos.php
            .then(function(response) {
                setPeriodos(response.data);
            }
        );
    }

    const deleteUser = (intClvPeriodo) => {
        const data = { intClvPeriodo: intClvPeriodo };

        console.log(intClvPeriodo)
        fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/eliminarPeriodo.php', {   //    http://localhost/TeleSecundaria763/eliminarPeriodo.php
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
            console.log(data);
            console.log('Periodo Eliminado con exito');
            getTraerPeridos();
        })
        .catch(error => {
            console.error('Error al intentar eliminar el periodo:', error);
        });
    };

    const abrirModalEditar = (idPeriodoActualizar) => {
        console.log("Modal abierto para actualizar datos con ayuda del id del siguiente periodo:", idPeriodoActualizar);
        setEstadoModal(true);
        setIdPeriodoActualizar(idPeriodoActualizar);
        getPeridoActualizado(idPeriodoActualizar);
    };

    const cerrarModalEditar = () => {
        setEstadoModal(false);
    };

    const getPeridoActualizado = (idPeriodoActualizar) => {
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerDatosDelPeriodo.php', { intClvPeriodo: idPeriodoActualizar }) //       http://localhost/TeleSecundaria763/traerDatosDelPeriodo.php
            .then(function(response) {
                const datoPeriodo = response.data.periodo[0];
                seteditadovchPeriodo(datoPeriodo.vchPeriodo);
                setEditadodtFechaInicio(datoPeriodo.dtFechaInicio);
                setEditadodtFechaFin(datoPeriodo.dtFechaFin);
            })
            .catch(function(error) {
                console.error('Error al obtener los datos del periodo:', error);
            });
    };

    const ActualizarDatosPeriodo = (event) => {
        event.preventDefault();
        const data = {
            intClvPeriodo: idPeriodoActualizar,
            vchPeriodo: editadovchPeriodo,
            dtFechaInicio: editadodtFechaInicio,
            dtFechaFin: editadodtFechaFin
        };
        fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/actualizarDatosPeriodo.php', { //    http://localhost/TeleSecundaria763/actualizarDatosPeriodo.php
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
            console.log(data);
            console.log('Se actualizó los datos');
            cerrarModalEditar();
            getTraerPeridos();
        })
        .catch(error => {
            console.error('Error al actualizar datos del periodo:', error);
        });
    };

    console.log("Estado del Modal:", estadoModal);

    return (
        <div>
            <DashboardAdministrativos />
            <NavAdministrativos />
            <main className='mt-5 pl-52 mx-auto pl-28'>
                <section className="flex justify-center">
                    <div className="mx-auto max-w-screen-xl px-5 lg:px-12 w-3/6 bg-gray-50 dark:bg-gray-900 p-32">
                        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <div className='container'>
                                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Crear Periodos</h2>
                                    <form>
                                        <div className="grid gap-4">
                                            <div>
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nuevo periodo:</label>
                                                <input type='number' name='vchPeriodo' value={cajaPeriodoNuevo.vchPeriodo} onChange={datosPeriodo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo periodo" required=""/>
                                            </div>
                                            <div>
                                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de inicio:</label>
                                                <input type='date' name='dtFechaInicio' value={cajaPeriodoNuevo.dtFechaInicio} onChange={datosPeriodo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese la fecha de inicio" required=""/>
                                            </div>
                                            <div>
                                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha Fin:</label>
                                                <input type='date' name='dtFechaFin' value={cajaPeriodoNuevo.dtFechaFin} onChange={datosPeriodo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese la fecha del fin:" required=""/>
                                            </div>
                                            <div className="flex justify-center mt-2">
                                                <Button onClick={verificacion} type="submit" color="blue" className="mt-2">Crear nuevo periodo</Button>

                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>


            <main className='mt-2 pl-60 mx-auto pl-12'>
                <section class="flex justify-center">
                    <div class="mx-auto max-w-screen-xl px-3 lg:px-12 w-5/6 bg-gray-50 dark:bg-gray-900 p-16">
                        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                            <div class="overflow-x-auto ">
                                <div className='container'>


                                    <div class="overflow-x-auto">
                                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Periodos</h2>
                                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" class="px-4 py-3">id</th>
                                                    <th scope="col" class="px-4 py-3">Periodo</th>
                                                    <th scope="col" class="px-4 py-3">Fecha Inicio</th>
                                                    <th scope="col" class="px-4 py-3">Fecha Fin</th>
                                                    <th scope="col" class="px-4 py-3">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {periodos.map((periodo, key) =>
                                                    <tr key={key} class="border-b dark:border-gray-700">
                                                        <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{periodo.intClvPeriodo}</th>
                                                            <td class="px-4 py-3">{periodo.vchPeriodo}</td>
                                                            <td class="px-4 py-3">{periodo.dtFechaInicio}</td>
                                                            <td class="px-4 py-3">{periodo.dtFechaFin}</td>
                                                            <td class="px-1 py-3">
                                                                <button onClick={() => abrirModalEditar(periodo.intClvPeriodo)} class="text-blue-600 hover:text-blue-800 focus:outline-none">Editar</button>
                                                                <button onClick={() => deleteUser(periodo.intClvPeriodo)} class="text-red-600 hover:text-red-800 focus:outline-none ml-2">Eliminar</button>
                                                            </td>
                                                            <td class="px-4 py-3 flex items-center justify-end">                 
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
                </section>
            </main>


            {estadoModal && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Periodo</h5>
                               
                            </div>
                            <form onSubmit={ActualizarDatosPeriodo}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Periodo:</label>
                                        <input type='number'value={editadovchPeriodo}id="editadovchPeriodo" onChange={(e) => seteditadovchPeriodo(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo periodo" required=""/>
                                    </div>

                                    <div className="form-group">
                                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Inicio:</label>
                                        <input type='date'value={editadodtFechaInicio} id="editadodtFechaInicio" onChange={(e) => setEditadodtFechaInicio(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo periodo" required=""/>
                                    </div>

                                    <div className="form-group">
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha Fin:</label>
                                        <input type='date' value={editadodtFechaFin} id="editadodtFechaFin" onChange={(e) => setEditadodtFechaFin(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo periodo" required=""/>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={cerrarModalEditar}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}

export default Periodos