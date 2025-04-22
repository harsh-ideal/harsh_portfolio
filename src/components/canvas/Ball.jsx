import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { technologies } from "../../constants";
import { Text } from '@react-three/drei';
import useIsMobile from "../../hooks/useIsMobile";

const Ball = ({ imgUrl, position,name }) => {
  const [decal] = useTexture([imgUrl]);
  const isMobile=useIsMobile()

  return (
    <Float speed={isMobile?2:1.5} rotationIntensity={1} floatIntensity={2}>
      <group position={position}>
        <mesh scale={isMobile?1.2:2} castShadow receiveShadow>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#fff8eb"
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
          />
          {/* <OrbitControls enableZoom={false} /> */}
          <Decal
            position={isMobile?[0, 0, 1]:[0, 0, 1]}
            rotation={isMobile?[2 * Math.PI, 0, 6.25]:[2 * Math.PI, 0, 6.25]}
            flatShading
            map={decal}
          />
        </mesh>

        {/* Text label below the ball */}
        <Text
          position={isMobile?[0, -2.8, 0]:[0, -2.8, 0]} // Just below the ball
          fontSize={isMobile?1.0:1.6}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </group>
    </Float>
  );
};

const BallCanvasGroup = () => {
  const isMobile=useIsMobile();
  console.log(isMobile);
  useEffect(()=>{

  },[isMobile])
  

  const positions = useMemo(() => {
    const cols = isMobile?3:8;
    const spacing = isMobile?9:12;
    return technologies.map((_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      return isMobile?[col * spacing-10, -row * spacing+25, 1]:[-col * spacing+40, -row * spacing+10, 1];
    });
  }, []);

  return (
    <Canvas
      dpr={ isMobile?[-1, 2]:[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={isMobile?{ position: [0, -10, 80], fov: 40 }:{ position: [0, 10, 50], fov: 50 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[0.05, 0, 0.15]} />
        {/* <OrbitControls enableZoom={false} /> */}
        {technologies.map((tech, index) => (
          <Ball key={tech.name} name={tech.name}imgUrl={tech.icon} position={positions[index]} />
        ))}
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default BallCanvasGroup;
