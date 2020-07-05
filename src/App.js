import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Main from "./pages/Main";
import RepositoryCard from "./components/RepositoryCard/RepositoryCard";
import "./index.css";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Main}></Route>
      <Route exact path="/:id/:id" component={RepositoryCard}></Route>
      <Route path="*" component={() => <div style={{fontSize:'30px',textAlign:"center",marginTop:'40px'}}>page not found, back to <Link to="/">Home</Link>?</div>}></Route>
    </Switch>
  );
}

export default App;
