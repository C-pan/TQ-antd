import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'; 
import axios from '../../axios';
import Utils from '../../utils';

import { Breadcrumb, Form, Input, Button, Select, Col, Row, message } from 'antd';
import '../../style/common.css'
import './index.css'
const FormItem = Form.Item;
const Option = Select.Option;
 

class DevManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'devList': []
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
            url: '/api/apiproduct/terminallist',
            data: {
                params: {
                    uid: '2',
                    page: page || '1'
                }
            }
        }).then((res) => { 
            console.log(res)
            that.setState({
                devList: res.terminal_list
            })
             
        })
 
    }
    rederList(){
        // devList
        return(
            this.state.devList.map((itme=>{
                return(
                    <Col span={6}>
                        <Link to={'/dev/detail/' + itme.tid} className="product_itme">
                            <div className={itme.state==1?'inline':'outline'}>
                            {/* <div className="num">!</div> */}
                            </div>
                            <img className='photo' src={"/assets/images/shj" + itme.terminaltype+".png"} alt="" />
                            <div className='dev_info'>
                            <div className='nearby_time_tit'>{itme.name}</div>
                                <div className='nearby_time_des'>{itme.number}</div>
                            <div className='nearby_time_des'>销量:{itme.buyusernum}</div>
                            </div>
                        </Link>
                    </Col>
                )
            }))
            
        )
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
    render() {
        const { getFieldDecorator } = this.props.form; 
        return (
            <div className="content-box">
                <Breadcrumb className="header-Breadcrumb">
                    <Breadcrumb.Item>设备管理</Breadcrumb.Item>
                    <Breadcrumb.Item> 设备列表</Breadcrumb.Item>
                </Breadcrumb>
                {/* 表单搜索 */}
                <Form layout="inline" onSubmit={this.handleSubmit} className="search-box">
                    <FormItem style={{ width: '120px' }}>
                        {getFieldDecorator('devStatus', {

                        })(
                            <Select
                                initialValue={'status'}
                                style={{ width: '120px' }}
                                placeholder="请选择状态"
                            // onChange={this.handleCurrencyChange}
                            > 
                                <Option value="inline">在线</Option>
                                <Option value="outline">离线</Option>
                                <Option value="fail">故障</Option>
                            </Select>
                            )}
                    </FormItem >
                    <FormItem style={{ width: '120px' }}>
                        {getFieldDecorator('transaction', {

                        })(
                            <Select
                                initialValue={'transaction'}
                                style={{ width: '120px' }}
                                placeholder="交易排序"
                            >
                            <Option value="transaction">交易排序</Option>
                            <Option value="transactionMon">销售额</Option>
                            <Option value="quantity">订单量</Option>
                            </Select>
                            )}
                    </FormItem >
                    <FormItem style={{ width: '120px' }}>
                        {getFieldDecorator('area', {

                        })(
                            <Select
                                initialValue={'wd'}
                                style={{ width: '120px' }}
                                placeholder="网点"
                            >
                                <Option value="wd">网点</Option>
                                <Option value="bj">北京</Option>
                                <Option value="sz">深圳</Option>
                                <Option value="dg">东莞</Option>
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
                {/* 设备列表 */}
                <Row>
                    {this.rederList()}
                </Row>
            </div>
        )
    }
}
export default DevManagement = Form.create()(DevManagement);

