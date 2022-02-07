import React from "react";
import client from "../apollo-client";
import { gql } from "@apollo/client";
import Link from "next/link";
import { Button, Card } from "antd";
import styles from "../styles/Home.module.css";
import { GetServerSidePropsContext } from "next";

type DataProps = {
  currentPokemon: {
    name: string;
    height: number;
    weight: number;
    moves: { move: { name: string } }[];
    sprites: { front_default: string };
  };
};

const CurrentPokemon = (props: DataProps) => {
  const moves = props.currentPokemon.moves;
  const movesArr = moves.map((move) => move.move.name);
  const image = props.currentPokemon.sprites.front_default;
  return (
    <div className={styles.clickedPokemon}>
      <div className={styles.button}>
        <Link href="/allpokemons/0">
          <Button type="default">Back</Button>
        </Link>
      </div>
      <Card
        style={{ width: 340 }}
        cover={<img alt={props.currentPokemon.name} src={image} />}
      >
        <h1 className="name">{props.currentPokemon.name.toUpperCase()}</h1>
        <h1>Height: {props.currentPokemon.height} cm.</h1>
        <h1>Weight: {props.currentPokemon.weight} gr.</h1>
        MOVES :
        {movesArr.map((move) =>
          move.length === 0 ? (
            "No moves to be shown!"
          ) : (
            <li key={move}>{move}</li>
          )
        )}
      </Card>
    </div>
  );
};

export default CurrentPokemon;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const currPokemonName = context.query.currentPokemon;
  const { data } = await client.query({
    query: gql`
    query {
      pokemon(name: "${currPokemonName}") {
        name
        height
        weight
        moves{
          move{
            name
          }
        }
        sprites {
          front_default
        }
      }
    }
    `,
  });

  return {
    props: {
      currentPokemon: data.pokemon,
    },
  };
};
