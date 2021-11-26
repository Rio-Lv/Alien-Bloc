import React from "react";

export default function Title(props: {
  left: number;
  top: number;
  transform: string;
  color: string;
  fontSize: number;
  speed: number;
  title: string;
  filter: string;
  url: string;
  imageSize: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        filter: `drop-shadow(2px 2px 7px #330000a7)`,
        pointerEvents: "none",
        left: `${props.left}%`,
        top: `${props.top}%`,
        transition: `${props.speed}s ease`,
        transform: "",
        // border: "3px solid red",
      }}
    >
      <div
        style={{
          width: `${props.imageSize}px`,
          height: `${props.imageSize}px`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${props.url})`,
          transition: `${props.speed}s ease`,
          filter: props.filter,
        }}
      ></div>
      <div
        style={{
          transform: props.transform,
          textAlign: "center",
          fontSize: `${props.fontSize}px`,
          transition: `${props.speed}s ease`,
          color: props.color,
        }}
      >
        {props.title}
      </div>
    </div>
  );
}
