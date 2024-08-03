<template>
	<ParameterTabs :parameters="peopleParams" @select-param="sortPeople" />
	<div class="cards-container" v-if="people">
		<PeopleCard
			v-for="(person, index) in sortedPeople"
			@click="selectPerson(person)"
			:key="index"
			:name="person.name"
			:height="person.height"
			:mass="person.mass"
		/>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStarWarsStore } from "../store/starWars";
import { useCardSelectionStore } from "../store/cardSelection";
import PeopleCard from "../components/PeopleCard.vue";
import ParameterTabs from "../components/ParameterTabs.vue";

interface Person {
	name: string;
	height: number;
	mass: number;
}

const starWarsStore = useStarWarsStore();
const cardSelectionStore = useCardSelectionStore();
const people = ref(starWarsStore.people);

const selectPerson = (person: any) => {
	const currentPerson = {
		name: person.name,
		firstField: person.height,
		secondField: person.mass,
	};

	cardSelectionStore.addCard(currentPerson);
};

const peopleParams = ref<string[]>(["name", "height", "mass"]);

const selectedParam = ref<string | null>(null);

const sortedPeople = computed<Person[]>(() => {
	if (!selectedParam.value) return people.value;

	return [...people.value].sort((a, b) => {
		const param = selectedParam.value as keyof Person;
		if (param === "height" || param === "mass") {
			return a[param] - b[param];
		} else {
			return a[param].localeCompare(b[param]);
		}
	});
});

const sortPeople = (param: string) => {
	selectedParam.value = param;
};
</script>

<style></style>
