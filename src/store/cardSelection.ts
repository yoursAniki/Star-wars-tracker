import { defineStore } from "pinia";
import { ICard } from "../interfaces/Card";

export const useCardSelectionStore = defineStore("cardSelection", {
	state: () => ({
		firstSelectedCard: null as ICard | null,
		secondSelectedCard: null as ICard | null,
	}),

	actions: {
		addCard(card: ICard) {
			if (this.firstSelectedCard === null) {
				this.firstSelectedCard = card;
      } else if (this.secondSelectedCard === null) {
        if (this.firstSelectedCard.name === card.name) {
          return
        }

				this.secondSelectedCard = card;
			}
		},

		resetCards() {
			this.firstSelectedCard = null;
			this.secondSelectedCard = null;
		},
	},
});
