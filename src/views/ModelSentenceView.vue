<template>

  <RouterLink class="btn btn-link" :to="{ name: 'model', params: {modelname: modelname } }">&lt; Back </RouterLink>

  <div class="row" v-if="loaded">
    <div class="col">
      <h3>Sentences for {{ modelname }} </h3>

        <b-form >
          <b-form-group label="Sentence:" label-for="input-1" description="Select a sentence">
            <b-form-select id="input-1" v-model="selectedIndex" :options="options"></b-form-select>
          </b-form-group>
        </b-form>

    </div>
  </div>

  <div class="row" v-if="loaded">

    <div class="col" v-for="(dimension, didx) in dimensions" :key="didx">
      <h5>{{ dimension }} <small>({{ getSentence(dimension, selectedIndex) }})</small></h5>
        <DataTable :items="getSentences(dimension, selectedIndex)" :remove_cols="table_remove_cols" :transforms="table_transforms" :key="selectedIndex" :shadow_rows="table_shadow_rows"></DataTable>
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
    this.loaded = true;
    },
  data() {
    return {
      loaded: false,
      selectedIndex: 0,
      table_remove_cols: ['dimension', 'model', 'token', 'sentence'],
      table_transforms: {
        'score': (x, col) => {
          try {
            return NumberHelper.format(x, 5);
          } catch(err){
            console.error("Error en table_transforms > score con x = " + x + " en col=" + col )
            throw err;
          }
        }
      },
      table_shadow_rows: {
        'token_str': (x) => {
          return this.adjective_hashset[x] === undefined
        }
      }
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
    }

  },
  computed: {
    ...mapState(useIndexStore, [
      'config',
      'dimensions',
      'template_lookup',
      'adjective_hashset'
    ]),
    modelname() {
      return this.$route.params.modelname;
    },

    options(){
      let anyDimension = this.dimensions[0];
      let sentences = Object.entries(this.sentences_lookup[anyDimension]);
      return sentences.map( (sentenceEntry, sentenceIndex) => {
        return {value: sentenceIndex, text: sentenceEntry[0] }
      });
    },
    sentences_lookup() {
      return this.template_lookup[this.modelname];
    },
    
  }

}
</script>


