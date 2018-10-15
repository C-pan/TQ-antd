import React from 'react';
import {Row,Col} from 'antd';
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
            <div className="content-box-t clearfix    ">
                <div className="dev_box">
                    <Row clasName="dev_itme">
                        <Col span={8} className="dev_itme">
                            <div className="dev_num">22</div>
                            <div className="dev_name">今日新增设备 </div>
                        </Col>
                        <Col span={8} className="dev_itme">
                            <div className="dev_num">28</div>
                            <div className="dev_name">故障设备</div>
                        </Col>
                        <Col span={8} className="dev_itme">
                            <div className="dev_num">283/310</div>
                        <div className="dev_name">在线设备</div>
                        </Col>
                    </Row>
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