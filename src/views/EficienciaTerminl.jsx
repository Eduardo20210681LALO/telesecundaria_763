import React, { useState } from 'react';
import { message } from 'antd';
import Nav from '../components/Nav';

function EficienciaTerminl() {
    const [formDataIngresos, setFormDataIngresos] = useState({ alumnosCI: 0, TiempoUNO: 0, TiempoDOS: 0, alumnosK: 0, TiempoP1: 0 });
    const [formDataBajas, setFormDataBajas] = useState({ alumnosCI: 0, TiempoUNO: 0, TiempoDOS: 0, alumnosK: 0, TiempoP1: 0 });
    const [prediccionAlumnosIngresos, setPrediccionAlumnosIngresos] = useState(null);
    const [prediccionAlumnosBajas, setPrediccionAlumnosBajas] = useState(null);
    const [eficienciaTerminal, setEficienciaTerminal] = useState(null);

    const [ingresosData, setIngresosData] = useState([]); 

    const PredicionAlumnosAInscribirse = (e, formData, setPrediccionAlumnos) => {
        e.preventDefault();
        let c, k, p;
        c = Math.exp(formData.TiempoUNO) * formData.alumnosCI;
        k = Math.log(formData.alumnosK / ((c !== 0) ? c : 1)) / formData.TiempoDOS;
        p = ((c !== 0) ? c : 1) * Math.exp(k * formData.TiempoP1);
        const prediccion = Math.trunc(p);
        if (p >= 1) {
            setPrediccionAlumnos(prediccion);
            message.success(`Predicción de alumnos: ${prediccion}`);
        } else {
            setPrediccionAlumnos(null);
            message.warning('Predicción inacertada, verifica por favor...');
        }
    };

    const handleChangeIngresos = (e) => {
        const { name, value } = e.target;
        setFormDataIngresos((prev) => ({
            ...prev,
            [name]: value
        }));
    };

  

    const calcularEficienciaTerminal = () => {
        if (formDataIngresos.alumnosCI !== 0) {
            const eficiencia = ((formDataIngresos.alumnosCI - formDataBajas.alumnosCI) / formDataIngresos.alumnosCI) * 100;
            setEficienciaTerminal(eficiencia);
        } else {
            setEficienciaTerminal(null);
            message.warning('No se puede calcular la eficiencia terminal porque el número de alumnos inscritos es cero.');
        }
    };

    return (
        <div>
            <Nav />
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-1/2 p-4">
                    <div className="login-card p-4" style={{ width: '100%', maxWidth: '100%', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', backgroundColor: '#fff', marginBottom: '20px' }}>

                        <form className="container" onSubmit={(e) => PredicionAlumnosAInscribirse(e, formDataIngresos, setPrediccionAlumnosIngresos)}>
                            <h2 className="text-3xl font-bold text-center my-4">Predicción de Ingresos de Alumnos</h2>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="alumnosCI" className="form-label"><b>Alumnos Inscritos (CI)</b></label>
                                    <input type="number" className="form-control rounded-md" id="alumnosCI" placeholder="Ingrese Num. de alumnos" name="alumnosCI" onChange={handleChangeIngresos} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="TiempoUNO" className="form-label"><b>Año (CI)</b></label>
                                    <input type="number" className="form-control rounded-md" id="TiempoUNO" placeholder="Ingrese el tiempo en años" name="TiempoUNO" onChange={handleChangeIngresos} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="alumnosK" className="form-label"><b>Alumnos Inscritos (K)</b></label>
                                    <input type="number" className="form-control rounded-md" id="alumnosK" placeholder="Ingrese Num. de alumnos" name="alumnosK" value={formDataIngresos.ventaTiempo2} onChange={handleChangeIngresos} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="TiempoDOS" className="form-label"><b>Año (K)</b></label>
                                    <input type="number" className="form-control rounded-md" id="TiempoDOS" placeholder="Ingrese el tiempo en años" name="TiempoDOS" value={formDataIngresos.segundaVenta} onChange={handleChangeIngresos} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="TiempoP1" className="form-label"><b>Predecir alumnos a inscribirse (?)</b></label>
                                    <button type="submit" className="btn btn-lg btn-primary btn-block" style={{ backgroundColor: 'var(--first-color)', borderColor: 'transparent', color: '#fff', padding: '8px 74px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold' }}>
                                        Predecir ingresos
                                    </button>
                                    {prediccionAlumnosIngresos !== null && (
                                        <div className="mt-3">
                                            <p>Predicción de ingresos de alumnos: {prediccionAlumnosIngresos}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="TiempoP1" className="form-label"><b>Tiempo en años (P1)</b></label>
                                    <input type="number" className="form-control rounded-md" placeholder="Ingrese Num. de alumnos" id="TiempoP1" name="TiempoP1" onChange={handleChangeIngresos} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-1/2 p-4">
                    <div className="login-card p-4" style={{ width: '100%', maxWidth: '100%', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', backgroundColor: '#fff', marginBottom: '20px' }}>
                        
                        <form className="container" onSubmit={(e) => PredicionAlumnosAInscribirse(e, formDataIngresos, setPrediccionAlumnosIngresos)}>
                            <h2 className="text-3xl font-bold text-center my-4">Predicción de Ingresos de Alumnos</h2>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="alumnosCI" className="form-label"><b>Alumnos Inscritos (CI)</b></label>
                                    <input type="number" className="form-control rounded-md" id="alumnosCI" placeholder="Ingrese Num. de alumnos" name="alumnosCI" onChange={handleChangeIngresos} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="TiempoUNO" className="form-label"><b>Año (CI)</b></label>
                                    <input type="number" className="form-control rounded-md" id="TiempoUNO" placeholder="Ingrese el tiempo en años" name="TiempoUNO" onChange={handleChangeIngresos} />
                                </div>
                            </div>
                           
                            <button type="submit" className="btn btn-lg btn-primary btn-block" style={{ backgroundColor: 'var(--first-color)', borderColor: 'transparent', color: '#fff', padding: '8px 74px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold' }}>
                                Predecir ingresos
                            </button>
                        </form>
                     
                        <div className="mt-5">
                            <canvas id="ingresos-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-1/2 p-4">
                    <div className="login-card p-4" style={{ width: '100%', maxWidth: '100%', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', backgroundColor: '#fff', marginBottom: '160%' }}>
                        <div className="container">
                            <h2 className="text-3xl font-bold text-center my-4">Eficiencia Terminal</h2>
                            <button onClick={calcularEficienciaTerminal} className="btn btn-lg btn-primary btn-block" style={{ backgroundColor: 'var(--first-color)', borderColor: 'transparent', color: '#fff', padding: '8px 74px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold' }}>
                                Calcular Eficiencia Terminal
                            </button>
                            {eficienciaTerminal !== null && (
                                <div className="mt-3">
                                    <p>Eficiencia Terminal: {eficienciaTerminal.toFixed(2)}%</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EficienciaTerminl;

