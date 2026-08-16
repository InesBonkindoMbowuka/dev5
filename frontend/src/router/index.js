import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PeopleView from "../views/PeopleView.vue";
import InvestigationView from "@/views/InvestigationView.vue";
import IntroductionView from "../views/IntroductionView.vue";
import UserHistory from "../views/UserHistory.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/people",
      component: PeopleView,
    },

    {
      path: "/investigation",
      component: InvestigationView,
    },
    {
      path: "/",
      name: "introduction",
      component: IntroductionView,
    },
    {
      path: "/history",
      component: UserHistory,
    },
  ],
});

export default router;
