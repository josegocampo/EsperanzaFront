import { findAllByDisplayValue, render } from '@testing-library/react'
import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import S from 'styled-components'
import esperanza from '../images/esperanza.png'


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
    console.log(playerGames, keyz)

    const dateFunc = (dd) =>{
        console.log(dd)
        const d = new Date(dd)
        const newd = new Intl.DateTimeFormat('en-GB').format(d)
        return newd
    }

  
    return (
      <div>
            <Card className="card">
                <Title><img src={esperanza} className="oak" /></Title>
                { playerGames ? keyz.map(( key, index ) => {
                    return <Row className={ index % 2 != 0 ? "odd" : null }>
                             <Dt>{dateFunc(playerGames[key][0].created_at)}</Dt>
                            <Players> { playerGames[key].map( player => 
                                    <Player> <div>{player.player_name} </div><div>{player.net_score}</div> </Player>)}
                            </Players>
                        </Row>
                }) : "loading"}
        </Card>
      </div>
     
    )
}

const Card = S.div`
    height: 500px;
    width: 300px;
    color: brown;
    border: 1px solid black;
`

const Title = S.h1`
    font-size: 35px;
    font-weight: 400;
    width: 100%; 
    height: 100px;
    margin: 0px;
    color: black;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #edece3;
    background-position: 0 100%;
    background-size: 100% 2px;
    border-bottom: 3px solid #762417c4;
    card-align: center;
    z-index: 100;
    background-image: linear-gradient(transparent 50%,#f6f5f0 50%);
`


const Row = S.div`
    display: flex;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid darkgrey;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const Dt = S.div`
    font-size: 0.5rem;
    padding-left: 3px;
`

const Players = S.div`
    display: flex;
    flex-direction: row;
    width: 90%;
    align-items: flex-start;
`
const Player = S.div`
    width: 45px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    border: 1px solid lightgrey;
    justify-content: center;
    height: 33px;
`

export default GameHistoryDisplay


    

  

