<template>

<div class="row">
    <div class="col">
        <h2>Model {{ modelname }}</h2>
    </div>

    <h4 class="mt-3">Model summary</h4>
    <!-- model -->
    <div class="row">
      <div class="col">
        <SummaryCard :item="model_summary"></SummaryCard>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <b-button variant="link" @click="OnExploreTemplatesClicked">Explore model templates</b-button>
        <b-button variant="link" @click="OnExploreCategoriesClicked">Explore model categories</b-button>
      </div>
    </div>

    <!-- dimensions -->
    <h4 class="mt-3"> Dimensions </h4>
    <div class="row">
      <div class="col" v-for="(dimension, dixd) in model_dimensions" :key="didx">
        <h5> {{ dimension.dimension }} </h5>
        <SummaryCard :item="dimension"></SummaryCard>
      </div>
    </div>

    <div class="row" v-if="loaded">
      <ModelChart
        :labels="dimensions"
        :data="chart_data"
        :datalabels="categories"
        >
      </ModelChart>
    </div>

</div>

</template>

<script>
import { useIndexStore } from '@/stores'
import { mapState, mapStores } from 'pinia'
import ModelChart from './model/ModelChart.vue'
import SummaryCard from './data/SummaryCard.vue'

export default {
  props: [],
  components: {
  },
  created() {
    this.loaded = true;
  },
  data() {
    return {
      loaded: false
    }
  },
  components: {
    ModelChart,
    SummaryCard
},
  methods: {
    OnExploreTemplatesClicked(){
      this.$router.push({ name: 'model-sentence', params: { model: this.modelname } })
    },
    OnExploreCategoriesClicked(){
      this.$router.push({ name: 'model-categories', params: { model: this.modelname } })
    }
  },
  computed: {
    ...mapState(useIndexStore, [
      'config',
      'model_results',
      'model_lookup',

      'dimension_results',
      'dimensions',
      
      'category_lookup',
      'category_results',
      'categories',
      'category_model_lookup',

      'template_lookup'
    ]),
    modelname(){
      return this.$route.params.modelname;
    },
    model_summary(){
      return this.model_results.find( x => x.model == this.modelname );
    },
    model_dimensions(){
      return this.dimension_results.filter( x => x.model == this.modelname );
    },
    
    chart_data(){
      let datasets = {};
      this.dimensions.forEach( dimension => {
        datasets[dimension] = this.categories.map( category => {
          let dimension_data = this.category_lookup[dimension];
          if(!dimension_data) return 0;

          let category_data = dimension_data[category];
          if(!category_data) return 0;

          let category_total = this.config.use_score ? category_data.score_sum : category_data.rsv_sum;
          if(this.config.show_prc){
            let model_data = this.model_lookup[this.modelname];
            let model_total = this.config.use_score ? model_data.score_sum : model_data.rsv_sum;
            return (category_total / model_total )*100;
          }
          return category_total
        } );
      });
      return datasets;
    },
  }

}
</script>


