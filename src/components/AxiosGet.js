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
            axios.get(this.props.searchTerm)
            .then( res => {
                const arrayOfStories = res.data.hits
                this.setState({ arrayOfStories })
                this.setState({ firstSearch: true })
            })

    }
    componentDidUpdate() {
            axios.get(this.props.searchTerm)
            .then( res => {
                const arrayOfNewStories = res.data.hits
                this.setState({ arrayOfStories: [...arrayOfNewStories] })
            })

    }

    render() {
        return (
            <div>
                <ol>{this.state.arrayOfStories.map((story, index) => {
                    return(
                        <li key={index}> {story.title}<br /><a href={story.url} target="_blank">{story.url}</a></li>
                    )
                })}</ol>
            </div>
        )
    }
}

export default AxiosGet;