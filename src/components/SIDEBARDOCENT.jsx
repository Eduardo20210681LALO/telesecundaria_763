import { useState, useEffect } from 'react';
import { FiAlignRight } from 'react-icons/fi'; // Icono de menú
import { Avatar, Menu } from 'antd'; // Componente de Avatar y Menu de Ant Design
import { UserOutlined, HomeOutlined, BarChartOutlined, SettingOutlined, LogoutOutlined, TeamOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Agregamos useLocation para detectar la ruta actual
import Cookies from 'js-cookie'; // Importamos Cookies para borrar cookies
import logotelesecundaria763 from '../images/logotelesecundaria763.png';

function getItem(label, key, icon, children) {
    return { key, icon, children, label };
}

const itemsSidebar = (CerrarSesion) => [
    getItem(<Link to="/HomeDocentes">Inicio</Link>, 'home', <HomeOutlined />),  // Clave única para Home
    getItem('ALUMNOS', 'sub1', <TeamOutlined />, [  // Cambiado a TeamOutlined
        getItem(<Link to="/CapturaCalificacionesAlum">Capturar Calificaciones</Link>, '1'), // Clave única 1
        getItem(<Link to="/VisualizarCapturaCalificaciones">Visualizar Calificaciones</Link>, '2'), // Clave única 2
        getItem(<Link to="/VisualizarAlumnosDDocente">Visualizar Alumnos</Link>, '3'), // Clave única 3
    ]),
    getItem('ESTADÍSTICAS', 'sub2', <BarChartOutlined />, [
        getItem(<Link to="/EstadisticasGrupalDocent">Estadísticas Grupal</Link>, '4'), // Clave única 4
        getItem(<Link to="/EstadisticasIndivDocent">Estadísticas Individual</Link>, '5'), // Clave única 5
    ]),
    getItem('USUARIO', 'sub3', <SettingOutlined />, [
        getItem(<Link to="/PerfilUD">Mi Perfil</Link>, '6'), // Clave única 6
    ]),
    getItem(
        <span onClick={CerrarSesion} style={{ cursor: 'pointer' }}>Cerrar Sesión</span>, 
        'logout', 
        <LogoutOutlined />
    ),
];


function SIDEBARDOCENT ({ children }) {
    const [collapsed, setCollapsed] = useState(() => {
        // Lee el estado inicial de `collapsed` de `localStorage`, si no existe usa `false` por defecto
        return localStorage.getItem('sidebarCollapsed') === 'true';
    });

    const [openKeys, setOpenKeys] = useState([]); // Estado para manejar los menús abiertos
    const [selectedKey, setSelectedKey] = useState('home'); // Mantener la clave seleccionada
    const navigate = useNavigate();
    const location = useLocation();

    // Mapea las rutas con las claves del menú para seleccionar y abrir el correcto
    useEffect(() => {
        const pathToKeyMap = {
            '/CapturaCalificacionesAlum': { key: '1', open: ['sub1'] },
            '/VisualizarCapturaCalificaciones': { key: '2', open: ['sub1'] },
            '/VisualizarAlumnosDDocente': { key: '3', open: ['sub1'] },

            '/EstadisticasGrupalDocent': { key: '4', open: ['sub2'] },
            '/EstadisticasIndivDocent': { key: '5', open: ['sub2'] },

            '/PerfilUD': { key: '6', open: ['sub3'] },
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
        if (latestOpenKey) {
            setOpenKeys([latestOpenKey]); // Solo permite un menú abierto
        } else {
            setOpenKeys([]);
        }
    };

    const toggleSidebar = () => {
        setCollapsed((prevState) => {
            const newCollapsedState = !prevState;
            localStorage.setItem('sidebarCollapsed', newCollapsedState); // Almacena en localStorage
            return newCollapsedState;
        });
    };

    const CerrarSesion = () => {
        BorrarCookies();
        localStorage.removeItem('idUsuario'); // Elimina solo el ID del usuario, ajusta 'idUsuario' si es necesario
        navigate('/Home'); // Redirige al home
    };

    const BorrarCookies = () => {
        Cookies.remove('token'); // Si la cookie tiene un nombre diferente, cámbialo aquí
    };


    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar */}
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
                {/* Ocultar scroll */}
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
                        {!collapsed && <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Docente</p>}
                    </div>
                </div>

                <Menu
                    selectedKeys={[selectedKey]}
                    openKeys={openKeys} // Controlamos qué submenús están abiertos
                    onOpenChange={onOpenChange} // Cambia el estado al abrir/cerrar submenús
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={itemsSidebar(CerrarSesion)}
                    style={{
                        '--antd-selected-bg': 'rgba(125, 4, 48, 0.5)', // Guinda bajito con transparencia
                        '--antd-highlight-color': '#7d0430', // Guinda fuerte para el texto
                    }}
                />
            </div>

            {/* Contenido principal */}
            <div style={{ marginLeft: collapsed ? '80px' : '256px', flexGrow: 1 }}>
                {/* Header */}
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

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar size={40} icon={<UserOutlined />} />
                        <div style={{ marginLeft: '10px', textAlign: 'right' }}>
                            <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>Juan Perez</p>
                            <p style={{ margin: 0, color: '#888' }}>Directivo</p>
                        </div>
                    </div>
                </div>

                {/* Contenido dinámico */}
                <div style={{ paddingTop: '60px', minHeight: '100vh', backgroundColor: '#F8F8FF', overflowY: 'auto' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default SIDEBARDOCENT;
