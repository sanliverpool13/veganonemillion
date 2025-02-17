const gridImageArray: (null | { index: number; imagePath: string })[] =
  new Array(2500).fill(null);

// const initialData = [
//   { index: 7, imagePath: "/grid-images/reservedSlot.png" },
//   { index: 359, imagePath: "/grid-images/reservedSlot.png" },
//   { index: 976, imagePath: "/grid-images/reservedSlot.png" },
// ];
interface GridImage {
  index: number;
  imagePath: string;
}

const initialData: GridImage[] = [
  { index: 0, imagePath: "/grid-images/nutsforcheese.jpeg" },
  { index: 1, imagePath: "/grid-images/tava.png" },
  { index: 2, imagePath: "/grid-images/ALKlogotumb.jpg" },
];

initialData.forEach((data) => {
  gridImageArray[data.index] = { index: data.index, imagePath: data.imagePath };
});

export default gridImageArray;
