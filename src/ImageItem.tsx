import { useRef, useState } from "react";
import { item } from "./types";

const ImageItem = ({
  i,
  setActiveItem,
}: {
  i: item;
  setActiveItem: React.Dispatch<React.SetStateAction<item | undefined>>;
}) => {
  const [isOpen, setOpenClose] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function toggleModal() {
    if (isOpen) {
      setOpenClose(false);
      dialogRef.current?.close();
    } else {
      setOpenClose(true);
      dialogRef.current?.showModal();
    }
  }

  return (
    <div
      className="galleryDiv"
      onClick={() => {
        toggleModal();
        setActiveItem(i);
      }}
    >
      <img loading="lazy" src={i.thumbnail} className="gallery-img" />
    </div>
  );
};
export default ImageItem;
