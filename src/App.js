import React, { Component } from 'react';
import { Route,Switch } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
// import NoMatch from "./components/home/NoMatch";


class App extends Component {
  render() {
    return (
      <div>
        <div id="main_outer_cntr">
          <Switch>
            <Route path="/" exact component={Home}/>
            {/*<Route component={NoMatch} />*/}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
