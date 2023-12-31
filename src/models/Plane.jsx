import React, { useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import PlaneScene from "../assets/3d/plane.glb";

export const Plane = ({ isRotating, ...props }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(PlaneScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    actions["Take 001"].play();
    // if (isRotating) {
    //   actions["Take 001"].play();
    // } else {
    //   actions["Take 001"].stop();
    // }
  }, [actions, isRotating]);
  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  );
};
