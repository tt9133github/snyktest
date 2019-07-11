<template>
  <div class="row detect_page">
    <div class="col-md-12">
      <section class="content bg-style">
        <div class="row">
          <div class="col-md-12">
            <div class="box box-solid box-default">
              <div class="box-body box-solid box-default">
                <h5>
                  <b>
                    <p>&nbsp;
                      <i class="fa fa-circle-o text-green"></i>&nbsp;扫描结果&nbsp;&nbsp;
                    </p>
                  </b>
                </h5>
                <hr>
              </div>

              <div class="row" style="max-width: 1400px;height: 1020px;">
                <div class="col-md-4">
                  <div style="background-color:white;height: 1000px;overflow: auto">
                    <el-tabs type="border-card" @tab-click="getFortifyResult" >
                      <el-tab-pane :label="'Critical' + levelCount.critical" value="Critical" >
                        <div class="file_tree white">
                          <el-tree ref="tree" :data="resultTree" :props="defaultProps" node-key="key" :default-expand-all="false"
                                   @node-click="handleNodeClick" :highlight-current="true" ></el-tree>
                        </div>
                      </el-tab-pane>
                      <el-tab-pane :label="'High' + levelCount.high" value="High" >
                        <div class="file_tree white">
                          <el-tree ref="tree" :data="resultTree" :props="defaultProps" node-key="key" :default-expand-all="false"
                                   @node-click="handleNodeClick" :highlight-current="true" ></el-tree>
                        </div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </div>
                <div class="col-md-8">
                  <div  class="col-md-12" v-if="highlight == ''">
                    <div class="fortifyPanel">
                      <div class="panel-header">
                        <p class="fortifyTitle">总结</p>
                        <div class="col-md-6">
                          <span>缺陷总数:</span>
                          <span>{{levelCount.critical + levelCount.high}}</span>
                        </div>
                      </div>
                      <div class="fortifybody" style="width: 100%;height: 740px">
                        <div id="panelCritical" style="height: 500px;width:500px;margin: 20px auto 10px;"></div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="panel panel-default" style="height: 500px;" v-if="highlight !== ''">
                    <pre style="height: 100%;padding: 0px" v-highlight>
                        <code v-html="highlight"></code>
                    </pre>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <el-tabs type="border-card" v-model="PreName" class="fortifyPre" v-if="highlight !== ''">
                      <el-tab-pane label="解释" name="explanation" value="explanation" >
                        <pre class="explanation-body slim-bar">{{issue.explanation}}</pre>
                      </el-tab-pane>
                      <el-tab-pane label="建议" name="recommendations">
                        <pre class="reco-body slim-bar">{{issue.recommendations}}</pre>
                      </el-tab-pane>
                    </el-tabs>
                  </div>

                </div>


              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  </div>
</template>

<script>

  export default {

    data() {
      return {
        PreName: 'explanation',
        uploadUrl: '',
        uploadXPUrl: '',
        user_id: '',
        task_id: 0,
        limitNum: 2,
        isMultiple: true,
        exitPDFUrl: '',
        requestPDFUrl: '',
        isPDFUpload: 0,
        isXMLUpload: 0,
        levelCount: {},
        resultTree: [{}],
        fortifyLog: "",

        issues: [],
        issue: {},
        issue_details: [],
        highlight: '',
        activeName: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      }
    },

    created: function () {
      this.user_id = JSON.parse(localStorage.getItem('user')).id;
      if (this.user_id == null) {
        this.$router.push({path: '/login'});
      }
      this.uploadUrl = "api/task/fortifyXML/" + this.task_id;
      this.uploadXPUrl = "api/task/fortifyXMLPDF/" + this.task_id;
      this.exitPDFUrl = "api/task/exitFortifyPDF/" + this.task_id;
      this.requestPDFUrl = "api/task/requestFortifyPDF/" + this.task_id;
      this.$http.get("api/task/fortify/result?taskId=" + this.task_id + "&priority=Critical").then(response => {
        if (response.data != null && response.data.length != 0) {
          this.resultTree = response.data;
          $('#upload_box').addClass("collapsed-box");
          //this.activeName = this.issues[0].groupTitle;

          this.getIssueInfo(this.resultTree[0].data.issueId);
          //this.getIssueDetail(this.issue.id);
        }
      });


    },

    mounted: function () {
      this.getFortifyResultLevelCount();
      // this.getFortifyLog();

    },
    methods: {
      getFortifyLog() {
        this.$http.get("api/task/" + this.task_id).then(response => {
          this.fortifyLog = response.data.message;
          var tmp = this.fortifyLog.split("-");
          this.fortifyLog = tmp;
        })
      },

      getFortifyResult(tab, event) {
        this.$http.get("api/task/fortify/result?taskId=" + this.task_id + "&priority=" + tab.$attrs.value).then(response => {
          this.resultTree = response.data;
          if (response.data != null && response.data.length != 0) {
            $('#upload_box').addClass("collapsed-box");
            //this.activeName = this.issues[0].groupTitle;

            this.getIssueInfo(this.resultTree[0].data.issueId);
            //this.getIssueDetail(this.issue.id);
          }
        })
      },

      getIssueInfo(issueId) {
        this.$http.get("api/task/fortify/issue/" + issueId).then(response => {
          this.issue = response.data;
        })
      },

      getFortifyResultLevelCount() {
        this.$http.get("api/task/fortify/result/priority?taskId=" + this.task_id).then(response => {
          this.levelCount = response.data;
          if (response.data != null && response.data.length != 0) {
            $('#upload_box').addClass("collapsed-box");
            this.panelEcharts();
          }
        })
      },

      handleNodeClick(data) {
        if (data == null) {
          return;
        }
        if (data.key != null && data.key != "") {
          this.getIssueDetail(data.key);
        }
      },

      panelEcharts() {
        var opeChart = this.$echarts.init(document.getElementById('panelCritical'));
        var valPanOption = {
          title: {
            text: '问题概览',
            x: 'center'
          },
          tooltip: {},
          xAxis: {},
          yAxis: {
            type: 'category',
            data: ['Critical', 'High']
          },
          series: [
            {
              type: 'bar',
              barWidth: 20,
              label: {
                normal: {
                  show: true,
                  position: 'right'
                },

              },
              itemStyle: {
                normal: {
                  color: function (params) {
                    var colorList = ['#c33531', '#efe42A'];
                    return colorList[params.dataIndex]
                  }
                }
              },
              data: [this.levelCount.critical, this.levelCount.high]
            }
          ]
        };
        opeChart.setOption(valPanOption);
      },

      getIssueDetail(issueId) {
        this.$http.get("api/task/fortify/issue/detail?issueId=" + issueId).then(response => {
          this.issue_details = response.data;
          var snippet = this.issue_details.snippet;
          var lineStart = this.issue_details.lineStart;
          this.getHighLight(snippet, lineStart);
          this.getIssueInfo(this.issue_details.issueId);

        })
      },

      clickClass(tab, event) {
        var snippet = tab.$attrs.value.snippet;
        var lineStart = tab.$attrs.value.lineStart;
        this.getHighLight(snippet, lineStart);
      },

      getHighLight(snippet, lineStart) {
        this.highlight = '';
        var tmp = snippet.replace(/</g, "&lt;");
        tmp = tmp.replace(/>/g, "&gt");
        var lines = tmp.split("\n");
        if (lines.length == 5) {
          lines[2] = "<em style=\"background-color:yellow\">" + lines[2] + "</em>"
        }
        for (var i = 0; i < lines.length; i++) {
          this.highlight += lineStart + " " + lines[i] + "\n";
          lineStart++;
        }
      },

      changeIssue(tab, event) {
        this.issue = tab.$attrs.value;
        this.getIssueDetail(this.issue.id)
      },


      // 确认上传
      submitXPUpload() {
        this.$refs.uploadXP.submit();
      },
      requestPDF() {
        window.open(this.requestPDFUrl);
      },

      uploadSuccess(response, file, fileList) {
        var json = response;
        if (json.status == 1) {
          this.isPDFUpload = 1;
        } else if (json.status == 2) {
          this.isXMLUpload = 1;
        } else if (json.status == 0) {
          this.isPDFUpload = 2;
        } else if (json.status == -2) {
          this.isXMLUpload = 2;
        }


        if (this.isPDFUpload == 1 && this.isXMLUpload == 1) {
          this.$alert('上传成功', {
            confirmButtonText: '确定',
            callback: action => {
              //this.isUpload = true;
            }
          });
        } else if (this.isPDFUpload == 1 && this.isXMLUpload == 2) {
          this.$alert('XML文件上传失败', {
            confirmButtonText: '确定',
          });
        } else if (this.isPDFUpload == 2 && this.isXMLUpload == 1) {
          this.$alert('PDF文件上传失败', {
            confirmButtonText: '确定',
          });
        } else if (this.isPDFUpload == 2 && this.isXMLUpload == 2) {
          this.$alert('文件上传失败', {
            confirmButtonText: '确定',
          });
        }
      },
    },
  }
</script>

<style scoped>
  .el-tabs--border-card {
    height: 1000px;
    overflow: auto;
  }

  .fortifyPanel {
    border-radius: 2px;
  }

  .fortifyPanel .panel-header {
    border: 1px solid #dcdfe6;
    background: #fff;
    overflow: hidden;
    padding: 70px 0px 15px;
  }

  .fortifyPanel .panel-header .col-md-6 {
    margin-bottom: 30px;
  }

  .fortifyPanel .fortifyTitle {
    padding-left: 15px;
    position: absolute;
    top: 30px;
  }

  .fortifybody {
    border: 1px solid #dcdfe6;
    overflow: hidden;
    border-radius: 2px;
    margin-top: 20px;
  }

  .fortifyPre {
    height: 475px;
    overflow: hidden;
  }

  .fortifyPre .explanation-body, .fortifyPre .reco-body {
    height: 415px;
    overflow-y: auto;
    overflow-x: hidden;
    word-break: break-all;
    white-space: pre-line;
  }
</style>
