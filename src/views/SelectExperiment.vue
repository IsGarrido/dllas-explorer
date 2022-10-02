<template>

    <h1>Select experiment</h1>
    <b-list-group>
        <b-list-group-item @click="load_experiment(SpanishGenreExperiment)"><span v-if="indexStore.experiment == 'Spanish Genre'">🟢</span> Spanish Genre </b-list-group-item>
        <b-list-group-item @click="load_experiment(SpanishGenre10Experiment)"><span v-if="indexStore.experiment == 'Spanish Genre 10'">🟢</span> Spanish Genre 10 </b-list-group-item>
    </b-list-group>

</template>
<script setup lang="ts">


import { useIndexStore } from "../stores";
import { useSentenceStore } from "../stores/sentence";
import { useModelCategoryStore } from "@/stores/modelcategory";

import SpanishGenreExperiment from "@/schema/spanish_genre";
import SpanishGenre10Experiment from "@/schema/spanish_genre_10";

const indexStore = useIndexStore();
const sentenceStore = useSentenceStore();
const modelCategoryStore = useModelCategoryStore();

const load_experiment = ( dto : { [ key: string ] : any } ) : void => {

    const { label, words, data, models, sentences, ModelResults, DimensionResults, CategoryResults, SentenceStatistics, SentenceDimensionStatistics, ModelCategoryStatistics, ModelCategoryDimensionStatistics } = dto;

    indexStore.setExperiment(label);
    indexStore.setWords(words);
    indexStore.setModelNames(models);
    indexStore.setSentenceNames(sentences);
    indexStore.setDimensionResults(DimensionResults);
    indexStore.setFillTemplateResult(data);
    indexStore.setModelResults(ModelResults);
    indexStore.setCategoryResults(CategoryResults);

    sentenceStore.setSentenceNames(sentences);
    sentenceStore.setSentenceStatistics(SentenceStatistics);
    sentenceStore.setSentenceDimensionStatistics(SentenceDimensionStatistics);
    sentenceStore.setDimensions(DimensionResults);

    modelCategoryStore.setCategoryStatistics(ModelCategoryStatistics);
    modelCategoryStore.setCategoryModelStatistics(ModelCategoryDimensionStatistics);
}

</script>
