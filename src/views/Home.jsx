import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import uno from '../images/uno.png';//se usa

import Imagen1 from '../images/Imagen1.jpg';
import Imagen2 from '../images/Imagen2.jpg';
import Imagen3 from '../images/Imagen3.jpeg';
import Imagen4 from '../images/Imagen4.jpeg';
import Imagen5 from '../images/Imagen5.jpg';
import Imagen6 from '../images/Imagen6.jpg';

import work1 from '../images/work1.jpg';
import work2 from '../images/work2.jpg';
import work3 from '../images/work3.jpg';



import BreadCrumb from "./BreadCrumbView";

import InstallPWA from "../components/InstallPWA";


function Home() {
  return (
    <div>
      <Nav/>
      <InstallPWA />
      <main className="l-main" style={{ backgroundColor: '#F5F5F5' }}>
        <section className="home bd-grid" id="inicio">{/* HOME */}
          <div className="home__data">
            <h1 className="home__title" style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: '3.5rem' }}>
              Bienvenido<br />
              Al portal<br />
              <span className="home__title-color">TeleSecundaria 763</span>
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
                    <img src={Imagen1} alt="" className="img-fluid rounded mx-auto d-block" style={{ width: 'auto', height: '300px' }} />
                  </div>
                  <div>
                    <img src={Imagen2} alt="" className="img-fluid rounded mx-auto d-block" style={{ width: 'auto', height: '300px' }} />
                  </div>
                  <div>
                    <img src={Imagen3} alt="" className="img-fluid rounded mx-auto d-block" style={{ width: 'auto', height: '300px' }} />
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
                    <img src={Imagen4} alt="" className="img-fluid rounded mx-auto d-block" style={{ width: 'auto', height: '300px' }} />
                  </div>
                  <div>
                    <img src={Imagen5} alt="" className="img-fluid rounded mx-auto d-block" style={{ width: 'auto', height: '300px' }} />
                  </div>
                  <div>
                    <img src={Imagen6} alt="" className="img-fluid rounded mx-auto d-block" style={{ width: 'auto', height: '300px' }} />
                  </div>
                </Slider>
              </div>
              <div className="col-lg-6 order-lg-first">
                <p className="about__text" style={{ color: '#333', fontWeight: 'bold' }}>Ser una institución reconocida por su desempeño académico y formativo, capaz de proveer a nuestros alumnos(as) conocimientos, habilidades, destrezas y aptitudes que les permita ser competentes y participar activamente en la sociedad cambiante a la que pertenecen.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about section" id="valores">
          <div className="container">
            <h2 className="section-title" style={{ color: '#7d0430' }}>Valores</h2>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <Slider autoplay={true} autoplaySpeed={3000}>
                  <div>
                    <img src={work1} alt="" className="img-fluid rounded mx-auto d-block" style={{ width: 'auto', height: '300px' }} />
                  </div>
                  <div>
                    <img src={work2} alt="" className="img-fluid rounded mx-auto d-block" style={{ width: 'auto', height: '300px' }} />
                  </div>
                  <div>
                    <img src={work3} alt="" className="img-fluid rounded mx-auto d-block" style={{ width: 'auto', height: '300px' }} />
                  </div>
                </Slider>
              </div>
              <div className="col-lg-6">
                <p className="about__text" style={{ color: '#333', fontWeight: 'bold' }}>Puntualidad, Responsabilidad, Compromiso, Respeto, Disciplina, Empatía, Actitud de Servicio, Liderazgo, Igualdad, Resiliencia.</p>
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
