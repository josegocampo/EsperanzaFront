import React from 'react';
import S from 'styled-components';
import medal from '../images/medal.png';
import confeti from '../images/confeti.png';
import close from '../images/close.png'

   // I wanna extract get Winners afterwards into its own component
//or at least the return of it, I should build a new component for that
const GetWinners = ( {players, setFinished} ) => {

    const handleFinished = () => {
        setFinished(false)
    }
    const copyPlayers = players.map(p => p)
    const sortedPlayers = copyPlayers.sort((a, b) => {
        return a.net_score - b.net_score
    })
    const winners = sortedPlayers.filter((player) =>
        player.net_score === sortedPlayers[0].net_score)

    return (
        <div className="winner">
            { winners ? 
                winners.length > 1 ? 
                    <div>There is a tie between {winners.map((player) => 
                        <span> {player.player_name} | </span>)} with a net score of {winners[0].net_score}</div>
                    : <Winner>
                            <Cross><CrossBtn src={close }onClick={handleFinished}/></Cross>
                            <Confeti src={confeti}/>
                            <Name>The Winner is 
                                <span style={{
                                    borderBottom: '2px solid purple', fontWeight: 600, marginLeft: 5, marginRight: 7, color:'#731696'
                                }}>{winners[0].player_name}</span>
                                <img src={medal} style={{width: 20}}></img>
                                with a Net Score of <span  style={{
                                    borderBottom: '2px solid purple', color: 'green'}}>{winners[0].net_score}</span>
                                <p>Congratulations {winners[0].player_name}.</p>
                                <p>Your win has been added to our records.</p>
                            </Name>
                       </Winner>
                : "Loading" }
        </div>)
}

export default GetWinners;

const Winner = S.div`
    display: flex;
    flex-direction: column;
    height: 95%;
    align-items: center;
`

const Cross = S.div`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding-right: 10px;
`

const Confeti = S.img`
    width: 50px;

`

const CrossBtn = S.img`
    width: 25px;
    &:hover{
        cursor: pointer;
    }
`
const Name = S.div`
    padding: 5px;
    margin-top: 5px;
`