<template>
  <div >
    <div class="server-info" style="background-color:white;padding-bottom: 50px">
      <div class="box box-solid box-default">
          <!-- /.box-header -->
          <div class="box-body">
            <table class="table table-bordered table-striped">
              <thead>
              <tr>
                <th width="20%">服务器</th>
                <th width="20%">Cpu内核</th>
                <th width="20%">磁盘总容量</th>
                <th width="20%">磁盘使用量</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{{system.os}}</td>
                <td>{{system.core}}</td>
                <td>{{system.mem_total}}GB</td>
                <td>{{system.mem_used}}GB</td>
              </tr>
              </tbody>
            </table>

          </div>

        </div>

      <div class="box box-solid box-default">
        <h4>资源使用率</h4>
        <div style="width: 900px;height: 500px" id="mychart"></div>
      </div>

      <div class="box box-solid box-default">
        <div class="row">
          <div class="col-md-6">
            <h4>磁盘使用率</h4>
            <div class="row">
              <div class="col-md-10">
                <div v-for="d in system.disks">
                  {{d.name}}
                  <el-progress :text-inside="true" :stroke-width="18" :percentage=d.utilization></el-progress>
                  <div>{{d.usable}} GB 可 用，共 {{d.total}} GB</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "license",
    data() {
      return {
        fileList: [],
        system: {},
        start: "",
        end: "",
        cpu: 0,
        mem: 0,
        invalid: false,
        interval1: {}
      }
    },

    mounted: function () {
      this.initChart();
    },

    methods: {
      getSystemInfo() {
        this.$http.get("/api/sys/info").then(response => {
          this.system = response.data;
          this.cpu = this.system.cpu_rate;
        });
      },

      initChart() {
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

        var v = this;
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

      }
    },

    beforeDestroy: function () {
      clearInterval(this.interval1);
    }
  }
</script>

<style scoped>

  .box {
    padding: 15px;
    margin-top: 15px;
  }

  .server-info {
    padding: 15px;
  }
</style>
