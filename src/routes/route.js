import React from "react";
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import App from "../App";
import Comments from "../body/comments/comments";

const routes = (
    <Router basename={"/"}>
        <Switch>
            <Route exact path={"/"} render={(props)=>(<App/>)}/>
            <Route exact path={"/:id"} render={(props)=>(<Comments {...props}/>)}/>
            <Route exact path={"/comment"} render={(props)=>(<Comments {...props}/>)}/>
        </Switch>
    </Router>
)


export default routes;