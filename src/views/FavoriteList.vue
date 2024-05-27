
<template>
    <v-container class="my-6">
        <v-row justify="space-between" align="center" class="mb-5">
            <h1 class="display-1">
                Favorite Pokémon List
            </h1>
            <v-btn  @click="goToHomepage">
                <v-icon color="primary">
                    mdi-pokemon-go                    
                </v-icon>
                ALL Pokemons
            </v-btn>
        </v-row>
        <v-card>
            <v-data-table
                :headers="tableHeaders"
                :items="favoritePokemons"
                :loading="loading"
                class="elevation-1"
            >
                <template v-slot:item.actions="{ item }">
                    <v-btn icon color="red-darken-3" @click="handleToggleFavorite(item.id)" size="x-small">
                        <v-icon>
                            mdi-delete
                        </v-icon>
                    </v-btn>
                </template>
            </v-data-table>
            <v-alert v-if="error" type="error" class="mt-4">
                An error occurred while loading Pokémon data.            
            </v-alert>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_FAVORITE_POKEMON_DETAILS } from "@/graphql/pokemonQueries";
import { useFavoriteStore } from "@/stores/favoriteStore";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useFavoriteStore();
const tableHeaders = ref([
  { title: "Name", key: "name", width: "40%" },
  { title: "Types", key: "types", width: "40%" },
  { title: "Actions", key: "actions", width: "20%", align: "center" }
]);

const favoritePokemons = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(() => {
  store.loadFavorites();
});

const { loading: queryLoading, error: queryError, result } = useQuery(GET_FAVORITE_POKEMON_DETAILS, () => ({
  ids    : store.favoritePokemonIds ,
  enabled: store.favoritePokemonIds.length > 0
}));

watchEffect(() => {
  loading.value = queryLoading.value;
  error.value = queryError.value ? queryError.value.message : null;
  if (result.value && result.value.pokemon_v2_pokemon) {
    favoritePokemons.value = result.value.pokemon_v2_pokemon.map(p => ({
      id   : p.id,
      name : p.name,
      types: p.pokemon_v2_pokemontypes.map(type => type.pokemon_v2_type.name).join(", ")
    }));
  }
});

const handleToggleFavorite = (pokemonId) => {
  store.toggleFavorite(pokemonId);
};

const goToHomepage = () => {
  router.push("/");
};
</script>
