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
        title: '产品id',
        dataIndex: 'id'
    },
    {
        title: '产品图片',
        dataIndex: 'image',
        render(img){
            return <img src={img} style={{width:'60px'}} />
        }
    },
    {
        title: '产品名称',
        dataIndex: 'name'
    },
    {
        title: '产品价格',
        dataIndex: 'price'
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
export default class Product extends React.Component {
    state = {
        visibelProduct: false,
        visibelSetPermission: false,
        visibelUserAuth: false,
        autoExpandParent: true,//自动展开tree列表
        productId: '',//选择修改的那项商品id
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
            url: '/api/apiproduct/getuall',
            data: {
                params: {
                    uid: '2',
                    page: page || '0'
                }
            }
        }).then((res) => {

            console.log(res)
            that.setState({
                dataSource: res.productinfo
            })

        })
    }

    // 分页
    selecPage = (pages, s, f) => {
        this.requestData(pages)
    }
    // 创建商品按钮
    createProduct = (type) => {
        console.log(type)
        if (type == 'edit') {
            if (this.state.productId) {
                this.setState({
                    visibelProduct: true,
                    editProduct: true
                })
            } else {
                Modal.warning({
                    title: '温馨提示',
                    content: '请先选择需要修改的商品',
                });
            }

        } else {
            this.setState({
                visibelProduct: true,
            })
        }
    }
    // 保存 创建商品
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
                editProduct: false
            });
        });

    }
    // 取消创建商品按钮
    handleCancelProduct = (e) => {
        console.log(e);
        this.setState({
            visibelProduct: false,
            editProduct: false
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
                content: '确定删除掉改商品信息吗',
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
                content: '请先选择需要删除的商品',
            });
        }

    }
    render() {

        // 配置表格单选
        const rowSelection = {
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                var seletID = selectedRows[0].id;
                this.setState({
                    productId: seletID
                })
                console.log("选择的id：" + seletID)
                // editData
                var dataSource = this.state.dataSource;

                // 获取出选中的那条数据
                for (let i = 0; i < dataSource.length; i++) {
                    if (dataSource[i].id == seletID) {
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
                    <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                </Breadcrumb>
                {/* 表单搜索 */}
                <div className="search-box">
                    <Button type="primary" onClick={this.createProduct} >创建商品</Button>
                    <Button type="primary" onClick={this.createProduct.bind(this, 'edit')} style={{ marginLeft: '20px' }}>编辑商品</Button>
                    <Button type="danger" onClick={this.DeleteProduct} style={{ marginLeft: '20px' }}>删除</Button>
                    <Input type="text" style={{ width: '150px', margin: '0 20px 0 120px' }} placeholder="请输入商品名称" />
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


                {/* 创建商品 模态框 */}
                <CreateBusinessModal
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visibelProduct}
                    onCancel={this.handleCancelProduct}
                    onCreate={this.handleCreateProduct}
                    editData={this.state.editData}
                    editProduct={this.state.editProduct}
                />

            </div>
        )
    }
}




//  创建商品 模态框
const CreateBusinessModal = Form.create()(
    class extends React.Component {

        render() {
            const { visible, onCancel, onCreate, form, editProduct, editData } = this.props;
            const { getFieldDecorator } = this.props.form;
            // 创建商品label布局
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
                        title={editProduct ? '修改商品信息' : '添加商品'}
                        centered
                        visible={visible}
                        onOk={onCreate}
                        onCancel={onCancel}
                    >
                        <Form onSubmit={this.handleSubmit} className="search-box">
                            <FormItem style={{ margin: "0 auto",textAlign:'center' }}>
                                <Upload
                                    className="avatar-uploader"
                                    
                                    name="avatar"
                                    showUploadList={false}
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {
                                        editProduct ?
                                            <img src={editData.image} alt="" className="avatar-img" /> :
                                            <Icon type="plus" className="avatar-uploader-trigger" />
                                    }
                                </Upload>
                                <div>商品图片</div>
                            </FormItem>
                            <FormItem label="商品名称"
                                {...formItemLayout}
                            >   
                                {getFieldDecorator('roleName', {
                                    rules: [{ required: true, message: '请输入商品名称!' }],
                                    initialValue: editProduct ? editData.name : ""
                                })(
                                    <Input type="text" style={{ width: '200px' }} placeholder="请输入商品名称" />
                                    )}
                                
                            </FormItem>
                            <FormItem label="价格"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入商品价格!' }],
                                    initialValue: editProduct ? editData.price : ""
                                })(
                                    <Input type="text" style={{ width: '200px' }} placeholder="请输入商品价格" />
                                    )}
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
            )
        }
    })