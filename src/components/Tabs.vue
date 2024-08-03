<template>
	<div class="tabs">
		<div
			v-for="(tab, index) in tabs"
			:key="index"
			@click="selectTab(index)"
			:class="{ active: index === activeTabIndex }"
			class="tab"
		>
			{{ tab }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tabs = ref(['Planets', 'Starships', 'People']);
const activeTabIndex = ref<number | null>(null);
const emit = defineEmits(['tabSelected']);

const selectTab = (index: number): void => {
  activeTabIndex.value = index;
  emit('tabSelected', index);
}

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
}

.tab.active {
	font-weight: bold;
	border-color: #ccc;
	border-bottom: 1px solid white;
	background-color: white;
  color: black;
}
</style>
