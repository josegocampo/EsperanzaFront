import React, {useState, useEffect} from 'react'
import axios from 'axios'
import S from 'styled-components'
import badge from '../images/badge.png';
import {fakePlayer} from './mockdata';
import back from '../images/back.png'

const GameDetails = ( {id, btn} ) => {

    const [gameInfo, setGameInfo] = useState()
    
    useEffect(() => {
        axios.get(`https://hcesperanzino.herokuapp.com/games/${id}/gameinfo/`)
            .then((response) => {
                const sortedWinner = response.data.sort( (a,b) => {
                    return a.net_score - b.net_score
                })
                while (sortedWinner.length < 4){
                    sortedWinner.push(fakePlayer)
                }
                setGameInfo(sortedWinner)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const DateTime = ({date}) =>{
        const d = new Date(date)
        const newd = new Intl.DateTimeFormat('en-GB').format(d)
        return (
            <Dt>{newd}</Dt>
        )
    }


    console.log(gameInfo)

    return(
        <div style={{width: 375}}>
             { gameInfo ? 
             <>
            <GameData>
                <img src={back} onClick={btn} style={{width: 25, cursor: 'pointer'}}/>
                <div style={{marginLeft: 30}}>Game # {gameInfo[0].game_id}</div>
                <DateTime date={gameInfo[0].created_at} />
            </GameData>
                <Card>
                    <Column>
                        <Mini style={{width: 50}}></Mini>
                        <Hole style={{alignItems: 'flex-start' , height: 30}}className="card">
                            Hole 
                        </Hole>
                        <Hole className="card">
                            1
                        </Hole>
                        <Hole className="card">
                            2 
                        </Hole>
                        <Hole className="card">
                            3 
                        </Hole>
                        <Hole className="card">
                            4
                        </Hole>
                        <Hole className="card">
                            5 
                        </Hole>
                        <Hole className="card">
                            6 
                        </Hole>
                        <Hole className="card">
                            7 
                        </Hole>
                        <Hole className="card">
                            8 
                        </Hole>
                        <Hole className="card">
                            9 
                        </Hole>
                        <Hole className="card">
                            
                        </Hole>
                        <Hole className="card">
                            
                        </Hole>
                        <Hole className="card">
                            
                        </Hole>
                    </Column>
                    <Column>
                    <Mini></Mini>
                        <Box className="card" style={{alignItems: 'flex-start' , height: 30}}>
                            Par 
                        </Box>
                        <Box className="card">
                            4
                        </Box>
                        <Box className="card">
                            5 
                        </Box>
                        <Box className="card">
                            4 
                        </Box>
                        <Box className="card">
                            3
                        </Box>
                        <Box className="card">
                            4 
                        </Box>
                        <Box className="card">
                            5 
                        </Box>
                        <Box className="card">
                            4
                        </Box>
                        <Box className="card">
                            3 
                        </Box>
                        <Box className="card">
                            4 
                        </Box>
                        <Box className="card">
                            Gross
                        </Box>
                        <Box className="card">
                            Net
                        </Box>
                        <Box className="card">
                            Hc
                        </Box>
                        
                    </Column>
                    { gameInfo.map(( player ) => 
                    <Column>
                        <Mini>{player.net_score == gameInfo[0].net_score ? <img src={badge} alt="winners-badge" style={{width: 14, marginRight: 5}} /> : null }</Mini>
                        <Box className="hole" style={{alignItems: 'flex-start', height: 30}}>{player.player_name} </Box>
                        <Box className="hole">{player.hole1}</Box>
                        <Box className="hole">{player.hole2}</Box>
                        <Box className="hole">{player.hole3}</Box>
                        <Box className="hole">{player.hole4}</Box>
                        <Box className="hole">{player.hole5}</Box>
                        <Box className="hole">{player.hole6}</Box>
                        <Box className="hole">{player.hole7}</Box>
                        <Box className="hole">{player.hole8}</Box>
                        <Box className="hole">{player.hole9}</Box>
                        <Box className="hole">{player.net_score}</Box>
                        <Box className="hole">{player.gross_score}</Box>
                        <Box className="hole">{player.hc_score}</Box>
                    </Column>)
                    
                    }        
                </Card>
          
            </>    
            : <Card>...loading</Card>}
            
        </div>
    )
}

const Card = S.div`
    width: 375px;
    display: flex;
    border-left: 1px solid darkgrey;
    margin: 0 auto;
`

const GameData = S.div`
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 0.9rem;
    color: white;
    background: #254356c4;
`

const Dt = S.div`
    font-size: 0.6rem;
    padding-left: 3px;
    font-weight: 700;
`

const Column = S.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
`

const Hole = S.div`
    height: 40px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid darkgrey;
    border-right: 1px solid darkgrey;
`

const Box = S.div`
    height: 40px;
    width: 63.4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid darkgrey;
    border-right: 1px solid darkgrey;
`
const Mini = S.div`
    height: 10px;
    padding-top: 7px;
    width: 63.4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid darkgrey;
`

const Button = S.button`
    border: none;
    border-top: 3px solid #925347;
    width: 100%;
    height: 120px;
    font-weight: 600;
    color: white;
    font-size: 1rem;

`

const Button2 = S.button`
    border: none;
    width: 60px;
    height: 30px;
    font-weight: 600;
    color: white;
    font-size: 1rem;

`


export default GameDetails;