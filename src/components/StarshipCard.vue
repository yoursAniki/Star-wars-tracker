<template>
		<div class="card-container">
			<div class="card-title">{{ name }}</div>
			<div class="card-first">
				length: <span>{{ length }} m</span>
			</div>
			<div class="card-second">
				passengers: <span>{{ passengers }}</span>
			</div>
		</div>
</template>

<script lang="ts" setup>
defineProps({
	name: String,
	length: String,
	passengers: String,
});
</script>
