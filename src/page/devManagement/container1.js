import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Breadcrumb, notification } from 'antd'; 
import axios from '../../axios';
import '../../style/common.css'
export default class Container2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            productinfo:[]
        }
    }
    componentWillMount() {
        var number = this.props.match.params.number
        this.setState({
            number: number
        })
        this.requestData()
    }
    requestData(page) {
        var that=this; 
        axios.ajax({
            url: '/api/apiproduct/index',
            data: {
                params: {
                    uid: '2',
                    tid: that.props.match.params.number,
                    page: page || '0'
                }
            }
        }).then((res) => {
            that.setState({
                productinfo: res.productinfo
            })

        })
    }
    renderComtainer=()=>{
        console.log("this.state.productinfo")
        console.log(this.state.productinfo)
        if (!this.state.productinfo) {
            notification.error({
                message: '温馨提示',
                description: '该设备没有商品',
            });
            return
        }
        return (
            this.state.productinfo.map((item=>{
                return(
                    <Col span={6} className="gutter-row">
                        <div className="container2_item container2_itemmore">
                            <span class="numicon">{item.shelfid}</span>
                            <div className="itempic">
                                <div className="table-cell container2_ipic">
                                    <img src={item.image ? item.image : "/assets/images/add_p.png"} />
                                </div>  
                            </div>
                            <div className="itemcont">
                                <p className="itemcontname">{item.name ? item.name : "商品名称"}</p>
                                <p className="itemcontprice">价格：¥{item.price ? item.price:"0.00"}</p>
                                <p className="max_stock">数量：{item.num}瓶</p>
                                {/* <p className="max_stock">重量：{item.num}</p> */}
                            </div>
                        </div>
                    </Col>
                )
                
            }))
        )
    }
    render() {
        return (
            <div className="content-box">
                <Breadcrumb className="header-Breadcrumb">
                    <Breadcrumb.Item><Link to="/dev/index"> 设备列表</Link></Breadcrumb.Item>
                    <Breadcrumb.Item> <Link to={"/dev/detail/" + this.state.number}>设备详情</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>货架</Breadcrumb.Item>
                </Breadcrumb>
                <Row className="container2_box">
                    {this.renderComtainer()}
                    {/* <Col span={6} className="gutter-row ">
                        <div className="container2_item container2_itemmore">
                            <span class="numicon">2</span>
                            <div className="itempic">
                                <div className="table-cell container2_ipic">
                                    <img src="http://osv.ufile.ucloud.com.cn/2018/04/08/A9S8Pu58JBSFZDKemy9Y.png" />
                                </div>
                            </div>
                            <div className="itemcont">
                                <p className="itemcontname">矿泉水-恒大冰</p>
                                <p className="itemcontprice">价格：¥0.01</p>
                                <p className="max_stock">数量：23瓶</p>
                                <p className="max_stock">重量：10.2kg</p>
                            </div>
                        </div>
                    </Col>
                    <Col span={6} className="gutter-row ">
                        <div className="container2_item container2_itemmore">
                            <div className="itempic">
                                <div className="table-cell container2_ipic">
                                    <img src="http://osv.ufile.ucloud.com.cn/2018/04/08/A9S8Pu58JBSFZDKemy9Y.png" />
                                </div>
                            </div>
                            <div className="itemcont">
                                <p className="itemcontname">矿泉水-恒大冰</p>
                                <p className="itemcontprice">价格：¥0.01</p>
                                <p className="max_stock">数量：23瓶</p>
                                <p className="max_stock">重量：10.2kg</p>
                            </div>
                        </div>
                    </Col>
                    <Col span={6} className="gutter-row ">
                        <div className="container2_item container2_itemmore">
                            <div className="itempic">
                                <div className="table-cell container2_ipic">
                                    <img src="http://osv.ufile.ucloud.com.cn/2018/04/08/A9S8Pu58JBSFZDKemy9Y.png" />
                                </div>
                            </div>
                            <div className="itemcont">
                                <p className="itemcontname">矿泉水-恒大冰</p>
                                <p className="itemcontprice">价格：¥0.01</p>
                                <p className="max_stock">数量：23瓶</p>
                                <p className="max_stock">重量：10.2kg</p>
                            </div>
                        </div>
                    </Col>
                    <Col span={6} className="gutter-row ">
                        <div className="container2_item container2_itemmore">
                            <div className="itempic">
                                <div className="table-cell container2_ipic">
                                    <img src="http://osv.ufile.ucloud.com.cn/2018/04/08/A9S8Pu58JBSFZDKemy9Y.png" />
                                </div>
                            </div>
                            <div className="itemcont">
                                <p className="itemcontname">矿泉水-恒大冰</p>
                                <p className="itemcontprice">价格：¥0.01</p>
                                <p className="max_stock">数量：23瓶</p>
                                <p className="max_stock">重量：10.2kg</p>
                            </div>
                        </div>
                    </Col>
                    <Col span={6} className="gutter-row ">
                        <div className="container2_item container2_itemmore">
                            <div className="itempic">
                                <div className="table-cell container2_ipic">
                                    <img src="http://osv.ufile.ucloud.com.cn/2018/04/08/A9S8Pu58JBSFZDKemy9Y.png" />
                                </div>
                            </div>
                            <div className="itemcont">
                                <p className="itemcontname">矿泉水-恒大冰</p>
                                <p className="itemcontprice">价格：¥0.01</p>
                                <p className="max_stock">数量：23瓶</p>
                                <p className="max_stock">重量：10.2kg</p>
                            </div>
                        </div>
                    </Col>
                    <Col span={6} className="gutter-row ">
                        <div className="container2_item container2_itemmore">
                            <div className="itempic">
                                <div className="table-cell container2_ipic">
                                    <img src="http://osv.ufile.ucloud.com.cn/2018/04/08/A9S8Pu58JBSFZDKemy9Y.png" />
                                </div>
                            </div>
                            <div className="itemcont">
                                <p className="itemcontname">矿泉水-恒大冰</p>
                                <p className="itemcontprice">价格：¥0.01</p>
                                <p className="max_stock">数量：23瓶</p>
                                <p className="max_stock">重量：10.2kg</p>
                            </div>
                        </div>
                    </Col> */}
                </Row>
            </div>
        )
    }
}