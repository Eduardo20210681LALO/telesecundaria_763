import { useState, useEffect } from 'react';
import { FiAlignRight } from 'react-icons/fi';
import { Avatar, Menu } from 'antd';
import { UserOutlined, FolderOutlined, HomeOutlined, TeamOutlined, BarChartOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import logotelesecundaria763 from '../images/logotelesecundaria763.png';

function getItem(label, key, icon, children) {
    return { key, icon, children, label };
}

// Menú específico para el rol de administrativo
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
    const [collapsed, setCollapsed] = useState(() => localStorage.getItem('sidebarCollapsed') === 'true');
    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKey, setSelectedKey] = useState('home');
    const navigate = useNavigate();
    const location = useLocation();

    // Configuración de la selección del menú según la ruta actual
    useEffect(() => {
        const pathToKeyMap = {
            '/administrativo/Periodos': { key: '1', open: ['sub1'] },
            '/administrativo/CrearGradoYgrupo': { key: '2', open: ['sub1'] },
            '/administrativo/Materias': { key: '3', open: ['sub1'] },
            '/administrativo/CrearDocentes': { key: '4', open: ['sub2'] },
            '/administrativo/IngresarAlumnos': { key: '5', open: ['sub3'] },
            '/administrativo/VisualizaciónAlumnosInscritos': { key: '6', open: ['sub3'] },
            '/administrativo/TodosAlum': { key: '7', open: ['sub3'] },
            '/administrativo/ActualizarDatosAlumnos': { key: '8', open: ['sub3'] },
            '/administrativo/ReinscribirAlumXAdmin': { key: '9', open: ['sub3'] },
            '/administrativo/AlumnosEgresados': { key: '10', open: ['sub3'] },
            '/administrativo/alumnos-baja': { key: '11', open: ['sub3'] },
            '/administrativo/MejoresPromediosXAdmin': { key: '12', open: ['sub4'] },
            '/administrativo/EstadisticasGeneralXAdmin': { key: '13', open: ['sub4'] },
            '/administrativo/EstadisticasGrupalXAdmin': { key: '14', open: ['sub4'] },
            '/administrativo/EstadisticasIndividualXAdmin': { key: '15', open: ['sub4'] },
            '/administrativo/Usuarios': { key: '16', open: ['sub5'] },
            '/administrativo/PerfilUADM': { key: '17', open: ['sub5'] },
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

    const CerrarSesión = () => {
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
                        {!collapsed && <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Administrador</p>}
                    </div>
                </div>

                <Menu
                    selectedKeys={[selectedKey]}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={itemsSidebar(CerrarSesión)}
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

export default SIDEBARADMIN;
