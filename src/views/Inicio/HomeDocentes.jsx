import React, { useState, useEffect } from 'react';
import { Typography, Card } from 'antd'; // Importamos los componentes de Ant Design
import SIDEBARDOCENT from '../../components/SIDEBARDOCENT';
import BreadcrumDocent from '../../views/Inicio/Docentes/BreadcrumDocent';

const { Title, Paragraph } = Typography;

function HomeDocentes() {
    const [datosUsuario, setDatosUsuario] = useState(null);
    const idUsuario = localStorage.getItem('idUsuario');

    useEffect(() => {
        const fetchData = async () => {
            const cache = await caches.open('user-data-cache');
            const cachedResponse = await cache.match('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/UsuarioGeneral/datosUsuario.php');
            
            if (cachedResponse && !navigator.onLine) {
                const data = await cachedResponse.json();
                console.log('Cargando datos desde la caché.');
                setDatosUsuario(data);
                return;
            }

            const data = { idUsuario };
            const url = 'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/UsuarioGeneral/datosUsuario.php';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            try {
                console.log('Realizando fetch con los siguientes datos:', data);
                const response = await fetch(url, options);

                if (!response.ok) throw new Error('Error en la respuesta de la red.');

                const result = await response.clone().json();

                if (result.success) {
                    const usuario = {
                        nombre: result.vch_nombre,
                        APAterno: result.vch_APaterno,
                        AMAterno: result.vch_AMaterno,
                        usuario: result.vch_usuario,
                        correo: result.vch_correo,
                    };
                    setDatosUsuario(usuario);

                    // Guardar en el caché
                    await cache.put(url, new Response(JSON.stringify(usuario)));
                    console.log('Datos guardados en caché:', usuario);
                } else {
                    console.log('Error en la respuesta de la API:', result.error);
                }
            } catch (error) {
                console.log('Error al hacer la petición de datos:', error);
            }
        };

        fetchData();
    }, [idUsuario]);

    return (
        <SIDEBARDOCENT>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 'calc(100vh - 60px)',
                    padding: '20px',
                }}
            >
                <BreadcrumDocent />

                <Title level={2}>Inicio</Title>

                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Card
                        style={{
                            background: '#fff',
                            padding: '20px',
                            flexGrow: 1,
                            overflowY: 'auto',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#800000',
                                color: 'white',
                                borderRadius: '12px',
                                padding: '65px',
                                textAlign: 'center',
                                marginBottom: '20px',
                                marginTop: '5px',
                            }}
                        >
                            {datosUsuario ? (
                                <>
                                    <Title level={3} style={{ color: '#FFD700' }}>
                                        ¡Bienvenido al Portal Virtual Telesecundaria 763!
                                    </Title>
                                    <Paragraph style={{ color: '#fff', fontSize: '16px', marginBottom: '10px' }}>
                                        Estamos encantados de verte nuevamente, <strong>Docente</strong>.
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
                                            fontStyle: 'italic',
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
        </SIDEBARDOCENT>
    );
}

export default HomeDocentes;
