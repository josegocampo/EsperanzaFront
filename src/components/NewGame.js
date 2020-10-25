import axios from "axios";
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import produce from 'immer';
import PlayersDataContext from './PlayersDataContext';
import S from 'styled-components';
import esperanza from '../images/esperanza.png'
import close from '../images/close.png'
import golf from '../images/golf.png'
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
        <Card onSubmit={handleSubmit}>

            <Title><Logo src={esperanza} alt="logo"/></Title>
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
                        <Cross src={close} alt="close-button" onClick={() => { handleDelete(p) }} />
                        </Player>
                        <Handicap>Hc: 15</Handicap>
                    </Row>)
                    }
            </Selected>

           
                {selectedPlayers && selectedPlayers.length >= 2 && selectedPlayers.length < 5 ?
                     <Bottom>
                        
                          <Link to="/game">
                            <TeeBall src={tbell}/>
                          </Link>
                     </Bottom>
                    : <Bottom><Tee src={tee}/></Bottom>}

    
        </Card>
    )
}

export default NewGame;

const Card = S.form`
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 550px;
`

const Title = S.h1`
    font-size: 35px;
    font-weight: 400;
    width: 100%; 
    height: 140px;
    margin-top: 0;
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
    margin-top: 30px;
`
const PlayersLine = S.div`
    display: flex;
    width: 40%;
    justify-content: center;
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
    height: 40%;
    width: 100%;
    text-align: center;
    padding-top: 20px;
`
const Logo = S.img`
    width: 100px;
    margin-top: 10px;
`

const Row = S.div`
    width: 100%;
    height: 30px;
    display: flex;
    border-bottom: 1px solid #e7e7e7;
    border-top: 1px solid #e7e7e7;
    justify-content: space-between;
    align-items: center;
`

const Handicap = S.div`
    margin-right: 2%;
    width: 25%;
`

const Player = S.div`
    font-size: 1.2rem;
    display: flex;
    width: 35%;
    justify-content: space-between;
    margin-left: 4%;
`

const Cross = S.img`
    width: 23px;
    margin-left: 5px;
`

const Bottom = S.div`
    width: 100%;
    height: 45%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 15px;
    background: #abcfff;
    color: white;
    border-top: 3px solid #191944;
`

const Continue = S.button`
    width: 190px;
    height: 60px;
    border-radius: 5px;
    border: none;
    background: #218221;
    font-weight: 500;
    color: white;
    font-size: 0.9rem;
    &:hover {
        background: green;
      }
    
`

const Tee = S.img`
    width: 80px;
    margin-bottom: 2px;
    

`


const TeeBall = S.img`
    width: 80px;
    text-decoration: none;
    margin-bottom: 0px;
    pading-bottom: 0px;
    
    &:hover {
        cursor: pointer
        ${Bottom} {
            background: green;
          }
    }
 



`

// const Warning = S.div`
//     width: 200px;
//     border: none;
//     font-weight: 500;
//     font-size: 0.9rem;
//     display: flex;
//     align-items: flex-end;
//     justify-content: center;
//     border-radius: 5px;
//     height: 100px;
// `

