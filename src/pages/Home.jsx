import React, { Suspense, useState, useRef, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import { Canvas } from "react-three-fiber";
import Island from "../models/Island";
import SkyScene from "../models/Sky";
import { Plane } from "../models/Plane";
import Bird from "../models/Bird";
import CardInfo from "../components/CardInfo";
import sakura from "../assets/sakura.mp3";
import { soundoff, soundon } from "../assets/icons";
import { PiSpeakerSlashLight, PiSpeakerHighDuotone } from "react-icons/pi";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.2;
  audioRef.current.loop = true;

  const adjustIslandScren = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43]; //x,y,z
    let islandRotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      // screenScale = [1, 1, 1];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, islandRotation];
  };
  const adjustPlaneScren = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -0.2, -2];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -1, -6];
    }
    return [screenScale, screenPosition];
  };

  const [screenScale, screenPosition, islandRotation] = adjustIslandScren();
  const [planeScale, planePosition] = adjustPlaneScren();

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
    return () => {
      audioRef.current.pause();
    };
  }, [isPlaying]);

  return (
    <section className="relative w-full h-screen">
      <div className="flex justify-center items-center absolute top-28 left-0 right-0 z-10">
        {/* {Boolean(currentStage) && <CardInfo currentStage={currentStage} />} */}
        <CardInfo currentStage={currentStage} />
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skyColor="#b1ef1ff"
            groundColor="#000000"
            intensity={1}
          />
          <Bird />
          <SkyScene isRotating={isRotating} />
          <Island
            scale={screenScale}
            position={screenPosition}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
          />
        </Suspense>
      </Canvas>
      <div
        className="absolute  bottom-2 left-2"
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          display: "flex",
          width: "97%",
          alignItems: "flex-end",
        }}
      >
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            padding: 7,
            borderRadius: 15,
            backgroundColor: "#2c77e6",
            width: 30,
            height: 30,
          }}
        >
          {isPlaying ? (
            <PiSpeakerHighDuotone color="white" />
          ) : (
            <PiSpeakerSlashLight color="white" />
          )}
        </button>
        <div>
          <p className="font-poppins text-sm" style={{ color: "#577B8D" }}>
            Designed by Javascript Mastery
          </p>
          <p className="font-poppins text-sm" style={{ color: "#577B8D" }}>
            Built by Arifin Widyatmoko
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
