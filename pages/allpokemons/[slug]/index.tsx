import "antd/dist/antd.css";
import styles from "../../../styles/Home.module.css";
import { gql } from "@apollo/client";
import client from "../../../apollo-client";
import { Pagination, Card, Button } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";

type DataProps = {
  pokemons: {
    results: {
      name: string;
      artwork: string;
    }[];
  };
};

const AllPokemons = (props: DataProps) => {
  const router = useRouter();

  const onChangeHandler = (item: number) => {
    let offset = (item - 1) * 20;
    router.push(`/allpokemons/${offset}`);
  };
  const results = props.pokemons.results;
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <Link href="/">
          <Button type="default">Back</Button>
        </Link>
      </div>
      <h1>All Pokemons</h1>
      <div className={styles.allPokemonsContainer}>
        {results.map((item) => (
          <Link key={item.name} href={`/${item.name}`}>
            <Card
              hoverable
              style={{ width: 200 }}
              cover={<img alt={item.name} src={item.artwork} />}
            >
              <li>Name: {item.name.toUpperCase()}</li>
            </Card>
          </Link>
        ))}
      </div>
      <div className={styles.pagination}>
        <Pagination defaultCurrent={1} total={500} onChange={onChangeHandler} />
      </div>
    </div>
  );
};

export default AllPokemons;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const offset = context.query.slug;
  const { data } = await client.query({
    query: gql`
      query Pokemons {
        pokemons(limit: 20, offset: ${offset} ) {
          results {
            name
            artwork
          }
        }
      }
    `,
  });
  return {
    props: {
      pokemons: data.pokemons,
    },
  };
};
 