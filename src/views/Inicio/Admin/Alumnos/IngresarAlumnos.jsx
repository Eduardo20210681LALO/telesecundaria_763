import React, { useState, useEffect, useRef } from 'react';
import { Typography, Card, message, DatePicker, Button, Input, Select, Radio } from 'antd';
import * as XLSX from 'xlsx';
import axios from 'axios';

import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';
import BreadcrumbAdmin from '../BreadcrumbAdmin';

const { Title } = Typography;
const { Option } = Select;

function IngresarAlumnos() {
    const [studentsData, setStudentsData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [inputMethod, setInputMethod] = useState('manual');
    const idUsuario = localStorage.getItem('idUsuario'); // Obtener el ID del usuario desde localStorage

    const [manualData, setManualData] = useState({
        CURP: '',
        'APELLIDO PATERNO': '',
        'APELLIDO MATERNO': '',
        NOMBRE: '',
        'FECHA NAC': '',
        'SEXO DEL ALUMNO': '',
        'NOMBRE DEL TUTOR': '',
        ESTADO: '',
        MUNICIPIO: '',
        LOCALIDAD: '',
        CALLE: '',
        'CODIGO POSTAL': '',
        'TELEFONO TUTOR': '',
    });

    const headers = ["CURP", "APELLIDO PATERNO", "APELLIDO MATERNO", "NOMBRE", "FECHA NAC", "SEXO DEL ALUMNO", "NOMBRE DEL TUTOR", "ESTADO", "MUNICIPIO", "LOCALIDAD", "CALLE", "CODIGO POSTAL", "TELEFONO TUTOR"];

    const closeModal = () => {
        setStudentsData([]);
        setSelectedFile(null);
        setManualData({
            CURP: '',
            'APELLIDO PATERNO': '',
            'APELLIDO MATERNO': '',
            NOMBRE: '',
            'FECHA NAC': '',
            'SEXO DEL ALUMNO': '',
            'NOMBRE DEL TUTOR': '',
            ESTADO: '',
            MUNICIPIO: '',
            LOCALIDAD: '',
            CALLE: '',
            'CODIGO POSTAL': '',
            'TELEFONO TUTOR': ''
        });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) {
            message.error('No se ha seleccionado ningún archivo.');
            return;
        }
        if (!file.name.endsWith('.xlsx')) {
            message.error('Solo se permiten archivos Excel (.xlsx)');
            return;
        }

        const reader = new FileReader();
        reader.onload = (evt) => {
            const data = evt.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: headers });

            const filteredData = jsonData.slice(1).map(row => {
                let student = {};
                headers.forEach(header => {
                    student[header] = row[header] || '';
                });

                if (student["FECHA NAC"]) {
                    const excelDate = student["FECHA NAC"];
                    const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000);
                    student["FECHA NAC"] = !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : '';
                }

                return student;
            }).filter(student => student["CURP"] && student["CURP"] !== 'CURP');

            setStudentsData(filteredData);
            setSelectedFile(file);
        };
        reader.readAsBinaryString(file);
    };

    const saveToDatabase = async () => {
        if (inputMethod === 'manual') {
            for (const key in manualData) {
                if (!manualData[key]) {
                    message.warning(`Por favor, complete el campo: ${key}`);
                    return;
                }
            }
        }
    
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
    
                const dataToSend = {
                    students: inputMethod === 'manual' ? [manualData] : studentsData,
                    location: { latitude, longitude },
                    userId: idUsuario,
                };
    
                const endpoint = inputMethod === 'manual'
                    ? 'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/InsertarAlumnosManual.php'
                    : 'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/InsertarAlumnosDesdeExcel.php';
    
                try {
                    const response = await axios.post(endpoint, dataToSend);
                    if (response.data.error) {
                        message.error('Hubo un error al intentar guardar los datos en la base de datos.');
                    } else {
                        message.success('Datos guardados en la base de datos correctamente.');
                        closeModal();
                    }
                } catch (error) {
                    message.error('Hubo un error al intentar guardar los datos en la base de datos.');
                }
            },
            (error) => {
                message.error('No se pudo obtener la ubicación. Verifique los permisos.');
            }
        );
    };
    
    const handleManualChange = (e) => {
        const { name, value } = e.target;
        setManualData({ ...manualData, [name]: value });
    };

    const handleDateChange = (date, dateString) => {
        setManualData({ ...manualData, 'FECHA NAC': dateString });
    };

    const handleSelectChange = (value) => {
        setManualData({ ...manualData, 'SEXO DEL ALUMNO': value });
    };


    return (
        <SIDEBARADMIN>
            <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 'calc(100vh - 60px)',
                    padding: '20px',
                    maxWidth: 'calc(200vw - 100px)',
                    boxSizing: 'border-box',
                    width: '100%',
                }}>
                <BreadcrumbAdmin />
                <Title level={2}>Ingresar Nuevos Alumnos</Title>
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Card style={{ background: '#fff', padding: '20px', flexGrow: 1, overflowY: 'auto' }}>
                        <Title level={4} className="mb-4">Ingrese los datos del Alumno</Title>
                        <Radio.Group onChange={(e) => setInputMethod(e.target.value)} value={inputMethod} className="mb-4">
                            <Radio value='manual'>Ingreso Manual</Radio>
                            <Radio value='excel'>Carga desde Excel</Radio>
                        </Radio.Group>
    
                        {inputMethod === 'manual' && (
                            <form className="flex flex-col w-full">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    {headers.slice(0, 13).map(header => (
                                        <div key={header}>
                                            <label htmlFor={header} className="block mb-1">{header.replace(/_/g, ' ')}</label>
                                            {header === "FECHA NAC" ? (
                                                <DatePicker
                                                    id={header}
                                                    onChange={handleDateChange}
                                                    className="w-full"
                                                    placeholder="Seleccione la fecha de nacimiento"
                                                />
                                            ) : header === "SEXO DEL ALUMNO" ? (
                                                <Select
                                                    id={header}
                                                    onChange={handleSelectChange}
                                                    className="w-full"
                                                    placeholder="Seleccione el sexo del alumno"
                                                >
                                                    <Option value="MASCULINO">Masculino</Option>
                                                    <Option value="FEMENINO">Femenino</Option>
                                                </Select>
                                            ) : (
                                                <Input
                                                    type="text"
                                                    id={header}
                                                    name={header}
                                                    value={manualData[header]}
                                                    onChange={handleManualChange}
                                                    className="w-full p-2 rounded border border-gray-300"
                                                    placeholder={`Ingrese ${header.replace(/_/g, ' ').toLowerCase()}`}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </form>
                        )}
    
                        {inputMethod === 'excel' && (
                            <div className="mb-4">
                                <label htmlFor="multiple-file-upload" className="block mb-2">Cargar Archivo Excel</label>
                                <input type="file" onChange={handleFileUpload} />
                                {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                    {studentsData.map((student, index) => (
                                        <Card key={index} title={`Alumno ${index + 1}`} bordered={true}>
                                            {headers.map(header => (
                                                <p key={header}>
                                                    <strong>{header.replace(/_/g, ' ')}:</strong> {student[header] || 'N/A'}
                                                </p>
                                            ))}
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
    
                        <div className="flex justify-center mt-4 space-x-4">
                            <Button onClick={saveToDatabase} type="primary">Guardar Datos De Alumnos</Button>
                            <Button onClick={closeModal} type="default">Cancelar Captura de Datos</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </SIDEBARADMIN>
    );    
}

export default IngresarAlumnos;
