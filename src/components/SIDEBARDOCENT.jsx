import { useState, useEffect } from 'react';
import { FiAlignRight } from 'react-icons/fi';
import { Menu, Drawer } from 'antd';
import {
    UserOutlined,
    HomeOutlined,
    BarChartOutlined,
    SettingOutlined,
    LogoutOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logotelesecundaria763 from '../images/logotelesecundaria763.png';

function getItem(label, key, icon, children) {
    return { key, icon, children, label };
}

// Menú específico para el rol de docente
const itemsSidebar = (CerrarSesion) => [
    getItem(<Link to="/docente/HomeDocentes">Inicio</Link>, 'home', <HomeOutlined />),
    getItem('ALUMNOS', 'sub1', <TeamOutlined />, [
        getItem(<Link to="/docente/CapturaCalificacionesAlum">Capturar Calificaciones</Link>, '1'),
        getItem(<Link to="/docente/VisualizarCapturaCalificaciones">Visualizar Calificaciones</Link>, '2'),
        getItem(<Link to="/docente/VisualizarAlumnosDDocente">Visualizar Alumnos</Link>, '3'),
    ]),
    getItem('ESTADÍSTICAS', 'sub2', <BarChartOutlined />, [
        getItem(<Link to="/docente/EstadisticasGrupalDocent">Estadísticas Grupal</Link>, '4'),
        getItem(<Link to="/docente/EstadisticasIndivDocent">Estadísticas Individual</Link>, '5'),
    ]),
    getItem('USUARIO', 'sub3', <SettingOutlined />, [
        getItem(<Link to="/docente/PerfilUD">Mi Perfil</Link>, '6'),
    ]),
    getItem(
        <span onClick={CerrarSesion} style={{ cursor: 'pointer' }}>Cerrar Sesión</span>,
        'logout',
        <LogoutOutlined />
    ),
];

function SIDEBARDOCENT({ children }) {
    const [collapsed, setCollapsed] = useState(() => localStorage.getItem('sidebarCollapsed') === 'true');
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
            setCollapsed((prevState) => {
                const newCollapsedState = !prevState;
                localStorage.setItem('sidebarCollapsed', newCollapsedState);
                return newCollapsedState;
            });
        }
    };

    const CerrarSesion = () => {
        Cookies.remove('token');
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('rol');
        localStorage.removeItem('selectedKey');
        localStorage.removeItem('openKeys');
        localStorage.removeItem('sidebarCollapsed');
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
                    }}
                >
                    <div style={{ padding: '20px', textAlign: 'center', marginTop: '60px' }}>
                        {!collapsed && <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>Telesecundaria 763</h1>}
                    </div>

                    <Menu
                        selectedKeys={[selectedKey]}
                        openKeys={openKeys}
                        onOpenChange={handleOpenChange}
                        onClick={handleMenuClick}
                        mode="inline"
                        inlineCollapsed={collapsed}
                        items={itemsSidebar(CerrarSesion)}
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
                        items={itemsSidebar(CerrarSesion)}
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

export default SIDEBARDOCENT;
