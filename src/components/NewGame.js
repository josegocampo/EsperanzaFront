import axios from "axios";
import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PlayersDataContext from './PlayersDataContext';
import S from 'styled-components';
import esperanza from '../images/esperanza.png'


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

    //this function will take care of removing the selected players from the dropdown
    //and add them to the display
    const handleSelect = (e) => {
        if (e.target.value === "nope") {
            return null
        }
        else {
            let copied = undefined
            playersData.map((p, i) => {
                if (p.id == e.target.value) {
                    copied = p
                }
            })
            if (!selectedPlayers.length){
                setSelectedPlayers([...selectedPlayers, copied])
            }
            else{
                let itsThere = false
                selectedPlayers.forEach(( player ) => {
                    if ( player.id === copied.id){
                        itsThere = true
                    }
                })
                if ( !itsThere ){
                    setSelectedPlayers([...selectedPlayers, copied])
                }
            }
      
        }
    }

    const handleDelete = (player) => {
        const copySelectedPlayers = [...selectedPlayers]
        copySelectedPlayers.map((p, i) => {
            if (p.id == player.id) {
                copySelectedPlayers.splice(i, 1)
            }
        })
        setSelectedPlayers(copySelectedPlayers)
    }

    async function handleSubmit(e) {
        e.preventDefault()
    }


    console.log(playersData)

    return (
        <Card onSubmit={handleSubmit}>
            <Title><img src={esperanza} className="oak" /></Title>
            <h3 className="title">SELECT THE PLAYERS</h3>
            <DropDown>
                {selectedPlayers.length >= 4 ? null :
                    <Select name="players" onChange={handleSelect} className="card" autofocus="disabled">
                        <option value="nope" selected>--</option>
                        {playersData ? playersData.map((p) =>
                            <option value={p.id} id={p.name} className="card">{p.name}</option>) :
                            <h2>Waiting for Players Data</h2>}
                    </Select>}
            </DropDown>
            <Selected>
                {selectedPlayers.map((p) => <PDisplay className="card">{p.name} <button style={{ width: 30 }}
                    onClick={() => { handleDelete(p) }}> X </button></PDisplay>)}
            </Selected>
            <Bottom>
                {selectedPlayers && selectedPlayers.length >= 2 && selectedPlayers.length < 5 ?
                    <Link to="/game" tyle={{ textDecoration: 'none' }}><Continue className="continue">Continue to Game</Continue></Link>
                    : <Warning className="hole">Please select 2 to 4 players to proceed!</Warning>}

            </Bottom>
        </Card>
    )
}

const Card = S.form`
    width: 373px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #edece3;
    height: 550px;
`
const Title = S.h1`
    font-size: 35px;
    font-weight: 400;
    width: 100%; 
    height: 100px;
    margin-top: 0;
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

const DropDown = S.div`
    width: 200px;
    height: 20px;
`
const Select = S.select`
    width: 150px;
`
const Selected = S.div`
    height: 200px;

`

const PDisplay = S.div`
    margin-top: 10px;
    width: 200px;
    text-align: center;
`

const Bottom = S.div`
    margin-bottom: 20px;
`

const Continue = S.button`
    width: 150px;
    height: 50px;
    border-radius: 5px;
    border: none;
    background: rgb(48 134 48);
    font-weight: 500;
    color: white;
`

const Warning = S.div`
    font-weight: 600;
    font-size: 1.1rem;
`

export default NewGame;