import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { FileInput, Label } from "flowbite-react";
import NavDocentes from '../../../../components/NavDocentes';
import DashboardDocentes from '../../../../components/DashboardDocentes';
import { Button } from "flowbite-react";
import { message } from 'antd';

function CapturaCalificaciones() {

  const [studentsData, setStudentsData] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [periodo, setPeriodo] = useState('');
  const [trimestre, setTrimestre] = useState('');
  const [grado, setGrado] = useState('');
  const [grupo, setGrupo] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // Estado para el archivo seleccionado

  const closeModal = () => {
    setStudentsData([]);
    setMaterias([]);
    setPeriodo('');
    setTrimestre('');
    setGrado('');
    setGrupo('');
    setSelectedFile(null); // Limpiar el archivo seleccionado al cerrar el modal
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Obtener datos adicionales
      const additionalData = jsonData.slice(0, 4).reduce((acc, row) => {
        acc[row[0]] = row[1];
        return acc;
      }, {});
      setPeriodo(additionalData.Periodo);
      setTrimestre(additionalData.Trimestre);
      setGrado(additionalData.Grado);
      setGrupo(additionalData.Grupo);

      // Encontrar la fila donde comienzan los nombres de las materias
      let startIndex = 0;
      for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i][0] === 'ClaveAlumno') {
          startIndex = i + 1;
          break;
        }
      }

      // Obtener los nombres de las materias
      const materiaRow = jsonData[startIndex - 1]; // Fila anterior a la de los alumnos
      const headers = materiaRow.slice(1);
      setMaterias(headers);

      // Filtrar y transformar los datos de los alumnos y sus calificaciones
      const filteredData = jsonData.slice(startIndex).map(row => ({
        claveAlumno: row[0],
        calificaciones: row.slice(1)
      }));

      setStudentsData(filteredData);
      setSelectedFile(file); // Guardar el archivo seleccionado en el estado
    };
    reader.readAsBinaryString(file);
  };

  const saveToDatabase = () => {
    const dataToSend = {
      Periodo: periodo,
      Trimestre: trimestre,
      Grado: grado,
      Grupo: grupo,
      students: studentsData.map(student => ({
        ClaveAlumno: student.claveAlumno,
        Calificaciones: Object.fromEntries(materias.map((materia, index) => [materia, student.calificaciones[index]]))
      }))
    };

    console.log('estos datos se enviaran', dataToSend);
  
    axios.post('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/Alum.php', dataToSend)    //     http://localhost/TeleSecundaria763/Alum.php
      .then(response => {
        console.log(response.data);
        message.success('Datos guardados en la base de datos correctamente.');
      })
      .catch(error => {
        console.error('Error al guardar los datos:', error);
        message.warning('Hubo un error al intentar guardar los datos en la base de datos.');
      });
  };
  

  return (
    <div>

      <NavDocentes />

      <DashboardDocentes />



      <main className='mt-5 pl-60 mx-auto pl-28'>
        <section class="flex justify-center">
          <div class="mx-auto max-w-screen-xl px-4 lg:px-12 w-5/5 bg-gray-50 dark:bg-gray-900 p-32">
            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div class="overflow-x-auto ">
                <div className='container'>

                

                <div>
                  <div>
                    <Label htmlFor="multiple-file-upload" value="Cargar Archivo Excel" />
                  </div>
                  <FileInput type="file" onChange={handleFileUpload} />
                </div>

                  {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}

                  <Label htmlFor="remember">Datos del Período</Label>

                  
                  <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
                      <p className="mb-2 text-black">Periodo: {periodo}</p>
                      <p className="mb-2 text-black">Trimestre: {trimestre}</p>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
                      <p className="mb-2 text-black">Grado: {grado}</p>
                      <p className="mb-2 text-black">Grupo: {grupo}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="remember">Lista de Alumnos y Calificaciones</Label>


                   
                    

                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th>Clave Alumno</th>
                            {materias.map((materia, index) => (
                              <th key={index}>{materia}</th>
                          ))}
                        </tr>
                      </thead>
                      
                      <tbody>
                        {studentsData.map((student, index) => (
                          <tr key={index} className="border-b dark:border-gray-900">
                            <td>{student.claveAlumno}</td>
                              {student.calificaciones.map((calificacion, idx) => (
                                <td key={idx}>{calificacion}</td>
                              ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>

                  </div>
                  
                  <div className="flex">
                    <Button color="success" onClick={saveToDatabase}>Guardar en la Base de Datos</Button>
                    <Button color="failure" onClick={closeModal}>Cancelar</Button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      
      


    </div>
  );
}

export default CapturaCalificaciones;
