import sharp from "sharp";
import fs from "fs";
import path from "path";

// Define paths
const inputImagePath = path.join("public", "grid-images", "nutsforcheese.jpeg"); // Your original image
const outputBoardPath = path.join(
  "public",
  "grid-board",
  "board-1000x1000.jpeg",
); // Final 1000x1000 grid board

// Board dimensions and cell sizes
const boardSize = 1000; // Total board size
const cellSize = 20; // Grid cell size (e.g., 20x20)
const rows = boardSize / cellSize; // Total rows
const cols = boardSize / cellSize; // Total columns

// Check if output directory exists
const outputDir = path.dirname(outputBoardPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
console.log(
  Array.from({ length: rows * cols }, (_, i) => ({
    input: inputImagePath,
    top: Math.floor(i / cols) * cellSize,
    left: (i % cols) * cellSize,
  })),
);

// Generate the grid board
sharp({
  create: {
    width: boardSize,
    height: boardSize,
    channels: 3, // RGB
    background: { r: 214, g: 232, b: 140 }, // Optional: Background color
  },
})
  .composite(
    Array.from({ length: rows * cols }, (_, i) => {
      const x = (i % cols) * cellSize; // Calculate x position
      const y = Math.floor(i / cols) * cellSize; // Calculate y position

      return {
        input: inputImagePath,
        top: y,
        left: x,
      };
    }),
  )
  .toFormat("jpeg", { quality: 80 })
  .toFile(outputBoardPath)
  .then(() => {
    console.log(`Grid board created successfully at: ${outputBoardPath}`);
  })
  .catch((err) => {
    console.error("Error creating grid board:", err);
  });
