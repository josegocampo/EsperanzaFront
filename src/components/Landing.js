import React, {useState} from 'react'
import cancha from '../images/cancha.jpg'
import S, {keyframes} from 'styled-components'
import {BrowserRouter as Router, Link} from 'react-router-dom'

const Landing = () =>{


return(
<div className="landing">
        
  <Main>
    <Blur> 
      <Content>
              <Title>Golf La Esperanza</Title>
              <Buttons>
          
                <Link to="/game" style={{ textDecoration: 'none' }}><Button><div className="text">Ingresar un Score</div></Button></Link>
                <Button><div className="text">Revisar Juegos pasados</div ></Button>
                <Button><div className="text">Revisar Estadisticas</div ></Button>
  
              </Buttons>  
      </Content>
    </Blur>
   
  </Main>
</div>

)
}

export default Landing;

const Main = S.div` 
    background-image: url(${cancha});
    height: 550px;
    width: 420px;
    

  `
  const breatheAnimation = keyframes`
  0% {    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.2);   }
  10% {    backdrop-filter: blur(7.2px);
    background: rgba(255, 255, 255, 0.18);   }
  20% {   backdrop-filter: blur(6.4px); 
    background: rgba(255, 255, 255, 0.16);  }
  30% {    backdrop-filter: blur(5.6px);
    background: rgba(255, 255, 255, 0.14);  }
  40% {   backdrop-filter: blur(4.8px); 
      background: rgba(255, 255, 255, 0.12);  }
  50% {    backdrop-filter: blur(4px);
      background: rgba(255, 255, 255, 0.1);  }
  60% {    backdrop-filter: blur(3.2px);
        background: rgba(255, 255, 255, 0.08);  }
  70% {   backdrop-filter: blur(2.4px); 
          background: rgba(255, 255, 255, 0.06);  }
  80% {    backdrop-filter: blur(1.6px);
          background: rgba(255, 255, 255, 0.04);  }    
  90% {   backdrop-filter: blur(0.8px); 
            background: rgba(255, 255, 255, 0.02);  }
  100% {    backdrop-filter: blur(0px);
            background: rgba(255, 255, 255, 0);  }    
  
 `
  
const Blur = S.div`
    background: rgba(255, 255, 255, 0.2); 
    backdrop-filter: blur(8px); 
    height: 100%;
    width: 100%;
    animation-name: ${breatheAnimation};
    animation-duration: 2s;
    -webkit-animation-fill-mode: forwards;
`
const Content = S.div` 
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 95%;
    justify-content: space-between;

  `

const Title = S.h1`
  font-size: 35px;
  font-weight: 600;
  color: #ff0a42;
  margin-top: 30px;

`

const Buttons = S.div`
    height: 30%;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;

`


const Button = S.div`
    text-decoration: none;
    border-bottom: none;
    width: 170px;
    height: 40px;
    background: dodgerblue;
    color: black;
    font-weight: 600;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
    letter-spacing: 0.3px;
    border: 3px solid white;

  

    &:hover {
      background-color: yellow;
      color: black;
 
    -webkit-transition: background-color 0.5s ease-in; 
            transition: background-color 0.5s ease-in;
            -webkit-transition: color 0.5s ease-in; 
            transition: color 0.5s ease-in;
    }
  
`

