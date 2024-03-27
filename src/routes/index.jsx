import { createBrowserRouter } from "react-router-dom";
import React from 'react'
import Home from "../views/Home";
import Login from "../views/Login";
import NotFound from "../views/NotFound";
import Layout from "./Layout";
import ProtectedRoute from "../views/ProtectedRoute";
import Registro from "../views/Registro";

import TerminosCondiciones from "../views/TerminCondiCookies/TerminosCondiciones";
import TerminosCookies from "../views/TerminCondiCookies/TerminosCookies";
import QuienesSomos from "../views/TerminCondiCookies/QuienesSomos";
import Nav2 from "../components/Nav2";

import ActualizaciónDeContraseña from "../views/RecuperacionContraseñas/ActualizaciónDeContraseña";
import EnviarCorreo from "../views/RecuperacionContraseñas/EnviarCorreo";
import { EnviarMensaje } from "../views/RecuperacionContraseñas/EnviarMensaje";
import HomeDocentes from "../views/Inicio/HomeDocentes";
import HomeAdministrativos from "../views/Inicio/HomeAdministrativos";
import HomeDirectivos from "../views/Inicio/HomeDirectivos";
import EnviarCorreoTelefono from "../views/RecuperacionContraseñas/EnviarCorreoTelefono";
import NotServe from "../views/NotServe";
import NavDocentes from "../components/NavDocentes";
import PrototipoMatematicas from "../views/PrototipoMatematicas";

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
      path: "/Login",
      element: <Login/>,
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
          path:'/NavDocentes',
          element: <NavDocentes/>
        },
        {
          path:'/HomeAdministrativos',
          element: <HomeAdministrativos/>
        },
        {
          path:'/HomeDocentes',
          element: <HomeDocentes/>
        },
      ]
    }
  ]
  }
]);