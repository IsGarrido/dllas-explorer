import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
    state: () => {
        return {
            categories_enabled: {}
        }
    },
    actions: {
        setCategories(categories) {
            categories.forEach( c => this.categories_enabled[c] = true);
            // TODO: unpatch
            this.categories_enabled['Espacial'] = false;
            this.categories_enabled['Movimiento'] = false;
            this.categories_enabled['Sustancia'] = false;
            this.categories_enabled['Temporal'] = false;
            this.categories_enabled['Social/Politico'] = false;
            this.categories_enabled['Percepción (Sentidos)'] = false;
            this.categories_enabled['MOTION'] = false;
            this.categories_enabled['SPATIAL'] = false;
            this.categories_enabled['SUBSTANCE'] = false;
            this.categories_enabled['TEMPORAL'] = false;
            this.categories_enabled['QUANTITY'] = false;
            this.categories_enabled['PERCEPTION'] = false;
        },
    },
    getters: {
        categories(state){
            return Object.keys(state.categories_enabled)
            .filter( key => state.categories_enabled[key]);
        }
    },

});