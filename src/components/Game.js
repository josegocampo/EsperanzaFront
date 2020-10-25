import React, { useEffect, useState, useContext } from 'react'
import produce from 'immer';
import PlayersDataContext from './PlayersDataContext';
import '../App.css';
import { playas} from './mockdata';
import GetWinners from './GetWinners';
import GameCard from './GameCard'


const Game = () => {

    const { selectedPlayers, setSelectedPlayers } = useContext(PlayersDataContext)
    const [players, setPlayers] = useState(playas)
    const [finished, setFinished] = useState(false)

    useEffect(() => {
        setPlayers(produce(players, draft => {
            selectedPlayers.map((player, ix) => {
                draft[ix].id = player.id
                draft[ix].player_name = player.name
            })
        }))
        // console.log('this runs')
        // const playersCopy = [...players]
        // selectedPlayers.map((player, ix) => {
        //     playersCopy[ix].id = player.id;
        //     playersCopy[ix].player_name = player.name
        // })
        // setPlayers(playersCopy)
    },
        [])

    

    console.log(players)
    return (
        <div className="bigcard">
            {finished ? <GetWinners players={players} setFinished={setFinished}/> 
            : null }
            <GameCard players={players} setPlayers={setPlayers} setFinished={setFinished} setSelectedPlayers={setSelectedPlayers} selectedPlayers={selectedPlayers} />
        </div>
    )
}

export default Game



