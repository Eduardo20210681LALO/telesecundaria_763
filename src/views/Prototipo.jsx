import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import { message } from 'antd';

function Prototipo() {
    const [formData, setFormData] = useState({ alumnosCI: 0, TiempoUNO: 0, TiempoDOS: 0, alumnosK: 0, TiempoP1: 0 });
    const [diferentialTasks, setDiferentialTasks] = useState(0);
    const [inputs, setInputs] = useState({ alumnosIngresaron: '', alumnosTerminaron: '' });
    const [resultadoEficiencia, setResultadoEficiencia] = useState(null);
    const [periodos, setPeriodos] = useState([]);

    useEffect(() => {
        const fetchPeriodos = async () => {
            try {
                const response = await fetch('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/traerPeriodos.php');  //                      http://localhost/TeleSecundaria763/traerPeriodos.php
                if (!response.ok) {
                    throw new Error('Error al obtener los periodos');
                }
                const datoss = await response.json();
                setPeriodos(datoss);
            } catch (error) {
                console.error('Error al obtener los periodos:', error);
            }
        };
        fetchPeriodos();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    };

    const handleEficienciaTerminalSubmit = (e) => {
        e.preventDefault();
        const { alumnosIngresaron, alumnosTerminaron } = inputs;
        const resta = parseInt(alumnosIngresaron) - parseInt(alumnosTerminaron);
        const porcentajeBajas = (resta / parseInt(alumnosIngresaron)) * 100;
        const numBajas = parseInt(alumnosIngresaron) - parseInt(alumnosTerminaron);
        setResultadoEficiencia({ eficienciaTerminal: porcentajeBajas });
        setInputs(prevInputs => ({ ...prevInputs, numBajas: numBajas }));
    };

    const PredicionAlumnosAInscribirse = (e) => {
        e.preventDefault();
        let c, k, p;
        c = Math.exp(formData.TiempoUNO) * formData.alumnosCI;
        k = Math.log(formData.alumnosK / ((c != 0) ? c : 1)) / formData.TiempoDOS;
        p = ((c != 0) ? c : 1) * Math.exp(k * formData.TiempoP1);
        const prediccion = Math.trunc(p);
        setDiferentialTasks(prediccion);
        if (p >= 1) {
            message.success(`Prediccion de alumnos a inscribirse: ${prediccion}`);
        } else {
            message.warning(`Predicción inacertada, verifica por favor...`);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <Nav/>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-1/2 p-4">
                    <div className="login-card p-4" style={{ width: '100%', maxWidth: '100%', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', backgroundColor: '#fff', marginBottom: '20px' }}>
                        <form className="container" onSubmit={PredicionAlumnosAInscribirse}>
                            <h2 className="text-3xl font-bold text-center my-4">Prototipo Matematicas para Ingenieria II</h2>
                            <h4 className="text-1xl font-bold text-center my-4"></h4>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="alumnosCI" className="form-label"><b>Nuevos Alumnos(CI)</b></label>
                                    <input type="number" className="form-control rounded-md" id="alumnosCI" placeholder='Ingrese Num. de alumnos' name="alumnosCI" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="TiempoUNO" className="form-label"><b>Periodo (CI)</b></label>
                                    <select className="form-control rounded-md" id="TiempoUNO" name="TiempoUNO" onChange={handleChange}>
                                        <option value="">Seleccione un periodo</option>
                                        {periodos.map((periodo, index) => (
                                            <option key={index} value={periodo.intClvPeriodo}>{periodo.vchPeriodo}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="alumnosK" className="form-label"><b>Nuevos Alumnos (K)</b></label>
                                    <input type="number" className="form-control rounded-md" id="alumnosK" placeholder='Ingrese Num. de alumnos' name="alumnosK" value={formData.ventaTiempo2} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="TiempoDOS" className="form-label"><b>Periodo (K)</b></label>
                                    <select className="form-control rounded-md" id="TiempoDOS" name="TiempoDOS" value={formData.segundaVenta} onChange={handleChange}>
                                        <option value="">Seleccione un periodo</option>
                                        {periodos.map((periodo, index) => (
                                            <option key={index} value={periodo.intClvPeriodo}>{periodo.vchPeriodo}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="TiempoP1" className="form-label"><b>------(?)</b></label>
                                    <button type="submit" className="btn btn-lg btn-primary btn-block" style={{ backgroundColor: 'var(--first-color)', borderColor: 'transparent', color: '#fff', padding: '8px 74px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold' }} onMouseOver={(event) => { event.target.style.backgroundColor = 'black'; }} onMouseOut={(event) => { event.target.style.backgroundColor = 'var(--first-color)'; }}>
                                        Calcular Tendencia
                                    </button>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="TiempoP1" className="form-label"><b>Periodo (P1)</b></label>
                                    <select className="form-control rounded-md" id="TiempoP1" name="TiempoP1" onChange={handleChange}>
                                        <option value="">Seleccione un periodo</option>
                                        {periodos.map((periodo, index) => (
                                            <option key={index} value={periodo.intClvPeriodo}>{periodo.vchPeriodo}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="w-full h-screen flex justify-center items-center" style={{ marginTop: '-10%' }}>
                <div className="w-1/2 p-4">
                    <div className="login-card p-4" style={{ width: '100%', maxWidth: '100%', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', backgroundColor: '#fff', marginBottom: '20px' }}>
                        <form className="container" onSubmit={handleEficienciaTerminalSubmit}>
                            <h2 className="text-3xl font-bold text-center my-4">Eficiencia Terminal</h2>
                            <h4 className="text-1xl font-bold text-center my-4">Eficiencia terminal</h4>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="alumnosIngresaron" className="form-label"><b>Total de alumnos que ingresaron</b></label>
                                    <input type="text" className="form-control rounded-md" name="alumnosIngresaron" placeholder="Ingrese el total de alumnos que ingresaron" onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="alumnosTerminaron" className="form-label"><b>Total de alumnos que lograron terminar</b></label>
                                    <input type="text" className="form-control rounded-md" name="alumnosTerminaron" placeholder="Ingrese el total de alumnos que lograron terminar" onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-md-8 mb-3 text-center">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="numBajas" className="form-label"><b>Alumnos de baja</b></label>
                                            <input type="text" className="form-control rounded-md text-center mb-3" id="numBajas" value={inputs.numBajas !== null ? inputs.numBajas : ""} readOnly style={{ width: '100%' }} />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="eficienciaTerminal" className="form-label"><b>Eficiencia terminal</b></label>
                                            <input type="text" className="form-control rounded-md text-center mb-3" id="eficienciaTerminal" value={resultadoEficiencia !== null ? resultadoEficiencia.eficienciaTerminal.toFixed(2) + "%" : ""} readOnly style={{ width: '100%' }} />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg btn-block" style={{ borderRadius: '10px', fontSize: '16px', fontWeight: 'bold' }}>
                                        Eficiencia Terminal
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Prototipo;
