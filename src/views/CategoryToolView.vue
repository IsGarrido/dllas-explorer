<template>

  <div class="row" v-show="!loaded">
    <div class="col">
      <DropZoneVue @select="onFileSelected"></DropZoneVue>
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

  <hr>

  <div class="row" v-if="loaded">
    <div class="col">
      <div class="table-responsive">

        <b-table-simple :hover="true" :outlined="true" :small="true" :striped="true" :bordered="true" responsive>

          <!-- head -->
          <b-thead>
            <b-tr>
              <b-th :key="cidx" class="p-1" v-for="(category, cidx) in categories" @click="setCategory(category)">
                {{ category }}
                <small> {{ newFile[category].length }}</small>
                <a v-if="category !== noCategory" class="btn btn-link float-end p-0"> (Move) </a>

              </b-th>
            </b-tr>
          </b-thead>

          <!-- body -->
          <b-tbody>
            <b-tr v-for="(_, index) in maxLength">
              <b-td v-for="(cat, cidx) in categories" :key="cat + '_' + cidx">
                {{ newFile[cat][index] ?? '' }}
                <span v-if="index === 0 && cat === noCategory">⬅</span>
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
      noCategory: " - No category - ",

      // view
      newCategory: "",
      loaded: false,
      lastSave: new Date(),

      // data
      categories: [],
      newFile: {},
    }
  },
  components: {
    DropZoneVue
  },
  methods: {
    onFileSelected($event) {
      let file = JSON.parse($event);

      this.newCategory = this.noCategory;
      this.addCategory();
      this.newFile[this.noCategory] = file.words;

      file.categories.forEach(cat => {
        this.newCategory = cat;
        this.addCategory();
      });

      this.loaded = true;
    },
    addCategory($event) {
      let cat = this.newCategory;
      if (this.categories.findIndex(x => cat === x) != -1)
        return;
      this.categories.push(cat);
      this.newFile[cat] = [];
      this.newCategory = "";
    },
    setCategory(category) {
      if (category === this.noCategory)
        return;
      let word = this.newFile[this.noCategory].shift();
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
    saveToFile(){
      FileHelper.saveToFile("dllas-categorizedwords.json", JSON.stringify(this.newFile) );
    }


  },
  computed: {
    maxLength() {
      let res = Math.max(...Object.values(this.newFile).map(x => x.length));
      if (res > 30)
        return 30;
      return res;
    }
  }

}
</script>


