import { GameState } from "../types";
import { PLAYERS } from "./players";

export default function derivedStats(state: GameState) {
	return {
		playerWithStats: PLAYERS.map((player) => {
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
