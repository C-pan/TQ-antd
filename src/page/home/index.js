import React, { Component } from 'react';
import '../../style/common.css'
import './index.css'

var echarts = require('echarts');
export default class Home extends React.Component {
    componentDidMount(){
       this.showECharts()
    }
    showECharts(){
        // 图表高度兼容问题
        var wHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var sHeight = document.getElementById('statistics_line').offsetHeight;
        document.getElementById('statistics_line').style.height = (wHeight - 320) + "px";
        var myChart = echarts.init(document.getElementById('statistics_line'));
        var option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['设备', '订单']
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
                    name: '设备',
                    type: 'line',
                    stack: '总量',
                    data: [320, 332, 301, 334, 390, 320, 332, 301, 320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 330, 320]
                }, {
                    name: '订单',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 820, 932, 901, 820, 932, 901, 934, 1290, 820, 932, 901, 934, 1290, 820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    render() {
        return (
            <div className="content-box clearfix    "> 
                <div class="info_box ">
                    <div class="info_itme">
                        <div class="info_icon dev_bg">
                            <img src="/assets/images/icons/dev.png" alt="" />
                        </div>
                        <div class="info_num">283/310</div>
                        <div class="info_name">在线设备</div>
                    </div>
                    <div class="info_itme">
                        <div class="info_icon today_bg"><img  src="/assets/images/icons/today.png" alt="" /></div>
                        <div class="info_num">283/310</div>
                        <div class="info_name">今天收益</div>
                    </div>
                    <div class="info_itme">
                        <div class="info_icon yseterday_bg"><img  src="/assets/images/icons/yseterday.png" alt="" /></div>
                        <div class="info_num">283/310</div>
                        <div class="info_name">昨日收益</div>
                    </div>
                    <div class="info_itme">
                        <div class="info_icon total_bg"><img  src="/assets/images/icons/total_mon.png" alt="" /></div>
                        <div class="info_num">283/310</div>
                        <div class="info_name">总收益</div>
                    </div>
                </div> 

                <div id="statistics_line">

                </div>
            </div>
        )
    }
}