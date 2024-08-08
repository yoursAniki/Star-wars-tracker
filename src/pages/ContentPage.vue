<template>
	<Tabs :tabs="tabs" v-model="selectedParam" />
	<div class="cards-container" v-if="items.length">
		<Card
			:class="{ selected: item.selected }"
			@click="selectItem(item)"
			v-for="(item, index) in sortedItems"
			:key="index"
			:params="item"
			:paramNames="paramNames"
			:fields="fields"
		/>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStarWarsStore } from "../store/starWars";
import { useCardSelectionStore } from "../store/cardSelection";
import Card from "../components/Card.vue";
import Tabs from "../components/Tabs.vue";
import { ICard } from "../interfaces/Card";

const selectedParam = ref<number>(0);

const route = useRoute();
const category = ref(route.params.category as string);

const starWarsStore = useStarWarsStore();
const cardSelectionStore = useCardSelectionStore();

const items = ref<ICard[]>([]);

const paramsByCategory: Record<
	string,
	{
		display: string[];
		fields: (keyof ICard)[];
		paramNames: string[];
	}
> = {
	starships: {
		display: ["name", "length", "passengers"],
		fields: ["firstField", "secondField"],
		paramNames: ["Length", "Passengers"],
	},
	planets: {
		display: ["name", "diameter", "population"],
		fields: ["firstField", "secondField"],
		paramNames: ["Diameter", "Population"],
	},
	people: {
		display: ["name", "height", "mass"],
		fields: ["firstField", "secondField"],
		paramNames: ["Height", "Mass"], 
	},
};

const updateItems = () => {
	if (category.value === "starships") {
		items.value = starWarsStore.starships.map(starship => ({
			name: starship.name,
			firstField: starship.length,
			secondField: starship.passengers,
			selected: false,
		}));
	} else if (category.value === "planets") {
		items.value = starWarsStore.planets.map(planet => ({
			name: planet.name,
			firstField: planet.diameter,
			secondField: planet.population,
			selected: false,
		}));
	} else if (category.value === "people") {
		items.value = starWarsStore.people.map(person => ({
			name: person.name,
			firstField: person.height,
			secondField: person.mass,
			selected: false,
		}));
	} else {
		items.value = [];
	}
};

updateItems();

watch(
	() => route.params.category,
	newCategory => {
		category.value = newCategory as string;
		updateItems();
	}
);

const tabs = computed(() => {
	return (
		paramsByCategory[category.value]?.display || [
			"name",
			"first param",
			"second param",
		]
	);
});

const paramNames = computed(() => {
	return paramsByCategory[category.value]?.paramNames || ["First Param", "Second Param"];
});

const fields = computed(() => {
	return paramsByCategory[category.value]?.fields || ["firstField", "secondField"];
});

const sortedItems = computed<ICard[]>(() => {
	const param = fields.value[selectedParam.value] as keyof ICard;

	return [...items.value].sort((a, b) => {
		const aValue = a[param];
		const bValue = b[param];

		const aValueNumber =
			typeof aValue === "string" ? parseFloat(aValue) : aValue;
		const bValueNumber =
			typeof bValue === "string" ? parseFloat(bValue) : bValue;

		if (!isNaN(aValueNumber as number) && !isNaN(bValueNumber as number)) {
			return (aValueNumber as number) - (bValueNumber as number);
		} else if (typeof aValue === "string" && typeof bValue === "string") {
			return aValue.localeCompare(bValue);
		} else {
			return 0;
		}
	});
});

const selectItem = (item: ICard) => {
	const currentItem = {
		name: item.name,
		firstField: item.firstField.toString(),
		secondField: item.secondField.toString(),
	};

	cardSelectionStore.addCard(currentItem);

	item.selected = true;
	const selectedItems = items.value.filter(item => item.selected);
	if (selectedItems.length === 2) {
		selectedItems[0].selected = false;
		selectedItems[1].selected = false;
	}

	console.log(
		cardSelectionStore.firstSelectedCard,
		cardSelectionStore.secondSelectedCard
	);
};
</script>