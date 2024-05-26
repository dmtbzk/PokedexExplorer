import { gql } from "@apollo/client/core";

export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int, $offset: Int) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_DETAILS = gql`
query GetPokemonDetails($id: Int!) {
  pokemon_v2_pokemon_by_pk(id: $id) {
    id
    name
    height
    weight
    base_experience
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
  }
}
`;

export const GET_TYPES = gql`
  query GetTypes {
    pokemon_v2_type {
      name
    }
  }
`;

export const SEARCH_POKEMONS = gql`
  query SearchPokemons($searchQuery: String, $type: String) {
    pokemon_v2_pokemon(where: {
      _or: [
        {name: {_ilike: $searchQuery}},
        {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $type}}}},
      ]
    }) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;