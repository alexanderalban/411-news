import React, { Component } from 'react';
import './App.css';
import AxiosGet from './components/AxiosGet'
import axios from "axios";

class App extends Component {
  constructor() {
    super()

    this.state={
      arrayOfBeer: []
    }
  }

  componentDidMount() {
    axios.get('http://hn.algolia.com/api/v1/items/3')
      .then( res => {
        const arrayOfBeerRes = res.data
        this.setState({ arrayOfBeer: [arrayOfBeerRes] })
        console.log(" state array: ", this.state.arrayOfBeer)
      })
  }

  render() {
      return (
        <div className="App">
        <header className="App-header">
          <AxiosGet />
        </header>
      </div>
      )
  }



}

export default App;