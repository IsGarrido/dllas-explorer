<template>

  <!-- Instrucciones -->
  <div class="row">
    <div class="col">
      <div class="alert alert-info">

        <p v-if="!loaded && !preloadedAdjectives">Either:
          <ul>
            <li>Drag and Drop your Adjectives.json files inside Adjectives.</li>
            <li>Drag your pre-categorized adjectives into Filled.</li>
          </ul>
        </p>

        <p v-if="loaded && !preloadedAdjectives">
          Now you can start adding categories in the new category input. You may want to add an unknown category.
        </p>

        <p v-if="preloadedAdjectives && !loaded">
          Now you can start add your Adjectives.json file bellow.
        </p>

        <p v-if="loaded && !firstUncategorizedWord">
          You have already categorized everything, click <b>Save to file</b> now.
        </p>

        <p v-if="loaded && firstUncategorizedWord">
          You can start adding categories now.
        </p>
        
      </div>
    </div>
  </div>


  <div class="row">
    <div class="col" v-show="!loaded">
      <h2>Adjective.json <small>Drop here your </small></h2>
    </div>
    <div class="col" v-show="!loaded && !preloadedAdjectives">
      <h2>Load Pre-Categorized adjectives <small>Drop here pre-categorized adjectives</small></h2>
    </div>
  </div>
  <div class="row">
    <div class="col" v-show="!loaded">
      <DropZoneVue @select="onAdjectivesJsonFileSelected"></DropZoneVue>
    </div>

    <div class="col" v-show="!loaded && !preloadedAdjectives">
      <DropZoneVue @select="onLoadPrecategorizedAdjectives"></DropZoneVue>
    </div>
  </div>

  <div class="row" v-if="loaded">
    <div class="col-4">
      <b-form>
        <b-form-group label="New category" label-for="new-category">
          <b-form-input id="new-category" v-model="newCategory" type="text" required></b-form-input>
        </b-form-group>
      </b-form>

    </div>

    <div class="col-2">
      <b-form @submit="addCategory">
        <b-form-group label="_" label-class="invisible">
          <b-button type="submit" variant="primary">Add</b-button>
        </b-form-group>
      </b-form>
    </div>

    <div class="col-2">
      <b-form @submit="load">
        <b-form-group label="_" label-class="invisible">
          <b-button type="submit" variant="outline-primary">Load last session</b-button>
        </b-form-group>
      </b-form>
    </div>

    <div class="col-2">
      <b-form @submit="saveToFile">
        <b-form-group label="_" label-class="invisible">
          <b-button type="submit" variant="outline-primary">Save to file</b-button>
        </b-form-group>
      </b-form>
    </div>

  </div>

  <div class="row" v-if="firstUncategorizedWord && columns.length > 0">
    <div class="col text-center">
      <h1>
        <small style="display: block; font-size: 20px; color: grey">Choose a category for the word:</small>
        {{ firstUncategorizedWord }}
      </h1>
    </div>
  </div>

  <div class="row-fluid" v-if="loaded">
    <div class="col">
      <div class="table-responsivex">

        <b-table-simple :hover="true" :outlined="true" :small="true" :striped="true" :bordered="true" responsive>

          <!-- head -->
          <b-thead>
            <b-tr>
              <b-th :key="cidx" class="p-1 highlight" v-for="(category, cidx) in columns" @click="setCategory(category)">
                {{ category }}
                <small> {{ newFile[category].length }}</small>
                <a class="btn btn-link float-end p-0"> (Move) </a>

              </b-th>
            </b-tr>
          </b-thead>

          <!-- body -->
          <b-tbody>
            <b-tr v-for="(_, index) in maxLength">
              <b-td v-for="(cat, cidx) in columns" :key="cat + '_' + cidx">
                {{ newFile[cat][index] ?? '' }}
              </b-td>
            </b-tr>
          </b-tbody>

          <b-tfoot>
            <b-tr>
              <b-th colspan="100%">
                Last saved in localStorage: {{ lastSave }}
              </b-th>
            </b-tr>
          </b-tfoot>

        </b-table-simple>

      </div>
    </div>
  </div>

</template>

<script>
import DropZoneVue from "@/reluihelpers/components/DropZone.vue";
import FileHelper from "@/reluihelpers/mixin/FileHelper";

export default {
  props: [],
  created() {
  },
  data() {
    return {
      // const
      unknownCategory: "unknown",
      noCategory: "- No category -",

      // view
      newCategory: "",
      loaded: false,
      preloadedAdjectives: false,
      lastSave: new Date(),

      // data
      categories: [],
      notFoundAdjectives: [],
      newFile: {},
    }
  },
  components: {
    DropZoneVue
  },
  methods: {
    onAdjectivesJsonFileSelected($event){
      this.notFoundAdjectives = [];
      if(this.preloadedAdjectives){
        this.onFileSelected($event);
      } else {
        this.onAdjectiveFileSelected($event);
      }
    },
    onAdjectiveFileSelected($event){
      let adjectives = JSON.parse($event);

      this.newCategory = this.noCategory;
      this.addCategory();

      let set = new Set(Object.values(this.newFile).flatMap(x => x));

      for(let adjective of adjectives){
        if(!set.has(adjective)){
          this.notFoundAdjectives.push(adjective);
        }
      }
      this.loaded = true;
    },
    onFileSelected($event) {
      let adjectives = JSON.parse($event);

      this.newCategory = this.noCategory;
      this.addCategory();
      this.newFile[this.noCategory] = adjectives;

      this.loaded = true;
    },
    onLoadPrecategorizedAdjectives($event) {
      let file = JSON.parse($event);

      this.newCategory = this.noCategory;
      this.addCategory();

      Object.entries(file).forEach(entry => {
        let cat = entry[0];
        let values = entry[1];

        this.newCategory = cat;
        this.addCategoryWithValues(cat, values);
      });

      this.loaded = false;
      this.preloadedAdjectives = true;
    },
    addCategoryWithValues(cat, values){
      this.categories.push(cat);
      this.newFile[cat] = [...values];
    },
    addCategory($event) {
      let cat = this.newCategory;
      if (this.categories.findIndex(x => cat === x) !== -1)
        return;

      this.newFile[cat] = [];
      this.categories = [...this.categories, cat];
      this.newCategory = "";
    },
    setCategory(category) {
      let word = this.notFoundAdjectives.shift();
      this.newFile[category] = [...this.newFile[category], word];
      setTimeout(() => this.save(), 1);
    },
    saveLocal(key, val) {
      window.localStorage.setItem("CategoryToolView." + key, JSON.stringify(val));
    },
    loadLocal(key) {
      return JSON.parse(window.localStorage.getItem("CategoryToolView." + key));
    },
    save() {
      this.saveLocal("categories", this.categories);
      this.saveLocal("newFile", this.newFile);
      this.lastSave = new Date();
    },
    load() {
      this.categories = this.loadLocal("categories");
      this.newFile = this.loadLocal("newFile");
    },
    saveToFile() {
      if(this.notFoundAdjectives && this.notFoundAdjectives.length > 0)
        this.newFile[this.unknownCategory] = this.notFoundAdjectives;
      FileHelper.saveToFile("dllas-categorizedwords.json", JSON.stringify(this.newFile));
    }


  },
  computed: {
    maxLength() {
      let res = Math.max(...Object.values(this.newFile).map(x => x.length));
      if (res > 30)
        return 30;
      return res;
    },
    columns(){
      return this.categories.filter( x => x !== this.noCategory);
    },
    firstUncategorizedWord(){
      if(this.notFoundAdjectives.length === 0)
        return null;
      return this.notFoundAdjectives[0];
    }
  }

}
</script>
<style scoped>
.highlight:hover {
  background-color: aliceblue;
  cursor: pointer;
}
</style>