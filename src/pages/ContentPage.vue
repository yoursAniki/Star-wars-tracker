<template>
	<Tabs
		:tabs="['name', 'first param', 'second param']"
		v-model="selectedParam"
	/>
	<div class="cards-container" v-if="items.length">
		<Card
			:class="{ selected: item.selected }"
			@click="selectItem(item)"
			v-for="(item, index) in sortedItems"
			:key="index"
			:params="item"
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

interface Item {
	name: string;
	firstParam: number | string;
	secondParam: number | string;
	selected?: boolean;
}

const selectedParam = ref<number>(0);

const route = useRoute();
const category = ref(route.params.category as string);

const starWarsStore = useStarWarsStore();
const cardSelectionStore = useCardSelectionStore();

const params = ref<string[]>(["name", "firstParam", "secondParam"]);

const items = ref<Item[]>([]);
const updateItems = () => {
	if (category.value === "starships") {
		items.value = starWarsStore.starships.map(starship => ({
			name: starship.name,
			firstParam: starship.length,
			secondParam: starship.passengers,
		}));
	} else if (category.value === "planets") {
		items.value = starWarsStore.planets.map(planet => ({
			name: planet.name,
			firstParam: planet.diameter,
			secondParam: planet.population,
		}));
	} else if (category.value === "people") {
		items.value = starWarsStore.people.map(person => ({
			name: person.name,
			firstParam: person.height,
			secondParam: person.mass,
		}));
	} else {
		items.value = [];
	}

	items.value.forEach(item => {
		item.selected = false;
	});
};

updateItems();

watch(
	() => route.params.category,
	newCategory => {
		category.value = newCategory as string;
		updateItems();
	}
);

const sortedItems = computed<Item[]>(() => {
	const param = params.value[selectedParam.value] as keyof Item;

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

const selectItem = (item: Item) => {
	const currentItem = {
		name: item.name,
		firstField: item.firstParam.toString(),
		secondField: item.secondParam.toString(),
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
