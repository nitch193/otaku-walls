import { useEffect, useState } from "react";
import { item } from "./types";

const FullsingleItem = ({ id }: { id: item }) => {
  const [fullUrl, setFullUrl] = useState<string>("");
  useEffect(() => {
    const loadItemData = async () => {
      try {
        if (id === undefined) return;
        const url =
          import.meta.env.MODE === "development"
            ? "http://localhost:8000"
            : import.meta.env.api;
        const res = await fetch(`${url}?id=${id.id}`);
        const resJson = await res.json();
        console.log("singleimage", resJson);
        setFullUrl(resJson.full as string);
      } catch (error) {
        console.log("error", error);
      }
    };
    loadItemData();
  }, [id]);
  return (
    <div className="fullSingleItem">
      <img loading="lazy" src={fullUrl} />
    </div>
  );
};
export default FullsingleItem;
