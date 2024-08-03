import { defineStore } from "pinia";
import { fetchData } from "../api/api";

interface Planet {
	name: string;
	diameter: string;
	population: string;
}

interface People {
	name: string;
	height: string;
	mass: string;
}

interface Starship {
	name: string;
	length: string;
	passengers: string;
}

export const useStarWarsStore = defineStore("starWars", {
	state: () => ({
		planets: [] as any[],
		people: [] as any[],
		starships: [] as any[],
		loading: false,
	}),

	actions: {
		async fetchStarWarsData() {
			this.loading = true;
			try {
				const planetsResponse = await fetchData<Planet[]>("planets");
				const peopleResponse = await fetchData<People[]>("people");
				const starshipsResponse = await fetchData<Starship[]>("starships");

				this.planets = planetsResponse.results;
				this.people = peopleResponse.results;
				this.starships = starshipsResponse.results;
			} catch (error) {
				console.error("Failed to fetch data:", error);
			} finally {
				this.loading = false;
			}
		},
	},
});
