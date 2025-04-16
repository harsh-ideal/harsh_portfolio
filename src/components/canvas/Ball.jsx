
import React, {Suspense, useEffect, useState} from 'react'
import { Canvas,useThree } from '@react-three/fiber'
import { Decal, Float ,OrbitControls,Preload, useTexture } from '@react-three/drei'
import CanvasLoader from "../Loader";


const AutoInvalidate = () => {
  const { invalidate } = useThree();
  useEffect(() => {
    invalidate();
  }, []);
  return null;
};

const Ball = (props) => {
  const [decal] =useTexture([props.imgUrl]);

  return (
   
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25}/>
      <directionalLight position={[0.05,0,0.15]}/>
      <mesh castShadow receiveShadow scale={2.2}>
<icosahedronGeometry args={[1,1]}/>
<meshStandardMaterial color="#fff8eb" polygonOffset polygonOffsetFactor={-5} flatShading/>
<Decal position={[0,0,1]} rotation={[2*Math.PI,0,6.25]} flatShading map={decal}/>
      </mesh>
    </Float>
  )
}



const BallCanvas=({icon})=>{

  const [isMobile, setIsMobile] = useState(null);
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile === null) return null;

  return (
    <Canvas
    frameloop="demand"
    dpr={isMobile ? [1, 1.2] : [1, 2]}
    gl={{ preserveDrawingBuffer: true }}
    camera={{
      position: [0, 0, isMobile ? 6 : 5],
      fov: isMobile ? 80 : 75,
    }}
  >
    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls
        enableZoom={false}
      />
     <Ball imgUrl={icon}/>
     <AutoInvalidate />
    </Suspense>

    <Preload all />
  </Canvas>
  )

}


export default BallCanvas;