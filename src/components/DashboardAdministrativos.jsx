import React, { useState } from 'react';
import { Sidebar } from "flowbite-react";
import { HiUser, HiAdjustments, HiChartBar, HiHome, HiArrowRight, HiMenu } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'react-icons';

function DashboardAdministrativos() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleOptionClick = () => {
        BorrarCookies();
        navigate('/Home');
    };

    const BorrarCookies = () => {
        Cookies.remove('token');
    };

    return (
        <div>
            <div>
                <HiMenu className="hamburger-icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <Sidebar aria-label="Sidebar with multi-level dropdown example"  className={`bg-white shadow-lg ${isSidebarOpen ? 'mr-2 mt-24' : 'hidden'} fixed inset-y-0 left-0 z-10 flex-shrink-0 w-64 text-white sidebar`}>
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>

                            <Sidebar.Item href="#" icon={HiHome}>
                                INICIO
                            </Sidebar.Item>

                            <Sidebar.Collapse icon={HiAdjustments} label="SISTEMA">
                                <Sidebar.Item href="#">
                                        <Link to="/Periodos">Periodos</Link>
                                    </Sidebar.Item>
                                    <Sidebar.Item href="#">
                                        <Link to="/CrearGradoYgrupo">Grados y Grupos</Link>
                                    </Sidebar.Item>
                                  
                                    <Sidebar.Item href="#">
                                        <Link to="/Materias">Materias</Link>
                                    </Sidebar.Item>
                            </Sidebar.Collapse>



                            <Sidebar.Collapse icon={HiUser} label="ALUMNOS">
                                <Sidebar.Item href="#">
                                    <Link to="/InsertarAlumnos">Ingresar Alumnos</Link>
                                </Sidebar.Item>

                                <Sidebar.Item href="#">
                                    <Link to="/InsertarAlumnos">Ingresar Alumnos</Link>
                                </Sidebar.Item>

                                <Sidebar.Item href="#">
                                    <Link to="/InsertarAlumnos">Ingresar Alumnos</Link>
                                </Sidebar.Item>
                            </Sidebar.Collapse>

                            <Sidebar.Collapse icon={HiUser} label="Docentes">
                                <Sidebar.Item href="#">
                                    <Link to="/">Crear Docentes</Link>
                                </Sidebar.Item>
                                <Sidebar.Item href="#">
                                    <Link to="/">Docentes</Link>
                                </Sidebar.Item>
                            </Sidebar.Collapse>



                            <Sidebar.Collapse icon={HiChartBar} label="ESTADISTICAS">
                                <Sidebar.Item href="#">
                                    <Link to="/">Mejores Promedios</Link>
                                </Sidebar.Item>
                                <Sidebar.Item href="#">
                                    <Link to="/">Estadisticas General</Link>
                                </Sidebar.Item>
                                <Sidebar.Item href="#">
                                    <Link to="/">Estadisticas Grupal</Link>
                                </Sidebar.Item>
                                <Sidebar.Item href="#">
                                    <Link to="/">Estadisticas Individual</Link>
                                </Sidebar.Item>
                            </Sidebar.Collapse>

                        

                            <Sidebar.Item href="#" icon={HiArrowRight}>
                                <button onClick={handleOptionClick}>CERRAR SESIÓN</button>
                            </Sidebar.Item>

                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        </div>
    )
}

export default DashboardAdministrativos