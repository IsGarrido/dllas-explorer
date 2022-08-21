import { defineStore } from 'pinia';

export const useIndexStore = defineStore('index', {
    state: () => {
        return {
            adjectives: [],
            adjective_hashset: {},
            
            words: [],
            filltemplate_results: [],
            template_lookup: {},

            dimensions: [],
            dimension_results: [],

            model_names: [],
            model_results: [],
            model_lookup: {},

            categories: [],
            categories_result: [],
            category_lookup: {},
            category_model_lookup: {},

            sentence_names: [],
            sentence_statistics: [],

            config: {
                show_prc: true,
                use_score: false
            },
        }
    },
    actions: {
        setCategories(categories) {
            this.categories = categories;
        },
        setWords(words) {
            this.words = words;
        },
        setAdjectives(adjectives) {
            this.adjective_hashset = adjectives.reduce( function(map, item) {
                map[item] = true;
                return map;
            }, {} );
            this.adjectives = adjectives;
        },
        setModelNames(model_names){
            this.model_names = model_names;
        },
        setSentenceNames(sentence_names){
            this.sentence_names = sentence_names;
        },
        setSentenceStatistics(sentence_statistics){
            let res = sentence_statistics.map( item => {
                let dimensions = Object.keys(this.sentence_names);
                item.labels = dimensions.map( dimension => this.sentence_names[dimension][item.sentence]);
                return item;
            });
            this.sentence_statistics = res;
        },
        setFillTemplateResult(filltemplate_results) {
            this.filltemplate_results = filltemplate_results;
            this.template_lookup = filltemplate_results.reduce((map, row) => {

                let model_name = this.model_names[row.model];

                let sentence_name = this.sentence_names[this.dimensions[0]][row.sentence];

                if (!map[model_name])
                    map[model_name] = {};

                let model = map[model_name];
                if (!model[row.dimension])
                    model[row.dimension] = {}

                let dimension = model[row.dimension];                
                if(!dimension[sentence_name])
                    dimension[sentence_name] = []

                dimension[sentence_name].push(row);
                return map;
            }, {});
        },
        setDimensionResults(dimension_results) {
            this.dimensions = [...new Set(dimension_results.map(x => x.dimension))]
            this.dimension_results = dimension_results;
        },
        setModelResults(model_results) {
            // this.models = model_results.map(x => x.model)
            this.model_results = model_results.map( model => {
                model.name = this.model_names[model.model];
            });
            this.model_results = model_results;
            this.model_lookup = model_results.reduce((map, item) => {
                map[item.name] = item;
                return map;
            }, {});

        },
        setCategoryResults(category_results) {
            this.categories = [...new Set(category_results.map(x => x.category))].filter(x => x !== "unknown");
            this.category_results = category_results;
            this.category_model_lookup = category_results.reduce( (map, row) => {
                let model_name = this.model_names[row.model];
                if (!map[model_name])
                    map[model_name] = {};

                let model = map[model_name];
                if (!model[row.dimension])
                    model[row.dimension] = {}

                let dimension = model[row.dimension];                
                if(!dimension[row.category])
                    dimension[row.category] = []

                dimension[row.category].push(row);
                return map;
            }, {});

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