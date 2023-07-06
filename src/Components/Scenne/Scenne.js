import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Scene = () => {
  const mountRef = useRef(null);

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

    // Background
    // const textureLoader = new THREE.TextureLoader();
    // const texture = textureLoader.load('/envmap/city.jpg', () => {
    //   scene.background = texture;
    // });

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Loader
    const gltfLoader = new GLTFLoader();
    let busModel = null;
    let moon = null; // New model variable

    gltfLoader.load(
      '/models/busmodel/Busstation.glb',
      (gltf) => {
        busModel = gltf.scene;
        scene.add(busModel);
 
        busModel.position.set(0, -0.6, 0);
        busModel.scale.set(0.15, 0.15, 0.15);

        // Interactive part of the model
        const interactivePart = busModel.getObjectByName('parte-interactiva');
        if (interactivePart) {
          interactivePart.cursor = 'pointer'; // Change cursor when hovering over the part
          interactivePart.userData.message = 'Interactive message'; // Define the message to display

          interactivePart.on('click', () => {
            console.log(interactivePart.userData.message); // Display the message in the console when clicking on the part
          });

          interactivePart.on('mouseover', () => {
            console.log(interactivePart.userData.message); // Display the message in the console when hovering over the part
          });
        }
      },
      () => {},
      () => {}
    );

    // Load another model
    gltfLoader.load(
      '/models/busmodel/moon.glb',
      (gltf) => {
       moon = gltf.scene;
        scene.add(moon);
        
        // Position and scale the model as needed
       moon.position.set(2 ,0.5, 0.5);;
       moon.scale.set(0.15, 0.15, 0.15);

       const interactivePart = moon.getObjectByName('parte-interactiva');
        if (interactivePart) {
          interactivePart.cursor = 'pointer'; // Change cursor when hovering over the part
          interactivePart.userData.message = 'Interactive message'; // Define the message to display

          interactivePart.on('click', () => {
            console.log(interactivePart.userData.message); // Display the message in the console when clicking on the part
          });

          interactivePart.on('mouseover', () => {
            console.log(interactivePart.userData.message); // Display the message in the console when hovering over the part
          });
        }
      },
      () => {},
      () => {}
    );

    // Lights
    const light = new THREE.AmbientLight(0x404040); // Soft white light
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

  return (
    <div
      className="contenedor3d"
      style={{ width: "300%", height: "70vh", marginLeft:'100px', marginTop:'-20px' }}
      ref={mountRef}
    ></div>
  );
};

export default Scene;
