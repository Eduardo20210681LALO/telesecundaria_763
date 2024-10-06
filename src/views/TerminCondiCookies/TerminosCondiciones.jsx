import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

function TerminosCondiciones() {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={10}>
                <Form className="border p-4" style={{ backgroundColor: '#f2f2f2', marginTop: '60px' }}>

                        <h2 className="mb-4" style={{ fontWeight: 'bold' }}>Términos y Condiciones</h2>
                        <Form.Group controlId="terminosCondiciones">
                            <Form.Label>Escuela TeleSecundaria 763, con domicilio Tepexititla, Huejutla de Reyes, CP. 43005, Hidalgo, México, es el responsable del tratamiento de los datos personales que maneja, los cuales serán protegidos conforme a lo dispuesto por la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados, y demás normatividad que resulte aplicable.</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="plataformaEvaluativa">
                            <Form.Label><strong>Plataforma de Evaluación Educativa:</strong>Ofrecemos una plataforma en línea que permite a los usuarios, como docentes y administrativos, capturar la gestión de calificaciones de los alumnos de esta institución así mismo como el gestionar de manera gráfica los resultados obtenidos en cada periodo para una mejor toma de decisiones.</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="registroUsuario">
                            <Form.Label><strong>Registro de Usuario:</strong>Los usuarios pueden registrarse en la plataforma proporcionando información precisa y completa, previa validación por la parte administrativa. Los usuarios pueden capturar las calificaciones de cada uno de los alumnos, así como generar informes detallados.</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="privacidadProteccion">
                            <Form.Label><strong>Privacidad y Protección de Datos:</strong>La información personal proporcionada durante el registro y el uso de la plataforma está sujeta a nuestra Política de Privacidad. Nos comprometemos a respetar la privacidad y a utilizar tus datos de manera responsable y segura.</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="limitacionResponsabilidad">
                            <Form.Label><strong>Limitación de Responsabilidad:</strong>La escuela Telesecundaria 763 no asumirá responsabilidad por daños directos, indirectos, incidentales o consecuentes derivados del uso de la plataforma. Los usuarios reconocen y aceptan que la Plataforma de Evaluación Educativa no garantiza la disponibilidad continua e ininterrumpida del servicio, y no será responsable por interrupciones en el mismo.</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="usoAceptable">
                            <Form.Label><strong>Uso Aceptable:</strong>Los usuarios se comprometen a utilizar la plataforma de manera ética y legal, evitando actividades que puedan dañarla o interferir con el uso de otros usuarios. La Telesecundaria 763 no se hace responsable por el mal uso de la plataforma por parte de los usuarios, incluido, pero no limitado a, la publicación de contenido ilegal o inapropiado.</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="propiedadIntelectual">
                            <Form.Label><strong>Propiedad Intelectual:</strong>La Telesecundaria 763 retiene los derechos de propiedad sobre el software, el diseño y demás elementos de la plataforma. Los usuarios conservan la propiedad del contenido que suben, sin embargo, otorgan a la Plataforma de Evaluación Educativa una licencia no exclusiva para utilizar, reproducir y distribuir dicho contenido dentro del ámbito de la plataforma.</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="marcoLegal">
                            <Form.Label><strong>Marco Legal:</strong>Protección de Datos y Privacidad: Los usuarios consienten que la recolección y el manejo de sus datos personales se rigen por nuestra Política de Privacidad, la cual está alineada con las leyes de privacidad vigentes.</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="derechosAutor">
                            <Form.Label><strong>Derechos de Autor y Propiedad Intelectual:</strong>Todo el contenido proporcionado por Telesecundaria 763 a través de la plataforma está protegido por derechos de autor. Los usuarios conservan la propiedad del contenido que comparten, concediendo a la plataforma una licencia limitada para su uso exclusivamente dentro de la misma.</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="leyesInternet">
                            <Form.Label><strong>Leyes de Uso en Internet:</strong>Los usuarios se comprometen a utilizar la plataforma de manera ética y legal, cumpliendo con todas las leyes y regulaciones aplicables en el uso de Internet.</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="accesibilidad">
                            <Form.Label><strong>Accesibilidad:</strong>Telesecundaria 763 se esfuerza por cumplir con las leyes de accesibilidad web para garantizar un acceso equitativo a todos los usuarios.</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="proteccionConsumidor">
                            <Form.Label><strong>Protección del Consumidor:</strong>La plataforma sigue principios de transparencia y equidad en sus interacciones con los usuarios, adhiriéndose a las leyes de protección al consumidor correspondientes.</Form.Label>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default TerminosCondiciones;
