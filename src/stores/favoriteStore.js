// stores/favoriteStore.js
import { defineStore } from "pinia";
import Cookies from "js-cookie";

const FAVORITES_COOKIE = "favoritePokemons";

export const useFavoriteStore = defineStore("favorite", {
  state: () => ({
    favoritePokemonIds: [],
  }),
  actions: {
    loadFavorites() {
      const favorites = Cookies.get(FAVORITES_COOKIE);
      this.favoritePokemonIds = favorites ? JSON.parse(favorites) : [];
    },

    toggleFavorite(pokemonId) {
      const index = this.favoritePokemonIds.indexOf(pokemonId);
      if (index === -1) {
        this.favoritePokemonIds.push(pokemonId);
      } else {
        this.favoritePokemonIds.splice(index, 1);
      }
      Cookies.set(FAVORITES_COOKIE, JSON.stringify(this.favoritePokemonIds), { expires: 365 });
    },

  },
  getters: {
    isFavorite: (state) => {
      return (pokemonId) => state.favoritePokemonIds.includes(pokemonId);
    },
  },
});
