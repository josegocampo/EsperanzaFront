import React, {useState} from 'react'
import S from 'styled-components'


const Game = () =>{

    return(
<Card>
        <NameRow><Name>Hoyo</Name><Box>1</Box><Box>2</Box><Box>3</Box><Box>4</Box><Box>5</Box><Box>6</Box><Box>7</Box><Box>8</Box><Box>9</Box><Box></Box></NameRow>
        <NameRow><Name>Par</Name><Box>4</Box><Box>5</Box><Box>4</Box><Box>3</Box><Box>4</Box><Box>5</Box><Box>4</Box><Box>3</Box><Box>4</Box><Box></Box></NameRow>
        <Row><Name>Tisco</Name><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box></Row>
        <Row><Name>Juan</Name><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box></Row>
        <Row><Name>Cote</Name><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box></Row>
        <Row><Name>Jose</Name><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box></Row>

        
</Card>

    )
}


const Card = S.div`
 background: wheat;
 height: 550px;
 width: 420px;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
`
const NameRow = S.div`
 height: 40px;
 width: 420px;
 display: flex;
 flex-direction: row;
 border: 1px solid red;
 justify-content: flex-end;
 align-items: center;
`
const Row = S.div`
 height: 40px;
 width: 420px;
 display: flex;
 flex-direction: row;
 border: 1px solid red;
 justify-content: flex-end;
 align-items: center;
`

const Name = S.div`
 height: 35px;
 width: 35px;
 font-size: 11px;
 display: flex;
 align-items: center;
 justify-content: center;
`

const Box = S.div`
 height: 35px;
 width: 35px;
 border: 1px solid grey;
 font-size: 11px;
 display: flex;
 align-items: center;
 justify-content: center;
`

export default Game