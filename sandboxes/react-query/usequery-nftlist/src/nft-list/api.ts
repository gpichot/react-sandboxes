import { Pokemon } from "pokedex-promise-v2";

export async function get<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

function sleep(ms = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function getNFTsList(page = 0, limit = 4): Promise<Pokemon[]> {
  await sleep();
  return Promise.all(
    new Array(limit)
      .fill(0)
      .map((_, index) =>
        get<Pokemon>(
          `https://pokeapi.co/api/v2/pokemon/${index + 1 + page * limit}`
        )
      )
  );
}
