import React from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';
import axios from '../../axios';
import Utils from '../../utils';
import { Breadcrumb, Form, Icon, Input, Table, Button, DatePicker, Select, Modal, Spin } from 'antd';
import '../../style/common.css'
import './index.less'

const FormItem = Form.Item;
const Option = Select.Option;

const columns = [
    { title: '购买人', width: 150, dataIndex: 'name', key: 'name', fixed: 'left', sorter: (a, b) => a.name.length - b.name.length, },
    { title: '订单号', dataIndex: 'order_sn', key: '11', width: 150 },
    { title: '设备名称', dataIndex: 'dev_id', key: '2', width: 150 },
    { title: '购买信息', dataIndex: 'bug_info', key: '3', width: 150 },
    { title: '下单时间', dataIndex: 'start_time', key: '4', width: 150 },
    { title: '交易金额', dataIndex: 'mon', key: '6', width: 150 },
    { title: '状态', dataIndex: 'status', key: '8' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a href="#">action</a>,
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};

class ErrorOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'dataSource': [],
            showRuleModal:false
        };
        //提交订单
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount = () => {
        this.requestData()
    };
    requestData(page) {
        var that = this;
        var loading = document.getElementById('ajaxLoading');
        loading.style.display = 'block';

        axios.ajax({
            url: '/order/error',
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
    handleSubmit(e) {
        this.requestData()
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    refresh = () => {
        this.requestData()
    }
    // 分页
    selecPage = (pages, s, f) => {
        this.requestData(pages)
    }
    ShowRule=()=>{
        this.setState({
            showRuleModal: !this.state.showRuleModal
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="content-box">
                <Breadcrumb className="header-Breadcrumb">
                    <Breadcrumb.Item>提现记录</Breadcrumb.Item>
                </Breadcrumb>
                <div className="cash_box">
                    <div className="rules" onClick={this.ShowRule}> 提现规则 </div>

                    <img className="rmb" src="images/rmb.png" />
                        <div className="chas_tips">可提现金额</div>
                        <div className="cash_mon">0.28元</div>
                        <Link to="/withdraw/withdrawmode" id="txboxrulesjs" className="cash_btn">提现</Link>
                </div>
                {/* 表单搜索 */}
                <Form layout="inline" onSubmit={this.handleSubmit} className="search-box">
                    <FormItem style={{ width: '120px' }}>
                        {getFieldDecorator('datePickerStart', )(
                            <DatePicker placeholder="开始时间" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('datePickerEnd', )(
                            <DatePicker placeholder="结束时间" />
                        )}
                    </FormItem>
                    <FormItem style={{ width: '120px' }}>
                        {getFieldDecorator('paymentMethod', {

                        })(
                            <Select
                                initialValue={'all'}
                                placeholder="支付方式"
                                style={{ width: '120px' }}
                            // onChange={this.handleCurrencyChange}
                            >
                                <Option value="all">全部</Option>
                                <Option value="wx">微信</Option>
                                <Option value="zfb">支付宝</Option>
                            </Select>
                            )}
                    </FormItem >
                    <FormItem >
                        {getFieldDecorator('devId', {
                            rules: [{ required: false, message: '请输入设备编号!' }],
                        })(
                            <Input type="text" placeholder="请输入设备编号" />
                            )}
                    </FormItem>
                    <FormItem >
                        {getFieldDecorator('orderId', {
                            rules: [{ required: false, message: '请输入订单号!' }],
                        })(
                            <Input type="text" placeholder="请输入订单号" />
                            )}

                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit" >
                            搜索
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            onClick={this.refresh} >
                            刷新
                        </Button>
                    </FormItem>
                </Form>
                {/* 表格 */}
                <Table
                    style={{ width: '100%' }}
                    size="middle"
                    columns={columns}
                    dataSource={this.state.dataSource}
                    owSelection={rowSelection}
                    pagination={{ pageSize: 10, total: 200, onChange: this.selecPage }}
                    // scroll={{ x: 1150, y: 360 }}
                    bordered
                />
                <Modal 
                    title="提现规则说明"
                    onCancel="false"
                    visible={this.state.showRuleModal}
                    okText="确定"
                    cancelText="取消"
                    closable={true}
                    onCancel={this.ShowRule}
                    onOk={this.ShowRule}> 
                        <p>1、每次申请提现，金额需超过10元;</p>
                        <p>2、每天最多只能申请提现1次;</p>
                        <p>3、一般在提现申请后1-3个工作日内到账，如超过3个工作日未到账请联系OSV客服;</p>
                        <p>4、可提现至微信、支付宝、银行卡账号;</p>
                        <p>5、提现手续费按照微信、支付宝、银行卡费率扣除0.6%</p> 
                </Modal>
            </div>
        )
    }
}
export default ErrorOrder = Form.create()(ErrorOrder);

