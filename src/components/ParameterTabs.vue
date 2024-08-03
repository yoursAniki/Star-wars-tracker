<template>
	<div class="mini-tabs">
		<div
			class="mini-tab"
			v-for="(param, index) in parameters"
			:key="index"
			@click="selectParam(param)"
			:class="{ active: param === selectedParam }"
		>
			{{ param }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

defineProps<{
	parameters: string[];
}>();

const emit = defineEmits<{
	(event: "selectParam", param: string): void;
}>();

const selectedParam = ref<string | null>(null);

const selectParam = (param: string): void => {
	selectedParam.value = param;
	emit("selectParam", param);
};
</script>

<style>
.mini-tabs {
	display: flex;
	justify-content: center;
	border-bottom: 1px solid #ccc;
}

.mini-tab {
	padding: 10px 20px;
	cursor: pointer;
	border: 1px solid transparent;
	border-bottom: none;
	margin-bottom: -1px;
	user-select: none;
	transition: .2s linear;
}

.mini-tab.active {
	border-color: #ccc;
	border-bottom: 1px solid white;
	background-color: white;
	color: black;
	transition: .2s linear;
}
</style>
