import View from "./view.js";
import Store from "./store.js";

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
		VIEW.closeAll();
		// Reset the store
		STORE.resetGame();
		// Set the indicator to the current player
		VIEW.setTurnIndicator(STORE.game.currentPlayer);
		// Clear the board
		VIEW.clearBoard();

		VIEW.updateScoreBoard(
			STORE.stats.playerWithStats[0].wins,
			STORE.stats.playerWithStats[1].wins,
			STORE.stats.ties
		);
	});
	VIEW.bindNewRoundEvent((event) => {
		STORE.newRound();

		// Close the modal
		VIEW.closeAll();
		// Clear the board
		VIEW.clearBoard();
		// Set the indicator to the current player
		VIEW.setTurnIndicator(STORE.game.currentPlayer);
		VIEW.updateScoreBoard(
			STORE.stats.playerWithStats[0].wins,
			STORE.stats.playerWithStats[1].wins,
			STORE.stats.ties
		);
		// Reset the with a new round
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
