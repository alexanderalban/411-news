import React, { Component } from 'react';
import axios from 'axios';
import AxiosGet from './components/AxiosGet';


class JustSearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            arrayOfStories: [
                {
                id: 1,
                created_at: "2006-10-09T18:21:51.000Z",
                author: "pg",
                title: "Y Combinator",
                url: "http://ycombinator.com",
                text: null,
                points: 57,
                parent_id: null,
                children: 
                [
                {
                id: 15,
                created_at: "2006-10-09T19:51:01.000Z",
                author: "sama",
                text: "&#34;the rising star of venture capital&#34; -unknown VC eating lunch on SHR",
                points: 5,
                parent_id: 1,
                children: 
                [
                {
                id: 17,
                created_at: "2006-10-09T19:52:45.000Z",
                author: "pg",
                text: "Is there anywhere to eat on Sandhill Road?",
                points: 5,
                parent_id: 15,
                children: [ ]
                }
                ]
                }
                ]
                },
                {
                    id: 2,
                    created_at: "2006-10-09T18:21:51.000Z",
                    author: "pg",
                    title: "Y Combinator",
                    url: "http://ycombinator.com",
                    text: null,
                    points: 57,
                    parent_id: null,
                    children: 
                    [
                    {
                    id: 15,
                    created_at: "2006-10-09T19:51:01.000Z",
                    author: "sama",
                    text: "&#34;the rising star of venture capital&#34; -unknown VC eating lunch on SHR",
                    points: 5,
                    parent_id: 1,
                    children: 
                    [
                    {
                    id: 17,
                    created_at: "2006-10-09T19:52:45.000Z",
                    author: "pg",
                    text: "Is there anywhere to eat on Sandhill Road?",
                    points: 5,
                    parent_id: 15,
                    children: [ ]
                    }
                    ]
                    }
                    ]
                    },
                    {
                        id: 3,
                        created_at: "2006-10-09T18:21:51.000Z",
                        author: "pg",
                        title: "Y Combinator",
                        url: "http://ycombinator.com",
                        text: null,
                        points: 57,
                        parent_id: null,
                        children: 
                        [
                        {
                        id: 15,
                        created_at: "2006-10-09T19:51:01.000Z",
                        author: "sama",
                        text: "&#34;the rising star of venture capital&#34; -unknown VC eating lunch on SHR",
                        points: 5,
                        parent_id: 1,
                        children: 
                        [
                        {
                        id: 17,
                        created_at: "2006-10-09T19:52:45.000Z",
                        author: "pg",
                        text: "Is there anywhere to eat on Sandhill Road?",
                        points: 5,
                        parent_id: 15,
                        children: [ ]
                        }
                        ]
                        }
                        ]
                        },
            ],
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
                // this.setState({ arrayOfStories })
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