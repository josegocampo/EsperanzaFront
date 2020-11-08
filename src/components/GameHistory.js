import React, { useState, useEffect } from 'react';
import axios from 'axios';
import S from 'styled-components';
import GameHistoryDisplay from './GameHistoryDisplay'


const GameHistory = () => {

    const [gameHistory, setGameHistory] = useState()
    const [ keyz, setKeyz ] = useState()



    useEffect(() => {
        axios.get(`https://hcesperanzino.herokuapp.com/games/gameinfo`)
            .then((response) => {
                const hashTable = {}
                    response.data.forEach((game) => {
                       if (!hashTable[game.game_id]) {
                        hashTable[game.game_id] = [game]
                       }
                       else {
                        hashTable[game.game_id].push(game)
                       }
                   })
                   const k = Object.keys(hashTable)
                   setKeyz(k)   
                   setGameHistory(hashTable)
                    
                
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])





    return (
                    <div><GameHistoryDisplay games={gameHistory} keyz={keyz}/></div>
    )

}


export default GameHistory;