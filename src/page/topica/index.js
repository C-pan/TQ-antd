import React, { Component } from 'react'; 
import { HashRouter, Router, Route, Link } from "react-router-dom";
export default class Inbox extends React.Component{
    render(){
        return(
            <div>
                <h1>Topic A </h1>
                动态路由的值是：{this.props.match.params.id}
            </div>
        )
    }
}