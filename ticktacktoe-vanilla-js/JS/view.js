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
	}
	bindNewRoundEvent(handler) {
		this.$.newRoundBtn.addEventListener("click", handler);
	}
	bindPlayerMoveEvent(handler) {
		this.$$.tile.forEach((tile) => {
			tile.addEventListener("click", handler);
		});
	}

	// dom helper methods
	#toggleMenu() {
		this.$.actionItems.classList.toggle("hidden");
		this.$.actions.classList.toggle("border");

		const menuIcon = this.$.actions.querySelector("i");

		menuIcon.classList.toggle("rotate");
	}
	// quiery Selectior function to check if element exists and to refactor
	#qs(Selector, parent) {
		const element = parent
			? parent.querySelector(Selector)
			: document.querySelector(Selector);

		if (!element) throw new Error(`Could not find the ${Selector} element`);

		return element;
	}
	#qsAll(Selector) {
		const elementList = document.querySelectorAll(Selector);

		if (!elementList)
			throw new Error(`Could not find the ${Selector} as an element list`);

		return elementList;
	}
}
