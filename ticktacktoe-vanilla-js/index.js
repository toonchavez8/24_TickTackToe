// global namespace constructor
const APP = {
	//not sure exactly why this is used but it allows us to get multiple variables
	$: {
		actions: document.querySelector('[data-id="menu"]'),
		actionItems: document.querySelector('[data-id="menu-items"]'),
		resetBtn: document.querySelector('[data-id="reset-btn"]'),
		newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
		tile: document.querySelectorAll('[data-id="tile"]'),
	},

	// here we track the current state of who is the player
	state: {
		moves: [],
	},

	// function to get status of game
	getGameStatus(moves) {
		// declare player moves container
		const p1Moves = moves
			.filter((move) => move.playerId === 1)
			.map((move) => +move.tileId);
		const p2Moves = moves
			.filter((move) => move.playerId === 2)
			.map((move) => +move.tileId);

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

		// check if winning patter
		winningPatterns.forEach((pattern) => {
			const p1Wins = pattern.every((value) => p1Moves.includes(value));
			const p2Wins = pattern.every((value) => p2Moves.includes(value));

			// if player moves is true then set winner to player id
			if (p1Wins) winner = 1;
			if (p2Wins) winner = 2;
		});
		return {
			status: moves.length === 9 || winner != null ? "complete" : "in-progress",
			winner,
		};
	},

	// function inicializer to add our event listeners
	init() {
		APP.registerEventListners();
	},

	// this containers all event listners to maintain a clean init
	registerEventListners() {
		// DONE - this will control our menu
		APP.$.actions.addEventListener("click", (event) => {
			// toggle adds and removes the keyword within the function
			APP.$.actionItems.classList.toggle("hidden");
		});

		//TODO
		APP.$.resetBtn.addEventListener("click", (event) => {
			console.log("reset the game");
		});
		APP.$.newRoundBtn.addEventListener("click", (event) => {
			console.log("start new round");
		});

		APP.$.tile.forEach((tile) => {
			tile.addEventListener("click", (event) => {
				// check if tile has existing move based on selected tile if not return undefined
				const hasMove = (tileId) => {
					const existingMove = APP.state.moves.find(
						(move) => move.tileId === tileId
					);
					return existingMove !== undefined;
				};

				//check if tile has a move
				if (hasMove(+tile.id)) {
					return;
				}

				// declare constructer state to check last move
				const lastMove = APP.state.moves.at(-1);

				// declare constructer variable to get opposite number
				const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);

				//State is tracked of current player
				const currentPlayer =
					APP.state.moves.length === 0
						? 1
						: getOppositePlayer(lastMove.playerId);

				// we declare icon and create the element
				const icon = document.createElement("i");

				// if current player 1 set to x and syles
				if (currentPlayer === 1) {
					icon.textContent = "X";
					icon.classList.add("fa-solid", "fa-x", "turquoise");
				} else {
					icon.textContent = "O";
					icon.classList.add("fa-solid", "fa-x", "yellow");
				}

				// check and set state of moves
				APP.state.moves.push({
					tileId: +tile.id,
					playerId: currentPlayer,
				});

				//we fill the tile with the icon based on current player
				tile.replaceChildren(icon);

				console.log("state", APP.state);

				// here we check if game has been won
				const game = APP.getGameStatus(APP.state.moves);

				if (game.status === "complete") {
					if (game.winner) {
						alert(`Player ${game.winner} wins`);
					} else {
						alert("its a tie");
					}
				}
			});
		});
	},
};

// this will wait for our page to load thanks to the window add eventlister on load will run our function with in our app adding event listerners to our actions menu
window.addEventListener("load", APP.init);
