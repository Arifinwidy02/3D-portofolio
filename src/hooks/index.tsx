import { useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";

export const useFluidSize = (
  min: number,
  max: number,
  minVW: number,
  maxVW: number
) => {
  const minVWSet = minVW || 375;
  const maxVWSet = maxVW || 1440;

  const slope = (max - min) / (maxVWSet - minVW);
  const yAxisIntercept = min - slope * minVW;
  const vw = slope * 100;
  const intercept = yAxisIntercept;

  return `clamp(${min}px, ${vw.toFixed(4)}vw + ${intercept.toFixed(
    2
  )}px, ${max}px)`;
};

import { useState, useEffect } from "react";

export const useResponsiveScale = (
  min: number,
  max: number,
  minVW: number = 375,
  maxVW: number = 1440
) => {
  const [scale, setScale] = useState(min);

  useEffect(() => {
    const calcScale = () => {
      const vw = window.innerWidth;
      const clampedVW = Math.min(Math.max(vw, minVW), maxVW);

      const slope = (max - min) / (maxVW - minVW);
      const result = min + slope * (clampedVW - minVW);

      setScale(result);
    };

    calcScale();
    window.addEventListener("resize", calcScale);
    return () => window.removeEventListener("resize", calcScale);
  }, [min, max, minVW, maxVW]);

  // Return as a Three.js-friendly array
  return [scale, scale, scale];
};

/**
 * Custom hook to handle island rotation and stage detection.
 * @param {boolean} isRotating
 * @param {Function} setIsRotating
 * @param {Function} setCurrentStage
 * @param {Object} islandRef - ref to the island group
 */
export function useIslandControls(
  isRotating,
  setIsRotating,
  setCurrentStage,
  islandRef
) {
  const { gl, viewport } = useThree();
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  // Pointer down
  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsRotating(true);
    lastX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  // Pointer up
  const handlePointerUp = (e) => {
    e.stopPropagation();
    setIsRotating(false);
  };

  // Pointer move
  const handlePointerMove = (e) => {
    if (!isRotating) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = (clientX - lastX.current) / viewport.width;

    islandRef.current.rotation.y += delta * 0.01 * Math.PI;
    lastX.current = clientX;
    rotationSpeed.current = delta * 0.01 * Math.PI;
  };

  // Keyboard controls
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    }
    if (e.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  // Event listeners
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRotating]);

  // Animation loop
  useFrame(() => {
    if (!isRotating) {
      // Apply smooth damping
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) rotationSpeed.current = 0;
      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      // Detect stage
      const rotation = islandRef.current.rotation.y;
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      if (normalizedRotation >= 5.45 && normalizedRotation <= 5.85) {
        setCurrentStage(4);
      } else if (normalizedRotation >= 0.85 && normalizedRotation <= 1.3) {
        setCurrentStage(3);
      } else if (normalizedRotation >= 2.4 && normalizedRotation <= 2.6) {
        setCurrentStage(2);
      } else if (normalizedRotation >= 4.25 && normalizedRotation <= 4.75) {
        setCurrentStage(1);
      } else {
        setCurrentStage(null);
      }
    }
  });
}

/**
 * Calculates a fluid scale for 3D models in react-three-fiber based on viewport width.
 * @param {number[]} minScale - The scale at smallest viewport [x, y, z].
 * @param {number[]} maxScale - The scale at largest viewport [x, y, z].
 * @param {number} minVW - Min viewport width (px).
 * @param {number} maxVW - Max viewport width (px).
 */
export function useFluidScale(minScale, maxScale, minVW = 375, maxVW = 1440) {
  const [scale, setScale] = useState(() => getScale(window.innerWidth));

  function getScale(viewportWidth) {
    // Clamp viewport width between minVW and maxVW
    const vw = Math.max(minVW, Math.min(viewportWidth, maxVW));
    const ratio = (vw - minVW) / (maxVW - minVW);

    // Interpolate scale values for x, y, z
    return [
      minScale[0] + (maxScale[0] - minScale[0]) * ratio,
      minScale[1] + (maxScale[1] - minScale[1]) * ratio,
      minScale[2] + (maxScale[2] - minScale[2]) * ratio,
    ];
  }

  useEffect(() => {
    const handleResize = () => setScale(getScale(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return scale;
}

export function useWindowBreakpoints() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    isPortrait: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({
        width,
        height,
        sm: width < 640, // small
        md: width >= 640 && width < 768, // medium
        lg: width >= 768 && width < 1024, // large
        xl: width >= 1024, // extra large
        isPortrait: height > width,
      });
    };

    handleResize(); // run at start
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
