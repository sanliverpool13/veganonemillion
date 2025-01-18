"use client";
import React, { useEffect } from "react";

const JustImage: React.FC = () => {
  useEffect(() => {
    const imageMap = Array.from(
      document.querySelectorAll("map[name='imagemap']"),
    );
    console.log(imageMap);
  }, []);

  // const showTooltip = (tooltipId: string) => {
  //   const tooltip = document.getElementById(tooltipId);

  //   if (tooltip) {
  //     tooltip.style.display = "block";
  //   }
  // };

  // const hideTooltip = (tooltipId: string) => {
  //   const tooltip = document.getElementById(tooltipId);

  //   if (tooltip) {
  //     tooltip.style.display = "none";
  //   }
  // };

  // const handleMouseOver = (
  //   e: React.MouseEvent<HTMLAreaElement>,
  //   tooltipId: string,
  // ) => {
  //   console.log("mouse is entered");

  //   const tooltip = document.getElementById(tooltipId);
  //   if (!tooltip) return;
  //   const area = e.target as HTMLAreaElement;
  //   const coords = area.getAttribute("coords")?.split(",").map(Number);
  //   // get size of rectangle from coordinates
  //   if (!coords) return;

  //   // Extract width and height from coords
  //   const [x1, y1, x2, y2] = coords;
  //   const width = x2 - x1;
  //   const height = y2 - y1;

  //   showTooltip(tooltipId);

  //   tooltip!.style.left = `${width}px`;
  //   tooltip!.style.top = `${height}px`;
  // };

  // const handleMouseOut = (
  //   e: React.MouseEvent<HTMLAreaElement>,
  //   tooltipId: string,
  // ) => {
  //   console.log("mouse is out");
  //   hideTooltip(tooltipId);
  // };

  // const handleMouseMove = (
  //   e: React.MouseEvent<HTMLAreaElement>,
  //   tooltipId: string,
  // ) => {
  //   console.log("mouse mvoed");
  //   const tooltip = document.getElementById(tooltipId);
  //   if (!tooltip) return;

  //   const parent = document.getElementById("map-parent");
  //   if (!parent) return;

  //   const parentRect = parent.getBoundingClientRect();

  //   const x = e.clientX - parentRect.left;
  //   const y = e.clientY - parentRect.top;
  //   if (tooltip.style.display !== "block") {
  //     showTooltip(tooltipId);
  //   }
  //   document.getElementById(tooltipId)!.style.left = `${x + 10}px`;
  //   document.getElementById(tooltipId)!.style.top = `${y + 16}px`;
  // };

  return (
    // <div id="map-parent" className="relative w-[1000px] h-[1000px]">
    <div className="relative w-full max-w-[1000px]">
      <div id="map-parent" className="relative w-full aspect-square">
        <map name="imagemap">
          {/* Tooltip Divs - Initially Hidden */}
          {/* <div
            id="tooltip1"
            className={`absolute bg-white border border-gray-500 p-2 shadow-md text-sm opacity-100 hidden  z-10`}
          >
            Hello There
          </div>

          <div
            id="tooltip2"
            className={`absolute bg-white border border-gray-500 p-2 shadow-md text-sm opacity-100 hidden  z-10`}
          >
            Tooltip for One Image
          </div>
          <div
            id="tooltip3"
            className={`absolute bg-white border border-gray-500 p-2 shadow-md text-sm opacity-100 hidden  z-10`}
          >
            Tooltip 3
          </div>
          <div
            id="tooltip4"
            className={`absolute bg-white border border-gray-500 p-2 shadow-md text-sm opacity-100 hidden  z-10`}
          >
            Tooltip 4
          </div>

          <div
            id="tooltip5"
            className={`absolute bg-white border border-gray-500 p-2 shadow-md text-sm opacity-100 hidden  z-10`}
          >
            Tooltip 5
          </div>
          <div
            id="tooltip6"
            className={`absolute bg-white border border-gray-500 p-2 shadow-md text-sm opacity-100 hidden  z-10`}
          >
            Tooltip 6
          </div>
          <area
            shape="rect"
            coords="40,0,60,20"
            href="https://www.google.ca/"
            alt="Submit Image"
            onMouseOver={(e) => handleMouseOver(e, "tooltip1")}
            onMouseOut={(e) => handleMouseOut(e, "tooltip1")}
            //   onMouseLeave={(e) => handleMouseLeave(e, "tooltip1")}
            onMouseMove={(e) => handleMouseMove(e, "tooltip1")}
          />
          <area
            shape="rect"
            coords="40,80,60,100"
            href="https://www.google.ca/"
            alt="One Image"
            onMouseOver={(e) => handleMouseOver(e, "tooltip2")}
            onMouseOut={(e) => handleMouseOut(e, "tooltip2")}
            onMouseMove={(e) => handleMouseMove(e, "tooltip2")}
          />
          <area
            shape="rect"
            coords="600,200,620,220"
            href="https://www.google.ca/"
            alt="One Image"
            onMouseOver={(e) => handleMouseOver(e, "tooltip3")}
            onMouseOut={(e) => handleMouseOut(e, "tooltip3")}
            onMouseMove={(e) => handleMouseMove(e, "tooltip3")}
          />
          <area
            shape="rect"
            coords="440,400,460,420"
            href="https://www.google.ca/"
            alt="Submit Image"
            onMouseOver={(e) => handleMouseOver(e, "tooltip4")}
            onMouseOut={(e) => handleMouseOut(e, "tooltip4")}
            //   onMouseLeave={(e) => handleMouseLeave(e, "tooltip4")}
            onMouseMove={(e) => handleMouseMove(e, "tooltip4")}
          />
          <area
            shape="rect"
            coords="480,480,500,500"
            href="https://www.google.ca/"
            alt="One Image"
            onMouseOver={(e) => handleMouseOver(e, "tooltip5")}
            onMouseOut={(e) => handleMouseOut(e, "tooltip5")}
            onMouseMove={(e) => handleMouseMove(e, "tooltip5")}
          />
          <area
            shape="rect"
            coords="800,0,820,20"
            href="https://www.google.ca/"
            alt="One Image"
            onMouseOver={(e) => handleMouseOver(e, "tooltip6")}
            onMouseOut={(e) => handleMouseOut(e, "tooltip6")}
            onMouseMove={(e) => handleMouseMove(e, "tooltip6")}
          /> */}
        </map>
        <img useMap="#imagemap" src="/20by20reservegrid.png" alt="Test Image" />
      </div>
    </div>
  );
};

export default JustImage;
