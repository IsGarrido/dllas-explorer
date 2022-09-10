import { defineStore } from 'pinia';

let groupBySentence = (arr, sentence_names) => {
    return arr.map(item => {
        let dimensions = Object.keys(sentence_names);
        item.labels = dimensions.map(dimension => sentence_names[dimension][item.sentence]);
        return item;
    });
}
export const useSentenceStore = defineStore('sentence', {
    state: () => {
        return {
            dimensions: [],
            sentence_names: [], 
            sentence_statistics: [], 
            sentence_dimension_statistics: []
        }
    },
    actions: {
        setSentenceNames(sentence_names) {
            this.sentence_names = sentence_names;
        },
        setSentenceDimensionStatistics(sentence_dimension_statistics) {
            let byDimension = {}
            Object.entries(sentence_dimension_statistics).forEach(dimension_data => {
                let [key, val] = dimension_data;
                byDimension[key] = groupBySentence(val, this.sentence_names);
            });
            this.sentence_dimension_statistics = byDimension;
        },
        setSentenceStatistics(sentence_statistics) {
            this.sentence_statistics = groupBySentence(sentence_statistics, this.sentence_names);
        },
        setDimensions(dimension_results) {
            this.dimensions = [...new Set(dimension_results.map(x => x.dimension))]
        },

    },
    getters: {},
});