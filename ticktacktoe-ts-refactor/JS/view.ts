import type { Move, Player } from "./types";

import type { DerivedGame, DerivedStats } from "./store";

export default class View {
	$: Record<string,Element> = {};
	$$: Record<string, NodeListOf<Element>> = {};

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
		this.$.grid = this.#qs('[data-id="grid"]');
		this.$.header = this.#qs('[data-id="header"]');

		this.$$.tile = this.#qsAll('[data-id="tile"]');

		// view only ui elements
		// DONE - this will control our menu
		this.$.actions.addEventListener("click", (event) => {
			// toggle adds and removes the keyword within the function
			this.#toggleMenu();
		});
	}

	// test

	render(game: DerivedGame, stats: DerivedStats ) {

		//set header
		this.#setHeader();

		// destructure game object
		const {
			currentPlayer,
			moves,
			status: { isComplete, winner },
		} = game;

		// destructure stats object
		const { playerWithStats, ties } = stats;

		// close all modals
		this.#closeAll();

		// update the UI
		this.#clearBoard();

		// set turn indicator to current player
		this.#setTurnIndicator(currentPlayer);

		// update scorebored
		this.#updateScoreBoard(
			playerWithStats[0].wins,
			playerWithStats[1].wins,
			ties
		);

		// initialize moves
		this.#initializeMoves(moves);

		// check if game is complete
		if (isComplete) {
			// show modal if game is complete
			this.#openModal(winner ? `${winner.name} wins!` : "It's a tie!");
			return;
		}

		// set turn indicator to next player id
		this.#setTurnIndicator(currentPlayer);
	}

	// register all event listners

	bindGameResetEvent(handler: EventListener) {
		this.$.resetBtn.addEventListener("click", handler);
		this.$.modalBtn.addEventListener("click", handler);
	}
	bindNewRoundEvent(handler: EventListener) {
		this.$.newRoundBtn.addEventListener("click", handler);
	}
	bindPlayerMoveEvent(handler: (el: Element) => void) {
		this.#delegate(this.$.grid, '[data-id="tile"]', "click", handler);
	}
	/**
	 * Here we are going to create a helper methods to update the UI
	 */
	// update scorebored
	#updateScoreBoard(p1Wins:number, p2Wins:number, ties:number) {
		this.$.p1wins.textContent = `${p1Wins} wins`;
		this.$.p2wins.textContent = `${p2Wins} wins`;
		this.$.ties.textContent = `${ties} ties`;
	}

	// clear the game board
	#clearBoard() {
		this.$$.tile.forEach((tile) => {
			tile.innerHTML = "";
		});
	}

	#openModal(message: string) {
		this.$.modal.classList.remove("hidden");
		this.$.modalText.textContent = message;
	}

	#closeModal() {
		this.$.modal.classList.add("hidden");
	}

	#closeAll() {
		this.#closeModal();
		this.#closeMenu();
	}

	#handlePlayerMove(tile: Element, player: Player) {
		const icon = document.createElement("i");
		icon.classList.add("fa-solid", player.iconClass, player.colorClass);

		tile.replaceChildren(icon);
	}

	#setHeader(){
		this.$.header.textContent = "TypeScript";	
	}

	#initializeMoves(moves: Move[]) {
		// Loop through each tile on the board
		this.$$.tile.forEach((tile) => {
			const existingMove = moves.find((move) => move.tileId === +tile.id);

			if (existingMove) {
				this.#handlePlayerMove(tile, existingMove.player);
			}
		});
	}

	#closeMenu() {
		this.$.actionItems.classList.add("hidden");
		this.$.actions.classList.remove("border");

		//get the icon element
		const menuIcon = this.#qs("i", this.$.actions)

		//toggle the icon rotation class
		menuIcon.classList.toggle("rotate");
	}

	#toggleMenu() {
		// toggle adds and removes the keyword within the function
		this.$.actionItems.classList.toggle("hidden");
		this.$.actions.classList.toggle("border");

		//get the icon element
		const menuIcon = this.#qs("i", this.$.actions)

		//toggle the icon rotation class
		menuIcon.classList.toggle("rotate");
	}

	/**
	 * Sets the current turn indicator
	 * @param {number} player
	 */

	#setTurnIndicator(player: Player) {
		// Create elements
		const icon = document.createElement("i");
		const label = document.createElement("p");

		// Add classes
		icon.classList.add("fa-solid", player.colorClass, player.iconClass);
		label.classList.add(player.colorClass);

		// Set text
		label.textContent = `${player.name}, you're up!`;

		// Replace children
		this.$.turn.replaceChildren(icon, label);
	}

	// Quiery selector helper methods
	#qs(Selector:string, parent?: Element) {
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
	#qsAll(Selector:string) {
		// get the element from the DOM
		const elementList = document.querySelectorAll(Selector);

		// if there is no element, throw an error
		if (!elementList)
			throw new Error(`Could not find the ${Selector} as an element list`);

		// return the element
		return elementList;
	}

	// delegate helper method
	#delegate(
		el:Element, 
		selector:string, 
		eventKey:string, 
		handler: (el: Element) => void
		){
		// add event listener to parent
		el.addEventListener(eventKey, (event) => {

			if (!(event.target instanceof Element)){
				throw new Error("Event target is not an element");
			}


			if (event.target?.matches(selector)) {
				handler(event.target);
			}
		});
	}
}
