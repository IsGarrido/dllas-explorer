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

            let byCategory = groupBy(statistics, 'category');
            for( let [key, val] of Object.entries(byCategory) ){
                let byModel = groupBy(val, 'model');
                byCategory[key] = withoutArray(byModel);
            }
            this.categories_statistics = byCategory;
        },
        setCategoryModelStatistics(statistic_by_dimension) {

            this.dimensions = Object.keys(statistic_by_dimension);

            let all = Object.values(statistic_by_dimension).flatMap( x => x);
            let byCategory = groupBy(all, 'category');
            for( let [key, val] of Object.entries(byCategory) ){
                let byDimension = groupBy(val, 'dimension');
                byCategory[key] = byDimension;

                for( let [keyDim, valDim] of Object.entries(byDimension) ){
                    let byModel = groupBy(valDim, 'model');
                    byCategory[key][keyDim] = withoutArray(byModel);
                }
            }
            this.categories_model_statistics = byCategory;

        },
    },
    getters: {},
});