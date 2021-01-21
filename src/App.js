import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import JustSearchBar from './JustSearchBar';

class App extends Component {

  constructor() {
    super()

    this.state = {
      hasSearched: false,
      arrayOfStories: [],
    }

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