import React, { Component } from 'react';
import './App.css';
import Header from "./header/header";
import Homepage from "./body/homepage/homepage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Homepage/>
      </div>
    );
  }
}

export default App;
