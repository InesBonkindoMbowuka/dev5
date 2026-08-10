import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PeopleView from "../views/PeopleView.vue";
import InvestigationView from "@/views/InvestigationView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
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
    }
  ],
});

export default router;
