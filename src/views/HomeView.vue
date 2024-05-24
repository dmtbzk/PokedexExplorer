<template>
   
    <v-row justify="center">
        <v-col cols="12" md="8">
            <h1 class="display-1 mb-5">
                All Pokémon
            </h1>
            <PokemonList />
        </v-col>
    </v-row>

</template>

<script setup>
import PokemonList from "../components/PokemonList.vue";
</script>
