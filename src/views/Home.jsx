import React, { useState } from "react";
import { FiAlignRight } from "react-icons/fi";
import { Drawer, Collapse, Button, Carousel, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  LoginOutlined,
  UserAddOutlined,
  TeamOutlined,
  HomeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import logotelesecundaria763 from "@/images/logotelesecundaria763.png";
import slider_veda from "@/images/slider_veda.png";
import doss from "@/images/doss.png";
import tress from "@/images/tress.png";
import Footer from "../components/Footer";

const { Panel } = Collapse;

function Home() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleClose = () => {
    setDrawerVisible(false);
  };

  return (
    <div className="relative">
      {/* Nav Superior */}
      <div className="w-full h-[60px] bg-white border-b border-gray-200 flex items-center px-5 fixed top-0 left-0 z-50">
        <button
          onClick={toggleDrawer}
          className="border-none bg-none cursor-pointer"
          aria-label="Abrir menú"
        >
          <FiAlignRight className="text-2xl" />
        </button>
        <img src={logotelesecundaria763} alt="Logo" className="h-10 ml-4" />
      </div>

      {/* Drawer */}
      <Drawer
        title={<h2 className="text-2xl font-bold">Menú</h2>}
        placement="left"
        onClose={handleClose}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu mode="inline" defaultSelectedKeys={["1"]} className="h-full">
          <Menu.Item key="1" icon={<HomeOutlined />} className="text-lg">
            <Link to="/">Inicio</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<LoginOutlined />} className="text-lg">
            <Link to="/login">Inicio de sesión</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserAddOutlined />} className="text-lg">
            <Link to="/registro">Registro</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />} className="text-lg">
            <Link to="/QuienesSomos">Quiénes Somos</Link>
          </Menu.Item>
        </Menu>
      </Drawer>

      {/* Sección Principal */}
      <div className="pt-[80px] bg-[#7d0430] text-center text-white py-10">

        <h1 className="text-3xl md:text-4xl font-bold mb-2">Portal Virtual Telesecundaria 763</h1>
        <h1 className="text-3xl font-extrabold text-center mb-2 text-white-800">Recuperación de Cuenta</h1>

        <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto px-4">
          Un espacio diseñado para facilitar la comunicación, mejorar el aprendizaje y desarrollar mejores resultados académicos para toda la comunidad escolar.
        </p>
      </div>

      {/* Tarjetas */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 my-10">
        <Card icon={<LoginOutlined />} title="Inicio de Sesión" link="/login" />
        <Card icon={<UserAddOutlined />} title="Registro" link="/registro" />
        <Card icon={<TeamOutlined />} title="Nosotros" link="/QuienesSomos" />
      </div>

      {/* Carrusel de Imágenes */}
      <div className="max-w-7xl mx-auto my-10 px-2 md:px-4">
        <Carousel autoplay>
          <div>
            <img
              src={slider_veda}
              alt="Imagen 1"
              className="w-full h-64 md:h-96 object-cover rounded-md"
            />
          </div>
          <div>
            <img
              src={doss}
              alt="Imagen 2"
              className="w-full h-64 md:h-96 object-cover rounded-md"
            />
          </div>
          <div>
            <img
              src={tress}
              alt="Imagen 3"
              className="w-full h-64 md:h-96 object-cover rounded-md"
            />
          </div>
        </Carousel>
      </div>

      {/* Accordion */}
      <div className="bg-white shadow-md rounded-lg p-4 md:p-8 max-w-7xl mx-auto mb-10">
        <Collapse accordion>
          <Panel header="Nuestra Misión" key="1">
            <p className="text-sm md:text-base">
              Somos una escuela que logra un trabajo colaborativo entre dirección, docentes, personal de apoyo, alumnos(as) y padres de familia, para obtener aprendizajes significativos y lograr los objetivos de la nueva escuela mexicana.
            </p>
          </Panel>
          <Panel header="Nuestra Visión" key="2">
            <p className="text-sm md:text-base">
              Ser una institución reconocida por su desempeño académico y formativo, capaz de proveer a nuestros alumnos(as) conocimientos, habilidades, destrezas y aptitudes que les permita ser competentes y participar activamente en la sociedad cambiante a la que pertenecen.
            </p>
          </Panel>
          <Panel header="Nuestros Valores" key="3">
            <p className="text-sm md:text-base">
              Puntualidad, Responsabilidad, Compromiso, Respeto, Disciplina, Empatía, Actitud de Servicio, Liderazgo, Igualdad, Resiliencia.
            </p>
          </Panel>
        </Collapse>
      </div>

      <Footer />
    </div>
  );
}

function Card({ icon, title, link }) {
  return (
    <Link to={link} className="w-full max-w-xs md:max-w-sm">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
        <div className="text-5xl md:text-6xl text-blue-500 mb-4">{icon}</div>
        <h3 className="text-lg md:text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-500">Haz clic para ingresar</p>
      </div>
    </Link>
  );
}

export default Home;
