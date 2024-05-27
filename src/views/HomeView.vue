<template>
    <v-container class="my-6">
        <v-row justify="center">
            <v-col>
                <v-row justify="space-between" align="center" class="mb-5">
                    <h1 class="display-1">
                        All Pokémon
                    </h1>
                    <v-btn prepend-icon="mdi-check-circle" @click="goToFavpage">
                        <template v-slot:prepend>
                            <v-icon color="primary">
                                mdi-heart
                            </v-icon>
                        </template>
                        Favorites ({{ store.favoritePokemonIds.length }})
                    </v-btn>
                </v-row>
                <PokemonList />
            </v-col>
        </v-row>   
    </v-container>
</template>

<script setup>
import PokemonList from "../components/PokemonList.vue";
import { useFavoriteStore } from "@/stores/favoriteStore";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useFavoriteStore();

const goToFavpage = () => {
  router.push("/favorites");
};
</script>
