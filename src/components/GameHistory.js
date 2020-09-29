import React, { useState, useEffect } from 'react';
import axios from 'axios';
import S from 'styled-components';
import GameHistoryDisplay from './GameHistoryDisplay'


const GameHistory = () => {

    const [gameHistory, setGameHistory] = useState()


    useEffect(() => {
        axios.get(`https://hcesperanzino.herokuapp.com/games/gameinfo`)
            .then((response) => {
                setGameHistory(response.data)
                console.log('hi')
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])




    return (
                    <div><GameHistoryDisplay data={gameHistory}/></div>
    )

}




export default GameHistory;