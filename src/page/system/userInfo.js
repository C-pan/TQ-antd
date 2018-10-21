import React from 'react';
import ReactDOM from 'react-dom';
import axios from '../../axios';
import Utils from '../../utils';
import { Breadcrumb, Form, Icon, Input, Row,Col, Button, Select, Modal, Radio, Upload, Message } from 'antd';
import '../../style/common.css'
const FormItem = Form.Item;
var Option = Select.Option

// 上传组件代码
var imageUrl = ''
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        Message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        Message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}
var imgUrl=''




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
                    <Breadcrumb.Item> 个人信息</Breadcrumb.Item>
                </Breadcrumb>
                {/* 个人信息  */}
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
                    
                    <Form onSubmit={this.handleSubmit} className="search-box" style={{ padding:"80px 50px 180px"}}>
                             
                            <FormItem label="我的角色" 
                            {...formItemLayout}
                            >
                                {getFieldDecorator('role', {
                                    rules: [{ required: true, message: '请输入用户名!' }],
                                initialValue: "m"
                                })(
                                    <Select
                                        
                                        style={{ width: '200px' }}
                                        placeholder="状态"
                                    >
                                        <Option value="sm">超级管理员</Option>
                                        <Option value="m">管理员</Option> 
                                        <Option value="u">普通用户</Option> 
                                    </Select>
                                )}
                            </FormItem >
                            <FormItem label="用户名"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('username', {
                                rules: [{ required: false, message: '请输入用户名!' }],
                                    initialValue: "18218251812",
                                    disabel:true
                                })(
                                <Input type="text" style={{ width: '200px' }} disabel />
                                    )}
                            </FormItem>
                            <FormItem label="昵称"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输昵称!' }],
                                initialValue: "管理员admin"
                                })(
                                <Input type="text" style={{ width: '200px' }} placeholder="请输昵称" />
                                    )}
                            </FormItem>
                            <FormItem label="头像"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('avater', {
                                    rules: [{ required: true, message: '请输昵称!' }],
                                    initialValue:"管理员admin"
                                })(
                                <Upload
                                    className="avatar-uploader"

                                    name="avatar"
                                    showUploadList={false}
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {
                                       
                                        <img src="/assets/images/avatar.jpg" alt="" className="avatar-img" />  
                                    }
                                </Upload>
                                    )}
                            </FormItem>
                            <FormItem label="服务电话"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('password', {
                                    rules: [{ required: false, message: '请输入服务电话!' }],
                                    initialValue:"18218251812"
                                    })(
                                    <Input type="text" style={{ width: '200px' }} placeholder="请输入服务电话" />
                                        )}
                            </FormItem>
                            <FormItem label="邮箱"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('repassword', {
                                    rules: [{ required: false, message: '请输入邮箱!' }],
                                    initialValue: "18218251812@qq.com"
                                    })(
                                    <Input type="text" style={{ width: '200px' }} placeholder="请输入邮箱" />
                                        )}
                                </FormItem>
                                <Row>
                                    <Col offset="8" span={16}><Button type="primary" >保存</Button></Col>
                                </Row>
                        </Form>
                    
                </div>
            )
        }
    })