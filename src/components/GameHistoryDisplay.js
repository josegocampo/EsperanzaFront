import { findAllByDisplayValue, render } from '@testing-library/react'
import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import S from 'styled-components'
import esperanza from '../images/esperanza.png'
import loupe from '../images/loupe.png'
import GameDetails from './GameDetails'


const GameHistoryDisplay = ( {games, keyz} ) => {

    const [ gameClicked, setGameClicked ] = useState(false)

    const [gameId, setGameId] = useState()

    

    const DateTime = ({date}) =>{
        const d = new Date(date)
        const newd = new Intl.DateTimeFormat('en-GB').format(d)
        return (
            <Dt>{newd}</Dt>
        )
    }

    const handleChanges = (k) =>{
        setGameClicked(true)
        setGameId(k)
    }

    const hChange = () =>{
        setGameClicked(false)
    }

    return (
      <div> 
           
            
                <Title><img src={esperanza} className="oak" /></Title>
                <Card>
                {gameClicked ? <GameDetails id={gameId} btn={hChange}/> : 
                 games ? keyz.map(( key, index ) => {
                    return <Row className={ index % 2 != 0 ? "odd" : null }>
                             <DateTime date={games[key][0].created_at} />
                            <Players> { games[key].map( player => 
                                    <Player> <div>{player.player_name} </div><div>{player.net_score}</div> </Player>)}
                            </Players>
                            <Mangifying src={loupe} onClick={() => handleChanges(key)}/>
                        </Row>
                }) : "loading"}
                <Buttons></Buttons>
        </Card>
      </div>
     
    )
}

const Card = S.div`
    height: 550px;
    width: 375px;
    color: #1d384d;
    font-size: 0.8rem;
    font-weight: 600;
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
    font-size: 0.6rem;
    padding-left: 3px;
    font-weight: 700;
`

const Players = S.div`
    display: flex;
    flex-direction: row;
    width: 90%;
    align-items: flex-start;
`
const Player = S.div`
    width: 40px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    border: 1px solid lightgrey;
    justify-content: center;
    height: 33px;
`
const Mangifying = S.img`
    width: 15px;
    margin-right: 5px;
    &:hover{
        cursor: pointer;
    }
`

const Buttons = S.div`
    width: 95%;
    padding-left: 5px;
    padding-right: 5px;
    display: flex;
    justify-content: space-between;
    height: 10%
    position: absolute;
    float: bottom;
`

const Button =S.button`
    width: 40px;
    height: 40px;
    font-weight: 700;
`
export default GameHistoryDisplay


    

  

