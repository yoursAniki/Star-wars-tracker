<template>
		<div class="card-container">
			<div class="card-title">{{ name }}</div>
			<div class="card-first">
				height: <span>{{ height }} cm</span>
			</div>
			<div class="card-second">
				mass: <span>{{ mass }} kg</span>
			</div>
		</div>
</template>

<script lang="ts" setup>
import "../style.css";

defineProps({
	name: String,
	height: String,
	mass: String,
});
</script>
