import React, { Component } from 'react';
import axios from 'axios';
import AxiosGet from './components/AxiosGet';


class JustSearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            arrayOfStories: [],
            question: "",
            searchState: "",
            dropdown: "term",
            searched: false
        }
    };
    
    handleDropdown = (event) => {
        this.setState({
            dropdown: event.target.value
        });
    }
    
    handleChange = (event) => {
        this.setState({question: event.target.value})
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('this word that was searched was ' + this.state.question)
        if(this.state.dropdown === "term"){
            let searchTerm = `http://hn.algolia.com/api/v1/search?query=${this.state.question}&tags=story`
            this.setState({ searchState: searchTerm})
            console.log(searchTerm)    
            this.setState({searched: true})
        } else if(this.state.dropdown === "author"){
            let searchTerm = `http://hn.algolia.com/api/v1/search?tags=story,author_${this.state.question}`
            this.setState({ searchState: searchTerm})
            console.log(searchTerm)    
            this.setState({searched: true})
        }
    }
    
    render() {
        if(!this.state.searched) {
            return(
                <section>
                <label>Search By:  </label>
                <select value={this.state.dropdown} onChange={this.handleDropdown}>
                    <option value="term" >Term</option>
                    <option value="author">Author</option>
                </select>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.question} onChange={e=>this.handleChange(e)} />
                    <input type="submit" value="Submit" />
                </form>
                </section>
            );
        } else {
            return(
                <section>
                    <label>Search By:  </label>
                <select>
                    <option value="term">Term</option>
                    <option value="author">Author</option>
                </select>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.question} onChange={e=>this.handleChange(e)} />
                        <input type="submit" value="Submit" />
                    </form>
                    <AxiosGet searchTerm={this.state.searchState}/>
                </section>
            )
        }
    }

}

export default JustSearchBar;