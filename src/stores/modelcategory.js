import { defineStore } from 'pinia';

var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

let withoutArray = function(obj){
    let ret = {};
    for( let [key,val] of Object.entries(obj)){
        ret[key] = val[0];
    }
    return ret;
}
  
export const useModelCategoryStore = defineStore('modelcategory', {
    state: () => {
        return {
            dimensions: [],
            categories_statistics: [],
            categories_model_statistics: []
        }
    },
    actions: {
        setCategoryStatistics(statistics) {

            let byModel = groupBy(statistics, 'model');
            for( let [key, val] of Object.entries(byModel) ){
                let byCategory = groupBy(val, 'category');
                byModel[key] = withoutArray(byCategory);
            }
            this.categories_statistics = byModel;
        },
        setCategoryModelStatistics(statistic_by_dimension) {

            this.dimensions = Object.keys(statistic_by_dimension);

            let all = Object.values(statistic_by_dimension).flatMap( x => x);
            let byModel = groupBy(all, 'model');
            for( let [key, val] of Object.entries(byModel) ){
                let byCategory = groupBy(val, 'category');
                byModel[key] = byCategory;

                for( let [keyCat, valCal] of Object.entries(byCategory) ){
                    let byDimension = groupBy(valCal, 'dimension');
                    byModel[key][keyCat] = withoutArray(byDimension);
                }
            }
            this.categories_model_statistics = byModel;

        },
    },
    getters: {},
});