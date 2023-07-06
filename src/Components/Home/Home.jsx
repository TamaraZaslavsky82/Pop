import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import TAM from '../../img/TAMY.png';
import style from './Home.module.css';
import { TfiArrowCircleRight } from 'react-icons/tfi';
import vv from '../../img/vv.mp4'
import boos from '../../img/boos.png'
import css from '../../img/css.png'
import js from '../../img/js.png'
import react from '../../img/react.png'
import urban2 from '../../img/urban2.mp4'
import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillMail } from 'react-icons/ai';
import {AiOutlineArrowDown, AiFillEdit} from 'react-icons/ai'
import CommentForm from './CommentForm/CommentForm';
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Scenne from '../Scenne/Scenne.js';

export default function Home() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [mostrarBotones, setMostrarBotones] = useState(false);
  const [mostrarSeccion1, setMostrarSeccion1] = useState(false);
  const [mostrarSeccion2, setMostrarSeccion2] = useState(false);
  const [mostrarSeccion3, setMostrarSeccion3] = useState(false);
  
  const [mostrarModalSeccion1, setMostrarModalSeccion1] = useState(false);
  const [mostrarModalSeccion2, setMostrarModalSeccion2] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setNombreUsuario(event.target.value);
      event.target.value = '';
    }
  };

  useEffect(() => {
    if (nombreUsuario !== '') {
      setMostrarBotones(true);
    }
  }, [nombreUsuario]);

  const handleMostrarProyectos = () => {
    setMostrarSeccion1(true);
    setMostrarSeccion2(true);
  };
  const handleMostrarTecnoligias = () => {
    setMostrarSeccion3(true);
 
  };

  const handleCerrarModalSeccion1 = () => {
    setMostrarModalSeccion1(false);
  };

  const handleCerrarModalSeccion2 = () => {
    setMostrarModalSeccion2(false);
  };

  const handleEmailClick = () => {
    const email = 'tamaraanabellazaslavsky@gmail.com';
    const subject = 'Consulta';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    window.location.href = mailtoLink;
  };

  function handleDownload() {
    const pdfUrl = process.env.PUBLIC_URL + '/CvTamaraZaslavsky.pdf';
    // Reemplaza con la ruta o URL de tu archivo PDF
    window.open(pdfUrl, '_blank');
  }
  return (
 
    
    <div className={`container-fluid ${style.contenedor}`}>
      <div className={style.comentarios}>
        <AiFillEdit style={{fontSize:'25px',  color: 'rgb(238, 10, 200)'}}/>
        <Link to='/comentarios'>
      <BsFillChatRightDotsFill style={{fontSize:'25px',  color: 'blue', marginLeft:'30px'}}/>
      </Link>
      </div>
      <a href="https://github.com/TamaraZaslavsky82" target="_blank" rel="noopener noreferrer">
        <AiFillGithub style={{ color: 'violet', marginLeft: '10vh', marginTop: '5vh', fontSize: '30px' }} />
      </a>
      <a href="https://www.linkedin.com/in/tamarazaslavsky/" target="_blank" rel="noopener noreferrer">
        <AiFillLinkedin style={{ color: 'aqua', marginLeft: '10vh', marginTop: '5vh', fontSize: '30px' }} />
      </a>
      <AiFillMail style={{ color: 'blue', marginLeft: '10vh', marginTop: '5vh', fontSize: '30px' }} onClick={handleEmailClick} />
      <AiOutlineArrowDown style={{ color: 'rgb(236, 64, 122)', marginLeft: '10vh', marginTop: '5vh', fontSize: '30px' }} onClick={handleDownload}/>
      <div className={`row ${style.row}`}>
        <div className={`col-12 col-md-6 d-flex align-items-center ${style.texto}`}>
          <h1 className={style.hola}>
            Hola, <strong><span style={{ color: 'aqua' }}>{nombreUsuario}</span></strong>!
            <br />Bienvenido a mi Porfolio
          </h1>
          {nombreUsuario === '' ? (
            <>
              <h4 className={style.nombre}>Por favor ingresa tu nombre</h4>
              <input className={style.input} type="text" onKeyPress={handleKeyPress} />
            </>
          ) : null}
          {nombreUsuario !== '' && (
            <p className={style.animacionTexto}>
              Quería contarte un poco sobre mí. Soy Dev Full Stack, una de las cosas que más me gusta de la programación es poder combinar la experiencia que tengo en diseño gráfico y diseño UI/UX, esto me brinda la posibilidad de desarrollar todo aquello que pueda imaginar. Tengo la posibilidad de adaptarme a diferentes proyectos, metas y conocimientos que se presentan, ya que cuento con una escucha activa constante y la capacidad de resolución y creatividad de problemas o conflictos que se presenten, mediante las herramientas y conocimientos con los que cuento.
            </p>
          )}
          {mostrarBotones && (
            <div>
              <button className={style.b1} onClick={handleMostrarProyectos}>
                Proyectos
              </button>
              
            </div>
          )}
        </div>
        <div className={`col-6 col-md-3 d-flex justify-content-center align-items-center ${style.imagen}`}>
          {/* <img src={TAM} alt="tam" className={`img-thumbnail`} style={{ height: '80vh' }} /> */}
          
          <Scenne/>
        </div>
      </div>
      <div>
        
      </div>
      <div className={style.container}>
        {mostrarSeccion1 && (
          <div className={`${style.seccion} ${style.section1}`}>
            <TfiArrowCircleRight
              style={{ marginLeft: '450px', fontSize: '30px', marginTop: '20px', color: 'white' }}
              onClick={() => setMostrarModalSeccion1(true)}
            />
            <h2 className={style.visti}>Visti e Viaggi</h2>
            <p className={style.visti2}>Conoce más sobre el proyecto</p>
          </div>
        )}

        {mostrarSeccion2 && (
          <div className={`${style.seccion} ${style.section2}`}>
            <TfiArrowCircleRight
              style={{ marginLeft: '450px', fontSize: '30px', marginTop: '20px', color: 'white' }}
              onClick={() => setMostrarModalSeccion2(true)}
            />
            <h2 className={style.visti}>UrbanBuy</h2>
            <p className={style.visti2}>Conoce más sobre el proyecto</p>
          </div>
        )}
        {mostrarSeccion3 && (
          <div className={`${style.seccion} ${style.section1}`}>
            <TfiArrowCircleRight
              style={{ marginLeft: '450px', fontSize: '30px', marginTop: '20px', color: 'white' }}
              onClick={() => setMostrarModalSeccion1(true)}
            />
            <h2 className={style.visti}>Visti e Viaggi</h2>
           
            <p className={style.visti2}>Conoce más sobre el proyecto</p>
          </div>
        )}
      </div>
      <Modal isOpen={mostrarModalSeccion1} onRequestClose={handleCerrarModalSeccion1}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <video src={vv} controls style={{ width: '50%' }} />
          <div style={{ marginLeft: '50px' }}>
            <h3 style={{ backgroundColor: 'rgb(247,220,111)', padding: '2vh', borderRadius: '10px', color: 'rgb(48, 47, 47)' }}>Tecnologias utilizadas:</h3>
            <img src={boos} alt="Imagen 1" style={{ width: '100px', height: '100px' }} />
            <img src={css} alt="Imagen 2" style={{ width: '100px', height: '100px' }} />
            <img src={js} alt="Imagen 3" style={{ width: '100px', height: '100px' }} />
            <img src={react} alt="Imagen 3" style={{ width: '100px', height: '100px' }} />
          </div>
        </div>
        <p>
          <strong>Viaggi e Visti</strong>
          <br /><br />
          Es una plataforma creada para realizar reservas de vuelos a diferentes partes del mundo. La aplicación cuenta con una interfaz intuitiva y amigable para el usuario, permitiendo seleccionar destinos, fechas y preferencias de viaje. También ofrece información detallada sobre los vuelos disponibles, precios, duración del viaje y opciones de alojamiento. El objetivo de Viaggi e Visti es brindar a los usuarios una experiencia cómoda y segura al reservar sus vuelos.
        </p>
        <a href='https://repo-vv.vercel.app'>Vista el sitio web</a>
        <button className={style.b2} onClick={handleCerrarModalSeccion1}>
          Cerrar
        </button>
      </Modal>

      <Modal isOpen={mostrarModalSeccion2} onRequestClose={handleCerrarModalSeccion2}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <video src={urban2} controls style={{ width: '50%' }} />
          <div style={{ marginLeft: '50px' }}>
            <h3 style={{ backgroundColor: 'rgb(247,220,111)', padding: '2vh', borderRadius: '10px', color: 'rgb(48, 47, 47)' }}>Tecnologias utilizadas:</h3>
            <img src={boos} alt="Imagen 1" style={{ width: '100px', height: '100px' }} />
            <img src={css} alt="Imagen 2" style={{ width: '100px', height: '100px' }} />
            <img src={js} alt="Imagen 3" style={{ width: '100px', height: '100px' }} />
            <img src={react} alt="Imagen 3" style={{ width: '100px', height: '100px' }} />
          </div>
        </div>
        <p>
          <strong>UrbanBuy</strong>
          <br /><br />
          UrbanBuy es una aplicación de comercio electrónico diseñada para ofrecer una experiencia de compra única. Permite a los usuarios explorar y comprar una amplia variedad de productos, desde ropa y accesorios hasta electrónica y artículos para el hogar. La aplicación cuenta con funciones avanzadas de búsqueda, recomendaciones personalizadas y un proceso de compra seguro. UrbanBuy se esfuerza por brindar a sus usuarios la mejor experiencia de compra en línea posible.
        </p>
        <a href='https://urbanbuy.netlify.app'>Visita el sitio web</a>
        <button className={style.b2} onClick={handleCerrarModalSeccion2}>
          Cerrar
        </button>
      </Modal>
      
    </div>
    
  );
}
