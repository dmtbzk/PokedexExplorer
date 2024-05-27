<template>
    <v-dialog v-model="isOpenInternal" max-width="500px">
        <v-card v-if="pokemon" class="elevation-3 rounded-lg pa-4">
            <v-card-title class="d-flex justify-space-between align-center">
                <span class="text-h5 font-weight-bold">{{ pokemon.name }}</span>
                <v-btn icon @click="close" size="small">
                    <v-icon>
                        mdi-close
                    </v-icon>
                </v-btn>
            </v-card-title>
            <v-card-subtitle class="px-4 mb-3">
                ID: {{ pokemon.id }}
            </v-card-subtitle>
            <v-divider class="mx-4 mb-4" />
            <v-card-text class="px-4 py-2">
                <v-simple-table class="mb-4">
                    <template v-slot:default>
                        <tbody>
                            <tr>
                                <td class="font-weight-bold pr-4">
                                    Height
                                </td>
                                <td>
                                    {{ pokemon.height }}
                                </td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold pr-4">
                                    Weight
                                </td>
                                <td>
                                    {{ pokemon.weight }}
                                </td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold pr-4">
                                    Base Experience
                                </td>
                                <td>
                                    {{ pokemon.base_experience }}
                                </td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold pr-4">
                                    Types
                                </td>
                                <td>
                                    <v-chip-group class="d-flex justify-start flex-wrap">
                                        <v-chip
                                            v-for="type in pokemon.pokemon_v2_pokemontypes"
                                            :key="type.pokemon_v2_type.name"
                                            class="ma-2"
                                            outlined
                                            color="blue darken-3"
                                            text-color="white"
                                        >
                                            {{ type.pokemon_v2_type.name }}
                                        </v-chip>
                                    </v-chip-group>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn color="blue darken-3" text @click="close" class="font-weight-bold">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_POKEMON_DETAILS } from "../graphql/pokemonQueries";

const props = defineProps({
  id        : Number,
  modelValue: Boolean
});
const emit = defineEmits(["update:modelValue"]);
const isOpenInternal = ref(props.modelValue);
const pokemon = ref(null);

const idRef = computed(() => props.id);
const { result, refetch } = useQuery(GET_POKEMON_DETAILS, () => ({
  id: idRef.value,
}), {
  fetchPolicy: "no-cache"
});

watch(result, (newResult) => {
  if (newResult && newResult.pokemon_v2_pokemon_by_pk) {
    pokemon.value = newResult.pokemon_v2_pokemon_by_pk;
  }
});

watch([isOpenInternal, idRef], ([newOpen, newId], [oldOpen, oldId]) => {
  if (newOpen && (newId !== oldId || !oldOpen)) {
    refetch();
  }
  if (!newOpen) {
    pokemon.value = null;
  }
  emit("update:modelValue", newOpen);
});

const close = () => {
  isOpenInternal.value = false;
};
</script>