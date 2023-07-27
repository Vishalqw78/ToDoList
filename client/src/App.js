import React, { Fragment } from "react";
import './App.css';

//Components 

import InputTodo from "./components/inputTodo";
import ListTodos from "./components/ListTodo";

function App() {
  return (
    <Fragment>
      <div class="container">
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  )
};

export default App;