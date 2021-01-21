import React, { Component } from 'react';
import './App.css';
import AxiosGet from './components/AxiosGet'
import axios from "axios";

import JustSearchBar from './JustSearchBar';

class App extends Component {
  constructor() {
    super()

  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <JustSearchBar></JustSearchBar>
      </header>
    </div>
  );
}
}

export default App;