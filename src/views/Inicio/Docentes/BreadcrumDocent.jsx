import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined, TeamOutlined, BarChartOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";

function BreadcrumDocent() {
    const location = useLocation();

    // Mapping of route names to display-friendly names
    const routeNameMapping = {
        "HomeDocentes": "Inicio",
        "docente": "Docente",
        "CapturaCalificacionesAlum": "Captura de Calificaciones",
        "VisualizarCapturaCalificaciones": "Visualizar Calificaciones",
        "VisualizarAlumnosDDocente": "Visualizar Alumnos",
        "EstadisticasGrupalDocent": "Estadísticas Grupales",
        "EstadisticasIndivDocent": "Estadísticas Individuales",
        "PerfilUD": "Perfil de Usuario"
    };

    // Fallback capitalization function
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    const BreadCrumbView = () => {
        const { pathname } = location;
        const pathnames = pathname.split("/").filter((item) => item);

        return (
            <div>
                <Breadcrumb>
                    {/* First breadcrumb item: "Inicio" */}
                    <Breadcrumb.Item>
                        <Link to="/docente/HomeDocentes">
                            <HomeOutlined />
                            <span> {routeNameMapping["HomeDocentes"]}</span>
                        </Link>
                    </Breadcrumb.Item>

                    {/* Static "Docente" breadcrumb with an icon */}
                    {pathnames[0] === "docente" && (
                        <Breadcrumb.Item>
                            <Link to="/docente/HomeDocentes">
                                <UserOutlined />
                                <span> {routeNameMapping["docente"]}</span>
                            </Link>
                        </Breadcrumb.Item>
                    )}

                    {/* Map through other path segments, skipping duplicate "docente" */}
                    {pathnames.map((name, index) => {
                        if (name === "docente" && index > 0) return null; // Skip additional "Docente" entries

                        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;

                        // Define icons for known route names
                        let icon;
                        if (
                            name === "CapturaCalificacionesAlum" || 
                            name === "VisualizarCapturaCalificaciones" || 
                            name === "VisualizarAlumnosDDocente"
                        ) {
                            icon = <TeamOutlined />;  // Icon for "Alumnos" related routes
                        } else if (
                            name === "EstadisticasGrupalDocent" || 
                            name === "EstadisticasIndivDocent"
                        ) {
                            icon = <BarChartOutlined />;  // Icon for "Estadísticas" related routes
                        } else if (name === "PerfilUD") {
                            icon = <SettingOutlined />;  // Icon for "Perfil" route
                        }

                        const displayName = routeNameMapping[name] || capitalize(name);

                        return isLast ? (
                            <Breadcrumb.Item key={index}>
                                {icon}
                                <span> {displayName}</span>
                            </Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item key={index}>
                                <Link to={routeTo}>
                                    {icon}
                                    <span> {displayName}</span>
                                </Link>
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
            </div>
        );
    };

    return <>{BreadCrumbView()}</>;
}

export default BreadcrumDocent;
