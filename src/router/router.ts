import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import PlanetsContent from "../pages/PlanetsContent.vue";
import StarshipsContent from "../pages/StarshipsContent.vue";
import PeopleContent from "../pages/PeopleContent.vue";

const routes = [
	{ path: "/", name: "home", component: Home },
	{ path: "/planets", name: "planets", component: PlanetsContent },
	{ path: "/starships", name: "starships", component: StarshipsContent },
	{ path: "/people", name: "people", component: PeopleContent },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
