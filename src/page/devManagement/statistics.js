import React from 'react';
import {Row,Col} from 'antd';
import '../../style/common.css'
import axios from '../../axios'
import './index.css'
import echarts from 'echarts'
var  myChart=null;
export default class Order extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            DateType: 'week',
            EChartsData:[],
            categories:[]
        }
    }
    
    componentDidMount = () => {
        this.getEChartsData(this.state.DateType)
    };
    componentDidMount=()=>{
        var that=this;
        this.showECharts()
        this.upECharsData()
    }
    getEChartsData(type){
        var that=this;
        // /apiproduct/terminalcount ? uid = 2 & type= month

        axios.ajax({
            url: '/api/apiproduct/terminalcount',
            data: {
                params: {
                    uid: '2',
                    type: type || 'week'
                }
            }
        }).then((res) => {
            console.log(res.categories)
            that.setState({
                categories: res.categories,
                EChartsData: res.data
            }) 
            
        }) 
    }
    showECharts() {
        var that=this;
        // 图表高度兼容问题
        var wHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var sHeight = document.getElementById('dev_statistics').offsetHeight;
        document.getElementById('dev_statistics').style.height = (wHeight - 320) + "px";
        myChart = echarts.init(document.getElementById('dev_statistics'));
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
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [

                {
                    name: '订单数量数量',
                    type: 'line',
                    stack: '总量',
                    data: []
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    upECharsData = (DateType)=>{
        var that = this;
        var DateType = DateType || this.state.DateType;
        myChart.setOption({
            xAxis: {
                data: that.state.categories
            },
            series: [{
                // 根据名字对应到相应的系列

                data: that.state.EChartsData
            }]
        });
        if (DateType== "month") {
            myChart.setOption({
                legend: {
                    data: ['故障', '新增']
                },
                series: [{
                    name: '故障',
                    type: 'line',
                    data: [30, 22, 91, 34, 120, 20, 32, 12, 80, 42, 91, 94, 29, 80, 32, 11, 94, 120, 82, 32, 21, 94, 120, 130, 130]
                }, {
                    name: '新增',
                    type: 'line',
                    data: [320, 432, 901, 934, 120, 820, 932, 981, 820, 932, 901, 934, 390, 820, 932, 901, 634, 290, 820, 932, 901, 934, 1290, 1330, 1320]
                }]
            }); 
        } else if (DateType == "week") {
            myChart.setOption({
                legend: {
                    data: ['故障', '新增']
                },
                series: [{
                    name: '故障',
                    type: 'line',
                    data: [80, 932, 91, 94, 120, 80, 32, 11, 80, 92, 91, 94, 129, 80, 92, 91, 94, 120, 82, 32, 91, 34, 120, 130, 130]
                }, {
                    name: '新增',
                    type: 'line',
                    data: [820, 932, 901, 934, 1290, 820, 932, 901, 820, 932, 901, 934, 1290, 820, 932, 901, 934, 1290, 820, 932, 901, 934, 1290, 1330, 1320]
                }]
            });
        }
        ;
    }
    SwitchDate=(e)=>{
        var that=this;
        var DateType= e.target.getAttribute("data-datetype")
        this.setState({
            DateType: DateType
        })
        this.upECharsData(DateType)
             
    }
    render(){
        return(
            <div className="content-box-t clearfix    ">
                <div className="dev_box">
                    <Row>
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
                        <li className={this.state.DateType == 'week' ? 'active' : ''} onClick={this.SwitchDate} data-datetype="week" id="day">最近15天</li>
                        <li className={this.state.DateType == 'month' ? 'active' : ''} onClick={this.SwitchDate} data-datetype="month" id="one-month">最近30天</li>
                    </ul>
                    <div id="dev_statistics"   className="oroder_statistics">

                    </div>
                </div>
            </div>
        )
    }
}