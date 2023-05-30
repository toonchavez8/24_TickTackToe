import { useState } from "react";
import "./Menu.css";
import classNames from "classnames";

type Props = {
	onAction: (action: "reset" | "new-round") => void;
};

export default function Menu({ onAction }: Props) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<nav className="actions" onClick={() => setMenuOpen((prev) => !prev)}>
			<button className="menu-btn">
				Actions
				<i
					className={classNames(
						"fa-solid yellow",
						menuOpen ? "fa-chevron-up" : "fa-chevron-down"
					)}
				></i>
			</button>

			{menuOpen && (
				<div className="items border ">
					<button onClick={() => onAction("reset")}>Reset</button>
					<button onClick={() => onAction("new-round")}>New Round</button>
				</div>
			)}
		</nav>
	);
}
