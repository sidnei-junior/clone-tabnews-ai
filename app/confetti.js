"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Carrega o react-confetti em um chunk separado, fora do JS crítico da página.
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function Confetti() {
  const [size, setSize] = useState(null);

  useEffect(() => {
    // Respeita quem prefere menos animação e poupa CPU nesses casos.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!size) return null;

  return (
    <ReactConfetti
      width={size.width}
      height={size.height}
      numberOfPieces={400}
      recycle={false}
    />
  );
}
