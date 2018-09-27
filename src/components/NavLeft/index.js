import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
import './index.css';
import menuConfig from '../../config/menuConfig';
const SubMenu = Menu.SubMenu;

export default class NavLeft extends React.Component {
    state = {
        // current: '3',
        theme: 'dark',
        openKeys: [],
    } 
    componentWillMount = () => {
        var menuTreeNode = this.renderMenu(menuConfig)
        this.setState({
            menuTreeNode
        })
    };
    
    // 渲染菜单 配置
    renderMenu=(data) => {
        return data.map((item)=>{
            if (item.children){
                return(
                    <SubMenu key={item.key} title={<span><Icon type="mail" /><span>{item.title}</span></span>}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return < Menu.Item key={item.key} > <Link to={'/admin'+item.key}><Icon type="appstore" />{item.title} </Link></Menu.Item >
        })
    }
    handleClick = (e) => {
        console.log('Clicked: ', e);
        this.setState({ current: e.key });
    }
    onOpenChange = (openKeys) => {
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({ openKeys: nextOpenKeys });
    }
    getAncestorKeys = (key) => {
        const map = {
            sub3: ['sub2'],
        };
        return map[key] || [];
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <Link to="/admin/home">
                        <img src="/assets/images/logo.png" alt="" />
                    </Link>
                    
                </div>
                <Menu
                    theme={this.state.theme}
                    mode="inline"
                    openKeys={this.state.openKeys}
                    selectedKeys={[this.state.current]}
                    // style={{ width: 220 }}
                    onOpenChange={this.onOpenChange}
                    onClick={this.handleClick}
                >
                    {/* <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                        <Menu.Item key="1"><Link to="/admin/home"> admin Home Option 1</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/admin/about">about </Link></Menu.Item>
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item>
                    </SubMenu> 
                    <Menu.Item key="6"><Link to="/admin/Login"><Icon type="appstore" />login </Link></Menu.Item>
                    <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu> */}

                    {this.state.menuTreeNode}
                </Menu>
            </div>
            
        );
    }
}
