import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { 
    HomeOutlined, 
    BarChartOutlined, 
    SettingOutlined, 
    TeamOutlined, 
    UserOutlined 
} from "@ant-design/icons";

function BreadcrumDirect() {
    const location = useLocation();

    // Map route names to user-friendly display names
    const routeNameMapping = {
        "HomeDirect": "Inicio",
        "directivo": "Directivo",
        "MejoresPromedios": "Mejores Promedios",
        "EstadisticasGeneral": "Estadísticas Generales",
        "GraficasGrupal": "Gráficas Grupales",
        "EstadisticasIndiv": "Estadísticas Individuales",
        "Usuarios": "Usuarios",
        "TdosUsuarios": "Todos los Usuarios",
        "Alumnos": "Alumnos",
        "TdosAlumnos": "Todos los Alumnos",
        "VisualizarAlumnos": "Visualizar Alumnos",
        "Perfil": "Perfil de Usuario",
        "PerfilUDRT": "Perfil Directivo"
    };

    // Capitalize function as fallback for unmapped routes
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    const BreadCrumbView = () => {
        const { pathname } = location;
        const pathnames = pathname.split("/").filter((item) => item);

        return (
            <div>
                <Breadcrumb>
                    {/* First breadcrumb item: "Inicio" */}
                    <Breadcrumb.Item>
                        <Link to="/directivo/HomeDirect">
                            <HomeOutlined />
                            <span> {routeNameMapping["HomeDirect"]}</span>
                        </Link>
                    </Breadcrumb.Item>

                    {/* Static "Directivo" breadcrumb with an icon */}
                    {pathnames[0] === "directivo" && (
                        <Breadcrumb.Item>
                            <Link to="/directivo/HomeDirect">
                                <UserOutlined />
                                <span> {routeNameMapping["directivo"]}</span>
                            </Link>
                        </Breadcrumb.Item>
                    )}

                    {/* Map through other path segments, ignoring duplicate "directivo" */}
                    {pathnames.map((name, index) => {
                        if (name === "directivo" && index > 0) return null; // Skip additional "Directivo" entries

                        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;

                        // Define icons for known route names
                        let icon;
                        if (
                            name === "MejoresPromedios" || 
                            name === "EstadisticasGeneral" || 
                            name === "GraficasGrupal" || 
                            name === "EstadisticasIndiv"
                        ) {
                            icon = <BarChartOutlined />;
                        } else if (name === "Usuarios" || name === "TdosUsuarios") {
                            icon = <SettingOutlined />;
                        } else if (name === "Alumnos" || name === "TdosAlumnos" || name === "VisualizarAlumnos") {
                            icon = <TeamOutlined />;
                        } else if (name === "Perfil" || name === "PerfilUDRT") {
                            icon = <UserOutlined />;
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

export default BreadcrumDirect;
