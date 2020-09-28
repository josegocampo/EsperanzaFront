import React, { useState, useEffect } from 'react';
import axios from 'axios';
import S from 'styled-components';


const GameHistory = () => {

    const [ gameHistory, setGameHistory ] = useState()

    const [ gameDisplay, setGameDisplay ] = useState()

    useEffect(() => {
         axios.get(`https://hcesperanzino.herokuapp.com/games/gameinfo`)
        .then((response) => { 
            setGameHistory(response.data
                )})
        .catch((err) => {
            console.log(err)
        })
    },[])

    

    return (
        <div>
            {/* <Card>
                {gameHistory.map((game) => 
                <div>
                    <span>{game.game_id}</span><span>{game_game}</span><span></span><span></span>
                </div>
                )}
            </Card> */}

        </div>
    )


}


export default GameHistory;