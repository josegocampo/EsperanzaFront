import React, { useContext, useEffect, useState } from 'react';
import GameIdContext from './GameIdContext';
import axios from "axios";
import S from 'styled-components';

const PostGameScreen = () => {

    const { gameId } = useContext(GameIdContext)

    const [ id, setId] = useState(() =>{
        return gameId
    })

    useEffect(() => {
        axios.get(`https://hcesperanzino.herokuapp.com/games/${id}/gameinfo`)
        .then(response => {
            console.log('RESPONSEEEE', response.data)
            setPlayers(response.data)
            })
        .catch(error => {console.log(error)
            })
            }, 
    [])

    const [ winners, setWinners] = useState()

    const [ players, setPlayers] = useState()
   
    
    useEffect(() =>{
        if (players){
        const sortedPlayers = players.sort((a,b) => {
            return a.hc_score - b.hc_score
        })
        const winners = sortedPlayers.filter((player) => 
            player.hc_score === sortedPlayers[0].hc_score)
        setWinners(winners)}
        },
     [players])

     console.log(players)
     console.log(winners)


    return (
        <div> 
           {winners ? winners.length > 1 ? <div>There is a tie between {winners.map((player) => <span> {player.player_id}</span> )}</div>
           : `The Winner is ${winners[0].player_id}`
           : "Loading"}

           
        </div>

    )


}

const Row = S.div`

`


export default PostGameScreen;
