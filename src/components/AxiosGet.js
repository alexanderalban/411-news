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
        axios.get(searchTerm)
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
                        <li key={index}> {story.title}{story.url}</li>
                    )
                })}</ol>
            </div>
        )
    }
}

export default AxiosGet;