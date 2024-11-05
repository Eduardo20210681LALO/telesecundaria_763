import React, { useState, useEffect } from 'react';
import SIDEBARADMIN from '../../../components/SIDEBARADMIN';
import { message } from 'antd';

function EditarPerfil() {
    const [datosUsuario, setDatosUsuario] = useState(null);
    const [nombre, setNombre] = useState('');
    const [APaterno, setAPaterno] = useState('');
    const [AMaterno, setAMaterno] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuario, setUsuario] = useState('');
    const [telefono, setTelefono] = useState('');
    const [nuevaContraseña, setNuevaContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [isUpdated, setIsUpdated] = useState(false); // Estado adicional para disparar el useEffect

    const idUsuario = localStorage.getItem('idUsuario');  

    useEffect(() => {
        const data = { idUsuario: idUsuario };
        const url = 'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/UsuarioGeneral/datosUsuario.php';  //   http://localhost/TeleSecundaria763/UsuarioGeneral/datosUsuario.php
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        console.log('Realizando fetch con los siguientes datos:', data);
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const usuario = {
                        nombre: data.vch_nombre,
                        APaterno: data.vch_APaterno,
                        AMaterno: data.vch_AMaterno,
                        correo: data.vch_correo,
                        usuario: data.vch_usuario,
                        telefono: data.vch_telefono
                    };
                    setDatosUsuario(usuario);
                    setNombre(usuario.nombre);
                    setAPaterno(usuario.APaterno);
                    setAMaterno(usuario.AMaterno);
                    setCorreo(usuario.correo);
                    setUsuario(usuario.usuario);
                    setTelefono(usuario.telefono);
                } else {
                    console.log('Error: ', data.error);
                }
            })
            .catch(error => {
                console.log('Error al hacer la petición de datos:', error);
            });
    }, [idUsuario, isUpdated]); // Agregar isUpdated como dependencia

    // Función para manejar el envío del formulario
    const handleUpdate = async (e) => {
        e.preventDefault();

        // Validación de campos vacíos
        if (!nombre || !APaterno || !AMaterno || !correo || !usuario || !telefono || !nuevaContraseña || !confirmarContraseña) {
            message.warning('Por favor, complete todos los campos antes de actualizar.');
            return;
        }

        // Validación de coincidencia de contraseñas
        if (nuevaContraseña !== confirmarContraseña) {
            message.warning('La nueva contraseña y la confirmación de contraseña no coinciden.');
            return;
        }

        const data = {
            idUsuario: idUsuario,
            nombre,
            APaterno,
            AMaterno,
            correo,
            usuario,
            telefono,
            nuevaContraseña
        };
        const url = 'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/UsuarioGeneral/actualizarDatosUsuario.php';   //  http://localhost/TeleSecundaria763/UsuarioGeneral/actualizarDatosUsuario.php
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (result.success) {
                message.success('Datos actualizados exitosamente');
                setIsUpdated(!isUpdated); // Cambia el estado para disparar el useEffect
            } else {
                message.error('Error al actualizar los datos');
            }
        } catch (error) {
            console.error('Error al hacer la petición de actualización:', error);
            message.error('Hubo un problema al actualizar los datos');
        }
    };

    return (
        <SIDEBARADMIN>
            <div className="flex flex-col md:flex-row justify-between md:w-3/4 w-full mx-auto mt-10 gap-8">
                {/* Bloque de Información de Usuario */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:w-2/5 w-full">
                    <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#B8860B' }}>Mi Perfil</h2>
                    {datosUsuario ? (
                        <div className="space-y-4">
                            <p className="text-gray-700 dark:text-gray-300"><strong>Nombre:</strong> {datosUsuario.nombre}</p>
                            <p className="text-gray-700 dark:text-gray-300"><strong>Apellido Paterno:</strong> {datosUsuario.APaterno}</p>
                            <p className="text-gray-700 dark:text-gray-300"><strong>Apellido Materno:</strong> {datosUsuario.AMaterno}</p>
                            <p className="text-gray-700 dark:text-gray-300"><strong>Correo:</strong> {datosUsuario.correo}</p>
                            <p className="text-gray-700 dark:text-gray-300"><strong>Usuario:</strong> {datosUsuario.usuario}</p>
                            <p className="text-gray-700 dark:text-gray-300"><strong>Teléfono:</strong> {datosUsuario.telefono}</p>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">Cargando información del usuario...</p>
                    )}
                </div>

                {/* Bloque de Actualización de Datos */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:w-3/5 w-full">
                    <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#B8860B' }}>Actualizar Datos</h2>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ingrese su nombre"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">Apellido Paterno</label>
                                <input
                                    type="text"
                                    value={APaterno}
                                    onChange={(e) => setAPaterno(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ingrese su apellido paterno"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">Apellido Materno</label>
                                <input
                                    type="text"
                                    value={AMaterno}
                                    onChange={(e) => setAMaterno(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ingrese su apellido materno"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">Correo</label>
                                <input
                                    type="email"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ingrese su correo"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">Usuario</label>
                                <input
                                    type="text"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ingrese su nombre de usuario"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">Teléfono</label>
                                <input
                                    type="tel"
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ingrese su teléfono"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    value={nuevaContraseña}
                                    onChange={(e) => setNuevaContraseña(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nueva contraseña"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">Confirmar Nueva Contraseña</label>
                                <input
                                    type="password"
                                    value={confirmarContraseña}
                                    onChange={(e) => setConfirmarContraseña(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Confirme contraseña"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Actualizar Datos
                        </button>
                    </form>
                </div>
            </div>
        </SIDEBARADMIN>
    );
}

export default EditarPerfil;
