import { useInView } from "react-intersection-observer";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "./../Loader";

const Earth = ({isMobile}) => {
  const {scene} = useGLTF("./planet/scene.gltf");
  return (
    <primitive
    object={scene}
    scale={isMobile ? 1.8 : 2.5}
    position-y={0}
    position-x={0}
  />
  );
};


const EarthCanvas = () => {
   const { ref, inView } = useInView({
      triggerOnce: false,  // Load only once
      threshold: 0.1,      // Load when 20% visible
    });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);


  return (
    <span ref={ref} >
    {inView && (

    <Canvas
      shadows
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
    >
      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls
          autoRotate={true}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth isMobile={isMobile} />
      </Suspense>
    </Canvas>
    )}
    </span>
  );
};

export default EarthCanvas;
