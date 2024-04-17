import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import NavAdministrativos from '../../../../components/NavAdministrativos';
import DashboardAdministrativos from '../../../../components/DashboardAdministrativos';

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




    const datoGrado = (event) => {//***************** */
        setNuevoGrado(event.target.value);//***************** */
    };

    const verificacion1 = (event) => {//***************** */
        event.preventDefault();
        if (!nuevoGrado) {
            message.warning('Por favor, introduzca algún dato.');
        } else {
            crearNuevoGrado();
        }
    };

    const crearNuevoGrado = () => {//***************** */
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/crearGrado.php', { vchGrado: nuevoGrado })   //     http://localhost/TeleSecundaria763/crearGrado.php
            .then(function(response){
                console.log(response.data);
                getTraerGrados();
                setNuevoGrado('');
            })
            .catch(function(error) {
                console.error('Error al crear el nuevo grado:', error);
            });
    };

    useEffect(() => {//***************** */
        getTraerGrados();
    }, []);

    function getTraerGrados() {//***************** */
        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/listarGrados.php')  //  http://localhost/TeleSecundaria763/listarGrados.php
            .then(function(response) {
                setGrados(response.data);
            }
        );
    }

    const deleteGrado = (intClvGrado) => {//***************** */
        const data = { intClvGrado: intClvGrado };

        console.log(intClvGrado);
        fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/eliminarGrado.php', { //   http://localhost/TeleSecundaria763/eliminarGrado.php
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
            getTraerGrados();
        })
        .catch(error => {
            console.error('Error al intentar eliminar el periodo:', error);
        });
    };

    const abrirModalEditar1 = (idGradoAct) => {//***************** */
        console.log("Modal abierto para actualizar datos con ayuda del id del siguiente periodo:", idGradoAct);
        setEstadoModal1(true);
        setIdGradoAct(idGradoAct);
        getGradoActualizado(idGradoAct);
    };

    const cerrarModalEditar1 = () => {
        setEstadoModal1(false);
    };

    const getGradoActualizado = (idGradoAct) => {//***************** */
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerDatoDelGrado.php', { intClvGrado: idGradoAct })  //  http://localhost/TeleSecundaria763/traerDatoDelGrado.php
            .then(function(response) {
                const datoGrado = response.data.grado[0];
                seteditadovchGrado(datoGrado.vchGrado);
            })
            .catch(function(error) {
                console.error('Error al obtener los datos del periodo:', error);
            });
    };

    const ActualizarDatoGrado = (event) => {//***************** */
        event.preventDefault();
        const data = {
            intClvGrado: idGradoAct,
            vchGrado: editadovchGrado
        };
        fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/actualizarDatoGrado.php', {  // http://localhost/TeleSecundaria763/actualizarDatoGrado.php
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
            cerrarModalEditar1();
            getTraerGrados();
        })
        .catch(error => {
            console.error('Error al actualizar datos del periodo:', error);
        });
    };
    console.log("Estado del Modal:", estadoModal1);


    ///******************************************************************************************************* */


    const datoGrupo = (event) => {//***************** */
        setNuevoGrupo(event.target.value);//***************** */
    };

    const verificaciondatoGrupo = (event) => {//***************** */
        event.preventDefault();
        if (!nuevoGrupo) {
            message.warning('Por favor, introduzca algún dato.');
        } else {
            crearNuevoGrupo();
        }
    };

    const crearNuevoGrupo = () => {//***************** */
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/crearGrupo.php', { vchGrupo: nuevoGrupo })  //   http://localhost/TeleSecundaria763/crearGrupo.php
            .then(function(response){
                console.log(response.data);
                getTraerGrupos();
                setNuevoGrupo('');
            })
            .catch(function(error) {
                console.error('Error al crear el nuevo grado:', error);
            });
    };

    useEffect(() => {//***************** */
        getTraerGrupos();
    }, []);

    function getTraerGrupos() {//***************** */
        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/listarGrupos.php')  //   http://localhost/TeleSecundaria763/listarGrupos.php
            .then(function(response) {
                setGrupos(response.data);
            }
        );
    }

    const deleteGrupo = (intClvGrupo) => {//***************** */
        const data = { intClvGrupo: intClvGrupo };

        console.log(intClvGrupo);
        fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/eliminarGrupo.php', {  //  http://localhost/TeleSecundaria763/eliminarGrupo.php
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
            getTraerGrupos();
        })
        .catch(error => {
            console.error('Error al intentar eliminar el periodo:', error);
        });
    };

    const abrirModalEditarGrupo = (idGrupoAct) => {
        console.log("Modal abierto para actualizar datos con ayuda del id del siguiente periodo:", idGrupoAct);
        setEstadoModal2(true);
        setIdGrupoAct(idGrupoAct);//metes el id del grupo en una constante para guardar el id
        getGrupoActualizado(idGrupoAct);//mandas el id del grupo a la funcion de traer datos del grupo con ayuda del id
    };

    const cerrarModalEditarGrupo = () => {
        setEstadoModal2(false);
    };

    const getGrupoActualizado = (idGrupoAct) => {

        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerDatoDelGrupo.php', { intClvGrupo: idGrupoAct })  //   http://localhost/TeleSecundaria763/traerDatoDelGrupo.php
            .then(function(response) {
                const datoGrupo = response.data.grupo[0];
                seteditadovchGrupo(datoGrupo.vchGrupo);
                console.log(editadovchGrupo);
            })
            .catch(function(error) {
                console.error('Error al obtener los datos del periodo:', error);
            });
    };

    const ActualizarDatoGrupo = (event) => {//***************** */
        event.preventDefault();
        const data = {
            intClvGrupo: idGrupoAct,
            vchGrupo: editadovchGrupo
        };
        fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/actualizarDatosGrupo.php', {  //   http://localhost/TeleSecundaria763/actualizarDatosGrupo.php
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
            cerrarModalEditarGrupo();
            getTraerGrupos();
        })
        .catch(error => {
            console.error('Error al actualizar datos del periodo:', error);
        });
    };

    return (
        <div>
            <NavAdministrativos />
            <DashboardAdministrativos />
            <div>
                <main className='mt-5 pl-52 mx-auto pl-28'>
                    <section className="flex justify-center">
                        <div className="mx-auto max-w-screen-xl px-5 lg:px-12 w-3/6 bg-gray-50 dark:bg-gray-900 p-32">
                            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                                <div className="overflow-x-auto">
                                    <div className='container'>
                                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Crear Grado</h2>
                                        <form>
                                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nuevo Grado:</label>
                                                    <input type='text' name='vchGrado' value={nuevoGrado} onChange={datoGrado} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo grado" required="" />
                                                </div>
                                            </div>
                                            <div className="flex justify-center mt-4">
                                                <button onClick={verificacion1} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
                                                    Crear nuevo grado
                                                </button>
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
                                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Grados</h2>
                                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="px-20 py-3">id</th>
                                                        <th scope="col" className="px-20 py-3">Grado</th>
                                                        <th scope="col" className="px-20 py-3">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {grados.map((grado, key) =>
                                                        <tr key={key} className="border-b dark:border-gray-700">
                                                            <th scope="row" className="px-20 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{grado.intClvGrado}</th>
                                                            <td className="px-20 py-3">{grado.vchGrado}</td>
                                                            <td className="px-20 py-3">
                                                                <button onClick={() => abrirModalEditar1(grado.intClvGrado)} className="text-blue-600 hover:text-blue-800 focus:outline-none">Editar</button>
                                                                <button onClick={() => deleteGrado(grado.intClvGrado)} className="text-red-600 hover:text-red-800 focus:outline-none ml-2">Eliminar</button>
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


                {estadoModal1 && (
                    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Editar Periodo</h5>
                                
                                </div>
                                <form onSubmit={ActualizarDatoGrado}>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grado:</label>
                                            <input type='text'value={editadovchGrado} id="editadovchGrado" onChange={(e) => seteditadovchGrado(e.target.value)}
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo grado" required=""/>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={cerrarModalEditar1}>Cancelar</button>
                                        <button type="submit" className="btn btn-primary">Guardar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>





            <div>
                <main className='mt-5 pl-52 mx-auto pl-28'>
                    <section className="flex justify-center">
                        <div className="mx-auto max-w-screen-xl px-5 lg:px-12 w-3/6 bg-gray-50 dark:bg-gray-900 p-8">
                            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                                <div className="overflow-x-auto">
                                    <div className='container'>
                                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Crear Grupo</h2>
                                        <form>
                                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                                <div className="sm:col-span-2">
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nuevo Grupo:</label>
                                                    <input type='text' name='nuevoGrupo' value={nuevoGrupo} onChange={datoGrupo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo grupo" required="" />
                                                </div>
                                            </div>
                                            <div className="flex justify-center mt-4">
                                                <button onClick={verificaciondatoGrupo} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
                                                    Crear nuevo grupo
                                                </button>
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
                                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Grupos</h2>
                                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="px-20 py-3">id</th>
                                                        <th scope="col" className="px-20 py-3">Grupo</th>
                                                        <th scope="col" className="px-20 py-3">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {grupos.map((grupo, key) => (
                                                        <tr key={key} className="border-b dark:border-gray-700">
                                                            <th scope="row" className="px-20 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{grupo.intClvGrupo}</th>
                                                            <td className="px-20 py-3">{grupo.vchGrupo}</td>
                                                            <td className="px-20 py-3 flex items-center">
                                                                <button onClick={() => abrirModalEditarGrupo(grupo.intClvGrupo)} className="text-blue-600 hover:text-blue-800 focus:outline-none mr-6">Editar</button>
                                                                <button onClick={() => deleteGrupo(grupo.intClvGrupo)} className="text-red-600 hover:text-red-800 focus:outline-none">Eliminar</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {estadoModal2 && (
                    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Editar Grupo</h5>
                                
                                </div>
                                <form onSubmit={ActualizarDatoGrupo}>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grupo:</label>
                                            <input type='text'value={editadovchGrupo} id="editadovchGrupo" onChange={(e) => seteditadovchGrupo(e.target.value)}
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo grado" required=""/>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={cerrarModalEditarGrupo}>Cancelar</button>
                                        <button type="submit" className="btn btn-primary">Guardar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CrearGradoYgrupo