import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const Scene = () => {
  const mountRef = useRef(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    const camera = new THREE.PerspectiveCamera(
      25,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    scene.add(camera);
    camera.position.z = 6;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Background texture
    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load('/models/busmodel/noche.jpg');
    scene.background = backgroundTexture;

    // Loader
    const gltfLoader = new GLTFLoader();
    const objLoader = new OBJLoader();

    let busModel = null;
    let moon = null;
    let EDIFICIO2 = null;
    let EDIFICIO1 = null;

    gltfLoader.load(
      '/models/busmodel/Busstation.glb',
      (gltf) => {
        busModel = gltf.scene;
        scene.add(busModel);
        busModel.position.set(0, -1.2, 0);
        busModel.scale.set(0.15, 0.15, 0.15);

        busModel.traverse((node) => {
          if (node.isMesh) {
            node.userData = { clickable: true };
            node.material.transparent = true;
            node.material.opacity = 1;
            node.cursor = 'pointer'; // Cambia el cursor a una mano cuando el mouse esté sobre el modelo
          }
        });

        busModel.addEventListener('mouseover', handleMouseOver);
        busModel.addEventListener('mouseout', handleMouseOut);
        busModel.addEventListener('click', handleModelClick);
      },
      () => {},
      () => {}
    );

    // Agregar listener de eventos al montaje de la escena
    currentMount.addEventListener('click', handleClick);

    // Función de control de eventos de clic
    function handleClick(event) {
      const { offsetX, offsetY } = event;
      const mouse = new THREE.Vector2();
      mouse.x = (offsetX / currentMount.clientWidth) * 2 - 1;
      mouse.y = -(offsetY / currentMount.clientHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      for (let i = 0; i < intersects.length; i++) {
        const { object } = intersects[i];
        if (object.userData.clickable) {
          setShowText(true);
          break;
        }
      }
    }

    gltfLoader.load(
      '/models/busmodel/EDIFICIO2.glb',
      (gltf) => {
        EDIFICIO2 = gltf.scene;
        scene.add(EDIFICIO2);

        const desiredHeight = 2; // Altura deseada del modelo
        const scaleFactor = desiredHeight / EDIFICIO2.scale.y;
        EDIFICIO2.scale.y = desiredHeight;

        // Escalar los ejes X y Z en la misma proporción para mantener las proporciones originales
        EDIFICIO2.scale.x *= scaleFactor;
        EDIFICIO2.scale.z *= scaleFactor;

        EDIFICIO2.position.set(0.010, 0.4, 1.2);
        EDIFICIO2.scale.set(0.15, 0.15, 0.15);

        EDIFICIO2.rotateY(Math.PI / 2.1)
      },
      () => {},
      () => {}
    );

    gltfLoader.load(
      '/models/busmodel/EDIFICIO1.glb',
      (gltf) => {
        EDIFICIO1 = gltf.scene;
        scene.add(EDIFICIO1);

        const desiredHeight = 2; // Altura deseada del modelo
        const scaleFactor = desiredHeight / EDIFICIO1.scale.y;
        EDIFICIO1.scale.y = desiredHeight;

        // Escalar los ejes X y Z en la misma proporción para mantener las proporciones originales
        EDIFICIO1.scale.x *= scaleFactor;
        EDIFICIO1.scale.z *= scaleFactor;

        EDIFICIO1.position.set(0.015, 0.4, -1);
        EDIFICIO1.scale.set(0.15, 0.15, 0.15);

        EDIFICIO1.rotateY(Math.PI / 2.1)
      },
      () => {},
      () => {}
    );

    gltfLoader.load(
      '/models/busmodel/moon.glb',
      (gltf) => {
        moon = gltf.scene;
        scene.add(moon);
        moon.position.set(2, 0.5, 0.5);
        moon.scale.set(0.15, 0.15, 0.15);
      },
      () => {},
      () => {}
    );

    // Lights
    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const ambientLight = new THREE.AmbientLight(0xffd7b2, 1.5);
    scene.add(ambientLight);

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Clean up scene
    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  const handleMouseOver = () => {
    mountRef.current.style.cursor = 'pointer';
  };

  const handleMouseOut = () => {
    mountRef.current.style.cursor = 'auto';
  };

  const handleModelClick = () => {
    setShowText(true);
  };

  const handleCloseClick = () => {
    setShowText(false);
  };

  return (
    <div
      className="contenedor3d"
      style={{ width: "100vh", height: "70vh", marginLeft: '100px', marginTop: '-20px' }}
      ref={mountRef}
    >
      {showText && (
        <div
          style={{
           display: 'block',
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '10px',
            backgroundColor: 'violet',
            color: 'black',
            fontSize: '16px',
            marginLeft:'500PX',
            marginTop:'150px',
            borderRadius:'10px'
          }}
        >
          Funcion de texto al darle click al <br/>la estacion de bus, nos permite crear <br/> modelos informativos con efectos 3D.
          <button  style={{border:'none', backgroundColor:'inherit', color:'whitesmoke'}} onClick={handleCloseClick}>close</button>
        </div>
      )}
    </div>
  );
};

export default Scene;
