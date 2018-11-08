import React, { Component } from 'react';  
import { HashRouter, Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux'; 
import { change_path } from '../../store/actionType'
import { change_path_fun} from '../../store/actionCotroer'
import '../../style/common.css'
class About extends React.Component{
    componentDidMount = () => { 
      console.log("打印props")
        console.log(this.props.match.path)
        this.props.changePath()
    }

    render(){
        const { changePath } = this.props
        return(
            <div className="content-box">
                <h1>about  navKey  =>{this.props.navKey}  </h1> 
                <div onClick={changePath}>点击修改</div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps)=>({
    navKey:state.navKey
})
const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        changePath(){ 
            dispatch(change_path_fun(ownProps.match.path))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(About)