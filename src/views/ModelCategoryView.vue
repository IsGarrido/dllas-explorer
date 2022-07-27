<template>

  <RouterLink class="btn btn-link" :to="{ name: 'model', params: {modelname: modelname } }">&lt; Back </RouterLink>

  <div class="row">
    <h2> Categories for {{ modelname }} </h2>
    <div class="col">
        <DataTable :items="categories_table_data" :remove_cols="table_remove_cols" :transforms="table_transforms"></DataTable>
    </div>

  </div>

</template>

<script>
import NumberHelper from '@/reluihelpers/mixin/NumberHelper'
import { useIndexStore } from '@/stores'
import { mapState, mapStores } from 'pinia'
import DataTable from './data/DataTable.vue'

export default {
  props: [],
  created() {
  },
  data() {
    return {
      selectedIndex: 0,
      table_remove_cols: ['category'],
      table_transforms: {
        'rsv_sum': (x, col) => {
          return this.format(x, 0, col)
        },
        'rsv_mean': (x, col) => {
          return this.format(x, 0, col)
        },
        'rsv_min': (x, col) => {
          return this.format(x, 0, col)
        },
        'rsv_max': (x, col) => {
          return this.format(x, 0, col)
        },
        'score_sum': (x, col) => {
          return this.format(x, 5, col)
        },
        'score_mean': (x, col) => {
          return this.format(x, 5, col)
        },
        'score_min': (x, col) => {
          return this.format(x, 5, col)
        },
        'score_max': (x, col) => {
          return this.format(x, 5, col)
        },
        'adjetive_proportion': (x, col) => {
          return this.format(x, 2)
        },

      },
    }
  },
  components: {
    DataTable
  },
  methods: {
    getSentences(dimension, index){
      let sentences = Object.values(this.sentences_lookup[dimension]);
      return sentences[index];
    },
    getSentence(dimension, index){
      let sentences = Object.keys(this.sentences_lookup[dimension]);
      return sentences[index];
    },
    format(x, dec, col){
      return NumberHelper.format(x, dec);
    }

  },
  computed: {
    ...mapState(useIndexStore, [
      'config',
      'dimensions',
      'category_model_lookup'
    ]),
    modelname() {
      return this.$route.params.modelname;
    },
    categories_table_data(){
      return Object.values(this.category_model_lookup[this.modelname]).flatMap( dimension_data => Object.values(dimension_data) ).flatMap( y => y);
    }

  }

}
</script>


