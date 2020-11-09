import React, { useState, useContext } from 'react';
import S from 'styled-components';
import axios from 'axios';
import produce from 'immer';
import { Link } from 'react-router-dom';
import GameIdContext from './GameIdContext';
import { holeMax, getHcScore, getNetScore } from './scoreFunctions';
import { holes, rows, playas} from './mockdata';
import esperanza from '../images/esperanza.png'

const GameCard = ( {players, setPlayers, setFinished, setSelectedPlayers, selectedPlayers }) => {

    const [buttonClicks, setButtonClicks] = useState(false)

    const { gameId } = useContext(GameIdContext)

    const [sent, setSent] = useState(false)

    console.log(players)
    

    const handlePlayers = (e, holeIndex) => {

        const id = e.target.id
        const holeName = e.target.name

        const handicapcScore = getHcScore(players[id], holeIndex, e.target.value)
        const netScr = getNetScore(players[id], holeIndex, e.target.value)

        setPlayers(produce(players, draft => {
            draft[id].holes[holeName] = e.target.value
            draft[id].hcScores[holeName] = handicapcScore
            draft[id].netScores[holeName] = netScr
            giveMeScore(draft, id)
        }))
    };

    const giveMeScore = (copyPlayers, id) => {

        const { holes, hcScores, netScores } = copyPlayers[id]
    
        const getScore = Object.values(holes).reduce((a, c) => { return Number(a) + Number(c) }, 0)
        const getHcScores = Object.values(hcScores).reduce((a, c) => { return Number(a) + Number(c) }, 0)
        const getNetScore = Object.values(netScores).reduce((a, c) => { return Number(a) + Number(c) }, 0)

        copyPlayers[id].gross_score = getScore
        copyPlayers[id].hc_score = getHcScores
        copyPlayers[id].net_score = getNetScore

    }
    

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
        }
        catch (err) {
            console.log(err)
        }
    }

    const cleanState = () => {
 
        setPlayers(produce(players, draft =>{
            draft.forEach((k => draft.map((p) => p.holes[k] = '')))
        }))

        setSelectedPlayers([])

    }

    console.log(players)
 

    return (
        
       <>
         <Card onSubmit={buttonClicks ? handleSubmit : showAlert} >
            <Title><img src={esperanza} className="oak" /></Title>
          
            <div style={{ borderLeft: '1px solid darkgrey' }}>
                <NameRow>
                    <Hole className="card" style={{ height: 40 }}>Hole</Hole>
                    <Box className="card" style={{ height: 40 }} >Par</Box>
                    {players.map(p => <Box className="hole" style={{ height: 40 }} >{p.player_name}</Box>)}
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
                                    if (!players[rowIndex - 2].player_name){
                                        return <Box></Box>
                                    }
                                    //I should ptobably extract this into its own component or function
                                    else{
                                        return <Box key={holeIndex}>
                                        <Input
    
                                            id={rowIndex - 2}
                                            className={holeMax(players[0], holeIndex, playerHole) ? 'hole red' : 'hole'}
                                            type="number"
                                            onChange={e => handlePlayers(e, holeIndex)}
                                            name={hole.name}
                                            value={playerHole}
    
                                        ></Input>
                                    </Box>
                                    }
                                  
                                }
                            })}
                        </Column>
                    })}
                </Bottom>
                <ScoreRow> <Hole className="card"></Hole><Box className="card">Gross</Box>{players.map(e => <Box className="hole">{e.gross_score}</Box>)}</ScoreRow>
                <ScoreRow> <Hole className="card"></Hole><Box className="card">Net</Box>{players.map(e => <Box className="hole">{e.net_score}</Box>)}</ScoreRow>
                <ScoreRow> <Hole className="card"></Hole><Box className="card">Hc</Box>{players.map(e => <Box className="hole">{e.hc_score}</Box>)}</ScoreRow>
            </div>
            {sent ? <Link to="/" style={{ textDecoration: 'none', width: '100%' }}><Button className="text grey" onClick={cleanState}>Back to Main Screen</Button></Link> :
                <Button className={buttonClicks ? "text ready" : "text grey"}
                children={buttonClicks? "Confirm Score" : "Post Score"} />
            }
    
        </Card>
       </>
    )
}

export default GameCard;

const Card = S.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 375px;

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
    height: 40px;
    width: 63px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid darkgrey;
    border-right: 1px solid darkgrey;
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

const Input = S.input`
    height: 35px;
    width: 30px;
    border:none;
    card-align: center;
    background: transparent;
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
