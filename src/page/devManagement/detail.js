import React, { Component } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import { Breadcrumb,Modal } from 'antd';
import axios from '../../axios';
import '../../style/common.css'
import './index.css'

var echarts = require('echarts');
export default class DevDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'devDeatail': {},
            showER:0
        };
    }
    componentWillMount(){ 
        var number=this.props.match.params.number
        this.requireData(number)
         
    }
     
    
    requireData(number){
        var that=this;
        axios.ajax({
            url:'/api/apiproduct/getterminal',
            data:{
                params:{
                    tid: number,
                    uid:2
                }
            }
        }).then((res) => {
            console.log(res)
            that.setState({
                devDeatail: res.terminalinfo
            })

        })
    }
    showER=()=>{
        this.setState({
            showER: !this.state.showER
        })
    }
    goBack=()=>{
        window.history.go(-1)
    }
    render() {
        return (
            <div className="content-box clearfix"> 
                {/* <div className="go_back"><Link to="/"> 返回上一级 </Link> </div> */}
                <Breadcrumb className="header-Breadcrumb">
                    <Breadcrumb.Item onClick={this.goBack}>设备列表</Breadcrumb.Item>
                    <Breadcrumb.Item> 设备详情</Breadcrumb.Item>
                </Breadcrumb>
                <div className="whitebg pd20 rad3 clearfix">
                    <div className="wechat wechatjs">
                        <img id="showER" onClick={this.showER} src="/assets/images/devm/wechat2.png" alt=''/>
                    </div>
                    <div className="devicedetial">

                        <div className="devicedeticell">
                            <div className="devicbtn">

                            </div>
                        </div>

                        <div className="devicedeticell">
                            <a href="货柜.html">
                                <div className="devicbtn">
                                    <img src="/assets/images/devm/devicon00.png" className="deviceicon" alt='' />
                                    <span className="devicepan">货柜管理</span>
                                </div>
                            </a>
                        </div>
                        <div className="devicedeticell">
                            <div className="deviceinfo">
                                <img src="/assets/images/devm/m02.png" className="deviceinfopic" alt=''/>
                                {this.state.devDeatail.state == 1 ?<span className="deviceinfosign dev_inline">在线</span>:''}
                                {this.state.devDeatail.state == 0 ?<span className="deviceinfosign dev_outline">离线</span>:''}
                                {this.state.devDeatail.state == 3 ?<span className="deviceinfosign dev_outline">故障</span>:''}
                                <span style={{float:'right'}} className="editicon" id="edit-name"></span>
                                <span className="deviceinfonum">设备名称：{this.state.devDeatail.name} ></span>
                        
                                <span className="deviceinfonum" title="">设备编号：{this.state.devDeatail.number}</span>
                            </div>
                        </div>

                        <div className="devicedeticell">
                            <a href="#">
                                <div className="devicbtn">
                                    <img src="/assets/images/devm/devicon03.png" className="deviceicon" alt=''/>
                                    <span className="devicepan">设置网点</span>
                                </div>
                            </a>
                        </div>
                        <div className="devicedeticell">
                            <div className="devicbtn">
                            </div>
                        </div>
                    </div> 
                    <div className="deviceitembox">
                        <dl className="pd20 deviceitem mt_20">
                            <dd>今日成交(笔/元)</dd>
                            <dt>{this.state.devDeatail.today_num}/{this.state.devDeatail.today_price}</dt>
                        </dl>
                        <dl className="pd20 deviceitem mt_20">
                            <dd>总成交(笔/元)</dd>
                            <dt>{this.state.devDeatail.all_num}/{this.state.devDeatail.all_price}</dt>
                        </dl>
                    </div>

                </div>
                <Modal title="Basic Modal" visible={this.state.showER} 
                    title="设备二维码"
                    footer={null}
                    onCancel={this.showER}
                >
                    <img src={this.state.devDeatail.code} style={{margin:'0 auto',display:'block'}} alt=""/>
                </Modal>
            </div>
        )
    }
}