import { words, data, models, sentences } from "@result/Spanish_Genre/FillTemplate/FillTemplate.json"

import ModelResults from "@result/Spanish_Genre/EvaluateCategories/ByModel.json"
import DimensionResults from "@result/Spanish_Genre/EvaluateCategories/ByDimension.json"
import CategoryResults from "@result/Spanish_Genre/EvaluateCategories/ByCategory.json"
import SentenceStatistics from "@result/Spanish_Genre/EvaluateCategories/SentenceStatistics.json"
import SentenceDimensionStatistics from "@result/Spanish_Genre/EvaluateCategories/SentenceAndDimensionStatistics.json"
import ModelCategoryStatistics from "@result/Spanish_Genre/EvaluateCategories/ModelCategoryStatistics.json"
import ModelCategoryDimensionStatistics from "@result/Spanish_Genre/EvaluateCategories/ModelCategoryAndDimensionStatistics.json"

const label = "Spanish Genre";

export default {
    label, words, data, models, sentences, ModelResults, DimensionResults, CategoryResults, SentenceStatistics, SentenceDimensionStatistics, ModelCategoryStatistics, ModelCategoryDimensionStatistics
}