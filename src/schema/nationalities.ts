import { words, data, models, sentences } from "@result/nationalities/FillTemplate/FillTemplate.json"

import ModelResults from "@result/nationalities/EvaluateCategories/ByModel.json"
import DimensionResults from "@result/nationalities/EvaluateCategories/ByDimension.json"
import CategoryResults from "@result/nationalities/EvaluateCategories/ByCategory.json"
import SentenceStatistics from "@result/nationalities/EvaluateCategories/SentenceStatistics.json"
import SentenceDimensionStatistics from "@result/nationalities/EvaluateCategories/SentenceAndDimensionStatistics.json"
import ModelCategoryStatistics from "@result/nationalities/EvaluateCategories/ModelCategoryStatistics.json"
import ModelCategoryDimensionStatistics from "@result/nationalities/EvaluateCategories/ModelCategoryAndDimensionStatistics.json"

const label = "Nationalities";

export default {
    label, words, data, models, sentences, ModelResults, DimensionResults, CategoryResults, SentenceStatistics, SentenceDimensionStatistics, ModelCategoryStatistics, ModelCategoryDimensionStatistics
}