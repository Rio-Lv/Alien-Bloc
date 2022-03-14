import React, { useState, useEffect } from "react";

interface Props {}

const Book = (props: Props) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [white, setWhite] = useState(false);

  const [mobile, setMobile] = useState(false);
  const [fastMode, setFastMode] = useState(true);

  const [w, setW] = useState("");
  const [h, setH] = useState("");
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    if (width < 500) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [width]);
  useEffect(() => {
    setTimeout(() => {
      setFastMode(false);
      setWhite(true);
    }, 0);
  }, []);
  useEffect(() => {
    const widthBool = () => {
      if (mobile && white) return "100%";
      if (mobile && !white) return "88%";
      if (!mobile && white) return `${width}px`;
      if (!mobile && !white) return `${400 * 0.88}px`;
    };
    const heightBool = () => {
      if (mobile && white) return "100%";
      if (mobile && !white) return "80%";
      if (!mobile && white) return `${height}px`;
      if (!mobile && !white) return `${800 * 0.8}px`;
    };
    const wb = widthBool();
    const hb = heightBool();

    if (wb !== undefined && hb !== undefined) {
      setW(wb);
      setH(hb);
    }
  }, [white, mobile]);

  return (
    <div style={{ position: "fixed", width: "100%", height: "100%" }}>
      <div
        style={{
          position: "absolute",
          width: w,
          height: h,
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          userSelect: "none",
          overflow: "hidden",
          background: "white",
          transition: fastMode ? "0s ease" : "1s ease",
          //   border: "4px solid red",
        }}
      >
        {/* mobile:{mobile ? "true" : "false"}______ white:
        {white ? "true" : "false"} */}
      </div>
    </div>
  );
};
export default Book;
