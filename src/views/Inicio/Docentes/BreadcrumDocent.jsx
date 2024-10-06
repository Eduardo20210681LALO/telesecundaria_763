import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined, TeamOutlined, BarChartOutlined, SettingOutlined } from "@ant-design/icons";

function BreadcrumDocent() {
    const location = useLocation();

    // Función para transformar el path en formato legible
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    const BreadCrumbView = () => {
        const { pathname } = location;
        const pathnames = pathname.split("/").filter((item) => item);

        return (
            <div>
                <Breadcrumb>
                    {/* Primer ítem: Inicio */}
                    <Breadcrumb.Item>
                        <Link to="/HomeDocentes">
                            <HomeOutlined />
                            <span> Inicio</span>
                        </Link>
                    </Breadcrumb.Item>

                    {/* Mapeo de las rutas */}
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;

                        // Definir íconos según el nombre de la ruta
                        let icon;
                        if (
                            name === "CapturaCalificacionesAlum" || 
                            name === "VisualizarCapturaCalificaciones" || 
                            name === "VisualizarAlumnosDDocente"
                        ) {
                            icon = <TeamOutlined />;  // Icono para rutas relacionadas con "Alumnos"
                        } else if (
                            name === "EstadisticasGrupalDocent" || 
                            name === "EstadisticasIndivDocent"
                        ) {
                            icon = <BarChartOutlined />;  // Icono para rutas relacionadas con "Estadísticas"
                        } else if (name === "PerfilUD") {
                            icon = <SettingOutlined />;  // Icono para la ruta del perfil de usuario
                        }

                        return isLast ? (
                            <Breadcrumb.Item key={index}>
                                {icon}
                                <span> {capitalize(name)}</span>
                            </Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item key={index}>
                                <Link to={routeTo}>
                                    {icon}
                                    <span> {capitalize(name)}</span>
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
