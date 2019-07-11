<template>
  <div style="padding:25px;background: #EEF5F9;">

    <!--***** REPORT-2 *****-->
    <div class="row" id="report2">
      <div class="col-md-6">
        <div class="card card-c1">
          <div class="card-header card-chart" data-background-color="green">
            <div style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;" class="chartjs-size-monitor">
              <div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                <div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div>
              </div>
              <div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                <div style="position:absolute;width:200%;height:200%;left:0; top:0"></div>
              </div>
            </div>
            <div class="ct-chart chartjs-render-monitor" id="vulPieChart" :style="'height:' + chartH + 'px; width:' + chartW + 'px'" ></div>
          </div>
          <div class="card-content">
            <h4 class="title">漏洞类型</h4>
            <p class="category">
              <span class="text-success"><i class="fa fa-long-arrow-up"></i> 55 </span>
              昨日新增漏洞.</p>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fa fa-clock-o"></i> 更新于 4 分钟之前
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card card-c1">
          <div class="card-header card-chart" data-background-color="orange">
            <div style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;" class="chartjs-size-monitor">
              <div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                <div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div>
              </div>
              <div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                <div style="position:absolute;width:200%;height:200%;left:0; top:0"></div>
              </div>
            </div>
            <div class="ct-chart chartjs-render-monitor" id="vulBarChart" :style="'height:' + chartH + 'px; width:' + chartW + 'px'" ></div>
          </div>
          <div class="card-content">
            <h4 class="title">漏洞等级</h4>
            <p class="category">漏洞总数 {{vulTotal}}</p>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fa fa-clock-o"></i> 更新于 2 天前
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--***** REPORT-3 *****-->
    <div class="row" id="report3">
      <div class="col-md-6">
        <div class="card card-c1">
          <div class="card-header card-chart" data-background-color="green">
            <div style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;" class="chartjs-size-monitor">
              <div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                <div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div>
              </div>
              <div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                <div style="position:absolute;width:200%;height:200%;left:0; top:0"></div>
              </div>
            </div>
            <div class="ct-chart chartjs-render-monitor" id="softTypeChart" :style="'height:' + chartH + 'px; width:' + chartW + 'px'" ></div>
          </div>
          <div class="card-content">
            <h4 class="title">软件类型</h4>
            <p class="category">
              <span class="text-success"><i class="fa fa-long-arrow-up"></i> 55 </span>
              昨日新增漏洞.</p>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fa fa-clock-o"></i> 更新于 4 分钟之前
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card card-c1">
          <div class="card-header card-chart" data-background-color="orange">
            <div style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;" class="chartjs-size-monitor">
              <div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                <div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div>
              </div>
              <div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                <div style="position:absolute;width:200%;height:200%;left:0; top:0"></div>
              </div>
            </div>
            <div class="ct-chart chartjs-render-monitor" id="popularityChart" :style="'height:' + chartH + 'px; width:' + chartW + 'px'" ></div>
          </div>
          <div class="card-content">
            <h4 class="title">软件平台</h4>
            <p class="category">Last Campaign Performance</p>
          </div>
          <div class="card-footer">
            <div class="stats">
              <i class="fa fa-clock-o"></i> 更新于 2 天前
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--***** FOOTER *****-->
    <div class="row" id="report5">

      More Information
      <a href="/" target="_blank" title="棱镜七彩"> 棱镜七彩</a> -

    </div>
  </div>
</template>

<script>
  export default {
    name: "statics",

    data() {
      return {
        //chart
        chartH: 403,
        chartW: 650,
        center: ['55%','60%'],
        moniterChartH: '411px',
        moniterChartW: '484px',

        stats: [],
        vulTotal: 0
      }
    },

    mounted: function () {
      if(screen.width <= 1680)
      {
        this.chartH = 400;
        this.chartW = 615;
        this.center = ['50%','50%']

        this.moniterChartH = '450px';
        this.moniterChartW = '400px';
      }

      this.getStats();
    },

    methods: {
      initChart() {
        //vul type chart
        var vulTypes = [];
        var vulLevelsX = [];
        var vulLevelsY = [];
        this.stats.forEach(function (item) {
          if(item.type == "vul_type")
          {
            vulTypes.push({name: item.name, value: item.number});
          }
          if(item.type == "vul_level")
          {
            vulLevelsX.push(item.name);
            vulLevelsY.push(item.number);
            this.vulTotal += parseInt(item.number);
          }
        }.bind(this));

        var vulPieChart = this.$echarts.init(document.getElementById('vulPieChart'));
        var vulPieOption = {
          title: {
            text: '漏洞',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#000000'
            }
          },

          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          series : [
            {
              name: '漏洞类型',

              type: 'pie',
              radius : '55%',
              center: this.center,
              data: vulTypes,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        vulPieChart.setOption(vulPieOption);

        //vul level chart
        var vulBarChart = this.$echarts.init(document.getElementById('vulBarChart'));
        var vulBarOption = {
          color: ['#3398db','#d6db38','#db493f','#3398DB',],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: screen.width <= 1680 ? '20%' : '10%',
            bottom: screen.width <= 1680 ? '10%' : '3%',
            containLabel: true
          },
          xAxis : [
            {
              name : '等级',
              type : 'category',
              data : vulLevelsX,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              name : '漏洞数',
              type : 'value'
            }
          ],
          series : [
            {
              name:'语言',
              type:'bar',
              barWidth: '50%',
              data: vulLevelsY
            }
          ]
        };
        vulBarChart.setOption(vulBarOption);

        //language chart
        this.data = [
          {value: 55842, name: 'C'},
          {value: 51590, name: 'C#'},
          {value: 157318, name: 'Phython'},
          {value: 82615, name: 'C++'},
          {value: 133563, name: 'Java'},
          {value: 394354, name: 'JavaScript'},
          {value: 191035, name: 'PHP'},
          {value: 75184, name: '未知'},
        ].sort(function (a, b) {
          return a.value - b.value;
        });

        var pieChart = this.$echarts.init(document.getElementById('pieChart'));
        var pieOption = {
          title: {
            text: '语言',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#000000'
            }
          },

          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          series: [
            {
              name: '数据语言',
              type: 'pie',
              radius: '55%',
              center: this.center,
              data: this.data,
              roseType: 'radius',
              label: {
                normal: {
                  textStyle: {
                    color: 'rgba(0, 0, 0, 0.3)'
                  }
                }
              },
              labelLine: {
               normal: {
                  lineStyle: {
                    color: 'rgba(0, 0, 0, 0.3)'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                }
              },
              itemStyle: {
                normal: {
                  /*color: '#c23531',*/
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
            }
          ]
        };
        pieChart.setOption(pieOption);


        //code type bar chart
        let total = 0;
        var valueList = this.data.map(function (item) {
          total += item.value;
          return item.value;
        });
        valueList.push(total);

        let total2 = 0;
        var valueList2 = this.data.map(function (item) {
          total2 += item.value - 50;
          return item.value - 50;
        });
        valueList2.push(total2);

      },

      getStats() {
        this.$http.get('/api/sys/statistics').then(response => {
          this.stats = response.data;
          this.initChart();
        })
      },
    }
  }
</script>

<style scoped>
  .card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: .25rem;
  }


  .stats {
    padding-left: 10px;
  }
</style>
