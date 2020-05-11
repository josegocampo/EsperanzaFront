import React, {useState} from 'react'
import S from 'styled-components'


const players = [
    {name: "player1",
    
    handicap: 16},
    {name: "Juan",
    password: "blabla",
    handicap: 15},
    {name: "Tisco",
    password: "blabla",
    handicap: 28},
    {name: "Cote",
    password: "blabla",
    handicap: 18},
    {name: "Parot",
    password: "blabla",
    handicap: 20}
]

const Game = () =>{


    const [score, setScore] = useState(players)

    console.log(score)

    const handleChanges = e => {
        setScore({
            ...score, [e.target.name]: e.target.value});
        
        };

    return(
<div>
    
    <Card> 
    
            <NameRow><Hole>Hoyo</Hole><Par>Par</Par><Name>Tisco</Name><Name>Juan</Name><Name>Cote</Name><Name>Jose</Name></NameRow>
    
           
       <Row>
          <Hole>1</Hole><Par>4</Par>
             <Box><Input  id="hole1"  
                    className="hole"
                    type="text"
                    onChange={handleChanges}
                    name="hole1"></Input>
             </Box>
    
             <Box><Input  id="hole1"  
                    className="hole"
                    type="text"
                    onChange={handleChanges}
                    name="hole1"></Input>
             </Box><Box><Input  id="hole1"  
                    className="hole"
                    type="text"
                    onChange={handleChanges}
                    name="hole1"></Input>
             </Box><Box><Input  id="hole1"  
                    className="hole"
                    type="text"
                    onChange={handleChanges}
                    name="hole1"></Input>
             </Box></Row>
    
            <Row><Hole>2</Hole><Par>5</Par><Box></Box><Box></Box><Box></Box><Box></Box></Row>
            <Row><Hole>3</Hole><Par>4</Par><Box></Box><Box></Box><Box></Box><Box></Box></Row>
            <Row><Hole>4</Hole><Par>3</Par><Box></Box><Box></Box><Box></Box><Box></Box></Row>
            <Row><Hole>5</Hole><Par>4</Par><Box></Box><Box></Box><Box></Box><Box></Box></Row>
            <Row><Hole>6</Hole><Par>5</Par><Box></Box><Box></Box><Box></Box><Box></Box></Row>
            <Row><Hole>7</Hole><Par>4</Par><Box></Box><Box></Box><Box></Box><Box></Box></Row>
            <Row><Hole>8</Hole><Par>3</Par><Box></Box><Box></Box><Box></Box><Box></Box></Row>
            <Row><Hole>9</Hole><Par>4</Par><Box></Box><Box></Box><Box></Box><Box></Box></Row>
            <Row><Hole>X</Hole><Par>T</Par><Box></Box><Box></Box><Box></Box><Box></Box></Row>
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