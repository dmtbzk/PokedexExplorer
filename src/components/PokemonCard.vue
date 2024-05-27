<template>
    <v-card class="elevation-3 mb-4">
        <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h5 font-weight-bold">{{ pokemon.name }}</span>
            <v-btn icon @click="handleToggleFavorite" size="x-small">
                <v-tooltip activator="parent" location="bottom">
                    Add to Favorite
                </v-tooltip>
                <v-icon :color="isFavorite ? 'blue darken-3' : 'grey lighten-1'">
                    {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
                </v-icon>
            </v-btn>
        </v-card-title>
        <v-card-subtitle class="px-4 py-2">
            <span>ID: {{ pokemon.id }}</span>
        </v-card-subtitle>
        <v-divider class="mx-4 mb-2" />
        <div class="mb-4 px-4">
            <v-card-subtitle class="text-uppercase font-weight-bold">
                Types
            </v-card-subtitle>
            <v-chip-group v-model="selection" class="d-flex justify-start flex-wrap">
                <v-chip v-for="type in pokemon.pokemon_v2_pokemontypes" :key="type.pokemon_v2_type.name" class="ma-2" outlined color="blue darken-3" text-color="white">
                    {{ type.pokemon_v2_type.name }}
                </v-chip>
            </v-chip-group>
        </div>
        <v-card-actions>
            <v-btn color="blue darken-3" text block @click="openModal" class="font-weight-bold">
                View More
            </v-btn>
        </v-card-actions>
        <PokemonDetailModal v-if="isModalOpen" :id="pokemon.id" v-model="isModalOpen" />
    </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { defineProps } from "vue";
import PokemonDetailModal from "./PokemonDetailModal.vue";
import { useFavoriteStore } from "../stores/favoriteStore";

const selection = ref(null);

const props = defineProps({
  pokemon: Object,
});

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const favoriteStore = useFavoriteStore();

const isFavorite = computed(() => favoriteStore.isFavorite(props.pokemon.id));

const handleToggleFavorite = () => {
  favoriteStore.toggleFavorite(props.pokemon.id);
};

onMounted(() => {
  favoriteStore.loadFavorites();
});
</script>
