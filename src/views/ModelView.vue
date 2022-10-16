<template>

  <div class="row">

    <div class="col">
      <h2>Model {{ modelname }}</h2>
    </div>

    <h4 class="mt-4">Model summary</h4>
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
        <b-button variant="link" @click="OnCompareDimensionsClicked">Compare dimensions</b-button>
      </div>
    </div>

    <!-- dimensions -->
    <div class="row mt-4">
      <h4> Dimensions </h4>
      <div class="col" v-for="(dimension, didx) in model_dimensions" :key="didx">
        <h5> {{ dimension.dimension }} </h5>
        <SummaryCard :item="dimension"></SummaryCard>
      </div>
    </div>

    <div class="row mt-4" v-if="loaded">
      <div class="col-6">
        <h4>Score distribution</h4>
        <ModelBarChartView>
        </ModelBarChartView>
      </div>
      <div class="col-6">
        <div class="row no-gutters">
          <div class="col-3">
            <h4>Radar Chart</h4>
          </div>
          <div class="col-9">
            <b-form-select v-model="selectedRadarChartAttribute" :options="radar_select_options"></b-form-select>
          </div>
        </div>

        <ModelRadarChartView :selectedRadarChartAttribute="selectedRadarChartAttribute"></ModelRadarChartView>
      </div>
    </div>


    <pre>
</pre>

  </div>


</template>

<script>
import { useIndexStore } from '@/stores'

import { mapState } from 'pinia'
import ModelBarChart from './model/chart/ModelBarChart.vue'
import SummaryCard from './data/SummaryCard.vue'
import { useConfigStore } from '@/stores/config'
import ModelRadarChartView from './model/ModelRadarChartView.vue'
import ModelBarChartView from './model/ModelBarChartView.vue'

export default {
  props: [],
  components: {
  },
  created() {
    this.loaded = true;
  },
  data() {
    return {
      loaded: false,
      selectedRadarChartAttribute: 'score_prop_overall',
      radarChartAtributes: [
        'score_sum', 'score_min', 'score_max', 'score_mean',
        'count', 'adj_cnt', 'adj_prop', 'score_prop', 'score_prop_overall',
        'rsv_sum', 'rsv_min', 'rsv_max', 'rsv_mean', 'rsv_prop', 'rsv_prop_overall'
      ],
    }
  },
  components: {
    ModelBarChart,
    SummaryCard,
    ModelRadarChartView,
    ModelBarChartView
},
  methods: {
    OnExploreTemplatesClicked() {
      this.$router.push({ name: 'model-sentence', params: { model: this.modelname } })
    },
    OnExploreCategoriesClicked() {
      this.$router.push({ name: 'model-categories', params: { model: this.modelname } })
    },
    OnCompareDimensionsClicked() {
      this.$router.push({ name: 'model-compare-dimensions', params: { model: this.modelname } })
    }
  },
  computed: {
    ...mapState(useIndexStore, [
      'config',
      'model_results',
      'dimension_results',
      'dimensions',
    ]),
    ...mapState(useConfigStore, [
      'categories'
    ]),
    modelname() {
      return this.$route.params.modelname;
    },
    model_summary() {
      return this.model_results.find(x => x.name == this.modelname);
    },
    model_dimensions() {
      return this.dimension_results.filter(x => x.modelname == this.modelname);
    },

    // RADAR
    model_categories_statistics() {
      return this.modelname_dimension_category_statistics[this.modelname];
    },
    radar_select_options() {
      return this.radarChartAtributes.map(x => ({ value: x, text: x }));
    },

    
  }

}
</script>


