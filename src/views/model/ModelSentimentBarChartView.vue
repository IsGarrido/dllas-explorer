<template>

  <ModelSentimentChart 
    :labels="dimensions"
    :data="chart_data"
    :datalabels="bars">
  </ModelSentimentChart>

</template>


<script lang="ts" setup>

import { computed } from '@vue/reactivity'

import { useIndexStore } from '@/stores'
import { useRoute } from 'vue-router';

import ModelSentimentChart from '@/views/model/chart/ModelSentimentChart.vue'

interface Props {
}

let props = defineProps<Props>();

let route = useRoute();
let modelName = route.params.modelname.toString();

let indexStore = useIndexStore();

let dimensions = indexStore.dimensions;
let dimension_lookup_by_model: any = indexStore.dimension_lookup_by_model;


let bars = ['snt_pos_cnt', 'snt_neg_cnt', 'snt_neu_cnt'];


let chart_data: any = computed(() => {

  let datasets: any = {};
  let dimension_data_for_model = dimension_lookup_by_model[modelName];

  dimensions.forEach(dimension => {
    let dimension_data = dimension_data_for_model[dimension];
    let obj = {
      snt_pos_cnt: 0,
      snt_neg_cnt: 0,
      snt_neu_cnt: 0
    }
    if (dimension_data) {
      obj = {
        snt_pos_cnt: dimension_data.snt_pos_cnt,
        snt_neg_cnt: dimension_data.snt_neg_cnt,
        snt_neu_cnt: dimension_data.snt_neu_cnt,
      };
    }
    datasets[dimension] = obj;
  });
  return datasets;
});


</script>