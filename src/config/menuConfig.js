const menuList = [
    {
        title: '首页',
        type:'home',
        key: '/home'
    },
    {
        title: '提现管理',
        type: 'wallet',
        key: '/withdraw',
        children: [
            {
                title: '提现记录',
                type: "file-text",
                key: '/withdraw/index',
            },
            {
                title: '提现认证',
                type: "idcard",
                key: '/withdraw/authenticat',
            },
            {
                title: '认证商家',
                type:"solution",
                key: '/withdraw/business',
            }
        ]
    },
    {
        title: '设备统计',
        type: 'dot-chart',
        key: '/dev/statistics'
    },
    {
        title: '设备管理',
        type: 'desktop',
        key: '/dev/index'
    },
    {
        title: '商品管理',
        type: 'shop',
        key: '/product'
    },
    {
        title: '地址管理',
        type: 'environment-o',
        key: '/address'
    },
    {
        title: '订单管理',
        type: 'file-text',
        key: '/order',
        children: [
            {
                title: '订单增涨情况',
                type:"line-chart",
                key: '/order/index'
            },
            {
                title: '订单列表',
                type: 'exception',
                key: '/order/orderlist'
            },
            {
                title: '异常订单',
                type:"file-excel",
                key: '/order/errororder'
            }
        ]
    },
    {
        title: '商户管理',
        type: 'team',
        key: '/business'
    },
    {
        title: '设备地图',
        type: 'environment-o',
        key: '/devMap'
    },
    {
        title: '权限设置',
        type: 'key',
        key: '/permission'
    },
    {
        title: '系统管理',
        type: 'setting',
        key: '/system',
        children: [
            {
                title: '修改密码',
                type:'unlock',
                key: '/system/changepw'
            },
            {
                title: '用户信息',
                type:"idcard",
                key: '/system/userinfo'
            },
            {
                title: '系统日志',
                type:"file-text",
                key: '/system/log'
            },
        ]
    }
    // ,{
    //     title: '积分',
    //     key: '/integral'
    // }, {
    //     title: '优惠券',
    //     key: '/coupon'
    // }
];
export default menuList;