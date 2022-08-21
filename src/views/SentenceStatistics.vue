<template>

  <div class="row">
    <h2> Statistics for the chosen templates </h2>
    <div class="col">
        <DataTable
          :items="sentence_statistics"
          :remove_cols="table_remove_cols"
          :transforms="table_transforms"
          sort_by_desc="adj_prop"
        ></DataTable>
    </div>

  </div>

</template>

<script>
import NumberHelper from '@/reluihelpers/mixin/NumberHelper'
import { useIndexStore } from '@/stores'
import { mapState } from 'pinia'
import DataTable from './data/DataTable.vue'

export default {
  props: [],
  created() {
  },
  data() {
    return {
      selectedIndex: 0,
      table_remove_cols: ['rsv_sum', 'count'],
      table_transforms: {
        'labels': (x, col) => {
            return x.join("\n");
        },
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
        'adj_prop': (x, col) => {
          return this.format(x, 2)
        },

      },
    }
  },
  components: {
    DataTable
  },
  methods: {
    format(x, dec, col){
      return NumberHelper.format(x, dec);
    }
  },
  computed: {
    ...mapState(useIndexStore, [
      'config',
      'dimensions',
      'sentence_statistics'
    ])
  }

}
</script>


