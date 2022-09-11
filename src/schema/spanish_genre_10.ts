import { words, data, models, sentences } from "@result/Spanish_Genre_10/FillTemplate/FillTemplate.json"

import ModelResults from "@result/Spanish_Genre_10/EvaluateCategories/ByModel.json"
import DimensionResults from "@result/Spanish_Genre_10/EvaluateCategories/ByDimension.json"
import CategoryResults from "@result/Spanish_Genre_10/EvaluateCategories/ByCategory.json"
import SentenceStatistics from "@result/Spanish_Genre_10/EvaluateCategories/SentenceStatistics.json"
import SentenceDimensionStatistics from "@result/Spanish_Genre_10/EvaluateCategories/SentenceAndDimensionStatistics.json"

const label = "Spanish Genre 10";

export default {
    label, words, data, models, sentences, ModelResults, DimensionResults, CategoryResults, SentenceStatistics, SentenceDimensionStatistics
}