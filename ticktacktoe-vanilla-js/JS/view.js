export default class View {
	$ = {};
	$$ = {};

	constructor() {
		this.$.actions = this.#qs('[data-id="menu-btn"]');
		this.$.actionItems = this.#qs('[data-id="menu-items"]');
		this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
		this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]');
		this.$.modal = this.#qs('[data-id="modal"]');
		this.$.modalText = this.#qs('[data-id="modal-text"]');
		this.$.modalBtn = this.#qs('[data-id="modal-btn"]');
		this.$.turn = this.#qs('[data-id="turn"]');
		this.$.p1wins = this.#qs('[data-id="p1-wins"]');
		this.$.p2wins = this.#qs('[data-id="p2-wins"]');
		this.$.ties = this.#qs('[data-id="ties"]');

		this.$$.tile = this.#qsAll('[data-id="tile"]');

		// view only ui elements
		// DONE - this will control our menu
		this.$.actions.addEventListener("click", (event) => {
			// toggle adds and removes the keyword within the function
			this.#toggleMenu();
		});
	}

	// register all event listners

	bindGameResetEvent(handler) {
		this.$.resetBtn.addEventListener("click", handler);
		this.$.modalBtn.addEventListener("click", handler);
	}
	bindNewRoundEvent(handler) {
		this.$.newRoundBtn.addEventListener("click", handler);
	}
	bindPlayerMoveEvent(handler) {
		this.$$.tile.forEach((tile) => {
			tile.addEventListener("click", () => handler(tile));
		});
	}
	/**
	 * Here we are going to create a helper methods to update the UI
	 */
	// update scorebored
	updateScoreBoard(p1Wins, p2Wins, ties) {
		this.$.p1wins.innerText = `${p1Wins} wins`;
		this.$.p2wins.innerText = `${p2Wins} wins`;
		this.$.ties.innerText = `${ties} ties`;
	}

	// clear the game board
	clearBoard() {
		this.$$.tile.forEach((tile) => {
			tile.innerHTML = "";
		});
	}

	openModal(message) {
		this.$.modal.classList.remove("hidden");
		this.$.modalText.innerText = message;
	}

	#closeModal() {
		this.$.modal.classList.add("hidden");
	}

	closeAll() {
		this.#closeModal();
		this.#closeMenu();
	}

	handlePlayerMove(tile, player) {
		const icon = document.createElement("i");
		icon.classList.add("fa-solid", player.iconClass, player.colorClass);

		tile.replaceChildren(icon);
	}

	initializeMoves(moves) {
		// Loop through each tile on the board
		this.$$.tile.forEach((tile) => {
			const existingMove = moves.find((move) => move.tileId === +tile.id);

			if (existingMove) {
				this.handlePlayerMove(tile, existingMove.player);
			}
		});
	}

	#closeMenu() {
		this.$.actionItems.classList.add("hidden");
		this.$.actions.classList.remove("border");

		//get the icon element
		const menuIcon = this.$.actions.querySelector("i");

		//toggle the icon rotation class
		menuIcon.classList.toggle("rotate");
	}

	#toggleMenu() {
		// toggle adds and removes the keyword within the function
		this.$.actionItems.classList.toggle("hidden");
		this.$.actions.classList.toggle("border");

		//get the icon element
		const menuIcon = this.$.actions.querySelector("i");

		//toggle the icon rotation class
		menuIcon.classList.toggle("rotate");
	}

	/**
	 * Sets the current turn indicator
	 * @param {number} player
	 */

	setTurnIndicator(player) {
		// Create elements
		const icon = document.createElement("i");
		const label = document.createElement("p");

		// Add classes
		icon.classList.add("fa-solid", player.colorClass, player.iconClass);
		label.classList.add(player.colorClass);

		// Set text
		label.innerText = `${player.name}, you're up!`;

		// Replace children
		this.$.turn.replaceChildren(icon, label);
	}

	// Quiery selector helper methods
	#qs(Selector, parent) {
		// Get the element from the DOM
		const element = parent
			? parent.querySelector(Selector)
			: document.querySelector(Selector);

		// If there is no element, throw an error
		if (!element) throw new Error(`Could not find the ${Selector} element`);

		// Return the element
		return element;
	}

	// Quiery selector all helper methods
	#qsAll(Selector) {
		// get the element from the DOM
		const elementList = document.querySelectorAll(Selector);

		// if there is no element, throw an error
		if (!elementList)
			throw new Error(`Could not find the ${Selector} as an element list`);

		// return the element
		return elementList;
	}
}
