import { useIndexStore } from "@/stores";
import { useConfigStore } from "@/stores/config";
import { useModelCategoryStore } from "@/stores/modelcategory";
import { useSentenceStore } from "@/stores/sentence";

export default class DataService {

    indexStore: any;
    sentenceStore: any;
    modelCategoryStore: any;
    configStore: any;

    constructor(){
        this.indexStore = useIndexStore();
        this.sentenceStore = useSentenceStore();
        this.modelCategoryStore = useModelCategoryStore();
        this.configStore = useConfigStore();
    }

    load_experiment = ( dto : { [ key: string ] : any } ) : void => {

        const { label, words, data, models, sentences, ModelResults, DimensionResults, CategoryResults, SentenceStatistics, SentenceDimensionStatistics, ModelCategoryStatistics, ModelCategoryDimensionStatistics } = dto;
    
        this.indexStore.setExperiment(label);
        this.indexStore.setWords(words);
        this.indexStore.setModelNames(models);
        this.indexStore.setSentenceNames(sentences);
        this.indexStore.setDimensionResults(DimensionResults, models);
        this.indexStore.setFillTemplateResult(data);
        this.indexStore.setModelResults(ModelResults);
        this.indexStore.setCategoryResults(CategoryResults);
    
        this.sentenceStore.setSentenceNames(sentences);
        this.sentenceStore.setSentenceStatistics(SentenceStatistics);
        this.sentenceStore.setSentenceDimensionStatistics(SentenceDimensionStatistics);
        this.sentenceStore.setDimensions(DimensionResults);
    
        this.modelCategoryStore.setCategoryStatistics(ModelCategoryStatistics);
        this.modelCategoryStore.setCategoryModelStatistics(ModelCategoryDimensionStatistics, models);

        let categories =  [...new Set(CategoryResults.map((x:any) => x.category))].filter(x => x !== "unknown");
        this.configStore.setCategories(categories);
    }
    
}