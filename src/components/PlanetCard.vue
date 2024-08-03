<template>
		<div class="card-container">
			<div class="card-title">{{ name }}</div>
			<div class="card-first">
				diameter: <span>{{ diameter }} m</span>
			</div>
			<div class="card-second">
				population: <span>{{ population }}</span>
			</div>
		</div>
</template>

<script lang="ts" setup>
defineProps({
	name: String,
	diameter: String,
	population: String,
});
</script>
