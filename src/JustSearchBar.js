import React, { Component } from 'react';
import axios from 'axios';
// import AxiosGet from './components/AxiosGet';

class JustSearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            arrayOfStories: [],
            question: "",
            searchState: ""
        }
    };


    
    handleChange = (event) => {
        this.setState({question: event.target.value})
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('this word that was searched was ' + this.state.question)
        let searchTerm = `http://hn.algolia.com/api/v1/search?query=${this.state.question}&tags=story`
        this.setState({ searchState: searchTerm})
        console.log(searchTerm)    
        }

    render() {
        return(
            <section>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Search
                <input type="text" value={this.state.question} onChange={e=>this.handleChange(e)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            </section>
        );
    }

}

export default JustSearchBar;