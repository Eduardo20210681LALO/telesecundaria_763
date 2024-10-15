import React, { useState } from 'react';
import { Descriptions, Typography, Card, message, Upload, Button, Table } from 'antd'; // Importamos los componentes de Ant Design
import { UploadOutlined } from '@ant-design/icons'; // Icono de Ant Design
import * as XLSX from 'xlsx';
import axios from 'axios';
import SIDEBARDOCENT from '../../components/SIDEBARDOCENT';
import BreadcrumDocent from '../../views/Inicio/Docentes/BreadcrumDocent';

const { Title } = Typography;

function Prueba2() {
    const [studentsData, setStudentsData] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [periodo, setPeriodo] = useState('');
    const [grado, setGrado] = useState('');
    const [grupo, setGrupo] = useState('');
    const [trimestre, setTrimestre] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const closeModal = () => {
        setStudentsData([]);
        setMaterias([]);
        setPeriodo('');
        setGrado('');
        setGrupo('');
        setTrimestre('');
        setSelectedFile(null);
    };

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
            const data = evt.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            const findValue = (data, searchValue) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i][0] && data[i][0].toString().toLowerCase().includes(searchValue.toLowerCase())) {
                        return data[i][1];
                    }
                }
                return '';
            };

            const additionalData = {
                PERIODO: findValue(jsonData, 'PERIODO'),
                GRADO: findValue(jsonData, 'GRADO'),
                GRUPO: findValue(jsonData, 'GRUPO'),
                TRIMESTRE: findValue(jsonData, 'TRIMESTRE')
            };
            setPeriodo(additionalData.PERIODO);
            setGrado(additionalData.GRADO);
            setGrupo(additionalData.GRUPO);
            setTrimestre(additionalData.TRIMESTRE);

            console.log("Datos adicionales:", additionalData);

            const startIndex = jsonData.findIndex(row => row.includes('CURP'));

            const materiaRow = jsonData[startIndex];
            const endIndex = materiaRow.findIndex(header => header.toLowerCase() === 'calificacion trimestre');
            const headers = materiaRow.slice(2, endIndex); // Excluye CURP y Nombre del Alumno
            setMaterias(headers);

            console.log("Materias:", headers);

            const filteredData = jsonData.slice(startIndex + 1).map(row => ({
                claveAlumno: row[0] || null,
                nombreCompleto: row[1] || null,
                calificaciones: row.slice(2, endIndex), // Ajustar el rango para las calificaciones
                calificacionTrimestre: row[endIndex] || null // Obtener "CALIFICACION TRIMESTRE"
            })).filter(student => student.claveAlumno && student.nombreCompleto && student.calificaciones.length === headers.length);

            console.log("Datos de estudiantes filtrados:", filteredData);

            setStudentsData(filteredData);
            setSelectedFile(file);
        };
        reader.readAsBinaryString(file);
    };

    const saveGradesToDatabase = () => {
        if (studentsData.length === 0) {
            message.error('No hay datos válidos para guardar.');
            return;
        }

        const dataToSend = {
            Periodo: periodo,
            Grado: grado,
            Grupo: grupo,
            Trimestre: trimestre,
            students: studentsData.map(student => ({
                ClaveAlumno: student.claveAlumno,
                Calificaciones: Object.fromEntries(materias.map((materia, index) => [materia, student.calificaciones[index]]))
            }))
        };

        console.log('Datos que se enviarán:', dataToSend);

        axios.post('http://localhost/TeleSecundaria763/Docentes/InsertarCalificacionesSegundo.php', dataToSend)
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    message.success('Datos guardados en la base de datos correctamente.');
                    saveFinalGradesToDatabase();
                } else {
                    message.error(response.data.message);
                }
            })
            .catch(error => {
                console.error('Error al guardar los datos:', error);
                message.warning('Hubo un error al intentar guardar los datos en la base de datos.');
            });
    };

    const saveFinalGradesToDatabase = () => {
        const finalGradesToSend = {
            Periodo: periodo,
            Trimestre: trimestre,
            students: studentsData.map(student => ({
                ClaveAlumno: student.claveAlumno,
                Calificacion: student.calificacionTrimestre
            }))
        };

        console.log('Datos que se enviarán para calificaciones finales:', finalGradesToSend);

        axios.post('http://localhost/TeleSecundaria763/Docentes/InsertarCalificacionesFinales.php', finalGradesToSend)
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    message.success('Promedio general guardado correctamente.');
                } else {
                    message.error(response.data.message);
                }
                closeModal();
            })
            .catch(error => {
                console.error('Error al guardar el promedio general:', error);
                message.warning('Hubo un error al intentar guardar el promedio general en la base de datos.');
            });
    };

    // Props para el componente Upload
    const uploadProps = {
        name: 'file',
        accept: '.xlsx, .xls', // Solo aceptar archivos Excel
        beforeUpload: (file) => {
            handleFileUpload(file); // Llamar la función de manejo de archivo
            return false; // Evita la subida automática por defecto
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} fue cargado exitosamente`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} falló en la carga.`);
            }
        }
    };

    // Configurar las columnas de la tabla
    const columns = [
        {
            title: 'Clave Alumno',
            dataIndex: 'claveAlumno',
            key: 'claveAlumno',
        },
        {
            title: 'Nombre Completo',
            dataIndex: 'nombreCompleto',
            key: 'nombreCompleto',
        },
        // Generar dinámicamente columnas para las materias
        ...materias.map((materia, index) => ({
            title: materia,
            dataIndex: ['calificaciones', index], // Acceder a las calificaciones por índice
            key: `materia-${index}`,
        })),
        {
            title: 'Calificación Trimestre',
            dataIndex: 'calificacionTrimestre',
            key: 'calificacionTrimestre',
        },
    ];

    // Crear los datos de la tabla
    const dataSource = studentsData.map((student, index) => ({
        key: index,
        claveAlumno: student.claveAlumno,
        nombreCompleto: student.nombreCompleto,
        calificaciones: student.calificaciones, // Lista de calificaciones para cada materia
        calificacionTrimestre: student.calificacionTrimestre,
    }));

    // Estilos personalizados para compactar la tabla
    const compactTableStyle = {
        fontSize: '12px', // Tamaño de texto más pequeño
        padding: '4px 8px', // Reducir el padding de las celdas
    };

    return (
        <SIDEBARDOCENT>
            {/* Contenedor principal con padding */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 'calc(100vh - 60px)', // Ajusta para que ocupe todo el espacio restante
                    padding: '20px',
                }}
            >
                <BreadcrumDocent />

                {/* Título de la vista */}
                <Title level={2}>Captura de Calificaciones por Excel</Title>

                {/* Contenedor para el contenido principal */}
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Card
                        style={{
                            background: '#fff',
                            padding: '20px',
                            flexGrow: 1, // Hace que el card se extienda para ocupar el espacio disponible
                            overflowY: 'auto', // Permite hacer scroll si el contenido es demasiado grande
                        }}
                    >
                        <div style={{ width: '100%', padding: '20px' }}>
                            {/* Título y botón de carga */}
                            <Title level={4} style={{ color: 'black', marginBottom: '20px' }}>
                                Por favor, seleccione el archivo de Excel que contiene las calificaciones para su carga.
                            </Title>

                            {/* Botón de Carga de Archivos Excel con Ant Design */}
                            <div style={{ marginBottom: '20px' }}>
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />}>
                                        Cargar archivo Excel
                                    </Button>
                                </Upload>
                                {selectedFile && (
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        Archivo seleccionado: {selectedFile.name}
                                    </p>
                                )}
                            </div>

                            {/* Mostrar datos del archivo Excel cargado */}
                            <div className="mb-8">
                                <Title level={4} style={{ color: 'black', marginBottom: '20px' }}>
                                    Datos requeridos: Trimestre, Periodo, Grado y Grupo.
                                </Title>

                                <Descriptions bordered column={4}>
                                    <Descriptions.Item label="Periodo">{periodo}</Descriptions.Item>
                                    <Descriptions.Item label="Trimestre">{trimestre}</Descriptions.Item>
                                    <Descriptions.Item label="Grado">{grado}</Descriptions.Item>
                                    <Descriptions.Item label="Grupo">{grupo}</Descriptions.Item>
                                </Descriptions>
                            </div>

                            {/* Tabla de alumnos y calificaciones usando Ant Design Table */}
                            <div className="mb-8">
                                <Title level={4} style={{ color: 'black', marginBottom: '20px' }}>
                                    Visualización de Alumnos y sus Calificaciones.
                                </Title>

                                {/* Aplicar el estilo compacto a la tabla */}
                                <Table
                                    columns={columns}
                                    dataSource={dataSource}
                                    pagination={false}
                                    scroll={{ x: '100%', y: 400 }}  // Habilitar scroll horizontal y vertical
                                    size="small" // Hacer la tabla más compacta
                                    style={compactTableStyle} // Aplicar estilo personalizado
                                />
                            </div>

                            {/* Botones de acción */}
                            <div className="flex justify-end space-x-4 mt-4">
                                <Button type="primary" onClick={saveGradesToDatabase}>
                                    Guardar en la Base de Datos
                                </Button>
                                <Button type="danger" onClick={closeModal}>
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </SIDEBARDOCENT>
    );
}

export default Prueba2;
