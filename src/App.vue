<template>

  <div class="container-fluid min-vh-100 d-flex flex-column g-0">

    <div class="row g-0 flex-grow-1">
      <div class="col-2 border">
        <Sidebar label="Dllas" :entries="sidebar"></Sidebar>
      </div>
      <div class="col-md-10 border p-2">
        <RouterView />
      </div>
    </div>
  </div>

</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "./reluihelpers/template/Sidebar.vue";

export default {
  data(){
    return {
      sidebar: [
        {
          label: 'Home',
          path: '/'
        },
        {
          label: 'Category Tool',
          path: '/categorytool'
        },
        {
          label: 'Home',
          path: '/'
        },
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