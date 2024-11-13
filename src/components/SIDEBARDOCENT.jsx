import { useState, useEffect } from 'react';
import { FiAlignRight } from 'react-icons/fi';
import { Avatar, Menu } from 'antd';
import { UserOutlined, HomeOutlined, BarChartOutlined, SettingOutlined, LogoutOutlined, TeamOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import logotelesecundaria763 from '../images/logotelesecundaria763.png';

function getItem(label, key, icon, children) {
    return { key, icon, children, label };
}

// Agregamos el prefijo "/docente" a todas las rutas para que coincidan con el rol actual
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
    const [collapsed, setCollapsed] = useState(() => {
        return localStorage.getItem('sidebarCollapsed') === 'true';
    });

    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKey, setSelectedKey] = useState('home');
    const navigate = useNavigate();
    const location = useLocation();

    // Mapea las rutas con las claves del menú para seleccionar y abrir el correcto
    useEffect(() => {
        const pathToKeyMap = {
            '/docente/CapturaCalificacionesAlum': { key: '1', open: ['sub1'] },
            '/docente/VisualizarCapturaCalificaciones': { key: '2', open: ['sub1'] },
            '/docente/VisualizarAlumnosDDocente': { key: '3', open: ['sub1'] },
            '/docente/EstadisticasGrupalDocent': { key: '4', open: ['sub2'] },
            '/docente/EstadisticasIndivDocent': { key: '5', open: ['sub2'] },
            '/docente/PerfilUD': { key: '6', open: ['sub3'] },
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

    // Control del menú colapsado
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
        BorrarCookies();
        localStorage.removeItem('idUsuario');
        navigate('/Home');
    };

    const BorrarCookies = () => {
        Cookies.remove('token');
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
                        {!collapsed && <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Docente</p>}
                    </div>
                </div>

                <Menu
                    selectedKeys={[selectedKey]}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={itemsSidebar(CerrarSesion)}
                    style={{
                        '--antd-selected-bg': 'rgba(125, 4, 48, 0.5)',
                        '--antd-highlight-color': '#7d0430',
                    }}
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
                        <button
                            onClick={toggleSidebar}
                            style={{ border: 'none', background: 'none', cursor: 'pointer', marginRight: '10px' }}
                            aria-label="Toggle Sidebar"
                        >
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

export default SIDEBARDOCENT;
