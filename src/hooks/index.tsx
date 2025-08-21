import { useState, useEffect, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";

// ====== Fluid Size for CSS ======
export const useFluidSize = (min, max, minVW = 375, maxVW = 1440) => {
  const slope = (max - min) / (maxVW - minVW);
  const intercept = min - slope * minVW;
  const vw = slope * 100;

  return `clamp(${min}px, ${vw.toFixed(4)}vw + ${intercept.toFixed(
    2
  )}px, ${max}px)`;
};

// ====== Responsive Scale for Three.js ======
export const useResponsiveScale = (min, max, minVW = 375, maxVW = 1440) => {
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

  return [scale, scale, scale];
};

// ====== Island Controls (with axis lock) ======
export function useIslandControls(
  isRotating,
  setIsRotating,
  setCurrentStage,
  islandRef
) {
  const { gl, viewport } = useThree();
  const lastX = useRef(0);
  const lastY = useRef(0); // 🔥 CHANGED: track Y as well
  const dragDelta = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  // Pointer down
  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsRotating(true);
    lastX.current = e.touches ? e.touches[0].clientX : e.clientX;
    lastY.current = e.touches ? e.touches[0].clientY : e.clientY; // 🔥 CHANGED
  };

  // Pointer up
  const handlePointerUp = (e) => {
    e.stopPropagation();
    setIsRotating(false);
  };

  // Pointer move (with axis lock)
  const handlePointerMove = (e) => {
    if (!isRotating) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY; // 🔥 CHANGED

    const deltaX = clientX - lastX.current; // 🔥 CHANGED
    const deltaY = clientY - lastY.current; // 🔥 CHANGED

    // 🔥 CHANGED: Axis lock logic
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      // More vertical movement → ignore rotation (like scroll)
      dragDelta.current = 0;
    } else {
      // Horizontal movement → rotate
      dragDelta.current = (deltaX / viewport.width) * 0.004 * Math.PI;
    }

    lastX.current = clientX;
    lastY.current = clientY; // 🔥 CHANGED
  };

  // Keyboard controls
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      dragDelta.current = 0.005 * Math.PI;
    }
    if (e.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      dragDelta.current = -0.005 * Math.PI;
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
    if (isRotating) {
      islandRef.current.rotation.y += dragDelta.current;
      rotationSpeed.current = dragDelta.current;
    } else {
      // Apply inertia
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) rotationSpeed.current = 0;
      islandRef.current.rotation.y += rotationSpeed.current;
    }

    // Stage detection
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
  });
}

// ====== Fluid Scale for 3D Models ======
export function useFluidScale(minScale, maxScale, minVW = 375, maxVW = 1440) {
  const [scale, setScale] = useState(() => getScale(window.innerWidth));

  function getScale(viewportWidth) {
    const vw = Math.max(minVW, Math.min(viewportWidth, maxVW));
    const ratio = (vw - minVW) / (maxVW - minVW);

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

// ====== Window Breakpoints ======
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
        sm: width < 640,
        md: width >= 640 && width < 768,
        lg: width >= 768 && width < 1024,
        xl: width >= 1024,
        isPortrait: height > width,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
