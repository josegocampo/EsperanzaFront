import React from 'react';
import GameContextManager from './components/GameContextManager';
import Landing from './components/Landing';
import NewGame from './components/NewGame';
import Game from './components/Game';
import PostGameScreen from './components/PostGameScreen';
import GameHistory from './components/GameHistory';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

const App = () => {
  return (
   <div className="App">
     <BrowserRouter>
        <Route exact path ="/gamehistory" component={GameHistory} />
      <GameContextManager>
        <Route exact path ="/" component={Landing} />
        <Route exact path ="/newgame" component={NewGame} />
        <Route exact path ="/game" component={Game} />
        <Route exact path="/postgame" component={PostGameScreen} />
      </GameContextManager>
     </BrowserRouter>

     
     </div>
  )
}

export default App;
