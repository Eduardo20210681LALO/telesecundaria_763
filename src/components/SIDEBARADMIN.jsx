import { useState, useEffect } from 'react';
import { FiAlignRight } from 'react-icons/fi'; // Icono de menú
import { Avatar, Menu } from 'antd'; // Componente de Avatar y Menu de Ant Design
import { UserOutlined, FolderOutlined, HomeOutlined, TeamOutlined, BarChartOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Agregamos useLocation para detectar la ruta actual
import Cookies from 'js-cookie'; // Importamos Cookies para borrar cookies
import logotelesecundaria763 from '../images/logotelesecundaria763.png'; // Imagen del logotipo

function getItem(label, key, icon, children) {
    return { key, icon, children, label };
}

const itemsSidebar = (CerrarSesión) => [
    getItem(<Link to="/HomeAdmin">Inicio</Link>, 'home', <HomeOutlined />),
    getItem('SISTEMA', 'sub1', <FolderOutlined />, [
        getItem(<Link to="/Periodos">Períodos</Link>, '1'),
        getItem(<Link to="/CrearGradoYgrupo">Grados y Grupos</Link>, '2'),
        getItem(<Link to="/Materias">Materias</Link>, '3'),
    ]),
    getItem('DOCENTES', 'sub2', <UserOutlined />, [
        getItem(<Link to="/CrearDocentes">Crear Docentes</Link>, '4'),
        getItem(<Link to="/OtorgarGradoXGrupoDocente">Asig. Grupo Doc</Link>, '5'),
    ]),
    getItem('ALUMNOS', 'sub3', <TeamOutlined />, [
        getItem(<Link to="/IngresarAlumnos">Ingresar Alumnos</Link>, '6'),
        getItem(<Link to="/VisualizaciónAlumnosInscritos">Inscribir Alumnos</Link>, '7'),
        getItem(<Link to="/TodosAlum">Todos los Alumnos</Link>, '8'),
        getItem(<Link to="/ActualizarDatosAlumnos">Actualizar Datos</Link>, '9'),
        getItem(<Link to="/ReinscribirAlumXAdmin">Reinscribir Alumnos</Link>, '10'),
        getItem(<Link to="/AlumnosEgresados">Alumnos Egresados</Link>, '11'),
        getItem(<Link to="/alumnos-baja">Alumnos Baja</Link>, '12'),
    ]),
    getItem('ESTADÍSTICAS', 'sub4', <BarChartOutlined />, [
        getItem(<Link to="/MejoresPromediosXAdmin">Mejores Promedios</Link>, '13'),
        getItem(<Link to="/EstadisticasGeneralXAdmin">Estadísticas General</Link>, '14'),
        getItem(<Link to="/EstadisticasGrupalXAdmin">Estadísticas Grupal</Link>, '15'),
        getItem(<Link to="/EstadisticasIndividualXAdmin">Estadísticas Indiv.</Link>, '16'),
    ]),
    getItem('AJUSTES', 'sub5', <SettingOutlined />, [
        getItem(<Link to="/Usuarios">Usuarios</Link>, '17'),
        getItem(<Link to="/PerfilUADM">Mi Perfil</Link>, '18'),
    ]),
    getItem(
        <span onClick={CerrarSesión} style={{ cursor: 'pointer' }}>Cerrar Sesión</span>, 
        'logout', 
        <LogoutOutlined />
    ),
];

function SIDEBARADMIN({ children }) {
    const [collapsed, setCollapsed] = useState(() => {
        // Lee el estado inicial de `collapsed` de `localStorage`, si no existe usa `false` por defecto
        return localStorage.getItem('sidebarCollapsed') === 'true';
    });

    const [openKeys, setOpenKeys] = useState([]); // Estado para manejar los menús abiertos
    const [selectedKey, setSelectedKey] = useState('home'); // Mantener la clave seleccionada

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Mantener la selección del menú según la ruta actual
        if (location.pathname.includes('/Periodos')) {
            setSelectedKey('1');
            setOpenKeys(['sub1']); // Mantén abierto el submenú 'SISTEMA'
        } else if (location.pathname.includes('/CrearGradoYgrupo')) {
            setSelectedKey('2');
            setOpenKeys(['sub1']); // Mantén abierto el submenú 'SISTEMA'
        } else if (location.pathname.includes('/Materias')) {
            setSelectedKey('3');
            setOpenKeys(['sub1']); // Mantén abierto el submenú 'SISTEMA'
        } else if (location.pathname.includes('/CrearDocentes')) {
            setSelectedKey('4');
            setOpenKeys(['sub2']); // Mantén abierto el submenú 'DOCENTES'
        } else if (location.pathname.includes('/OtorgarGradoXGrupoDocente')) {
            setSelectedKey('5');
            setOpenKeys(['sub2']); // Mantén abierto el submenú 'DOCENTES'
        } else if (location.pathname.includes('/IngresarAlumnos')) {
            setSelectedKey('6');
            setOpenKeys(['sub3']); // Mantén abierto el submenú 'ALUMNOS'
        } else if (location.pathname.includes('/VisualizaciónAlumnosInscritos')) {
            setSelectedKey('7');
            setOpenKeys(['sub3']); // Mantén abierto el submenú 'ALUMNOS'
        } else if (location.pathname.includes('/TodosAlum')) {
            setSelectedKey('8');
            setOpenKeys(['sub3']); // Mantén abierto el submenú 'ALUMNOS'
        } else if (location.pathname.includes('/ActualizarDatosAlumnos')) {
            setSelectedKey('9');
            setOpenKeys(['sub3']); // Mantén abierto el submenú 'ALUMNOS'
        } else if (location.pathname.includes('/ReinscribirAlumXAdmin')) {
            setSelectedKey('10');
            setOpenKeys(['sub3']); // Mantén abierto el submenú 'ALUMNOS'
        } else if (location.pathname.includes('/AlumnosEgresados')) {
            setSelectedKey('11');
            setOpenKeys(['sub3']); // Mantén abierto el submenú 'ALUMNOS'
        } else if (location.pathname.includes('/alumnos-baja')) {
            setSelectedKey('12');
            setOpenKeys(['sub3']); // Mantén abierto el submenú 'ALUMNOS'
        } else if (location.pathname.includes('/MejoresPromediosXAdmin')) {
            setSelectedKey('13');
            setOpenKeys(['sub4']); // Mantén abierto el submenú 'ESTADÍSTICAS'
        } else if (location.pathname.includes('/EstadisticasGeneralXAdmin')) {
            setSelectedKey('14');
            setOpenKeys(['sub4']); // Mantén abierto el submenú 'ESTADÍSTICAS'
        } else if (location.pathname.includes('/EstadisticasGrupalXAdmin')) {
            setSelectedKey('15');
            setOpenKeys(['sub4']); // Mantén abierto el submenú 'ESTADÍSTICAS'
        } else if (location.pathname.includes('/EstadisticasIndividualXAdmin')) {
            setSelectedKey('16');
            setOpenKeys(['sub4']); // Mantén abierto el submenú 'ESTADÍSTICAS'
        } else if (location.pathname.includes('/Usuarios')) {
            setSelectedKey('17');
            setOpenKeys(['sub5']); // Mantén abierto el submenú 'AJUSTES'
        } else if (location.pathname.includes('/PerfilUADM')) {
            setSelectedKey('18');
            setOpenKeys(['sub5']);
        } else {
            setSelectedKey('home');
            setOpenKeys([]); // Cierra todos los submenús
        }
    }, [location]);

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey) {
            setOpenKeys([latestOpenKey]); // Solo permite un menú abierto
        } else {
            setOpenKeys([]);
        }
    };

    const toggleSidebar = () => {
        // Cambiamos el estado de `collapsed` y lo guardamos en `localStorage`
        setCollapsed((prevState) => {
            const newCollapsedState = !prevState;
            localStorage.setItem('sidebarCollapsed', newCollapsedState); // Almacena en localStorage
            return newCollapsedState;
        });
    };

    const CerrarSesión = () => {
        BorrarCookies();
        localStorage.removeItem('idUsuario'); // Elimina solo el ID del usuario, ajusta 'userId' al nombre correcto
        navigate('/Home'); // Redirige al home
    };

    const BorrarCookies = () => {
        // Borra la cookie del token o cualquier cookie relevante
        Cookies.remove('token'); // Si la cookie tiene un nombre diferente, cámbialo aquí
        // Si la cookie tiene un dominio o ruta específicos, inclúyelos como parámetros
        // Cookies.remove('token', { path: '/', domain: 'your-domain.com' });
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
                    selectedKeys={[selectedKey]}
                    openKeys={openKeys} // Controlamos qué submenús están abiertos
                    onOpenChange={onOpenChange} // Cambia el estado al abrir/cerrar submenús
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={itemsSidebar(CerrarSesión)}
                    style={{
                        '--antd-selected-bg': 'rgba(125, 4, 48, 0.5)', // Guinda bajito con transparencia
                        '--antd-highlight-color': '#7d0430', // Guinda fuerte para el texto
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
                        <button onClick={toggleSidebar} style={{ border: 'none', background: 'none', cursor: 'pointer', marginRight: '10px' }}>
                            <FiAlignRight style={{ fontSize: '24px' }} />
                        </button>

                        <img src={logotelesecundaria763} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>Telesecundaria 763</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar size={40} icon={<UserOutlined />} />
                        <div style={{ marginLeft: '10px', textAlign: 'right' }}>
                            <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>Juan Perez</p>
                            <p style={{ margin: 0, color: '#888' }}>Administrador</p>
                        </div>
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
