import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import Exclamation3D from "../assets/3d/exclamation_mark.glb";

const Exclamation = () => {
  const exclamationRef = useRef();
  const { scene, animations } = useGLTF(Exclamation3D);
  const { actions } = useAnimations(animations, exclamationRef);
  useEffect(() => {
    actions.play();
  }, []);
  return <mesh></mesh>;
};

export default Exclamation;
