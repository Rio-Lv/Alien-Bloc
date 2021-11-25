import React from "react";

export default function Title2(props: {
  left: number;
  top: number;
  transform: string;

  fontSize: number;
  speed: number;
  title: string;
  filter: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        fontWeight: 600,
        pointerEvents: "none",
        fontSize: `${props.fontSize}px`,
        left: `${props.left}%`,
        top: `${props.top}%`,
        backgroundColor: "#0800003b",
        paddingLeft: "4px",
        paddingRight: "4px",
        boxShadow: "0px 0px 10px #310303a6",
        // borderRadius: "10px",
      }}
    >
      <div
        style={{
          paddingLeft: "7px",
          paddingRight: "7px",
          paddingTop: "0px",
          paddingBottom: "2px",

          // borderRadius: "10px",
          backgroundSize: "cover",
          background: "#ffffff",
          // backgroundClip: "text",
          transform: "scaleX(1.2)",
          mixBlendMode: "screen",
          filter: `drop-shadow(1px 2px 7px #000000)`,
        }}
      >
        {props.title}
      </div>
    </div>
  );
}
