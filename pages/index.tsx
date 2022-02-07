import type { NextPage } from "next";
import "antd/dist/antd.css";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { Button } from "antd";

const Home: NextPage = () => {
  return (
    <div className={styles.homePage}>
      <h1>Catch all Pokemons !</h1>
      <Link href="/allpokemons/0">
        <Button type="primary">Catch Them !</Button>
      </Link>
    </div>
  );
};

export default Home;
