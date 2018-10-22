import React from 'react';
import { Link} from 'react-router-dom';
import { Row, Col, Breadcrumb} from 'antd';
import axios from '../../axios';
import './container.less'
import '../../style/common.css'
export  default class Container2 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            productinfo: {}
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
        var that = this;
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
    // 渲染货架层级
    renderComtainerShelf = () => {
        console.log(this.state.productinfo.length) 
        var shelfKeys=Object.keys(this.state.productinfo)
        var shelfLen=Object.keys(this.state.productinfo).length;
        var ShelfHTML=[]
        for (let i = 0; i < shelfKeys.length; i++){
            var key = shelfKeys[i]
            console.log(this.state.productinfo[key]);
            
            var RowHtml=<Row className="container2_box">
                    <div className="container2_layer">第{i+1}层</div>
                {this.renderComtainerProduct(this.state.productinfo[key])}
                </Row>
            ShelfHTML.push(RowHtml)
           
        } 
        return ShelfHTML;
    }
    // 渲染商品
    renderComtainerProduct=(productData)=>{
        return (
            productData.map((item => {
                return (
                    <Col span={6} className="gutter-row">
                        <div className="container2_item container2_itemmore">
                            <div className="itempic">
                                <div className="table-cell container2_ipic">
                                    <img src={item.image ? item.image : "/assets/images/add_p.png"} />
                                </div>
                            </div>
                            <div className="itemcont">
                                <p className="itemcontname">{item.name ? item.name : "商品名称"}</p>
                                <p className="itemcontprice">价格：¥{item.price ? item.price : "0.00"}</p>
                                <p className="max_stock">数量：{item.num}瓶</p>
                                <p className="max_stock">重量：{item.sumWeight}</p>
                            </div>
                        </div>
                    </Col>
                )
            }))
        )
    }
    render(){
        return(
            <div className="content-box">
                <Breadcrumb className="header-Breadcrumb">
                    <Breadcrumb.Item><Link to="/dev/index"> 设备列表</Link></Breadcrumb.Item>
                    <Breadcrumb.Item> <Link to={"/dev/detail/" + this.state.number}>设备详情</Link></Breadcrumb.Item>
                    <Breadcrumb.Item> 图像算法货架</Breadcrumb.Item>
                </Breadcrumb>
                {/* <Row  className="container2_box">
                    <div className="container2_layer">第一层</div>
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
                </Row>
                <Row className="container2_box">
                    <div className="container2_layer">第一层</div>
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
                </Row>
                <Row className="container2_box">
                    <div className="container2_layer">第一层</div>
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
                </Row> */}
                {this.renderComtainerShelf()}
            </div>
        )
    }
}