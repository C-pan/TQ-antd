import React, { Component } from 'react'; 
import '../../style/common.css'
import './index.less'

export default class Home extends React.Component{
    render(){
        return(
            <div className="content-box">
                <div className="container">
            		<div className="login">
                        <h1 className="login-tit"><img src="/assets/images/logo.png" alt="佰特菲智能" /></h1>
                                <input type="text" Name="Userame" placeholder="用户名" />
                                <input type="password" Name="Password" placeholder="密码" />
                            <ul className="tick">
                                <li>
                                    <input type="checkbox" id="brand1"  />
                                    <label for="brand1"><span></span>记住我</label>
                                </li>
                            </ul>
                            <div className="send-button  ">
                                <input type="submit" id="login-btn" value="登 录" />
                            </div>
                    </div>
                </div>
                <div className="footer  ">
                    <p>Copyright ©2017 EasyBox信发后台管理系统</p>
                </div>
            </div>
        )
    }
}