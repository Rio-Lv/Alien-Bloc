import React, { useEffect, useState } from "react";
import { rendererProps } from "../interface";

import {
  aboutHover,
  bookHover,
  crackedClosed,
  crackedClusters,
  crackedOpen,
  faqHover,
  homeHover,
  merchHover,
} from "./anchorsInit";

import { calculateStuff } from "./functions";

import { generatePolygons, CreatePolyV3 } from "./functions";
import Title from "./Title";
import Title2 from "./Title2";
const Renderer = (props: any) => {
  const [anchors, setAnchors] = useState(crackedClosed);
  const [clusters, setClusters] = useState(crackedClusters);
  const [saturate, setSaturate] = useState(false);
  const [saturate2, setSaturate2] = useState(false);
  const [speed, setSpeed] = useState(0.5);
  const [booking, setBooking] = useState(false);
  const [hovered, setHovered] = useState("");
  const [text, setText] = useState(false);
  const [width, setWidth] = useState<number>(0);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSaturate(true);
    }, 1000);
    setTimeout(() => {
      setSaturate2(true);
    }, 1500);

    setTimeout(() => {
      setAnchors(crackedOpen);
    }, 2000);
    setTimeout(() => {
      setText(true);
      setSpeed(0.3);
    }, 3000);
  }, []);

  useEffect(() => {
    if (speed === 0.3) {
      console.log(hovered);
      if (hovered === "Book") {
        setAnchors(bookHover);
      } else if (hovered === "About") {
        setAnchors(aboutHover);
      } else if (hovered === "Home") {
        setAnchors(homeHover);
      } else if (hovered === "FAQ") {
        setAnchors(faqHover);
      } else if (hovered === "Merch") {
        setAnchors(merchHover);
      } else {
        setAnchors(crackedOpen);
      }
    }
  }, [hovered, saturate]);

  const createColorPoly = (Name: string, cluster: number[], filter: string) => {
    const mouseEnter = () => {
      setHovered(Name);
    };
    const mouseLeave = () => {
      setHovered("");
    };
    const clickFunction = () => {};

    const a = cluster[0];
    const b = cluster[1];
    const c = cluster[2];

    var newAnchors: any = [];
    cluster.forEach((num) => {
      newAnchors.push(anchors[num]);
    });

    const stuff = calculateStuff([anchors[a], anchors[b], anchors[c]]);
    return (
      <CreatePolyV3
        anchors={newAnchors}
        color={"cyan"}
        filter={filter}
        speed={speed}
        mouseEnter={mouseEnter}
        mouseLeave={mouseLeave}
        clickFunction={clickFunction}
      ></CreatePolyV3>
    );
  };

  const filterClusters = (
    Name: string,
    clusters: number[][],
    filterString: string
  ) => {
    var filtered: any = [];
    clusters.forEach((cluster) => {
      filtered.push(createColorPoly(Name, cluster, filterString));
    });
    return filtered;
  };
  const black = [[0, 1, 2]];
  const blue = [[12, 13, 14]];
  const green = [[3, 4, 5]];
  const orange = [[6, 7, 8]];
  const red = [[9, 10, 11]];

  const createTitle = (
    fontSize: number,
    title: string,
    left: number,
    top: number,
    transform: string,
    color: string
  ) => {
    return (
      <div
        style={{
          position: "absolute",
          left: `${left}%`,
          top: `${top}%`,
          fontSize: `${fontSize}px`,
          transform: transform,
          fontWeight: 600,
          transition: `${speed}s ease`,
          color: color,
          filter: `drop-shadow(2px 2px 7px #250000b2)`,
          pointerEvents: "none",
        }}
      >
        {title}
      </div>
    );
  };

  return (
    <div
      style={{
        position: "absolute",
        width: width > 500 ? "400px" : "100%",
        height: width > 500 ? "800px" : "100%",
        left: width > 500 ? "50%" : "0%",
        top: width > 500 ? "50%" : "0%",
        transform: width > 500 ? "translate(-50%,-50%)" : "translate(0%,0%)",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {generatePolygons(anchors, clusters, speed)}
      {filterClusters(
        "Book",
        blue,
        saturate
          ? "sepia(70%) hue-rotate(-50deg) saturate(1900%) grayscale(.1) contrast(1)"
          : "sepia(20%) hue-rotate(-50deg) saturate(100%) grayscale(1) contrast(1.5)"
      )}
      {filterClusters(
        "About",
        green,
        saturate
          ? "sepia(70%) hue-rotate(-50deg) saturate(1900%) grayscale(.1) contrast(1) "
          : "sepia(20%) hue-rotate(-50deg) saturate(100%) grayscale(1) contrast(1.5) "
      )}
      {filterClusters(
        "Merch",
        orange,
        saturate
          ? "sepia(70%) hue-rotate(-50deg) saturate(1900%) grayscale(.1) contrast(1)"
          : "sepia(20%) hue-rotate(-50deg) saturate(100%) grayscale(1) contrast(1.5)"
      )}
      {filterClusters(
        "Home",
        black,
        saturate2
          ? "brightness(45%) saturate(100%) contrast(3)"
          : "brightness(110%) saturate(20%) contrast(1.5)"
      )}
      {filterClusters(
        "FAQ",
        red,
        saturate2
          ? "brightness(48%) saturate(100%) contrast(3)"
          : "brightness(110%) saturate(20%) contrast(1.5)"
      )}

      <Title
        title={""}
        imageSize={!saturate2 ? 200 : hovered === "Home" ? 110 : 100}
        left={!saturate2 ? 30 : hovered === "Home" ? 4 : 10}
        top={!saturate2 ? 35 : hovered === "Home" ? 2 : 5}
        transform={""}
        color={"white"}
        fontSize={30}
        speed={speed}
        filter={"invert(0)"}
        url={"./logo.png"}
      />

      <div style={{ opacity: text ? 1 : 0, transition: `${speed}s ease` }}>
        {createTitle(
          hovered === "About" ? 65 : 55, //fontSize
          "about",
          hovered === "About" ? 65 : 63, //x
          hovered === "About" ? 22 : 22, //y
          "translate(-50%,-50%) rotateZ(0deg) perspective(30px) rotateZ(-5deg) ",
          "white"
        )}
        {createTitle(
          hovered === "Book" ? 84 : 55, //fontSize
          "book",
          53, //x
          44, //y
          "translate(-50%,-50%) perspective(30px) rotateX(.5deg)  rotateZ(0deg) ",
          "white"
        )}

        {createTitle(
          hovered === "Merch" ? 62 : 55, //fontSize
          "shop",
          hovered === "Merch" ? 21 : 24, //x
          hovered === "Merch" ? 65.5 : 65.5, //y
          "translate(-50%,-50%) rotateZ(0deg) perspective(30px) rotateX(1deg) rotateZ(5deg)  ",
          "white"
        )}

        <Title
          title={""}
          imageSize={hovered === "FAQ" ? 100 : 80}
          left={hovered === "FAQ" ? 66 : 65}
          top={hovered === "FAQ" ? 76 : 75}
          transform={""}
          color={"white"}
          fontSize={30}
          speed={speed}
          filter={"invert(1)"}
          url={"https://cdn-icons-png.flaticon.com/512/1746/1746751.png"}
        />
      </div>
    </div>
  );
};

export default Renderer;
