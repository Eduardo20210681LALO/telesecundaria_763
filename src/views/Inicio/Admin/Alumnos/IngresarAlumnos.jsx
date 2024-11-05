import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { Button, message, Table, Radio, DatePicker, Select } from 'antd';
import { Label, FileInput } from 'flowbite-react';
import SIDEBARADMIN from '../../../../components/SIDEBARADMIN';

const { Option } = Select;

function IngresarAlumnos() {
    const [studentsData, setStudentsData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [inputMethod, setInputMethod] = useState('manual');
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
        'TELEFONO TUTOR': '', // Nuevo campo añadido
    });

    const headers = ["CURP", "APELLIDO PATERNO", "APELLIDO MATERNO", "NOMBRE", "FECHA NAC", "SEXO DEL ALUMNO", "NOMBRE DEL TUTOR", "ESTADO", "MUNICIPIO", "LOCALIDAD", "CALLE", "CODIGO POSTAL", "TELEFONO TUTOR", "PERIODO", "GRADO", "GRUPO"];

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
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            const filteredData = jsonData.slice(7).map(row => {
                let student = {};
                headers.forEach((header, index) => {
                    student[header] = row[index] || '';
                });

                // Convertir fechas desde formato Excel a 'YYYY-MM-DD'
                if (student["FECHA NAC"]) {
                    const excelDate = student["FECHA NAC"];
                    const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000);
                    if (!isNaN(date.getTime())) {
                        student["FECHA NAC"] = date.toISOString().split('T')[0];
                    } else {
                        student["FECHA NAC"] = ''; // Si la fecha no es válida, dejarla vacía
                    }
                }

                return student;
            }).filter(student => student["CURP"] && student["CURP"] !== 'CURP');

            setStudentsData(filteredData);
            setSelectedFile(file);
        };
        reader.readAsBinaryString(file);
    };

    const saveToDatabase = () => {
        if (inputMethod === 'manual') {
            // Validación de campos vacíos en el modo manual
            for (const key in manualData) {
                if (!manualData[key]) {
                    message.warning(`Por favor, complete el campo: ${key}`);
                    return;
                }
            }
        }

        const dataToSend = {
            students: inputMethod === 'manual' ? [manualData] : studentsData
        };

        const endpoint = inputMethod === 'manual'   
            ? 'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/InsertarAlumnosManual.php'   //   http://localhost/TeleSecundaria763/AdminAlumnos/InsertarAlumnosManual.php
            : 'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/InsertarAlumnosDesdeExcel.php';   //   http://localhost/TeleSecundaria763/AdminAlumnos/InsertarAlumnosDesdeExcel.php

        console.log('Estos datos se enviarán', dataToSend);

        axios.post(endpoint, dataToSend)
            .then(response => {
                console.log(response.data);
                if (response.data.error) {
                    message.error('Hubo un error al intentar guardar los datos en la base de datos.');
                } else {
                    message.success('Datos guardados en la base de datos correctamente.');
                    closeModal();
                }
            })
            .catch(error => {
                console.error('Error al guardar los datos:', error);
                message.error('Hubo un error al intentar guardar los datos en la base de datos.');
            });
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
            <div className="flex justify-center w-full mx-auto mt-10">
                <main className="flex-grow flex justify-center items-center">
                    <div className={`bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden p-8 ${inputMethod === 'manual' ? 'w-full max-w-5xl' : 'w-full max-w-6xl'}`} style={{ marginLeft: '-50px', marginRight: '-50px' }}>
                   
                        <h2 className="text-3xl font-bold text-center mb-6" style={{ color: '#B8860B' }}>Ingresar nuevos alumnos</h2>

                        <div className='container'>
                            <Radio.Group onChange={(e) => setInputMethod(e.target.value)} value={inputMethod} className="mb-4">
                                <Radio value='manual'>Ingreso Manual</Radio>
                                <Radio value='excel'>Carga desde Excel</Radio>
                            </Radio.Group>
    
                            {inputMethod === 'manual' && (
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    {headers.slice(0, 13).map(header => ( // Cambiado a slice(0, 13) para incluir TELEFONO TUTOR
                                        <div key={header} className="col-span-1">
                                            <Label htmlFor={header} value={header.replace(/_/g, ' ')} />
                                            {header === "FECHA NAC" ? (
                                                <DatePicker
                                                    id={header}
                                                    onChange={handleDateChange}
                                                    className="block w-full"
                                                    placeholder="Seleccione la fecha de nacimiento"
                                                />
                                            ) : header === "SEXO DEL ALUMNO" ? (
                                                <Select
                                                    id={header}
                                                    onChange={handleSelectChange}
                                                    className="block w-full"
                                                    placeholder="Seleccione el sexo"
                                                >
                                                    <Option value="MASCULINO">MASCULINO</Option>
                                                    <Option value="FEMENINO">FEMENINO</Option>
                                                </Select>
                                            ) : (
                                                <input
                                                    type="text"
                                                    id={header}
                                                    name={header}
                                                    value={manualData[header]}
                                                    onChange={handleManualChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder={`Ingrese ${header.replace(/_/g, ' ').toLowerCase()}`}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
    
                            {inputMethod === 'excel' && (
                                <div className="mb-4">
                                    <Label htmlFor="multiple-file-upload" value="Cargar Archivo Excel" />
                                    <FileInput type="file" onChange={handleFileUpload} />
                                    {selectedFile && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Archivo seleccionado: {selectedFile.name}</p>}
                                </div>
                            )}
    
                            {inputMethod === 'excel' && studentsData.length > 0 && (
                                <div className="mb-4">
                                    <Label htmlFor="students">Lista de Alumnos</Label>
                                    <div className="overflow-x-auto mt-2">
                                        <Table
                                            dataSource={studentsData}
                                            columns={headers.slice(0, 13).map((header) => ({
                                                title: header,
                                                dataIndex: header,
                                                key: header
                                            }))}
                                            pagination={false}
                                        />
                                    </div>
                                </div>
                            )}
    
                            <div className="flex justify-end space-x-4 mt-6">
                                <Button type="primary" onClick={saveToDatabase} className="px-4">Guardar</Button>
                                <Button type="default" onClick={closeModal} className="px-4">Cancelar</Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </SIDEBARADMIN>
    );
}

export default IngresarAlumnos;
