<template>

  <div class="container-fluid min-vh-100 d-flex flex-column g-0" v-if="loaded">

    <div class="row g-0 flex-grow-1">
      <div class="col-2 border">
        <Sidebar label="Dllas" :entries="sidebar"></Sidebar>
      </div>
      <div class="col-md-10 border p-2 pt-4">
        <div class="container">
          <RouterView />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "./reluihelpers/template/Sidebar.vue";
import { useIndexStore } from "./stores";

import { words, data, models, sentences } from "@result/Spanish_Genre/FillTemplate/FillTemplate"
import adjectives from "@data/Adjectives/spanish_adjectives"

import ModelResults from "@result/Spanish_Genre/EvaluateCategories/ByModel"
import DimensionResults from "@result/Spanish_Genre/EvaluateCategories/ByDimension"
import CategoryResults from "@result/Spanish_Genre/EvaluateCategories/ByCategory"
import SentenceStatistics from "@result/Spanish_Genre/EvaluateCategories/SentenceStatistics"

export default {
  created(){
    const indexStore = useIndexStore();
    indexStore.setWords(words);
    indexStore.setAdjectives(adjectives);
    indexStore.setModelNames(models);
    indexStore.setSentenceNames(sentences);
    indexStore.setSentenceStatistics(SentenceStatistics);

    indexStore.setDimensionResults(DimensionResults);

    indexStore.setFillTemplateResult(data);
    indexStore.setModelResults(ModelResults);
    indexStore.setCategoryResults(CategoryResults);

    this.loaded = true;
  },
  data(){
    return {
      loaded: false,
      sidebar: [
        {
          label: 'Home',
          path: '/'
        },
        {
          label: 'Explore models',
          path: '/explore'
        },
        {
          label: 'Explore templates',
          path: '/sentences-statistics'
        },
        {
          type: 'separator'
        },
        {
          label: 'Category Tool',
          path: '/categorytool'
        }
      ]

    }
  },
  components: { Sidebar }
}
</script>
<style>
.invisible {
  color: white;
  user-select: none;;
}
</style>