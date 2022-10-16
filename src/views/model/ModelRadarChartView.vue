<template>

<ModelRadarChart 
    :key="props.selectedRadarChartAttribute"
    :dimensions="dimensions"
    :categories="categories"
    :data="model_categories_statistics"
    :attribute="props.selectedRadarChartAttribute">
</ModelRadarChart>

</template>


<script lang="ts" setup>

import { computed } from '@vue/reactivity';

import { useIndexStore } from '@/stores'
import { useConfigStore } from '@/stores/config'
import { useModelCategoryStore } from '@/stores/modelcategory'
import { useRoute } from 'vue-router';

import ModelRadarChart from '@/views/model/chart/ModelRadarChart.vue'

interface Props {
    selectedRadarChartAttribute: string
}

let props = defineProps<Props>();

let route = useRoute();
let modelName = route.params.modelname.toString();

let indexStore = useIndexStore();
let configStore = useConfigStore();
let modelStore = useModelCategoryStore();

let dimensions = indexStore.dimensions;
let categories = configStore.categories;
let modelname_dimension_category_statistics : any = modelStore.modelname_dimension_category_statistics;

let model_categories_statistics : any = computed( () => {
  return modelname_dimension_category_statistics[modelName];
});


</script>