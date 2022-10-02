<template>

  <div class="container-fluid min-vh-100 d-flex flex-column g-0" v-if="state.loaded">

    <div class="row g-0 flex-grow-1">
      <div class="col-2 border">
        <Sidebar label="Dllas" :entries="state.sidebar">
          <span>Selected experiment: {{ indexStore.experiment }}</span>
        </Sidebar>
      </div>
      <div class="col-md-10 border p-2 pt-4">
        <div class="container">
          <RouterView />
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import { useIndexStore } from "./stores";
import { useSentenceStore } from "./stores/sentence";
import { useModelCategoryStore } from "@/stores/modelcategory";
import DataService from "./service/DataService";

import SpanishGenre10Experiment from "@/schema/spanish_genre_10";
import Sidebar from "./reluihelpers/template/Sidebar.vue";
import { reactive } from "vue";
import { RouterView } from "vue-router";

// const indexStore = useIndexStore();
const sentenceStore = useSentenceStore();
const modelCategoryStore = useModelCategoryStore();
const state = reactive({
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
      label: 'Explore categories',
      path: '/categories-statistics'
    },
    {
      type: 'separator'
    },
    {
      label: 'Category Tool',
      path: '/categorytool'
    }
  ]
});

const indexStore = useIndexStore();
const _data = new DataService();
_data.load_experiment(SpanishGenre10Experiment);
state.loaded = true;

</script>

<style>
.invisible {
  color: white;
  user-select: none;
  ;
}
</style>