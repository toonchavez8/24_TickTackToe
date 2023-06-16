import type { GameState } from "../types";
import { PLAYERS } from "./players";

export default function derivedGame(state: GameState) {
	const currentPlayer = PLAYERS[state.currentGameMoves.length % 2];

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

	for (const player of PLAYERS) {
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
