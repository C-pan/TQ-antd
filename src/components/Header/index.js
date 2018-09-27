import React from 'react'; 
import { Link } from 'react-router-dom'
import './index.css';
import { Row, Col, Dropdown, Breadcrumb, Menu, Icon, Badge } from 'antd'; 

export default class Header extends React.Component {
     render(){
         const menu = (
             <Menu>
                 <Menu.Item>
                     <a target="_blank" rel="noopener noreferrer" href="#">个人信息</a>
                 </Menu.Item>
                 <Menu.Item>
                     <a target="_blank" rel="noopener noreferrer" href="#">注销</a>
                 </Menu.Item> 
             </Menu>
         );
         return(
             <div className="header-box">
                 <Row className="header-top">
                     <Col span={24}>
                         <Dropdown overlay={menu}  >
                             <span className="header-mag ant-dropdown-link"  >
                                 <Badge count={10}><Icon type="bell" style={{ fontSize: '25px' }} /></Badge>
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
                 <Breadcrumb className="header-Breadcrumb">
                     <Breadcrumb.Item>首页</Breadcrumb.Item>
                     <Breadcrumb.Item> 销售状态</Breadcrumb.Item>
                 </Breadcrumb>
             </div>
         )
     }
}
