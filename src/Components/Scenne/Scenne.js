import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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

    // Loader
    const gltfLoader = new GLTFLoader();
    let busModel = null;
    let moon = null;
    let EDIFICIO = null;

    gltfLoader.load(
      '/models/busmodel/Busstation.glb',
      (gltf) => {
        busModel = gltf.scene;
        scene.add(busModel);
        busModel.position.set(0, -0.6, 0);
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
      'models/busmodel/EDIFICIO.glb',
      (gltf) => {
        EDIFICIO = gltf.scene;
        scene.add(EDIFICIO);

        const desiredHeight = 2; // Altura deseada del modelo
        const scaleFactor = desiredHeight / EDIFICIO.scale.y;
        EDIFICIO.scale.y = desiredHeight;

        // Escalar los ejes X y Z en la misma proporción para mantener las proporciones originales
        EDIFICIO.scale.x *= scaleFactor;
        EDIFICIO.scale.z *= scaleFactor;

        EDIFICIO.position.set(0.010, 1, 1.2);
        EDIFICIO.scale.set(0.15, 0.15, 0.15);

        EDIFICIO.rotateY(Math.PI / 2.1)
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

  const handleTextClick = () => {
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
            borderRadius:'10PX',
            cursor: 'pointer'
          }}
          onClick={handleTextClick}
        >
          Funcion de texto al darle click al <br/>la estacion de bus, nos permite crear <br/> modelos informativos con efectos 3D.
        </div>
      )}
    </div>
  );
};

export default Scene;
