import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "react-three-fiber"; // old fiber version
import Loader from "../components/Loader";
import CardInfo from "../components/CardInfo";
import Island from "../models/Island";
import SkyScene from "../models/Sky";
import { Plane } from "../models/Plane";
import Bird from "../models/Bird";
import sakura from "../assets/sakura.mp3";
import { PiSpeakerSlashLight, PiSpeakerHighDuotone } from "react-icons/pi";
import { useFluidScale, useWindowBreakpoints } from "../hooks";

// ====== CONSTANTS ======
const ISLAND_DEFAULT_POSITION = [0, -10, -43];
const ISLAND_DEFAULT_ROTATION = [0.1, 4.7, 0];
const PLANE_MOBILE_POSITION = [0, 1, -2];
const PLANE_DESKTOP_POSITION = [2.75, 1, -4];
const AUDIO_VOLUME = 0.2;

export default function Home() {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const { isPortrait } = useWindowBreakpoints();

  const audioRef = useRef(new Audio(sakura));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = AUDIO_VOLUME;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Responsive island scaling
  const islandScale = useFluidScale(
    [0.45, 0.45, 0.45], // min scale at 375px
    [1, 1, 1], // max scale at 1440px
    375,
    1440
  );

  // Responsive plane scaling
  const planeScale = useFluidScale(
    [1.5, 1.5, 1.5], // mobile
    [3, 3, 3], // desktop
    375,
    1440
  );
  const planePosition = isPortrait
    ? PLANE_MOBILE_POSITION
    : PLANE_DESKTOP_POSITION;

  return (
    <section className="relative w-full h-screen">
      {/* Card Info */}
      <div className="absolute top-28 left-0 right-0 z-10 flex justify-center items-center sm:top-14">
        <CardInfo currentStage={currentStage} />
      </div>

      {/* 3D Canvas */}
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          {/* Lights */}
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skyColor="#b1ef1ff"
            groundColor="#000000"
            intensity={1}
          />

          {/* Models */}
          <Bird />
          <SkyScene isRotating={isRotating} />
          <Island
            scale={islandScale}
            position={ISLAND_DEFAULT_POSITION}
            rotation={ISLAND_DEFAULT_ROTATION}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            scale={planeScale}
            position={planePosition}
            rotation={isPortrait ? [0, 19.5, 0] : [0, 19.5, 0]}
            isRotating={isRotating}
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
          />
        </Suspense>
      </Canvas>

      {/* Footer Controls */}
      <FooterControls isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
    </section>
  );
}

// ====== Footer Controls Component ======
function FooterControls({ isPlaying, setIsPlaying }) {
  return (
    <div className="absolute bottom-2 left-2 flex justify-between items-end w-[97%]">
      {/* Audio Button */}
      <button
        onClick={() => setIsPlaying((prev) => !prev)}
        className="p-1.5 rounded-xl bg-blue-600 w-8 h-8 flex items-center justify-center"
      >
        {isPlaying ? (
          <PiSpeakerHighDuotone color="white" />
        ) : (
          <PiSpeakerSlashLight color="white" />
        )}
      </button>

      {/* Credits */}
      <div className="flex flex-col items-end">
        <p className="font-poppins text-[#577B8D] text-[10px] sm:text-[14px]">
          Designed by Javascript Mastery
        </p>
        <p className="font-poppins text-[#577B8D] text-[10px] sm:text-[14px]">
          Built by Arifin Widyatmoko
        </p>
      </div>
    </div>
  );
}
