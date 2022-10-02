<template>

    <div class="row">
        <div class="col">
            <h2> Comparing the bias for each category</h2>
            <h4> For the model {{ route.params.modelname }} and for the given dimensions </h4>

            <b-form>
                <div class="row">
                    <div class="col">
                        Select the dimensions to compare
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <b-form-select v-model="form.dimension1" :options="dimensionOptions"></b-form-select>
                    </div>
                    <div class="col-6">
                        <b-form-select v-model="form.dimension2" :options="dimensionOptions"></b-form-select>
                    </div>
                </div>
            </b-form>

        </div>
    </div>

    <div class="row" v-if="!isCompareDisabled">
        <div class="col">
            <div class="row">
                <div class="col">
                    <DataTable :items="diffTable" :transforms="table_transforms"></DataTable>
                </div>

            </div>
        </div>
    </div>


</template>

<script setup lang="ts">

import { computed, reactive } from 'vue'
import { useIndexStore } from '@/stores';
import { useRouter, useRoute } from 'vue-router'
import DataTable from './data/DataTable.vue'
import NumberHelper from '@/reluihelpers/mixin/NumberHelper';

// Use
const indexStore = useIndexStore();
const router = useRouter()
const route = useRoute()

// Data
const form = reactive({
    dimension1: indexStore.dimensions[0],
    dimension2: indexStore.dimensions[1]
});

// Computed
const dimensionOptions = computed(() => indexStore.dimensions.map(dim => { return { text: dim, value: dim } }));
const isCompareDisabled = computed(() => form.dimension1 === form.dimension2);

// Methods
const onCompareClicked = (_$event: any) => {
    router.push({ name: 'model-compare-two-dimensions', params: { 
        model: route.params.modelname.toString(),
        dimension1: form.dimension1,
        dimension2: form.dimension2
    } })
}

let diffTable = computed( () => {

    let dimension1 : {[ key: string]: {}} = indexStore.category_model_lookup[route.params.modelname.toString()][form.dimension1];
    let dimension2 : {[ key: string]: {}} = indexStore.category_model_lookup[route.params.modelname.toString()][form.dimension2];

    let diffItems = [];
    for(let category of Object.keys(dimension1)){

        let data1 = dimension1[category];
        let data2 = dimension2[category];
        
        let categoryDiff = {
            category: data1["category"],
            score_mean: data1["score_mean"] - data2["score_mean"],
            rsv_mean: data1["rsv_mean"] - data2["rsv_mean"],
        };

        diffItems.push(categoryDiff);     
    }
    
    return diffItems;

});

let table_transforms = {
    // 'rsv_sum': (x: number, col: string) => NumberHelper.format(x, 0),
    'rsv_mean': (x: number, col: string) => NumberHelper.format(x, 3),
    // 'rsv_min': (x: number, col: string) => NumberHelper.format(x, 0),
    // 'rsv_max': (x: number, col: string) => NumberHelper.format(x, 0),
    // 'score_sum': (x: number, col: string) => NumberHelper.format(x, 0),
    'score_mean': (x: number, col: string) => NumberHelper.format(x, 3),
    // 'score_min': (x: number, col: string) => NumberHelper.format(x, 0),
    // 'score_max': (x: number, col: string) => NumberHelper.format(x, 0),
    // 'adj_prop': (x: number, col: string) => NumberHelper.format(x, 0),
};

</script>