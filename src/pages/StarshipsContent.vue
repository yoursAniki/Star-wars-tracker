<template>
	<ParameterTabs :parameters="starshipParams" @select-param="sortStarships" />
	<div class="cards-container" v-if="starships">
		<StarshipCard
			@click="selectStarship(starship)"
			v-for="(starship, index) in sortedStarships"
			:key="index"
			:name="starship.name"
			:length="starship.length"
			:passengers="starship.passengers"
		/>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStarWarsStore } from "../store/starWars";
import { useCardSelectionStore } from "../store/cardSelection";
import StarshipCard from "../components/StarshipCard.vue";
import ParameterTabs from "../components/ParameterTabs.vue";

interface Starship {
	name: string;
	length: number;
	passengers: number;
}

const starWarsStore = useStarWarsStore();
const cardSelectionStore = useCardSelectionStore();
const starships = ref(starWarsStore.starships);

const selectStarship = (starship: any) => {
	const currentStarship = {
		name: starship.name,
		firstField: starship.length,
		secondField: starship.passengers,
	};

	cardSelectionStore.addCard(currentStarship);
	console.log(
		cardSelectionStore.firstSelectedCard,
		cardSelectionStore.secondSelectedCard
	);
};

const starshipParams = ref<string[]>(["name", "length", "passengers"]);

const selectedParam = ref<string | null>(null);

const sortedStarships = computed<Starship[]>(() => {
	if (!selectedParam.value) return starships.value;

	return [...starships.value].sort((a, b) => {
		const param = selectedParam.value as keyof Starship;
		if (param === "length" || param === "passengers") {
			return a[param] - b[param];
		} else {
			return a[param].localeCompare(b[param]);
		}
	});
});

const sortStarships = (param: string) => {
	selectedParam.value = param;
};
</script>

<style></style>
