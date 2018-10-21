const menuList = [
    {
        title: '首页',
        key: '/home'
    },
    {
        title: '提现管理',
        key: '/withdraw',
        children: [
            {
                title: '提现记录',
                key: '/withdraw/index',
            },
            {
                title: '提现认证',
                key: '/withdraw/authenticat',
            },
            {
                title: '认证商家',
                key: '/withdraw/business',
            }
        ]
    },
    {
        title: '设备统计',
        key: '/dev/statistics'
    },
    {
        title: '设备管理',
        key: '/dev/index'
    },
    {
        title: '商品管理',
        key: '/product'
    },
    {
        title: '地址管理',
        key: '/address'
    },
    {
        title: '订单管理',
        key: '/order',
        children: [
            {
                title: '订单增涨情况',
                key: '/order/index'
            },
            {
                title: '订单列表',
                key: '/order/orderlist'
            },
            {
                title: '异常订单',
                key: '/order/errororder'
            }
        ]
    },
    {
        title: '商户管理',
        key: '/business'
    },
    {
        title: '设备地图',
        key: '/devMap'
    },
    {
        title: '权限设置',
        key: '/permission'
    },
    {
        title: '系统管理',
        key: '/system',
        children: [
            {
                title: '修改密码',
                key: '/system/changepw'
            },
            {
                title: '用户信息',
                key: '/system/userinfo'
            },
            {
                title: '系统日志',
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