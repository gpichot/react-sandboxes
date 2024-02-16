import React from "react";
import NFTCard from "./NFTCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, Loader, Message } from "semantic-ui-react";

import { getPokemonsList } from "../api";

export default function NFTList(): JSX.Element | string {
  const [page, setPage] = React.useState(0);
  const queryClient = useQueryClient();
  const pokemonListQuery = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => getPokemonsList(page),

    keepPreviousData: true,
    staleTime: 10000
  }
  );

  React.useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["pokemons", page + 1], queryFn: () =>
        getPokemonsList(page + 1)
    });
  }, [queryClient, page]);

  if (pokemonListQuery.isLoading) {
    return <Loader active />;
  }
  if (pokemonListQuery.isError) {
    return <Message error>Error</Message>;
  }
  return (
    <>
      <Card.Group style={{ padding: 10 }}>
        {pokemonListQuery.data?.map((x) => (
          <NFTCard pokemon={x} />
        ))}
      </Card.Group>
      {pokemonListQuery.isFetching ? (
        "Loading "
      ) : (
        <>
          Current page: {page + 1}
          <br />
          {page > 0 && (
            <button onClick={() => setPage((page) => Math.max(page - 1, 0))}>
              Previous
            </button>
          )}
          {<button onClick={() => setPage((page) => page + 1)}>Next</button>}
        </>
      )}
    </>
  );
}
