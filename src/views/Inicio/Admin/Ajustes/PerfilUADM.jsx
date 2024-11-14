import React, { useState, useEffect, useRef } from 'react';
import { Typography, Card, Input, Button, message, Avatar, Space, Tag, Modal} from 'antd'; // Añadimos Tag
import {PhoneOutlined, CameraOutlined  } from '@ant-design/icons'; // Íconos de Ant Design
import BreadcrumAdmin from '../../Admin/BreadcrumbAdmin';
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';
import Webcam from 'react-webcam';
import axios from 'axios';

const { Title } = Typography;

function PerfilUADM() {
    const [datosUsuario, setDatosUsuario] = useState(null); // Solo para mostrar los datos
    const [nombre, setNombre] = useState(''); // Dejar vacío para actualización
    const [APaterno, setAPaterno] = useState(''); // Dejar vacío para actualización
    const [AMaterno, setAMaterno] = useState(''); // Dejar vacío para actualización
    const [correo, setCorreo] = useState(''); // Dejar vacío para actualización
    const [usuario, setUsuario] = useState(''); // Dejar vacío para actualización
    const [telefono, setTelefono] = useState(''); // Dejar vacío para actualización
    const [idRol, setIdRol] = useState(''); // ID Rol
    const [idEstatus, setIdEstatus] = useState(''); // ID Estatus
    const [nuevaContraseña, setNuevaContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);
    const [passwordError, setPasswordError] = useState(''); // Estado para el mensaje de error de la contraseña

    const idUsuario = localStorage.getItem('idUsuario');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null); // Para mostrar la imagen guardada
    const webcamRef = useRef(null);

    const showModal = () => setIsModalVisible(true);

    const handleCancel = () => {
        setCapturedImage(null); // Resetear la imagen capturada
        setIsModalVisible(false);
    };

    const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc); // Guardar la imagen capturada en el estado
    };

    const savePhoto = async () => {
        if (!capturedImage) return;
    
        const imageName = `perfil_${idUsuario}_${Date.now()}.jpg`; // Nombre de la imagen
        const data = {
            userId: idUsuario, // Asegúrate de usar el mismo nombre
            imageName: imageName,
            imageData: capturedImage, // La imagen en formato Base64
            path: "assets/" // Ruta relativa desde el backend
        };
    
        console.log('Datos a enviar:', data);
    
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
                message.success('Imagen guardada correctamente.');
                setProfileImage(result.imageUrl); // Mostrar la imagen guardada
                setIsModalVisible(false);
            } else {
                message.error(result.error || 'Error al guardar la imagen.');
            }
        } catch (error) {
            message.error('Hubo un problema al enviar la imagen.');
            console.error('Error:', error);
        }
    };
    
    useEffect(() => {
        // Cargar los datos del usuario
        const fetchUserData = async () => {
            const data = { idUsuario };
            const url = 'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/UsuarioGeneral/datosUsuario.php';
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            };
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                if (result.success) {
                    setDatosUsuario({
                        nombre: result.vch_nombre,
                        APaterno: result.vch_APaterno,
                        AMaterno: result.vch_AMaterno,
                        correo: result.vch_correo,
                        usuario: result.vch_usuario,
                    });
                } else {
                    console.error('Error: ', result.error);
                }
            } catch (error) {
                console.error('Error al hacer la petición de datos:', error);
            }
        };
    
        // Cargar la imagen de perfil
        const fetchProfileImage = async () => {
            try {
                const response = await axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/Bitacoras/ObtenerImagenUsuario.php', {
                    userId: idUsuario
                });
    
                const result = response.data;
    
                if (result.success) {
                    setProfileImage(result.imageUrl);
                } else {
                    console.error('Error al obtener la imagen de perfil:', result.error);
                    setProfileImage(null); // Si no hay imagen, se usará una predeterminada
                }
            } catch (error) {
                console.error("Error al obtener la imagen de perfil:", error);
                setProfileImage(null); // En caso de error, se usa una predeterminada o se oculta
            }
        };
    
        fetchUserData();
        fetchProfileImage(); // Cambiado a fetchProfileImage
    }, [idUsuario]);
    
    
    

    // Función para validar nombre y apellidos
    const validarNombreApellido = (valor) => {
        // Permitir letras, espacios, acentos y comas
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
        if (regex.test(valor)) {
            return valor;
        } else {
            return ''; // Devuelve vacío si no es válido
        }
    };

    // Función para validar correo
    const validarCorreo = (valor) => {
        // Validar que tenga un formato de correo correcto
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regex.test(valor)) {
            return valor;
        } else {
            return ''; // Devuelve vacío si no es válido
        }
    };

    // Función para validar usuario
    const validarUsuario = (valor) => {
        // Permitir letras, números, pero no espacios ni símbolos raros
        const regex = /^[a-zA-Z0-9]*$/;
        if (regex.test(valor)) {
            return valor;
        } else {
            return ''; // Devuelve vacío si no es válido
        }
    };

    // Función para validar la contraseña
    const validarContraseña = (valor) => {
        // Debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial entre #$%&/!
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$%&/!]).{8,}$/;
        if (regex.test(valor)) {
            return true;
        } else {
            return false; // Devuelve falso si no es válido
        }
    };

    // Función para manejar el envío del formulario
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!nombre || !APaterno || !AMaterno || !correo || !usuario || !telefono || !nuevaContraseña || !confirmarContraseña) {
            message.warning('Por favor, complete todos los campos antes de actualizar.');
            return;
        }

        if (!validarContraseña(nuevaContraseña)) {
            message.warning('La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial (#$%&/!).');
            return;
        }

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
            nuevaContraseña,
        };
        const url = 'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/UsuarioGeneral/actualizarDatosUsuario.php';  //  http://localhost/TeleSecundaria763/UsuarioGeneral/actualizarDatosUsuario.php
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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

    // Función para mostrar el tag correspondiente al rol
    const renderRolTag = (idRol) => {
        switch (idRol) {
            case '1':
                return <Tag color="blue">Directivo</Tag>;
            case '2':
                return <Tag color="green">Administrativo</Tag>;
            case '3':
                return <Tag color="gold">Docente</Tag>;
            default:
                return <Tag color="red">Ninguno</Tag>;
        }
    };

    // Función para mostrar el tag correspondiente al estado de la cuenta
    const renderEstatusTag = (idEstatus) => {
        switch (idEstatus) {
            case '1':
                return <Tag color="green">Activo</Tag>;
            case '2':
                return <Tag color="orange">Inactivo</Tag>;
            case '3':
                return <Tag color="red">Bloqueado</Tag>;
            default:
                return <Tag color="gray">Desconocido</Tag>;
        }
    };

    return (
        <SIDEBARADMIN>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 'calc(100vh - 60px)',
                    padding: '20px',
                }}
            >
                <BreadcrumAdmin />
    
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

                            <Button icon={<CameraOutlined />} onClick={showModal} style={{ marginLeft: '20px' }}>
                                Tomar Foto
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


            {/* Modal para capturar la foto */}
            <Modal
                title="Capturar Foto de Perfil"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancelar
                    </Button>,
                    <Button key="capture" type="primary" onClick={capturePhoto}>
                        Capturar
                    </Button>,
                    <Button key="save" type="primary" disabled={!capturedImage} onClick={savePhoto}>
                        Guardar Foto
                    </Button>,
                ]}
            >
                {capturedImage ? (
                    <img src={capturedImage} alt="Captura de perfil" style={{ width: '100%' }} />
                ) : (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width="100%"
                        height="auto"
                    />
                )}
            </Modal>

        </SIDEBARADMIN>
    );
}

export default PerfilUADM