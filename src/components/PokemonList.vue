<template>
    <v-row>
        <v-col cols="12" v-if="error">
            <v-alert type="error">
                {{ error.message }}
            </v-alert>
        </v-col>
        <PokemonFilter @updateFilters="updateFilters" />
        <v-col cols="12" v-if="loading && pokemons.length === 0" class="my-3 text-center">
            <v-progress-circular indeterminate color="primary" />
            <p>
                Loading...
            </p>
        </v-col>
        <v-col cols="12">
            <v-row>
                <v-col
                    v-for="pokemon in pokemons"
                    :key="pokemon.id"
                    cols="12"
                    sm="6"
                    md="3"
                    class="d-flex"
                >
                    <pokemon-card :pokemon="pokemon" class="w-100" />
                </v-col>
            </v-row>
            <div ref="loadMoreTrigger" class="my-3 text-center">
                <v-progress-circular v-if="isFetchingMore && pokemons.length > 0" indeterminate color="primary" />
            </div>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_POKEMONS, SEARCH_POKEMONS } from "../graphql/pokemonQueries";
import PokemonCard from "./PokemonCard.vue";
import PokemonFilter from "./PokemonFilter.vue";

const limit = 36;
const offset = ref(0);
const pokemons = ref([]);
const isFetchingMore = ref(false);
const searchQuery = ref("");
const selectedType = ref("");

const { result, loading, error, fetchMore } = useQuery(GET_POKEMONS, {
  limit,
  offset: offset.value,
});

const { result: searchResult, refetch: refetchSearch } = useQuery(SEARCH_POKEMONS, {
  searchQuery: searchQuery.value,
  type       : selectedType.value,
});

watchEffect(() => {
  if (searchQuery.value || selectedType.value) {
    if (searchResult.value && searchResult.value.pokemon_v2_pokemon) {
      pokemons.value = searchResult.value.pokemon_v2_pokemon;
      if (searchQuery.value) {
        const searchQueryLower = searchQuery.value.toLowerCase();
        const matchedPokemons  = pokemons.value.filter(pokemon =>pokemon.name.toLowerCase().includes(searchQueryLower));
        const unmatchedPokemons = pokemons.value.filter(pokemon =>
          !pokemon.name.toLowerCase().includes(searchQueryLower)
        );
        pokemons.value = [...matchedPokemons, ...unmatchedPokemons];
      }
    }
  } else {
    if (result.value && result.value.pokemon_v2_pokemon) {
      pokemons.value = result.value.pokemon_v2_pokemon;
    }
  }
});

const updateFilters = (filters) => {
  searchQuery.value = filters.searchQuery;
  selectedType.value = filters.selectedType;
  const formattedSearchQuery = searchQuery.value ? `%${searchQuery.value}%` : "";
  const formattedType = selectedType.value || "";
  if (searchQuery.value || selectedType.value) {
    refetchSearch({
      searchQuery: formattedSearchQuery,
      type       : formattedType,
    });
  } else {
    offset.value = 0;
    fetchMore({
      variables  : { limit, offset: offset.value },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          pokemon_v2_pokemon: fetchMoreResult.pokemon_v2_pokemon,
        };
      },
    });
  }
};

const loadMoreTrigger = ref(null);
let observer;

const loadMore = async () => {
  if (loading.value || isFetchingMore.value) return;
  isFetchingMore.value = true;
  offset.value += limit;
  await fetchMore({
    variables  : { limit, offset: offset.value },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return previousResult;
      return {
        pokemon_v2_pokemon: [
          ...previousResult.pokemon_v2_pokemon,
          ...fetchMoreResult.pokemon_v2_pokemon,
        ],
      };
    },
  });
  isFetchingMore.value = false;
};

const observeTrigger = (entries) => {
  const entry = entries[0];
  if (entry.isIntersecting) {
    loadMore();
  }
};

onMounted(() => {
  observer = new IntersectionObserver(observeTrigger, {
    root      : null,
    rootMargin: "0px",
    threshold : 1.0,
  });
  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
});

onUnmounted(() => {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value);
  }
});
</script>
