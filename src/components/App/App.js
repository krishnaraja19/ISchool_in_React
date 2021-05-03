import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import SchoolPortal from '../SchoolPortal/schoolportal';
import Dashboard from '../Dashboard/dashboard';
import Preferences from '../Preferences/preferences';
import useToken from './useToken';


function App() {
  const {token,setToken} = useToken();
  
  if(!token) {
 
    return <SchoolPortal setToken={setToken} />
  }

  return (

    <BrowserRouter>
     <Switch>
     <Route exact path="/">
          <Dashboard setToken={setToken} />
       </Route>
     </Switch>
   </BrowserRouter>
      
      
      

  );
}

export default App;