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
		return {
			currentPlayer,
		};
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
