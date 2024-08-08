<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useStarWarsStore } from "./store/starWars";
import { useCardSelectionStore } from "./store/cardSelection";
import Loader from "./components/Loader.vue";
import Modal from "./components/Modal.vue";
import { RouterView } from "vue-router";
import Tabs from "./components/Tabs.vue";

const starWarsStore = useStarWarsStore();
const cardSelectionStore = useCardSelectionStore();
const router = useRouter();
const index = ref<number>(-1);

type Category = "starships" | "planets" | "people";

const paramsByCategory: Record<Category, { name: string }[]> = {
	starships: [{ name: "Length" }, { name: "Passengers" }],
	planets: [{ name: "Diameter" }, { name: "Population" }],
	people: [{ name: "Height" }, { name: "Mass" }],
};

const paramNames = computed(() => {
	const category = router.currentRoute.value.params.category as Category;
	return (
		paramsByCategory[category] || [
			{ name: "First Param" },
			{ name: "Second Param" },
		]
	);
});

const selectTab = (): void => {
	router.push(
		`/${
			index.value === 0 ? "planets" : index.value === 1 ? "starships" : "people"
		}`
	);
};

watch(index, () => {
	selectTab();
});

onMounted(async () => {
	await starWarsStore.fetchStarWarsData();
});
</script>

<template>
	<div class="wrapper">
		<Modal
			v-show="
				cardSelectionStore.firstSelectedCard &&
				cardSelectionStore.secondSelectedCard
			"
			@closeModal="cardSelectionStore.resetCards()"
			:paramNames="paramNames"
		>
		</Modal>

		<Tabs v-model="index" :tabs="['Planets', 'Starships', 'People']" />
		<RouterView v-if="!starWarsStore.loading" />
		<Loader v-else />
	</div>
</template>

<style scoped>
.wrapper {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background: white;
}
</style>
