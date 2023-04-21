const inicialValue = {
	moves: [],
};

export default class Store {
	// create a private field
	#state = inicialValue;
	constructor(players) {
		this.players = players;
	}

	get game() {
		const state = this.#getState();

		const currentPlayer = this.players[state.moves.length % 2];

		// declare all posible patterns to win
		const winningPatterns = [
			[1, 2, 3],
			[1, 5, 9],
			[1, 4, 7],
			[2, 5, 8],
			[3, 5, 7],
			[3, 6, 9],
			[4, 5, 6],
			[7, 8, 9],
		];

		// declare winner as null in order declare tie
		let winner = null;

		for (const player of this.players) {
			const selectedTiles = state.moves
				.filter((move) => move.player.id === player.id)
				.map((move) => move.tileId);

			// check for winning pattern
			for (const pattern of winningPatterns) {
				if (pattern.every((tile) => selectedTiles.includes(tile))) {
					winner = player;
				}
			}
		}

		return {
			moves: state.moves,
			currentPlayer,
			status: {
				isComplete: state.moves.length === 9 || winner != null,
				winner,
			},
		};
	}

	playerMove(tileId) {
		// function to update the game state
		const state = this.#getState(); // get the current game state

		const stateClone = structuredClone(state); // clone the current game state

		stateClone.moves.push({
			// add the move to the clone
			tileId,
			player: this.game.currentPlayer,
		});

		this.#saveState(stateClone); // save the new game state
	}

	// function to reset the game state
	resetGame() {
		this.#saveState(inicialValue);

		console.log(this.#getState());
	}

	// create a private getter to access the state
	#getState() {
		return this.#state;
	}

	// create a private method to save the state
	#saveState(stateOrFunction) {
		// Save previous state
		const prevState = this.#getState();

		let newState;

		switch (typeof stateOrFunction) {
			case "function":
				// If stateOrFunction is a function, call it with the previous state as a parameter
				newState = stateOrFunction(prevState);
				break;
			case "object":
				// If stateOrFunction is an object, use it as the new state
				newState = stateOrFunction;
				break;
			default:
				// If stateOrFunction is neither a function nor an object, throw an error
				throw new Error("Invalid state or function");
		}

		// Save new state
		this.#state = newState;
	}
}
