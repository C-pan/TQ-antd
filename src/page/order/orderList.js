import React from 'react';
import ReactDOM from 'react-dom';
import axios from '../../axios';
import Utils from '../../utils';
import { Breadcrumb,Form, Icon, Input, Table, Button, DatePicker, Select,Spin } from 'antd';
import '../../style/common.css'

const FormItem = Form.Item;
const Option = Select.Option;
 
const columns = [
    { title: '购买人', width: 150, dataIndex: 'name', key: 'name', fixed: 'left', sorter: (a, b) => a.name.length - b.name.length,},
    { title: '订单号', dataIndex: 'order_sn', key: '11', width: 150 },
    { title: '设备名称', dataIndex: 'dev_id', key: '2', width: 150 },
    { title: '购买信息', dataIndex: 'bug_info', key: '3', width: 150 },
    { title: '下单时间', dataIndex: 'end_time', key: '4', width: 150 },
    { title: '支付方式', dataIndex: 'user_pay', key: '5', width: 150 },
    { title: '支付金额(元)', dataIndex: 'total_fee', key: '6', width: 150 },
    { title: '实际收益', dataIndex: 'user_pay', key: '7', width: 150 },
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
 
class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state ={ 
                        'dataSource':[]
                    };
        //提交订单
        this.handleSubmit = this.handleSubmit.bind(this); 
    }
    componentWillMount = () => {
        this.requestData()
    };
    requestData(page){
        var that=this;
        var loading = document.getElementById('ajaxLoading');
        loading.style.display = 'block';
        
        axios.ajax({
            url: '/order/list',
            mock: 1,
            data: {
                params: {
                    uid: '2',
                    page:page|'1'
                }
            }
        }).then((res) => {
           
                // this.setState({
                //     orderInfo: res.result
                // })
                // this.renderMap(res.result);
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
    handleSubmit(e){
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
    render() {
        const { getFieldDecorator } = this.props.form;
         
        return (
            <div className="content-box">
                <Breadcrumb className="header-Breadcrumb">
                    <Breadcrumb.Item>订单管理</Breadcrumb.Item>
                    <Breadcrumb.Item> 错误订单</Breadcrumb.Item>
                </Breadcrumb>
            {/* 表单搜索 */}
                <Form layout="inline" onSubmit={this.handleSubmit} className="search-box">
                    <FormItem  style={{ width: '120px' }}>
                        {getFieldDecorator('datePickerStart', )(
                            <DatePicker  />
                        )} 
                    </FormItem>
                    <FormItem> 
                        {getFieldDecorator('datePickerEnd', )(
                            <DatePicker />
                        )}
                    </FormItem>
                    <FormItem style={{ width: '120px' }}>
                        {getFieldDecorator('paymentMethod', {
                             
                        })(
                            <Select
                                initialValue={'all'}
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
                    pagination={{ pageSize: 10, total: 200, onChange: this.selecPage}} 
                    // scroll={{ x: '100%', y: 340 }}
                    scroll={{ x: 1450, y: 360 }}
                    bordered
                />
                
            </div>
        )
    }
}
 
export default OrderList = Form.create()(OrderList);
 