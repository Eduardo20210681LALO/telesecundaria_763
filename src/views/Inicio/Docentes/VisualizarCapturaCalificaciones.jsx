import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Select, Button, message } from 'antd';
import SIDEBARDOCENT from '../../../components/SIDEBARDOCENT';

const { Option } = Select;

function VisualizarCapturaCalificaciones() {
  const [studentsData, setStudentsData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [calificaciones, setCalificaciones] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [grados, setGrados] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState('');
  const [selectedGrado, setSelectedGrado] = useState('');
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const docenteId = localStorage.getItem('idUsuario'); // Asumimos que el ID del docente está almacenado en localStorage

  useEffect(() => {
    axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php')
      .then(res => setPeriodos(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error('Error al obtener periodos:', err));

    axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php')
      .then(res => setGrados(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error('Error al obtener grados:', err));

    axios.get('http://localhost/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php')
      .then(res => setGrupos(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error('Error al obtener grupos:', err));
  }, []);

  const fetchStudents = () => {
    if (selectedPeriodo && selectedGrado && selectedGrupo && docenteId) {
      axios.get(`http://localhost/TeleSecundaria763/Docentes/TraerAlumnosPorDocente.php?periodo=${selectedPeriodo}&grado=${selectedGrado}&grupo=${selectedGrupo}&docenteId=${docenteId}`)
        .then(res => {
          console.log('Datos de alumnos recibidos:', res.data);
          setStudentsData(Array.isArray(res.data.alumnos) ? res.data.alumnos : []);
          if (!Array.isArray(res.data.alumnos) || res.data.alumnos.length === 0) {
            message.info('No se encontraron alumnos para los criterios seleccionados.');
          }
        })
        .catch(err => {
          console.error('Error al obtener alumnos:', err);
          message.error('Error al obtener alumnos');
        });
    } else {
      message.error('Por favor, selecciona todos los criterios (periodo, grado y grupo)');
    }
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    fetchCalificaciones(student.vchCurpAlumno, selectedPeriodo, selectedGrado, selectedGrupo);
  };

  const fetchCalificaciones = (matricula, periodo, grado, grupo) => {
    axios.get(`http://localhost/TeleSecundaria763/Docentes/ObtenerCalificaciones.php?matricula=${matricula}&periodo=${periodo}&grado=${grado}&grupo=${grupo}`)
      .then(response => {
        const data = response.data;
        console.log('Datos de calificaciones recibidos:', data);  // Log para verificar los datos recibidos
        if (data.success) {
          setCalificaciones(Array.isArray(data.calificaciones) ? data.calificaciones : []);
        } else {
          message.error('Error al obtener calificaciones');
        }
      })
      .catch(error => {
        console.error('Error al obtener calificaciones:', error);
        message.error('Error del servidor al obtener calificaciones');
      });
  };

  const columns = [
    { title: 'CURP', dataIndex: 'vchCurpAlumno', key: 'vchCurpAlumno' },
    { title: 'Apellido Paterno', dataIndex: 'vchAPaterno', key: 'vchAPaterno' },
    { title: 'Apellido Materno', dataIndex: 'vchAMaterno', key: 'vchAMaterno' },
    { title: 'Nombre', dataIndex: 'vchNombre', key: 'vchNombre' },
    {
      title: 'Seleccionar',
      key: 'select',
      render: (text, record) => (
        <Button onClick={() => handleStudentSelect(record)}>Seleccionar</Button>
      ),
    },
  ];

  const gradesColumns = [
    { title: 'Materia', dataIndex: 'materia', key: 'materia' },
    { title: 'M1', dataIndex: 'M1', key: 'M1' },
    { title: 'M2', dataIndex: 'M2', key: 'M2' },
    { title: 'M3', dataIndex: 'M3', key: 'M3' },
    { title: 'Final', dataIndex: 'Final', key: 'Final' },
  ];

  return (
    <SIDEBARDOCENT>
        <div className="flex justify-center w-full mx-auto mt-10">
            <main className="flex-grow p-4">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-7xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-8 text-center text-gray-700 dark:text-gray-300">Consultar Alumnos</h2>
                    <div className="container mx-auto">
                        <div className="mb-6 flex flex-wrap justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                            <Select value={selectedPeriodo} onChange={setSelectedPeriodo} placeholder="Periodo" style={{ width: '200px' }}>
                                {periodos.map(periodo => (
                                    <Option key={periodo.intClvPeriodo} value={periodo.intClvPeriodo}>{periodo.vchPeriodo}</Option>
                                ))}
                            </Select>
                            <Select value={selectedGrado} onChange={setSelectedGrado} placeholder="Grado" style={{ width: '200px' }}>
                                {grados.map(grado => (
                                    <Option key={grado.intClvGrado} value={grado.intClvGrado}>{grado.vchGrado}</Option>
                                ))}
                            </Select>
                            <Select value={selectedGrupo} onChange={setSelectedGrupo} placeholder="Grupo" style={{ width: '200px' }}>
                                {grupos.map(grupo => (
                                    <Option key={grupo.intClvGrupo} value={grupo.intClvGrupo}>{grupo.vchGrupo}</Option>
                                ))}
                            </Select>
                            <Button type="primary" onClick={fetchStudents} style={{ minWidth: '150px' }}>Consultar</Button>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:space-x-8">
                            <div className="lg:w-2/3 w-full">
                                <Table
                                    columns={columns}
                                    dataSource={studentsData}
                                    rowKey="vchCurpAlumno"
                                    pagination={false}
                                    scroll={{ x: false }}
                                    className="shadow-md rounded-lg"
                                    size="middle"
                                />
                            </div>
                            <div className="lg:w-1/3 w-full mt-8 lg:mt-0">
                                {selectedStudent && (
                                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                                        <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                                            Calificaciones obtenidas por: {selectedStudent.vchNombre} {selectedStudent.vchAPaterno} {selectedStudent.vchAMaterno}
                                        </h3>
                                        <Table
                                            columns={gradesColumns}
                                            dataSource={calificaciones}
                                            pagination={false}
                                            footer={() => (
                                                <div className="flex justify-between">
                                                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                                                        Promedio: {(calificaciones.reduce((sum, grade) => sum + parseFloat(grade.Final), 0) / (calificaciones.length || 1)).toFixed(2)}
                                                    </span>
                                                </div>
                                            )}
                                            className="shadow-md rounded-lg"
                                            size="middle"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </SIDEBARDOCENT>
  );
}

export default VisualizarCapturaCalificaciones;
