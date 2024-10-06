import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined, BarChartOutlined, SettingOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";

function BreadcrumDirect() {
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
                        <Link to="/HomeDirect">
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
                        if (name === "MejoresPromedios" || name === "EstadisticasGeneral" || name === "GraficasGrupal" || name === "EstadisticasIndiv") {
                            icon = <BarChartOutlined />;
                        } else if (name === "Usuarios" || name === "TdosUsuarios") {
                            icon = <SettingOutlined />;
                        } else if (name === "Alumnos" || name === "TdosAlumnos" || name === "VisualizarAlumnos") {
                            icon = <TeamOutlined />;
                        } else if (name === "Perfil" || name === "PerfilUDRT") {
                            icon = <UserOutlined />;
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

export default BreadcrumDirect;
