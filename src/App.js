import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./components/HomePage/Home/Home";
import Dashboard from "./components/DashboardPage/Dashboard/Dashboard";
import LogIn from "./components/LogIn/LogIn";
import { createContext, useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ConfirmForm from "./components/ConfirmForm/ConfirmForm";
import { useEffect } from "react";


export const UserContext = createContext();
export const SelectContext = createContext();
export const AllProducts = createContext();
export const LoaderContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [selectProduct, setSelectProduct] = useState({});
  const [products, setProducts] = useState([]);

  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    fetch(`https://enigmatic-spire-83470.herokuapp.com/allProduct`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoadData(true);
      });
  }, []);

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <SelectContext.Provider value={[selectProduct, setSelectProduct]}>
        <AllProducts.Provider value={[products, setProducts]}>
          <LoaderContext.Provider value={[loadData, setLoadData]}>
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
                  <PrivateRoute path="/confirmForm">
                    <ConfirmForm></ConfirmForm>
                  </PrivateRoute>
                </Switch>
              </div>
            </Router>
          </LoaderContext.Provider>
        </AllProducts.Provider>
      </SelectContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
