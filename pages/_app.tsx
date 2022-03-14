import "../styles/globals.css";
import type { AppProps } from "next/app";
import Renderer from "../components/renderer/Renderer";
import React, { useState } from "react";
function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState("");
  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
