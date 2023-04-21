import View from "./view.js";
import Store from "./store.js";

// global namespace constructor
const APP = {
	//not sure exactly why this is used but it allows us to get multiple variables
	$: {
		actions: document.querySelector('[data-id="menu"]'),
		actionItems: document.querySelector('[data-id="menu-items"]'),
		resetBtn: document.querySelector('[data-id="reset-btn"]'),
		newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
		tile: document.querySelectorAll('[data-id="tile"]'),
		modal: document.querySelector('[data-id="modal"]'),
		modalText: document.querySelector('[data-id="modal-text"]'),
		modalBtn: document.querySelector('[data-id="modal-btn"]'),
		turn: document.querySelector('[data-id="turn"]'),
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

		APP.$.modalBtn.addEventListener("click", (event) => {
			// restart state
			APP.state.moves = [];
			// loop over every tile and replace with empy child
			APP.$.tile.forEach((tile) => tile.replaceChildren());
			//hide modal
			APP.$.modal.classList.add("hidden");
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

				const nextPlayer = getOppositePlayer(currentPlayer);

				const turnLabel = document.createElement("p");
				turnLabel.innerText = `Player ${nextPlayer}, you're up!`;
				// we declare icon and create the element
				const icon = document.createElement("i");
				const turnIcon = document.createElement("i");

				// if current player 1 set to x and syles
				if (currentPlayer === 1) {
					icon.textContent = "X";
					turnIcon.textContent = "O";
					icon.classList.add("fa-solid", "fa-x", "turquoise");
					turnIcon.classList.add("fa-solid", "fa-x", "yellow");
					turnLabel.classList = "yellow";
				} else {
					icon.textContent = "O";
					icon.classList.add("fa-solid", "fa-x", "yellow");
					turnIcon.textContent = "X";
					turnIcon.classList.add("fa-solid", "fa-x", "turquoise");
					turnLabel.classList = "turquoise";
				}

				APP.$.turn.replaceChildren(turnIcon, turnLabel);
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
					// unhide modal
					APP.$.modal.classList.remove("hidden");

					let modalText = "";
					if (game.winner) {
						modalText = `Player ${game.winner} wins!`;
					} else {
						modalText = "its a tie!";
					}

					APP.$.modalText.textContent = modalText;
				}
			});
		});
	},
};

const PLAYERS = [
	{
		id: 1,
		name: "Player 1",
		iconClass: "fa-x",
		colorClass: "yellow",
	},
	{
		id: 2,
		name: "Player 2",
		iconClass: "fa-o",
		colorClass: "turquoise",
	},
];

function init() {
	const VIEW = new View();
	const STORE = new Store(PLAYERS);

	VIEW.bindGameResetEvent((event) => {
		// Close the modal
		VIEW.closeModal();
		// Reset the store
		STORE.resetGame();
		// Set the indicator to the current player
		VIEW.setTurnIndicator(STORE.game.currentPlayer);
		// Clear the board
		VIEW.clearBoard();
	});
	VIEW.bindNewRoundEvent((event) => {
		console.log("New Round Event", event);
	});
	VIEW.bindPlayerMoveEvent((tile) => {
		// get clicked tile

		const existingMove = STORE.game.moves.find(
			(move) => move.tileId === +tile.id
		);

		// check if tile has existing move based on selected tile if not return undefined

		if (existingMove) {
			return;
		}
		// place icon of current plage in a selected tile
		VIEW.handlePlayerMove(tile, STORE.game.currentPlayer);

		// add move to game state
		STORE.playerMove(+tile.id);

		// check if game is complete
		if (STORE.game.status.isComplete) {
			// show modal
			VIEW.openModal(
				STORE.game.status.winner
					? `${STORE.game.status.winner.name} wins!`
					: "It's a tie!"
			);

			return;
		}
		// set turn indicator to next player id
		VIEW.setTurnIndicator(STORE.game.currentPlayer);
	});
}

window.addEventListener("load", init);
//  test commet to see if commit will be update
