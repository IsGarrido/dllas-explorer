import { words, data, models, sentences } from "@result/nationalities_forced/FillTemplate/FillTemplate.json"

import ModelResults from "@result/nationalities_forced/EvaluateCategories/ByModel.json"
import DimensionResults from "@result/nationalities_forced/EvaluateCategories/ByDimension.json"
import CategoryResults from "@result/nationalities_forced/EvaluateCategories/ByCategory.json"
import SentenceStatistics from "@result/nationalities_forced/EvaluateCategories/SentenceStatistics.json"
import SentenceDimensionStatistics from "@result/nationalities_forced/EvaluateCategories/SentenceAndDimensionStatistics.json"
import ModelCategoryStatistics from "@result/nationalities_forced/EvaluateCategories/ModelCategoryStatistics.json"
import ModelCategoryDimensionStatistics from "@result/nationalities_forced/EvaluateCategories/ModelCategoryAndDimensionStatistics.json"

const label = "Nationalities Forced";

export default {
    label, words, data, models, sentences, ModelResults, DimensionResults, CategoryResults, SentenceStatistics, SentenceDimensionStatistics, ModelCategoryStatistics, ModelCategoryDimensionStatistics
}