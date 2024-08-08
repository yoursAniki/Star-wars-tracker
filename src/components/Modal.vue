<template>
	<div
		class="modal-mask"
		@click="handleClickOutside"
		@keyup.esc="$emit('closeModal'), resetComparison()"
	>
		<div class="modal-wrapper">
			<div ref="modalContainer" class="modal-container">
				<div class="modal-header">
					<span>Comparison of characteristics</span>
					<img
						@click="resetComparison()"
						class="modal-marker"
						src="/public/marker-solid.svg"
						height="15"
						alt=""
					/>
				</div>

				<div class="modal-body">
					<div class="modal-data">
						<table class="bordered-table">
							<thead>
								<tr>
									<th>Card Name</th>
									<th v-for="param in paramNames">{{ param.name }}</th>
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
												highlightActive &&
												compareFields.secondField === 'first',
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
												highlightActive &&
												compareFields.firstField === 'second',
										}"
									>
										{{ cardSelectionStore.secondSelectedCard?.firstField }}
									</td>
									<td
										:class="{
											highlighted:
												highlightActive &&
												compareFields.secondField === 'second',
										}"
									>
										{{ cardSelectionStore.secondSelectedCard?.secondField }}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div class="modal-footer">
					<slot name="footer">
						<button class="modal-default-button" @click="$emit('closeModal')">
							OK
						</button>
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useCardSelectionStore } from "../store/cardSelection";
import { ICard } from "../interfaces/Card";

defineProps<{
	paramNames: { name: string }[];
}>();

const emit = defineEmits(["closeModal"]);
const modalContainer = ref<HTMLElement | null>(null);
const cardSelectionStore = useCardSelectionStore();

const handleClickOutside = (event: MouseEvent) => {
	const target = event.target as HTMLElement;
	if (modalContainer.value && !modalContainer.value.contains(target)) {
		emit("closeModal");
	}
};

const handleKeydown = (event: KeyboardEvent) => {
	if (event.key === "Escape") {
		emit("closeModal");
	}
};

const highlightActive = ref<boolean>(true);

const resetComparison = () => {
	highlightActive.value = !highlightActive.value;
};

const isNumeric = (value: any): boolean =>
	!isNaN(value) && !isNaN(parseFloat(value)) && value !== "unknown";

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

onMounted(() => {
	window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleKeydown);
});
</script>

<style>
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	color: black;
}

.modal-data {
	display: flex;
	justify-content: space-evenly;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 300px;
	margin: 0px auto;
	padding: 20px 30px;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
	margin-top: 0;
	color: #42b983;
}

.modal-body {
	margin: 20px 0;
}

.modal-default-button {
	display: block;
	margin-top: 1rem;
	user-select: none;
	color: white;
}

.modal-enter-active,
.modal-leave-active {
	transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;
}

.modal-marker {
	user-select: none;
	cursor: pointer;
	margin-left: 10px;
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
