import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { useInView } from "react-intersection-observer";



const Computers = ({isMobile}) => {
  const Computer = useGLTF("/desktop_pc/scene.gltf");

  if (!Computer || !Computer.scene) {
    return null; // or return a fallback mesh
  }
  
  return (
    <mesh>
      <hemisphereLight intensity={5} groundColor="black" />
      <pointLight intensity={5} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      {Computer.scene && (
  <primitive
    object={Computer.scene}
    scale={isMobile ? 0.45 : 0.75}
    position={isMobile ? [0, -3, -0.75] : [0, -3.25, -1.5]}
    rotation={[-0.01, -0.2, -0.1]}
  />
)}
    </mesh>
  );
};

const ComputersCanvas = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,  // Load only once
    threshold: 0.001,      // Load when 20% visible
  });
  
const [isMobile,setIsMobile]=useState(false);



useEffect(()=>{
  const MediaQuery=window.matchMedia('(max-width:600px)');
  setIsMobile(MediaQuery.matches);

  const handleMediaQueryChanges=(event)=>{
setIsMobile(event.matches);
  }

  MediaQuery.addEventListener('change', handleMediaQueryChanges);

  return()=>{
    MediaQuery.removeEventListener('change',handleMediaQueryChanges);
  }
},[])


  return (
    <span ref={ref} >
    {inView && (

    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>

      <Preload all />
    </Canvas>
    )}
    </span>
  );
};


useGLTF.preload("/desktop_pc/scene.gltf");


export default ComputersCanvas;