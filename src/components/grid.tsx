"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

// Extend the Window interface to include the Tally property
declare global {
  interface Window {
    Tally: {
      openPopup: (formId: string, options: any) => void;
    };
  }
}
import ImageModalUpload from "@/components/imagemodalupload";
import TallyModal from "./tallyform";
import Image from "next/image";
import { FixedSizeGrid as ReactWindowGrid } from "react-window";

const imagePaths = [
  "/test-images/athleticbrewing.png",
  "/test-images/bellwoodsbrewery.jpeg",
  "/test-images/chatgptexample.webp",
  "/test-images/earthisland.png",
  "/test-images/justins.png",
  "/test-images/miyoko.jpeg",
  "/test-images/nutsforcheese.png",
  "/test-images/oatly.png",
  "/test-images/planta.png",
  "/test-images/sunrisetofu.png",
];

const Grid = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [tallyUrl, setTallyUrl] = useState("");

  const openTallyForm = (index: number) => {
    window.Tally.openPopup("n9p5e1", {
      hiddenFields: {
        position: index.toString(), // Dynamically pass the position
        // originPage: window.location.pathname, // Example: Pass current page as context
      },
      overlay: true, // Optional: Add an overlay
      hideTitle: true, // Optional: Hide the title
      autoClose: 1, // Auto-close the form after submission
    });
  };

  // const handleCellClick = (index: number) => {
  //   const position = index; // Get the clicked cell position
  //   const url = `https://tally.so/popup/n9p5e1?originPage=selectGrid&position=${position}&alignLeft=1&hideTitle=1`;
  //   setTallyUrl(url); // Update the Tally URL with the position
  //   setIsModalOpen(true); // Open the modal
  // };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin === "https://tally.so" && // Ensure the event comes from Tally
        event.data?.type === "TALLY_WIDGET_CLOSE"
      ) {
        setTallyUrl(""); // Clear the URL to hide the iframe
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  return (
    <div className="container mx-auto max-w-[1000px] flex flex-col justify-center items-center px-4">
      <p className="mb-6">
        Select a 20x20 spot on the grid and upload the image and link. By
        submitting the form you agree to the .
        <Link href="/terms" className="underline hover:underline">
          terms and conditions
        </Link>
        . While being approved I will reserve the spot. Once approved I will
        update the board your image and link.
      </p>
      <div className="container overflow-x-scroll w-full">
        <div className="grid grid-cols-[repeat(50,20px)] grid-rows-[repeat(50,20px)] bg-[#d6e8ca]">
          {Array.from({ length: 2500 }, (_, index) => {
            const imageSrc = imagePaths[index] || null; // Get image or null
            if (imageSrc) {
              return (
                <div key={index} className="relative w-full h-full ">
                  {imageSrc && <Image src={imageSrc} alt="Brand logo" fill />}
                </div>
              );
            }
            return (
              <div
                key={index}
                className="relative w-full h-full border border-[#9fa999] cursor-pointer hover:bg-[#9fa999] "
                onClick={() => openTallyForm(index)} // Open form dynamically with hidden field
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// const Example = () => {
//   return (
//     <ReactWindowGrid
//       columnCount={100}
//       columnWidth={10}
//       rowCount={100}
//       rowHeight={10}
//       height={800}
//       width={1100}
//     >
//       {({ columnIndex, rowIndex, style }) => (
//         <div style={style} className="bg-white border border-gray-200">
//           {/* Add your content here */}
//         </div>
//       )}
//     </ReactWindowGrid>
//   );
// };

export default Grid;
