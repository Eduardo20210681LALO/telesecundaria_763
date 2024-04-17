import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavAdministrativos from '../../../../components/NavAdministrativos';
import DashboardAdministrativos from '../../../../components/DashboardAdministrativos';


function InsertarAlumnos() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ vchAPaterno: '', vchAMaterno: '', vchNombre: '', vchCurpAlum: '', dtFchNacAlum: '', vchNombreTutor: '', vchMunicipio: '', vchEstado: '', vchColonia: '', vchCalle: '', vchCodPostal: '', vchTelefonoFam1: '', vchTelefonoFam2: '', chrSexo: ''});
    const [alumnos, setAlumnos] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editName, setEditName] = useState('');
    const [editGmail, setEditGmail] = useState('');
    const [editMobile, setEditMobile] = useState('');

    const [listaMunicipios, setListaMunicipios] = useState([]);//los que se trae de la bd
    const [cargandoMunicipios, setCargandoMunicipios] = useState(true);

    useEffect(() => {
        cargarMunicipios();
    }, []);
  
    const cargarMunicipios = async () => {
        try {
            const municipiosData = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerMunicipios.php');   //      http://localhost/TeleSecundaria763/traerMunicipios.php
            const municipiosJson = await municipiosData.json();
            setListaMunicipios(municipiosJson);
            console.log(municipiosJson);
            setCargandoMunicipios(false);
        } catch (error) {
            console.error('Error al cargar los municipios:', error);
            setCargandoMunicipios(false);
        }
    };

    
    const [listaEstados, setListaEstados] = useState([]);//los que se trae de la bd
    const [cargandoEstados, setCargandoEstados] = useState(true);
    useEffect(() => {
        cargarEstados();
        console.log('e',listaEstados); // Verificar si listaMunicipios tiene datos
  
      }, []);
    
      const cargarEstados = async () => {
          try {
              const estadosData = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerEstados.php');   //  http://localhost/TeleSecundaria763/traerEstados.php
              const estadosJson = await estadosData.json();
              setListaEstados(estadosJson);
              console.log(estadosJson);
              setCargandoEstados(false);
          } catch (error) {
              console.error('Error al cargar los estados:', error);
              setCargandoEstados(false);
          }
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        console.log(inputs);
        event.preventDefault();
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/insertarAlumnosNuevos.php', inputs)   //  http://localhost/TeleSecundaria763/insertarAlumnosNuevos.php
            .then(function(response){
                console.log(response.data);
                getUsers();
                setInputs({ name: '', gmail: '', mobile: '' });
            });
    }

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/listarAlumnos.php')  //   http://localhost/TeleSecundaria763/listarAlumnos.php
            .then(function(response) {
                setAlumnos(response.data);
            });
    }

    const deleteUser = (id) => {
        const data = { id: id };
        
        console.log(data)
        fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/eliminarAlumnos.php', { //   http://localhost/TeleSecundaria763/eliminarAlumnos.php
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
            console.log('Usuario eliminado');
            getUsers();
        })
        .catch(error => {
            console.error('Error al eliminar el usuario:', error);
        });
    };

    const openEditModal = (userId) => {
        console.log("Modal de edición abierto para el usuario con ID:", userId);
        setIsEditModalOpen(true);
        setEditUserId(userId);
        getUser(userId);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const getUser = (userId) => {
        axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerDatosDelAlumno.php', { id: userId })  //   http://localhost/TeleSecundaria763/traerDatosDelAlumno.php
            .then(function(response) {
                const userData = response.data.user[0];
                setEditName(userData.name);
                setEditGmail(userData.gmail);
                setEditMobile(userData.mobile);
            })
            .catch(function(error) {
                console.error('Error al obtener los datos del usuario:', error);
            });
    };

    const handleEditSubmit1 = (event) => {
        event.preventDefault();
        const data = {
            id: editUserId,
            name: editName,
            gmail: editGmail,
            mobile: editMobile
        };
        fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/actualizarDatosAlumno.php', {   //   http://localhost/TeleSecundaria763/actualizarDatosAlumno.php
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
            closeEditModal();
            getUsers();
        })
        .catch(error => {
            console.error('Error al actualizar el usuario:', error);
        });
    };
    

    console.log("Estado de isEditModalOpen:", isEditModalOpen);

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
                                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Crear Alumno</h2>

                                        <form onSubmit={handleSubmit}>
                                            <div className="grid gap-4">

                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido Paterno:</label>
                                                    <input type='text' name='vchAPaterno' value={inputs.vchAPaterno} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo periodo" required=""/>
                                                </div>

                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido Materno:</label>
                                                    <input type='text' name='vchAMaterno' value={inputs.vchAMaterno} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo periodo" required=""/>
                                                </div>
                                                
                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre:</label>
                                                    <input type='text' name='vchNombre' value={inputs.vchNombre} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo periodo" required=""/>
                                                </div>

                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Curp:</label>
                                                    <input type='text' name='vchCurpAlum' value={inputs.vchCurpAlum} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo periodo" required=""/>
                                                </div>

                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Nacimiento:</label>
                                                    <input type='date' name='dtFchNacAlum' value={inputs.dtFchNacAlum} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo periodo" required=""/>
                                                </div>

                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del tutor:</label>
                                                    <input type='text' name='vchNombreTutor' value={inputs.vchNombreTutor} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo periodo" required=""/>
                                                </div>

                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Municipio:</label>
                                                    <td>
                                                        {cargandoMunicipios ? (
                                                            <p>Cargando municipios...</p>
                                                        ) : (
                                                            <select name='vchMunicipio' value={inputs.vchMunicipio} onChange={handleChange}>
                                                                <option value="">Seleccionar municipio</option>
                                                                {listaMunicipios.map((municipio, key) => (
                                                                    <option key={key} value={municipio.id}>{municipio.vchMunicipio}</option>
                                                                ))}
                                                            </select>
                                                        )}
                                                    </td>
                                                </div>

                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado:</label>
                                                    <tr>
                                                        <th><label>Estado:</label></th>
                                                        <td>
                                                            {cargandoEstados ? (
                                                                <p>Cargando Estados...</p>
                                                            ) : (
                                                                <select name='intClvEdo' value={inputs.vchEstado} onChange={handleChange}>
                                                                    <option value="">Seleccionar Estado</option>
                                                                    {listaEstados.map((estado, key) => (
                                                                        <option key={key} value={estado.id}>{estado.vchEstado}</option>
                                                                    ))}
                                                                </select>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </div>

                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Colonia:</label>
                                                    <input type='text' name='vchColonia' value={inputs.vchColonia} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo periodo" required=""/>
                                                </div>

                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Calle:</label>
                                                    <input type='text' name='vchCalle' value={inputs.vchCalle} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo periodo" required=""/>
                                                </div>

                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Codigo Postal:</label>
                                                    <input type='number' name='vchCodPostal' value={inputs.vchCodPostal} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo periodo" required=""/>
                                                </div>

                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero de telefono 1:</label>
                                                    <input type='number' name='vchTelefonoFam1' value={inputs.vchTelefonoFam1} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo periodo" required=""/>
                                                </div>

                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero de telefono 2:</label>
                                                    <input type='number' name='vchTelefonoFam2' value={inputs.vchTelefonoFam2} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ingrese un nuevo periodo" required=""/>
                                                </div>

                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de Sexo:</label>
                                                    <tr>
                                                        <th><label>Sexo:</label></th>
                                                        <td>
                                                            <select name='chrSexo' value={inputs.chrSexo} onChange={handleChange}>
                                                            <option value="">Seleccionar</option>
                                                            <option value="M">Masculino</option>
                                                            <option value="F">Femenino</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </div>         

                                                <div className="flex justify-center mt-2">
                                                    <td colSpan='2' align='right'><button>Save</button></td>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

            </div>

            <div>
                <main className='mt-2 pl-60 mx-auto pl-12'>
                    <section class="flex justify-center">
                        <div class="mx-auto max-w-screen-xl px-3 lg:px-12 w-5/6 bg-gray-50 dark:bg-gray-900 p-16">
                            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                                <div class="overflow-x-auto ">
                                    <div className='container'>

                                        <div class="overflow-x-auto">
                                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Alumnos</h2>
                                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" class="px-4 py-3">id</th>
                                                        <th scope="col" class="px-4 py-3">Apellido Paterno</th>
                                                        <th scope="col" class="px-4 py-3">Apellido Materno</th>
                                                        <th scope="col" class="px-4 py-3">Nombre</th>
                                                        <th scope="col" class="px-4 py-3">CURP</th>
                                                        <th scope="col" class="px-4 py-3">Fecha de Nacimiento</th>
                                                        <th scope="col" class="px-4 py-3">Nombre Tutor</th>
                                                        <th scope="col" class="px-4 py-3">Municipio</th>
                                                        <th scope="col" class="px-4 py-3">Estado</th>
                                                        <th scope="col" class="px-4 py-3">Colonia</th>
                                                        <th scope="col" class="px-4 py-3">Calle</th>
                                                        <th scope="col" class="px-4 py-3">Codigo Postal</th>
                                                        <th scope="col" class="px-4 py-3">Telefono Familiar</th>
                                                        <th scope="col" class="px-4 py-3">Telefono Familiar 2</th>
                                                        <th scope="col" class="px-4 py-3">Sexo</th>
                                                        <th scope="col" class="px-4 py-3">Acciones</th>
                                                    </tr>
                                                </thead>
                                            
                                                <tbody>
                                                    {alumnos.map((alumno, key) =>
                                                        <tr key={key} class="border-b dark:border-gray-700">
                                                            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{alumno.intClvAlumnos}</th>
                                                                <td class="px-4 py-3">{alumno.vchAPaterno}</td>
                                                                <td class="px-4 py-3">{alumno.vchAMaterno}</td>
                                                                <td class="px-4 py-3">{alumno.vchNombre}</td>
                                                                <td class="px-4 py-3">{alumno.vchCurpAlum}</td>
                                                                <td class="px-4 py-3">{alumno.dtFchNacAlum}</td>
                                                                <td class="px-4 py-3">{alumno.vchNombreTutor}</td>
                                                                <td class="px-4 py-3">{alumno.intClvMpio}</td>
                                                                <td class="px-4 py-3">{alumno.intClvEdo}</td>
                                                                <td class="px-4 py-3">{alumno.vchColonia}</td>
                                                                <td class="px-4 py-3">{alumno.vchCalle}</td>
                                                                <td class="px-4 py-3">{alumno.vchCodPostal}</td>
                                                                <td class="px-4 py-3">{alumno.vchTelefonoFam1}</td>
                                                                <td class="px-4 py-3">{alumno.vchTelefonoFam2}</td>
                                                                <td class="px-4 py-3">{alumno.chrSexo}</td>
                                                                <td class="px-1 py-3">
                                                                    <button onClick={() => openEditModal(alumno.id)} class="text-blue-600 hover:text-blue-800 focus:outline-none">Editar</button>
                                                                    <button onClick={() => deleteUser(alumno.id)} class="text-red-600 hover:text-red-800 focus:outline-none ml-2">Eliminar</button>
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
            </div>

            <div>
                {isEditModalOpen && (
                    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Editar Usuario</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeEditModal}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form onSubmit={handleEditSubmit1}>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label htmlFor="editName">Nombre:</label>
                                            <input value={editName} type="text" className="form-control" id="editName" onChange={(e) => setEditName(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="editGmail">Correo electrónico:</label>
                                            <input value={editGmail} type="email" className="form-control" id="editGmail" onChange={(e) => setEditGmail(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="editMobile">Teléfono:</label>
                                            <input value={editMobile} type="text" className="form-control" id="editMobile" onChange={(e) => setEditMobile(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeEditModal}>Cancelar</button>
                                        <button type="submit" className="btn btn-primary">Guardar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default InsertarAlumnos;