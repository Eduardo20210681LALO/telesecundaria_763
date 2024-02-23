import React from "react"
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import seis from '../images/seis.jpg';
import siete from '../images/siete.jpg';
import uno from '../images/uno.png';
import BreadCrumb from "./BreadCrumbView";

function Home() {
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

        <section className="about section" id="misión">{/* MISION */}
          <h2 className="section-title">Misión</h2>

          <div className="about__container bd-grid">
            <div className="about__img">
              <img src={seis} alt="" />
            </div>

            <div>
              <h2 className="about__subtitle">Misión</h2>
              <p className="about__text">Somos una escuela que logra un trabajo colaborativo entre dirección, docentes, personal de apoyo, alumnos(as) y padres de familia, para obtener aprendizajes significativos y lograr los objetivos de la nueva escuela mexicana.</p>
            </div>
          </div>
        </section>

        <section className="about section" id="visión">{/* VISIÓN */}
          <h2 className="section-title">Visión</h2>

          <div className="about__container bd-grid">
            <div className="about__img">
              <img src={siete} alt="" />
            </div>

            <div>
              <h2 className="about__subtitle">Aqui ira la vision</h2>
              <p className="about__text">Ser una institución reconocida por su desempeño académico y formativo, capaz de proveer a nuestros alumnos(as) conocimientos, habilidades, destrezas y aptitudes que les permita ser competentes y participar activamente en la sociedad cambiante a la que pertenecen.</p>
            </div>
          </div>
        </section>

        <section className="work section" id="valores">{/* Valores */}
          <h2 className="section-title">Valores</h2>
    
          <div className="about__container bd-grid">
            <div className="about__img">
              <img src={siete} alt="" />
            </div>

            <div>
              <h2 className="about__subtitle">Aqui ira la vision</h2>
              <p className="about__text">Puntualidad, Responsabilidad, Compromiso, Respeto, Disciplina, Empatía, Actitud de Servicio, Liderazgo, Igualdad, Resiliencia.</p>
            </div>
          </div>
        </section>

        <section className="contact section" id="quienessomos">{/* QUIENES SOMOS */}
          <h2 className="section-title">Quienes Somos</h2>

          <div className="about__container bd-grid">
            <div className="about__img">
              <img src={siete} alt="" />
            </div>

            <div>
              <h2 className="about__subtitle">Aqui ira la vision</h2>
              <p className="about__text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate cum expedita quo culpa tempora, assumenda, quis fugiat ut voluptates soluta, aut earum nemo recusandae cumque perferendis! Recusandae alias accusamus atque.</p>
            </div>
          </div>
        </section>

        <script src="https://unpkg.com/scrollreveal"></script>{/* SCROLL REVEAL */}

        {/* MAIN JS 
        <script src="ScriptHome.js"></script>*/}

      </main>
      <BreadCrumb/>
      <Footer/>
    </div>
  )
}

export default Home