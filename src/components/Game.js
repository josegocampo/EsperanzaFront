import React, {useState} from 'react'
import S from 'styled-components'
import data from '../mockdata'



const holes = [
    {name:'hole1', number:1, par: 4, handicap:7},
    {name:'hole2', number:2, par: 5, handicap:6},
    {name:'hole3', number:3, par: 4, handicap:8},
    {name:'hole4', number:4, par: 3, handicap:8},
    {name:'hole5', number:5, par: 4, handicap:2},
    {name:'hole6', number:6, par: 5, handicap:4},
    {name:'hole7', number:7, par: 4, handicap:1},
    {name:'hole8', number:8, par: 3, handicap:9},
    {name:'hole9', number:9, par: 4, handicap:3},

]

const rows = [1,2,3,4,5,6]

const playas = [
{   id: 1,
    name: "Jose",
    password: "blabla",
    handicap: 16,
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
    hcScore: {
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
    netScore: {
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
    id: 2,
    name: "Juan",
    password: "blabla",
    handicap: 15
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
    hcScore: {
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
    netScore: {
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
    id: 3,
    name: "Tisco",
    password: "blabla",
    handicap: 28
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
    hcScore: {
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
    netScore: {
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
    password: "",
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
    hcScore: {
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
    netScore: {
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

const Game = () =>{
    console.log('we are here')

    const [players, setPlayers] = useState(playas)

    console.log(players[0])

    const giveMeScore = (copyPlayers, id) => {
        let score = 0
        let hc_score = 0
        let net_score = 0
        console.log(copyPlayers)
        //aqui tomamos los players del parametro copyPlayers porque aun no llegan al state, al corren
        //primero esta funcion dentro de handleplayer
        const playerHoles = copyPlayers[id].holes
        const hcScores = copyPlayers[id].hcScore
        const netScores =  copyPlayers[id].netScore
     
        const getScores = Object.values(playerHoles)
        getScores.forEach(s => score += Number(s))

        const getHcScores = Object.values(hcScores)
        getHcScores.forEach(s => hc_score += Number(s))
        
        const getNetScore = Object.values(netScores)
        getNetScore.forEach(s => net_score += Number(s))
        
        copyPlayers[id] = {...copyPlayers[id], gross : score, hc_score: hc_score , net_score: net_score}
        setPlayers(copyPlayers)
        }
        

        const getHcScore = (player, holeIndex, score) =>{
              let maxScore = 0
              let netScore = score
              if (player.handicap /2  <= holes[holeIndex].handicap){
                     maxScore = holes[holeIndex].par + 2
              }
              else if (player.handicap /2  > holes[holeIndex].handicap) {
                     maxScore = holes[holeIndex].par + 3
              }
              if (score > maxScore){
                     netScore = maxScore
              }
              return netScore
              }

        const getNetScore = (player, holeIndex, score) =>{
            let netScore = score

            if (player.handicap / 2 >= holes[holeIndex].handicap){
                netScore = netScore - 1
            }
            return netScore
        }

       const holeMax = (player,holeIndex,score) =>{
              
              if (getHcScore(player,holeIndex,score) <  score){
              return true}
       }
          
    // copiamos el array de players que seteamos en el state, sacamos el id de cada player de los mismos inputs, 
    // pasamos el score de cada hoyo y el gross score a cada jugador y lo guardamos en un array dentro del objeto 
    // de cada jugador.
    const handlePlayers = (e, holeIndex)=> {
        const copyPlayers = [...players]
        const id = e.target.id
        const holeName = e.target.name

        const handicapcScore = getHcScore(copyPlayers[id], holeIndex, e.target.value)
        const netScr = getNetScore(copyPlayers[id], holeIndex, e.target.value)
 
        copyPlayers[id] = {...copyPlayers[id], ...copyPlayers[id].holes[holeName] = e.target.value, ...copyPlayers[id].hcScore[holeName] = handicapcScore, ...copyPlayers[id].netScore[holeName] = netScr}

        setPlayers(copyPlayers)    

        giveMeScore(copyPlayers, id)
        
        };


    // console.log(getNetScore(players[0], 'hole1', players[0].holes.hole1))
    //if player handicap is lower than hole handicap, allow max score of hole par +2, if player handicap is 
    //higher than hole handicap, allow max score of hole par+3


    return(
<div>
    <Card>
      <NameRow> <Box >A</Box><Box>X</Box>{players.map(e =><Box>{e.name}</Box>)}</NameRow>
      <Bottom>
    
              {rows.map((row, rowIndex) =>{ return <Column>
                  {holes.map((hole, holeIndex)=>{  
                      if (rowIndex === 0){
                          return <Box>{hole.number}</Box>
                      }
                      if (rowIndex === 1){
                          return <Box>{hole.par}</Box>
                      }
                      else{
                          const player = players[rowIndex-2].holes
                          const holeName = hole.name
                          const playerHole = player[holeName]
                          return <Box key={holeIndex}>
                     <Input
                           
                            id={rowIndex -2} 
                            className={ holeMax(players[0], holeIndex, playerHole) ? 'hole red' : 'hole'}
                            type="text"
                            onChange={e => handlePlayers(e, holeIndex)}
                            name={hole.name}
                            value={playerHole}
                            
                            ></Input>
                        </Box>
                      }
                  })}
                  </Column> })}
</Bottom>
                <NameRow> <Box ></Box><Box>G</Box>{players.map(e =><Box>{e.gross}</Box>)}</NameRow>
                <NameRow> <Box ></Box><Box>N</Box>{players.map(e =><Box>{e.net_score}</Box>)}</NameRow>
                <NameRow> <Box ></Box><Box>H</Box>{players.map(e =><Box>{e.hc_score}</Box>)}</NameRow>
    

    </Card>
</div>

    )

                }

const Card = S.form`
 margin-top: 100px;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
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


const Input =S.input`
height: 35px;
width: 30px;
border:none;
text-align: center; 
`

const Row = S.div`
 height: 44px;
 display: flex;
 flex-direction: row;
 justify-content: flex-start;
 align-items: center;
`

export default Game