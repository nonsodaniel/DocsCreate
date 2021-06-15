
import React from "react";
import { BrowserRouter } from "react-router-dom";
import TextEditor from "./components/TextEditor";
const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <TextEditor />
      </div>
    </BrowserRouter>
  );
};

export default App;
