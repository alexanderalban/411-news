import React, { Component } from 'react';
import './App.css';

import JustSearchBar from './JustSearchBar';

class App extends Component {

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