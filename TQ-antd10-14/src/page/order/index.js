import React from 'react';
import '../../style/common.css'
import './index.css'
import echarts from 'echarts'

export default class Order extends React.Component{
    componentDidMount() {
        this.showECharts()
    }
    showECharts() {
        // 图表高度兼容问题
        var wHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var sHeight = document.getElementById('dev_statistics').offsetHeight;
        document.getElementById('dev_statistics').style.height = (wHeight - 320) + "px";
        var myChart = echarts.init(document.getElementById('dev_statistics'));
        var option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17', '4-17']
            },
            yAxis: {
                type: 'value'
            },
            series: [

                {
                    name: '订单数量数量',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 820, 932, 901, 820, 932, 901, 934, 1290, 820, 932, 901, 934, 1290, 820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    render(){
        return(
            <div className="content-box clearfix    ">
                <div className="order_box">
                    <table id="order_tbale">
                        <thead>
                            <tr id="order_table_tit">
                                <th colspan="2">订单总数：23</th>
                                <th colspan="2">昨日订单数：0</th>
                                <th colspan="2">今日订单数：0</th>
                                <th colspan="2">近一周订单数：1</th>
                                <th colspan="2">近一月订单数：23</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <p className="mdetdpro">总收益(￥)</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">实际收益(￥)</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">总收益(￥)</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">实际收益(￥)</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">总收益(￥)</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">实际收益(￥)</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">总收益(￥)</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">实际收益(￥)</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">总收益(￥)</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">实际收益(￥)</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="mdetdpro">0.28</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">0.28</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">0.00</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">0.00</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">0.00</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">0.00</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">0.01</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">0.01</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">0.28</p>
                                </td>
                                <td>
                                    <p className="mdetdpro">0.28</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className=" orderline_box">
                    <ul className="dev_statistics_tabs">
                        <li className="active" id="day">最近15天</li>
                        <li id="one-month">最近30天</li>
                    </ul>
                    <div id="dev_statistics"   className="oroder_statistics">

                    </div>
                </div>
            </div>
        )
    }
}