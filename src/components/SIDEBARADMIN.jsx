import { useState, useEffect } from 'react';
import { FiAlignRight } from 'react-icons/fi';
import { Avatar, Menu, Drawer } from 'antd';
import {
    UserOutlined,
    FolderOutlined,
    HomeOutlined,
    TeamOutlined,
    BarChartOutlined,
    SettingOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logotelesecundaria763 from '../images/logotelesecundaria763.png';

function getItem(label, key, icon, children) {
    return { key, icon, children, label };
}

const itemsSidebar = (CerrarSesión) => [
    getItem(<Link to="/administrativo/HomeAdmin">Inicio</Link>, 'home', <HomeOutlined />),
    getItem('SISTEMA', 'sub1', <FolderOutlined />, [
        getItem(<Link to="/administrativo/Periodos">Períodos</Link>, '1'),
        getItem(<Link to="/administrativo/CrearGradoYgrupo">Grados y Grupos</Link>, '2'),
        getItem(<Link to="/administrativo/Materias">Materias</Link>, '3'),
    ]),
    getItem('DOCENTES', 'sub2', <UserOutlined />, [
        getItem(<Link to="/administrativo/CrearDocentes">Crear y Asignar Docentes</Link>, '4'),
    ]),
    getItem('ALUMNOS', 'sub3', <TeamOutlined />, [
        getItem(<Link to="/administrativo/IngresarAlumnos">Ingresar Alumnos</Link>, '5'),
        getItem(<Link to="/administrativo/VisualizaciónAlumnosInscritos">Inscribir Alumnos</Link>, '6'),
        getItem(<Link to="/administrativo/TodosAlum">Todos los Alumnos</Link>, '7'),
        getItem(<Link to="/administrativo/ActualizarDatosAlumnos">Actualizar Datos</Link>, '8'),
        getItem(<Link to="/administrativo/ReinscribirAlumXAdmin">Reinscribir Alumnos</Link>, '9'),
        getItem(<Link to="/administrativo/AlumnosEgresados">Alumnos Egresados</Link>, '10'),
        getItem(<Link to="/administrativo/alumnos-baja">Alumnos Baja</Link>, '11'),
    ]),
    getItem('ESTADÍSTICAS', 'sub4', <BarChartOutlined />, [
        getItem(<Link to="/administrativo/MejoresPromediosXAdmin">Mejores Promedios</Link>, '12'),
        getItem(<Link to="/administrativo/EstadisticasGeneralXAdmin">Estadísticas General</Link>, '13'),
        getItem(<Link to="/administrativo/EstadisticasGrupalXAdmin">Estadísticas Grupal</Link>, '14'),
        getItem(<Link to="/administrativo/EstadisticasIndividualXAdmin">Estadísticas Indiv.</Link>, '15'),
    ]),
    getItem('AJUSTES', 'sub5', <SettingOutlined />, [
        getItem(<Link to="/administrativo/Usuarios">Usuarios</Link>, '16'),
        getItem(<Link to="/administrativo/PerfilUADM">Mi Perfil</Link>, '17'),
    ]),
    getItem(
        <span onClick={CerrarSesión} style={{ cursor: 'pointer' }}>Cerrar Sesión</span>,
        'logout',
        <LogoutOutlined />
    ),
];

function SIDEBARADMIN({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [openKeys, setOpenKeys] = useState(JSON.parse(localStorage.getItem('openKeys')) || []);
    const [selectedKey, setSelectedKey] = useState(localStorage.getItem('selectedKey') || 'home');
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 992);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleDrawer = () => {
        if (isMobile) {
            setDrawerVisible(!drawerVisible);
        } else {
            setCollapsed(!collapsed);
        }
    };

    const CerrarSesión = () => {
        Cookies.remove('token');
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('rol');
        localStorage.removeItem('selectedKey');
        localStorage.removeItem('openKeys');
        navigate('/Home');
    };

    const handleMenuClick = ({ key }) => {
        setSelectedKey(key);
        localStorage.setItem('selectedKey', key);
    };

    const handleOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => !openKeys.includes(key));
        const newOpenKeys = latestOpenKey ? [latestOpenKey] : [];
        setOpenKeys(newOpenKeys);
        localStorage.setItem('openKeys', JSON.stringify(newOpenKeys));
    };

    return (
        <div style={{ display: 'flex' }}>
            {!isMobile ? (
                <div
                    className="sidebar-scrollbar"
                    style={{
                        width: collapsed ? '80px' : '256px',
                        transition: 'width 0.3s',
                        height: '100vh',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        backgroundColor: '#fff',
                        borderRight: '1px solid #e0e0e0',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    <div style={{ padding: '20px', textAlign: 'center', marginTop: '60px' }}>
                        {collapsed || isMobile ? (
                            <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0', lineHeight: '1' }}>Ts</h1>
                        ) : (
                            <div>
                                <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0', lineHeight: '1' }}>
                                    Telesecundaria
                                </h1>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0', lineHeight: '1' }}>
                                    763
                                </h2>
                            </div>
                        )}
                    </div>

                    <Menu
                        selectedKeys={[selectedKey]}
                        openKeys={openKeys}
                        onOpenChange={handleOpenChange}
                        onClick={handleMenuClick}
                        mode="inline"
                        inlineCollapsed={collapsed}
                        items={itemsSidebar(CerrarSesión)}
                    />
                </div>
            ) : (
                <Drawer
                    title="Menú"
                    placement="left"
                    onClose={() => setDrawerVisible(false)}
                    visible={drawerVisible}
                    bodyStyle={{ padding: 0 }}
                >
                    <Menu
                        selectedKeys={[selectedKey]}
                        openKeys={openKeys}
                        onOpenChange={handleOpenChange}
                        onClick={handleMenuClick}
                        mode="inline"
                        items={itemsSidebar(CerrarSesión)}
                    />
                </Drawer>
            )}

            <div style={{ flexGrow: 1, marginLeft: isMobile ? 0 : collapsed ? '80px' : '256px' }}>
                <div
                    style={{
                        width: '100%',
                        height: '60px',
                        backgroundColor: '#fff',
                        borderBottom: '1px solid #e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 20px',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: 1000,
                    }}
                >
                    <button onClick={toggleDrawer} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                        <FiAlignRight style={{ fontSize: '24px' }} />
                    </button>
                    <img src={logotelesecundaria763} alt="Logo" style={{ height: '40px', marginLeft: '10px' }} />
                </div>

                <div style={{ paddingTop: '60px', minHeight: '100vh', backgroundColor: '#F8F8FF' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default SIDEBARADMIN;
