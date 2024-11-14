import React, { useState, useEffect, useRef } from 'react';
import { Typography, Card, Input, Button, message, Avatar, Space, Tag, Modal } from 'antd';
import { PhoneOutlined, CameraOutlined } from '@ant-design/icons';
import SIDEBARDOCENT from '../../../../components/SIDEBARDOCENT';
import BreadcrumDocent from '../BreadcrumDocent';

const { Title } = Typography;

function PerfilUD() {
    const [datosUsuario, setDatosUsuario] = useState(null);
    const [profileImage, setProfileImage] = useState(null); // Estado para la imagen de perfil
    
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

    const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const videoRef = useRef(null);

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

                    // Obtener la imagen de perfil del usuario
                    await fetchProfileImage();

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

        // Función para obtener la imagen de perfil desde la tabla tbl_imagenes_usuarios
        const fetchProfileImage = async () => {
            try {
                const response = await fetch(`https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/Bitacoras/ObtenerImagenUsuario.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: idUsuario })
                });
                const result = await response.json();
                if (result.success) {
                    setProfileImage(result.imagePath); // URL de la imagen de perfil
                } else {
                    setProfileImage(null); // Si no hay imagen, se usará la predeterminada
                }
            } catch (error) {
                console.error("Error al obtener la imagen de perfil:", error);
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
        fetchProfileImage(); // Cargar la imagen de perfil en paralelo
    }, [idUsuario]);


    //**************************************************************** */
    //FUNCIONES PRINCIPALES PARA LA CAMARA Y LA TOMA DE FOTOS

    const openCameraModal = () => {
        setIsCameraModalVisible(true);
        startCamera();
    };

    const closeCameraModal = () => {
        setIsCameraModalVisible(false);
        stopCamera();
    };

    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(error => {
                console.error("Error al acceder a la cámara:", error);
            });
    };

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
    };

    const handleCapture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const imageName = `foto_${idUsuario}_${Date.now()}.png`;
        const imageData = canvas.toDataURL('image/png');
        
        setCapturedImage(imageData); // Guardar la imagen en base64
        saveImageNameToDatabase(imageName, imageData);
        closeCameraModal();
    };

    const saveImageNameToDatabase = async (imageName, imageData) => {
        const data = {
            userId: idUsuario,
            imageName: imageName,
            imageData: imageData,
            path: "src/assets/images/"
        };

        try {
            const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/Bitacoras/InsertarFotoUsuarios.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.success) {
                message.success('Foto guardada exitosamente');
                setProfileImage(result.imageUrl); // Actualiza la imagen de perfil con la URL pública recibida
            } else {
                message.error('Error al guardar la imagen en la base de datos');
            }
        } catch (error) {
            console.error('Error al guardar la imagen:', error);
            message.error('Hubo un error al guardar la imagen en la base de datos');
        }
    };
    
    
    //**************************************************************** */




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
                                        size={80}
                                        src={profileImage || "https://via.placeholder.com/100"} // Usa la imagen de perfil o una predeterminada
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

                            <Button icon={<CameraOutlined />} onClick={openCameraModal} type="primary">
                                Tomar Foto de Perfil
                            </Button>
    
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

            {/* Modal de la cámara */}
            <Modal
                title="Captura de Imagen"
                visible={isCameraModalVisible}
                onCancel={closeCameraModal}
                footer={null}
                afterClose={stopCamera}
            >
                <video ref={videoRef} autoPlay style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
                <Button onClick={handleCapture} type="primary" style={{ marginRight: '10px' }}>
                    Tomar Foto
                </Button>
                <Button onClick={closeCameraModal} type="default">
                    Cancelar
                </Button>
            </Modal>


        </SIDEBARDOCENT>
    );
    
}

export default PerfilUD;
