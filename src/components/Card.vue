<template>
	<div class="card-container">
		<div class="card-title">{{ params.name }}</div>
		<div 
			class="card-item" 
			v-for="(paramName, index) in paramNames" 
			:key="index"
		>
			{{ paramName }}: <span>{{ params[fields[index]] }}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import "../style.css";
import { ICard } from "../interfaces/Card";

defineProps<{
  params: ICard;
  paramNames: string[];
  fields: (keyof ICard)[];
}>();
</script>
