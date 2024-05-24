<template>
    <v-container>
        <v-row>
            <v-col cols="12" v-if="loading && pokemons.length === 0" class="my-3 text-center">
                <v-progress-circular indeterminate color="primary"/>
                <p>
                    Loading...
                </p>
            </v-col>
            <v-col cols="12" v-if="error">
                <v-alert type="error">
                    {{ error.message }}
                </v-alert>
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
                    <v-progress-circular v-if="isFetchingMore" indeterminate color="primary" />
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_POKEMONS } from "../graphql/pokemonQueries";
import PokemonCard from "./PokemonCard.vue";

const limit = 96; // Her yüklemede getirilecek Pokémon sayısı
const offset = ref(0);
const pokemons = ref([]);
const isFetchingMore = ref(false);

const { result, loading, error, fetchMore } = useQuery(GET_POKEMONS, {
  limit, offset: offset.value,
});

watchEffect(() => {
  if (result.value && result.value.pokemon_v2_pokemon) {
    pokemons.value = result.value.pokemon_v2_pokemon;
  }
});

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
