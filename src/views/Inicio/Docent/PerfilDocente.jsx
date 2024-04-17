import React, { useState, useEffect } from 'react';
import NavDocentes from '../../../components/NavDocentes';
import DashboardDocentes from '../../../components/DashboardDocentes';

function PerfilDocente() {
    const [datosUsuario, setDatosUsuario] = useState(null);
    const idUsuario = localStorage.getItem('idUsuario');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/datosUsuario.php', {  //               http://localhost/TeleSecundaria763/datosUsuario.php
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ idUsuario: idUsuario })
                });
                const data = await response.json();
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
                } else {
                    console.error('Error: ', data.error);
                }
            } catch (error) {
                console.error('Error al hacer la petición de datos:', error);
            }
        };

        fetchData();
    }, [idUsuario]);

    return (
        <div className='flex h-screen'>
            <DashboardDocentes />
            <div className='flex-grow'>

                <NavDocentes />
                <main className='mt-32  mx-auto pl-20'>
                    <section className="flex justify-center">
                        
                            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden w-full md:ml-64 p-6">
                                <h1 className="text-2xl font-bold mb-4">Perfil del Usuario</h1>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-600">Nombre:</label>
                                    <p className="text-lg font-medium">{datosUsuario?.nombre}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-600">Apellido Paterno:</label>
                                    <p className="text-lg font-medium">{datosUsuario?.APaterno}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-600">Apellido Materno:</label>
                                    <p className="text-lg font-medium">{datosUsuario?.AMaterno}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-600">Usuario:</label>
                                    <p className="text-lg font-medium">{datosUsuario?.usuario}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-600">Correo:</label>
                                    <p className="text-lg font-medium">{datosUsuario?.correo}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-600">Teléfono:</label>
                                    <p className="text-lg font-medium">{datosUsuario?.telefono}</p>
                                </div>

                            </div>
                        
                    </section>
                </main>

            </div>
        </div>


    );
    
    
     
}

export default PerfilDocente;
