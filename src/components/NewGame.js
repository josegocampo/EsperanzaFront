import axios from "axios";
import React, { useEffect, useState, useContext } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import PlayersDataContext from './PlayersDataContext';
import S from 'styled-components';

const NewGame = () =>{

    
    const [ playersData, setPlayersData ] = useState()

    const { selectedPlayers, setSelectedPlayers } = useContext(PlayersDataContext)

    useEffect(() => {
        axios.get('https://hcesperanzino.herokuapp.com/players')
        .then(response =>  {
            setPlayersData(response.data)
            })
        .catch(error => {console.log(error)
            })
        }, 
        [])

    //this function will take care of removing the selected players from the dropdown
    //and add them to the display
    const handleSelect = (e) => {
        const copyPd = [...playersData]
        let removed = undefined
        copyPd.map((p, i) => {
            if (p.id == e.target.value){
              removed = copyPd.splice(i,1) 
            }
        })
        setPlayersData(copyPd)
        setSelectedPlayers([...selectedPlayers, removed[0]])
    }
    //this function will take care of removing players from the display and adding them
    //back to the dropdown
    const handleChange = (player) =>{
        const copySelectedPlayers = [...selectedPlayers]
        let removed = undefined
        copySelectedPlayers.map((p,i) =>{
            if (p.id == player.id){
                removed = copySelectedPlayers.splice(i,1) 
              }
        })
        setSelectedPlayers(copySelectedPlayers)
        setPlayersData([...playersData, removed[0]])
    }

    async function handleSubmit(e){
        e.preventDefault()
    }
    

    console.log(playersData)
  
    return (
        <Card onSubmit={handleSubmit}>
            <h2 className="hole">SELECT THE PLAYERS</h2>
            <Select name="players" onChange={handleSelect} className="title">
                {playersData ? playersData.map((p) => <option value={p.id} id={p.name} className="title">{p.name}</option>) : <h2>Waiting for Players Data</h2>}
            </Select>
            {selectedPlayers ? selectedPlayers.map((p) => <PDisplay className="title">{p.name} <button style={{width:30}} onClick={() => {handleChange(p)}}>X</button></PDisplay>) : null}
            {selectedPlayers && selectedPlayers.length >=2 && selectedPlayers.length < 5  ? 
            <Link to ="/game" tyle={{ textDecoration: 'none' }}><Continue className="continue">Continue to Game</Continue></Link> : <Warning className="hole">Please select 2 to 4 players to proceed!</Warning>}

        </Card>
    )
}

const Card = S.form`
    margin-top: 20px;   
    width: 373px;
    height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #edece3;

`
const Select = S.select`
    width: 200px;
`
const PDisplay = S.div`
    margin-top: 20px;
`
const Continue = S.button`
    width: 150px;
    height: 50px;
    border-radius: 5px;
    border: none;
    background: #7aa9e5;
    font-weight: 500;
    margin-top: 30px;
` 

const Warning = S.div`
    margin-top: 80px;
    width: 150px;
    height: 80px;
    color: #762417c4;
`

export default NewGame;