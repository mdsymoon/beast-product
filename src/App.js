import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/HomePage/Home/Home";
import Dashboard from "./components/DashboardPage/Dashboard/Dashboard";
import LogIn from "./components/LogIn/LogIn";
import { createContext, useState } from "react";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser , setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser , setLoggedInUser]}>

    
    <Router>
      <div className="App">
        <Switch>
          <Route path="/about"></Route>
          <Route path="/Admin/Dashboard"></Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <PrivateRoute path="/Dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <Route path="/login">
          <LogIn></LogIn>
          </Route>
         
        </Switch>
      </div>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
