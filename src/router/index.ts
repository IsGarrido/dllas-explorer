import ExploreView from "@/views/ExploreView.vue";
import ModelView from "@/views/ModelView.vue";
import ModelSentenceView from "@/views/ModelSentenceView.vue";
import { createRouter, createWebHistory } from "vue-router";
import ModelCategoryView from "@/views/ModelCategoryView.vue";
import SentenceStatisticsVue from "@/views/SentenceStatistics.vue";
import SelectExperimentVue from "@/views/SelectExperiment.vue";
import ModelCompareDimensionsViewVue from "@/views/ModelCompareDimensionsView.vue";
import CategoryStatisticsVue from "@/views/CategoryStatistics.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: SelectExperimentVue,
    },
    {
      path: '/explore',
      name: 'explore',
      component: ExploreView
    },
    {
      path: '/sentences-statistics',
      name: 'sentences-statistics',
      component: SentenceStatisticsVue
    },
    {
      path: '/categories-statistics',
      name: 'categories-statistics',
      component: CategoryStatisticsVue
    },
    {
      path: '/model/:modelname',
      name: 'model',
      component: ModelView
    },
    {
      path: '/model/sentences/:modelname',
      name: 'model-sentence',
      component: ModelSentenceView
    },
    {
      path: '/model/categories/:modelname',
      name: 'model-categories',
      component: ModelCategoryView
    },
    {
      path: '/model/compare-two-dimensions/:modelname/:dimension1/:dimension2',
      name: 'model-compare-two-dimensions',
      component: ModelCompareDimensionsViewVue
    },
    {
      path: '/model/compare-dimensions/:modelname',
      name: 'model-compare-dimensions',
      component: ModelCompareDimensionsViewVue
    },
    {
      path: "/categorytool",
      name: "Category Tool",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/CategoryToolView.vue"),
    },
  ],
});

export default router;
