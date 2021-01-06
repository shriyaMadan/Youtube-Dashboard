import React from "react";
import "./card.css";

export const Card = (props) => {
  return <div className="card">{props.children}</div>;
};
