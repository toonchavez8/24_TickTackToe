import { useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Modal from "./components/modal/Modal";
import Menu from "./components/menu/Menu";

export default function App() {
	const [showModal, setShowModal] = useState(false);

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
						return (
							<div key={squareId} className="square shadow">
								<i className="fa-solid fa-x turquoise"></i>
							</div>
						);
					})}

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

			{showModal && <Modal message="Player 1 Wins!" />}
		</>
	);
}
