import React from 'react'
import Landing from './components/Landing'
import Game from './components/Game'
import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'

const App = () => {
  return (
   <div className="App">
     <BrowserRouter>
      <Route exact path ="/" component={Landing} />
      <Route exact path ="/game" component={Game} />
     </BrowserRouter>

     
     </div>
  )
}

export default App;
