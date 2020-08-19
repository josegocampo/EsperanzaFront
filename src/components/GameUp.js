import React, {useState} from 'react'
import S from 'styled-components'
import data from '../mockdata'
import '../App.css'

const holeHandicap = {
       hole1: 7,
       hole2: 6,
       hole3: 8,
       hole4: 5,
       hole5: 2,
       hole6: 4,
       hole7: 1,
       hole8: 9,
       hole9: 3,
}

const holeScore = {
       hole1: 4,
       hole2: 5,
       hole3: 4,
       hole4: 3,
       hole5: 4,
       hole6: 5,
       hole7: 4,
       hole8: 3,
       hole9: 4,
}

const holes = [
       {hole1:{par: 4, handicap:7}},
       {hole2:{par: 5, handicap:6}},
       {hole3:{par: 4, handicap:8}},
       {hole4:{par: 3, handicap:8}},
       {hole5:{par: 4, handicap:2}},
       {hole6:{par: 5, handicap:4}},
       {hole7:{par: 4, handicap:1}},
       {hole8:{par: 3, handicap:9}},
       {hole9:{par: 4, handicap:3}},
]

console.log(holes[0].hole1)
const long = 6

const GameUp = () =>{

    const [players, setPlayers] = useState(data)

    

    console.log(players[0].holes.hole1)

     //esta funcion se usa para ir actualizando el score de cada jugador en este partido en la parte
    //de abajo de la pantalla.
    const giveMeScore = (id, cP) => {
        let score = 0
        //aqui tomamos los players del parametro cP porque aun no llegan al state, al corren
        //primero esta funcion dentro de handleplayer
        const playerHoles = cP[id].holes
     
        if(playerHoles && Object.keys(playerHoles).length === 0){
            const getScores = Object.values(playerHoles)
            return score += getScores
        }
       
        if(playerHoles && Object.keys(playerHoles).length >= 1){
            const getScores = Object.values(playerHoles)
            getScores.forEach(s => score += Number(s))
        }
        cP[id] = {...cP[id], gross : score }
        setPlayers(cP)
        }

        const getNetScore = (player, hole, score) =>{
              let maxScore = 0
              let netScore = score
              if (player.handicap /2  <= holeHandicap[hole]){
                     maxScore = holeScore[hole] + 2
              }
              else if (player.handicap /2  > holeHandicap[hole]) {
                     maxScore = holeScore[hole] + 3
              }
              if (score > maxScore){
                     netScore = maxScore
              }
              return netScore
              }

       const holeMax = (player,hole,score) =>{
              
              if (getNetScore(player,hole,score) <  score){
              return true}
       }
          
    // copiamos el array de players que seteamos en el state, sacamos el id de cada player de los mismos inputs, 
    // pasamos el score de cada hoyo y el gross score a cada jugador y lo guardamos en un array dentro del objeto 
    // de cada jugador.
    const handlePlayers = (e)=> {
        const copyPlayers = [...players]
        const id = Number(e.target.id -1)
        let holeName = e.target.name
        const player = copyPlayers[id]
        const score = e.target.value
        if(!copyPlayers[id].holes){
            copyPlayers[id] = {...copyPlayers[id], holes: {[holeName] : e.target.value}}
            setPlayers(copyPlayers)
            giveMeScore(id, copyPlayers)
        }
        else{
            copyPlayers[id] = {...copyPlayers[id], ...copyPlayers[id].holes[holeName] = e.target.value}
            setPlayers(copyPlayers)    
            giveMeScore(id, copyPlayers)
        }
        };


    console.log(getNetScore(players[0], 'hole1', players[0].holes.hole1))
    //if player handicap is lower than hole handicap, allow max score of hole par +2, if player handicap is 
    //higher than hole handicap, allow max score of hole par+3

    return(
<div>
    
    <Card> 
                
            <NameRow><Hole>Hoyo</Hole><Par>Par</Par><Name>{players[0].name}</Name><Name>{players[1].name}</Name><Name>{players[2] ? players[2].name : ""}</Name><Name>{players[3] ? players[3].name : ""}</Name></NameRow>
     
        
       <Row>
          <Hole>1</Hole><Par>4</Par>
             <Box><Input  id={players[0].id}  
                     className={ holeMax(players[0], 'hole1', players[0].holes.hole1) ? 'hole red' : 'hole'}
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole1"
                    value={players[0].holes.hole1 }
                   ></Input>
             </Box>
    
             <Box><Input  id={players[1].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole1"></Input>
             </Box>
             <Box><Input  id={players[2] ? players[2].id : "guest1"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole1"></Input>
             </Box>
             <Box><Input  id={players[3] ? players[3].id : "guest2"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole1"></Input>
             </Box>
             </Row>
    
            <Row><Hole>2</Hole><Par>5</Par>
            <Box><Input  id={players[0].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole2"></Input>
             </Box>
    
             <Box><Input  id={players[1].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole2"></Input>
             </Box>
             <Box><Input  id={players[2] ? players[2].id : "guest1"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole2"></Input>
             </Box>
             <Box><Input  id={players[3] ? players[3].id : "guest2"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole2"></Input>
             </Box>
             </Row>


            <Row><Hole>3</Hole><Par>4</Par>
            <Box><Input  id={players[0].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole3"></Input>
             </Box>
    
             <Box><Input  id={players[1].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole3"></Input>
             </Box>
             <Box><Input  id={players[2] ? players[2].id : "guest1"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole3"></Input>
             </Box>
             <Box><Input  id={players[3] ? players[3].id : "guest2"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole3"></Input>
             </Box>
             </Row>

            <Row><Hole>4</Hole><Par>3</Par>
            <Box><Input  id={players[0].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole4"></Input>
             </Box>
    
             <Box><Input  id={players[1].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole4"></Input>
             </Box>
             <Box><Input  id={players[2] ? players[2].id : "guest1"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole4"></Input>
             </Box>
             <Box><Input  id={players[3] ? players[3].id : "guest2"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole4"></Input>
             </Box>
             </Row>

            <Row><Hole>5</Hole><Par>4</Par>
            <Box><Input  id={players[0].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole5"></Input>
             </Box>
    
             <Box><Input  id={players[1].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole5"></Input>
             </Box>
             <Box><Input  id={players[2] ? players[2].id : "guest1"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole5"></Input>
             </Box>
             <Box><Input  id={players[3] ? players[3].id : "guest2"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole5"></Input>
             </Box>
             </Row>

            <Row><Hole>6</Hole><Par>5</Par>
            <Box><Input  id={players[0].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole6"></Input>
             </Box>
    
             <Box><Input  id={players[1].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole6"></Input>
             </Box>
             <Box><Input  id={players[2] ? players[2].id : "guest1"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole6"></Input>
             </Box>
             <Box><Input  id={players[3] ? players[3].id : "guest2"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole6"></Input>
             </Box>
             </Row>

            <Row><Hole>7</Hole><Par>4</Par>
            <Box><Input  id={players[0].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole7"></Input>
             </Box>
    
             <Box><Input  id={players[1].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole7"></Input>
             </Box>
             <Box><Input  id={players[2] ? players[2].id : "guest1"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole7"></Input>
             </Box>
             <Box><Input  id={players[3] ? players[3].id : "guest2"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole7"></Input>
             </Box>
             </Row>

            <Row><Hole>8</Hole><Par>3</Par>
                <Box><Input  id={players[0].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole8"></Input>
             </Box>
    
             <Box><Input  id={players[1].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole8"></Input>
             </Box>
             <Box><Input  id={players[2] ? players[2].id : "guest1"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole8"></Input>
             </Box>
             <Box><Input  id={players[3] ? players[3].id : "guest2"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole8"></Input>
             </Box>
             </Row>

            <Row><Hole>9</Hole><Par>4</Par>
            <Box><Input  id={players[0].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole9"></Input>
             </Box>
    
             <Box><Input  id={players[1].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole9"></Input>
             </Box>
             <Box><Input  id={players[2] ? players[2].id : "guest1"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole9"></Input>
             </Box>
             <Box><Input  id={players[3] ? players[3].id : "guest2"}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole9"></Input>
             </Box>
             </Row>

            <Row><Hole>X</Hole><Par>G</Par><Box></Box><Box></Box><Box></Box><Box></Box></Row>
            <Row><Hole>X</Hole><Par>H</Par><Box>{players[0].gross}</Box><Box>{players[1].gross}</Box><Box>{players[2].gross}</Box><Box></Box></Row>
            <Row><Hole>X</Hole><Par>N</Par><Box></Box><Box></Box><Box></Box><Box></Box></Row>
    </Card>
    </div>
        )

}




const Card = S.form`
margin-top: 100px;
 height: 530px;
 width: 373px;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
`


const NameRow = S.div`
 height: 44px;
 width: 280px;
 display: flex;
 flex-direction: row;
 border: 1px solid black;
 justify-content: flex-start;
 align-items: center;
 
`
const Row = S.div`
 height: 44px;
 width: 280px;
 display: flex;
 flex-direction: row;
 border: 1px solid black;
 justify-content: flex-start;
 align-items: center;
`

const Hole = S.div`
 height: 44px;
 width: 37px;
 font-size: 11px;
 display: flex;
 align-items: center;
 justify-content: center;
 border-right: 1px solid grey;
`


const Par = S.div`
 height: 44px;
 width: 50px;
 font-size: 11px;
 display: flex;
 align-items: center;
 justify-content: center;
 border-right: 1px solid grey;
`

const Name = S.div`
 height: 44px;
 width: 50px;
 font-size: 11px;
 display: flex;
 align-items: center;
 justify-content: center;
 border-right: 1px solid grey;
 color: grey;
`

const Input =S.input`
    height: 30px;
    width: 30px;
    border:none;
    text-align: center;
   
`

const Box = S.div`
 height: 44px;
 width: 50px;
 border-right: 1px solid grey;
 font-size: 11px;
 display: flex;
 align-items: center;
 justify-content: center;
`

export default GameUp