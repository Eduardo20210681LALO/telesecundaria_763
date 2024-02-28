import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import uno from '../images/uno.png';

import seis from '../images/seis.jpg';
import siete from '../images/siete.jpg';
import Imagen8 from '../images/Imagen8.jpg'

import work1 from '../images/work1.jpg';
import work2 from '../images/work2.jpg';
import work3 from '../images/work3.jpg';

import BreadCrumb from "./BreadCrumbView";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div>
      <Nav/>
      <main className="l-main">
        <section className="home bd-grid" id="home">{/* HOME */}
          <div className="home__data">
            <h1 className="home__title" style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '3.5rem' }}>
              Bienvenido<br />
              Al portal<br />
              <span className="home__title-color">TeleSecundaria 763.</span>
            </h1>
            <Link to="/login" className="button" style={{textDecoration: 'none'}}>Inicio de sesión</Link>
          </div>

          <div className="home__social">
            <a href="#" className="home__social-icon"><i className='bx bxl-google'></i></a>
            <a href="#" className="home__social-icon"><i className='bx bxl-facebook'></i></a>
            <a href="#" className="home__social-icon"><i className='bx bxl-instagram'></i></a>
          </div>
          <div className="home__img" style={{ clipPath: 'ellipse(50% 50% at 50% 50%)', backgroundColor: '#7d0430', marginTop: '-60px' }}>
            <img src={uno} alt="TeleSecundaria 763" />
          </div>
        </section>

        <section className="about section" id="misión">
          <div className="container">
            <h2 className="section-title" style={{ color: '#7d0430' }}>Misión</h2>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <Slider autoplay={true} autoplaySpeed={3000}>
                  <div>
                    <img src={seis} alt="" className="img-fluid rounded mx-auto d-block" style={{ maxWidth: '100%', height: 'auto' }} />
                  </div>
                  <div>
                    <img src={Imagen8} alt="" className="img-fluid rounded mx-auto d-block" style={{ maxWidth: '100%', height: 'auto' }} />
                  </div>
                  <div>
                    <img src={siete} alt="" className="img-fluid rounded mx-auto d-block" style={{ maxWidth: '100%', height: 'auto' }} />
                  </div>
                </Slider>
              </div>
              <div className="col-lg-6">
                <p className="about__text" style={{ color: '#333', fontWeight: 'bold' }}>Somos una escuela que logra un trabajo colaborativo entre dirección, docentes, personal de apoyo, alumnos(as) y padres de familia, para obtener aprendizajes significativos y lograr los objetivos de la nueva escuela mexicana.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about section" id="visión">
          <div className="container">
            <h2 className="section-title" style={{ color: '#7d0430' }}>Visión</h2>
            <div className="row align-items-center">
              <div className="col-lg-6 order-lg-last">
                <Slider autoplay={true} autoplaySpeed={3000}>
                  <div>
                    <img src={work1} alt="" className="img-fluid rounded mx-auto d-block" style={{ maxWidth: '70%', height: 'auto' }} />
                  </div>
                  <div>
                    <img src={work2} alt="" className="img-fluid rounded mx-auto d-block" style={{ maxWidth: '70%', height: 'auto' }} />
                  </div>
                  <div>
                    <img src={work3} alt="" className="img-fluid rounded mx-auto d-block" style={{ maxWidth: '70%', height: 'auto' }} />
                  </div>
                </Slider>
              </div>
              <div className="col-lg-6 order-lg-first">
                <p className="about__text" style={{ color: '#333', fontWeight: 'bold' }}>Ser una institución reconocida por su desempeño académico y formativo, capaz de proveer a nuestros alumnos(as) conocimientos, habilidades, destrezas y aptitudes que les permita ser competentes y participar activamente en la sociedad cambiante a la que pertenecen.</p>
              </div>
            </div>
          </div>
        </section>


        <section className="contact section" id="quienessomos">
          <div className="container">
            <h2 className="section-title" style={{ color: '#7d0430', textAlign: 'center' }}>Quienes Somos</h2>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <p style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
                  La Telesecundaria 763 inició actividades en el año 1996 con la visión de ofrecer educación de calidad a los estudiantes de la comunidad. Se encuentra ubicada en Carretera Nacional Huejutla-Orizatlan Kilometro 4 Tepexititla, Huejutla De Reyes, Hidalgo CP. 43005.
                </p>
                <p style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
                  A lo largo de estos años, la Telesecundaria 763 ha destacado por contar con personal docente altamente calificado que busca fomentar no solo la formación académica de los alumnos, sino también sus valores, capacidades artísticas y deportivas.
                </p>
                <p style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
                  Actualmente, la Telesecundaria 763 atiende a una población estudiantil de 233 alumnos distribuidos en grupos desde primer hasta tercer grado. Asimismo, cuenta con una plantilla de 11 profesores entusiastas y una dirección escolar comprometida.
                </p>
                <p style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
                  La infraestructura de la escuela permite el desarrollo de actividades formativas variadas que van desde aulas equipadas, biblioteca, áreas verdes, canchas deportivas, entre otros espacios. Todo para garantizar un aprendizaje dinámico.
                </p>
                <p style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
                  Entre los logros más destacados de la Telesecundaria 763 se encuentran:
                </p>
                <ul>
                  <li style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>Porcentajes de aprobación superiores al 95% en los últimos 5 años.</li>
                  <li style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>Selección de alumnos en competencias de conocimiento regionales.</li>
                  <li style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>Actividades extracurriculares premiadas a nivel estatal, como la banda de guerra.</li>
                  <li style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>Graduación consistente de alumnos que ingresan a nivel medio superior.</li>
                </ul>
                <p style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
                  Como se puede apreciar, en sus más de 30 años la Telesecundaria 763 se ha consolidado por su excelencia académica y formación integral, convirtiéndose en una institución educativa de gran prestigio en la región.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <BreadCrumb/>
      <Footer/>
     
    </div>
  )
}

export default Home;
