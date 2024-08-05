<script setup lang="ts">
import Content from "./components/Content.vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStarWarsStore } from "./store/starWars";
import { useCardSelectionStore } from "./store/cardSelection";
import Loader from "./components/Loader.vue";
import Modal from "./components/Modal.vue";
import { ICard } from "./interfaces/Card";

const starWarsStore = useStarWarsStore();
const cardSelectionStore = useCardSelectionStore();

const router = useRouter();

const selectTab = (index: number): void => {
	router.push(
		`/${index === 0 ? "planets" : index === 1 ? "starships" : "people"}`
	);
};

onMounted(async () => {
	await starWarsStore.fetchStarWarsData();
});

const isNumeric = (value: any): boolean =>
	!isNaN(value) && !isNaN(parseFloat(value)) && value !== "unknown";

const highlightActive = ref<boolean>(true);

const compareFields = computed(() => {
	const first: ICard | null = cardSelectionStore.firstSelectedCard;
	const second: ICard | null = cardSelectionStore.secondSelectedCard;

	if (first && second) {
		return {
			firstField:
				isNumeric(first.firstField) && isNumeric(second.firstField)
					? Number(first.firstField) > Number(second.firstField)
						? "first"
						: "second"
					: null,
			secondField:
				isNumeric(first.secondField) && isNumeric(second.secondField)
					? Number(first.secondField) > Number(second.secondField)
						? "first"
						: "second"
					: null,
		};
	}
	return {
		firstField: null,
		secondField: null,
	};
});

const resetComparison = () => {
	highlightActive.value = !highlightActive.value;
};
</script>

<template>
	<div class="wrapper">
		<Modal
			v-show="
				cardSelectionStore.firstSelectedCard &&
				cardSelectionStore.secondSelectedCard
			"
			@close-modal="cardSelectionStore.resetCards(), (highlightActive = true)"
		>
			<template v-slot:header>
				<span>Comparison of characteristics</span>
				<img
					@click="resetComparison()"
					class="modal-marker"
					src="/public/marker-solid.svg"
					height="15"
					alt=""
				/>
			</template>
			<template v-slot:body>
				<div class="modal-data">
					<table class="bordered-table">
						<thead>
							<tr>
								<th>Card Name</th>
								<th>First Field</th>
								<th>Second Field</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{{ cardSelectionStore.firstSelectedCard?.name }}</td>
								<td
									:class="{
										highlighted:
											highlightActive && compareFields.firstField === 'first',
									}"
								>
									{{ cardSelectionStore.firstSelectedCard?.firstField }}
								</td>
								<td
									:class="{
										highlighted:
											highlightActive && compareFields.secondField === 'first',
									}"
								>
									{{ cardSelectionStore.firstSelectedCard?.secondField }}
								</td>
							</tr>
							<tr>
								<td>{{ cardSelectionStore.secondSelectedCard?.name }}</td>
								<td
									:class="{
										highlighted:
											highlightActive && compareFields.firstField === 'second',
									}"
								>
									{{ cardSelectionStore.secondSelectedCard?.firstField }}
								</td>
								<td
									:class="{
										highlighted:
											highlightActive && compareFields.secondField === 'second',
									}"
								>
									{{ cardSelectionStore.secondSelectedCard?.secondField }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</template>
		</Modal>

		<Tabs @tab-selected="selectTab" />

		<Content v-if="!starWarsStore.loading" />

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

.highlighted {
	font-weight: 800;
}

.bordered-table {
	border-collapse: collapse;
	width: 100%;
}

.bordered-table th,
.bordered-table td {
	border: 1px solid black;
	padding: 8px;
	text-align: left;
}

.bordered-table th {
	background-color: #f2f2f2;
}
</style>
