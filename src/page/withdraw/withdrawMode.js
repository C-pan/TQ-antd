import React from 'react';
import { Link} from 'react-router-dom';
import { Row, Col, Card,Breadcrumb} from 'antd';
import '../../style/common.css' 
import './index.less'  
export default class WithdrawMode extends React.Component{
 
    render(){
        return(
            <div className="content-box-t clearfix    ">
                <Breadcrumb className="header-Breadcrumb">
                    <Breadcrumb.Item><Link to="/withdraw/index"> 提现记录</Link></Breadcrumb.Item>
                    <Breadcrumb.Item> 提现方式</Breadcrumb.Item>
                </Breadcrumb>
                <Card style={{ width: '100%', margin: '20px 0' }}>
                    <Row className="dev_box">
                        <Col span={8}  >
                            <Link to="/withdraw/wx" class="cash_link" >
                                <img class="cash_icon" src="/assets/images/pay/wx.png" alt="" />
                                <div class="cash_name">微信</div>
                            </Link>
                        </Col>
                        <Col span={8}  >
                            <Link to="/withdraw/zfb" class="cash_link" >
                                <img class="cash_icon" src="/assets/images/pay/zfb.png" alt="" />
                                <div class="cash_name">支付宝</div>
                            </Link>
                        </Col>
                        <Col span={8}  >
                            <Link to="/withdraw/yl" class="cash_link">
                                <img class="cash_icon" src="/assets/images/pay/yl.png" alt="" />
                                <div class="cash_name">银行卡</div>
                            </Link>
                        </Col>
                    </Row>
                </Card>
                <Card style={{width:'100%',padding:'20px 0 60px'}}>
                    <div class="cash_tips">
                        <p class="cash_tips_tit">提现金额到账说明：</p>
                        <p>由于提现需要相关财务处理，所以大概需要2-5个工作日现金才能到账</p>
                        <p>有疑问请联系客服 :400-1121212</p>

                    </div>
                </Card>
            </div>
        )
    }
}