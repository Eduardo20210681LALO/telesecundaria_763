import React, { useState, useEffect } from 'react';
import { Typography, Input, Card, Button, message } from 'antd'; // Importamos los componentes de Ant Design
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';
import BreadcrumbAdmin from '../BreadcrumbAdmin';
import axios from 'axios';

const { Title } = Typography;

//FUNCIONES PARA OBTENER LOS DATOS DE LOS DOCENTES ************************** 
const getDocentes = () => {
    return axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminDocentes/ListDocentes.php');   //    http://localhost/TeleSecundaria763/AdminDocentes/ListDocentes.php
};

const getGrados = () => {
    return axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminDocentes/ListGrados.php');   //   http://localhost/TeleSecundaria763/AdminDocentes/ListGrados.php
};

const getGrupos = () => {
    return axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminDocentes/ListGrupos.php');   //   http://localhost/TeleSecundaria763/AdminDocentes/ListGrupos.php
};

const getPeriodos = () => {
    return axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminDocentes/ListPeriodos.php');   //   http://localhost/TeleSecundaria763/AdminDocentes/ListPeriodos.php
};

// Función para asignar grado y grupo a un docente
const assignGradoGrupo = (docenteId, gradoId, grupoId, periodoId) => {
    return axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminDocentes/AssignGradoGrupo.php', {   //  http://localhost/TeleSecundaria763/AdminDocentes/AssignGradoGrupo.php
        docenteId,
        gradoId,
        grupoId,
        periodoId
    });
};
//TERMINA LAS FUNCIONES PARA MANDAR A TRAER A TODOS LOS DOCENTES, LISTAR GRADOS LISTAR GRUPOS Y LISTAR PERIODOS

function CrearDocentes() {
    //CODIGO DE ASIGNAR A DOCENTES
    const [docentes, setDocentes] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [selectedDocente, setSelectedDocente] = useState('');
    const [selectedGrado, setSelectedGrado] = useState('');
    const [selectedGrupo, setSelectedGrupo] = useState('');
    const [selectedPeriodo, setSelectedPeriodo] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const docentesResponse = await getDocentes();
            const gradosResponse = await getGrados();
            const gruposResponse = await getGrupos();
            const periodosResponse = await getPeriodos();

            setDocentes(Array.isArray(docentesResponse.data) ? docentesResponse.data : []);
            setGrados(Array.isArray(gradosResponse.data) ? gradosResponse.data : []);
            setGrupos(Array.isArray(gruposResponse.data) ? gruposResponse.data : []);
            setPeriodos(Array.isArray(periodosResponse.data) ? periodosResponse.data : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validación personalizada
        if (!selectedDocente) {
            message.warning('Por favor, seleccione un docente.');
            return;
        }
        if (!selectedGrado) {
            message.warning('Por favor, seleccione un grado.');
            return;
        }
        if (!selectedGrupo) {
            message.warning('Por favor, seleccione un grupo.');
            return;
        }
        if (!selectedPeriodo) {
            message.warning('Por favor, seleccione un periodo.');
            return;
        }

        // Si todo está correcto
        try {
            await assignGradoGrupo(selectedDocente, selectedGrado, selectedGrupo, selectedPeriodo);
            message.success('Grado y grupo asignados correctamente');
            // Limpiar los campos seleccionados
            setSelectedDocente('');
            setSelectedGrado('');
            setSelectedGrupo('');
            setSelectedPeriodo('');
        } catch (error) {
            console.error('Error assigning grado and grupo:', error);
            message.error('Error al asignar grado y grupo');
        }
    };
    //******************************************************* */

    //AQUI COMIENZA EL CODIGO PARA CREAR NUEVOS DOCENTES
    const initialFormData = {
        nombre: '',
        aPaterno: '',
        aMaterno: '',
        usuario: '',
        correo: '',
        telefono: '',
        password: '',
        confirmPassword: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    // Este manejador de cambio captura los cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Este es el manejador de envio del formulario
    const handleSubmit22 = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        console.log('Se ha pulsado el botón Crear Docente'); // Debug para verificar que la función es llamada

        // Validar campos vacíos
        if (!formData.nombre) {
            message.warning('Por favor, ingrese el nombre');
            return;
        }
        if (!formData.aPaterno) {
            message.warning('Por favor, ingrese el apellido paterno');
            return;
        }
        if (!formData.aMaterno) {
            message.warning('Por favor, ingrese el apellido materno');
            return;
        }
        if (!formData.usuario) {
            message.warning('Por favor, ingrese el usuario');
            return;
        }
        if (!formData.correo) {
            message.warning('Por favor, ingrese el correo electrónico');
            return;
        }
        if (!formData.telefono) {
            message.warning('Por favor, ingrese el teléfono');
            return;
        }
        if (!formData.password) {
            message.warning('Por favor, ingrese la contraseña');
            return;
        }
        if (!formData.confirmPassword) {
            message.warning('Por favor, confirme la contraseña');
            return;
        }

        // Validación de contraseñas
        if (formData.password !== formData.confirmPassword) {
            message.warning('Las contraseñas no coinciden');
            return;
        }

        console.log('Validación pasada. Enviando datos al servidor...'); // Debug

        // Aquí se hace la solicitud
        try {
            const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminDocentes/CrearDocenteXVista.php', {   //  http://localhost/TeleSecundaria763/AdminDocentes/CrearDocenteXVista.php
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Verifica si la respuesta es JSON válida
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                if (data.error) {
                    message.error(data.error);
                } else {
                    message.success('Docente creado con éxito');
                    setFormData(initialFormData); // Limpiar el formulario
                }
            } else {
                message.error('Error inesperado: La respuesta no es JSON válido.');
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('Ocurrió un error al procesar la solicitud');
        }
    };
    // AQUI TERMINA EL CODIGO PARA CREAR NUEVOS DOCENTES

    return (
        <SIDEBARADMIN>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 'calc(100vh - 60px)', // Ajusta para que ocupe todo el espacio restante
                    padding: '20px',
                    
                    maxWidth: 'calc(200vw - 100px)',
                    boxSizing: 'border-box',
                    width: '100%', // Limita el ancho al 100% de la pantalla
                }}
            >
                <BreadcrumbAdmin />
                <Title level={2}>Crear y Asignar Docentes</Title>

                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Card
                        style={{
                            background: '#fff',
                            padding: '20px',
                            flexGrow: 1,
                            overflowY: 'auto',
                        }}
                    >
                        <div className="mt-2 mb-4">  {/* Reducimos margen superior e inferior */}
                            <Title level={4} className="text-black mb-4">
                            Creación de Nuevos Docentes
                            </Title>
                        </div>

                        <form onSubmit={handleSubmit22} className="flex flex-col w-full">
                            {/* Primera fila de inputs */}
                            <div className="flex gap-4 mb-3">  {/* Reducimos el espacio entre filas */}
                                <div className="flex-1">
                                    <label htmlFor="nombre" className="block mb-1">Nombre</label>  {/* Reducimos margen inferior de los labels */}
                                    <Input
                                        id="nombre"
                                        placeholder="Ingrese un nombre"
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="w-full p-2 rounded border border-gray-300"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="aPaterno" className="block mb-1">Apellido Paterno</label>
                                    <Input
                                        id="aPaterno"
                                        placeholder="Ingrese el apellido paterno"
                                        type="text"
                                        name="aPaterno"
                                        value={formData.aPaterno}
                                        onChange={handleChange}
                                        className="w-full p-2 rounded border border-gray-300"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="aMaterno" className="block mb-1">Apellido Materno</label>
                                    <Input
                                        id="aMaterno"
                                        placeholder="Ingrese el apellido materno"
                                        type="text"
                                        name="aMaterno"
                                        value={formData.aMaterno}
                                        onChange={handleChange}
                                        className="w-full p-2 rounded border border-gray-300"
                                    />
                                </div>
                            </div>

                            {/* Segunda fila de inputs */}
                            <div className="flex gap-4 mb-3">  {/* Reducimos espacio entre las filas */}
                                <div className="flex-1">
                                    <label htmlFor="usuario" className="block mb-1">Usuario</label>
                                    <Input
                                        id="usuario"
                                        placeholder="Ingrese el usuario"
                                        type="text"
                                        name="usuario"
                                        value={formData.usuario}
                                        onChange={handleChange}
                                        className="w-full p-2 rounded border border-gray-300"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="correo" className="block mb-1">Correo Electrónico</label>
                                    <Input
                                        id="correo"
                                        placeholder="Ingrese el correo electrónico"
                                        type="email"
                                        name="correo"
                                        value={formData.correo}
                                        onChange={handleChange}
                                        className="w-full p-2 rounded border border-gray-300"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="telefono" className="block mb-1">Teléfono</label>
                                    <Input
                                        id="telefono"
                                        placeholder="Ingrese el teléfono"
                                        type="tel"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        className="w-full p-2 rounded border border-gray-300"
                                    />
                                </div>
                            </div>

                            {/* Tercera fila: Contraseñas y botón */}
                            <div className="flex gap-4 mb-5"> {/* Reducimos espacio entre las filas */}
                                <div className="flex-1">
                                    <label htmlFor="password" className="block mb-1">Contraseña</label>
                                    <Input
                                        id="password"
                                        placeholder="Ingrese la contraseña"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full p-2 rounded border border-gray-300"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="confirmPassword" className="block mb-1">Confirmar Contraseña</label>
                                    <Input
                                        id="confirmPassword"
                                        placeholder="Confirme la contraseña"
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full p-2 rounded border border-gray-300"
                                    />
                                </div>

                                <div className="flex-1 flex items-end">
                                    <Button
                                        type="primary"
                                        htmlType='submit'
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: 'var(--first-color)',
                                            borderColor: 'transparent',
                                            color: '#fff',
                                            padding: '10px 20px',
                                            borderRadius: '8px',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            height: '40px',
                                            width: '400px',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s ease'
                                        }}
                                        onMouseOver={(event) => {
                                            event.currentTarget.style.backgroundColor = 'black';
                                        }}
                                        onMouseOut={(event) => {
                                            event.currentTarget.style.backgroundColor = 'var(--first-color)';
                                        }}
                                    >
                                        Crear Nuevo Docente
                                    </Button>
                                </div>
                            </div>
                        </form>


                        <div className="mt-2 mb-4">  {/* Reducimos margen superior e inferior */}
                            <Title level={4} className="text-black mb-4">
                                Asignar Grado Grupo y Periodo a Docente
                            </Title>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            
                            {/* Primera fila de selects */}
                            <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
                                <div className="form-group w-full md:w-1/2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Docente:</label>
                                    <select
                                        value={selectedDocente}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        onChange={(e) => setSelectedDocente(e.target.value)}
                                    >
                                        <option value="">Seleccione un docente</option>
                                        {docentes.map((docente) => (
                                            <option key={docente.id} value={docente.id}>{docente.nombre}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group w-full md:w-1/2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grado:</label>
                                    <select
                                        value={selectedGrado}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        onChange={(e) => setSelectedGrado(e.target.value)}
                                    >
                                        <option value="">Seleccione un grado</option>
                                        {grados.map((grado) => (
                                            <option key={grado.id} value={grado.id}>{grado.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Segunda fila de selects */}
                            <div style={{ display: 'flex', gap: '20px', width: '100%', marginTop: '20px' }}>
                                <div className="form-group w-full md:w-1/2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grupo:</label>
                                    <select
                                        value={selectedGrupo}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        onChange={(e) => setSelectedGrupo(e.target.value)}
                                    >
                                        <option value="">Seleccione un grupo</option>
                                        {grupos.map((grupo) => (
                                            <option key={grupo.id} value={grupo.id}>{grupo.nombre}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group w-full md:w-1/2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Periodo:</label>
                                    <select
                                        value={selectedPeriodo}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        onChange={(e) => setSelectedPeriodo(e.target.value)}
                                    >
                                        <option value="">Seleccione un periodo</option>
                                        {periodos.map((periodo) => (
                                            <option key={periodo.id} value={periodo.id}>{periodo.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>


                            {/* Botón con margen superior */}
                            <div className="flex-1 flex items-end mt-8"> {/* mt-8 añade un margen superior de 32px */}
                                <Button
                                    type="submit"
                                    htmlType='submit'
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'var(--first-color)',
                                        borderColor: 'transparent',
                                        color: '#fff',
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        height: '40px',
                                        width: '400px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                    onMouseOver={(event) => {
                                        event.currentTarget.style.backgroundColor = 'black';
                                    }}
                                    onMouseOut={(event) => {
                                        event.currentTarget.style.backgroundColor = 'var(--first-color)';
                                    }}
                                >
                                    Asignar Docente a Nuevo Periodo
                                </Button>
                            </div>

                        </form>
                    </Card>
                </div>
            </div>
        </SIDEBARADMIN>
    );
}

export default CrearDocentes;
