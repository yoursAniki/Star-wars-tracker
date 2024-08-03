<template>
	<ParameterTabs :parameters="planetParams" @select-param="sortPlanets" />
	<div class="cards-container" v-if="planets">
		<PlanetCard
			@click="selectPlanet(planet)"
			v-for="(planet, index) in sortedPlanets"
			:key="index"
			:name="planet.name"
			:diameter="planet.diameter"
			:population="planet.population"
		/>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStarWarsStore } from "../store/starWars";
import { useCardSelectionStore } from "../store/cardSelection";
import PlanetCard from "../components/PlanetCard.vue";
import ParameterTabs from "../components/ParameterTabs.vue";

interface Planet {
	name: string;
	diameter: number;
	population: number;
}

const starWarsStore = useStarWarsStore();
const cardSelectionStore = useCardSelectionStore();
const planets = ref(starWarsStore.planets);

const selectPlanet = (planet: any) => {
  const currentPlanet = {
    name: planet.name,
    firstField: planet.diameter,
    secondField: planet.population,
  };
  
  cardSelectionStore.addCard(currentPlanet);
  console.log(cardSelectionStore.firstSelectedCard, cardSelectionStore.secondSelectedCard);
};

const planetParams = ref<string[]>(["name", "diameter", "population"]);

const selectedParam = ref<string | null>(null);

const sortedPlanets = computed<Planet[]>(() => {
	if (!selectedParam.value) return planets.value;

	return [...planets.value].sort((a, b) => {
		const param = selectedParam.value as keyof Planet;
		if (param === "diameter" || param === "population") {
			return a[param] - b[param];
		} else {
			return a[param].localeCompare(b[param]);
		}
	});
});

const sortPlanets = (param: string) => {
	selectedParam.value = param;
};
</script>

<style></style>
