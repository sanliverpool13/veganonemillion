"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageModalUploadProps {
  isOpen: boolean;
  onClose: () => void;
  //   onSubmitted: (image: File | null, url: string, description: string) => void;
  //   selectedCell: { x: number; y: number } | null;
}

const ImageModalUpload: React.FC<ImageModalUploadProps> = ({
  isOpen,
  onClose,
}: ImageModalUploadProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string | null>(null);
  //   const [url, setUrl] = useState("");
  //   const [description, setDescription] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  //   const checkFileHeader = async (file: File) => {
  //     const buffer = await file.arrayBuffer();
  //     const byteArray = new Uint8Array(buffer).subarray(0, 4);
  //     const header = byteArray.map((byte) => byte.toString(16)).join(" ");

  //     // JPEG header: FF D8 FF
  //     // PNG header: 89 50 4E 47
  //     const validHeaders = ["ff d8 ff", "89 50 4e 47"];
  //     return validHeaders.some((valid) => header.startsWith(valid));
  //   };

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 1) {
      alert("Only one file can be uploaded at a time.");
      return;
    }

    const file = acceptedFiles[0];
    console.log("Accepted file:", file);

    const validMimeTypes = ["image/jpeg", "image/png"];

    // 🛑 Block files with fake extensions
    if (!validMimeTypes.includes(file.type)) {
      alert("Invalid file type. Only JPEG and PNG are allowed.");
      return;
    }

    // 🛑 Read file dimensions
    const checkImageSize = (file: File): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          console.log("Image dimensions:", img.width, img.height);

          // ✅ Allowed Sizes: 20x20 or 40x40
          if (
            (img.width === 20 && img.height === 20) ||
            (img.width === 40 && img.height === 40)
          ) {
            console.log("resolved true");
            resolve(true);
          } else {
            alert("Image must be either 20x20 or 40x40 pixels.");
            resolve(false);
          }
        };
        img.onerror = () => {
          alert("❌ Invalid file! This is not a real PNG or JPEG image.");
          resolve(false);
        };
        img.src = URL.createObjectURL(file); // Create preview URL
      });
    };

    const checkFileHeader = (file: File): Promise<boolean> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const arr = new Uint8Array(reader.result as ArrayBuffer).subarray(
            0,
            4,
          );
          const header = Array.from(arr)
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");

          const validSignatures: { [key: string]: string } = {
            "89504e47": "image/png", // PNG signature
            ffd8ffe0: "image/jpeg", // JPEG signature
            ffd8ffe1: "image/jpeg",
            ffd8ffe2: "image/jpeg",
          };

          resolve(validSignatures.hasOwnProperty(header));
        };
        reader.onerror = (error) => {
          console.error("FileReader error:", error);
        };
        reader.readAsArrayBuffer(file.slice(0, 4));
      });
    };

    const isValidHeader = await checkFileHeader(file);
    if (!isValidHeader) {
      console.log("inavlid header");
      return;
    }

    const isValidSize = await checkImageSize(file);
    if (!isValidSize) return;

    // ✅ Proceed with upload if valid
    const reader = new FileReader();
    reader.onload = () => {
      console.log("Reader result:", reader.result);
      if (reader.result === null) return;
      setImage(reader.result as string); // ✅ Better preview
    };
    reader.readAsDataURL(file);
  };

  //   console.log("selectedCell", selectedCell);
  console.log("image file", image);

  const { getRootProps, getInputProps, fileRejections, acceptedFiles } =
    useDropzone({
      accept: { "image/*": [".jpeg", ".png"] },
      maxFiles: 1,
      onDrop,
    });

  if (!isOpen) return null;
  interface FormElements extends HTMLFormControlsCollection {
    url: HTMLInputElement;
    email: HTMLInputElement;
    description: HTMLTextAreaElement;
  }

  interface FormElement extends HTMLFormElement {
    elements: FormElements;
  }

  const handleSubmit = async (e: React.FormEvent<FormElement>) => {};

  return (
    <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="relative bg-white p-6 w-[30%] h-full shadow-lg flex flex-col justify-center items-center"
      >
        {/* Close Button (Top-Right) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✖
        </button>

        <form onSubmit={handleSubmit} className="w-full">
          <h2 className="text-lg font-bold mb-4">Upload Image</h2>
          <p className="text-gray-700 mb-4">
            Images must be exactly 20x20 pixels.
          </p>

          {/* Drag & Drop Area */}
          <div
            {...getRootProps()}
            className="border-dashed border-2 border-gray-400 p-6 text-center cursor-pointer w-full"
          >
            <input {...getInputProps()} />
            {image ? (
              <Image
                src={image}
                alt="Uploaded"
                width={200}
                height={200}
                className="mt-4"
              />
            ) : (
              <p>Drop an image here, or click to select one</p>
            )}
          </div>
          {fileRejections.length > 0 && (
            <p className="text-red-500 mt-2">
              {fileRejections[0].errors[0].message}
            </p>
          )}
          {/* Form Inputs */}
          <input
            placeholder="Enter URL"
            type="text"
            className="mt-4 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            placeholder="Enter Email"
            type="text"
            className="mt-4 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Enter Description"
            className="mt-4 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          ></textarea>
          {/* Submit Button */}
          <p className="text-sm text-gray-600 mt-4">
            By submitting, you agree to our Terms of Service and Privacy Policy.
          </p>
          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageModalUpload;
