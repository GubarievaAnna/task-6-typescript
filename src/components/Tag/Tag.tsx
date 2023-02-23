import React from "react";
import "./Tag.css";

interface ITag {
type: "field" | "questions" | "time",
label: string;
}

const Tag: React.FC<ITag> = ({ label, type }) => {
  return <p className={`tag--${type}`}>{label} {type==="questions" && "запитань"} {type==="time" && "год"}</p>;
};

export default Tag;