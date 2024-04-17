import React, { useState, useEffect } from 'react';
import Sidebar1 from '../../../components/Sidebar1';
import NavBar1 from '../../../components/NavBar1';

function Perfil() {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [datosUsuario, setDatosUsuario] = useState(null);
    const idUsuario = localStorage.getItem('idUsuario');

    useEffect(() => {
        const data = {
            idUsuario: idUsuario
        };
    
        const url = 'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/datosUsuario.php';   //       http://localhost/TeleSecundaria763/datosUsuario.php
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
                        usuario: data.vch_usuario,
                        correo: data.vch_correo,
                        telefono: data.vch_telefono
                    };
                    setDatosUsuario(usuario);

                    console.log('ya se metio aqui', usuario)
                } else {
                    console.log('Error: ', data.error);
                }
            })
            .catch(error => {
                console.log('Error al hacer la petición de datos:', error);
            });
    }, []);

    if (!datosUsuario) {
        return (
            <div className="flex">
                <Sidebar1 sidebarToggle={sidebarToggle} />
                <div className="flex flex-col w-full">
                    <NavBar1 sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
                    <div className="w-full md:ml-64 p-6">
                        <h1 className="text-2xl font-bold mb-4">Perfil del Usuario</h1>
                        <div className="bg-white shadow-md rounded-md p-4">
                            <p>Cargando datos del usuario...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Una vez que los datos del usuario se han cargado, mostrar el perfil del usuario
    return (
        <div className="flex">
            <Sidebar1 sidebarToggle={sidebarToggle} />
            <div className="flex flex-col w-full">
                <NavBar1 sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
                <div className="w-full md:ml-64 p-6">
                    <h1 className="text-2xl font-bold mb-4">Perfil del Usuario</h1>

                    <div className="bg-white shadow-md rounded-md p-4">
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">Nombre:</label>
                            <p className="text-lg font-medium">{datosUsuario.nombre}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">Apellido Paterno:</label>
                            <p className="text-lg font-medium">{datosUsuario.APaterno}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">Apellido Materno:</label>
                            <p className="text-lg font-medium">{datosUsuario.AMaterno}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">Usuario:</label>
                            <p className="text-lg font-medium">{datosUsuario.usuario}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">correo:</label>
                            <p className="text-lg font-medium">{datosUsuario.correo}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">telefono:</label>
                            <p className="text-lg font-medium">{datosUsuario.telefono}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;
