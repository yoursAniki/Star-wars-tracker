<template>
	<div class="mini-tabs">
		<div
			class="mini-tab"
			v-for="(param, index) in parameters"
			:key="index"
			@click="$emit('selectParam', param)"
		>
			{{ param }}
		</div>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	parameters: string[];
}>();

defineEmits<{
	(selectParam: string): void;
}>();
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
}

.mini-tab.active {
	font-weight: bold;
	border-color: #ccc;
	border-bottom: 1px solid white;
	background-color: white;
	color: black;
}
</style>
