import React, { Component } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import { Breadcrumb, Modal, Form, Input,notification } from 'antd';
import axios from '../../axios';
import '../../style/common.css'
import './index.css'

var FormItem = Form.Item;
var echarts = require('echarts');
export default class DevDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'devDeatail': {},
            showER:0,
            number:'',
            visibelDev:false
        };
    }
    componentWillMount(){ 
        var number=this.props.match.params.number

        this.requireData(number)
        this.setState({
            'number': number
        })
    }
     
    
    requireData(number){
        var that=this;
        axios.ajax({
            url:'/api/apiproduct/getterminal',
            data:{
                params:{
                    tid: number || this.state.number,
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
    // 修改设备名称弹框功能 

    // 修改名称按钮
    EidtNameBtn = () => {
        this.setState({
            visibelDev: true
        })
    }
    // 保存 创建角色
    handleEidtDevName = (e) => {
        const form = this.formRef.props.form;
        console.log(form)
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values.DevName);
            this.requestEidtName(values.DevName)

            this.setState({
                visibelDev: false,
            });
        });

    }
    //发送修改名称接口
    requestEidtName=(name)=>{
        var that=this;
        axios.ajax({
            url: '/api/apiproduct/mname',
            data: {
                params: {
                    'tername': name,
                    'cabnumber': this.state.devDeatail.number,
                    'uid': 2
                }
            }
        }).then((res) => {
            if(res.status==1){
                that.requireData()
                notification.success({
                    message: '温馨提示',
                    description: res.msg ||'设备名称修改成功',
                });
            }else{
                notification.error({
                    message: '温馨提示',
                    description: res.msg||'修改名称失败',
                });
            }

        })
    }
    // 取消修改名称
    handleCancelEidtDev = (e) => {
        console.log(e);
        this.setState({
            visibelDev: false,
        });
    } 
    saveFormRef = (formRef) => {
        this.formRef = formRef;

    }  
     
    render() {
        return (
            <div className="content-box clearfix"> 
                {/* <div className="go_back"><Link to="/"> 返回上一级 </Link> </div> */}
                <Breadcrumb className="header-Breadcrumb">
                    <Breadcrumb.Item><Link to="/dev/index"> 设备列表</Link></Breadcrumb.Item>
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
                            <Link to={"/dev/devdetail/container" + this.state.devDeatail.terminaltype+"/"+this.state.number}>
                                <div className="devicbtn">
                                    <img src="/assets/images/devm/devicon00.png" className="deviceicon" alt='' />
                                    <span className="devicepan">货柜管理</span>
                                </div>
                            </Link>
                        </div>
                        <div className="devicedeticell">
                            <div className="deviceinfo">
                                <img src="/assets/images/devm/m02.png" className="deviceinfopic" alt=''/>
                                {this.state.devDeatail.state == 1 ?<span className="deviceinfosign dev_inline">在线</span>:''}
                                {this.state.devDeatail.state == 0 ?<span className="deviceinfosign dev_outline">离线</span>:''}
                                {this.state.devDeatail.state == 3 ?<span className="deviceinfosign dev_outline">故障</span>:''}
                                <span style={{ float: 'right' }} className="editicon" onClick={this.EidtNameBtn} id="edit-name"></span>
                                
                            </div>
                            <span className="deviceinfonum">设备名称：{this.state.devDeatail.name}</span>
                            <span className="deviceinfonum" title="">设备编号：{this.state.devDeatail.number}</span>
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
                {/* 显示二维码 */}
                <Modal title="Basic Modal" visible={this.state.showER} 
                    title="设备二维码"
                    footer={null}
                    onCancel={this.showER}
                >
                    <img src={this.state.devDeatail.code} style={{margin:'0 auto',display:'block'}} alt=""/>
                </Modal>
                {/* 修改设备名称 */} 
                <EidtName
                    wrappedComponentRef={this.saveFormRef}
                    DevName={this.state.devDeatail.name}
                    visible={this.state.visibelDev}
                    onCancel={this.handleCancelEidtDev}
                    onCreate={this.handleEidtDevName}
                />
            </div>
        )
    }
}



//  设备名称 模态框
const EidtName = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form,DevName } = this.props;
            const { getFieldDecorator } = this.props.form;
 
            const formItemLayout = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 8 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 },
                },
            };
            return (
                <div>
                    <Modal
                        title="修改设备名称"
                        visible={visible}
                        onOk={onCreate}
                        onCancel={onCancel}
                    >
                        <Form onSubmit={this.handleSubmit} className="search-box">
                            <FormItem label="设备名称"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('DevName', {
                                    rules: [{ required: true, message: '请输入设备名称!' }],
                                    initialValue: DevName
                                })(
                                    <Input type="text" style={{ width: '200px' }} placeholder="请输入设备名称" />
                                    )}
                            </FormItem>
                             
                        </Form>
                    </Modal>
                </div>
            )
        }
    })