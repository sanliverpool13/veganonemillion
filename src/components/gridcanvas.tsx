"use client";

import { useEffect, useRef, useState } from "react";

const GridCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gridSize] = useState(1000);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = gridSize;
    canvas.height = gridSize;

    // Draw grid
    for (let x = 0; x < gridSize; x += 10) {
      for (let y = 0; y < gridSize; y += 10) {
        ctx.strokeStyle = "gray";
        ctx.strokeRect(x, y, 10, 10);
      }
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");

    const rect = canvas!.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / 10) * 10;
    const y = Math.floor((event.clientY - rect.top) / 10) * 10;

    // Fill clicked cell with black
    ctx!.fillStyle = "black";
    ctx!.fillRect(x, y, 10, 10);
  };

  return (
    <canvas
      ref={canvasRef}
      className="border border-black"
      onClick={handleClick}
    />
  );
};

export default GridCanvas;
