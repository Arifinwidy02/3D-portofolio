import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import Sky from "../assets/3d/sky.glb";
import { useFrame } from "react-three-fiber";

const SkyScene = ({ isRotating }) => {
  const skyScene = useGLTF(Sky);
  const skyRef = useRef();
  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.15 * delta;
    }
  });
  return (
    <mesh ref={skyRef}>
      <primitive object={skyScene.scene}></primitive>
    </mesh>
  );
};

export default SkyScene;
