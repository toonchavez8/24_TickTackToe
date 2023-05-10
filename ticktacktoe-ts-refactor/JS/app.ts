import View from "./view.js";
import Store from "./store.js";
import type { Player } from "./types";

const PLAYERS: Player[] = [
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
	// model
	const STORE = new Store("live-t3-storage-key", PLAYERS);

	// view
	const VIEW = new View();

	// this is the event for current tab
	STORE.addEventListener("stateChange", () => {
		VIEW.render(STORE.game, STORE.stats);
	});

	// this is the event for other tabs
	window.addEventListener("storage", () => {
		console.log("storage event from another tab");
		VIEW.render(STORE.game, STORE.stats);
	});

	// initialize the game and render the UI
	VIEW.render(STORE.game, STORE.stats);

	VIEW.bindGameResetEvent((event) => {
		// Reset the store
		STORE.resetGame();
	});

	VIEW.bindNewRoundEvent((event) => {
		STORE.newRound();
	});

	VIEW.bindPlayerMoveEvent((tile) => {
		const existingMove = STORE.game.moves.find(
			(move) => move.tileId === +tile.id
		);

		// check if tile has existing move based on selected tile if not return undefined

		if (existingMove) {
			return;
		}

		STORE.playerMove(+tile.id);
	});
}

window.addEventListener("load", init);
//  test commet to see if commit will be update
