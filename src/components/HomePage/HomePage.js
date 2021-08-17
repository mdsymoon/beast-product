import { Button } from "@material-ui/core";
import React from "react";

import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      
      <div className="search-field">
        <input type="text" className="search-input" disabled></input>
        <Button id="search-button" disabled>
          SEARCH
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
