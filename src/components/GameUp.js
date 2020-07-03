import React, {useState} from 'react'
import S from 'styled-components'
import data from '../mockdata'




const Game = () =>{

    const [players, setPlayers] = useState(data)

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
      
    // copiamos el array de players que seteamos en el state, sacamos el id de cada player de los mismos inputs, 
    // pasamos el score de cada hoyo y el gross score a cada jugador y lo guardamos en un array dentro del objeto 
    // de cada jugador.
    const handlePlayers = e => {
        const copyPlayers = [...players]
        const id = Number(e.target.id -1)
        let holeName = e.target.name

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


   
    //if player handicap is lower than hole handicap, allow max score of hole par +2, if player handicap is 
    //higher than hole handicap, allow max score of hole par+3

    return(
<div>
    
    <Card> 
                
            <NameRow><Hole>Hoyo</Hole><Par>Par</Par><Name>{players[0].name}</Name><Name>{players[1].name}</Name><Name>{players[2] ? players[2].name : ""}</Name><Name>{players[3] ? players[3].name : ""}</Name></NameRow>
     
        
       <Row>
          <Hole>1</Hole><Par>4</Par>
             <Box><Input  id={players[0].id}  
                    className="hole"
                    type="text"
                    onChange={e => handlePlayers(e)}
                    name="hole1"></Input>
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

export default Game