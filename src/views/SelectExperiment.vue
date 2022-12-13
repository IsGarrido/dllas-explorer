<template>

    <h1>Select experiment</h1>
    <b-list-group>
        <b-list-group-item @click="_data.load_experiment(SpanishGenreExperiment)"><span v-if="indexStore.experiment == 'Spanish Genre'">🟢</span> Spanish Genre </b-list-group-item>
        <b-list-group-item @click="_data.load_experiment(SpanishGenre10Experiment)"><span v-if="indexStore.experiment == 'Spanish Genre 10'">🟢</span> Spanish Genre 10 </b-list-group-item>
        <b-list-group-item @click="_data.load_experiment(NationalitiesExperiment)"><span v-if="indexStore.experiment == 'Nationalities'">🟢</span> NationalitiesExperiment </b-list-group-item>
    </b-list-group>

</template>
<script setup lang="ts">


import { useIndexStore } from "../stores";

import SpanishGenreExperiment from "@/schema/spanish_genre";
import SpanishGenre10Experiment from "@/schema/spanish_genre_10";
import NationalitiesExperiment from "@/schema/nationalities";
import DataService from '@/service/DataService';

const indexStore = useIndexStore();
const _data = new DataService();

</script>
