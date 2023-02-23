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


// import React from 'react';
// import s from "./Card.scss";


// interface CardProps {
//   size: string,
//   number: number,
//   time: number,

// }

// const Card: React.FC<CardProps> = ({
//   size = "small",
//   number = 50,
//   time = 2
// }) => {
//   return (
//     <li className={`${s[`card--${size}`]}`}>

//     </li>
//   )
// }

// export default Card;