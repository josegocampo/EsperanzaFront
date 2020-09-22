import React, { useContext, useEffect, useState } from 'react';
import GameIdContext from './GameIdContext';
import axios from "axios";
import S from 'styled-components';

const PostGameScreen = () => {

    const { gameId } = useContext(GameIdContext)


    const [ id, setId] = useState(() =>{
        return gameId
    })

    const [ players, setPlayers] = useState()

    useEffect(() =>{
        axios.get(`https://hcesperanzino.herokuapp.com/game/${id}/gameinfo`)
        .then(response => {
            setPlayers(response.data)
        })
        .catch(error => {console.log(error)
        })
    }, 
    [])


    console.log(players)

    return (
        <div>
            { players.map((player) =>{ 
                if (player.name){
                return <Row><div>{player.name}</div><div>{player.net_score}</div><div>{player.gross_score}</div></Row>
            }
            }) }
        </div>

    )


}

const Row = S.div`

`


export default PostGameScreen;
