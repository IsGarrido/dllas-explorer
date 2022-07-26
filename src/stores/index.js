import { defineStore } from 'pinia';

export const useIndexStore = defineStore('index', {
    state: () => {
        return {
            adjectives: [],
            words: [],
            other_words: [],
            filltemplate_results: [],
            template_lookup: {},

            dimensions: [],
            dimension_results: [],

            models: [],
            model_results: [],
            model_lookup: {},

            categories: [],
            categories_result: [],
            category_lookup: {},

            config: {
                show_prc: true,
                use_score: false
            }
        }
    },
    actions: {
        setCategories(categories) {
            this.categories = categories;
        },
        setWords(words) {
            this.words = words;
        },
        setOthersWords(other_words) {
            this.other_words = other_words;
        },
        setAdjectives(adjectives) {
            this.adjectives = adjectives;
        },
        setFillTemplateResult(filltemplate_results) {
            this.filltemplate_results = filltemplate_results;
            this.template_lookup = filltemplate_results.reduce(function (map, row) {
                if (!map[row.model])
                    map[row.model] = {};

                let model = map[row.model];
                if (!model[row.dimension])
                    model[row.dimension] = {}

                let dimension = model[row.dimension];                
                if(!dimension[row.sentence])
                    dimension[row.sentence] = []

                dimension[row.sentence].push(row);
                return map;
            }, {});
        },
        setDimensionResults(dimension_results) {
            this.dimensions = [...new Set(dimension_results.map(x => x.dimension))]
            this.dimension_results = dimension_results;
        },
        setModelResults(model_results) {
            this.models = model_results.map(x => x.model)
            this.model_results = model_results;
            this.model_lookup = model_results.reduce(function (map, item) {
                map[item.model] = item;
                return map;
            }, {});

        },
        setCategoryResults(category_results) {
            this.categories = [...new Set(category_results.map(x => x.category))].filter(x => x !== "unknown");
            this.category_results = category_results;
            this.category_lookup = category_results.reduce(function (map, item) {
                if (!map[item.dimension]) {
                    map[item.dimension] = { [item.category]: item };
                } else {
                    map[item.dimension][item.category] = item;
                }
                return map;
            }, {});
        }
    },
    getters: {

    },

});