import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { FileInput, Label } from "flowbite-react";
import { Button } from "flowbite-react";
import { message } from 'antd';
import SIDEBARDOCENT from '../../../components/SIDEBARDOCENT';

function CapturaCalificacionesAlum () {
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
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
      const headers = materiaRow.slice(2, endIndex); // Excluding CURP and Nombre del Alumno
      setMaterias(headers);

      console.log("Materias:", headers);

      const filteredData = jsonData.slice(startIndex + 1).map(row => ({
        claveAlumno: row[0] || null,
        nombreCompleto: row[1] || null,
        calificaciones: row.slice(2, endIndex), // Adjust the range for the calificaciones
        calificacionTrimestre: row[endIndex] || null // Ensure to get "CALIFICACION TRIMESTRE"
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

  return (
    <SIDEBARDOCENT>
        <div className="flex justify-center w-full mx-auto mt-10">
            {/* Bloque de Información de Usuario */}
            <main className="flex-grow flex justify-center items-center">
                <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden p-8 w-full max-w-6xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-8 text-center text-gray-700 dark:text-gray-300">Carga de Calificaciones de Alumnos</h2>
                    <div className='container'>
                        <div className="mb-8">
                            <Label htmlFor="multiple-file-upload" value="Cargar Archivo Excel" />
                            <FileInput type="file" onChange={handleFileUpload} />
                            {selectedFile && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Archivo seleccionado: {selectedFile.name}</p>}
                        </div>

                        <div className="mb-8">
                            <Label htmlFor="remember">Datos del Período</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                <div className="text-gray-700 dark:text-gray-300">Periodo: {periodo}</div>
                                <div className="text-gray-700 dark:text-gray-300">Grado: {grado}</div>
                                <div className="text-gray-700 dark:text-gray-300">Grupo: {grupo}</div>
                                <div className="text-gray-700 dark:text-gray-300">Trimestre: {trimestre}</div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <Label htmlFor="remember">Lista de Alumnos y Calificaciones</Label>
                            <div className="overflow-x-auto mt-4">
                                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th className="px-6 py-3">Clave Alumno</th>
                                            <th className="px-6 py-3">Nombre Completo</th>
                                            {materias.map((materia, index) => (
                                                <th className="px-6 py-3" key={index}>{materia}</th>
                                            ))}
                                            <th className="px-6 py-3">Calificación Trimestre</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentsData.map((student, index) => (
                                            <tr key={index} className="border-b dark:border-gray-900">
                                                <td className="px-6 py-4">{student.claveAlumno}</td>
                                                <td className="px-6 py-4">{student.nombreCompleto}</td>
                                                {student.calificaciones.map((calificacion, idx) => (
                                                    <td className="px-6 py-4" key={idx}>{calificacion}</td>
                                                ))}
                                                <td className="px-6 py-4">{student.calificacionTrimestre}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex justify-between space-x-4">
                            <Button color="success" className="w-full sm:w-auto" onClick={saveGradesToDatabase}>Guardar en la Base de Datos</Button>
                            <Button color="failure" className="w-full sm:w-auto" onClick={closeModal}>Cancelar</Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </SIDEBARDOCENT>
);

}

export default CapturaCalificacionesAlum;