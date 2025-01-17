"use client";
import { useEffect, useRef, useState } from "react";
import ImageModalUpload from "./imagemodalupload";
import TallyForm from "./tallyform";

const GRID_SIZE = 1000; // 1000x1000 total pixels
const GRID_CELL_SIZE = 10; // Each cell is 10x10
const CELL_SIZE = 20; // Each clickable cell is 10x10

const imageAreasMap = [
  {
    tooltipId: "tooltip1",
    coords: [40, 0, 60, 20],
  },
  {
    tooltipId: "tooltip2",
    coords: [40, 80, 60, 100],
  },
  {
    tooltipId: "tooltip3",
    coords: [600, 200, 620, 220],
  },
  {
    tooltipId: "tooltip4", // Reused tooltip ID
    coords: [440, 400, 460, 420],
  },
  {
    tooltipId: "tooltip5", // Reused tooltip ID
    coords: [480, 480, 500, 500],
  },
  {
    tooltipId: "tooltip6", // Reused tooltip ID
    coords: [800, 0, 820, 20],
  },
];

interface ImageGridCanvasProps {
  backgroundSrc: string;
  //   onSelect: (x: number, y: number) => void;
}

// 📌 Function to draw a 10x10 grid
interface DrawGridProps {
  ctx: CanvasRenderingContext2D;
}

const ImageGridCanvas = ({ backgroundSrc }: ImageGridCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoverCell, setHoverCell] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef!.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = backgroundSrc;
    img.onload = () => {
      if (ctx) {
        drawGrid({ ctx }); // Draw the grid on top of the image
        ctx.drawImage(img, 0, 0, GRID_SIZE, GRID_SIZE);
      }
    };
  }, [backgroundSrc]);

  // Function to highlight reserved areas in gray
  const drawReservedAreas = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "rgba(100, 100, 100, 0.5)"; // Gray for occupied areas
    imageAreasMap.forEach(({ coords }) => {
      const [x1, y1, x2, y2] = coords;
      ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / CELL_SIZE);
    const y = Math.floor((event.clientY - rect.top) / CELL_SIZE);

    // // Only update state if hover cell changes
    // if (!hoverCell || hoverCell.x !== x || hoverCell.y !== y) {
    //   setHoverCell({ x, y });
    //   redrawCanvas(x, y);
    // }

    // Check if hovered cell is occupied
    const isOccupied = imageAreasMap.some(({ coords }) => {
      const [x1, y1, x2, y2] = coords;
      return x >= x1 && x < x2 && y >= y1 && y < y2;
    });

    if (isOccupied) {
      setHoverCell(null); // Prevent hover effect
      redrawCanvas(-1, -1);
    } else {
      setHoverCell({ x, y });
      redrawCanvas(x, y);
    }
  };

  const handleMouseLeave = () => {
    setHoverCell(null);
    redrawCanvas(-1, -1);
  };

  const drawGrid = ({ ctx }: DrawGridProps) => {
    ctx.strokeStyle = "#4f625320"; // Light grid lines
    for (let i = 0; i <= GRID_SIZE; i += GRID_CELL_SIZE) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, GRID_SIZE);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(GRID_SIZE, i);
      ctx.stroke();
    }
  };

  const redrawCanvas = (hoverX: number, hoverY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Clear the canvas & redraw the background
    const img = new Image();
    img.src = backgroundSrc;
    img.onload = () => {
      if (ctx) {
        ctx.drawImage(img, 0, 0, GRID_SIZE, GRID_SIZE);
        drawGrid({ ctx }); // Redraw grid
        drawReservedAreas(ctx);

        if (hoverX !== -1 && hoverY !== -1) {
          // Highlight hovered cell
          ctx.fillStyle = "rgba(255, 255, 0, 0.5)"; // Yellow hover effect
          ctx.fillRect(
            hoverX * CELL_SIZE,
            hoverY * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE,
          );
        }
      }
    };
  };

  // 📌 Detect Clicks on Grid
  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / CELL_SIZE);
    const y = Math.floor((event.clientY - rect.top) / CELL_SIZE);

    // Prevent clicks on occupied areas
    const isOccupied = imageAreasMap.some(({ coords }) => {
      const [x1, y1, x2, y2] = coords;
      return x >= x1 && x < x2 && y >= y1 && y < y2;
    });

    if (!isOccupied) {
      console.log(`User clicked on cell: (${x}, ${y})`);
      setIsModalOpen(true); // Open modal for uploading image
    }
  };

  return (
    <>
      {isModalOpen && (
        <ImageModalUpload
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <canvas
        ref={canvasRef}
        width={GRID_SIZE}
        height={GRID_SIZE}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
    </>
  );
};

export default ImageGridCanvas;
