"use client";

import React, { useEffect, useRef } from "react";

export const AuroraBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      time += 0.0015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradient 1 (Indigo movement)
      const x1 = canvas.width * 0.35 + Math.sin(time) * 150;
      const y1 = canvas.height * 0.35 + Math.cos(time * 0.9) * 100;
      const r1 = Math.max(canvas.width, canvas.height) * 0.55;
      
      const grad1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, r1);
      grad1.addColorStop(0, "rgba(99, 102, 241, 0.09)"); // Indigo-500
      grad1.addColorStop(1, "rgba(3, 3, 3, 0)");

      // Gradient 2 (Purple movement)
      const x2 = canvas.width * 0.65 + Math.cos(time * 0.8) * 180;
      const y2 = canvas.height * 0.6 + Math.sin(time * 1.1) * 120;
      const r2 = Math.max(canvas.width, canvas.height) * 0.5;

      const grad2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, r2);
      grad2.addColorStop(0, "rgba(168, 85, 247, 0.07)"); // Purple-500
      grad2.addColorStop(1, "rgba(3, 3, 3, 0)");

      // Background fill to clear frames cleanly
      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render lights
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-20 h-full w-full pointer-events-none opacity-80"
    />
  );
};
