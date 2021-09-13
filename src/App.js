import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/HomePage/Home/Home";
import Dashboard from "./components/DashboardPage/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/about"></Route>
          <Route path="/Admin/Dashboard"></Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/Dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route path="/checkout/:id"></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
