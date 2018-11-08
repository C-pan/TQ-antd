import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch,Redirect} from 'react-router-dom'
import About from './page/about'
import Topic from './page/topic'
import Home from './page/home';
import App from './App';
import Admin from './admin';
import NoMatch from './page/nomatch'
import Login from './page/login';

import Withdraw from './page/withdraw';
import Authenticat from './page/withdraw/authenticat';
import Business from './page/withdraw/business';
import WithdrawMode from './page/withdraw/withdrawMode';
import Wx from './page/withdraw/wx';
import Zfb from './page/withdraw/zfb';
import Yl from './page/withdraw/yl';

import DevManagement from './page/devManagement';
import DevDetail from './page/devManagement/detail';
import DevStatistics from './page/devManagement/statistics'; 
import Container1 from './page/devManagement/container1'; 
import Container2 from './page/devManagement/container2'; 
import Container3 from './page/devManagement/container3'; 

import OrderIndex from './page/order';
import ErrorOrder from './page/order/errorOrder';
import OrderList from './page/order/orderList';

 
import Permission from './page/permission/index-y';

import Product from './page/product';

import Address from './page/address';

import BusinessList from './page/business';

import DevMap from './page/map/devMap';

import Changepw from './page/system/changepw';
import UserInfo from './page/system/userInfo';
export default class CRouter extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <App>
                    <Switch> 
                        <Route path="/about" component={About}></Route> 
                        <Route path="/login" component={Login}></Route>
                        <Route exact={true} path="/about/abc" component={About}></Route>
                        <Route path="/topics" component={Topic}></Route>
                        
                        <Route path="/" render={() =>
                            <Admin> 
                                <Route exact path="/" component={Home}></Route>
                                <Route path="/home" component={Home}></Route>
                                <Route path="/about" component={About}></Route>
                                
                                {/* 提现管理 */}
                                <Route path="/withdraw/index" component={Withdraw}></Route>
                                <Route path="/withdraw/authenticat" component={Authenticat}></Route>
                                <Route path="/withdraw/business" component={Business}></Route>
                                <Route path="/withdraw/withdrawmode" component={WithdrawMode}></Route>
                                <Route path="/withdraw/wx" component={Wx}></Route>
                                <Route path="/withdraw/zfb" component={Zfb}></Route>
                                <Route path="/withdraw/yl" component={Yl}></Route>
                                {/* 设备管理 */}
                                <Route path="/dev/index" component={DevManagement}></Route>
                                <Route path="/dev/statistics" component={DevStatistics}></Route>
                                <Route path="/dev/detail/:number" component={DevDetail}></Route>
                                <Route path="/dev/devdetail/container1/:number" component={Container1}></Route>
                                <Route path="/dev/devdetail/container2/:number" component={Container2}></Route>
                                <Route path="/dev/devdetail/container3/:number" component={Container3}></Route>
                                {/* 订单 */}
                                <Route path="/order/index" component={OrderIndex}></Route>
                                <Route path="/order/errororder" component={ErrorOrder}></Route>
                                <Route path="/order/orderlist" component={OrderList}></Route>
                                
                                <Route path="/product" component={Product}></Route> 

                                <Route path="/address" component={Address}></Route> 

                                <Route path="/devMap" component={DevMap}></Route> 

                                <Route path="/business" component={BusinessList}></Route> 

                                <Route path="/permission" component={Permission}></Route> 

                                {/* 系统管理 */}
                                <Route path="/system/changepw" component={Changepw}></Route> 
                                <Route path="/system/userinfo" component={UserInfo}></Route> 

                                {/* <Redirect to="/home" /> */}
                                {/* <Route path="/" render={() => <Redirect to="/home" />} /> */}
                            </Admin>
                        }></Route>
                        
                        <Route component={NoMatch}></Route>
                    </Switch>
                </App>
            </BrowserRouter>
        );
    }
}
 