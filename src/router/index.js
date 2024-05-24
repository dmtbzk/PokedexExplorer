import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PokemonDetail from "../views/PokemonDetail.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/pokemon/:id", component: PokemonDetail } // Add a route for the detail view
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
