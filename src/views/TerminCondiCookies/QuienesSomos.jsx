import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Nav2 from '../../components/Nav2';

function QuienesSomos() {
    return (
        <div>
            <Nav2 />
            <main className="l-main" style={{ backgroundColor: '#F5F5F5', marginTop: '80px' }}>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <Form className="border p-4" style={{ backgroundColor: '#f2f2f2' }}>
                            <h2 className="mb-4" style={{ fontWeight: 'bold' }}>Quiénes Somos</h2>
                            <Form.Group controlId="valores">
                                <Form.Label>
                                    <div className="text-center">
                                        <img
                                            src="https://d1ih8jugeo2m5m.cloudfront.net/2020/04/Qui%C3%A9nes-somos.jpg"
                                            alt="Nuestros Valores"
                                            className="img-fluid mb-4"
                                        />
                                    </div>
                                    <h3 style={{ fontWeight: 'bold' }}>Nuestros Valores</h3>
                                    <p>
                                        Nos regimos por valores fundamentales como la integridad, la responsabilidad, la
                                        inclusión y la excelencia. Creemos en la importancia de crear una comunidad educativa donde todos se sientan valorados
                                        y respetados.
                                    </p>
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="equipo">
                                <Form.Label>
                                    <div className="text-center">
                                        <img
                                            src="https://www.eloccidental.com.mx/incoming/mak6uj-profesor.jpg/ALTERNATES/LANDSCAPE_400/Profesor.jpg"
                                            alt="Nuestro Equipo"
                                            className="img-fluid mb-4"
                                        />
                                    </div>
                                    <h3 style={{ fontWeight: 'bold' }}>Nuestro Equipo</h3>
                                    <p>
                                        Contamos con un equipo de profesionales altamente capacitados y comprometidos con la educación.
                                        Nuestros docentes y personal administrativo trabajan juntos para ofrecer la mejor experiencia educativa posible.
                                    </p>
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="contacto">
                                <Form.Label>
                                    <div className="text-center">
                                        <img
                                            src="https://www.jornada.com.mx/ndjsimg/images/jornada/jornadaimg/maestro-imparte-clases-presenciales-en-oaxaca-pese-a-cuarentena-4200/6-03-maestro-imparte-clases-presenciales-en-oaxaca-pese-a-cuarentena-4200html-maestrojpeg-6173html-8c361e95-4e4d-45b5-8873-674b0e785bed.jpegrawimage=true"
                                            alt="Contáctanos"
                                            className="img-fluid mb-4"
                                        />
                                    </div>
                                    <h3 style={{ fontWeight: 'bold' }}>Contáctanos</h3>
                                    <p>
                                        Si deseas conocer más sobre nuestra institución o tienes alguna pregunta, no dudes en ponerte en contacto con nosotros.
                                        Estamos aquí para ayudarte.
                                    </p>
                                </Form.Label>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </main>
        </div>
    );
}

export default QuienesSomos;
