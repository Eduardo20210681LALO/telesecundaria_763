import { useState } from "react"
import { auth } from "../../components/Firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Nav2 from "../../components/Nav2";
import { message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import logotelesecundaria763 from "../../images/logotelesecundaria763.png";

export const EnviarMensaje = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('')
    const [user, setUser] = useState('')
    const [code, setCode] = useState('')
    const [mostrarVerificacion, setMostrarVerificacion] = useState(false);

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
        <div>
            <Nav2 />
            <div className="container-fluid" style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: '110vh' }}>
                    <div  className="col-md-4">
                        <div className="card p-4 shadow text-center">
                        <div style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                            <img src={logotelesecundaria763} alt="Logo de la Empresa" className="company-logo-olvi" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        </div>
                        <h2 className="mb-1 text-magenta">Recuperación de Contraseña</h2>
                        <p className="text-muted mb-4">Introduce tu correo electrónico y revisa tu bandeja de entrada el token de verificación que te enviaremos.</p>
                            <div className="d-flex align-items-center justify-content-center h-100">
                                <div id="recaptcha"></div>
                                <form>
                                    <div className="form-group mb-3">
                                        <label htmlFor="phone" className="form-label"><b>Número de teléfono:</b></label>
                                        <input type="tel" id="phone" className="form-control rounded-md" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Ingrese su número de Teléfono" style={{ width: '350px' }} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <button className="btn btn-primary btn-block" onClick={onSubmit} style={{ width: '350px' }}>Enviar</button>
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
                                    <div className="form-group mb-3">
                                        <Link to="/Login" className="btn btn-secondary btn-block" style={{ width: '350px', backgroundColor: '#A9A9A9', borderColor: 'transparent', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}>Atrás</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}