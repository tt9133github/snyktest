<template>
  <div class="admin-home">
    <!--***** REPORT-1 *****-->
    <div class="row" id="report1">
      <div class="col-sm-3">
        <div class="card">
          <div class="card-block">
            <div class="text-left report1-cont">
              <h2 class="m-b-0"><i class="ti-arrow-up text-success"></i>
                <span class="project-size">{{project_total}}
                个</span></h2>
              <span class="text-muted">项目</span>
            </div>
            <p class="category" v-show="prj_last_update != null && prj_last_update.number != null">
              <span class="text-success"><i class="fa fa-long-arrow-up"></i> {{prj_last_update.number}} </span>
              上一次爬取 {{prj_last_update.created}}</p>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card">
          <div class="card-block">
            <div class="text-left report1-cont">
              <h2 class="m-b-0"><i class="ti-arrow-up text-danger"></i>
                <span class="project-size">{{vulTotal}}
                个</span></h2>
              <span class="text-muted">漏洞数</span>
            </div>
            <!--<span class="text-danger">43%</span>
            <div class="progress">
              <div class="progress-bar bg-danger" role="progressbar" style="width: 43%; height: 6px;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>-->
            <p>
              <small>更新于 {{updated}}之前</small>
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card">
          <div class="card-block">
            <div class="text-left report1-cont">
              <h2 class="m-b-0"><i class="ti-arrow-up text-warning"></i>
                <span class="project-size">{{file_total}} 个</span></h2>
              <span class="text-muted">文件 </span>
            </div>
            <!--<span class="text-warning">53%</span>
            <div class="progress">
              <div class="progress-bar bg-warning" role="progressbar" style="width: 53%; height: 6px;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>-->
            <p>
              <small>更新于 {{updated}}之前</small>
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card">
          <div class="card-block">
            <div class="text-left report1-cont">
              <h2 class="m-b-0" style="word-break:keep-all;white-space:nowrap;"><i class="ti-arrow-up text-info"></i>
                <span class="project-size">{{row_line_total}} 行</span></h2>
              <span class="text-muted">代码 </span>
            </div>
            <!--<span class="text-info">70%</span>
            <div class="progress">
              <div class="progress-bar bg-info" role="progressbar" style="width: 70%; height: 6px;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>-->
            <p>
              <small>更新于 {{updated}}之前</small>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <!--data-ride="carousel"-->
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
        <li data-target="#myCarousel" data-slide-to="3"></li>
      </ol>
      <!-- 轮播（Carousel）项目 -->
      <div class="carousel-inner">
        <div class="item active">
          <!--***** REPORT-2 *****-->
          <!--<div class="carousel-caption">项目</div>-->
          <div class="row" id="report2">
            <div class="col-md-4">
              <div class="card card-c1">
                <div class="card-header card-chart" data-background-color="red">
                  <div style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;" class="chartjs-size-monitor">
                    <div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                      <div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div>
                    </div>
                    <div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                      <div style="position:absolute;width:200%;height:200%;left:0; top:0"></div>
                    </div>
                  </div>
                  <div class="ct-chart chartjs-render-monitor" id="pieChart" :style="'height:' + chartH + 'px; width:' + chartW + 'px'"></div>
                </div>
                <div class="card-content">
                  <h4 class="title">项目语言</h4>
                  <!--<p class="category">Last Campaign Performance</p>-->
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="fa fa-clock-o"></i> 更新于 {{updated}}前
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-4">
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
                  <div class="ct-chart chartjs-render-monitor" id="projectVulChart" :style="'height:' + chartH + 'px; width:' + chartW + 'px'"></div>
                </div>
                <div class="card-content">
                  <h4 class="title">漏洞项目</h4>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="fa fa-clock-o"></i> 更新于 {{updated}}前
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
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
                  <div class="ct-chart chartjs-render-monitor" id="popularityChart" :style="'height:' + chartH + 'px; width:' + chartW + 'px'"></div>
                </div>
                <div class="card-content">
                  <h4 class="title">项目流行度</h4>
                  <!--<p class="category">
                    <span class="text-success"><i class="fa fa-long-arrow-up"></i> 55 </span>
                    昨日新增漏洞.</p>-->
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="fa fa-clock-o"></i> 更新于 {{updated}}前
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="row" id="report3">
            <div class="col-md-4">
              <div class="card card-c1">
                <div class="card-header card-chart" data-background-color="red">
                  <div style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;" class="chartjs-size-monitor">
                    <div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                      <div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div>
                    </div>
                    <div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                      <div style="position:absolute;width:200%;height:200%;left:0; top:0"></div>
                    </div>
                  </div>
                  <div class="ct-chart chartjs-render-monitor" id="softTypeChart" :style="'height:' + chartH + 'px; width:' + chartW + 'px'"></div>
                </div>
                <div class="card-content">
                  <h4 class="title">软件类型</h4>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="fa fa-clock-o"></i> 更新于 {{updated}}前
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-4">
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
                  <div class="ct-chart chartjs-render-monitor" id="countryChart" :style="'height:' + chartH + 'px; width:' + chartW + 'px'"></div>
                </div>
                <div class="card-content">
                  <h4 class="title">国家</h4>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="fa fa-clock-o"></i> 更新于 {{updated}}前
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
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
                  <div class="ct-chart chartjs-render-monitor" id="platformChart" :style="'height:' + chartH + 'px; width:' + chartW + 'px'"></div>
                </div>
                <div class="card-content">
                  <h4 class="title">操作平台</h4>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="fa fa-clock-o"></i> 更新于 {{updated}}之前
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="item">
          <!--***** 漏洞 *****-->
          <div class="row" id="report4">
            <div class="col-md-6">

              <div class="card card-c1">
                <div class="ct-chart chartjs-render-monitor" id="vulPieChart" ></div>

                <div class="card-content">
                  <h4 class="title">漏洞类型</h4>
                  <p class="category">
                  <p class="category" v-show="vul_last_update != null && vul_last_update.number != null">
                    上一次爬取于{{vul_last_update.created}}，爬取到 <span class="text-success">{{vul_last_update.number}} </span>条数据 </p>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="fa fa-clock-o"></i> 更新于 {{updated}}之前
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card card-c1">
                <div class="ct-chart chartjs-render-monitor" id="vulBarChart"></div>
                <div class="card-content">
                  <h4 class="title">漏洞等级</h4>
                  <p class="category">漏洞总数 {{vulTotal}}</p>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="fa fa-clock-o"></i> 更新于 {{updated}}之前
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <!--***** 爬虫 *****-->
          <div class="row" id="report5">
            <div class="col-md-6">
              <div class="card card-c1">
                <div class="card-content">
                  <div class="ct-chart chartjs-render-monitor" id="spiderMonitorChart" :style="'height:' + moniterChartH + 'px; width:' + moniterChartW + 'px'"></div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card card-c1">
                <div class="card-content">
                  <div class="ct-chart chartjs-render-monitor" id="spiderHistoricalChart" :style="'height:' + moniterChartH + 'px;width:' + moniterChartW + 'px'"></div>
                </div>
              </div>
            </div>
            <div class="col-md-5">
            </div>
          </div>
        </div>
      </div>

      <!-- 轮播（Carousel）导航 -->
      <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>


    <!--***** FOOTER *****-->
    <div class="footerTitle" id="report6">
      <a href="/" target="_blank" title="中国信息安全测评中心" style="font-size: 12px;color: #999;">中国信息安全测评中心-源代码分析系统</a>
      <div class="reportButton">
        <el-button class="el-button--mini" @click="updateStats" style="margin-top:-15px;margin-left: 20px">
          更新数据
        </el-button>
      </div>
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
        chartW: 484,
        center: ['50%', '60%'],
        moniterChartH: 411,
        moniterChartW: 700,

        data: [],
        vulTotal: 0,

        vulTotalData: [],
        tasks: [],
        updated: '',
        esupdated: '',
        project_total: '',
        file_total: '',
        row_line_total: '',
        project_update: "",
        prj_last_update: {},
        vul_last_update: {},

        interval1: {},
      }
    },

    mounted: function () {
      this.user_id = JSON.parse(localStorage.getItem('user')).id;
      if(this.user_id == null)
      {
        this.$router.push({path: '/login'});
      }

      if (screen.width <= 1680) {
        this.chartH = 380;
        this.chartW = 350;
        this.center = ['50%', '50%']

        this.moniterChartH = 400;
        this.moniterChartW = 600;
      }
      if(window.devicePixelRatio >= 1.5){
        this.chartH = 380;
        this.chartW = 260;
        this.center = ['55%', '60%']

        this.moniterChartH = 400;
        this.moniterChartW = 450;
      }


      this.getLastPrjUpdate();
      this.initChart();
    },

    methods: {
      initChart() {
        this.$http.get('/api/sys/statistics').then(response => {
          this.stats = response.data;
          //this.initCpuMonitor();
          this.esupdated = this.getUpdatedTimeDif(response.data[0].updated);
          this.getPrjStats();
          this.initPopularityChart();
          this.initSoftTypeChart();
          this.initVulLevelChart();
          this.initLangChart();
          this.initCountryChart();
          this.initPlatformChart();
          this.initVulCharts();
          this.getSpiderRealChart();
          this.getDownloadChart();
        })
      },

      updateStats() {
        this.$http.get('/api/sys/stats/refresh');
      },

      getPrjStats() {
        this.stats.forEach(function (item) {
          if (item.type == "project" && item.name == "projects") {
            this.updated = this.getUpdatedTimeDif(item.updated);
            this.project_total = item.number;
          }
          else if (item.type == "project" && item.name == "items") {
            this.file_total = item.number;
          }
          else if (item.type == "project" && item.name == "codeLines") {
            this.row_line_total = item.number;
          }
          else if (item.type == "vul" && item.name == "vul_total") {
            this.vulTotal = item.number;
          }
        }.bind(this));
      },

      getUpdatedTimeDif(time) {
        var dif = (Date.parse(new Date()) - Date.parse(time)) / 1000 / 60;
        if (dif < 60) {
          return parseInt(dif) + ' 分钟'
        }
        else if (dif > 60 & dif < 60 * 24) {
          return parseInt(dif / 24) + ' 小时';
        }
        else if (dif > 60 * 24) {
          return parseInt(dif / 60 / 24) + ' 天';
        }
      },

      initLangChart() {
        var languages = [];
        this.stats.forEach(function (item) {
          if (item.type == "project_language") {
            languages.push({name: item.name, value: item.number});
          }
        });

        languages.sort(function (a, b) {
          return a.value - b.value;
        });

        var pieChart = this.$echarts.init(document.getElementById('pieChart'));
        var pieOption = {
          legend: {
            x: 'left',
            data: languages
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '项目语言',
              type: 'pie',
              radius: '55%',
              center: this.center,
              data: languages,
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

              animationType: 'scale',
              animationEasing: 'elasticOut',
            }
          ]
        };
        pieChart.setOption(pieOption);
      },

      initCpuMonitor() {
        var v = this;
        var chart = this.$echarts.init(document.getElementById('mychart'));

        var option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#283b56'
              },
            },
            formatter: '{a0}: {c0}%<br />{a1}: {c1}%'
          },
          legend: {
            data: ['内存', 'cpu'],
            bottom: 0
          },
          dataZoom: {
            show: false,
            start: 0,
            end: 100
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              data: (function () {
                var now = new Date();
                var res = [];
                var len = 10;
                while (len--) {
                  res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                  now = new Date(now - 2000);
                }
                return res;
              })()
            }
          ],
          yAxis: [
            {
              type: 'value',
              scale: true,
              name: '内存(%)',
              max: 100,
              min: 0,
              boundaryGap: [0.2, 0.2]
            },
            {
              type: 'value',
              scale: true,
              name: 'cpu(%)',
              max: 100,
              min: 0,
              boundaryGap: [0.2, 0.2]
            }
          ],
          series: [
            {
              name: '内存',
              type: 'bar',
              xAxisIndex: 0,
              yAxisIndex: 1,
              data: [v.mem],
            },
            {
              name: 'cpu',
              type: 'line',
              data: [v.cpu]
            }
          ]
        };

        this.interval1 = setInterval(function () {
          v.$http.get("/api/sys/info").then(response => {
            v.system = response.data;
            v.cpu = v.system.cpu_rate;
            v.mem = v.system.mem_rate;

            if (option.series[1].data.length == 10) {
              option.series[1].data.shift();
            }
            option.series[1].data.push(v.cpu);

            if (option.series[0].data.length == 10) {
              option.series[0].data.shift();
            }
            option.series[0].data.push(v.mem);

            var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
            option.xAxis[0].data.shift();
            option.xAxis[0].data.push(axisData);
            chart.setOption(option);
          });
        }, 2000);
      },

      initPopularityChart() {
        var popularityLevel = [];
        this.stats.forEach(function (item) {
          if (item.type == "project_star") {
            popularityLevel.push({name: item.name, value: item.number});
          }
        });

        var popularityChart = this.$echarts.init(document.getElementById('popularityChart'));
        var vulPieOption = {
          title: {
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

          legend: {
            x: 'left',
            data: popularityLevel.map(function (item) {
              return item.name;
            })
          },

          series: [
            {
              name: '项目星级',
              type: 'pie',
              radius: ['45%', '60%'],
              center: this.center,
              data: popularityLevel,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                }
              }
            }
          ]
        };
        popularityChart.setOption(vulPieOption);
      },

      initSoftTypeChart() {
        var softTypes = [];
        var selected = {};
        this.stats.forEach(function (item) {
          if (item.type == "project_soft_type") {
            softTypes.push({name: this.$t(item.name), value: item.number});

            if (item.name != "未分类") {
              selected[this.$t(item.name)] = true;
            }
            else {
              selected[this.$t(item.name)] = false;
            }
          }
        }.bind(this));

        var softTypeChart = this.$echarts.init(document.getElementById('softTypeChart'));
        var softTypePieOption = {
          title: {
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

          legend: {
            x: 'left',
            data: softTypes.map(function (item) {
              return item.name;
            }),
            selected: selected,
          },

          series: [
            {
              radius: ['45%', '60%'],
              name: '软件类型',
              type: 'pie',
              center: this.center,
              data: softTypes,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                }
              }
            }
          ]
        };
        softTypeChart.setOption(softTypePieOption);
      },

      initCountryChart() {
        var countryChart = this.$echarts.init(document.getElementById('countryChart'));

        var countries = [];
        this.stats.forEach(function (item) {
          if (item.type == "project_country") {
            if (item.name != "未分类") {
              countries.push({name: this.$t(item.name), value: item.number});
            }
          }
        }.bind(this));

        var countryOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: screen.width <= 1680 ? '20%' : '4%',
            bottom: screen.width <= 1680 ? '10%' : '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: countries.map(function (item) {
                return item.name;
              }),
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              name: '项目数',
              type: 'value'
            }
          ],
          series: [
            {
              name: '国家',
              type: 'bar',
              barWidth: '50%',
              data: countries.map(function (item) {
                return item.value;
              }),
              color: function (params) {
                var colorList = ['#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB'];
                return colorList[params.dataIndex]
              }
            }
          ]
        };
        countryChart.setOption(countryOption);
      },

      initPlatformChart() {
        var platforms = [];
        var selected = {};

        var multiPlatForm = {type: "project_osplatform", name: "跨平台", number: 0};
        this.stats.forEach(function (item) {
          if (item.type == "project_osplatform") {
            if (item.name.indexOf("2") != -1) {

              multiPlatForm.number += parseInt(item.number);
            }
          }
        });
        this.stats.push(multiPlatForm);
        this.stats.forEach(function (item) {
          if (item.type == "project_osplatform" && item.name.indexOf("2") == -1) {
            platforms.push({name: this.$t(item.name), value: item.number});

            if (item.name != "未分类") {
              selected[this.$t(item.name)] = true;
            }
            else {

              selected[this.$t(item.name)] = false;
            }
          }
        }.bind(this));

        var platformChart = this.$echarts.init(document.getElementById('platformChart'));
        var platformOption = {
          title: {
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

          legend: {
            x: 'left',
            data: platforms.map(function (item) {
              return item.name;
            }),
            selected: selected
          },

          series: [
            {
              name: '软件操作平台',
              type: 'pie',
              radius: ['45%', '60%'],
              center: this.center,
              data: platforms,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                }
              }
            }
          ]
        };
        platformChart.setOption(platformOption);
      },

      initVulLevelChart() {
        var vulBarChart = this.$echarts.init(document.getElementById('projectVulChart'));

        var data = []
        this.stats.forEach(function (item) {
          if (item.type == "project_vul") {
            if (item.name != "high_vul_num") {
              data.push(item.number);
            }
          }
        });
        this.stats.forEach(function (item) {
          if (item.type == "project_vul") {
            if (item.name != "mid_vul_num") {
              data.push(item.number);
            }
          }
        });
        this.stats.forEach(function (item) {
          if (item.type == "project_vul") {
            if (item.name != "low_vul_num") {
              data.push(item.number);
            }
          }
        });
        this.stats.forEach(function (item) {
          if (item.type == "project_vul") {
            if (item.name != "unk_vul_num") {
              data.push(item.number);
            }
          }
        });
        var vulBarOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: screen.width <= 1680 ? '20%' : '4%',
            bottom: screen.width <= 1680 ? '10%' : '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['含高危', '含中危', '含低危', '含未分级'],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel:{
                interval: 0
              }
            }
          ],
          yAxis: [
            {
              name: '项目数',
              type: 'value'
            }
          ],
          series: [
            {
              name: '语言',
              type: 'bar',
              barWidth: '50%',
              data: data,
              itemStyle: {
                normal: {
                  color: function (params) {
                    var colorList = ['#C33531', '#EE9201', '#EFE42A', '#675bba'];
                    return colorList[params.dataIndex]
                  }
                },
              },
            }
          ]
        };
        vulBarChart.setOption(vulBarOption);
      },

      initVulCharts() {
        //vul type chart
        var vulTypes = [];
        var vulLevelsX = [];
        var vulLevelsY = [];
        var vulLevelsYOrdered = [];
        this.stats.forEach(function (item) {
          if (item.type == "vul_type") {
            vulTypes.push({name: item.name, value: item.number});
          }
          if (item.type == "vul_level") {
            vulLevelsX.push(item.name);
            vulLevelsY.push(item.number);
          }
        });

        var vulPieChart = this.$echarts.init(document.getElementById('vulPieChart'));
        var vulPieOption = {
          title: {
            text: '漏洞',
            left: 'left',
            top: 20,
            textStyle: {
              color: '#000000'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          series: [
            {
              name: '漏洞类型',
              type: 'pie',
              radius: '65%',
              center: "55%",
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
        for(var i = 0; i < vulLevelsX.length; i++)
        {
          if (vulLevelsX[i] == "超危") {
            vulLevelsYOrdered.push(vulLevelsX[i]);
          }
        }
        for(var i = 0; i < vulLevelsX.length; i++)
        {
          if (vulLevelsX[i] == "高危") {
            vulLevelsYOrdered.push(vulLevelsX[i]);
          }
        }
        for(var i = 0; i < vulLevelsX.length; i++)
        {
          if (vulLevelsX[i] == "中危") {
            vulLevelsYOrdered.push(vulLevelsX[i]);
          }
        }
        for(var i = 0; i < vulLevelsX.length; i++)
        {
          if (vulLevelsX[i] == "低危") {
            vulLevelsYOrdered.push(vulLevelsX[i]);
          }
        }
        for(var i = 0; i < vulLevelsX.length; i++)
        {
          if (vulLevelsX[i] == "未分级") {
            vulLevelsYOrdered.push(vulLevelsX[i]);
          }
        }

        var vulBarChart = this.$echarts.init(document.getElementById('vulBarChart'));
        var vulBarOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          xAxis: [
            {
              name: '等级',
              type: 'category',
              data: vulLevelsYOrdered,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              name: '漏洞数',
              type: 'value'
            }
          ],
          series: [
            {
              name: '漏洞等级',
              type: 'bar',
              barWidth: '50%',
              data: vulLevelsY,
              itemStyle: {
                normal: {
                  color: function (params) {
                    var colorList = ['#C33531', '#FE8463', '#EE9201', '#EFE42A', '#675bba'];
                    return colorList[params.dataIndex]
                  }
                }
              }
            }
          ]
        };
        vulBarChart.setOption(vulBarOption);
      },

      initSpiderMonitorChart(data) {
        var pieChart = this.$echarts.init(document.getElementById('spiderMonitorChart'));

        var dateList = data.map(function (item) {
          return item.time.substring(0, 16);
        });

        var valueList = data.map(function (item) {
          return item.mergevalue_num;
        });

        var option = {
          /*visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
          }],*/

          title: [{
            left: 'center',
            text: '爬虫监控'
          }],
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [{
            data: dateList
          }],
          yAxis: [{
            splitLine: {show: false},
            name: '项目（个）',
          }],
          series: [{
            type: 'line',
            showSymbol: false,
            data: valueList
          }]
        };
        pieChart.setOption(option);
      },

      getSpiderRealChart() {
        this.$http.get('/api/sys/spider/real').then(response => {
          this.initSpiderMonitorChart(response.data);
        });
      },

      getDownloadChart() {
        this.$http.get('/api/sys/spider/history').then(response => {
          this.initHistoricalChart(response.data);
        });
      },

      initHistoricalChart(data) {
        var pieChart = this.$echarts.init(document.getElementById('spiderHistoricalChart'));

        var dateList = data.map(function (item) {
          return item.created;
        });

        var spiderValList = data.map(function (item) {
          return item.type == "spider" ? item.number : 0;
        });

        var downloadValList = data.map(function (item) {
          return item.type == "download" ? item.number : 0;
        });

        var option = {
          legend: {
            data: ['爬取项目', '下载项目']
          },
          title: [{
            text: '历史信息'
          }],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          xAxis: [{
            data: dateList
          }],
          yAxis: {
            type: 'value',
            name: '项目（个）',
          },
          dataZoom: [
            {
              show: true,
            }
          ],
          series: [{
            name: '爬取项目',
            type: 'line',
            data: spiderValList
          },
            {
              name: '下载项目',
              type: 'bar',
              barWidth: '30%',
              data: downloadValList
            }]
        };
        pieChart.setOption(option);
      },

      getLastPrjUpdate() {
        this.$http.get('/api/sys/last_update').then(response => {
          this.prj_last_update = response.data[0];
          this.vul_last_update = response.data[1];
        })
      },

      getSystemInfo() {
        this.$http.get("/api/sys/info").then(response => {
          this.system = response.data;
          this.cpu = this.system.cpu_rate;
        });
      },
    },

    beforeDestroy: function () {
      clearInterval(this.interval1);
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

  .progress {
    height: 6px;
  }

  .text-success {
    color: #28a745;
  }

  .stats {
    padding-left: 10px;
  }

  .carousel {
    height: 600px;
  }

  .carousel-control {
    width: 1%;
  }

  .carousel-caption {
    color: black;
  }

  .admin-home {
    padding-left:25px;
    padding-top:25px;
    padding-right: 25px;
  }

  #vulBarChart{
    width:600px;
    height: 350px;
  }
  #vulPieChart{
    width:600px;
    height: 350px;
  }

  @media only screen and (-webkit-min-device-pixel-ratio:1.25){
    #vulBarChart{
      width:580px;
      height: 350px;
    }
    #vulPieChart{
      width:580px;
      height: 350px;
    }
  }
  @media only screen and (-webkit-min-device-pixel-ratio:1.5){
    .project-size{
      font-size: 2rem;
    }
    #vulBarChart{
      width:400px;
      height: 350px;
    }
    #vulPieChart{
      width:400px;
      height: 350px;
    }
  }

  .footerTitle{
    text-align: center;
    margin-bottom: 10px;
  }
  .reportButton{
    display: inline-block;
  }
</style>
