<template>
	<div class="card-container">
		<div class="card-title">{{ params.name }}</div>
		<div class="card-first">
			{{ paramNames.first }}: <span>{{ params.firstField }}</span>
		</div>
		<div class="card-second">
			{{ paramNames.second }}: <span>{{ params.secondField }}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import "../style.css";
import { ICard } from "../interfaces/Card";

defineProps<{
  params: ICard;
  paramNames: { first: string; second: string };
}>();
</script>