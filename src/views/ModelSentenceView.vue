<template>

  <div class="row">
    <div class="col">
      <h3>Sentences for {{ modelname }} </h3>

        <b-form >
          <b-form-group label="Sentence:" label-for="input-1" description="Select a sentence">
            <b-form-select id="input-1" v-model="selectedSentence" :options="options"></b-form-select>
          </b-form-group>
        </b-form>

    </div>
  </div>

  <div class="row" v-if="selectedSentence">

    <div class="col" v-for="(dimension, didx) in dimensions" :key="didx">
      <h4>{{ dimension }}</h4>
        <b-table striped hover :items="sentences_lookup[dimension][selectedSentence]"></b-table>
    </div>

  </div>

</template>

<script>
import { useIndexStore } from '@/stores'
import { mapState, mapStores } from 'pinia'

export default {
  props: [],
  created() {
  },
  data() {
    return {
      selectedSentence: ""
    }
  },
  components: {

  },
  methods: {


  },
  computed: {
    ...mapState(useIndexStore, [
      'config',
      'dimensions',
      'template_lookup'
    ]),
    modelname() {
      return this.$route.params.modelname;
    },
    sentences(){
      return Object.keys(this.sentences_lookup[this.dimensions[0]]);
    },
    options(){
      return this.sentences.map( sentence => { return {value: sentence, text: sentence } });
    },
    sentences_lookup() {
      let dimension_sentences = {};
      this.dimensions.forEach(dimension => {
        let sentences = this.template_lookup[this.modelname][dimension];
        dimension_sentences[dimension] = sentences;
      });
      return dimension_sentences;
    },
  }

}
</script>


