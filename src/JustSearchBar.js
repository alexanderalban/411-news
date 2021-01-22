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
            searched: false,
            currentTime: 0,
            timeState: "all",
            searchTime: 0
        }
    };

    componentDidMount() {
        let ts = new Date().getTime()/1000;
        // console.log(ts)
        this.setState({ currentTime: ts})
    }

    handleTime = (e) => {
        this.setState({
            timeState: e.target.value
        })
    }
    
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
        let newTime;
        let curTime = this.state.currentTime;
        if (this.state.timeState === "24Hours") {
            newTime = curTime - 86400
        } else if (this.state.timeState === "week") {
            newTime = curTime - 604800
        } else if (this.state.timeState === "month") {
            newTime = curTime - 2628000
        }
        this.setState({
            searchTime: newTime
        })
        console.log('this word that was searched was ' + this.state.question)
        let searchTerm;
        if(this.state.dropdown === "term" && this.state.timeState !== "all"){
            searchTerm = `http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>${newTime},created_at_i<${this.state.currentTime}&query=${this.state.question}&tags=story`
            this.setState({ searchState: searchTerm})
            console.log(searchTerm)
            this.setState({searched: true})
        } else if(this.state.dropdown === "term" && this.state.timeState === "all"){
            searchTerm = `http://hn.algolia.com/api/v1/search?query=${this.state.question}&tags=story`
            this.setState({ searchState: searchTerm})
            console.log(searchTerm)    
            this.setState({searched: true})
        } else if(this.state.dropdown === "term" && this.state.timeState !== "all"){
            searchTerm = `http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>${newTime},created_at_i<${this.state.currentTime}&tags=story,author_${this.state.question}`
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
            searched: false,
            currentTime: 0,
            timeState: "all",
            searchTime: 0
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
                <label>  Date Range:  </label>
                <select value={this.state.timeState} onChange={this.handleTime}>
                    <option value="all">All</option>
                    <option value="24Hours">24 Hours</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
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

                <label>  Date Range:  </label>
                <select value={this.state.timeState} onChange={this.handleTime}>
                    <option value="all">All</option>
                    <option value="24Hours">24 Hours</option>
                    <option value="Week">Week</option>
                    <option value="Month">Month</option>
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
                <label>  Date Range:  </label>
                <select value={this.state.timeState} onChange={this.handleTime}>
                    <option value="all">All</option>
                    <option value="24Hours">24 Hours</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
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
                <label>  Date Range:  </label>
                <select value={this.state.timeState} onChange={this.handleTime}>
                    <option value="all">All</option>
                    <option value="24Hours">24 Hours</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
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