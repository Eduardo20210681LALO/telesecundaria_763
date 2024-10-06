import React, { useState, useEffect } from 'react';
import { Typography, Card } from 'antd'; // Importamos los componentes de Ant Design
import SIDEBARADMIN from '../../components/SIDEBARADMIN';
import BreadcrumbAdmin from '../../views/Inicio/Admin/BreadcrumbAdmin';

const { Title, Paragraph } = Typography;

function HomeAdmin() {
    const [datosUsuario, setDatosUsuario] = useState(null);
    const idUsuario = localStorage.getItem('idUsuario');

    useEffect(() => {
        const data = {
            idUsuario: idUsuario
        };
        const url = 'http://localhost/TeleSecundaria763/UsuarioGeneral/datosUsuario.php';
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
                        APAterno: data.vch_APaterno,
                        AMAterno: data.vch_AMaterno,
                        usuario: data.vch_usuario,
                        correo: data.vch_correo
                    };
                    setDatosUsuario(usuario);
                    console.log('usuario', usuario);
                } else {
                    console.log('Error: ', data.error);
                }
            })
            .catch(error => {
                console.log('Error al hacer la petición de datos:', error);
            });
    }, [idUsuario]);

    return (
        <SIDEBARADMIN>
            {/* Contenedor principal con padding */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 'calc(100vh - 60px)', // Ajusta para que ocupe todo el espacio restante
                    padding: '20px',
                }}
            >
                <BreadcrumbAdmin />

                <Title level={2}>Inicio</Title>

                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Card
                        style={{
                            background: '#fff',
                            padding: '20px',
                            flexGrow: 1, // Hace que el card se extienda para ocupar el espacio disponible
                            overflowY: 'auto', // Permite hacer scroll si el contenido es demasiado grande
                        }}
                    >
                        {/* Sección de Bienvenida */}
                        <div
                            style={{
                                backgroundColor: '#800000', // Color guinda
                                color: 'white',
                                borderRadius: '12px',
                                padding: '65px',
                                textAlign: 'center',
                                marginBottom: '20px', // Reducimos el margen inferior
                                marginTop: '5px', // Reducimos el margen superior
                            }}
                        >
                            {datosUsuario ? (
                                <>
                                    <Title level={3} style={{ color: '#FFD700' }}>
                                        ¡Bienvenido al Portal Virtual Telesecundaria 763!
                                    </Title>
                                    <Paragraph style={{ color: '#fff', fontSize: '16px', marginBottom: '10px' }}>
                                        Estamos encantados de verte nuevamente, <strong>Administrador</strong>.
                                    </Paragraph>
                                    <Paragraph style={{ color: '#fff', fontSize: '16px', marginBottom: '10px' }}>
                                        <strong>CORREO:</strong> {datosUsuario.correo}
                                    </Paragraph>
                                    <Paragraph style={{ color: '#fff', fontSize: '16px', marginBottom: '10px' }}>
                                        <strong>NOMBRE:</strong> {`${datosUsuario.nombre} ${datosUsuario.APAterno} ${datosUsuario.AMAterno}`}
                                    </Paragraph>
                                    <Paragraph style={{ color: '#fff', fontSize: '16px', marginBottom: '10px' }}>
                                        <strong>USUARIO:</strong> {datosUsuario.usuario}
                                    </Paragraph>
                                    <Paragraph
                                        style={{
                                            color: '#fff',
                                            fontSize: '16px',
                                            marginTop: '20px',
                                            fontStyle: 'italic', // Estilo cursivo para énfasis
                                        }}
                                    >
                                        El futuro académico de nuestros estudiantes está en tus manos. ¡Gracias por contribuir a su éxito!
                                    </Paragraph>
                                    <Paragraph style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>
                                        OBJETIVO DEL SISTEMA: Este portal está diseñado para facilitar la administración de la información
                                        académica de nuestros alumnos, permitiéndote realizar gestiones de manera rápida y eficiente. Juntos estamos construyendo un mejor futuro.
                                    </Paragraph>
                                </>
                            ) : (
                                <p className="text-center">Cargando información del usuario...</p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </SIDEBARADMIN>
    );
}

export default HomeAdmin;
