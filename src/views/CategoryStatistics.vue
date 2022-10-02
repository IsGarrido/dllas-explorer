<template>
  <div class="row">
    <h2> Statistics for the categories </h2>

    <div class="col-3">
      <b-form-group label="Model:" label-for="input-model" description="Select a model">
        <b-form-select id="input-model" v-model="selectedModelIndex" :options="modelOptions"></b-form-select> 
      </b-form-group>
    </div>

    <div class="col-3">
      <b-form-group label="Category:" label-for="input-model" description="Select a category">
        <b-form-select id="input-model" v-model="selectedCategory" :options="categoryOptions"></b-form-select> 
      </b-form-group>
    </div>

    <div class="col-3">
      <b-form-group label="First dimension:" label-for="input-model" description="Select a dimension">
        <b-form-select id="input-model" v-model="selectedDimension1" :options="dimensionOptions"></b-form-select> 
      </b-form-group>
    </div>


    <div class="col-3">
      <!-- Cat -->
      <b-form-group label="Second dimension:" label-for="input-model" description="Select other">
        <b-form-select id="input-model" v-model="selectedDimension2" :options="dimensionOptions"></b-form-select> 
      </b-form-group>
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
import { useModelCategoryStore } from '@/stores/modelcategory'
import { useSentenceStore } from '@/stores/sentence'
import { mapState } from 'pinia'
import DataTable from './data/DataTable.vue'

export default {
  props: [],
  created() {
    this.selectedCategory = this.categories[0];
    this.selectedDimension1 = this.dimensions[0];
    this.selectedDimension2 = this.dimensions[1];
  },
  data() {
    return {
      selectedLabel: "all",
      selectedModelIndex: 0,
      selectedCategory: '',
      selectedDimension1: '',
      selectedDimension2: '',
      table_remove_cols: [],
      table_transforms: {
        'score_prop': (x, col) => {
          return this.format(x, 2)
        },
        'rsv_prop': (x, col) => {
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
      let data1 = this.categories_model_statistics[this.selectedModelIndex][this.selectedCategory][this.selectedDimension1];
      let data2 = this.categories_model_statistics[this.selectedModelIndex][this.selectedCategory][this.selectedDimension2];
      let diff = {
        model_name: this.model_names[this.selectedModelIndex], 
        score_prop: data1.score_prop - data2.score_prop,
        rsv_prop: data1.rsv_prop - data2.rsv_prop,
      }
      console.log(data1, data2, diff);

      return diff;
    }
  },
  computed: {
    ...mapState(useIndexStore, [
      'config',
      'categories',
      'model_names'
    ]),
    ...mapState(useModelCategoryStore, [
      'categories_model_statistics', // Model / Cat / Dimension
    ]),
    ...mapState(useSentenceStore, [
      'dimensions'
    ]),
    labels() {
      return ['all', ...this.dimensions];
    },
    labelOptions() {
      return this.labels.map(x => ({ value: x, text: x }));
    },
    dimensionOptions(){
      return this.dimensions.map((x, idx) => ({ value: x, text: x }));
    },
    modelOptions() {
      return this.model_names.map((x, idx) => ({ value: idx, text: x }));
    },
    categoryOptions() {
      return this.categories.map((x, idx) => ({ value: x, text: x }));
    },
  }

}
</script>


