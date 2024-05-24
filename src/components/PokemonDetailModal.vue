<template>
    <v-dialog v-model="isOpenInternal" max-width="500px">
        <v-card v-if="pokemon">
            <v-card-title>
                {{ pokemon.name }}
            </v-card-title>
            <v-card-subtitle>
                ID: {{ pokemon.id }}
            </v-card-subtitle>
            <v-card-text>
                <p>
                    Height: {{ pokemon.height }}
                </p>
                <p>
                    Weight: {{ pokemon.weight }}
                </p>
                <p>
                    Base Experience: {{ pokemon.base_experience }}
                </p>
                <p>
                    Types:
                </p>
                <ul>
                    <li v-for="type in pokemon.pokemon_v2_pokemontypes" :key="type.pokemon_v2_type.name">
                        {{ type.pokemon_v2_type.name }}
                    </li>
                </ul>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" text @click="close">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
  
<script setup>
import { ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_POKEMON_DETAILS } from "../graphql/pokemonQueries";
  
const props = defineProps({
  id: {
    type    : Number,
    required: true
  },
  modelValue: {
    type    : Boolean,
    required: true
  }
});
  
const emit = defineEmits(["update:modelValue"]);
  
const isOpenInternal = ref(props.modelValue);
  
watch(() => props.modelValue, (newValue) => {
  isOpenInternal.value = newValue;
});
  
watch(isOpenInternal, (newValue) => {
  emit("update:modelValue", newValue);
});
  
const { result } = useQuery(GET_POKEMON_DETAILS, {
  id: props.id,
});
  
const pokemon = ref(null);
  
watch(result, (newResult) => {
  if (newResult && newResult.pokemon_v2_pokemon_by_pk) {
    pokemon.value = newResult.pokemon_v2_pokemon_by_pk;
  }
});
  
const close = () => {
  isOpenInternal.value = false;
};
</script>
