import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import ContentPage from "../pages/ContentPage.vue";

const routes = [
	{ path: "/", name: "home", component: Home },
	{ path: "/:category(planets|starships|people)", name: "content", component: ContentPage },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
