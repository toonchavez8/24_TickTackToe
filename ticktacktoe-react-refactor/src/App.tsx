import "./App.css";
import Footer from "./components/footer/Footer";
import Modal from "./components/modal/Modal";
import Menu from "./components/menu/Menu";
import { GameState, Player } from "./types";
import classNames from "classnames";
import { useLocalStorage } from "./hooks/useLocalStorage";
import derivedGame from "./utils/derivedGame";
import derivedStats from "./utils/derivedStats";

export default function App() {
	const [state, setState] = useLocalStorage<GameState>("storage", {
		currentGameMoves: [],
		history: {
			currentRoundgames: [],
			allGames: [],
		},
	});

	const game = derivedGame(state);
	const stats = derivedStats(state);

	function resetGame(isNewRound: boolean) {
		setState((prevState) => {
			const stateClone = structuredClone(prevState);

			const { status, moves } = game;

			if (status.isComplete) {
				stateClone.history.currentRoundgames.push({
					moves,
					status,
				});
			}

			stateClone.currentGameMoves = [];

			if (isNewRound) {
				stateClone.history.allGames.push(
					...stateClone.history.currentRoundgames
				);
				stateClone.history.currentRoundgames = [];
			}
			return stateClone;
		});
	}

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
					<p> react refactor </p>
				</header>
			</a>
			<main>
				<section className="grid">
					{/* <!-- turn board --> */}
					<div className={classNames("turn", game.currentPlayer.colorClass)}>
						<i
							className={classNames("fa-solid", game.currentPlayer.iconClass)}
						></i>
						<p>{game.currentPlayer.name}, you're up!</p>
					</div>

					<Menu onAction={(action) => resetGame(action === "new-round")} />

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
						<span>{stats.playerWithStats[0].wins}</span>
					</div>
					<div
						className="score shadow"
						style={{ backgroundColor: " var(--light-gray)" }}
					>
						<p>Ties</p>
						<span>{stats.ties}</span>
					</div>
					<div
						className="score shadow"
						style={{ backgroundColor: " var(--yellow)" }}
					>
						<p>Player 2</p>
						<span>{stats.playerWithStats[1].wins}</span>
					</div>
				</section>
			</main>

			<Footer />

			{game.status.isComplete && (
				<Modal
					message={
						game.status.winner ? `${game.status.winner.name} wins!` : "Tie"
					}
					onClick={() => resetGame(false)}
				/>
			)}
		</>
	);
}
