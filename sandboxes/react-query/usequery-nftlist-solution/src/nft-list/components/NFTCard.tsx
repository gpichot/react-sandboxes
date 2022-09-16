import { Pokemon } from "pokedex-promise-v2";
import React from "react";
import { Card, Icon, Image, Label, Button } from "semantic-ui-react";

function getColor({
  isFocused,
  isPremium
}: {
  isFocused: boolean;
  isPremium: boolean;
}) {
  if (isFocused) {
    return "blue";
  }
  if (isPremium) {
    return "yellow";
  }
  return undefined;
}

function isPokemonPremium(pokemon: Pokemon) {
  return pokemon.weight % 7 === 0;
}

export default function PokemonCard({
  pokemon,
  ...otherProps
}: { pokemon: Pokemon } & React.ComponentProps<typeof Card>) {
  const isPremium = isPokemonPremium(pokemon);
  const hp = pokemon.stats.find((stat) => stat.stat.name === "hp");

  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <Card
      color={getColor({ isFocused, isPremium })}
      {...otherProps}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      raised={isFocused}
      style={{ outline: 0 }}
    >
      <Card.Content>
        <Image floated="right" src={pokemon.sprites.front_default} />
        <Card.Header>{pokemon.name}</Card.Header>
        <Card.Meta>
          {pokemon.types.map((type) => type.type.name).join(", ")}
        </Card.Meta>
        {isPremium && process.env.NODE_ENV === "development" && (
          <Label color="yellow" ribbon>
            Premium
          </Label>
        )}
      </Card.Content>
      <Card.Content extra>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div>
            {hp && (
              <>
                <Icon name="heart" />
                {hp.base_stat}
              </>
            )}
          </div>
          <Button as="a" href={`/detail/${pokemon.id}`} size="mini" secondary>
            More
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
