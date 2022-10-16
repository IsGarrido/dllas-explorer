<template>
    <router-view />
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import DataService from '@/service/DataService';

import SpanishGenreExperiment from "@/schema/spanish_genre";
import SpanishGenre10Experiment from "@/schema/spanish_genre_10";

const route = useRoute();
const _data = new DataService();

if(route.params.experiment === 'Spanish Genre'){
    _data.load_experiment(SpanishGenreExperiment);
} else if(route.params.experiment === 'Spanish Genre 10'){
    _data.load_experiment(SpanishGenre10Experiment);
} else {
    console.error('Unknown experiment: ' + route.params.experiment);
}

</script>
