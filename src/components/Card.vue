<template>
	<div class="card-container">
		<div class="card-title">{{ params.name }}</div>
		<div class="card-first">
			first param: <span>{{ params.firstParam }}</span>
		</div>
		<div class="card-second">
			second param: <span>{{ params.secondParam }}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import "../style.css";

defineProps({
	params: Object,
});
</script>
