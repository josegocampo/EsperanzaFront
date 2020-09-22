import axios from "axios";
import React, { useEffect, useState, useContext } from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom';
import GameIdContext from './GameIdContext';
import PlayersDataContext from './PlayersDataContext'
import S from 'styled-components'
import data from '../mockdata'




const Game = ( props ) => {

    const { selectedPlayers, setSelectedPlayers } = useContext(PlayersDataContext)

    const { gameId } = useContext(GameIdContext)

    const [players, setPlayers] = useState(playas)

    const [ buttonClicks, setButtonClicks ] = useState(false)

    useEffect(() => {
        const playersCopy = [...players]
        selectedPlayers.map((player, ix) => {
        playersCopy[ix].id = player.id;
        playersCopy[ix].name = player.name
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

        copyPlayers[id] = { ...copyPlayers[id], 
            ...copyPlayers[id].holes[holeName] = e.target.value, 
            ...copyPlayers[id].hcScores[holeName] = handicapcScore, 
            ...copyPlayers[id].netScores[holeName] = netScr }

        setPlayers(copyPlayers)
        giveMeScore(copyPlayers, id)

    };

    const showAlert = (e) => {
        e.preventDefault()
        alert('Are you sure scores are ok?')
        setButtonClicks(+1)
    }
    
 
    async function handleSubmit (e){
        e.preventDefault()
        try{
            let res = await axios.post(`https://hcesperanzino.herokuapp.com/games/${gameId}`, players)
            props.history.push('/postgame')
          }  
          catch(err){
            console.log(err)
          }
    }

    console.log(buttonClicks)

    return (
        <div>
            <Card onSubmit={buttonClicks ? handleSubmit : showAlert} >
    
                <NameRow className="hole"> <Box >Hole</Box><Box>Par</Box>{players.map(p => <Box>{p.name}</Box>)}</NameRow>
                <Bottom>

                    {rows.map((row, rowIndex) => {
                        return <Column>
                            {holes.map((hole, holeIndex) => {
                                if (rowIndex === 0) {
                                    return <Box className="hole">{hole.number}</Box>
                                }
                                if (rowIndex === 1) {
                                    return <Box className="hole">{hole.par}</Box>
                                }
                                else {
                                    const player = players[rowIndex - 2].holes
                                    const holeName = hole.name
                                    const playerHole = player[holeName]
                                    return <Box key={holeIndex}>
                                        <Input

                                            id={rowIndex - 2}
                                            className={holeMax(players[0], holeIndex, playerHole) ? 'hole red' : 'hole'}
                                            type="text"
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
                <NameRow> <Box></Box><Box className="hole">Gross</Box>{players.map(e => <Box className="hole">{e.gross_score}</Box>)}</NameRow>
                <NameRow> <Box ></Box><Box className="hole">Net</Box>{players.map(e => <Box className="hole">{e.net_score}</Box>)}</NameRow>
                <NameRow> <Box ></Box><Box className="hole">Hc</Box>{players.map(e => <Box className="hole">{e.hc_score}</Box>)}</NameRow>

                <button>Continue</button>
            </Card>
        </div>

    )

}

const Card = S.form`
 margin-top: 20px;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 background: #fbfaf4;
`

const Bottom = S.form`
 display: flex;
 flex-direction: row;
 justify-content: flex-start;
 align-items: flex-start;

`

const NameRow = S.div`
 height: 44px;
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
 height: 44px;
 width: 50px;
 font-size: 11px;
 display: flex;
 align-items: center;
 justify-content: center;
 border: 1px solid black;
`


const Input = S.input`
height: 35px;
width: 30px;
border:none;
text-align: center;
background: transparent;
`

const Row = S.div`
 height: 44px;
 display: flex;
 flex-direction: row;
 justify-content: flex-start;
 align-items: center;
`


const holes = [
    { name: 'hole1', number: 1, par: 4, handicap: 7 },
    { name: 'hole2', number: 2, par: 5, handicap: 6 },
    { name: 'hole3', number: 3, par: 4, handicap: 8 },
    { name: 'hole4', number: 4, par: 3, handicap: 8 },
    { name: 'hole5', number: 5, par: 4, handicap: 2 },
    { name: 'hole6', number: 6, par: 5, handicap: 4 },
    { name: 'hole7', number: 7, par: 4, handicap: 1 },
    { name: 'hole8', number: 8, par: 3, handicap: 9 },
    { name: 'hole9', number: 9, par: 4, handicap: 3 },

]

const rows = [1, 2, 3, 4, 5, 6]

const playas = [
    {
        id: "",
        name: "",
        handicap: "",
        holes: {
            hole1: '',
            hole2: '',
            hole3: '',
            hole4: '',
            hole5: '',
            hole6: '',
            hole7: '',
            hole8: '',
            hole9: '',

        },
        hcScores: {
            hole1: '',
            hole2: '',
            hole3: '',
            hole4: '',
            hole5: '',
            hole6: '',
            hole7: '',
            hole8: '',
            hole9: '',

        },
        netScores: {
            hole1: '',
            hole2: '',
            hole3: '',
            hole4: '',
            hole5: '',
            hole6: '',
            hole7: '',
            hole8: '',
            hole9: '',

        }
    },
    {
        id: "",
        name: "",
        handicap: " "
        ,
        holes: {
            hole1: '',
            hole2: '',
            hole3: '',
            hole4: '',
            hole5: '',
            hole6: '',
            hole7: '',
            hole8: '',
            hole9: '',

        },
        hcScores: {
            hole1: '',
            hole2: '',
            hole3: '',
            hole4: '',
            hole5: '',
            hole6: '',
            hole7: '',
            hole8: '',
            hole9: '',

        },
        netScores: {
            hole1: '',
            hole2: '',
            hole3: '',
            hole4: '',
            hole5: '',
            hole6: '',
            hole7: '',
            hole8: '',
            hole9: '',

        }
    },
    {
        id: "",
        name: "",
        handicap: ""
        ,
        holes: {
            hole1: '',
            hole2: '',
            hole3: '',
            hole4: '',
            hole5: '',
            hole6: '',
            hole7: '',
            hole8: '',
            hole9: '',

        },
        hcScores: {
            hole1: '',
            hole2: '',
            hole3: '',
            hole4: '',
            hole5: '',
            hole6: '',
            hole7: '',
            hole8: '',
            hole9: '',

        },
        netScores: {
            hole1: '',
            hole2: '',
            hole3: '',
            hole4: '',
            hole5: '',
            hole6: '',
            hole7: '',
            hole8: '',
            hole9: '',

        }
    },
    {
        id: '',
        name: "",
        handicap: ''
        ,
        holes: {
            hole1: '',
            hole2: '',
            hole3: '',
            hole4: '',
            hole5: '',
            hole6: '',
            hole7: '',
            hole8: '',
            hole9: '',

        },
        hcScores: {
            hole1: '',
            hole2: '',
            hole3: '',
            hole4: '',
            hole5: '',
            hole6: '',
            hole7: '',
            hole8: '',
            hole9: '',

        },
        netScores: {
            hole1: '',
            hole2: '',
            hole3: '',
            hole4: '',
            hole5: '',
            hole6: '',
            hole7: '',
            hole8: '',
            hole9: '',

        }
    },


]

export default Game



