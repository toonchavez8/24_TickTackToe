import { useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Modal from "./components/modal/Modal";
import Menu from "./components/menu/Menu";
import { GameState, Player } from "./types";
import classNames from "classnames";

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

function derivedGame(state: GameState) {
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

function derivedStats(state: GameState) {
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

export default function App() {
	const [state, setState] = useState<GameState>({
		currentGameMoves: [],
		history: {
			currentRoundgames: [],
			allGames: [],
		},
	});

	const game = derivedGame(state);
	const stats = derivedStats(state);

	function handlePlayerMove(squareId: number, player: Player) {
		setState((prevState) => {
			const stateClone = structuredClone(prevState);

			stateClone.currentGameMoves.push({
				tileId: squareId,
				player,
			});

			return stateClone;
		});
	}

	return (
		<>
			<a
				href="https://github.com/toonchavez8/24_TickTackToe/tree/main/ticktacktoe-vanilla-js"
				target="_blank"
			>
				<header className="white">
					<h1>TickTackToe</h1>
					<p data-id="header"> Blank </p>
				</header>
			</a>
			<main>
				<section className="grid" data-id="grid">
					{/* <!-- turn board --> */}
					<div className="turn yellow" data-id="turn">
						<i className="fa-solid fa-x "></i>
						<p className="yellow">Player 1, you're up!</p>
					</div>

					<Menu onAction={(action) => console.log(action)} />

					{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((squareId) => {
						const existingMove = game.moves.find(
							(move) => move.tileId === squareId
						);

						return (
							<div
								key={squareId}
								className="square shadow"
								onClick={() => {
									if (existingMove) return;

									handlePlayerMove(squareId, game.currentPlayer);
								}}
							>
								{existingMove && (
									<i
										className={classNames(
											"fa-solid",
											existingMove.player.iconClass,
											existingMove.player.colorClass
										)}
									></i>
								)}
							</div>
						);
					})}

					{/* <!-- Scoreboard --> */}
					<div
						className="score shadow"
						style={{ backgroundColor: "var(--turquoise)" }}
					>
						<p>Player 1</p>
						<span data-id="p1-wins">{stats.playerWithStats[0].wins}</span>
					</div>
					<div
						className="score shadow"
						style={{ backgroundColor: " var(--light-gray)" }}
					>
						<p>Ties</p>
						<span data-id="ties">{stats.ties}</span>
					</div>
					<div
						className="score shadow"
						style={{ backgroundColor: " var(--yellow)" }}
					>
						<p>Player 2</p>
						<span data-id="p2-wins">{stats.playerWithStats[1].wins}</span>
					</div>
				</section>
			</main>

			<Footer />

			{game.status.isComplete && (
				<Modal
					message={
						game.status.winner ? `${game.status.winner.name} wins!` : "Tie"
					}
				/>
			)}
		</>
	);
}
