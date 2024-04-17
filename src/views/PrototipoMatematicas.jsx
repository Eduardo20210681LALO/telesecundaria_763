import React, { useState } from 'react';
import Nav from '../components/Nav'
import { message } from 'antd'

function PrototipoMatematicas() {
    const [datos, setDatos] = useState({
        C1: '',
        tiempoC1: '',
        K: '',
        tiempoK: '',
        P1: '',
        tiempoP1: '',
        tiempoP2: ''
      });
    
      const [resultadoPoblacion, setResultadoPoblacion] = useState(null);
      const [resultadoEficiencia, setResultadoEficiencia] = useState(null);
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDatos({ ...datos, [name]: value });
      };
    
      const handlePoblacionSubmit = (event) => {
        event.preventDefault();
    
        const { C1, tiempoC1, K, tiempoK, P1, tiempoP1, tiempoP2 } = datos;
    
        const C1Value = parseFloat(C1);
        const tiempoC1Value = parseFloat(tiempoC1);
        const KValue = parseFloat(K);
        const tiempoKValue = parseFloat(tiempoK);
        const P1Value = parseFloat(P1);
        const tiempoP1Value = parseFloat(tiempoP1);
        const tiempoP2Value = parseFloat(tiempoP2);
    
        if (!isNaN(C1Value) && !isNaN(tiempoC1Value) && !isNaN(KValue) && !isNaN(tiempoKValue) && !isNaN(P1Value) && !isNaN(tiempoP1Value) && !isNaN(tiempoP2Value)) {
            const k = Math.log(KValue / C1Value) / tiempoKValue;
            const P2 = C1Value * Math.exp(k * tiempoP2Value);
            setResultadoPoblacion({ poblacion: P2, tiempo: tiempoP2Value });
        } else {
          alert('Por favor, ingrese números válidos en los campos.');
        }
      };
    
      const handleEficienciaTerminalSubmit = (event) => {
        event.preventDefault();
    
        const { C1, K } = datos;
    
        const C1Value = parseFloat(C1);
        const KValue = parseFloat(K);
    
        if (!isNaN(C1Value) && !isNaN(KValue)) {
          const eficiencia = (KValue / C1Value) * 100;
          setResultadoEficiencia({ eficienciaTerminal: eficiencia });
        } else {
          alert('Por favor, ingrese números válidos en los campos.');
        }
      };

    return (
        <div>
            <Nav/>
            <div>
                <div className="w-full h-screen flex justify-center items-center" style={{ marginTop: '3%' }}>
                    <div className="w-1/2 p-4">
                        <div className="login-card p-4" style={{ width: '100%', maxWidth: '100%', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', backgroundColor: '#fff', marginBottom: '20px' }}>
                            <form className="container" onSubmit={handlePoblacionSubmit}>
                                <h2 className="text-3xl font-bold text-center my-4">Prototipo Matematicas para Ingenieria II</h2>
                                <h4 className="text-1xl font-bold text-center my-4">Eficiencia terminal</h4>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="alumnosCI" className="form-label"><b>Alumnos nuevos(CI)</b></label>
                                        <input type="number" className="form-control rounded-md" name="C1" placeholder="Ingrese la población de nuevos alumnos (C1)" value={datos.C1} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="TiempoUNO" className="form-label"><b>Tiempo en años (CI)</b></label>
                                        <input type="number" className="form-control rounded-md" name="tiempoC1" placeholder="Ingrese el tiempo correspondiente a C1" value={datos.tiempoC1} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="alumnosK" className="form-label"><b>Alumnos que lograron terminar (K)</b></label>
                                        <input type="number" className="form-control rounded-md" name="K" placeholder="Ingrese la población de alumnos que lograron terminar (K)" value={datos.K} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="TiempoDOS" className="form-label"><b>Tiempo en años transcurridos (K)</b></label>
                                        <input type="number" className="form-control rounded-md" name="tiempoK" placeholder="Ingrese el tiempo correspondiente a K" value={datos.tiempoK} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="alumnosK" className="form-label"><b>Alumnos de nuevo ingreso (P1)</b></label>
                                        <input type="number" className="form-control rounded-md" name="P1" placeholder="Ingrese la población de alumnos que lograron terminar y son nuevos (P1)" value={datos.P1} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="TiempoDOS" className="form-label"><b>Tiempo en años (P1)</b></label>
                                        <input type="number" className="form-control rounded-md" name="tiempoP1" placeholder="Ingrese el tiempo correspondiente a P1" value={datos.tiempoP1} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="TiempoP1" className="form-label"><b>Eficiencia terminal (?)</b></label>
                                        <button type="submit" className="btn btn-lg btn-primary btn-block"
                                            style={{ backgroundColor: 'var(--first-color)', borderColor: 'transparent', color: '#fff', padding: '8px 85px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold' }}
                                            onMouseOver={(event) => { event.target.style.backgroundColor = 'black'; }}
                                            onMouseOut={(event) => { event.target.style.backgroundColor = 'var(--first-color)'; }}
                                        >
                                            Calcular Tendencia
                                        </button>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="TiempoP1" className="form-label"><b>Tiempo en años (P2)</b></label>
                                        <input type="number" className="form-control rounded-md" name="tiempoP2" placeholder="Ingrese el tiempo correspondiente a P2" value={datos.tiempoP2} onChange={handleInputChange} />
                                    </div>
                                </div>

                            </form>
                            {resultadoPoblacion !== null && (
                                <div className="result">
                                    <p>La tendencia estimada de posibles alumnos que podrían terminar es: {resultadoPoblacion.poblacion.toFixed(2)}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <div className="w-full h-screen flex justify-center items-center" style={{ marginTop: '-10%' }}>
                        <div className="w-1/2 p-4">
                            <div className="login-card p-4" style={{ width: '100%', maxWidth: '100%', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', backgroundColor: '#fff', marginBottom: '20px' }}>
                                <form class="container" onSubmit={handleEficienciaTerminalSubmit}>
                                    <h2 className="text-3xl font-bold text-center my-4">Calculadora de Eficiencia Terminal</h2>
                                    <h4 className="text-1xl font-bold text-center my-4">Eficiencia terminal</h4>
                                    
                        
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="alumnosK" class="form-label"><b>Total de alumnos que ingresaron</b></label>
                                            <input type="text" class="form-control rounded-md"name="C1" placeholder="Ingrese el total de alumnos que ingresaron" onChange={handleInputChange} />
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label for="TiempoDOS" class="form-label"><b>Total de alumnos que lograron terminar</b></label>
                                            <input type="text" class="form-control rounded-md" name="K" placeholder="Ingrese el total de alumnos que lograron terminar" onChange={handleInputChange} />
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                        <label for="TiempoP1" class="form-label"><b>Eficiencia terminal (?)</b></label>
                                            <button type="submit" className="btn btn-lg btn-primary btn-block"
                                                style={{ backgroundColor: 'var(--first-color)', borderColor: 'transparent', color: '#fff', padding: '8px 85px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold' }}
                                                onMouseOver={(event) => { event.target.style.backgroundColor = 'black'; }}
                                                onMouseOut={(event) => { event.target.style.backgroundColor = 'var(--first-color)'; }}
                                                >
                                                Calcular Eficiencia Terminal
                                            </button>
                                        </div>
                                    </div>
                                    
                                </form>
                                {resultadoEficiencia !== null && (
                                    <div className="result">
                                        <p>La eficiencia terminal calculada es: {resultadoEficiencia.eficienciaTerminal.toFixed(2)}%</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
            </div>

        </div>
    )
}

export default PrototipoMatematicas