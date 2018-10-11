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
export default class CRouter extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <App>
                    <Switch> 
                        <Route path="/admin" render={() =>
                            <Admin>
                                <Route path="/admin/home" component={Home}></Route>
                                <Route path="/admin/about" component={About}></Route>
                                <Route path="/admin/login" component={Login}></Route>
                                {/* 设备管理 */}
                                <Route path="/admin/dev/index" component={DevManagement}></Route>
                                <Route path="/admin/dev/statistics" component={DevStatistics}></Route>
                                <Route path="/admin/dev/detail/:number" component={DevDetail}></Route>
                                {/* 订单 */}
                                <Route path="/admin/order/index" component={OrderIndex}></Route>
                                <Route path="/admin/order/errororder" component={ErrorOrder}></Route>
                                <Route path="/admin/order/orderlist" component={OrderList}></Route>

                            </Admin>
                        }></Route>
                        <Route path="/" render={() => <Redirect to="/admin/home" />} />
                        <Route path="/about" component={About}></Route> 
                        <Route exact={true} path="/about/abc" component={About}></Route>
                        <Route path="/topics" component={Topic}></Route>
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