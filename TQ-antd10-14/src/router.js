import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch,Redirect} from 'react-router-dom'
import About from './page/about'
import Topic from './page/topic'
import Home from './page/home';
import App from './App';
import Admin from './admin';
import NoMatch from './page/nomatch'
import Login from './page/login';
import DevManagement from './page/devManagement';
import DevDetail from './page/devManagement/detail';
import DevStatistics from './page/devManagement/statistics'; 

import OrderIndex from './page/order';
import ErrorOrder from './page/order/errorOrder';
import OrderList from './page/order/orderList';

 
import Permission from './page/permission/index-y';
export default class CRouter extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <App>
                    <Switch> 
                    {/* <Route path="/" render={() => <Redirect to="/admin/home" />} /> */}
                        <Route path="/about" component={About}></Route> 
                        <Route exact={true} path="/about/abc" component={About}></Route>
                        <Route path="/topics" component={Topic}></Route>
                        <Route path="/" render={() =>
                            <Admin>
                                <Route path="/" render={() => <Redirect to="/home" />} />
                                <Route path="/home" component={Home}></Route>
                                <Route path="/about" component={About}></Route>
                                <Route path="/login" component={Login}></Route>
                                {/* 设备管理 */}
                                <Route path="/dev/index" component={DevManagement}></Route>
                                <Route path="/dev/statistics" component={DevStatistics}></Route>
                                <Route path="/dev/detail/:number" component={DevDetail}></Route>
                                {/* 订单 */}
                                <Route path="/order/index" component={OrderIndex}></Route>
                                <Route path="/order/errororder" component={ErrorOrder}></Route>
                                <Route path="/order/orderlist" component={OrderList}></Route>
                                
                                <Route path="/permission" component={Permission}></Route> 
                            </Admin>
                        }></Route>
                        
                        <Route component={NoMatch}></Route>
                    </Switch>
                </App>
            </BrowserRouter>
        );
    }
}

// import React, { Component } from 'react';
// import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
// import App from './App'
// import Admin from './admin';
// import Home from './page/home';
// import Login from './page/login';
// import NoMatch from './page/nomatch';
// export default class CRouter extends React.Component{
//     render(){
//         return(
//             <BrowserRouter> 
//                 <App>
//                     <Switch>   
//                         <Route path='/login' conponent={Login}></Route>
//                         <Route path='/home' conponent={Home}></Route>
                        // <Route path="/about" component={About}></Route>
                        // <Route path="/home" component={Home}></Route>
//                         <Route  conponent={NoMatch}></Route>
//                     </Switch>
//                     <div>router 部分内容</div>
//                 </App>
//             </BrowserRouter>
//         )
//     }
// }