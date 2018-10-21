import React from 'react';
import ReactDOM from 'react-dom';
import axios from '../../axios';
import Utils from '../../utils';
import { Breadcrumb, Form, Icon, Input, Table, Button, Select, Modal, Radio, Tree, Transfer, Message } from 'antd';
import '../../style/common.css'
import menuConfig from '../../config/menuConfig';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;


const columns = [
    {
        title: '商家ID',
        dataIndex: 'business_id'
    }, {
        title: '姓名',
        dataIndex: 'business_name'
    }, {
        title: '身份证号码',
        dataIndex: 'card_id',
        render: Utils.formatTime
    }, {
        title: '审核状态',
        dataIndex: 'status',
        render(status) {
            if (status == 1) {
                return "通过"
            } else if (status == 2) {
                return "审核失败"
            } else if (status == 3) {
                return "待审核"
            }
        }
    }, {
        title: '身份证正面照',
        dataIndex: 'card_front',
        render(img) {
            return <img style={{width:'150px',height:'150px'}} src={img} alt=""/>
        }
    }, {
        title: '身份证正面照',
        dataIndex: 'card_side',
        render(img) {
            return <img style={{ width: '150px', height: '150px' }} src={img} alt="" />
        }
    },{
        title: '手持身份证照片',
        dataIndex: 'card_and_faca',
        render(img) {
            return <img style={{ width: '150px', height: '150px' }} src={img} alt="" />
        }
    }
];




 
export default class Business extends React.Component {
    state = {
        visibelRole: false,
        visibelSetPermission: false,
        visibelUserAuth: false,
        autoExpandParent: true,//自动展开tree列表
        roleId: '',//选择修改的那项角色id
        selecUser: ''
    };
    componentWillMount = () => {
        this.requestData()
    };
    requestData(page) {
        var that = this;
        var loading = document.getElementById('ajaxLoading');
        loading.style.display = 'block';

        axios.ajax({
            url: '/withdraw/business',
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
   

    // 审核通过
    PassBusiness = () => {
        var that=this;
        if (this.state.roleId) {
            this.setState({
                visibelSetPermission: true
            })
            Modal.confirm({
                title: '审核通过?',
                content: '改商家提交的资料确定合格吗？',
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
                content: '请选择需要处理的商家',
            });
        }

    }
    // 审核不通过
    NoPassBusiness = () => {
        if (this.state.roleId) {
            // this.setState({
            //     visibelSetPermission: true
            // })
            Modal.confirm({
                title: '审核不通过?',
                content: '改商家提交的资料确定不合格吗？',
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
                content: '请选择需要处理的商家',
            });
        }

    }
    render() {

        // 配置表格单选
        const rowSelection = {
            type: 'radio',
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    roleId: selectedRows[0].business_id
                })
                console.log("选择的id：" + selectedRows[0].id)
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
                    <Breadcrumb.Item> 认证商家</Breadcrumb.Item>
                </Breadcrumb>
                {/* 表单搜索 */}
                <div className="search-box">
                    <Button type="primary" onClick={this.PassBusiness} >通过</Button>
                    <Button type="danger" onClick={this.NoPassBusiness} style={{ marginLeft: '20px' }}>审核不通过</Button>
                    {/* <Button type="primary" onClick={this.showUserAuth} style={{ marginLeft: '20px' }}>禁用</Button> */}
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
                {/* 确认通过 模态框 */}
                <Modal >
                </Modal>

            </div>
        )
    }
}