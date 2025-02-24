import React, { useState } from 'react';
import { Sidebar } from "flowbite-react";
import { HiUser, HiAdjustments, HiChartBar, HiHome, HiArrowRight, HiMenu } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'react-icons';

function DashboardDocentes() {
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
                                Docentes
                            </Sidebar.Item>

                            <Sidebar.Collapse icon={HiUser} label="Alumnos">
                                <Sidebar.Item href="#">
                                        <Link to="/CapturaCalificaciones">Capturar Calificaciones</Link>
                                    </Sidebar.Item>
                                    <Sidebar.Item href="#">
                                        <Link to="/ConsultaCalificaciones">Consulta Calificaciones</Link>
                                    </Sidebar.Item>
                            </Sidebar.Collapse>

                            <Sidebar.Collapse icon={HiChartBar} label="Estadisticas">
                                <Sidebar.Item href="#">Estadisticas Individual</Sidebar.Item>
                                <Sidebar.Item href="#">Estadisticas Grupal</Sidebar.Item>
                            </Sidebar.Collapse>

                            <Sidebar.Item href="#" icon={HiAdjustments}>
                                Configuracion
                            </Sidebar.Item>

                            <Sidebar.Item href="#" icon={HiArrowRight}>
                                <button onClick={handleOptionClick}>Cerrar Sesión</button>
                            </Sidebar.Item>

                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        </div>
    )
}

export default DashboardDocentes;
