import { useEffect, useRef, useState } from "react";
import { item } from "./types";
import ImageItem from "./ImageItem";
import React from "react";
import FullsingleItem from "./FullSingleItem";

const ImageItems = () => {
  const [imageData, setImageData] = useState<Array<item>>([]);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [activeItem, setActiveItem] = useState<item>();
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const url =
          import.meta.env.MODE === "development"
            ? "http://localhost:8000"
            : import.meta.env.api;
        const res = await fetch(url);
        const resJson = await res.json();
        const arraofItems = resJson.items as Array<item>;
        const getItems = arraofItems.map((v) => {
          return {
            id: v.id,
            thumbnail: v.thumbnail,
            hash: v.hash,
            width: v.width,
            height: v.height,
          };
        });
        setImageData(getItems);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchImages();
  }, []);
  useEffect(() => {
    if (!activeItem) return;
    dialogRef.current?.showModal();
  });
  return (
    <React.Fragment key={"frag"}>
      <dialog
        key={"dialog"}
        ref={dialogRef}
        onCancel={() => setActiveItem(undefined)}
      >
        {activeItem && <FullsingleItem id={activeItem} />}
      </dialog>
      {imageData.map((i) => (
        <ImageItem key={i.hash} i={i} setActiveItem={setActiveItem} />
      ))}
    </React.Fragment>
  );
};
export default ImageItems;
