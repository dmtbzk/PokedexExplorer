<template>
    <v-card>
        <v-card-title>
            {{ pokemon.name }}
        </v-card-title>
        <v-card-subtitle>
            ID: {{ pokemon.id }}
        </v-card-subtitle>
        <v-divider class="mx-4 mb-1" />
        <div class="px-4 mb-2">
            <v-chip-group v-model="selection" selected-class="bg-blue-darken-3">
                <v-chip
                    v-for="type in pokemon.pokemon_v2_pokemontypes"
                    :key="type.pokemon_v2_type.name"
                    class="bg-blue-darken-3"
                    outlined
                >
                    {{ type.pokemon_v2_type.name }}
                </v-chip>
            </v-chip-group>
        </div>
        <v-card-actions>
            <v-btn
                color="blue-darken-3"
                text="View More"
                block
                border
                @click="openModal"
            />
        </v-card-actions>
        <PokemonDetailModal :id="pokemon.id" v-model="isModalOpen" />
    </v-card>
</template>

<script setup>
import { ref } from "vue";
import { defineProps } from "vue";
import PokemonDetailModal from "./PokemonDetailModal.vue";

defineProps({
  pokemon: Object,
});

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};
</script>