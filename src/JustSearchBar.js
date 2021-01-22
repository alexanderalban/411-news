import React, { Component } from 'react';
import axios from 'axios';
import AxiosGet from './components/AxiosGet';


class JustSearchBar extends Component {
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
        let searchTerm;
        if(this.state.dropdown === "term"){
            searchTerm = `http://hn.algolia.com/api/v1/search?query=${this.state.question}&tags=story`
            this.setState({ searchState: searchTerm})
            console.log(searchTerm)    
            this.setState({searched: true})
        } else if(this.state.dropdown === "author"){
            searchTerm = `http://hn.algolia.com/api/v1/search?tags=story,author_${this.state.question}`
            this.setState({ searchState: searchTerm})
            console.log(searchTerm)    
            this.setState({searched: true})
        }
        axios.get(searchTerm)
            .then( res => {
                const arrayOfStories = res.data.hits
                this.setState({ arrayOfStories })
            })
    }

    resetPage = () => {
        console.log("click")
        this.setState({
            arrayOfStories: [],
            question: "",
            searchState: "",
            dropdown: "term",
            searched: false
        })
    }
    
    render() {
        if(!this.state.searchState && this.state.dropdown === 'term') {
            return(
                <section>
                <label>Search By:  </label>
                <select value={this.state.dropdown} onChange={this.handleDropdown}>
                    <option value="term" >Term</option>
                    <option value="author">Author</option>
                </select>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Seach by term" value={this.state.question} onChange={e=>this.handleChange(e)} />
                    <input type="submit" value="Submit" />
                </form>
                </section>
            );
        } else if(!this.state.searchState && this.state.dropdown === 'author') {
            return(
                <section>
                <label>Search By:  </label>
                <select value={this.state.dropdown} onChange={this.handleDropdown}>
                    <option value="term" >Term</option>
                    <option value="author">Author</option>
                </select>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Seach by author" value={this.state.question} onChange={e=>this.handleChange(e)} />
                    <input type="submit" value="Submit" />
                </form>
                </section>
            );
        } else if (this.state.searchState && this.state.dropdown === 'term') {
            return(
                <section>
                    <label>Search By:  </label>
                <select value={this.state.dropdown} onChange={this.handleDropdown}>
                    <option value="term">Term</option>
                    <option value="author">Author</option>
                </select>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Seach by term" value={this.state.question} onChange={e=>this.handleChange(e)} />
                        <input type="submit" value="Submit" />
                    </form>
                    <button onClick={this.resetPage}>reset</button>
                    <AxiosGet arrayOfStories={this.state.arrayOfStories} />
                </section>
            )
        } else if (this.state.searchState && this.state.dropdown === 'author') {
            return(
                <section>
                    <label>Search By:  </label>
                <select value={this.state.dropdown} onChange={this.handleDropdown}>
                    <option value="term">Term</option>
                    <option value="author">Author</option>
                </select>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Seach by author" value={this.state.question} onChange={e=>this.handleChange(e)} />
                        <input type="submit" value="Submit" />
                    </form>
                    <button onClick={this.resetPage}>reset</button>
                    <AxiosGet arrayOfStories={this.state.arrayOfStories} />
                </section>
            )
        }
    }

}

export default JustSearchBar;