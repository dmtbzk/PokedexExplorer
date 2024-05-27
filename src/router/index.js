import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FavoriteList from "../views/FavoriteList.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/favorites", component: FavoriteList },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
