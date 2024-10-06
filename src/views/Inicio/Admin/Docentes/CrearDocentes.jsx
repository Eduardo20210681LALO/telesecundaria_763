import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { message } from 'antd';
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';

function CrearDocentes() {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

        try {
            const response = await fetch('http://localhost/TeleSecundaria763/AdminDocentes/CrearDocenteXVista.php', {
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

    return (
        <SIDEBARADMIN>
            <div className="flex flex-col md:flex-row justify-between w-full mx-auto mt-10 gap-6">
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-6">
                                <div className="text-center mb-6">
                                    <h2 className="text-3xl font-bold text-center mb-6" style={{ color: '#B8860B' }}>Crear Nuevo Docente</h2>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    {/* Primera fila con 4 inputs */}
                                    <div className="row">
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label text-gray-900 dark:text-gray-300">Nombre:</label>
                                            <input
                                                type="text"
                                                className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                placeholder="Ingrese el nombre"
                                            />
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label text-gray-900 dark:text-gray-300">Apellido Paterno:</label>
                                            <input
                                                type="text"
                                                className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                name="aPaterno"
                                                value={formData.aPaterno}
                                                onChange={handleChange}
                                                placeholder="Ingrese el apellido paterno"
                                            />
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label text-gray-900 dark:text-gray-300">Apellido Materno:</label>
                                            <input
                                                type="text"
                                                className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                name="aMaterno"
                                                value={formData.aMaterno}
                                                onChange={handleChange}
                                                placeholder="Ingrese el apellido materno"
                                            />
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label text-gray-900 dark:text-gray-300">Usuario:</label>
                                            <input
                                                type="text"
                                                className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                name="usuario"
                                                value={formData.usuario}
                                                onChange={handleChange}
                                                placeholder="Ingrese el usuario"
                                            />
                                        </div>
                                    </div>
                                    {/* Segunda fila con 4 inputs */}
                                    <div className="row">
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label text-gray-900 dark:text-gray-300">Correo:</label>
                                            <input
                                                type="email"
                                                className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                name="correo"
                                                value={formData.correo}
                                                onChange={handleChange}
                                                placeholder="Ingrese el correo electrónico"
                                            />
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label text-gray-900 dark:text-gray-300">Teléfono:</label>
                                            <input
                                                type="tel"
                                                className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleChange}
                                                placeholder="Ingrese el teléfono"
                                            />
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label text-gray-900 dark:text-gray-300">Contraseña:</label>
                                            <input
                                                type="password"
                                                className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Ingrese la contraseña"
                                            />
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label text-gray-900 dark:text-gray-300">Confirmar Contraseña:</label>
                                            <input
                                                type="password"
                                                className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                placeholder="Confirme la contraseña"
                                            />
                                        </div>
                                    </div>
                                    {/* Botón de enviar */}
                                    <div className="row">
                                        <div className="col-md-12 d-flex justify-content-center">
                                            <button type="submit" className="btn btn-primary w-25">Crear Docente</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SIDEBARADMIN>
    );
}

export default CrearDocentes;
