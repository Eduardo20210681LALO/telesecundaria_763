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
      path: "/NotFound",
      element: <NotFound/>,
    },
    {
      path: "/Login",
      element: <Login/>,
    },
    {
      path: "/Carrito",
      element: <Carrito/>,
    },
    {
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
      path:'/EnviarCorreoChay',
      element: <EnviarCorreoChay/>
    },
    {
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
      path:'/PrototipoMatematicas',
      element: <PrototipoMatematicas/>
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children:[
        {
          index: true,
          element: <Home/>
        },
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
        },
        {
          path:'/CrearGradoYgrupo',
          element: <CrearGradoYgrupo/>
        },
        {
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
          path:'/Sidebar2',
          element: <Sidebar2/>
        },
      ]
    }
  ]
  }
]);