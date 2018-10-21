import React from "react"
import {Link} from "react-router-dom"
import { Row, Col, Breadcrumb} from "antd"
import  "./index.css"

export default class Container3 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            number: ''
        };
    }
    componentWillMount() {
        var number = this.props.match.params.number
        this.setState({
            'number': number
        })
    }

    render(){
        return(
            <div className="content-box">
                <Breadcrumb className="header-Breadcrumb">
                    <Breadcrumb.Item><Link to="/dev/index"> 设备列表</Link></Breadcrumb.Item>
                    <Breadcrumb.Item> <Link to={"/dev/detail/"+this.state.number}>设备详情</Link></Breadcrumb.Item>
                    <Breadcrumb.Item> 称算法货架编辑</Breadcrumb.Item>
                </Breadcrumb>
                <Row  style={{width:'96%',margin:"10px auto",padding:'40px 0 50px'}}>
                    <Col span={12} className="container3_itme">
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
                    </Col>
                </Row>
            </div>
        )
    }
}