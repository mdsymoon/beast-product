import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";

import Admin from "./components/Admin/Admin";
import Dashboard from "./components/Dashboard/Dashboard";

import Header from "./components/Header/Header";
import AddProduct from "./components/Addproduct/AddProduct";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/about"></Route>
          <Route path="/Admin/Dashboard">
            <Admin></Admin>
          </Route>
          <Route exact path="/home">
            <Header></Header>
            <HomePage></HomePage>
          </Route>
          <Route path="/Admin/AddProduct">
          <Admin></Admin>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
