<template>

<div class="row">
    <div class="col">
        <h3>Explore models</h3>

        <div class="row">
          <span v-for="(model, midx) in model_results" :key="midx">
            <RouterLink class="btn btn btn-link " :to="{ name: 'model', params: {modelname: model.name } }">{{ model.name }} ({{ format(model.adj_prop) }} adjectives)</RouterLink>
          </span>
        </div>
    </div>
</div>

</template>

<script>
import { useIndexStore } from '@/stores'
import { mapState, mapStores } from 'pinia'
import NumberHelper from "@/reluihelpers/mixin/NumberHelper"

export default {
  props: [],
  created() {
  },
  data() {
    return {
 
    }
  },
  components: {
  },
  methods: {
    format(n){
      return NumberHelper.format_prc(n);
    }
  },
  computed: {
    ...mapStores(useIndexStore),
    ...mapState(useIndexStore, ['model_results']),
  }

}
</script>


