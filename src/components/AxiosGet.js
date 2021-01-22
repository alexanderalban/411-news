import React, { Component } from 'react'


const AxiosGet = (props) => {
    return (
        <div>
            <ol>{props.arrayOfStories.map((story, index) => {
                return(
                    <li key={index}> {story.title}<br /><a href={story.url} target="_blank">{story.url}</a></li>
                )
            })}</ol>
        </div>
    )
}





export default AxiosGet;