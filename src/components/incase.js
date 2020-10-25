import axios from "axios";
import React, { useEffect, useState, useContext } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import GameIdContext from './GameIdContext';
import PlayersDataContext from './PlayersDataContext'
import S from 'styled-components'
import data from '../mockdata'
import '../App.css'
import esperanza from '../images/esperanza.png'
import crown from '../images/crown.png'
import { findByLabelText } from "@testing-library/react";
import { holes, rows, playas} from './mockdata'



const Game = (props) => {

    const { selectedPlayers, setSelectedPlayers } = useContext(PlayersDataContext)

    const { gameId } = useContext(GameIdContext)

    const [players, setPlayers] = useState(playas)

    const [buttonClicks, setButtonClicks] = useState(false)

    const [sent, setSent] = useState(false)

    const [finished, setFinished] = useState(false)

    useEffect(() => {
        const playersCopy = [...players]
        selectedPlayers.map((player, ix) => {
            playersCopy[ix].id = player.id;
            playersCopy[ix].player_name = player.name
        })
        setPlayers(playersCopy)
    },
        [])



    const giveMeScore = (copyPlayers, id) => {
        const { holes, hcScores, netScores } = copyPlayers[id]

        const getScore = Object.values(holes).reduce((a, c) => { return Number(a) + Number(c) }, 0)
        const getHcScores = Object.values(hcScores).reduce((a, c) => { return Number(a) + Number(c) }, 0)
        const getNetScore = Object.values(netScores).reduce((a, c) => { return Number(a) + Number(c) }, 0)

        copyPlayers[id] = { ...copyPlayers[id], gross_score: getScore, hc_score: getHcScores, net_score: getNetScore }

        setPlayers(copyPlayers)
    }

    //the getHCScore function does the following:
    //if player handicap is lower than the specific hole handicap, allow max score of hole par +2, if player handicap is 
    //higher than hole handicap, allow max score of hole par +3
    const getHcScore = (player, holeIndex, score) => {
        let maxScore = 0
        let netScore = score
        if (player.handicap / 2 <= holes[holeIndex].handicap) {
            maxScore = holes[holeIndex].par + 2
        }
        else if (player.handicap / 2 > holes[holeIndex].handicap) {
            maxScore = holes[holeIndex].par + 3
        }
        if (score > maxScore) {
            netScore = maxScore
        }
        return netScore
    }

    //the getNetScore gets the score of the player for the hole after handicap deductions.
    const getNetScore = (player, holeIndex, score) => {
        let netScore = score

        if (player.handicap / 2 >= holes[holeIndex].handicap) {
            netScore = netScore - 1
        }
        return netScore
    }

    const holeMax = (player, holeIndex, score) => {
        if (getHcScore(player, holeIndex, score) < score) {
            return true
        }
    }
    //in the handlePlayer functions, we create a copy of the players array, and we modify a specific player score
    //based on the input of the score for the hole using the helper functions declared above.
    const handlePlayers = (e, holeIndex) => {
        const copyPlayers = [...players]
        const id = e.target.id
        const holeName = e.target.name

        const handicapcScore = getHcScore(copyPlayers[id], holeIndex, e.target.value)
        const netScr = getNetScore(copyPlayers[id], holeIndex, e.target.value)

        // copyPlayers[id] = { ...copyPlayers[id], 
        //     ...copyPlayers[id].holes[holeName] = e.target.value, 
        //     ...copyPlayers[id].hcScores[holeName] = handicapcScore, 
        //     ...copyPlayers[id].netScores[holeName] = netScr }

        copyPlayers[id].holes[holeName] = e.target.value
        copyPlayers[id].hcScores[holeName] = handicapcScore
        copyPlayers[id].netScores[holeName] = netScr

        setPlayers(copyPlayers)
        giveMeScore(copyPlayers, id)

    };

    const showAlert = (e) => {
        e.preventDefault()
        alert('Are you sure scores are ok?')
        setButtonClicks(+1)
    }


    async function handleSubmit(e) {
        e.preventDefault()
        const sendData = []

        players.forEach((p) => {
            if (p.player_name) {
                sendData.push(
                    {
                        player_id: p.id,
                        player_name: p.player_name,
                        holes_played: 9,
                        hc_score: p.hc_score,
                        gross_score: p.gross_score,
                        net_score: p.net_score,
                        hole1: p.holes.hole1,
                        hole2: p.holes.hole2,
                        hole3: p.holes.hole3,
                        hole4: p.holes.hole4,
                        hole5: p.holes.hole5,
                        hole6: p.holes.hole6,
                        hole7: p.holes.hole7,
                        hole8: p.holes.hole8,
                        hole9: p.holes.hole9,

                    }
                )
            }
        })
        try {
            setSent(true)
            setFinished(true)
            await axios.post(`https://hcesperanzino.herokuapp.com/games/${gameId}/gameinfo`, sendData)

            // props.history.push('/postgame')
        }
        catch (err) {
            console.log(err)
        }
    }
    // I wanna extract get Winners afterwards into its own component
    //or at least the return of it, I should build a new component for that
    const getWinners = () => {
        const sortedPlayers = players.sort((a, b) => {
            return a.net_score - b.net_score
        })
        const winners = sortedPlayers.filter((player) =>
            player.net_score === sortedPlayers[0].net_score)

        return (
            <div className="winner">
                { winners ? 
                    winners.length > 1 ? 
                        <div>There is a tie between {winners.map((player) => 
                            <span> {player.player_name}</span>)}</div>
                        : <Winner>
                                <Cross><CrossBtn onClick={handleFinished}>x</CrossBtn></Cross>
                                <Name>The Winner is 
                                    <span style={{
                                        borderBottom: '2px solid purple', fontWeight: 600, marginLeft: 5, marginRight: 7
                                    }}>{winners[0].player_name}</span>
                                    <img src={crown} style={{width: 20}}></img>
                                </Name>
                           </Winner>
                    : "Loading" }
            </div>)
    }

    const handleFinished = () => {
        setFinished(false)
    }

    return (
        <div className="bigcard">
            { finished ? <div>{getWinners()}</div> : null}
            <Card onSubmit={buttonClicks ? handleSubmit : showAlert} >
                <Title><img src={esperanza} className="oak" /></Title>
                <div style={{ borderLeft: '1px solid darkgrey' }}>
                    <NameRow>
                        <Hole className="card" style={{ height: 35 }}>Hole</Hole>
                        <Box className="card" style={{ height: 35 }} >Par</Box>
                        {players.map(p => <Box className="hole" style={{ height: 35 }} >{p.player_name}</Box>)}
                    </NameRow>
                    <Bottom>

                        {rows.map((row, rowIndex) => {
                            return <Column>
                                {holes.map((hole, holeIndex) => {
                                    if (rowIndex === 0) {
                                        return <Hole className="card">{hole.number}</Hole>
                                    }
                                    if (rowIndex === 1) {
                                        return <Box className="card">{hole.par}</Box>
                                    }
                                    else {
                                        const player = players[rowIndex - 2].holes
                                        const holeName = hole.name
                                        const playerHole = player[holeName]
                                        return <Box key={holeIndex}>
                                            <Input

                                                id={rowIndex - 2}
                                                className={holeMax(players[0], holeIndex, playerHole) ? 'hole red' : 'hole'}
                                                type="card"
                                                onChange={e => handlePlayers(e, holeIndex)}
                                                name={hole.name}
                                                value={playerHole}

                                            ></Input>
                                        </Box>
                                    }
                                })}
                            </Column>
                        })}
                    </Bottom>
                    <ScoreRow> <Hole className="card"></Hole><Box className="card">Gross</Box>{players.map(e => <Box className="hole">{e.gross_score}</Box>)}</ScoreRow>
                    <ScoreRow> <Hole className="card"></Hole><Box className="card">Net</Box>{players.map(e => <Box className="hole">{e.net_score}</Box>)}</ScoreRow>
                    <ScoreRow> <Hole className="card"></Hole><Box className="card">Hc</Box>{players.map(e => <Box className="hole">{e.hc_score}</Box>)}</ScoreRow>
                </div>
                {sent ? <Link to="/" style={{ textDecoration: 'none' }}><Button style={{background: 'lightblue', border: '2px solid blue'}}>End</Button></Link> :
                    <Button className="card" style={buttonClicks ? { background: 'rgb(15 104 44)' } : { background: 'rgb(48 178 90)' }} >Continue</Button>
                }

            </Card>
        </div>

    )

}

const Card = S.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Title = S.h1`
    font-size: 35px;
    font-weight: 400;
    width: 100%; 
    height: 100px;
    margin-top: 0;
    margin-bottom: 0;
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
    padding-bottom: 10px;
`

const Bottom = S.form`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
`

const NameRow = S.div`
    height: 35px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`
const ScoreRow = S.div`
    height: 35px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

const Column = S.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
`

const Box = S.div`
    height: 35px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid darkgrey;
    border-right: 1px solid darkgrey;
`

const Hole = S.div`
    height: 35px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid darkgrey;
    border-right: 1px solid darkgrey;
`

const Input = S.input`
    height: 35px;
    width: 30px;
    border:none;
    card-align: center;
    background: transparent;
`

const Button = S.button`
    width: 150px;
    height: 50px;
    border-radius: 5px;
    border: none;
    font-weight: 600;
    margin-top: 20px;
    color: white;
`
const Winner = S.div`
    display: flex;
    flex-direction: column;
    height: 95%;
`

const Cross = S.div`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: 7px;
    margin-left: 5px;
    font-weight: 700;
    font-size: 0.8rem;
`

const CrossBtn = S.button`
    border: none;
    width: 19px;
    height: 19px;
    background: pink;
    border-radius: 2px;
    border: 2px solid purple;
    display: flex;
    align-items: center;
    justify-content: center;

`

const Name = S.div`
    height: 95%;
    display: flex;
    align-items: center;
    justify-content: center;
`


export default Game



