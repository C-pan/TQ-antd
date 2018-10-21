import React from 'react';
import ReactDOM from 'react-dom';
import axios from '../../axios';
import Utils from '../../utils';
import { Breadcrumb, Form, Icon, Input, Row,Col, Button, Select, Modal, Radio, Tree, Transfer, Message } from 'antd';
import '../../style/common.css'
const FormItem = Form.Item;
 

// 权限设置模块页面
export default class Permission2 extends React.Component {
    state = {
       
    };
    componentWillMount = () => {
        
    };
    requestData(page) {
        var that = this;
        var loading = document.getElementById('ajaxLoading');
        loading.style.display = 'block';

        axios.ajax({
            url: '/business/list',
            mock: 1,
            data: {
                params: {
                    uid: '2',
                    page: page || '1'
                }
            }
        }).then((res) => {

            console.log(res)
            that.setState({
                dataSource: res.result.item_list
            })

        })
    }

     
 
    render() {
        return (
            <div className="content-box"> 
                <Breadcrumb className="header-Breadcrumb">
                    <Breadcrumb.Item> 修改密码</Breadcrumb.Item>
                </Breadcrumb>
                {/* 创建密码  */}
                <CreateBusinessModal
                    wrappedComponentRef={this.saveFormRef}
                    visible={true}
                    onCancel={this.handleCancelRole}
                    onCreate={this.handleCreateBusiness}
                    editData={this.state.editData}
                    editBusiness={this.state.editBusiness}
                />

            </div>
        )
    }
}

//  创建密码 模态框
const CreateBusinessModal = Form.create()(
    class extends React.Component {

        render() {
            const { visible, onCancel, onCreate, form, editBusiness, editData } = this.props;
            const { getFieldDecorator } = this.props.form;
            // 创建密码label布局
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
                    
                    <Form onSubmit={this.handleSubmit}  style={{ padding:"80px 0px 120px 0"}}>                             
                            <FormItem label="用户名"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名!' }],
                                    initialValue: "1822121222"
                                })(
                                    <Input type="text" style={{ width: '200px' }} disable />
                                    )}
                            </FormItem>
                            <FormItem label="旧密码"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入旧密码!' }],
                                    initialValue: editBusiness ? editData.password : ""
                                })(
                                <Input type="password" style={{ width: '200px' }} placeholder="请输入旧密码" />
                                    )}
                            </FormItem>
                            <FormItem label="新密码"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入新密码!' }],
                                    initialValue: editBusiness ? editData.password : ""
                                })(
                                <Input type="password" style={{ width: '200px' }} placeholder="请输入新密码" />
                                    )}
                            </FormItem>
                            <FormItem label="确认新密码"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('repassword', {
                                    rules: [{ required: true, message: '请再次新密码!' }],
                                    initialValue: editBusiness ? editData.repassword : ""
                                })(
                                <Input type="password" style={{ width: '200px' }} placeholder="请再次新密码" />
                                    )}
                            </FormItem>
                            <Row>
                                <Col offset="8" span={16}><Button type="primary" >保存修改</Button></Col>
                            </Row>
                        </Form>
                    
                </div>
            )
        }
    })