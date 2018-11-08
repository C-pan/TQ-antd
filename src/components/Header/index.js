import React from 'react'; 
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './index.css';
import { Row, Col, Dropdown, Breadcrumb, Menu, Icon, Badge } from 'antd'; 

 class Header extends React.Component {
     render(){
         const menu = (
             <Menu>
                 <Menu.Item>
                     <Link   to="/system/userinfo">个人信息</Link>
                 </Menu.Item>
                 <Menu.Item>
                     <a  rel="noopener noreferrer" href="#">注销</a>
                 </Menu.Item> 
             </Menu>
         );
         const MsgList = (
             <Menu>
                 <Menu.Item>
                     <Link to="/dev/index" >设备故障<Badge count={2}  style={{marginLeft:'10px'}}/></Link>
                 </Menu.Item>
                 <Menu.Item>
                     <Link to="/order/errororder" >错误订单<Badge count={8} style={{ marginLeft: '10px' }} /></Link>
                 </Menu.Item>
                 <Menu.Item>
                     <Link to="/order/errororder" >补货设备提醒<Badge count={2} style={{ marginLeft: '10px' }} /></Link>
                 </Menu.Item>
             </Menu>
         );
         return(
             <div className="header-box">
             {/* <div>navKey:{this.props.navKey}</div> */}
                 <Row className="header-top">
                     <Col span={24}>
                         <Dropdown overlay={MsgList}  >
                             <span className="header-mag ant-dropdown-link"  >
                                 <Badge count={10}><Icon type="bell" style={{ fontSize: '20px' }} /></Badge>
                                 <Icon type="down" style={{ marginLeft: '2px' }}/>
                             </span>
                         </Dropdown>
                         <Dropdown overlay={menu} >
                             <span className="header-userinfo ant-dropdown-link" >
                                 <img className="header-avatar" src="/assets/images/avatar.jpg" alt=""/> 管理员admin <Icon type="down" />
                             </span>
                         </Dropdown>
                     </Col>
                 </Row> 
             </div>
         )
     }
}
 


const mapStateToProps = (state, ownProps) => ({
  navKey: state.navKey
})

export default connect(mapStateToProps,null)(Header)

