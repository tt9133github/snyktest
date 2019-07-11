var echarts = require('echarts');
import {
  pieOption,
  vBarOption,
  hBarOption,
  radarOption,
  simPieOption,
  errorBarOption,
} from './chartConst.js';
//import './echarts.min.js';
//init pie for taskcomponent page
export function initChartPie(chartPie, chartPieId, chartData) {
  var chartPieDom = document.getElementById(chartPieId);
  if (chartPieDom != null) {
    chartPie = echarts.init(chartPieDom);

    var chartPieOption = deepCopy(pieOption);
    var project_list = chartData.project_list;
    var clone_files = chartData.clone_files;
    var own_fliles = chartData.valid_files - clone_files;
    var project_name = [];
    var projects = [];
    //将项目名插入数组，作为图例名称
    project_name.push(
      chartData.name
    );
    for (var i = 0; i < project_list.length; i++) {
      project_name.push(
        project_list[i].project_name
      );
    }
    ;
    //将原创代码的文件数量及项目名称插入数组projects
    projects.push({
      value: own_fliles,
      name: chartData.name,
    });
    //将克隆文件匹配到的开源项目及匹配文件数量，插入数组projects
    for (var i = 0; i < project_list.length; i++) {
      projects.push({
        name: project_list[i].project_name,
        value: project_list[i].match_number,
      })
    }
    ;
    //pie的内环数据，赋值给datapie数组
    var datapie = [{
      value: own_fliles,
      name: '原创代码',
      selected: true
    },
      {
        value: clone_files,
        name: '克隆代码',
      },
    ];

    // 为echarts的Pie图例赋值：project_name数组
    chartPieOption.legend.data = project_name;
    // 为echarts的pie赋值第一组data数据，内圆数据：datapie数组
    chartPieOption.series[0].data = datapie;
    //为echarts的pie赋值第二组datas数据，外    chartPie = echarts.init(chartPieDom); 环数据： projects数组

    chartPieOption.series[1].data = projects;

    //将加载动态数据的option传给componentPie
    chartPie.setOption(chartPieOption);

  }
}

//init bar for taskcomponent page
export function initChartBar(chartBar, chartBarId, chartData) {

  var chartBarDom = document.getElementById(chartBarId);
  if (chartBarDom != null) {
    chartBar = echarts.init(chartBarDom);

    var chartBarOption = deepCopy(vBarOption);
    var project_list = chartData.project_list;
    var clone_files = chartData.clone_files;
    var own_fliles = chartData.valid_files - clone_files;
    var project_name = [];
    //将项目名插入数组，作为图例名称
    project_name.push(
      chartData.name
    );
    for (var i = 0; i < project_list.length; i++) {
      project_name.push(
        project_list[i].project_name
      );
    }
    ;

    //为componentBar加载动态数据
    //echarts图例动态数据：project_name数组
    var bar_legend = project_name;
    //克隆文件数量，echart图中的series[1].data
    var data_clone = [];
    data_clone[0] = clone_files;
    for (var i = 0; i < project_list.length; i++) {
      data_clone.push(
        project_list[i].match_number
      );
    }
    //bar的差值，echart图中的series[0].data
    var data_value = [];
    data_value[0] = 0;
    data_value[1] = clone_files - data_clone[1];
    for (var i = 1; i < project_list.length; i++) {
      data_value.push(
        data_value[i] - data_clone[i + 1]
      );
    }
    //为echarts的bar图例赋值：project_name数组
    chartBarOption.xAxis[0].data = bar_legend;
    //为ec为echarts的bar加载第一组data：data_value
    chartBarOption.series[0].data = data_value;
    //为ec为echarts的bar加载第二组data：data_clone;
    //为ec为echarts的bar加载第二组data：data_clone
    chartBarOption.series[1].data = data_clone;
    chartBar.setOption(chartBarOption);
  }
}

//init bar for commoncomponent page
export function initChartBarVul(chartBar, chartBarId, chartData) {
  var chartBarDom = document.getElementById(chartBarId);
  if (chartBarDom != null) {
    chartBar = echarts.init(chartBarDom);
    var chartBarOption = deepCopy(hBarOption);
    var dataChart = [chartData.info.vul_unknown, chartData.info.vul_low, chartData.info.vul_mid, chartData.info.vul_high]
    chartBarOption.yAxis.data = ['未评级', '低风险', '中风险', '高风险'];
    chartBarOption.series[0].itemStyle.normal.color = function (params) {
      var colorList = ['#0090B0', 'rgb(0,166,90)', 'rgb(243,156,18)', 'rgb(221,75,57)'];
      return colorList[params.dataIndex];
    };
    chartBarOption.series[0].data = dataChart;
    chartBarOption.series[0].name = '漏洞数';
    chartBar.setOption(chartBarOption);
  }
}

//init bar for commoncomponent page
export function initChartBarLib(chartBar, chartBarId, chartData, useType) {
  var chartBarDom = document.getElementById(chartBarId);
  if (chartBarDom != null) {
    chartBar = echarts.init(chartBarDom);

    var chartBarOption = deepCopy(hBarOption);
    var dataChart = [chartData.whole_vul_num - chartData.vul_low_num - chartData.vul_medium_num - chartData.vul_high_num,
      chartData.vul_low_num, chartData.vul_medium_num, chartData.vul_high_num];
    //report用途设置样式,报告用途：useType为1，其他为0
    if (useType == 1) {
      chartBarOption.yAxis.axisLabel = {
        show: true,
        textStyle: {
          fontSize: 20,
        }
      };
      chartBarOption.xAxis.axisLabel = {
        show: true,
        textStyle: {
          fontSize: 20,
        }
      };
      chartBarOption.series[0].label.normal.textStyle = {
        fontSize: 20,
      };
    }
    ;
    chartBarOption.yAxis.data = ['无风险组件', '低风险组件', '中风险组件', '高风险组件'];
    chartBarOption.series[0].itemStyle.normal.color = function (params) {
      var colorList = ['#0090B0', 'rgb(0,166,90)', 'rgb(243,156,18)', 'rgb(221,75,57)'];
      return colorList[params.dataIndex];
    };
    chartBarOption.series[0].data = dataChart;
    chartBarOption.series[0].name = '组件数';
    chartBar.setOption(chartBarOption);
    return chartBar;
  }
}

//init radar for commoncomponentdetail page
export function initRadar(chartRadar, chartRadarId, chartData) {
  var chartRadarDom = document.getElementById(chartRadarId);
  if (chartRadarDom != null) {
    chartRadar = echarts.init(chartRadarDom);
    var chartRadarOption = deepCopy(radarOption);

    var security = 0;
    if (chartData.security == null)
      security = 0;
    else
      security = security + chartData.security;

    var watching = 0;
    if (chartData.watching == null)
      watching = 0;
    else
      watching = watching + chartData.watching;

    var maintance = 0;
    if (chartData.maintance == null)
      maintance = 0;
    else
      maintance = maintance + chartData.maintance;

    var activity = 0;
    if (chartData.activity == null)
      activity = 0;
    else
      activity = activity + chartData.activity;

    var friendliness = 0;
    if (chartData.friendliness == null)
      friendliness = 0;
    else
      friendliness = friendliness + chartData.friendliness;

    var dataChart = [security, watching, maintance, activity, friendliness];

    chartRadarOption.polar[0].indicator = [{
      text: '安全性',
      max: 100,
      min: -20
    }, {
      text: '关注度',
      max: 100,
      min: -20
    }, {
      text: '可维护性',
      max: 100,
      min: -20
    }, {
      text: '活跃度',
      max: 100,
      min: -20
    }, {
      text: '使用友好性',
      max: 100,
      min: -20
    }];
    chartRadarOption.series[0].name = '质量指标';
    chartRadarOption.series[0].data[0] = dataChart;
    chartRadar.setOption(chartRadarOption);
  }
}

//init pie for clone detail
export function initsimPie(chartPie, chartPieId, chartData, useType) {
  var chartPieDom = document.getElementById(chartPieId);
  if (chartPieDom != null) {
    chartPie = echarts.init(chartPieDom);
    //console.log("chartPie in util:" + chartPie);
    var chartPieOption = deepCopy(simPieOption);
    chartPieOption.color = ["#FFDB5C", "#67E0E3", "#FF9F7F", "#1089C7", "#c75bbd",];
    //判断，如果用途为报告（useType为1），设置字体大小
    if (useType == 1) {
      chartPieOption.series[0].label.normal.textStyle = {
        fontSize: 20
      };
      chartPieOption.legend.x = "center";
      chartPieOption.legend.y = "bottom";
      chartPieOption.legend.orient = "horizontal";
      chartPieOption.series[0].center = ["20%", "20%"];
      chartPieOption.title.text = "代码数量克隆度分析";
    }
    var clone_files_data = [{
      value: chartData.hash_prog_main_files,
      name: '原文件匹配'
    },
      {
        value: chartData.clone_file_files,
        name: '文件级克隆'
      },
      {
        value: chartData.clone_fragment_files,
        name: '代码级克隆'
      },
      {
        value: chartData.valid_files + chartData.filter_files - chartData.clone_fragment_files - chartData.clone_file_files - chartData.hash_prog_main_files - chartData.empty_files_main,
        //valid_files + filter_files - （clone_file_files + clone_fragment_files + hash_prog_main_files） - empty_files_main
        name: '原创'
      },
      {
        value: chartData.empty_files_main,
        name: '过滤文件'
      },

    ];
    var legend_data = ['原文件匹配', '文件级克隆', '代码级克隆', '原创', '过滤文件',];
    //为filesNumberPie中的option添加动态数据：clone_files_data
    chartPieOption.series[0].data = clone_files_data;
    chartPieOption.legend.data = legend_data;
    chartPie.setOption(chartPieOption);


    return chartPie;
  }
}

//init pie for clone detail
export function initLinePie(chartPie, chartPieId, chartData, useType) {
  var chartPieDom = document.getElementById(chartPieId);
  if (chartPieDom == null) {
    return;
  }
  chartPie = echarts.init(chartPieDom);
  var chartPieOption = deepCopy(simPieOption);
  chartPieOption.color = ["#FFDB5C", "#67E0E3", "#FF9F7F", "#1089C7", "#c75bbd",];
  if (useType == 1) {
    chartPieOption.legend.x = "center";
    chartPieOption.legend.y = "bottom";
    chartPieOption.legend.orient = "horizontal";
    chartPieOption.series[0].center = ["50%", "50%"];
    chartPieOption.series[0].label.normal.textStyle = {
      fontSize: 20
    };
    chartPieOption.title.text = "代码行数克隆度分析";
  }

  var clone_files_data = [{
    value: chartData.hash,
    name: '原文件匹配'
  },
    {
      value: chartData.file,
      name: '文件级克隆'
    },
    {
      value: chartData.fragment,
      name: '代码级克隆'
    },
    {
      value: chartData.origin,
      name: '原创'
    }

  ];
  var legend_data = ['原文件匹配', '文件级克隆', '代码级克隆', '原创'];
  //为filesNumberPie中的option添加动态数据：clone_files_data
  chartPieOption.series[0].data = clone_files_data;
  chartPieOption.legend.data = legend_data;
  chartPie.setOption(chartPieOption);
  return chartPie;

}

//init pie for project clone detail
export function initsimPieproject(chartPie, chartPieId, chartData, useType) {
  var chartPieDom = document.getElementById(chartPieId);
  if (chartPieDom != null) {
    chartPie = echarts.init(chartPieDom);
    //console.log("chartPie in util:" + chartPie);
    var chartPieOption = deepCopy(simPieOption);
    chartPieOption.color = ["red", "#ed5fe9", "#FF9F7F", "#67c23a", "#336699", "#0088C7","#67E0E3"];
    //判断，如果用途为报告（useType为1），设置字体大小
    if (useType == 1) {
      chartPieOption.legend.x = "center";
      chartPieOption.legend.y = "bottom";
      chartPieOption.legend.orient = "horizontal";
      chartPieOption.series[0].center = ["50%", "50%"];
      chartPieOption.series[0].label.normal.textStyle = {
        fontSize: 20
      };
      chartPieOption.title.text = "软件工程文件数量克隆度分析";
    }
    if(window.devicePixelRatio >= 1.5){
        chartPieOption.legend.x = "left";
        chartPieOption.legend.y = "top";
        chartPieOption.series[0].center = ["60%", "60%"];
    }


    var clone_files_data = [{
      value: chartData.clone_file_files + chartData.clone_fragment_files + chartData.hash_prog_main_files,
      name: '检测语言克隆'
    },
      {
        value: chartData.hash_prog_no_main_files,
        name: '其它语言克隆'
      },
      {
        value: chartData.hash_no_prog_files,
        name: '其他文件克隆'
      }, {
        value: chartData.valid_files + chartData.filter_files - (chartData.clone_file_files + chartData.clone_fragment_files + chartData.hash_prog_main_files) - chartData.empty_files_main,
        name: '检测语言原创'
      },
      {
        value: chartData.program_files - chartData.valid_files - chartData.filter_files - chartData.hash_prog_no_main_files - (chartData.empty_files_prog - chartData.empty_files_main),
        name: '其它语言原创'
      },
      {
        value: chartData.all_files - chartData.program_files - chartData.hash_no_prog_files - chartData.empty_files_no_prog - chartData.small_unjudged_files,
        name: '其他文件原创'
      },
      {
        value: chartData.empty_files,
        name: '总过滤文件'
      },
    ];
    var legend_data = ['检测语言克隆', '其它语言克隆', '其他文件克隆', '检测语言原创', '其它语言原创', '其他文件原创', '总过滤文件'];
    //为filesNumberPie中的option添加动态数据：clone_files_data
    chartPieOption.series[0].data = clone_files_data;
    chartPieOption.legend.data = legend_data;
    chartPie.setOption(chartPieOption);
    return chartPie;
  }
}

//init pie for project clone total
export function initPrjTotalClone(chartPie, chartPieId, clone_files, all_files, useType) {
  var chartPieDom = document.getElementById(chartPieId);
  if (chartPieDom != null) {
    chartPie = echarts.init(chartPieDom);
    var chartPieOption = deepCopy(simPieOption);
    chartPieOption.color = [
      "red","#67c23a", "#336699", "#0088C7","#67E0E3"
    ];
    //判断，如果用途为报告（useType为1），设置字体大小
    if (useType == 1) {
      chartPieOption.legend.x = "center";
      chartPieOption.legend.y = "bottom";
      chartPieOption.legend.orient = "horizontal";
      chartPieOption.series[0].center = ["50%", "50%"];
      chartPieOption.series[0].label.normal.textStyle = {
        fontSize: 20
      };
      chartPieOption.title.text = "项目克隆情况总览";
    }
    ;

    var clone_size_data = [{
      value: clone_files,
      name: '克隆文件总数'
    },
      {
        value: all_files - clone_files,
        name: '原创文件数'
      },
    ];
    var legend_data = ['克隆文件总数', '原创文件数'];

    chartPieOption.series[0].data = clone_size_data;
    chartPieOption.legend.data = legend_data;
    chartPie.setOption(chartPieOption);
    return chartPie;
  }
}

//init pie for project clone detail
export function initsimPiesizeproject(chartPie, chartPieId, chartData, useType) {
  var chartPieDom = document.getElementById(chartPieId);
  if (chartPieDom != null) {
    chartPie = echarts.init(chartPieDom);
    var chartPieOption = deepCopy(simPieOption);
    chartPieOption.color = [
//                    "#B9DCED",
//                    "#0090B0",
//                    "#336699",
//                    "#2f4554",
//                    "#c4ccd3",
//                    "#87CEEB",
//                    "#99cccc",
//                    "#06B9D1",
//                    "#0088C7",
      "red", "#ed5fe9", "#FF9F7F", "#67c23a", "#336699", "#0088C7","#67E0E3"
    ];
    //判断，如果用途为报告（useType为1），设置字体大小
    if (useType == 1) {
      chartPieOption.legend.x = "center";
      chartPieOption.legend.y = "bottom";
      chartPieOption.legend.orient = "horizontal";
      chartPieOption.series[0].center = ["50%", "50%"];
      chartPieOption.series[0].label.normal.textStyle = {
        fontSize: 20
      };
      chartPieOption.title.text = "软件工程文件容量克隆度分析";
    }
    ;
    if(window.devicePixelRatio >= 1.5){
      chartPieOption.legend.x = "left";
      chartPieOption.legend.y = "top";
      chartPieOption.series[0].center = ["60%", "60%"];
    }
    var clone_size_data = [{
      value: ((chartData.clone_file_size + chartData.clone_fragment_size + chartData.hash_prog_main_size) / 1024).toFixed(2),
      name: '检测语言克隆(KB)'
    },
      {
        value: ((chartData.program_size - chartData.valid_size - chartData.filter_size - chartData.hash_prog_no_main_size - (chartData.empty_files_prog_size - chartData.empty_files_main_size))
          / 1024).toFixed(2),
        name: '其它语言克隆(KB)'
      },
      {
        value: (chartData.hash_no_prog_size / 1024).toFixed(2),
        name: '其他文件克隆(KB)'
      }, {
        value: ((chartData.valid_size + chartData.filter_size - (chartData.clone_file_size + chartData.clone_fragment_size + chartData.hash_prog_main_size) - chartData.empty_files_main_size) / 1024).toFixed(2),
        name: '检测语言原创(KB)'
      },
      {
        value: ((chartData.hash_prog_no_main_size)
          / 1024).toFixed(2),
        name: '其它语言原创(KB)'
      },

      {
        value: ((chartData.all_size - chartData.program_size - chartData.hash_no_prog_size - chartData.empty_files_no_prog_size - chartData.small_unjudged_file_size)
          / 1024).toFixed(2),
        name: '其他文件原创(KB)'
      },
      {
        value: (chartData.empty_files_size / 1024).toFixed(2),
        name: '总过滤文件(KB)'
      },
    ];
    var legend_data = ['检测语言克隆(KB)', '其它语言克隆(KB)', '其他文件克隆(KB)', '检测语言原创(KB)', '其它语言原创(KB)', '其他文件原创(KB)',  '总过滤文件(KB)'];

    chartPieOption.series[0].data = clone_size_data;
    chartPieOption.legend.data = legend_data;
    chartPie.setOption(chartPieOption);
    return chartPie;
  }
}

//init pie for clone detail
export function initsimPiesize(chartPie, chartPieId, chartData, useType) {
  var chartPieDom = document.getElementById(chartPieId);
  if (chartPieDom != null) {
    chartPie = echarts.init(chartPieDom);
    var chartPieOption = deepCopy(simPieOption);
    chartPieOption.color = ["#FFDB5C", "#67E0E3", "#FF9F7F", "#0088C7", "#ed59e8"];
    //判断，如果用途为报告（useType为1），设置字体大小
    if (useType == 1) {
      chartPieOption.legend.x = "center";
      chartPieOption.legend.y = "bottom";
      chartPieOption.legend.orient = "horizontal";
      chartPieOption.series[0].center = ["50%", "50%"];
      chartPieOption.series[0].label.normal.textStyle = {
        fontSize: 20
      };
      chartPieOption.title.text = "代码容量克隆度分析";
    }
    if(window.devicePixelRatio >= 1.5){
      chartPieOption.legend.x = "left";
      chartPieOption.legend.y = "top";
      chartPieOption.series[0].center = ["60%", "60%"];
    }

    var clone_size_data = [{
      value: ((chartData.hash_prog_main_size) / 1024).toFixed(2),
      name: '原文件匹配(KB)'
    }, {
      value: ((chartData.clone_file_size) / 1024).toFixed(2),
      name: '文件级克隆(KB)'
    },
      {
        value: ((chartData.clone_fragment_size) / 1024).toFixed(2),
        name: '代码级克隆(KB)'
      },
      {
        value: ((chartData.valid_size + chartData.filter_size - chartData.empty_files_main_size - (chartData.clone_file_size + chartData.clone_fragment_size + chartData.hash_prog_main_size)) / 1024).toFixed(2),
        name: '原创(KB)'
      },
      {
        value: ((chartData.empty_files_main_size) / 1024).toFixed(2),
        name: '过滤文件(KB)'
      }
    ];
    var legend_data = ['原文件匹配(KB)', '文件级克隆(KB)', '其他文件克隆(KB)', '代码级克隆(KB)', '原创(KB)', '过滤文件(KB)'];
    chartPieOption.series[0].data = clone_size_data;
    chartPieOption.legend.data = legend_data;
    chartPie.setOption(chartPieOption);
    return chartPie;
  }
}

//init bar for code error
export function initErrorBar(chartBar, chartBarId, chartData) {
  var chartBarDom = document.getElementById(chartBarId);
  if (chartBarDom != null) {
    chartBar = echarts.init(chartBarDom);
    var chartBarOption = deepCopy(errorBarOption);
    chartBarOption.xAxis[0].data = ['高风险缺陷', '中风险缺陷', '低风险缺陷'];
    chartBarOption.series[0].itemStyle.normal.color = function (params) {
      var colorList = ['rgb(221,75,57)', 'rgb(243,156,18)', 'rgb(0,166,90)'];
      return colorList[params.dataIndex];
    };
    var error_high = chartData.error_high == null ? 0 : chartData.error_high;
    var error_mid = chartData.error_mid == null ? 0 : chartData.error_mid;
    var error_low = chartData.error_low == null ? 0 : chartData.error_low;

    var dataChart = [
      {
        name: '高风险缺陷',
        value: error_high
      },
      {
        name: '中风险缺陷',
        value: error_mid
      },
      {
        name: '低风险缺陷',
        value: error_low
      }];
    chartBarOption.series[0].data = dataChart;
    chartBar.setOption(chartBarOption);
  }
}


//init pie for task_info
export function initsimPie2(chartPie, chartPieId, chartData, chartData2) {
  var chartPieDom = document.getElementById(chartPieId);
  if (chartPieDom != null) {
    chartPie = echarts.init(chartPieDom);
    var chartPieOption = deepCopy(pieOption);
    chartPieOption.title.text = '检测项目有效文件分析';
    chartPieOption.title.subtext = 'Effective document analysis';
    chartPieOption.series[0].name = '文件类型';
    chartPieOption.series[1].name = '文件类型';

    //针对有效文件分析
    var validFilesGraph_index = [];
    var validFilesGraph_data = [];

    //获取有效文件分析Pie数据
    //计算出主体语言有效文件数量，并将数据放在数组第一个，符合Pie的展示规范
    for (var i = 0; i < chartData.length; i++) {
      if (chartData[i].flag == 1) {
        validFilesGraph_data[0] = {
          value: parseInt(chartData[i].language_files) - chartData2.filter_files,
          name: chartData[i].language,
        }
        validFilesGraph_index[0] = chartData[i].language;
      }
    }
    ;
    //将其他语言数据插入数组
    for (var i = 0; i < chartData.length; i++) {
      if (chartData[i].flag == 0) {
        validFilesGraph_data.push({
          'value': parseInt(chartData[i].language_files),
          'name': chartData[i].language,
        })
        validFilesGraph_index.push(
          chartData[i].language
        )
      }
    }
    ;
    //将过滤的小文件数据插入数组
    validFilesGraph_data.push({
      'value': chartData2.filter_files,
      'name': '过滤' + chartData2.language + '文件',
    })
    var filter_index = '过滤' + chartData2.language + '文件';
    validFilesGraph_index.push(filter_index);

    //图形相关--检测项目有效文件分析pie--有效文件和其它文件
    var valid_files_num = chartData2.valid_files;
    var other_files_num = (chartData2.all_files - chartData2.valid_files);

    var validFile_inner_data = [{
      value: valid_files_num,
      name: '有效文件',
      selected: true
    },
      {
        value: other_files_num,
        name: '非有效文件'
      },
    ];

    //为有效文件validFilePie饼状图加载动态数据
    chartPieOption.series[1].data = validFilesGraph_data;
    chartPieOption.series[0].data = validFile_inner_data;
    //为有效文件validFilePie饼状图加载图例数据
    chartPieOption.legend.data = validFilesGraph_index;
    chartPie.setOption(chartPieOption);
  }
}

//init bar for task component
export function initChartBarElement(chartBar, chartBarId, chartData, useType) {
  var chartBarDom = document.getElementById(chartBarId);
  if (chartBarDom == null) {
    return;
  }
  chartBar = echarts.init(chartBarDom);
  //console.log("chartBar in util:" + chartBar);
  var chartBarOption = deepCopy(hBarOption);
  chartBarOption.title.subtext = '文件数量（个）';
  chartBarOption.title.x = 'center';
  chartBarOption.series[0].barWidth = null;

  var data = [];
  var index = [];
  for (var i = 0; i < chartData.length; i++) {
    data.push({
      'value': chartData[i].files,
      'name': chartData[i].name,
    })
    index.push(
      chartData[i].name
    )
  }

  chartBarOption.yAxis.data = index;
  chartBarOption.series[0].data = data;
  chartBarOption.series[0].name = '文件数';
  //report用途设置样式,报告用途：useType为1，其他为0
  if (useType == 1) {
    chartBarOption.yAxis.axisLabel = {
      show: true,
      textStyle: {
        fontSize: 20,
      }
    };
    chartBarOption.xAxis.axisLabel = {
      show: true,
      textStyle: {
        fontSize: 20,
      }
    };
    chartBarOption.series[0].label.normal.textStyle = {
      fontSize: 20,
    };
    chartBarOption.title.text = '文件数量（个）';
    chartBarOption.title.subtext = '';
  }
  ;

  chartBarOption.series[0].itemStyle.normal.color = function (params) {
    var colorList = [
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
      "#06B9D1"];
    return colorList[params.dataIndex];
  };
  if (useType != 1) {
    var hPercent = 3;
    if (chartData.length < 10)
      hPercent = 8 * (10 - chartData.length);

    chartBarOption.grid = {
      left: '0%',
      right: '8%',
      top: '40px',
      bottom: hPercent + '%',
      containLabel: true
    };
  }
  ;

  chartBar.setOption(chartBarOption);

  return chartBar;
}

//init bar for task component
export function initChartBarElemensize(chartBar, chartBarId, chartData, useType) {
  var chartBarDom = document.getElementById(chartBarId);
  if (chartBarDom != null) {
    chartBar = echarts.init(chartBarDom);
    var chartBarOption = deepCopy(hBarOption);
    chartBarOption.title.subtext = '文件容量（KB）';
    chartBarOption.title.x = 'center';
    chartBarOption.series[0].barWidth = null;
    //report用途设置样式,报告用途：useType为1，其他为0
    if (useType == 1) {
      chartBarOption.yAxis.axisLabel = {
        show: true,
        textStyle: {
          fontSize: 20,
        }
      };
      chartBarOption.xAxis.axisLabel = {
        show: true,
        textStyle: {
          fontSize: 20,
        }
      };
      chartBarOption.series[0].label.normal.textStyle = {
        fontSize: 20,
      };
      chartBarOption.title.text = '文件容量（KB）';
      chartBarOption.title.subtext = '';
    }
    ;
    var data = [];
    var index = [];
    for (var i = 0; i < chartData.length; i++) {

      data.push({
        'value': chartData[i].size,
        'name': chartData[i].name,
      })
      index.push(
        chartData[i].name
      )

    }
    ;
    chartBarOption.yAxis.data = index;
    chartBarOption.series[0].data = data;
    chartBarOption.series[0].name = '文件容量';

    if (useType != 1) {
      var hPercent = 3;
      if (chartData.length < 10)
        hPercent = 8 * (10 - chartData.length);

      chartBarOption.grid = {
        left: '0%',
        right: '5%',
        top: '40px',
        bottom: hPercent + '%',
        containLabel: true
      };
    }
    ;
    chartBarOption.series[0].itemStyle.normal.color = function (params) {
      var colorList = [
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
        "#06B9D1"];
      return colorList[params.dataIndex];
    };
    chartBar.setOption(chartBarOption);
    return chartBar;


  }
}

//init bar for license-detail page
export function initLicenseBar(chartBar, chartBarId, chartData, useType) {
  var chartBarDom = document.getElementById(chartBarId);
  if (chartBarDom != null) {
    chartBar = echarts.init(chartBarDom);
    var chartBarOption = deepCopy(hBarOption);
    var dataChart = [chartData.no_conflict, chartData.indirect_conflict, chartData.conflict,];
    if (useType == 1) {
      chartBarOption.yAxis.axisLabel = {
        show: true,
        textStyle: {
          fontSize: 20,
        }
      };
      chartBarOption.xAxis.axisLabel = {
        show: true,
        textStyle: {
          fontSize: 20,
        }
      };
      chartBarOption.series[0].label.normal.textStyle = {
        fontSize: 20,
      };
    }
    ;
    chartBarOption.yAxis.data = ['兼容许可证', '间接兼容许可证', '不兼容许可证'];
    chartBarOption.series[0].itemStyle.normal.color = function (params) {
      var colorList = ['rgb(0,166,90)', 'rgb(243,156,18)', 'rgb(221,75,57)'];
      return colorList[params.dataIndex];
    };
    chartBarOption.series[0].data = dataChart;
    chartBarOption.series[0].name = '许可证数量';
    chartBar.setOption(chartBarOption);
    return chartBar;
  }
}

//init pie for clone detail
export function initLicensePie(chartPie, chartPieId, chartData) {
  var chartPieDom = document.getElementById(chartPieId);
  if (chartPieDom != null) {
    chartPie = echarts.init(chartPieDom);
    var chartPieOption = deepCopy(simPieOption);
    //chartPieOption.legend.data = ['兼容许可证', '间接兼容许可证', '不兼容许可证'];
    var license_data = [{
      value: chartData.no_conflict,
      name: '兼容许可证'
    },
      {
        value: chartData.indirect_conflict,
        name: '间接兼容许可证'
      },
      {
        value: chartData.conflict,
        name: '不兼容许可证'
      }
    ];
    chartPieOption.series[0].data = license_data;
    chartPie.setOption(chartPieOption);
  }
}


//init bar for vulnerability
export function initVulBar(chartBar, chartBarId, chartData) {
  var chartBarDom = document.getElementById(chartBarId);
  if (chartBarDom != null) {
    chartBar = echarts.init(chartBarDom);
    var chartBarOption = deepCopy(hBarOption);
    var dataChart = [chartData.vul_unknown, chartData.vul_low, chartData.vul_mid, chartData.vul_high];
    chartBarOption.yAxis.data = ['未评级漏洞', '低风险漏洞', '中风险漏洞', '高风险漏洞'];
    chartBarOption.series[0].itemStyle.normal.color = function (params) {
      var colorList = ['#0090B0', 'rgb(0,166,90)', 'rgb(243,156,18)', 'rgb(221,75,57)'];
      return colorList[params.dataIndex];
    };
    chartBarOption.series[0].data = dataChart;
    chartBarOption.series[0].name = '漏洞数量';
    chartBar.setOption(chartBarOption);
  }
}

//init bar for clone
export function initErrorBarClone(chartBar, chartBarId, chartData) {
  var chartBarDom = document.getElementById(chartBarId);
  if (chartBarDom != null) {
    chartBar = echarts.init(chartBarDom);
    var chartBarOption = deepCopy(hBarOption);
    var error_high = chartData.error_high == null ? 0 : chartData.error_high;
    var error_mid = chartData.error_mid == null ? 0 : chartData.error_mid;
    var error_low = chartData.error_low == null ? 0 : chartData.error_low;
    var dataChart = [error_low, error_mid, error_high];
    chartBarOption.yAxis.data = ['低风险缺陷', '中风险缺陷', '高风险缺陷'];
    chartBarOption.series[0].itemStyle.normal.color = function (params) {
      var colorList = ['rgb(0,166,90)', 'rgb(243,156,18)', 'rgb(221,75,57)'];
      return colorList[params.dataIndex];
    };
    chartBarOption.series[0].data = dataChart;
    chartBarOption.series[0].name = '缺陷数量';
    chartBar.setOption(chartBarOption);
  }
}

//init bar for clone
export function initTrojanBarClone(chartBar, chartBarId, chartData) {
  var chartBarDom = document.getElementById(chartBarId);
  if (chartBarDom != null) {
    chartBar = echarts.init(chartBarDom);
    var chartBarOption = deepCopy(hBarOption);
    var webshell = chartData.webshell == null ? 0 : (chartData.webshell.confirm_number + chartData.webshell.suspect_number);
    var APT = chartData.APT == null ? 0 : (chartData.APT.confirm_number + chartData.APT.suspect_number);
    var hacker = chartData.hacker == null ? 0 : (chartData.hacker.confirm_number + chartData.hacker.suspect_number);
    var bugUsing = chartData.bugUsing == null ? 0 : (chartData.bugUsing.confirm_number + chartData.bugUsing.suspect_number);
    var other = chartData.other == null ? 0 : (chartData.other.confirm_number + chartData.other.suspect_number);
    var dataChart = [other, bugUsing, hacker, APT, webshell];
    chartBarOption.yAxis.data = ['其它恶意程序', '漏洞利用', '黑客工具', 'APT攻击', '木马后门'];
    chartBarOption.series[0].itemStyle.normal.color = function (params) {
      var colorList = ['#0090B0', '#0088C7', '#cccc99', '#336699', '#BCD4E3'];
      return colorList[params.dataIndex];
    };
    chartBarOption.series[0].data = dataChart;
    chartBarOption.series[0].name = '恶意代码数量';
    chartBar.setOption(chartBarOption);
  }
}

//init pie for code error
export function initCodeErrorPie(chartPie, chartPieId, chartData) {
  var chartPieDom = document.getElementById(chartPieId);
  if (chartPieDom != null) {
    chartPie = echarts.init(chartPieDom);
    var chartPieOption = deepCopy(simPieOption);

    var error_high = chartData.error_high == null ? 0 : chartData.error_high;
    var error_mid = chartData.error_mid == null ? 0 : chartData.error_mid;
    var error_low = chartData.error_low == null ? 0 : chartData.error_low;

    var license_data = [{
      value: error_low,
      name: '低风险缺陷'
    },
      {
        value: error_mid,
        name: '中风险缺陷'
      },
      {
        value: error_high,
        name: '高风险缺陷'
      }
    ];
    chartPieOption.series[0].data = license_data;
    chartPie.setOption(chartPieOption);
  }
}

//init bar for license detail
export function initLicenseBusiBar(chartBar, chartBarId, chartData, useType) {
  var chartBarDom = document.getElementById(chartBarId);
  if (chartBarDom != null) {
    chartBar = echarts.init(chartBarDom);
    var chartBarOption = deepCopy(hBarOption);
    var unknown = 0;
    var bad = 0;
    var good = 0;

    //0：商用未知，1：商用友好，2：商用不友好；
    for (var i = 0; i < chartData.length; i++) {
      var type = chartData[i].type;
      if (type == 1) {
        good++;
      } else if (type == 2) {
        bad++;
      } else {
        unknown++;
      }
    }
    var dataChart = [good, unknown, bad];

    if (useType == 1) {
      chartBarOption.yAxis.axisLabel = {
        show: true,
        textStyle: {
          fontSize: 20,
        }
      };
      chartBarOption.xAxis.axisLabel = {
        show: true,
        textStyle: {
          fontSize: 20,
        }
      };
      chartBarOption.series[0].label.normal.textStyle = {
        fontSize: 20,
      };
    }
    ;
    chartBarOption.yAxis.data = ['商用友好', '商用性未知', '商用不友好'];
    chartBarOption.series[0].itemStyle.normal.color = function (params) {
      var colorList = ['rgb(0,166,90)', 'rgb(243,156,18)', 'rgb(221,75,57)'];
      return colorList[params.dataIndex];
    };
    chartBarOption.series[0].data = dataChart;
    chartBarOption.series[0].name = '许可证数量';
    chartBar.setOption(chartBarOption);
    return chartBar;
  }
}

function deepCopy(o) {
  if (o instanceof Array) {
    var n = [];
    for (var i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i]);
    }
    return n;

  } else if (o instanceof Object) {
    var n = {}
    for (var i in o) {
      n[i] = deepCopy(o[i]);
    }
    return n;
  } else {
    return o;
  }
}
