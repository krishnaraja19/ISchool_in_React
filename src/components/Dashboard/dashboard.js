import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import useToken from '../App/useToken';
import AppDrawer from '../AppDrawer/AppDrawer';
import SchoolPortal from '../SchoolPortal/schoolportal';


import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: ""
  }
});

export default function Dashboard() {
  const {token,setToken} = useToken();
  const classes = useStyles();

  if(!token) {
    return <SchoolPortal setToken={setToken} />
  }

  return(
    <div className={classes.container}>
      <Router>
        <AppDrawer setToken={setToken}/>
       
      </Router>
   </div>

  );
}