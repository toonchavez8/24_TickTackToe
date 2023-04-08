// global namespace constructor
const APP = {
	//not sure exactly why this is used but it allows us to get multiple variables
	$: {
		actions: document.querySelector('[data-id="menu"]'),
		actionItems: document.querySelector('[data-id="menu-items"]'),
		resetBtn: document.querySelector('[data-id="reset-btn"]'),
		newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
		tile: document.querySelectorAll('[data-id="tile"]'),
	},
	// function inicializer to add our event listeners
	init() {
		APP.registerEventListners();
	},

	// this containers all event listners to maintain a clean init
	registerEventListners() {
		// DONE - this will control our menu
		APP.$.actions.addEventListener("click", (event) => {
			// toggle adds and removes the keyword within the function
			APP.$.actionItems.classList.toggle("hidden");
		});
		//TODO
		APP.$.resetBtn.addEventListener("click", (event) => {
			console.log("reset the game");
		});
		APP.$.newRoundBtn.addEventListener("click", (event) => {
			console.log("start new round");
		});

		APP.$.tile.forEach((tile) => {
			tile.addEventListener("click", (event) => {
				console.log(`tile with id ${event.target.id} was clicked    `);
				const icon = document.createElement("i");
				icon.classList.add("fa-solid", "fa-x", "turqoise");
				// <i class="fa-solid fa-o yellow">O</i>
				//  <i class="fa-solid fa-x turquoise">X</i>
			});
		});
	},
};

// this will wait for our page to load thanks to the window add eventlister on load will run our function with in our app adding event listerners to our actions menu
window.addEventListener("load", APP.init);
