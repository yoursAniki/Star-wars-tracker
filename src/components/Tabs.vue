<template>
	<div class="tabs">
		<div
			v-for="(tab, index) in tabs"
			:key="index"
			@click="selectTab(index)"
			:class="{ active: index === modelValue }"
			class="tab" >
			{{ tab }}
		</div>
	</div>
</template>

<script lang="ts" setup>
defineProps({
	modelValue: {
		type: Number,
		required: true,
	},
	tabs: {
		type: Array as () => string[],
		required: true,
	},
});

const emit = defineEmits(["update:modelValue"]);

const selectTab = (index: number): void => {
	emit("update:modelValue", index);
};
</script>

<style>
.tabs {
	display: flex;
	justify-content: center;
	border-bottom: 1px solid #ccc;
}

.tab {
	padding: 25px 20px;
	cursor: pointer;
	border: 1px solid transparent;
	border-bottom: none;
	margin-bottom: -1px;
	user-select: none;
	transition: 0.2s linear;
}

.tab.active {
	border-color: #ccc;
	border-bottom: 1px solid white;
	background-color: white;
	color: black;
	transition: 0.2s linear;
}
</style>
