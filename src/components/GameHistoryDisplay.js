import React, { useState, useEffect } from 'react'
import S from 'styled-components'

const GameHistoryDisplay = ( props ) => {

    const [ playerGames, setPlayerGames ] = useState()

    const [keyz, setKeyz] = useState()

    useEffect(() =>{
        const hashTable = {}
            if (props.data){
            props.data.forEach((game) => {
               if (!hashTable[game.game_id]) {
                hashTable[game.game_id] = [game]
               }
               else {
                hashTable[game.game_id].push(game)
               }
           })
           setPlayerGames(hashTable)
           const k = Object.keys(hashTable)
           setKeyz(k)      
        }
    } , [props])

  
    return (
        <Card>
            { playerGames ? keyz.map(( key ) => {
                return <Row>
                            game id : {key} 
                        <Players> { playerGames[key].map( player => 
                                <Player> <div>{player.player_name} </div><div>{player.net_score}</div> </Player>)}
                        </Players>
                    </Row>
            }) : "loading"}
    </Card>
     
    )
}

const Card = S.div`
    height: 500px;
    width: 373px;
    color: brown;
    border: 6px groove pink;
    padding: 20px;
`

const Row = S.div`
    height: 70px;
    display: flex;
    border: 4px inset lightgreen;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 10px;
    margin-top: 15px;
`

const Players = S.div`
    display: flex;
    flex-direction: row;
    width: 300px;
`
const Player = S.div`
    width: 50px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    border: 2px outset darkgrey;
    background: cyan;
`

export default GameHistoryDisplay


    

  

