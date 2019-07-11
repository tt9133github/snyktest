//report页面所需样式
export const hBarOption = {
    title: {
        x: 'center',
        text: '',
        subtext: '',
    },
    color: [
                    "#c23531",
                    "#0090B0",
                    "#BCD4E3",
                    "#336699",
                    "#2f4554",
                    "#c4ccd3",
                ],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        top: '10%',
        left: '3%',
        right: '6%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['']
    },
    series: [{
        name: '',
        type: 'bar',
        label: {
            normal: {
                show: true,
                position: 'right'
            }
        },
        data: [0],
        barWidth: 30,
        itemStyle: {
            //通常情况下：
            normal: {　　　　　　　　　　　　 //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                    var colorList = ['#0090B0', 'rgb(0,166,90)', 'rgb(243,156,18)', 'rgb(221,75,57)'];
                    return colorList[params.dataIndex];
                }
            }
        }
                }]
};
export const pieOption = {
    title: {
        x: 'center',
        text: '',
        subtext: '',
    },
    color: [
                    "#003366",
                    "#cccc99",
                    "#BCD4E3",
                    "#336699",
                    "#2f4554",
                    "#c4ccd3",
                    "#0088C7",
                    "#87CEEB",
                    "#6e7074",
                    "#546570",
                    "#0090B0",
                    "#99cccc",
                    "#06B9D1",
                ],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'horizontal',
        x: 'center',
        y: 'bottom',
        data: []
    },
    toolbox: {
        show: true,
        feature: {
            mark: {
                show: false
            },
            dataView: {
                show: false,
                readOnly: false
            },
            magicType: {
                show: false,
                type: ['pie', 'funnel']
            },
            restore: {
                show: false
            },
            saveAsImage: {
                show: true
            }
        }
    },
    calculable: false,
    series: [{
            name: '',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, 55],

            // for funnel
            x: '20%',
            width: '40%',
            funnelAlign: 'right',
            max: 1,

            itemStyle: {
                normal: {
                    label: {
                        position: 'inner'
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            data: []
                    },
        {
            name: '',
            type: 'pie',
            radius: [80, 120],
            // for funnel
            x: '60%',
            width: '35%',
            funnelAlign: 'left',
            max: 1548,

            data: []
                    }
                ]
};

export const vBarOption = {
    title: {
        x: 'center',
        text: '',
        subtext: '',
    },
    color: [
                    "#759FBD",
                    "#87CEEB",
                    "#2f4554",
                    "#c4ccd3",
                ],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
            var tar = params[1];
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '5%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        splitLine: {
            show: false
        },
        data: ['']
                }],
    yAxis: [{
        type: 'value'
                }],
    series: [{
            name: '剩余文件数',
            type: 'bar',
            stack: '总量',
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: [0]
                    },
        {
            name: '克隆文件数',
            type: 'bar',
            stack: '总量',
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top'
                    }
                }
            },
            data: [0]
                    }
                ]
}
export const radarOption = {
    title: {},
    tooltip: {

    },
    legend: {

    },
    color: [

                    "#0088C7",
                    "#0090B0",
                    "#336699",
                    "#2f4554",
                    "#c4ccd3",
                    "#87CEEB",
                    "#99cccc",
                    "#06B9D1",
                    "#B9DCED",
                ],
    toolbox: {
        show: true,
        feature: {
            mark: {
                show: true
            },
            dataView: {
                show: true,
                readOnly: false
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    calculable: true,
    polar: [{
        indicator: [
                    ],
        radius: 130
                }],
    series: [{
        name: '',
        type: 'radar',
        itemStyle: {
            normal: {
                areaStyle: {
                    type: 'default'
                }
            }
        },
        data: [{
            value: [],
            name: ''
                    }]
                }]
};
export const errorBarOption = {
    title: {
        x: 'center',
        //        text: '检测项目代码缺陷风险分析',
        //        subtext: 'Code defect risk analysis',
    },
    tooltip: {
        trigger: 'item'
    },
    //    toolbox: {
    //        show: true,
    //        feature: {
    //            dataView: {
    //                show: true,
    //                readOnly: false
    //            },
    //            restore: {
    //                show: true
    //            },
    //            saveAsImage: {
    //                show: true
    //            }
    //        }
    //    },
    calculable: true,
    grid: {
        borderWidth: 0,
        y: 80,
        y2: 60
    },
    xAxis: [{
        type: 'category',
        show: false,
        data: ['Line', 'Bar', 'Scatter', 'K', 'Pie', 'Radar', 'Chord', 'Force', 'Map', 'Gauge', 'Funnel']
                }],
    yAxis: [{
        type: 'value',
        show: true,
        data: []
                }],
    series: [{
        name: '代码缺陷风险分析',
        type: 'bar',
        itemStyle: {
            normal: {
                color: function (params) {
                    var colorList = ['#0090B0', 'rgb(0,166,90)', 'rgb(243,156,18)', 'rgb(221,75,57)'];
                    return colorList[params.dataIndex];
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{b}\n{c}'
                }
            }
        },
        data: []
                }]
};

export const simPieOption = {
    title: {
      text: ""
    },
    tooltip: {
        trigger: 'item',
        formatter: "{b} <br/> {c} ({d}%)"
    },
    legend: {
        orient: 'horizontal',
        icon: 'circle',
        x: 'left',
        y: 'center',
        orient: 'vertical',
        /*right: 100,*/
        data: ['旅游客运', '班线客运', '普货', '危险品']
    },
    series: [
        {
            name: '克隆详情',
            type: 'pie',
            center: ['60%', '50%'],
            radius: ['30%', '40%'],
            label: {
                normal: {
                    formatter: ' {b|{b}：}\n{hr|}\n{c} {per|{d}%}  ',
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 12,
                            align: 'center'
                        },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 12,
                            lineHeight: 22
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            data: [
                {
                    value: 348,
                    name: '旅游客运'
                },
                {
                    value: 251,
                    name: '班线客运'
                },
                {
                    value: 147,
                    name: '普货'
                },
                {
                    value: 102,
                    name: '危险品'
                }
            ]
        }
    ]
};
