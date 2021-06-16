
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import TextEditor from "./components/TextEditor";
import {v4 as uuidV4} from 'uuid'
const App = () => {
  return (

 
          <BrowserRouter>
    <Switch>
        <Route path="/" exact>
        <Redirect to={`/document/${uuidV4()}`} />
        </Route>

        <Route path="/document/:id">
          <TextEditor />
        </Route>
    </Switch>
      
    </BrowserRouter>
  );
};

export default App;
