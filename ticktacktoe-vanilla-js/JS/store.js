const inicialValue = {
	currentGameMoves: [],
	history: {
		currentRoundgames: [],
		allGames: [],
	},
};

export default class Store extends EventTarget {
	constructor(key, players) {
		super();
		this.storageKey = key;
		this.players = players;
	}

	get stats() {
		const state = this.#getState();
		return {
			playerWithStats: this.players.map((player) => {
				const wins = state.history.currentRoundgames.filter(
					(game) => game.status.winner?.id === player.id
				).length;
				return {
					...player,
					wins,
				};
			}),
			ties: state.history.currentRoundgames.filter(
				(game) => game.status.winner === null
			).length,
		};
	}

	// create a getter to access the game state

	get game() {
		const state = this.#getState();

		const currentPlayer = this.players[state.currentGameMoves.length % 2];

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
			const selectedTiles = state.currentGameMoves
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
			moves: state.currentGameMoves,
			currentPlayer,
			status: {
				isComplete: state.currentGameMoves.length === 9 || winner != null,
				winner,
			},
		};
	}

	playerMove(tileId) {
		// function to update the game state
		const stateClone = structuredClone(this.#getState()); // get the current game state

		stateClone.currentGameMoves.push({
			// add the move to the clone
			tileId,
			player: this.game.currentPlayer,
		});

		this.#saveState(stateClone); // save the new game state
	}

	// function to reset the game state
	resetGame() {
		const stateClone = structuredClone(this.#getState()); // get the current game state

		const { status, moves } = this.game;
		// if game complete we save the game in history
		if (status.isComplete) {
			stateClone.history.currentRoundgames.push({
				moves,
				status,
			});
		}
		stateClone.currentGameMoves = []; // reset the moves

		this.#saveState(stateClone);
	}

	// function to reset the game stats
	newRound() {
		this.resetGame();
		// get the current game state as a clone
		const stateClone = structuredClone(this.#getState());

		// save the current round games in all games
		stateClone.history.allGames.push(...stateClone.history.currentRoundgames);

		// reset the current round games
		stateClone.history.currentRoundgames = [];

		this.#saveState(stateClone);
	}

	// create a private getter to access the state
	#getState() {
		const item = window.localStorage.getItem(this.storageKey);
		return item ? JSON.parse(item) : inicialValue;
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
		window.localStorage.setItem(this.storageKey, JSON.stringify(newState));

		this.dispatchEvent(new Event("stateChange"));
	}
}
