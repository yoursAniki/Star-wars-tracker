<template>
	<div
		class="modal-mask"
		@click="handleClickOutside"
		@keyup.esc="$emit('closeModal')"
	>
		<div class="modal-wrapper">
			<div class="modal-container">
				<div class="modal-header">
					<slot name="header"> default header </slot>
				</div>

				<div class="modal-body">
					<slot name="body"> default body </slot>
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
import { onMounted, onUnmounted } from "vue";

const emit = defineEmits(["closeModal"]);

function handleClickOutside(event: MouseEvent) {
	const target = event.target as HTMLElement;
	const modalContainer = document.querySelector(".modal-container");
	if (modalContainer && !modalContainer.contains(target)) {
		emit("closeModal");
	}
}

const handleKeydown = (event: KeyboardEvent) => {
	if (event.key === "Escape") {
		emit("closeModal");
	}
};

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
</style>
