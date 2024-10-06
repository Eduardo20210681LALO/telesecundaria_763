import { useState } from 'react';
import { FiAlignRight } from 'react-icons/fi'; // Icono de menú
import { Avatar, Menu } from 'antd'; // Componente de Avatar y Menu de Ant Design
import { UserOutlined, FolderOutlined, HomeOutlined, TeamOutlined, BarChartOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'; // Agregamos useNavigate para la navegación
import Cookies from 'js-cookie'; // Importamos Cookies para borrar cookies
import logotelesecundaria763 from '../images/logotelesecundaria763.png'; // Imagen del logotipo

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const itemsSidebar = (CerrarSesión) => [
  getItem(<Link to="/inicio">Inicio</Link>, 'home', <HomeOutlined />),

  getItem('SISTEMA', 'sub1', <FolderOutlined />, [
    getItem(<Link to="/periodos">Períodos</Link>, '1'),
    getItem(<Link to="/grados-grupos">Grados y Grupos</Link>, '2'),
    getItem(<Link to="/materias">Materias</Link>, '3'),
  ]),

  getItem('DOCENTES', 'sub2', <UserOutlined />, [
    getItem(<Link to="/crear-docentes">Crear Docentes</Link>, '4'),
    getItem(<Link to="/asignar-grupo-docente">Asig. Grupo Doc</Link>, '5'),
  ]),

  getItem('ALUMNOS', 'sub3', <TeamOutlined />, [
    getItem(<Link to="/ingresar-alumnos">Ingresar Alumnos</Link>, '6'),
    getItem(<Link to="/inscribir-alumnos">Inscribir Alumnos</Link>, '7'),
    getItem(<Link to="/todos-los-alumnos">Todos los Alumnos</Link>, '8'),
    getItem(<Link to="/actualizar-datos">Actualizar Datos</Link>, '9'),
    getItem(<Link to="/reinscribir-alumnos">Reinscribir Alumnos</Link>, '10'),
    getItem(<Link to="/alumnos-egresados">Alumnos Egresados</Link>, '11'),
    getItem(<Link to="/alumnos-baja">Alumnos Baja</Link>, '12'),
  ]),

  getItem('ESTADÍSTICAS', 'sub4', <BarChartOutlined />, [
    getItem(<Link to="/mejores-promedios">Mejores Promedios</Link>, '13'),
    getItem(<Link to="/estadisticas-general">Estadísticas General</Link>, '14'),
    getItem(<Link to="/estadisticas-grupal">Estadísticas Grupal</Link>, '15'),
    getItem(<Link to="/estadisticas-indiv">Estadísticas Indiv.</Link>, '16'),
  ]),

  getItem('AJUSTES', 'sub5', <SettingOutlined />, [
    getItem(<Link to="/usuarios">Usuarios</Link>, '17'),
  ]),

  // Aquí cambiamos el link de cerrar sesión para que invoque la función CerrarSesión
  getItem(
    <span onClick={CerrarSesión} style={{ cursor: 'pointer' }}>Cerrar Sesión</span>, 
    'logout', 
    <LogoutOutlined />
  ),
];

function Navbar({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const CerrarSesión = () => {
    BorrarCookies();
    navigate('/Home');
  };

  const BorrarCookies = () => {
    Cookies.remove('token'); // Elimina la cookie llamada "token"
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar fijo y colapsable */}
      <div
        style={{
          width: collapsed ? '80px' : '256px',
          transition: 'width 0.3s',
          height: 'calc(100vh - 60px)',
          position: 'fixed',
          top: '60px',
          left: 0,
          backgroundColor: '#fff',
          borderRight: '1px solid #e0e0e0',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="scrollbar-hide"
      >
        <style jsx>
          {`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        <div style={{ padding: '20px', textAlign: 'center' }}>
          {!collapsed && (
            <h1 style={{ margin: 0, fontWeight: 'bold', fontSize: '1.75rem' }}>
              Telesecundaria 763
            </h1>
          )}
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Avatar size={collapsed ? 40 : 64} icon={<UserOutlined />} />
            {!collapsed && <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Administrador</p>}
          </div>
        </div>

        <Menu
          defaultSelectedKeys={['home']}
          defaultOpenKeys={[]}
          mode="inline"
          inlineCollapsed={collapsed}
          items={itemsSidebar(CerrarSesión)} // Pasamos la función CerrarSesión
        />
      </div>

      <div style={{ marginLeft: collapsed ? '80px' : '256px', flexGrow: 1 }}>
        {/* Navbar superior */}
        <div
          style={{
            width: '100%',
            height: '60px',
            backgroundColor: '#fff',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={toggleSidebar} style={{ border: 'none', background: 'none', cursor: 'pointer', marginRight: '10px' }}>
              <FiAlignRight style={{ fontSize: '24px' }} />
            </button>

            <img src={logotelesecundaria763} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>Telesecundaria 763</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar size={40} icon={<UserOutlined />} />
            <div style={{ marginLeft: '10px', textAlign: 'right' }}>
              <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>Juan Perez Hernandez</p>
              <p style={{ margin: 0, color: '#888' }}>Docente</p>
            </div>
          </div>
        </div>

        {/* Contenido dinámico */}
        <div style={{ paddingTop: '60px', minHeight: '100vh', backgroundColor: '#F8F8FF', overflowY: 'auto' }}>
            {children} {/* Renderiza el contenido hijo aquí */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
