import { createBrowserRouter } from "react-router-dom";
import { EnviarMensaje } from "../views/RecuperacionContraseñas/EnviarMensaje";
import React from 'react'
import Home from "../views/Home";
import Login from "../views/Login";
import NotFound from "../views/NotFound";
import Layout from "./Layout";
import ProtectedRoute from "../views/ProtectedRoute";
import Registro from "../views/Registro";//**** */
import TerminosCondiciones from "../views/TerminCondiCookies/TerminosCondiciones";
import TerminosCookies from "../views/TerminCondiCookies/TerminosCookies";
import QuienesSomos from "../views/TerminCondiCookies/QuienesSomos";
import Nav2 from "../components/Nav2";//**** */
import ActualizaciónDeContraseña from "../views/RecuperacionContraseñas/ActualizaciónDeContraseña";
import EnviarCorreo from "../views/RecuperacionContraseñas/EnviarCorreo";
<<<<<<< HEAD
import EnviarCorreoTelefono from "../views/RecuperacionContraseñas/EnviarCorreoTelefono";
import NotServe from "../views/NotServe";
import CrearGradoYgrupo from "../views/Inicio/Admin/Configuracion/CrearGradoYgrupo";
import Periodos from "../views/Inicio/Admin/Configuracion/Periodos";
import DashboardDocentes from "../components/DashboardDocentes";
import DashboardAdministrativos from "../components/DashboardAdministrativos";
import NavDocentes from "../components/NavDocentes";
import NavAdministrativos from "../components/NavAdministrativos";
import Materias from "../views/Inicio/Admin/Configuracion/Materias";
import HomeAdmin from "../views/Inicio/HomeAdmin";
import SIDEBARADMIN from "../components/SIDEBARADMIN";
import OtorgarGradoXGrupoDocente from "../views/Inicio/Admin/Docentes/OtorgarGradoXGrupoDocente";
import Usuarios from "../views/Inicio/Admin/Configuracion/Usuarios";
import InfoEscuela from "../views/Inicio/Admin/Configuracion/InfoEscuela";
import IngresarAlumnos from "../views/Inicio/Admin/Alumnos/IngresarAlumnos";
import VisualizaciónAlumnosInscritos from "../views/Inicio/Admin/Alumnos/VisualizaciónAlumnosInscritos";
import TodosAlum from "../views/Inicio/Admin/Alumnos/TodosAlum";
import HomeDirect from "../views/Inicio/HomeDirect";
import HomeDocentes from "../views/Inicio/HomeDocentes";
import SIDEBARDOCENT from "../components/SIDEBARDOCENT";
import SIDEBARDIRECT from "../components/SIDEBARDIRECT";
import CapturaCalificacionesAlum from "../views/Inicio/Docentes/CapturaCalificacionesAlum";
import Clasificacion from "../views/Inicio/Admin/Configuracion/Clasificacion";
import VisualizarCapturaCalificaciones from "../views/Inicio/Docentes/VisualizarCapturaCalificaciones";
import GraficasGrupal from "../views/Inicio/Directivos/GraficasGrupal";
import EstadisticasGeneral from "../views/Inicio/Directivos/EstadisticasGeneral";
import VisualizarAlumnosDDocente from "../views/Inicio/Docentes/VisualizarAlumnosDDocente";
import RolesYPrivilegios from "../views/Inicio/Admin/Configuracion/RolesYPrivilegios";
import MejoresPromedios from "../views/Inicio/Directivos/MejoresPromedios";
import EstadisticasIndiv from "../views/Inicio/Directivos/EstadisticasIndiv";
import AprovechamientoPMaterias from "../views/Inicio/Directivos/AprovechamientoPMaterias";
import CrearDocentes from "../views/Inicio/Admin/Docentes/CrearDocentes";
import ActualizarDatosAlumnos from "../views/Inicio/Admin/Alumnos/ActualizarDatosAlumnos";
import TdosUsuarios from "../views/Inicio/Directivos/TdosUsuarios";
import PruebasDiseño from "../views/PruebasDiseño";
import EditarPerfil from "../views/Inicio/Admin/EditarPerfil";
import EditarPerfil2 from "../views/Inicio/Admin/EditarPerfil2";
import EditarPerfil3 from "../views/Inicio/Admin/EditarPerfil3";
import EstadisticasGeneralXAdmin from "../views/Inicio/Admin/EstadisticasAdmin/EstadisticasGeneralXAdmin";
import EstadisticasGrupalXAdmin from "../views/Inicio/Admin/EstadisticasAdmin/EstadisticasGrupalXAdmin";
import EstadisticasIndividualXAdmin from "../views/Inicio/Admin/EstadisticasAdmin/EstadisticasIndividualXAdmin";
import MejoresPromediosXAdmin from "../views/Inicio/Admin/EstadisticasAdmin/MejoresPromediosXAdmin";
import ReinscribirAlumXAdmin from "../views/Inicio/Admin/Alumnos/ReinscribirAlumXAdmin";
import AlumnosEgresados from "../views/Inicio/Admin/Alumnos/AlumnosEgresados";
import PruebasDiseño2 from "../views/PruebasDiseño2";
import Prueba2 from "../views/Inicio/Prueba2";
import PerfilUD from "../views/Inicio/Docentes/Usuario/PerfilUD";
import PerfilDirectivos from "../views/Inicio/Directivos/PerfilDirectivos";
import PerfilUADM from "../views/Inicio/Admin/Ajustes/PerfilUADM";
import PerfilUDRT from "../views/Inicio/Directivos/Ajustes/PerfilUDRT";
=======
import HomeDocentes from "../views/Inicio/HomeDocentes";
import HomeAdministrativos from "../views/Inicio/HomeAdministrativos";
import HomeDirectivos from "../views/Inicio/HomeDirectivos";
import EnviarCorreoTelefono from "../views/RecuperacionContraseñas/EnviarCorreoTelefono";
import NotServe from "../views/NotServe";
import PrototipoMatematicas from "../views/PrototipoMatematicas";//*** */
import Perfil from "../views/Inicio/Admin/Perfil";
import AgregarPeriodo from "../views/Inicio/Admin/Configuracion/AgregarPeriodo";
import CrearGradoYgrupo from "../views/Inicio/Admin/Configuracion/CrearGradoYgrupo";
import AsignarDocenteGradoYgrupo from "../views/Inicio/Admin/Configuracion/AsignarDocenteGradoYgrupo";
import ListUsers from "../views/Inicio/Admin/Configuracion/ListUsers";
import CreateUsers from "../views/Inicio/Admin/Configuracion/CreateUsers";
import HomeE from "../views/Inicio/Admin/Configuracion/HomeE";
import EditUser from "../views/Inicio/Admin/Configuracion/EditUser";
import Crud from "../views/Inicio/Admin/Configuracion/Crud";
import Periodos from "../views/Inicio/Admin/Configuracion/Periodos";
import InsertarAlumnos from "../views/Inicio/Admin/Alumnos/InsertarAlumnos";
import PerfilDocente from "../views/Inicio/Docent/PerfilDocente";
import CapturaCalificaciones from "../views/Inicio/Docent/Alumnos/CapturaCalificaciones";
import ConsultaCalificaciones from "../views/Inicio/Docent/Alumnos/ConsultaCalificaciones";
import DashboardDocentes from "../components/DashboardDocentes";
import EficienciaTerminl from "../views/EficienciaTerminl";
import CapturarCalificaciones from "../views/Inicio/Docent/Alumnos/CapturarCalificaciones";
import Prototipo from "../views/Prototipo";
import InsertarCalifiAlumnos from "../views/Inicio/Docent/Alumnos/InsertarCalifiAlumnos";
import DashboardAdministrativos from "../components/DashboardAdministrativos";
import NavDocentes from "../components/NavDocentes";
import NavAdministrativos from "../components/NavAdministrativos";
import Sidebar2 from "../components/Sidebar2";
import EnviarCorreoChay from "../views/RecuperacionContraseñas/EnviarCorreoChay";
import Carrito from "../views/Carrito";
import Perfil1 from "../views/Inicio/Admin/Perfil1";
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668

export const router = createBrowserRouter ([
  {
  path:'/',
  element: <Layout/>,
  errorElement: <NotFound/>,
    
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "/home",
      element: <Home/>,
    },
    {
<<<<<<< HEAD
=======
      path: "/NotFound",
      element: <NotFound/>,
    },
    {
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
      path: "/Login",
      element: <Login/>,
    },
    {
<<<<<<< HEAD
=======
      path: "/Carrito",
      element: <Carrito/>,
    },
    {
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
      path: "/TerminosCondiciones",
      element: <TerminosCondiciones />,
    },
    {
      path: "/TerminosCookies",
      element: <TerminosCookies />,
    },
    {
      path: "/QuienesSomos",
      element: <QuienesSomos />,
    },
    {
      path: "/Registro",
      element: <Registro />,
    },
    {
      path:'/Nav2',
      element: <Nav2/>
    },
    {
      path:'/EnviarCorreo',
      element: <EnviarCorreo/>
    },
    {
<<<<<<< HEAD
=======
      path:'/EnviarCorreoChay',
      element: <EnviarCorreoChay/>
    },
    {
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
      path:'/EnviarMensaje',
      element: <EnviarMensaje/>
    },
    {
      path:'/EnviarCorreoTelefono',
      element: <EnviarCorreoTelefono/>
    },
    {
      path:'/NotServe',
      element: <NotServe/>
    },
    {
      path:'/ActualizaciónDeContraseña',
      element: <ActualizaciónDeContraseña/>
    },
    {
<<<<<<< HEAD
      path:'/PruebasDiseño',
      element: <PruebasDiseño/>
    },

    {
      path:'/PruebasDiseño2',
      element: <PruebasDiseño2/>
    },

=======
      path:'/PrototipoMatematicas',
      element: <PrototipoMatematicas/>
    },
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
    {
      path: "/",
      element: <ProtectedRoute />,
      children:[
        {
          index: true,
          element: <Home/>
        },
<<<<<<< HEAD

        //SIDEBARS DE LOS TRES TIPOS DE USUARIOS
        {
          path:'/SIDEBARDIRECT',
          element: <SIDEBARDIRECT/>
        },
        {
          path:'/SIDEBARADMIN',
          element: <SIDEBARADMIN/>
        },
        {
          path:'/SIDEBARDOCENT',
          element: <SIDEBARDOCENT/>
        },


        //************************************************** */
        //RUTAS DE LA PARTE DE DIRECTIVO
        {
          path:'/HomeDirect',
          element: <HomeDirect/>
        },
        {
          path:'/PerfilUDRT',
          element: <PerfilUDRT/>
        },
        {
          path:'/PerfilDirectivos',
          element: <PerfilDirectivos/>
        },
        {
          path:'/EditarPerfil3',
          element: <EditarPerfil3/>
        },
        {
          path:'/EstadisticasGeneral',
          element: <EstadisticasGeneral/>
        },
        {
          path:'/GraficasGrupal',
          element: <GraficasGrupal/>
        },
        {
          path:'/RolesYPrivilegios',
          element: <RolesYPrivilegios/>
        },
        {
          path:'/MejoresPromedios',
          element: <MejoresPromedios/>
        },
        {
          path:'/EstadisticasIndiv',
          element: <EstadisticasIndiv/>
        },
        {
          path:'/AprovechamientoPMaterias',
          element: <AprovechamientoPMaterias/>
        },
        {
          path:'/TdosUsuarios',
          element: <TdosUsuarios/>
        },

        

        // ********************************************


        //********************************************** */
        // RUTAS DE LA PARTE DE DOCENTE
        {
          path:'/HomeDocentes',
          element: <HomeDocentes/>
        },
        {
          path:'/PerfilUD',
          element: <PerfilUD/>
        },
        {
          path:'/EditarPerfil2',
          element: <EditarPerfil2/>
        },
        {
          path:'/VisualizarAlumnosDDocente',
          element: <VisualizarAlumnosDDocente/>
        },
        {
          path:'/CapturaCalificacionesAlum',
          element: <CapturaCalificacionesAlum/>
        },

        {
          path:'/VisualizarCapturaCalificaciones',
          element: <VisualizarCapturaCalificaciones/>
        },

        //******************************************************* */


        //********************************************************** */
        // RUTAS DE LA PARTE DE ADMINISTRATIVO

        {
          path:'/Prueba2',
          element: <Prueba2/>
        },

        {
          path:'/HomeAdmin',
          element: <HomeAdmin/>
        },
        {
          path:'/PerfilUADM',
          element: <PerfilUADM/>
        },
        {
          path:'/EditarPerfil',
          element: <EditarPerfil/>
        },
        {
          path:'/Periodos',
          element: <Periodos/>
=======
        {
          path:'/HomeDirectivos',
          element: <HomeDirectivos/>
        },
        {
          path:'/HomeAdministrativos',
          element: <HomeAdministrativos/>
        },
        {
          path:'/AgregarPeriodo',
          element: <AgregarPeriodo/>
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
        },
        {
          path:'/CrearGradoYgrupo',
          element: <CrearGradoYgrupo/>
        },
        {
<<<<<<< HEAD
          path:'/Materias',
          element: <Materias/>
        },
        {
          path:'/IngresarAlumnos',
          element: <IngresarAlumnos/>
        },
        {
          path:'/OtorgarGradoXGrupoDocente',
          element: <OtorgarGradoXGrupoDocente/>
        },
        {
          path:'/InfoEscuela',
          element: <InfoEscuela/>
        },
        {
          path:'/Usuarios',
          element: <Usuarios/>
        },

=======
          path:'/AsignarDocenteGradoYgrupo',
          element: <AsignarDocenteGradoYgrupo/>
        },
        {
          path:'/Perfil',
          element: <Perfil/>
        },
        {
          path:'/Perfil1',
          element: <Perfil1/>
        },
        {
          path:'/PerfilDocente',
          element: <PerfilDocente/>
        },
        {
          path:'/ListUsers',
          element: <ListUsers/>
        },
        {
          path:'/CreateUsers',
          element: <CreateUsers/>
        },
        {
          path:'/ListUsers/user/:id/EditUser',
          element: <EditUser/>
        },
        {
          path:'/HomeE',
          element: <HomeE/>
        },
        {
          path:'/Crud',
          element: <Crud/>
        },
        {
          path:'/Periodos',
          element: <Periodos/>
        },
        {
          path:'/InsertarAlumnos',
          element: <InsertarAlumnos/>
        },
        {
          path:'/HomeDocentes',
          element: <HomeDocentes/>
        },
        {
          path:'/CapturaCalificaciones',
          element: <CapturaCalificaciones/>
        },
        {
          path:'/ConsultaCalificaciones',
          element: <ConsultaCalificaciones/>
        },
        {
          path:'/EficienciaTerminl',
          element: <EficienciaTerminl/>
        },
        {
          path:'/CapturarCalificaciones',
          element: <CapturarCalificaciones/>
        },
        {
          path:'/Prototipo',
          element: <Prototipo/>
        },
        {
          path:'/InsertarCalifiAlumnos',
          element: <InsertarCalifiAlumnos/>
        },
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
        {
          path:'/DashboardDocentes',
          element: <DashboardDocentes/>
        },
        {
          path:'/DashboardAdministrativos',
          element: <DashboardAdministrativos/>
        },
        {
          path:'/NavDocentes',
          element: <NavDocentes/>
        },
        {
          path:'/NavAdministrativos',
          element: <NavAdministrativos/>
        },
        {
<<<<<<< HEAD
          path:'/VisualizaciónAlumnosInscritos',
          element: <VisualizaciónAlumnosInscritos/>
        },
        {
          path:'/TodosAlum',
          element: <TodosAlum/>
        },
        {
          path:'/CrearDocentes',
          element: <CrearDocentes/>
        },
        {
          path:'/ActualizarDatosAlumnos',
          element: <ActualizarDatosAlumnos/>
        },
        
        {
          path:'/EstadisticasGeneralXAdmin',
          element: <EstadisticasGeneralXAdmin/>
        },
        {
          path:'/EstadisticasGrupalXAdmin',
          element: <EstadisticasGrupalXAdmin/>
        },
        {
          path:'/EstadisticasIndividualXAdmin',
          element: <EstadisticasIndividualXAdmin/>
        },
        {
          path:'/MejoresPromediosXAdmin',
          element: <MejoresPromediosXAdmin/>
        },

        {
          path:'/ReinscribirAlumXAdmin',
          element: <ReinscribirAlumXAdmin/>
        },

        {
          path:'/AlumnosEgresados',
          element: <AlumnosEgresados/>
        },





        //DR EFREN
        {
          path:'/Clasificacion',
          element: <Clasificacion/>
=======
          path:'/Sidebar2',
          element: <Sidebar2/>
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
        },
      ]
    }
  ]
  }
]);