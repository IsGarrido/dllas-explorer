import { defineStore } from 'pinia';

export const useIndexStore = defineStore('index', {
    state: () => {
        return {
            experiment: '',
            
            words: [],
            filltemplate_results: [],
            template_lookup: {},

            dimensions: [],
            dimension_results: [],
            dimension_lookup_by_model: {},

            model_names: [],
            model_results: [],
            model_lookup: {},

            categories: [],
            categories_result: [],
            category_lookup: {},
            category_model_lookup: {},
            model_category_dimension_lookup: {},

            sentence_names: [],
            sentence_statistics: [],

            config: {
                show_prc: true,
                use_score: false
            },
        }
    },
    actions: {
        setExperiment(label){
            this.experiment = label;
        },

        setWords(words) {
            this.words = words;
        },
        setModelNames(model_names){
            this.model_names = model_names;
        },
        setSentenceNames(sentence_names){
            this.sentence_names = sentence_names;
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
        setDimensionResults(dimension_results, model_names_arr_by_index) {
            this.dimensions = [...new Set(dimension_results.map(x => x.dimension))]

            dimension_results.forEach( item => item.modelname = model_names_arr_by_index[item.model]);
            this.dimension_results = dimension_results;

            this.dimension_lookup_by_model = dimension_results.reduce((map, row) => {
                let model_name = this.model_names[row.model];

                if (!map[model_name])
                    map[model_name] = {};

                let model = map[model_name];
                if (!model[row.dimension])
                    model[row.dimension] = {}
                
                model[row.dimension] = row;
                return map;

            }, {});
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
            this.categories = [...new Set(category_results.map(x => x.category))].filter(x => x !== "unknown").filter(x => x !== "other");
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

                dimension[row.category] = row;
                return map;
            }, {});

            this.model_category_dimension_lookup = category_results.reduce( (map, row) => {
                let model_name = this.model_names[row.model];
                if (!map[model_name])
                    map[model_name] = {};

                let model = map[model_name];
                if (!model[row.category])
                    model[row.category] = {}

                let category = model[row.category];                
                if(!category[row.dimension])
                    category[row.dimension] = []

                category[row.dimension] = row;
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