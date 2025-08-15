import { a } from "@react-spring/three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import islandScene from "../assets/3d/island.glb";
import { useIslandControls } from "../hooks";

export default function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  ...props
}) {
  const islandRef = useRef();
  const { nodes, materials } = useGLTF(islandScene);

  // Hook handles all rotation, input, and stage logic
  useIslandControls(isRotating, setIsRotating, setCurrentStage, islandRef);

  return (
    <a.group ref={islandRef} {...props}>
      {/* Each mesh in the model */}
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  );
}
