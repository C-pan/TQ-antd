import React from "react"
import {Link} from "react-router-dom"
import { Row, Col, Breadcrumb,notification} from "antd"
import  "./index.css"
import axios from '../../axios';
export default class Container3 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            productinfo:[]
        };
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
            console.log(res.productinfo)
            that.setState({
                productinfo: res.productinfo
            })

        })
    }
    renderComtainer = () => {
        console.log("this.state.productinfo")
        console.log(JSON.stringify(this.state.productinfo))
        // console.log(this.state.productinfo.length) 
        if (!this.state.productinfo) {
            notification.error({
                message: '温馨提示',
                description:  '该设备没有商品',
            });
            return
        }
        return (
            this.state.productinfo.map((item => {
                return (
                    <Col span={12} className="container3_itme">
                        <div className="container2_layer">第{item.shelfid}层</div>
                        <img className="itme_img" src={item.image} alt="" />
                        <div className="itme_info">
                            <div>{item.name}</div><div>￥{item.price}/kg</div><div>重量：{item.sumWeight}</div>
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
                    <Breadcrumb.Item> <Link to={"/dev/detail/"+this.state.number}>设备详情</Link></Breadcrumb.Item>
                    <Breadcrumb.Item> 称算法货架</Breadcrumb.Item>
                </Breadcrumb>
                <Row  style={{width:'96%',margin:"10px auto",padding:'40px 0 50px'}}>
                    {/* <Col span={12} className="container3_itme">
                        <div className="container2_layer">第一层</div>
                        <img className="itme_img" src="/assets/images/fruits/1.jpg" alt=""/>
                        <div className="itme_info">
                            <div>龙眼</div><div>￥15.00/kg</div><div>重量：10003g</div>
                        </div>
                    </Col>
                    <Col span={12} className="container3_itme">
                        <div className="container2_layer">第二层</div>
                        <img className="itme_img" src="/assets/images/fruits/1.jpg" alt="" />
                        <div className="itme_info">
                            <div>龙眼</div>
                            <div>￥15.00/kg</div>
                            <div>重量：10003g</div>
                        </div>
                    </Col>
                    <Col span={12} className="container3_itme">
                        <div className="container2_layer">第二层</div>
                        <img className="itme_img" src="/assets/images/fruits/1.jpg" alt="" />
                        <div className="itme_info">
                            <div>龙眼</div>
                            <div>￥15.00/kg</div>
                            <div>重量：10003g</div>
                        </div>
                    </Col> */}
                    {this.renderComtainer()}
                </Row>
            </div>
        )
    }
}