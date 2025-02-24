import { useState } from "react"
import { auth } from "../../components/Firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { useNavigate, Link } from "react-router-dom";
import logotelesecundaria763 from "../../images/logotelesecundaria763.png";

import { LoginOutlined, UserAddOutlined, TeamOutlined, HomeOutlined, InfoCircleOutlined } from "@ant-design/icons";

import Footer from "../../components/Footer.jsx";
import { FiAlignRight } from "react-icons/fi";

import { Drawer, Menu, message, Input } from "antd";

export const EnviarMensaje = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('')
    const [user, setUser] = useState('')
    const [code, setCode] = useState('')
    
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [mostrarVerificacion, setMostrarVerificacion] = useState(false);
    
    const toggleDrawer = () => setDrawerVisible(!drawerVisible);
    const handleClose = () => setDrawerVisible(false);

    const onSubmit  = async(e)=>{
        e.preventDefault()
        if (phone === '') {
            message.warning('Por favor, ingrese algun dato en el campo de telefono antes de enviar el codigo.');
        } else {
            try {
                const numTel = `+52${phone}`
                const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
                'size': 'invisible'
                })
                console.log('si se mando')
                const confirmationNumberPhone =  await signInWithPhoneNumber(auth, numTel, recaptcha)
                setUser(confirmationNumberPhone)
                message.info('¡Aviso!, Revisa en tu dispositivo en la bandeja de entrada, te enviamos un token de verificación...')
                console.log(confirmationNumberPhone)
                setMostrarVerificacion(true);
            } catch (error) {
                console.log('error al enviarr codigo; ', error)
            }
        }
    }

    const verifyCode = async(e)=>{
        e.preventDefault()
        if (code === '') {
          message.warning('Por favor, ingrese el codigo de verificación para poder hacer la confirmación')

        } else {
            try {
                const verificationCode = code;
                const confirmationResult = await user.confirm(verificationCode);
                const signedInUser = confirmationResult.user;
                message.success('¡Código verificado con éxito!')
                message.success('Usuario autenticado:')
                console.log("Usuario autenticado:", signedInUser);
                navigate('/ActualizaciónDeContraseña');
            } catch (error) {
                message.error('Error al verificar el código');
            }
        }
    }
    
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
    
        {/* Nav Superior */}
        <div className="w-full h-[60px] bg-white border-b border-gray-200 flex items-center px-4 fixed top-0 left-0 z-50">
            <button onClick={toggleDrawer} className="border-none bg-none cursor-pointer" aria-label="Abrir menú">
            <FiAlignRight className="text-2xl" />
            </button>
            <img src={logotelesecundaria763} alt="Logo" className="h-8 md:h-10 ml-4" />
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
            <Menu.Item key="5" icon={<InfoCircleOutlined />} className="text-lg">
                <Link to="/contacto">Contacto</Link>
            </Menu.Item>
            </Menu>
        </Drawer>
    
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-extrabold text-center mb-4 text-gray-800">Recuperación de Cuenta</h1>

                <p className="text-center text-gray-600 mb-8">
                    Estás utilizando el <b className="text-gray-800">método de recuperación por teléfono</b>. Por favor, ingresa tu número de teléfono para continuar.
                </p>

                <form className="space-y-6">
                
                    {/* Input para correo electrónico */}
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-gray-700 font-medium">
                            Numero de Telefono:
                        </label>
                        <Input
                            
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Ingrese su numero de telefono"
                            className="w-full rounded border border-gray-300 h-11 px-3 text-base"
                        />
                    </div>

                    {/* Botón de envío */}
                    <div>
                        <button
                            onClick={onSubmit}
                            className="w-full bg-[#800000] hover:bg-black text-white font-bold h-11 rounded transition duration-300"
                            style={{
                                backgroundColor: '#800000',
                                borderColor: 'transparent',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}
                                onMouseOver={(event) => {
                                event.currentTarget.style.backgroundColor = 'black';
                            }}
                                onMouseOut={(event) => {
                                event.currentTarget.style.backgroundColor = '#800000';
                            }}
                        >
                            Enviar SMS
                        </button>
                    </div>

                    {mostrarVerificacion && (
                        <>
                        <div className="form-group mb-3">
                            <label htmlFor="code" className="text-black"><b>Código de verificación:</b></label>
                            <input type="text" id="code" className="form-control rounded-md" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Ingrese el código de Verificación" style={{ width: '350px' }} />
                        </div>
                        <div className="form-group mb-3">
                            <button className="btn btn-success btn-block" onClick={verifyCode} style={{ width: '350px' }}>Confirmar</button>
                        </div>
                        </>
                    )}

                    <Link
                        to="/Login"
                        className="w-full block text-center bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-lg transition duration-300 shadow-md"
                    >
                        Atrás
                    </Link>

                </form>
            </div>
        </div>

        <Footer />
        </div>
    ); 
}