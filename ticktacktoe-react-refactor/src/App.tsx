import "./App.css";
import Footer from "./components/Footer";

export default function App() {
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

					{/* <!-- Dropdown menu --> */}

					<nav className="actions" data-id="menu">
						<button className="menu-btn" data-id="menu-btn">
							Actions
							<i className="fa-solid fa-chevron-down yellow "></i>
						</button>

						<div className="items border hidden" data-id="menu-items">
							<button data-id="reset-btn">Reset</button>
							<button data-id="new-round-btn">New Round</button>
						</div>
					</nav>
					{/* <!-- game board --> */}
					<div id="1" className="square shadow" data-id="tile"></div>
					<div id="2" className="square shadow" data-id="tile"></div>
					<div id="3" className="square shadow" data-id="tile"></div>
					<div id="4" className="square shadow" data-id="tile"></div>
					<div id="5" className="square shadow" data-id="tile"></div>
					<div id="6" className="square shadow" data-id="tile"></div>
					<div id="7" className="square shadow" data-id="tile"></div>
					<div id="8" className="square shadow" data-id="tile"></div>
					<div id="9" className="square shadow" data-id="tile"></div>

					{/* <!-- Scoreboard --> */}
					<div
						className="score shadow"
						style={{ backgroundColor: "var(--turquoise)" }}
					>
						<p>Player 1</p>
						<span data-id="p1-wins">0 Wins</span>
					</div>
					<div
						className="score shadow"
						style={{ backgroundColor: " var(--light-gray)" }}
					>
						<p>Ties</p>
						<span data-id="ties">0</span>
					</div>
					<div
						className="score shadow"
						style={{ backgroundColor: " var(--yellow)" }}
					>
						<p>Player 2</p>
						<span data-id="p2-wins">0 Wins</span>
					</div>
				</section>
			</main>

			<Footer />

			{/* <!-- Modal that opens when game ends --> */}
			<div className="modal hidden " data-id="modal">
				<div className="modal-contents">
					<p data-id="modal-text">Player 1 wins!</p>
					<button data-id="modal-btn">Play again</button>
				</div>
			</div>
		</>
	);
}
