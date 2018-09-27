import React, { Component } from 'react'; 
import { HashRouter, Router, Route, Link } from "react-router-dom";
export default class Inbox extends React.Component{
    render(){
        return(
            <div>
                <h1>Topic</h1>
                <ul>
                    
                    <li>
                        <Link to="/Topic/Topica">/topic/Topica</Link>
                    </li>
                    
                </ul>
                <hr></hr>
                {this.props.children} 
            </div>
        )
    }
}