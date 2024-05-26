<template>
    <v-row>
        <v-col cols="12" sm="6">
            <v-text-field
                v-model="searchQuery"
                label="Search Pokemon"
                outlined
                clearable
                @input="emitFilters"
            />
        </v-col>
        <v-col cols="12" sm="6">
            <v-select
                v-model="selectedType"
                :items="typeOptions"
                item-text="name"
                item-value="id"
                label="Choose Type"
                outlined
                clearable
                @change="emitFilters"
            />
            <v-alert v-if="typesError" type="error" dense>
                {{ typesError.message }}
            </v-alert>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, watchEffect, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_TYPES } from "../graphql/pokemonQueries";

const emit = defineEmits(["updateFilters"]);

const typeOptions = ref([]);

const { result: typesResult, error: typesError } = useQuery(GET_TYPES);

watchEffect(() => {
  if (typesResult.value && typesResult.value.pokemon_v2_type) {
    typeOptions.value = typesResult.value.pokemon_v2_type.map(type => type.name);
  }
});

const searchQuery = ref("");
const selectedType = ref(null);

watch([searchQuery, selectedType], () => {
  emit("updateFilters", { searchQuery: searchQuery.value, selectedType: selectedType.value });
}, { immediate: true });
</script>
