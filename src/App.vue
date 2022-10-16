<template>

  <div class="container-fluid min-vh-100 d-flex flex-column g-0" v-if="state.loaded">

    <div class="row g-0 flex-grow-1">
      <div class="col-2 border">
        <Sidebar label="Dllas" :entries="sidebar">
          <span>Selected a experiment: {{ indexStore.experiment }}</span>
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

import { reactive } from "vue";
import { RouterView } from "vue-router";
import { computed } from "@vue/reactivity";

import { useIndexStore } from "./stores";
import DataService from "./service/DataService";

import Sidebar from "./reluihelpers/template/Sidebar.vue";

const indexStore = useIndexStore();
const _data = new DataService();

const state = reactive({
  loaded: false,
  sidebar: [
    {
      label: 'Home',
      name: 'home',
    },
    {
      label: 'Explore models',
      name: 'explore',
      needsExperiment: true
    },
    {
      label: 'Explore templates',
      name: 'sentences-statistics',
      needsExperiment: true
    },
    {
      label: 'Explore categories',
      name: 'categories-statistics',
      needsExperiment: true
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

const sidebar = computed(() => {

  if(!indexStore.experiment)
    return state.sidebar.filter( (e) => !e.needsExperiment );

  let experiment = indexStore.experiment;
  state.sidebar = state.sidebar.map( x => {
    return {...x, payload: { experiment } };
  });

  console.count("App.vue > computed > indexStore.experiment");
  
  return state.sidebar;
});

state.loaded = true;

</script>

<style>
.invisible {
  color: white;
  user-select: none;
}
</style>