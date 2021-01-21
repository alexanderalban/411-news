import React, { Component } from 'react'
import axios from 'axios';

class AxiosGet extends Component {
    constructor(props) {
        super(props)
    
        this.state={
            arrayOfStories: []
        }
    }

    componentDidMount() {
        // if(!this.state.arrayOfStories) {
        //     this.state.arrayOfStories.splice(0, this.state.arrayOfStories.length-1)
        // } 
        axios.get(this.props.searchTerm)
        .then( res => {
            const arrayOfStories = res.data.hits
            this.setState({ arrayOfStories })
        })
    }

    render() {
        return (
            <div>
                <ol>{this.state.arrayOfStories.map((story, index) => {
                    return(
                        <li key={index}> {story.title} <a href={story.url} target="_blank">{story.url}</a></li>
                    )
                })}</ol>
            </div>
        )
    }
}

export default AxiosGet;