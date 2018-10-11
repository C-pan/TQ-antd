import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd';
import './style/common.css'
import About from './page/about'
import Topic from './page/topic'
import Topica from './page/topica'
import Home from './page/home'
import NoMatch from './page/nomatch'
import NavLeft from './components/NavLeft'
import Header from './components/Header' 
import Footer from './components/Footer' 

// 日期文字语言配置 
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default class Admin extends React.Component {
    render() {
        return (
            <div className="container">
                <Row>
                    <Col span={4} className="nav-left">
                        <NavLeft/>
                    </Col>
                    <Col offset={4} span={20}>
                        <Header/>
                        {this.props.children}
                        <Footer />
                    </Col>
                </Row>
            </div>

        )
    }
}
