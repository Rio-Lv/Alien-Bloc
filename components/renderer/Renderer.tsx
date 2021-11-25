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
          filter: `drop-shadow(2px 2px 7px #000000e1)`,
          pointerEvents: "none",
        }}
      >
        {title}
      </div>
    );
  };

  const icon = false;

  return (
    <div
      style={{
        position: "absolute",
        width: width > 500 ? "400px" : "100%",
        height: width > 500 ? "800px" : "100%",
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
          ? "sepia(70%) hue-rotate(-50deg) saturate(1900%) grayscale(.1) contrast(1)"
          : "sepia(20%) hue-rotate(-50deg) saturate(100%) grayscale(1) contrast(1.5)"
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
          ? "brightness(50%) saturate(100%) contrast(3)"
          : "brightness(110%) saturate(20%) contrast(1.5)"
      )}
      {filterClusters(
        "FAQ",
        red,
        saturate2
          ? "brightness(50%) saturate(100%) contrast(3)"
          : "brightness(110%) saturate(20%) contrast(1.5)"
      )}

      <Title
        title={""}
        imageSize={110}
        left={10}
        top={5}
        transform={""}
        color={"white"}
        fontSize={30}
        speed={speed}
        filter={"invert(0)"}
        url={"./logo.png"}
      />
      {!icon ? (
        <div style={{ opacity: text ? 1 : 0, transition: `${speed}s ease` }}>
          {createTitle(
            hovered === "About" ? 65 : 52, //fontSize
            "US",
            hovered === "About" ? 65 : 63, //x
            hovered === "About" ? 22 : 22, //y
            "translate(-50%,-50%) rotateZ(-15deg) perspective(30px) ",
            "white"
          )}
          {createTitle(
            hovered === "Book" ? 84 : 59, //fontSize
            "BOOK",
            53, //x
            44, //y
            "translate(-50%,-50%) perspective(30px) rotateX(.5deg)  rotateZ(-10deg) ",
            "white"
          )}

          {createTitle(
            hovered === "Merch" ? 62 : 52, //fontSize
            "SHOP",
            hovered === "Merch" ? 21 : 24, //x
            hovered === "Merch" ? 65.5 : 65.5, //y
            "translate(-50%,-50%) rotateZ(32deg) perspective(30px) rotateX(1deg)   ",
            "white"
          )}
          {createTitle(
            hovered === "FAQ" ? 65 : 52, //fontSize
            "FAQ",
            hovered === "FAQ" ? 75 : 73, //x
            hovered === "FAQ" ? 81 : 80, //y
            "translate(-50%,-50%) rotateZ(-0deg) perspective(30px) rotateX(1deg) skewX(-1deg)  ",
            "white"
          )}
        </div>
      ) : (
        <div style={{ opacity: text ? 1 : 0, transition: `${speed}s ease` }}>
          <Title
            title={""}
            imageSize={60}
            left={68}
            top={16}
            transform={""}
            color={"white"}
            fontSize={30}
            speed={speed}
            filter={"invert(1)"}
            url={
              "https://cdn-icons.flaticon.com/png/512/471/premium/471713.png?token=exp=1637839756~hmac=c922d32c01facf3e6018220b12c30b5b"
            }
          />
          <Title
            title={""}
            left={46}
            top={38}
            transform={""}
            color={"white"}
            fontSize={30}
            speed={speed}
            filter={"invert(1)"}
            url={"https://cdn-icons-png.flaticon.com/512/1164/1164651.png"}
            imageSize={70}
          />
          <Title
            title={""}
            left={14}
            top={65}
            transform={""}
            color={"white"}
            fontSize={30}
            speed={speed}
            filter={"invert(1)"}
            url={"https://cdn-icons-png.flaticon.com/512/1746/1746751.png"}
            imageSize={80}
          />

          <Title
            title={""}
            imageSize={80}
            left={65}
            top={75}
            transform={""}
            color={"white"}
            fontSize={30}
            speed={speed}
            filter={"invert(1)"}
            url={"https://cdn-icons-png.flaticon.com/512/1746/1746751.png"}
          />
          <Title2
            title={"BOOK"}
            left={43.5}
            top={46.5}
            transform={""}
            fontSize={35}
            speed={speed}
            filter={""}
          />
          <Title2
            title={"SHOP"}
            left={14}
            top={65}
            transform={""}
            fontSize={45}
            speed={speed}
            filter={""}
          />
          <Title2
            title={"FAQ"}
            left={65}
            top={65}
            transform={""}
            fontSize={45}
            speed={speed}
            filter={""}
          />
        </div>
      )}
    </div>
  );
};

export default Renderer;
