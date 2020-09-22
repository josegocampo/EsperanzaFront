import React, { useState } from 'react';
import GameIdContext from './GameIdContext';
import PlayersDataContext from './PlayersDataContext';

const GameContextManager = ({ children }) =>{

    const [gameId, setGameId] = useState()
    const [selectedPlayers, setSelectedPlayers] = useState([])
    
    const changeId = {
        gameId,
        setGameId
    }

    const selectedPlayersData = {
        selectedPlayers, 
        setSelectedPlayers
    }

    return (
        <div>
            <GameIdContext.Provider value={changeId}>
             <PlayersDataContext.Provider value={selectedPlayersData}>   
                {children}
             </PlayersDataContext.Provider>
            </GameIdContext.Provider>
        </div>
        
    )
}

export default GameContextManager;