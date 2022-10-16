<template>
  <div class="row">
    <h2> Statistics for the chosen templates </h2>

    <div class="col">
      <b-form-select v-model="selectedLabel" :options="labelOptions"></b-form-select>
      <div class="mt-3">Selected: <strong>{{ selectedLabel }}</strong></div>
    </div>

  </div>
  <div class="row">

    <div class="col" :key="selectedLabel">
      <DataTable :items="getTableData()" :remove_cols="table_remove_cols" :transforms="table_transforms"
        sort_by_desc="adj_prop"></DataTable>
    </div>

  </div>

</template>

<script>
import NumberHelper from '@/reluihelpers/mixin/NumberHelper'
import { useIndexStore } from '@/stores'
import { useSentenceStore } from '@/stores/sentence'
import { mapState } from 'pinia'
import DataTable from './data/DataTable.vue'

export default {
  props: [],
  created() {
  },
  data() {
    return {
      selectedLabel: "all",
      selectedIndex: 0,
      table_remove_cols: [ 'count'], // TODO, dejar el RSV pero solo de los que tienen adjetivos
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
    format(x, dec, col) {
      return NumberHelper.format(x, dec);
    },
    getTableData() {
      if (!this.selectedLabel || this.selectedLabel === "all")
        return this.sentence_statistics;
      return this.sentence_dimension_statistics[this.selectedLabel];
    }
  },
  computed: {
    ...mapState(useIndexStore, [
      'config',
    ]),
    ...mapState(useSentenceStore, [
      'dimensions',
      'sentence_statistics',
      'sentence_dimension_statistics'
    ]),
    labels() {
      return ['all', ...this.dimensions];
    },
    labelOptions() {
      return this.labels.map(x => ({ value: x, text: x }));
    }
  }

}
</script>


