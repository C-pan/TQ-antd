const menuList = [
    {
        title: '首页',
        key: '/home'
    },
    // {
    //     title: '提现管理',
    //     key: '/ui',
    //     children: [
    //         {
    //             title: '提现首页',
    //             key: '/ui/index',
    //         },
    //         {
    //             title: '支付宝提现',
    //             key: '/ui/buttons',
    //         },
    //         {
    //             title: '微信提现',
    //             key: '/ui/modals',
    //         },
    //         {
    //             title: '银行卡提现',
    //             key: '/ui/loadings',
    //         }
    //     ]
    // },
    // {
    //     title: '表单',
    //     key: '/form',
    //     children: [
    //         {
    //             title: '登录',
    //             key: '/form/login',
    //         },
    //         {
    //             title: '注册',
    //             key: '/form/reg',
    //         }
    //     ]
    // },
    // {
    //     title: '表格',
    //     key: '/table',
    //     children: [
    //         {
    //             title: '基础表格',
    //             key: '/table/basic',
    //         },
    //         {
    //             title: '高级表格',
    //             key: '/table/high',
    //         }
    //     ]
    // },
    {
        title: '设备统计',
        key: '/dev/statistics'
    },
    {
        title: '设备管理',
        key: '/dev/index'
    },
    {
        title: '城市管理',
        key: '/city'
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
        title: '员工管理',
        key: '/user'
    },
    {
        title: '车辆地图',
        key: '/bikeMap'
    },
    {
        title: '图标',
        key: '/charts',
        children: [
            {
                title: '柱形图',
                key: '/charts/bar'
            },
            {
                title: '饼图',
                key: '/charts/pie'
            },
            {
                title: '折线图',
                key: '/charts/line'
            },
        ]
    },
    {
        title: '权限设置',
        key: '/permission'
    },
];
export default menuList;