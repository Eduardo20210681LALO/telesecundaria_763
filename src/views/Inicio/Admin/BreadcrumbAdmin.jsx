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
} from "@ant-design/icons"; 

function BreadcrumbAdmin() {
  const location = useLocation();

  // Mapping route names to readable breadcrumb names
  const routeNameMapping = {
    "HomeAdmin": "Inicio",
    "administrativo": "Administrativo",
    "Periodos": "Periodos y Visualización",
    "CrearGradoYgrupo": "Grados y Grupos",
    "Materias": "Materias",
    "CrearDocentes": "Crear Docentes",
    "IngresarAlumnos": "Ingresar Alumnos",
    "VisualizaciónAlumnosInscritos": "Alumnos Inscritos",
    "TodosAlum": "Todos los Alumnos",
    "ActualizarDatosAlumnos": "Actualizar Alumnos",
    "ReinscribirAlumXAdmin": "Reinscribir Alumnos",
    "AlumnosEgresados": "Alumnos Egresados",
    "alumnos-baja": "Alumnos Baja",
    "MejoresPromediosXAdmin": "Mejores Promedios",
    "EstadisticasGeneralXAdmin": "Estadísticas Generales",
    "EstadisticasGrupalXAdmin": "Estadísticas Grupales",
    "EstadisticasIndividualXAdmin": "Estadísticas Individuales",
    "Usuarios": "Usuarios",
    "PerfilUADM": "Perfil Usuario"
  };

  // Function to capitalize breadcrumb names if not in mapping
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const BreadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);

    return (
      <div>
        <Breadcrumb>
          {/* First breadcrumb item: "Inicio" */}
          <Breadcrumb.Item>
            <Link to="/administrativo/HomeAdmin">
              <HomeOutlined />
              <span> {routeNameMapping["HomeAdmin"]}</span>
            </Link>
          </Breadcrumb.Item>

          {/* Only add "Administrativo" once with an icon */}
          {pathnames[0] === "administrativo" && (
            <Breadcrumb.Item>
              <Link to="/administrativo/HomeAdmin">
                <UserOutlined />
                <span> {routeNameMapping["administrativo"]}</span>
              </Link>
            </Breadcrumb.Item>
          )}

          {/* Map through the rest of the pathnames, skipping duplicate "Administrativo" */}
          {pathnames.map((name, index) => {
            if (name === "administrativo" && index > 0) return null; // Skip duplicate "Administrativo"

            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            // Determine icon based on the route name
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
              icon = <IdcardOutlined />;
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

export default BreadcrumbAdmin;
