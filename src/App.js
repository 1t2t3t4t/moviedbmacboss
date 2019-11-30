import React from 'react';
import Home from './components/Home';
import Detail from './components/Detail';
import {Switch,Route} from "react-router-dom";
function App() {
  
  return (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/movie/:id' component={Detail}/>
    </Switch>
  );
}

export default App;
