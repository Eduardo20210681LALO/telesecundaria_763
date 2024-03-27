import React, { useState } from 'react';
import Nav from '../components/Nav'
import { message } from 'antd'

function PrototipoMatematicas() {
    const [formData, setFormData] = useState({ alumnosCI: 0, TiempoUNO: 0, TiempoDOS: 0, alumnosK: 0, TiempoP1: 0 });
    const [diferentialTasks, setDiferentialTasks] = useState(0)
    
    const PredicionAlumnosAInscribirse = (e) => {
        e.preventDefault()
        let c, k, p
        c = Math.exp(formData.TiempoUNO) * formData.alumnosCI
        k = Math.log(formData.alumnosK / ((c != 0) ? c : 1)) / formData.TiempoDOS
        p = ((c != 0) ? c : 1) * Math.exp(k * formData.TiempoP1)
        const prediccion = Math.trunc(p)
        setDiferentialTasks(prediccion)
        if(p >= 1){
            message.success(`Prediccion de alumnos a inscribirse: ${prediccion}`)
        }else{
            message.warning(`Predicción inacertada, verifica por favor...`)
        }
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div>
            <Nav/>
            <div className=" w-full h-screen flex justify-center items-center">
                <div className="w-1/2 p-4">
                    <div className="login-card p-4" style={{ width: '100%', maxWidth: '100%', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', backgroundColor: '#fff', marginBottom: '20px' }}>
                        <form class="container" onSubmit={PredicionAlumnosAInscribirse}>
                        <h2 className="text-3xl font-bold text-center my-4">Prototipo Matematicas para Ingenieria II</h2>
                        <h4 className="text-1xl font-bold text-center my-4">Predicción de alumnos posibles a inscribirse</h4>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="alumnosCI" class="form-label"><b>Alumnos Inscritos (CI)</b></label>
                                <input type="number" class="form-control rounded-md" id="alumnosCI" placeholder='Ingrese Num. de alumnos' name="alumnosCI" onChange={handleChange} />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="TiempoUNO" class="form-label"><b>Tiempo en años (CI)</b></label>
                                <input type="number" class="form-control rounded-md" id="TiempoUNO" placeholder='Ingrese el tiempo en años' name="TiempoUNO" onChange={handleChange} />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="alumnosK" class="form-label"><b>Alumnos Inscritos (K)</b></label>
                                <input type="number" class="form-control rounded-md" id="alumnosK" placeholder='Ingrese Num. de alumnos' name="alumnosK" value={formData.ventaTiempo2} onChange={handleChange} />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="TiempoDOS" class="form-label"><b>Tiempo en años (K)</b></label>
                                <input type="number" class="form-control rounded-md" id="TiempoDOS" placeholder='Ingrese el tiempo en años' name="TiempoDOS" value={formData.segundaVenta} onChange={handleChange} />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                            <label for="TiempoP1" class="form-label"><b>Predecir alumnos a inscribirse (?)</b></label>
                                <button type="submit" className="btn btn-lg btn-primary btn-block"
                                    style={{ backgroundColor: 'var(--first-color)', borderColor: 'transparent', color: '#fff', padding: '8px 74px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold' }}
                                    onMouseOver={(event) => { event.target.style.backgroundColor = 'black'; }}
                                    onMouseOut={(event) => { event.target.style.backgroundColor = 'var(--first-color)'; }}
                                    >
                                    Predecir alumnos
                                </button>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="TiempoP1" class="form-label"><b>Tiempo en años (P1)</b></label>
                                <input type="number" class="form-control rounded-md" placeholder='Ingrese Num. de alumnos' id="TiempoP1" name="TiempoP1" onChange={handleChange} />
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrototipoMatematicas