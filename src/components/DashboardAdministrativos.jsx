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
                <Sidebar
                    aria-label="Sidebar with multi-level dropdown example"
                    className={`bg-white shadow-lg ${isSidebarOpen ? 'mr-2 mt-24' : 'hidden'} fixed inset-y-0 left-0 z-10 flex-shrink-0 w-64 text-white sidebar`}
                >
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>

                            {/* INICIO */}
                            <Sidebar.Item href="#" icon={HiHome}>
                                INICIO
                            </Sidebar.Item>

                            {/* SISTEMA */}
                            <Sidebar.Collapse icon={HiAdjustments} label="SISTEMA">
                                <Sidebar.Item>
                                    <Link to="/Periodos">Periodos</Link>
                                </Sidebar.Item>
                                <Sidebar.Item>
                                    <Link to="/CrearGradoYgrupo">Grados y Grupos</Link>
                                </Sidebar.Item>
                                <Sidebar.Item>
                                    <Link to="/Materias">Materias</Link>
                                </Sidebar.Item>
                                <Sidebar.Item>
                                    <Link to="/">Alumnos X Grado X Grupo</Link>
                                </Sidebar.Item>
                            </Sidebar.Collapse>

                            {/* ALUMNOS */}
                            <Sidebar.Collapse icon={HiUser} label="ALUMNOS">
                                <Sidebar.Item>
                                    <Link to="/InsertarAlumnos">Ingresar Alumnos</Link>
                                </Sidebar.Item>
                                <Sidebar.Item>
                                    <Link to="/InsertarAlumnos">Ingresar Alumnos</Link>
                                </Sidebar.Item>
                                <Sidebar.Item>
                                    <Link to="/InsertarAlumnos">Ingresar Alumnos</Link>
                                </Sidebar.Item>
                            </Sidebar.Collapse>

                            {/* DOCENTES */}
                            <Sidebar.Collapse icon={HiUser} label="DOCENTES">
                                <Sidebar.Item>
                                    <Link to="/">Crear Docentes</Link>
                                </Sidebar.Item>
                                <Sidebar.Item>
                                    <Link to="/">Administrar Docentes</Link>
                                </Sidebar.Item>
                            </Sidebar.Collapse>

                            {/* ESTADÍSTICAS */}
                            <Sidebar.Collapse icon={HiChartBar} label="ESTADISTICAS">
                                <Sidebar.Item>
                                    <Link to="/">Mejores Promedios</Link>
                                </Sidebar.Item>
                                <Sidebar.Item>
                                    <Link to="/">Estadísticas General</Link>
                                </Sidebar.Item>
                                <Sidebar.Item>
                                    <Link to="/">Estadísticas Grupal</Link>
                                </Sidebar.Item>
                                <Sidebar.Item>
                                    <Link to="/">Estadísticas Individual</Link>
                                </Sidebar.Item>
                            </Sidebar.Collapse>

                            {/* CERRAR SESIÓN */}
                            <Sidebar.Item href="#" icon={HiArrowRight}>
                                <button onClick={handleOptionClick}>CERRAR SESIÓN</button>
                            </Sidebar.Item>

                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        </div>
    );
}

export default DashboardAdministrativos;
