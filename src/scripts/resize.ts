import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputImagePath = path.join("public", "grid-images", "nutsforcheese.jpeg");
const outPutImagePath = path.join(
  "public",
  "grid-images",
  "nutsforcheese-resized3.png",
);

const outPutDir = path.dirname(outPutImagePath);
if (fs.existsSync(outPutDir)) {
  fs.mkdirSync(outPutDir, { recursive: true });
}

// Resize Image
sharp(inputImagePath)
  .resize(100, 100, { kernel: "lanczos3" })
  .resize(20, 20, {
    fit: "cover",
    kernel: "nearest",
  })
  .toFormat("jpeg", { quality: 100 })
  .toFile(outPutImagePath, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Image resized successfully!");
    }
  });
