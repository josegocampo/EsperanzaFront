import axios from "axios";
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import produce from 'immer';
import PlayersDataContext from './PlayersDataContext';
import S from 'styled-components';
import esperanza from '../images/esperanza.png'
import close from '../images/close.png'
import golf from '../images/golf.png'
import golfball from '../images/golfball.jpg'
import tee from '../images/tee.png'
import tbell from '../images/tbell.png'




const NewGame = () => {

    const [playersData, setPlayersData] = useState()

    const { selectedPlayers, setSelectedPlayers } = useContext(PlayersDataContext)

    useEffect(() => {
        axios.get('https://hcesperanzino.herokuapp.com/players')
            .then(response => {
                setPlayersData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
        [])

    const handleSelect = (e) => {
        const index = e.target.value
        if (index === "nope") {
            return null
        }
        else{
            setSelectedPlayers(produce(selectedPlayers, draft =>{
                let found = draft.findIndex(p => p.id == index) != -1 ? true : false
                if (!found) {
                    draft.push(playersData[playersData.findIndex(p => p.id == index)])
                }
            }))
        }
    }

    const handleDelete = (player) => {
        setSelectedPlayers(produce(selectedPlayers, draft => {
            let index = draft.findIndex(p => p.id === player.id)
            draft.splice(index, 1)
        }))
    }
    
    
    async function handleSubmit(e) {
        e.preventDefault()
    }
    console.log(selectedPlayers)


    return (
    <>
    
                <Title><Logo src={esperanza} alt="logo"/></Title>
                
            <Card onSubmit={handleSubmit}>
                <Intro className="text">PLAYER SELECTION</Intro>
    
                <DropDown>
                    {selectedPlayers.length >= 4 ? <DropDown style={{fontSize:'0.8rem'}}>4 players max!</DropDown> :
                        <Select name="players" onChange={handleSelect} className="selector" autofocus="disabled">
                            <Option2 value="nope" className="nope" selected>select 2 to 4 players...</Option2>
                            {playersData ? playersData.map((p) =>
                                <Option value={p.id} id={p.name} className="selector">{p.name}</Option>) :
                                <h2>Waiting for Players Data</h2>}
                        </Select>}
                </DropDown>
    
                <Selected>
                    {selectedPlayers.map((p, ix) => 
                        <Row className="hand-write">
                            <Player>{ix+1}. {p.name}
                            <Cross className="cross" src={close} alt="close-button" onClick={() => { handleDelete(p) }} />
                            </Player>
                            <Handicap>Hc: 15</Handicap>
                        </Row>)
                        }
                </Selected>
    
               
                    {selectedPlayers && selectedPlayers.length >= 2 && selectedPlayers.length < 5 ?
                         <Bottom2>
                            
                              <Link to="/game">
                              <Button>PLAY</Button>
                               
                              </Link>
                         </Bottom2>
                        : <Bottom/>}
    
        
            </Card>
    </>
    )
}

export default NewGame;

const Card = S.form`
    width: 375px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0px;
    justify-content: space-between;
`

const Title = S.h1`
    font-size: 35px;
    font-weight: 400;
    width: 100%; 
    height: 90px;
    margin-top: 0px;
    margin-bottom: 0px;
    color: black;
    display: flex;
    padding-bottom: 5px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #edece3;
    background-position: 0 100%;
    background-size: 100% 2px;
    border-bottom: 3px solid #762417c4;
    background-image: linear-gradient(transparent 50%,#f6f5f0 50%);
    card-align: center;
    z-index: 100;

 
`
const Intro = S.div`
    width: 70%;
    color: #262626;
    margin-bottom: 15px;
    font-size: 1.3rem;
    margin-top: 10px;
`

const DropDown = S.div`
    width: 250px;
    height: 30px;
`
const Select = S.select`
    width: 100%;
    height: 30px;
    font-size: 0.9rem;
    
`

const Option = S.option`
    color: grey;
    font-size: 0.9rem;
`

const Option2 = S.option`
    font-size: 0.9rem;
`

const Selected = S.div`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
    height: 300px;
`
const Logo = S.img`
    width: 100px;
    margin-top: 10px;
`

const Row = S.div`
    width: 100%;
    height: 50px;
    display: flex;
    border-bottom: 1px solid #e7e7e7;
    border-top: 1px solid #e7e7e7;
    justify-content: space-between;
    align-items: center;
`

const Handicap = S.div`
    margin-right: 2%;
    width: 25%;
    font-size: 1.2rem;
`

const Player = S.div`
    font-size: 1.3rem;
    display: flex;
    width: 200px;
    justify-content: space-between;
    padding-left: 10px;
   
`

const Cross = S.img`
    width: 23px;
    height: 23px;
    margin-left: 5px;
    cursor: pointer;
`

const Bottom = S.div`
    border-top: 3px solid black;
    text-decoration: none;
    width: 375px;
    height: 200px;
    color: white;
    font-weight: 600;
    font-size: 2rem;;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.3px;
    background: #38383885;

`

const Bottom2 = S.div`
    background: #8dffc7;
    border-top: 3px solid #94554a;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    width: 375px;
    justify-content: center;
`



const Button = S.div`
    text-decoration: none;
    border-bottom: none;
    width: 375px;
    height: 200px;
    color: white;
    font-weight: 700;
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    letter-spacing: 1px;
    background: #38383885;
    
    &:hover {
      background-color: #edece3;
      color: #764F17;
      background: #edece3;
      background-position: 0 100%;
      background-size: 100% 2px;
      text-align: center;
      z-index: 100;
      background-image: linear-gradient(transparent 50%,#f6f5f0 50%);
 
    -webkit-transition: background-color 0.8s ease-in; 
            transition: background-color 0.8s ease-in;
            -webkit-transition: color 0.8s ease-in; 
            transition: color 0.8s ease-in;
    }
    `
