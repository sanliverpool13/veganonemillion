"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

// Extend the Window interface to include the Tally property
declare global {
  interface Window {
    Tally: {
      openPopup: (
        formId: string,
        options: {
          hiddenFields: { position: string };
          overlay: boolean;
          hideTitle: boolean;
          autoClose: number;
        },
      ) => void;
    };
  }
}

interface TallyOptions {
  hiddenFields: { position: string };
  overlay: boolean;
  hideTitle: boolean;
  autoClose: number;
}

interface Tally {
  openPopup: (formId: string, options: TallyOptions) => void;
}

declare global {
  interface Window {
    Tally: Tally;
  }
}

const imagePaths: string[] = [];

const Grid = () => {
  const openTallyForm = (index: number) => {
    window.Tally.openPopup("n9p5e1", {
      hiddenFields: {
        position: index.toString(), // Dynamically pass the position
      },
      overlay: true, // Optional: Add an overlay
      hideTitle: true, // Optional: Hide the title
      autoClose: 1, // Auto-close the form after submission
    });
  };

  return (
    <div className="container mx-auto max-w-[1000px] flex flex-col justify-center items-center px-4">
      <p className="mb-6">
        Select a 20x20 spot on the grid and upload the image and link. By
        submitting the form you agree to the{" "}
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
