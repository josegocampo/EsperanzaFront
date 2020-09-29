import React, { useContext } from 'react'
import cancha from '../images/cancha.jpg'
import axios from "axios";
import {BrowserRouter as Router, Link} from 'react-router-dom'
import GameIdContext from './GameIdContext';
import S, {keyframes} from 'styled-components'
import esperanza from '../images/esperanza.png'

const Landing = () =>{
  
  const { gameId, setGameId } = useContext(GameIdContext)
  
  async function newGame () {
    try{
      let res = await axios.post(`https://hcesperanzino.herokuapp.com/games`)
      let id = res.data
      setGameId(id[0])
    }  
    catch(err){
      console.log(err)
    }
  }

  const arr = [
    {
    name: 'player 7',
    score: 33
    },
    {
      name: 'player 14',
      score: 33
      },
    ]
    
    
    
  return(
  <div className="landing">
          
    <Main>
    <Title><img src={esperanza} className="oak"/></Title>
        <Content>
            
                <Buttons>
            
                  <Link to="/newgame" style={{ textDecoration: 'none' }}>
                    <Button onClick={newGame}><div className="text">New Game</div></Button>
                  </Link>
                  <Button><div className="text">Statistics</div ></Button>
                 <Button><div className="text">Game History</div ></Button> 
                  
    
                </Buttons>  
              
        </Content>
    
    
    </Main>
  </div>

  )
}

export default Landing;

const Main = S.div` 
  height: 450px;
  width: 373px;
  `
const Content = S.div` 
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  background-image: url(${cancha});
  background-size: 373px 450px;
  background-position: 0% 100%;
  `
const Title = S.h1`
  font-size: 35px;
  font-weight: 400;
  width: 100%; 
  height: 100px;
  margin-bottom: 0px;
  margin-top: 0px;
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #edece3;
  background-position: 0 100%;
  background-size: 100% 2px;
  border-bottom: 3px solid #762417c4;
  text-align: center;
  z-index: 100;
  background-image: linear-gradient(transparent 50%,#f6f5f0 50%);
`

const Buttons = S.div`
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  margin-top: 200px;
`


const Button = S.div`
    text-decoration: none;
    border-bottom: none;
    width: 170px;
    height: 40px;
    color: white;
    font-weight: 600;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
    letter-spacing: 0.3px;
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
 
    -webkit-transition: background-color 0.5s ease-in; 
            transition: background-color 0.5s ease-in;
            -webkit-transition: color 0.5s ease-in; 
            transition: color 0.5s ease-in;
    }
  
`

// const Copy = S.div`
//     display: flex;
//     flex-direction: row;
//     width: 280px;
//     height: 40px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 12px;
  
// `