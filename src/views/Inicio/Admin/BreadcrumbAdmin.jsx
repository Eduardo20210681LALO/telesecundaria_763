import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import {
  HomeOutlined,
  FolderOutlined,
  UserOutlined,
  TeamOutlined,
  BarChartOutlined,
  SettingOutlined,
  IdcardOutlined,
} from "@ant-design/icons"; // Añadir IdcardOutlined para "Mi Perfil"

function BreadcrumbAdmin() {
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
            <Link to="/HomeAdmin">
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
              name === "Periodos" ||
              name === "CrearGradoYgrupo" ||
              name === "Materias"
            ) {
              icon = <FolderOutlined />;
            } else if (name === "CrearDocentes") {
              icon = <UserOutlined />;
            } else if (
              name === "IngresarAlumnos" ||
              name === "VisualizaciónAlumnosInscritos" ||
              name === "TodosAlum" ||
              name === "ActualizarDatosAlumnos" ||
              name === "ReinscribirAlumXAdmin" ||
              name === "AlumnosEgresados" ||
              name === "alumnos-baja"
            ) {
              icon = <TeamOutlined />;
            } else if (
              name === "MejoresPromediosXAdmin" ||
              name === "EstadisticasGeneralXAdmin" ||
              name === "EstadisticasGrupalXAdmin" ||
              name === "EstadisticasIndividualXAdmin"
            ) {
              icon = <BarChartOutlined />;
            } else if (name === "Usuarios") {
              icon = <SettingOutlined />;
            } else if (name === "PerfilUADM") {
              // Nueva sección para "Mi Perfil"
              icon = <IdcardOutlined />;
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

export default BreadcrumbAdmin;
