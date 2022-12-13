<template>

  <ModelBarChart :labels="dimensions" :data="chart_data" :datalabels="categories">
  </ModelBarChart>
</template>


<script lang="ts" setup>

import { computed } from '@vue/reactivity';

import { useIndexStore } from '@/stores'
import { useConfigStore } from '@/stores/config'
import { useRoute } from 'vue-router';

import ModelBarChart from '@/views/model/chart/ModelBarChart.vue'

interface Props {
  selectedRadarChartAttribute: string
}

let props = defineProps<Props>();

let route = useRoute();
let modelName = route.params.modelname.toString();

let indexStore = useIndexStore();
let configStore = useConfigStore();

let dimensions = indexStore.dimensions;
let category_lookup = indexStore.category_lookup;
let model_lookup: any = indexStore.model_lookup;

let config = indexStore.config;

let categories = configStore.categories;


let chart_data: any = computed(() => {
  let datasets: any = {};
  dimensions.forEach(dimension => {
    datasets[dimension] = categories.map(category => {
      let dimension_data = category_lookup[dimension];
      if (!dimension_data) return 0;

      let category_data: any = dimension_data[category];
      if (!category_data) return 0;

      let category_total = config.use_score ? category_data.score_sum : category_data.rsv_sum;
      if (config.show_prc && false) {
        let model_data = model_lookup[modelName];
        let model_total = config.use_score ? model_data.score_sum : model_data.rsv_sum;
        return (category_total / model_total) * 100;
      }
      return category_total
    });
  });
  return datasets;
});


</script>