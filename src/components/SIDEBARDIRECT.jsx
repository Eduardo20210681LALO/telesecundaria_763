import { useState, useEffect } from 'react';
import { FiAlignRight } from 'react-icons/fi';
import { Avatar, Menu } from 'antd';
import { UserOutlined, HomeOutlined, BarChartOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import logotelesecundaria763 from '../images/logotelesecundaria763.png';

function getItem(label, key, icon, children) {
    return { key, icon, children, label };
}

// Menú específico para el rol de directivo
const itemsSidebar = (CerrarSesion) => [
    getItem(<Link to="/directivo/HomeDirect">Inicio</Link>, 'home', <HomeOutlined />),
    getItem('ESTADÍSTICAS', 'sub1', <BarChartOutlined />, [
        getItem(<Link to="/directivo/MejoresPromedios">Mejores Promedios</Link>, '1'),
        getItem(<Link to="/directivo/EstadisticasGeneral">Estadísticas General</Link>, '2'),
        getItem(<Link to="/directivo/GraficasGrupal">Estadísticas Grupal</Link>, '3'),
        getItem(<Link to="/directivo/EstadisticasIndiv">Estadísticas Indiv.</Link>, '4'),
    ]),
    getItem('AJUSTES', 'sub2', <SettingOutlined />, [
        getItem(<Link to="/directivo/TdosUsuarios">Usuarios</Link>, '5'),
        getItem(<Link to="/directivo/PerfilUDRT">Mi Perfil</Link>, '6'),
    ]),
    getItem(
        <span onClick={CerrarSesion} style={{ cursor: 'pointer' }}>Cerrar Sesión</span>,
        'logout',
        <LogoutOutlined />
    ),
];

function SIDEBARDIRECT({ children }) {
    const [collapsed, setCollapsed] = useState(() => localStorage.getItem('sidebarCollapsed') === 'true');
    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKey, setSelectedKey] = useState('home');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const pathToKeyMap = {
            '/directivo/MejoresPromedios': { key: '1', open: ['sub1'] },
            '/directivo/EstadisticasGeneral': { key: '2', open: ['sub1'] },
            '/directivo/GraficasGrupal': { key: '3', open: ['sub1'] },
            '/directivo/EstadisticasIndiv': { key: '4', open: ['sub1'] },
            '/directivo/TdosUsuarios': { key: '5', open: ['sub2'] },
            '/directivo/PerfilUDRT': { key: '6', open: ['sub2'] },
        };

        const matchedRoute = Object.keys(pathToKeyMap).find((path) =>
            location.pathname.includes(path)
        );

        if (matchedRoute) {
            const { key, open } = pathToKeyMap[matchedRoute];
            setSelectedKey(key);
            setOpenKeys(open);
        } else {
            setSelectedKey('home');
            setOpenKeys([]);
        }
    }, [location]);

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    };

    const toggleSidebar = () => {
        setCollapsed((prevState) => {
            const newCollapsedState = !prevState;
            localStorage.setItem('sidebarCollapsed', newCollapsedState);
            return newCollapsedState;
        });
    };

    const CerrarSesion = () => {
        Cookies.remove('token');
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('rol');
        navigate('/Home');
    };

    return (
        <div style={{ display: 'flex' }}>
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
                <style>
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
                        {!collapsed && <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Directivo</p>}
                    </div>
                </div>

                <Menu
                    selectedKeys={[selectedKey]}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={itemsSidebar(CerrarSesion)}
                />
            </div>

            <div style={{ marginLeft: collapsed ? '80px' : '256px', flexGrow: 1 }}>
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
                </div>

                <div style={{ paddingTop: '60px', minHeight: '100vh', backgroundColor: '#F8F8FF', overflowY: 'auto' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default SIDEBARDIRECT;
