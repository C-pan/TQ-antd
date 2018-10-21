import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import Utils from '../../utils';
import { Breadcrumb, Form, Icon, Input, Row, Col, Button, Select, Modal, Radio, Tree, Transfer, Card } from 'antd';
import '../../style/common.css'
const FormItem = Form.Item;


// 权限设置模块页面
export default class Zfb extends React.Component {
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
                    <Breadcrumb.Item><Link to="/withdraw/index"> 提现记录</Link></Breadcrumb.Item>
                    <Breadcrumb.Item> <Link to="/withdraw/withdrawmode">提现方式</Link></Breadcrumb.Item>
                    <Breadcrumb.Item> 支付宝提现</Breadcrumb.Item>
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

                    <Form onSubmit={this.handleSubmit} style={{ padding: "40px 0px" }}>
                        <FormItem label="姓名"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入姓名!' }],
                                initialValue: "1822121222"
                            })(
                                <Input type="text" style={{ width: '200px' }}  />
                                )}
                        </FormItem>
                        <FormItem label="支付宝账号"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入支付宝账号!' }],
                                initialValue: "1822121222"
                            })(
                                <Input type="text" style={{ width: '200px' }}  />
                                )}
                        </FormItem>
                        <FormItem label="提现金额"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('mon', {
                                rules: [{ required: true, message: '请输入提现金额' }],
                                initialValue: ""
                            })(
                                <Input type="number" style={{ width: '200px' }} />
                                )}
                        </FormItem>
                        <FormItem label="提现密码"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                                initialValue: editBusiness ? editData.password : ""
                            })(
                                <Input type="password" style={{ width: '200px' }} placeholder="请输入密码" />
                                )}
                        </FormItem>

                        <Row>
                            <Col offset="8" span={16}><Button type="primary" >确定提现</Button></Col>
                        </Row>
                    </Form>
                    <Card style={{ width: '100%', padding: '0' }}>
                        <div class="cash_tips">
                            <p class="cash_tips_tit">提现金额到账说明：</p>
                            <p>由于提现需要相关财务处理，所以大概需要2-5个工作日现金才能到账</p>
                            <p>有疑问请联系客服 :400-1121212</p>

                        </div>
                    </Card>
                </div>
            )
        }
    })