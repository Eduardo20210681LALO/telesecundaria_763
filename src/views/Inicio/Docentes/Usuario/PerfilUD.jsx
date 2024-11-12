import React, { useState, useEffect } from 'react';
import { Typography, Card, Input, Button, message, Avatar, Space, Tag } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import SIDEBARDOCENT from '../../../../components/SIDEBARDOCENT';
import BreadcrumDocent from '../BreadcrumDocent';

const { Title } = Typography;

function PerfilUD() {
    const [datosUsuario, setDatosUsuario] = useState(null);
    const [nombre, setNombre] = useState('');
    const [APaterno, setAPaterno] = useState('');
    const [AMaterno, setAMaterno] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuario, setUsuario] = useState('');
    const [telefono, setTelefono] = useState('');
    const [idRol, setIdRol] = useState('');
    const [idEstatus, setIdEstatus] = useState('');
    const [nuevaContraseña, setNuevaContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const idUsuario = localStorage.getItem('idUsuario');

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = 'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/UsuarioGeneral/datosUsuario.php';
            const cache = await caches.open('api-cache');
            
            // Primero intentar cargar datos desde el caché si está offline
            const cachedResponse = await cache.match(apiUrl);
            if (cachedResponse && !navigator.onLine) {
                const cachedData = await cachedResponse.json();
                setDatosUsuario(cachedData);
                setIdRol(cachedData.idRol);
                setIdEstatus(cachedData.idEstatus);
                console.log('Cargando datos desde el caché.');
                return;
            }

            // Si hay conexión, hacer la petición a la API y actualizar caché
            const data = { idUsuario };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            try {
                const response = await fetch(apiUrl, options);
                const result = await response.json();

                if (result.success) {
                    const usuarioData = {
                        nombre: result.vch_nombre,
                        APaterno: result.vch_APaterno,
                        AMaterno: result.vch_AMaterno,
                        correo: result.vch_correo,
                        usuario: result.vch_usuario,
                        telefono: result.vch_telefono,
                        idRol: result.id_rol,
                        idEstatus: result.id_estatus,
                    };
                    setDatosUsuario(usuarioData);
                    setIdRol(usuarioData.idRol);
                    setIdEstatus(usuarioData.idEstatus);

                    // Guardar en caché y en localStorage
                    await cache.put(apiUrl, new Response(JSON.stringify(usuarioData)));
                    localStorage.setItem('userData', JSON.stringify(usuarioData));
                    console.log('Datos guardados en caché y localStorage:', usuarioData);
                } else {
                    console.error('Error en la respuesta de la API:', result.error);
                    loadCachedData();
                }
            } catch (error) {
                console.error('Error en la petición:', error);
                loadCachedData();
            }
        };

        const loadCachedData = () => {
            const cachedData = localStorage.getItem('userData');
            if (cachedData) {
                const parsedData = JSON.parse(cachedData);
                setDatosUsuario(parsedData);
                setIdRol(parsedData.idRol);
                setIdEstatus(parsedData.idEstatus);
                console.log('Datos recuperados de localStorage:', parsedData);
            } else {
                console.log('No hay datos disponibles en el caché.');
            }
        };

        fetchData();
    }, [idUsuario]);

    // Funciones de validación
    const validarNombreApellido = (valor) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(valor) ? valor : '';
    const validarCorreo = (valor) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valor) ? valor : '';
    const validarUsuario = (valor) => /^[a-zA-Z0-9]*$/.test(valor) ? valor : '';
    const validarContraseña = (valor) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$%&/!]).{8,}$/.test(valor);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!nombre || !APaterno || !AMaterno || !correo || !usuario || !telefono) {
            message.warning('Por favor, complete todos los campos antes de actualizar.');
            return;
        }

        const data = { idUsuario, nombre, APaterno, AMaterno, correo, usuario, telefono };
        const apiUrl = 'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/UsuarioGeneral/actualizarDatosUsuario.php';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.success) {
                message.success('Datos actualizados exitosamente');
                
                // Guardar la respuesta en el caché y en localStorage
                const cache = await caches.open('api-cache');
                await cache.put(apiUrl, new Response(JSON.stringify(data)));
                localStorage.setItem('userData', JSON.stringify(data));
                console.log('Datos de usuario actualizados y guardados en caché y localStorage:', data);
            } else {
                message.error('Error al actualizar los datos');
            }
        } catch (error) {
            console.error('Error al hacer la petición de actualización:', error);
            message.error('Hubo un problema al actualizar los datos');
        }
    };

    // Funciones para mostrar el tag correspondiente al rol y estado
    const renderRolTag = (idRol) => {
        switch (idRol) {
            case '1': return <Tag color="blue">Directivo</Tag>;
            case '2': return <Tag color="green">Administrativo</Tag>;
            case '3': return <Tag color="gold">Docente</Tag>;
            default: return <Tag color="red">Ninguno</Tag>;
        }
    };

    const renderEstatusTag = (idEstatus) => {
        switch (idEstatus) {
            case '1': return <Tag color="green">Activo</Tag>;
            case '2': return <Tag color="orange">Inactivo</Tag>;
            case '3': return <Tag color="red">Bloqueado</Tag>;
            default: return <Tag color="gray">Desconocido</Tag>;
        }
    };

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
    
                <Title level={2}>Perfil Usuario</Title>
    
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Card
                        style={{
                            background: '#fff',
                            padding: '20px',
                            flexGrow: 1,
                            overflowY: 'auto',
                        }}
                    >
                        {/* Contenedor de datos de perfil y adicionales */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between', // Espacio entre la info de usuario y el contenedor adicional
                                gap: '40px',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                                marginBottom: '20px',
                            }}
                        >
                            {/* Datos de perfil */}
                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '20px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <Avatar
                                        size={80} // Reduce el tamaño del avatar
                                        src="https://via.placeholder.com/100"
                                    />
                                    <Space direction="vertical">
                                        <Title level={4} style={{ margin: 0 }}>
                                            {datosUsuario?.nombre} {datosUsuario?.APaterno} {datosUsuario?.AMaterno}
                                        </Title>
                                        <p style={{ margin: 0 }}>Email: {datosUsuario?.correo}</p>
                                        <p style={{ margin: 0 }}>Usuario: {datosUsuario?.usuario}</p>
                                    </Space>
                                </div>
                            </div>
    
                            {/* Datos adicionales con disposición horizontal */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '20px',
                                    width: '100%',
                                    maxWidth: '600px', // Ajusta según el tamaño deseado
                                }}
                            >
                                {/* Columna 1: Teléfono */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Teléfono</p>
                                    <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <PhoneOutlined /> {datosUsuario?.telefono}
                                    </p>
                                </div>
    
                                {/* Columna 2: Rol */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Rol</p>
                                    <div>
                                        {renderRolTag(idRol)}
                                    </div>
                                </div>
    
                                {/* Columna 3: Estado Cuenta */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Estado Cuenta</p>
                                    <div>
                                        {renderEstatusTag(idEstatus)}
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        {/* Título de Actualización de Datos */}
                        <Title level={4} style={{ marginTop: '10px', marginBottom: '10px' }}>
                            Actualizar Datos
                        </Title>
    
                        {/* Formulario para actualizar los datos */}
                        <form
                            onSubmit={handleUpdate}
                            className="flex flex-col items-start w-full"
                            style={{ gap: '10px' }} // Reduce la separación entre los inputs
                        >
                            {/* Inputs agrupados */}
                            <div className="flex gap-5 w-full" style={{ flexWrap: 'wrap' }}>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: '0 0 4px 0' }}>Ingrese Nombre:</p>
                                    <Input
                                        placeholder="Nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(validarNombreApellido(e.target.value))}
                                        className="flex-1 rounded p-2"
                                        style={{ height: '35px' }} // Ajusta la altura del input
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: '0 0 4px 0' }}>Ingrese Apellido Paterno:</p>
                                    <Input
                                        placeholder="Apellido Paterno"
                                        value={APaterno}
                                        onChange={(e) => setAPaterno(validarNombreApellido(e.target.value))}
                                        className="flex-1 rounded p-2"
                                        style={{ height: '35px' }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: '0 0 4px 0' }}>Ingrese Apellido Materno:</p>
                                    <Input
                                        placeholder="Apellido Materno"
                                        value={AMaterno}
                                        onChange={(e) => setAMaterno(validarNombreApellido(e.target.value))}
                                        className="flex-1 rounded p-2"
                                        style={{ height: '35px' }}
                                    />
                                </div>
                            </div>
    
                            <div className="flex gap-5 w-full" style={{ flexWrap: 'wrap' }}>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: '0 0 4px 0' }}>Ingrese Correo:</p>
                                    <Input
                                        placeholder="Correo"
                                        value={correo}
                                        onChange={(e) => setCorreo(validarCorreo(e.target.value))}
                                        className="flex-1 rounded p-2"
                                        style={{ height: '35px' }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: '0 0 4px 0' }}>Ingrese Usuario:</p>
                                    <Input
                                        placeholder="Usuario"
                                        value={usuario}
                                        onChange={(e) => setUsuario(validarUsuario(e.target.value))}
                                        className="flex-1 rounded p-2"
                                        style={{ height: '35px' }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: '0 0 4px 0' }}>Ingrese Teléfono:</p>
                                    <Input
                                        placeholder="Teléfono"
                                        value={telefono}
                                        onChange={(e) => {
                                            // Filtrar solo números positivos y eliminar cualquier carácter no numérico
                                            const inputValue = e.target.value;
                                            const numericValue = inputValue.replace(/[^0-9]/g, ''); // Permite solo dígitos del 0-9
                                            setTelefono(numericValue);
                                        }}
                                        className="flex-1 rounded p-2"
                                        style={{ height: '35px' }}
                                    />
                                </div>
                            </div>
    
                            <div className="flex gap-5 w-full" style={{ flexWrap: 'wrap' }}>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: '0 0 4px 0' }}>Ingrese Nueva Contraseña:</p>
                                    <Input.Password
                                        placeholder="Nueva Contraseña"
                                        value={nuevaContraseña}
                                        onChange={(e) => {
                                            setNuevaContraseña(e.target.value);
                                            const isValid = validarContraseña(e.target.value);
                                            setPasswordError(
                                                isValid
                                                    ? ''
                                                    : 'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial (#$%&/!).'
                                            );
                                        }}
                                        className="flex-1 rounded p-2"
                                        style={{ height: '35px' }}
                                    />
                                    {passwordError && (
                                        <p style={{ color: 'red', margin: '4px 0 0 0' }}>{passwordError}</p>
                                    )}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: '0 0 4px 0' }}>Confirme Nueva Contraseña:</p>
                                    <Input.Password
                                        placeholder="Confirmar Contraseña"
                                        value={confirmarContraseña}
                                        onChange={(e) => setConfirmarContraseña(e.target.value)}
                                        className="flex-1 rounded p-2"
                                        style={{ height: '35px' }}
                                    />
                                </div>
                            </div>
    
                            <div className="w-full flex justify-center" style={{ marginTop: '30px' }}> {/* Ajuste de margen para subir botón */}
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="rounded p-2"
                                    style={{
                                        backgroundColor: 'green',
                                        borderColor: 'green',
                                        height: '40px',
                                        width: '300px',
                                        borderRadius: '8px',
                                        maxWidth: '100%',
                                    }}
                                >
                                    Actualizar Datos
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </SIDEBARDOCENT>
    );
    
}

export default PerfilUD;
