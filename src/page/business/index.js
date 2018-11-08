import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { change_path } from '../../store/actionType'
import { change_path_fun } from '../../store/actionCotroer'
import axios from '../../axios';
import Utils from '../../utils';
import { Breadcrumb, Form, Icon, Input, Table, Button, Select, Modal, Radio, Tree, Transfer, Message } from 'antd';
import '../../style/common.css' 
const FormItem = Form.Item;
const Option = Select.Option; 

// 表格列
const columns = [
    {
        title: '商户ID',
        dataIndex: 'business_id'
    }, {
        title: '商户名称',
        dataIndex: 'business_name'
    }, {
        title: '登录账号',
        dataIndex: 'username'
    }, {
        title: '创建时间',
        dataIndex: 'create_time',
        render: Utils.formatTime
    }, {
        title: '账号状态',
        dataIndex: 'status',
        render(status) {
            if (status == 1) {
                return "启用"
            } else {
                return "停用"
            }
        }
    },{
        title: '管理权限',
        dataIndex: 'manage_auth',
        render(status) {
            if (status == 1) {
                return "超级管理员"
            } else {
                return "管理员"
            }
        }
    }, {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: Utils.formatTime
    }, {
        title: '创建人',
        dataIndex: 'creater',
    }, {
        title: '最后登录IP',
        dataIndex: 'last_login_ip',
    }, {
        title: '最后登录时间',
        dataIndex: 'last_login_tiem',
    }
];

 
// 权限设置模块页面
class Permission2 extends React.Component {
    state = {
        visibelRole: false,
        visibelSetPermission: false,
        visibelUserAuth: false,
        autoExpandParent: true,//自动展开tree列表
        businessId: '',//选择修改的那项商户id
        selecUser: '',
        editData:{}
    };
    componentWillMount = () => {
        this.requestData()
        this.props.changePath()
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

    // 分页
    selecPage = (pages, s, f) => {
        this.requestData(pages)
    }
    // 创建商户按钮
    createBusiness = (type) => {
        console.log(type)
        if(type=='edit'){
            if (this.state.businessId) {
                this.setState({
                    visibelRole: true,
                    editBusiness: true
                })
            } else {
                Modal.warning({
                    title: '温馨提示',
                    content: '请先选择需要修改的商家',
                });
            }
           
        }else{
            this.setState({
                visibelRole: true,
            })
        }
    }
    // 保存 创建商户
    handleCreateBusiness = (e) => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            this.requestData()
            form.resetFields();
            this.setState({
                visibelRole: false,
                editBusiness: false
            });
        });

    }
    // 取消创建商户按钮
    handleCancelRole = (e) => {
        console.log(e);
        this.setState({
            visibelRole: false,
            editBusiness: false
        });
    }

 
    saveFormRef = (formRef) => {
        this.formRef = formRef;

    }
    // 弹出编辑框
    DeleteBusiness = () => {
        if (this.state.businessId) {
            Modal.confirm({
                title: '温馨提示?',
                content: '确定删除掉改商家信息吗',
                onOk() {
                    return new Promise((resolve, reject) => {
                        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                    }).catch(() => console.log('Oops errors!'));
                },
                onCancel() { },
            });
        } else {
            Modal.warning({
                title: '温馨提示',
                content: '请先选择需要删除的商家',
            });
        }

    }
    render() {

        // 配置表格单选
        const rowSelection = {
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                var seletID = selectedRows[0].business_id;
                this.setState({
                    businessId: seletID
                })
                console.log("选择的id：" + seletID)
                // editData
                var dataSource=this.state.dataSource;
                
                // 获取出选中的那条数据
                for(let i=0; i < dataSource.length;i++){
                    if (dataSource[i].business_id == seletID) {
                        this.setState({
                            editData: dataSource[i]
                        })
                         
                    }
                }
                // this.state.dataSource.
            },
            // onSelect: (record, selected, selectedRows) => {
            //     console.log(record, selected, selectedRows);
            // },
            // onSelectAll: (selected, selectedRows, changeRows) => {
            //     console.log(selected, selectedRows, changeRows);
            // },

        };


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
            <div className="content-box">
                <Breadcrumb className="header-Breadcrumb">
                    <Breadcrumb.Item>商户管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 表单搜索 */}
                <div className="search-box">
                    <Button type="primary" onClick={this.createBusiness} >创建商户</Button> 
                    <Button type="primary" onClick={this.createBusiness.bind(this,'edit')} style={{ marginLeft: '20px' }}>编辑商户</Button>
                    <Button type="danger" onClick={this.DeleteBusiness} style={{ marginLeft: '20px' }}>删除</Button>
                    <Input type="text" style={{ width: '150px', margin:'0 20px 0 120px'}} placeholder="请输入商户账户" />
                    <Button type="primary">查询</Button>
                    
                </div>
                {/* 表格 */}
                <Table
                    style={{ width: '100%' }}
                    rowSelection={rowSelection}
                    size="middle"
                    columns={columns}
                    dataSource={this.state.dataSource}
                    owSelection={rowSelection}
                    pagination={{ pageSize: 10, total: 200, onChange: this.selecPage }}
                    // scroll={{ x: 1150, y: 360 }}
                    bordered
                />


                {/* 创建商户 模态框 */}
                <CreateBusinessModal
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visibelRole}
                    onCancel={this.handleCancelRole}
                    onCreate={this.handleCreateBusiness}
                    editData={this.state.editData}
                    editBusiness={this.state.editBusiness}
                />

            </div>
        )
    }
}


 

//  创建商户 模态框
const CreateBusinessModal = Form.create()(
    class extends React.Component {
        
        render() {
            const { visible, onCancel, onCreate, form, editBusiness, editData } = this.props;
            const { getFieldDecorator } = this.props.form;
            // 创建商户label布局
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
                        title={editBusiness ? '修改商户信息' :'创建商户信息'}
                        centered
                        visible={visible}
                        onOk={onCreate}
                        onCancel={onCancel}
                    >
                        <Form onSubmit={this.handleSubmit} className="search-box">
                            <FormItem label="商户名称"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('roleName', {
                                    rules: [{ required: true, message: '请输入商户名称!' }],
                                    initialValue: editBusiness ?editData.business_name:""
                                })(
                                    <Input type="text" style={{ width: '200px' }}  />
                                    )}
                            </FormItem>
                            <FormItem label="用户名"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名!' }],
                                    initialValue: editBusiness ?editData.username:""
                                })(
                                    <Input type="text" style={{ width: '200px' }}   placeholder="请输入用户名" />
                                    )}
                            </FormItem>
                            <FormItem label="登录密码"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入登录密码!' }],
                                    initialValue: editBusiness ?editData.password:""
                                })(
                                    <Input type="password" style={{ width: '200px' }}  placeholder="请输入登录密码称" />
                                    )}
                            </FormItem>
                            <FormItem label="重复登录密码"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('repassword', {
                                    rules: [{ required: true, message: '请输入重复登录密码!' }],
                                    initialValue: editBusiness ?editData.repassword:""
                                })(
                                    <Input type="password" style={{ width: '200px' }}   placeholder="请输入重复登录密码" />
                                    )}
                            </FormItem>
                            <FormItem label="电话号码"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('repassword', {
                                    rules: [{ required: true, message: '请输入电话号码!' }],
                                    initialValue: editBusiness ?editData.username:""
                                })(
                                    <Input type="text" style={{ width: '200px' }}  placeholder="请输入电话号码" />
                                    )}
                            </FormItem>
                            <FormItem label="状态"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('roleState', {
                                    initialValue: editBusiness ? 'on' :"on"
                                })(
                                    <Select 
                                        
                                        style={{ width: '200px' }}
                                        placeholder="状态"
                                    >
                                        <Option value="on">使用</Option>
                                        <Option value="off">禁用</Option>
                                    </Select>
                                    )}
                            </FormItem >
                        </Form>
                    </Modal>
                </div>
            )
        }
    })








const mapStateToProps = (state, ownProps) => ({
    navKey: state.navKey
})
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changePath() {
            dispatch(change_path_fun(ownProps.match.path))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Permission2)