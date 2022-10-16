<template>
  <div class="row">
    <h2> Statistics for the categories </h2>

    <div class="col-4">
      <b-form-group label="Category:" label-for="input-model" description="Select a category">
        <b-form-select id="input-model" v-model="selectedCategory" :options="categoryOptions"></b-form-select> 
      </b-form-group>
    </div>

    <div class="col-4">
      <b-form-group label="First dimension:" label-for="input-model" description="Select a dimension">
        <b-form-select id="input-model" v-model="selectedDimension1" :options="dimensionOptions"></b-form-select> 
      </b-form-group>
    </div>


    <div class="col-4">
      <!-- Cat -->
      <b-form-group label="Second dimension:" label-for="input-model" description="Select other">
        <b-form-select id="input-model" v-model="selectedDimension2" :options="dimensionOptions"></b-form-select> 
      </b-form-group>
    </div>
  </div>

  <div class="row" :key="selectedCategory + selectedDimension1 + selectedDimension2">

    <div class="col" :key="selectedLabel">
      <table class="table b-table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col" class="b-table-sortable-column"><div class="d-flex flex-nowrap align-items-center gap-1"><div>model name</div></div></th>
            <th scope="col" class="b-table-sortable-column"><div class="d-flex flex-nowrap align-items-center gap-1"><div>score prop</div></div></th>
            <th scope="col" class="b-table-sortable-column"><div class="d-flex flex-nowrap align-items-center gap-1"><div>rsv prop</div></div></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rIdx) in getTableData()" :key="rIdx">
            <td>{{ row.model_name }}</td>
            <td :style="StyleHeatmap('score_prop', row.score_prop)">{{ row.score_prop }} %</td>
            <td :style="StyleHeatmap('rsv_prop', row.rsv_prop)">{{ row.rsv_prop}} %</td>
          </tr>
          
        </tbody>
      </table>

      <!-- <DataTable :items="getTableData()" :remove_cols="table_remove_cols" :transforms="table_transforms"
        sort_by_desc="adj_prop"></DataTable> -->
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
    this.selectedCategory = this.categories.indexOf("Cuerpo") !== -1 ? 'Cuerpo' : this.categories[0];
    this.selectedDimension1 = this.dimensions[1];
    this.selectedDimension2 = this.dimensions[0];
  },
  data() {
    return {
      selectedLabel: "all",
      selectedModelIndex: 0,
      selectedCategory: '',
      selectedDimension1: '',
      selectedDimension2: '',

      UseSymmetricHeatMap: true,

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
    StyleHeatmap(column, val){
      let heatmapResult = this.UseSymmetricHeatMap
        ? this.CustomHeatMapSymmetric(column, val)
        : this.CustomHeatMap(column, val);

      let heatMap = heatmapResult[0];
      let colorValue = heatmapResult[1];

      let color = "black";
      if (val > 0 && colorValue < 150)
        color = "white";

      return {
        "background-color": heatMap,
        color,
      };
    },
    CustomHeatMapSymmetric(column, val) {
      let values = this.getTableData().map( x => x[column] );
      let min = Math.min(...values);
      let max = Math.max(...values);

      let limit1 = min;
      let limit2 = max;
      if (limit1 < 0) limit1 = limit1 * -1;
      if (limit2 < 0) limit2 = limit2 * -1;
      let limitBig = limit1 > limit2 ? limit1 : limit2;
      let limitMax = limitBig;
      let limitMin = limitBig * -1;
      return this.CommonHeatMap(val, limitMin, limitMax);
    },
    CommonHeatMap(val, limitMin, limitMax) {
      if (val < 0) {
        let normVal = this.Normalize(val, limitMin, 0);
        let h = normVal * 250;
        return ["rgb(255," + h + "," + h + ")", h];
      } else {
        let normVal = this.Normalize(val, 0, limitMax);
        let h = (1 - normVal) * 250;
        return ["rgb(" + h + "," + h + ",255)", h];
      }
    },
    Normalize(val, min, max) {
      return (val - min) / (max - min);
    },
    format(x, dec, col) {
      return NumberHelper.format(x, dec);
    },
    getTableData() {
      let categoriesDim1 = this.categories_model_statistics[this.selectedCategory][this.selectedDimension1];
      let categoriesDim2 = this.categories_model_statistics[this.selectedCategory][this.selectedDimension2];

      let res = [];
      for( let mIdx in this.model_names ){
        
        let model = this.model_names[mIdx];
        let data1 = categoriesDim1[mIdx];
        let data2 = categoriesDim2[mIdx];
        
        let score_prop1 = data1?.score_prop_overall ?? 0;
        let score_prop2 = data2?.score_prop_overall ?? 0;

        let rsv_prop1 = data1?.rsv_prop_overall ?? 0;
        let rsv_prop2 = data2?.rsv_prop_overall ?? 0;

        let diff = {
          model_name: model, 
          score_prop: this.format(score_prop1 - score_prop2, 2),
          rsv_prop: this.format(rsv_prop1 - rsv_prop2, 2),
        }

        res.push(diff);

      }
        
      return res;
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


