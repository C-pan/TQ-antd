import React from 'react';
import ReactDOM from 'react-dom';
import axios from '../../axios';
import Utils from '../../utils';
import { Breadcrumb, Form, Icon, Input, Table, Button, Select, Modal, Upload, Message } from 'antd';
import '../../style/common.css'
const FormItem = Form.Item;
const Option = Select.Option;

// 表格列
const columns = [
    {
        title: '地址id',
        dataIndex: 'outlets_id'
    },
    {
        title: '地址名称',
        dataIndex: 'outlets_name'
    },
    {
        title: '详细地址',
        dataIndex: 'addInfo'
    }
];

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



// 权限设置模块页面
export default class Address extends React.Component {
    state = {
        visibelProduct: false,
        visibelSetPermission: false,
        visibelUserAuth: false,
        autoExpandParent: true,//自动展开tree列表
        productId: '',//选择修改的那项地址id
        selecUser: '',
        editData: {}
    };
    componentWillMount = () => {
        this.requestData()
    };
    requestData(page) {
        var that = this;
        var loading = document.getElementById('ajaxLoading');
        loading.style.display = 'block';

        axios.ajax({
            url: '/api/apiproduct/outletslist',
            data: {
                params: {
                    uid: '2',
                    page: page || '0'
                }
            }
        }).then((res) => {
            for (let i = 0; i < res.outlets.length;i++){
                res.outlets[i].addInfo = res.outlets[i].province_name + res.outlets[i].city_name + res.outlets[i].area_name + res.outlets[i].outlets_address
            }
            console.log(res)
            that.setState({
                dataSource: res.outlets
            })

        })
    }

    // 分页
    selecPage = (pages, s, f) => {
        this.requestData(pages)
    }
    // 创建地址按钮
    createProduct = (type) => {
        console.log(type)
        if (type == 'edit') {
            if (this.state.productId) {
                this.setState({
                    visibelProduct: true,
                    editAddress: true
                })
            } else {
                Modal.warning({
                    title: '温馨提示',
                    content: '请先选择需要修改的地址',
                });
            }

        } else {
            this.setState({
                visibelProduct: true,
            })
        }
    }
    // 保存 创建地址
    handleCreateProduct = (e) => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            this.requestData()
            form.resetFields();
            this.setState({
                visibelProduct: false,
                editAddress: false
            });
        });

    }
    // 取消创建地址按钮
    handleCancelProduct = (e) => {
        console.log(e);
        this.setState({
            visibelProduct: false,
            editAddress: false
        });
    }


    saveFormRef = (formRef) => {
        this.formRef = formRef;

    }
    // 弹出编辑框
    DeleteProduct = () => {
        if (this.state.productId) {
            Modal.confirm({
                title: '温馨提示?',
                content: '确定删除掉改地址信息吗',
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
                content: '请先选择需要删除的地址',
            });
        }

    }
    render() {

        // 配置表格单选
        const rowSelection = {
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                var seletID = selectedRows[0].outlets_id;
                this.setState({
                    productId: seletID
                })
                console.log("选择的id：" + seletID)
                // editData
                var dataSource = this.state.dataSource;

                // 获取出选中的那条数据
                for (let i = 0; i < dataSource.length; i++) {
                    if (dataSource[i].outlets_id == seletID) {
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
                    <Breadcrumb.Item>地址管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 表单搜索 */}
                <div className="search-box">
                    <Button type="primary" onClick={this.createProduct} >创建地址</Button>
                    <Button type="primary" onClick={this.createProduct.bind(this, 'edit')} style={{ marginLeft: '20px' }}>编辑地址</Button>
                    <Button type="danger" onClick={this.DeleteProduct} style={{ marginLeft: '20px' }}>删除</Button>
                    <Input type="text" style={{ width: '150px', margin: '0 20px 0 120px' }} placeholder="请输入地址名称" />
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


                {/* 创建地址 模态框 */}
                <CreateBusinessModal
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visibelProduct}
                    onCancel={this.handleCancelProduct}
                    onCreate={this.handleCreateProduct}
                    editData={this.state.editData}
                    editAddress={this.state.editAddress}
                />

            </div>
        )
    }
}




//  创建地址 模态框
const CreateBusinessModal = Form.create()(
    class extends React.Component {

        render() {
            const { visible, onCancel, onCreate, form, editAddress, editData } = this.props;
            const { getFieldDecorator } = this.props.form;
            // 创建地址label布局
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
                        title={editAddress ? '修改地址信息' : '添加地址'}
                        centered
                        visible={visible}
                        onOk={onCreate}
                        onCancel={onCancel}
                    >
                        <Form onSubmit={this.handleSubmit} className="search-box">
                             
                            <FormItem label="地址名称"
                                {...formItemLayout}
                            >   
                                {getFieldDecorator('roleName', {
                                    rules: [{ required: true, message: '请输入地址名称!' }],
                                    initialValue: editAddress ? editData.outlets_name : ""
                                })(
                                    <Input type="text" style={{ width: '200px' }} placeholder="请输入地址名称" />
                                    )}
                                
                            </FormItem>
                            <FormItem label="详细地址"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入地址价格!' }],
                                    initialValue: editAddress ? editData.addInfo : ""
                                })(
                                    <Input type="text" style={{ width: '200px' }} placeholder="请输入地址价格" />
                                    )}
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
            )
        }
    })