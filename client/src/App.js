
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import TextEditor from "./components/TextEditor";
import {v4 as uuidV4} from 'uuid'
const App = () => {
  return (
    <BrowserRouter>
    <Switch>
    <div className="app">
        <Route path="/" exact>
        <Redirect to={`/documents/${uuidV4()}`} />
        </Route>

        <Route path="/documents/:id">
          <TextEditor />
        </Route>

      </div>
    </Switch>
      
    </BrowserRouter>
  );
};

export default App;
