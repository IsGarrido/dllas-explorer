import ExploreView from "@/views/ExploreView.vue";
import ModelView from "@/views/ModelView.vue";
import ModelSentenceView from "@/views/ModelSentenceView.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: '/explore',
      name: 'explore',
      component: ExploreView
    },
    {
      path: '/model/:modelname',
      name: 'model',
      component: ModelView
    },
    {
      path: '/sentences/:modelname',
      name: 'sentence',
      component: ModelSentenceView
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
