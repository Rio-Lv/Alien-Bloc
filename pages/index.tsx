import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Renderer from "../components/renderer/Renderer";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Renderer />
    </div>
  );
};

export default Home;
