import React, { useState, useEffect, useRef} from 'react'
import { CustomSelect2 } from '../components/Input';
import { createChart } from 'lightweight-charts';
import Nav from '../components/Nav';

function PrototipoMatematicas() {
    const [selectAño1, setSelectAño1] = useState()
    const [selectAño2, setSelectAño2] = useState()
    const [selectAño3, setSelectAño3] = useState()
    const [prediccion, setPrediccion] = useState()
    
    const PredictorInscripciones = (opcion1, opcion2, opcion3) => {
      console.log(opcion1.value, opcion1.cant)
      console.log(opcion2.value, opcion2.cant)
      console.log(opcion3.value)
      console.log('Hola')
      let c, k, p
      c = Math.exp(opcion1.value) * opcion1.cant
      k = Math.log(opcion2.value / ((c < 0 || c>0) ? c : 1)) / opcion2.cant
      p = ((c != 0) ? c : 1) * Math.exp(k * opcion3.value)
      const sinDecimal = Math.trunc(p)
      setPrediccion(sinDecimal)
    }
    
    const handleOptionAño1 = (option) => {
      console.log(option)
      setSelectAño1(option)
    }
    
    const handleOptionAño2 = (option) => {
      setSelectAño2(option)
    }
    
    const handleOptionAño3 = (option) => {
      setSelectAño3(option)
    }
    
    const inscripcionesData = [
      { id: 0, año: 2015, alumnos: 80 },
      { id: 1, año: 2016, alumnos: 90 },
      { id: 2, año: 2017, alumnos: 100 },
      { id: 3, año: 2018, alumnos: 110 },
      { id: 4, año: 2019, alumnos: 120 },
      { id: 5, año: 2020, alumnos: 130 },
      { id: 6, año: 2021, alumnos: 140 },
      { id: 7, año: 2022, alumnos: 150 },
      { id: 8, año: 2023, alumnos: 160 },
    ] 
    
    const egresosData = [
      { año_ingreso: 2015, alumnos_ingresados: 80, año_egreso: 2018, alumnos_egresados: 60 },
      { año_ingreso: 2016, alumnos_ingresados: 90, año_egreso: 2019, alumnos_egresados: 70 },
      { año_ingreso: 2017, alumnos_ingresados: 100, año_egreso: 2020, alumnos_egresados: 80 },
      { año_ingreso: 2018, alumnos_ingresados: 110, año_egreso: 2021, alumnos_egresados: 90 },
      { año_ingreso: 2019, alumnos_ingresados: 120, año_egreso: 2022, alumnos_egresados: 100 },
      { año_ingreso: 2020, alumnos_ingresados: 130, año_egreso: 2023, alumnos_egresados: 110 },
      { año_ingreso: 2021, alumnos_ingresados: 140, año_egreso: 2024, alumnos_egresados: 120 },
    ]
    
    const AñosFuturos = [
      {id: 9, año: 2024},
      {id: 10, año: 2025},
      {id: 11, año: 2026},
      {id: 12, año: 2027},
      {id: 13, año: 2028},
      {id: 14, año: 2029},
      {id: 15, año: 2030}
    ]
    
    const dataForChart = inscripcionesData.map((item) => ({
      time: item.año,
      value: parseInt(item.alumnos),
    }));
    
    if (selectAño3 && prediccion) {
      dataForChart.push({
        time: parseInt(selectAño3.label),
        value: parseInt(prediccion),
      });
    }
    
    const chartContainerRef = useRef();
    useEffect(() => {
      const chart = createChart(chartContainerRef.current, { width: 800, height: 400 });
      const lineSeries = chart.addLineSeries();
      lineSeries.setData(dataForChart);
      return () => chart.remove();
    }, [dataForChart]);


    return (
        
<div>
    <Nav/>

        {/* Formulario para Selects e Inputs */}
        <div className="flex justify-center items-center h-screen">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-4">
                <div className="login-card p-4 rounded-lg shadow-lg bg-white">
                    <h2 className="text-3xl font-bold text-center my-4">Prototipo Matemáticas para Ingeniería II</h2>
                    <h4 className="text-xl font-bold text-center my-4">Eficiencia terminal</h4>

                    <form>
                        <div className="mb-4">
                            <CustomSelect2
                                options={inscripcionesData.map((item) => ({
                                    value: item.id,
                                    label: item.año.toString(),
                                    cant: item.alumnos.toString()
                                }))}
                                placeholder="Año"
                                onChange={handleOptionAño1}
                                value={selectAño1}
                            />
                            <h3>Alumnos inscritos: {selectAño1?.cant}</h3>
                        </div>
                        <div className="mb-4">
                            <CustomSelect2
                                options={inscripcionesData.map((item) => ({
                                    value: item.id,
                                    label: item.año.toString(),
                                    cant: item.alumnos.toString()
                                }))}
                                placeholder="Año"
                                onChange={handleOptionAño2}
                                value={selectAño2}
                            />
                            <h3>Alumnos inscritos: {selectAño2?.cant}</h3>
                        </div>
                        <div className="mb-4">
                            <CustomSelect2
                                options={AñosFuturos.map((item) => ({
                                    value: item.id,
                                    label: item.año.toString(),
                                }))}
                                placeholder="Año"
                                onChange={handleOptionAño3}
                                value={selectAño3}
                            />
                            <h3>Alumnos que se inscribirán en el año {selectAño3?.label}</h3>
                        </div>
                        <p>{prediccion}</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => PredictorInscripciones(selectAño1, selectAño2, selectAño3)}>Predecir</button>
                    </form>
                </div>
            </div>
        </div>

        {/* Tabla de la Gráfica */}
        <div className="flex justify-center items-center">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-4">
                <div className="login-card p-4 rounded-lg shadow-lg bg-white">
                    <h2 className="text-lg font-bold mb-4">Gráfica</h2>
                    {/* Aquí puedes colocar la tabla para la gráfica */}
                </div>
            </div>
        </div>

        {/* Tabla de Otro Conjunto de Datos */}
        <div className="flex justify-center items-center">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-4">
                <div className="login-card p-4 rounded-lg shadow-lg bg-white">
                    <h2 className="text-lg font-bold mb-4">Otro Conjunto de Datos</h2>
                    {/* Aquí puedes colocar la tabla para el otro conjunto de datos */}
                </div>
            </div>
        </div>
    </div>

    )
}

export default PrototipoMatematicas