
export type Player = {
    id: number,
    name: string,
    iconClass: string,
    colorClass: string,
}

export type Move = {
    tileId: number,
    player: Player,
}
export type GameStatus = {
    isComplete: boolean,
    winner: Player | null,
}

export type Game ={
    moves: Move[],
    status: GameStatus, 
}


export type GameState =  {
    currentGameMoves: Move[],
	history: {
		currentRoundgames: Game[],
		allGames: Game[],
	},
}

