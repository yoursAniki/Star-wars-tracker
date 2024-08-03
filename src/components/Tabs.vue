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
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const tabs = ref(["Planets", "Starships", "People"]);
const activeTabIndex = ref<number | null>(null);
const emit = defineEmits(["tabSelected"]);

const route = useRoute();

const selectTab = (index: number): void => {
	activeTabIndex.value = index;
	emit("tabSelected", index);
};

watchEffect(() => {
	const currentPath = route.path;
	const tabRoutes = ["planets", "starships", "people"];
	activeTabIndex.value = tabRoutes.indexOf(currentPath.replace("/", ""));
});
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
