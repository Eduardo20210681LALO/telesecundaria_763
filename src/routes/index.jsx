import { createBrowserRouter } from "react-router-dom";
import React from 'react'
import Home from "../views/Home";
import Login from "../views/Login";
import NotFound from "../views/NotFound";
import Layout from "./Layout";
import OlvidateContra from "../views/OlvidateContra";
import RestablecerContra from "../views/RestablecerContra";
import ProtectedRoute from "../views/ProtectedRoute";

import HomeDirectivo from "../views/HomeDirectivo";
import HomeAdministrativo from "../views/HomeAdministrativo";
import HomeDocente from "../views/HomeDocente";
import Nav3 from "../components/Nav3";
import Registro from "../views/Registro";
import RecuperarContraseña from "../views/RecuperarContraseña";
import ActualizarContraseña from "../views/ActualizarContraseña";
import TerminosCondiciones from "../views/TerminCondiCookies/TerminosCondiciones";
import TerminosCookies from "../views/TerminCondiCookies/TerminosCookies";

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
            element: <Login />,
          },
          {
            path: "/OlvidateContra",
            element: <OlvidateContra />,
          },
          {
            path: "/RestablecerContra",
            element: <RestablecerContra />,
          },
          {
            path: "/RecuperarContraseña",
            element: <RecuperarContraseña />,
          },
          {
            path: "/ActualizarContraseña",
            element: <ActualizarContraseña />,
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
            path: "/Registro",
            element: <Registro />,
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
                path:'/HomeDirectivo',
                element: <HomeDirectivo/>
              },
              {
                path:'/HomeAdministrativo',
                element: <HomeAdministrativo/>
              },
              {
                path:'/HomeDocente',
                element: <HomeDocente/>
              },
              {
                path:'/Nav3',
                element: <Nav3/>
              },
            ]
          }
        ]
    }
]);