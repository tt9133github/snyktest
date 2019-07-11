<template>
    <div class="row detect_page">
      <div class="col-md-12">
      <section>
        <div class="row">
          <div class="col-md-12">
            <table class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th width="20%">检测项目名称</th>
                    <th width="20%">检测引擎名称</th>
                    <th width="20%">检测开始时间</th>
                    <th width="20%">检测结束时间</th>
                    <th width="20%">耗时</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>{{projectInfo.name}}
                    </td>
                    <td>
                      <el-tag type="info" size="small">CodeClone V3.0</el-tag>
                    </td>
                    <td>{{start_time}}</td>
                    <td>{{finish_time}}</td>
                    <td>{{cost_time}}</td>
                  </tr>
                  </tbody>
                </table>
          </div>
          <!-- ./col -->

          <div class="col-md-3">
            <!-- small box -->
            <div class="card card-stats card-warning pointer" @click="goPage('#tab-2')">
              <div class="clone-card-body ">
                <div class="row ">
                  <div class="col-md-5">
                    <div class="icon-big text-center">
                      <i class="fa fa-clone fa-5x " aria-hidden="true"></i>
                    </div>
                  </div>
                  <div class="col-md-7 align-items-center">
                    <div class="numbers">
                      <p class="card-category">克隆文件</p>
                      <h4 class="card-title">{{cloneFileNum}}</h4>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-md-3">
            <div class="card card-stats card-success pointer" @click="goPage('#tab-3')">
              <div class="clone-card-body ">
                <div class="row">
                  <div class="col-md-5">
                    <div class="icon-big text-center">
                      <i class="fa fa-code-fork fa-5x"></i>
                    </div>
                  </div>
                  <div class="col-md-7 align-items-center">
                    <div class="numbers">
                      <p class="card-category">开源项目溯源</p>
                      <h4 class="card-title">{{openSourceNum}}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-md-3">
            <div class="card card-stats card-danger pointer" @click="goPage('#tab-5')">
              <div class="clone-card-body ">
                <div class="row">
                  <div class="col-md-5">
                    <div class="icon-big text-center">
                      <i class="fa fa-bug fa-5x" ></i>
                    </div>
                  </div>
                  <div class="col-md-7 align-items-center">
                    <div class="numbers">
                      <p class="card-category">开源项目漏洞</p>
                      <h4 class="card-title">{{openSourceVulNum}}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-md-3">
            <div class="card card-stats card-primary">
              <div class="clone-card-body pointer" @click="goPage('#tab-4')">
                <div class="row">
                  <div class="col-md-5">
                    <div class="icon-big text-center">
                      <i class="fa fa-certificate fa-5x"></i>
                    </div>
                  </div>
                  <div class="col-md-7 align-items-center">
                    <div class="numbers">
                      <p class="card-category">开源成份许可证</p>
                      <h4 class="card-title">{{openSourceLicenseNum}}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--检测类别说明-->
          <el-popover
            style="padding-top:0px"
            ref="popover1"
            placement="top-start"
            title="克隆度检测"
            width="250"
            trigger="hover"
            content="检测上传项目克隆的文件数量，检测最细力度为代码片段级">
          </el-popover>
          <el-popover
            ref="popover2"
            placement="top-start"
            title="项目开源项目溯源"
            width="250"
            trigger="hover"
            content="检测上传项目引用的开源项目数量及质量">
          </el-popover>
          <el-popover
            ref="popover3"
            placement="top-start"
            title="开源成份许可证"
            width="250"
            trigger="hover"
            content="检测项目引用开源项目包含的许可证数量、兼容性">
          </el-popover>
          <el-popover
            ref="popover4"
            placement="top-start"
            title="开源成份许可证"
            width="250"
            trigger="hover"
            content="克隆的开源项目包含的许可证数量、兼容性">
          </el-popover>
          <el-popover
            ref="popover5"
            placement="top-start"
            title="加密算法检测"
            width="250"
            trigger="hover"
            content="检测项目中是否使用国产、非国产加密算法">
          </el-popover>
          <el-popover
            ref="popover6"
            placement="top-start"
            title="敏感行为检测"
            width="250"
            trigger="hover"
            content="检测项目中是否包含敏感行为、敏感行为定位分析">
          </el-popover>
          <el-popover
            ref="popover7"
            placement="top-start"
            title="恶意代码检测"
            width="250"
            trigger="hover"
            content="检测项目中是否使用恶意代码">
          </el-popover>
          <el-popover
            ref="popover8"
            placement="top-start"
            title="开源项目包含漏洞"
            width="250"
            trigger="hover"
            content="检测项目引用开源项目包含的CVE漏洞详情及修复建议">
          </el-popover>
          <div class="col-md-12">
            <div class="box box-solid box-default" style="margin-bottom: 0px;">
              <div class="box-header">
                检测功能点及检测结果统计
              </div>
              <div class="box-body ">
                <table class="table table-bordered center ">
                  <thead>
                  <tr>
                    <th width="18%">检测类别</th>
                    <th width="25%">检测内容</th>
                    <th width="15%">检测结果（个）</th>
                    <th width="42%">类别</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td rowspan=2>
                      <br><br><b><i class="fa fa-cog fa-spin" style="color:#BCD4E3;"></i>&nbsp;&nbsp;成份分析</b>
                    </td>
                    <td>
                      <el-button style="width:200px;" size="medium" @click="goPage('#tab-2')">
                        开源成份分析
                      </el-button>
                    </td>
                    <td>
                      <el-tag type="default" style="width:60px;margin-top:5px" size="small">
                        {{detectInfo.file_clone_files + detectInfo.code_clone_files + detectInfo.fingerprint_clone_files}}
                      </el-tag>
                    </td>
                    <td style="padding-top:15px;">
                      <el-row :gutter="10" type="flex" justify="start">

                        <el-col :span="8"><span style="color: #606266;">文&nbsp;件&nbsp;级&nbsp;</span>
                          <el-tooltip class="item" effect="light" :content=fileToolTip placement="top-start">
                            <el-tag type="success" size="small" style="width:50px;" color="#BCD4E3;">
                              {{detectInfo.file_clone_files}}
                            </el-tag>
                          </el-tooltip>
                        </el-col>

                        <el-col :span="8"><span style="color: #606266;">代&nbsp;码&nbsp;级&nbsp;</span>
                          <el-tooltip class="item" effect="light" :content=codeToolTip placement="top-start">
                            <el-tag type="warning" size="small" style="width:50px;">
                              {{detectInfo.code_clone_files}}
                            </el-tag>
                          </el-tooltip>
                        </el-col>

                        <el-col :span="8">
                          <span style="color: #606266;">Hash级&nbsp;&nbsp;</span>
                          <el-tooltip class="item" effect="light" :content=hashToolTip placement="top-start">
                            <el-tag type="danger" size="small" style="width:50px;">
                              {{detectInfo.fingerprint_clone_files}}
                            </el-tag>
                          </el-tooltip>
                        </el-col>

                      </el-row>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-button style="width:200px;" size="medium" @click="goPage('#tab-3')">
                        开源项目溯源
                      </el-button>
                    </td>
                    <td>
                      <el-tag type="default" style="width:60px;margin-top:5px" size="small">
                        {{detectInfo.code_component + detectInfo.lib_component + detectInfo.conf_component}}
                      </el-tag>
                    </td>
                    <td style="padding-top:15px;">
                      <el-row :gutter="10">
                        <el-col :span="8"><span style="color: #606266;">源码引用</span>
                          <el-tag type="success" size="small" style="width:50px;">
                            {{detectInfo.code_component}}
                          </el-tag>
                        </el-col>
                        <el-col :span="8"><span style="color: #606266;">库&nbsp;引&nbsp;用&nbsp;</span>
                          <el-tag type="warning" size="small" style="width:50px;">
                            {{detectInfo.lib_component}}
                          </el-tag>
                        </el-col>
                        <el-col :span="8"><span style="color: #606266;">配置文件</span>
                          <el-tag type="danger" size="small" style="width:50px;">
                            {{detectInfo.conf_component + (detectInfo.php_conf_component == null ? 0 : detectInfo.php_conf_component)}}
                          </el-tag>
                        </el-col>
                      </el-row>
                    </td>
                  </tr>
                  <tr>
                    <td rowspan=1 style="padding-top:18px">
                      <b><i class="fa fa-cog fa-spin" style="color:#336699;" ></i>&nbsp;&nbsp;开源成份许可证</b>
                    </td>
                    <td>
                      <el-button style="width:200px;" size="medium" @click="goPage('#tab-4')">
                        开源成份许可证
                      </el-button>
                    </td>
                    <td>
                      <el-tag type="default" style="width:60px;margin-top:5px" size="small">
                        {{detectInfo.component_no_conflict + detectInfo.component_indirect_conflict + detectInfo.component_conflict}}
                      </el-tag>
                    </td>
                    <td style="padding-top:15px;">
                      <el-row :gutter="10">
                        <el-col :span="8"><span style="color: #606266;">兼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;容&nbsp;</span>
                          <el-tag type="success" size="small" style="width:50px;">
                            {{detectInfo.component_no_conflict}}
                          </el-tag>
                        </el-col>
                        <el-col :span="8"><span style="color: #606266;">条件兼容</span>
                          <el-tag type="warning" size="small" style="width:50px;">
                            {{detectInfo.component_indirect_conflict}}
                          </el-tag>
                        </el-col>
                        <el-col :span="8"><span style="color: #606266;">不&nbsp;兼&nbsp;容&nbsp;</span>
                          <el-tag type="danger" size="small" style="width:50px;">
                            {{detectInfo.component_conflict}}
                          </el-tag>
                        </el-col>
                      </el-row>
                    </td>
                  </tr>
                  <tr>
                    <td rowspan=3>
                      <br><br><br><b><i class="fa fa-cog fa-spin" style="color:#cccc99;"></i>&nbsp;&nbsp;风险预警</b>
                    </td>
                    <td>
                      <el-button style="width:200px;" size="medium" @click="goPage('#tab-7')">
                        加密算法检测
                      </el-button>
                    </td>
                    <td>
                      <el-tag type="default" style="width:60px;margin-top:5px" size="small">
                        {{detectInfo.symmetric + detectInfo.asymmetric + detectInfo.hash}}
                      </el-tag>
                    </td>
                    <td style="padding-top:18px;">
                      <el-row :gutter="10">
                        <el-col :span="8"><span style="color: #606266;">对&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称&nbsp;</span>
                          <el-tag type="success" size="small" style="width:50px;">
                            {{detectInfo.symmetric}}
                          </el-tag>
                        </el-col>
                        <el-col :span="8"><span style="color: #606266;">非&nbsp;对&nbsp;称&nbsp;</span>
                          <el-tag type="warning" size="small" style="width:50px;">
                            {{detectInfo.asymmetric}}
                          </el-tag>
                        </el-col>
                        <el-col :span="8"><span style="color: #606266;">HASH&nbsp;&nbsp;&nbsp;</span>
                          <el-tag type="danger" size="small" style="width:50px;">
                            {{detectInfo.hash}}
                          </el-tag>
                        </el-col>
                      </el-row>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-button style="width:200px;" size="medium" @click="goPage('#tab-8')">
                        敏感行为检测
                      </el-button>
                    </td>
                    <td>
                      <el-tag type="default" style="width:60px;margin-top:5px" size="small">
                        {{detectInfo.sensitive_low + detectInfo.sensitive_mid + detectInfo.sensitive_high}}
                      </el-tag>
                    </td>
                    <td style="padding-top:18px;">
                      <el-row :gutter="10">
                        <el-col :span="8"><span style="color: #606266;">低&nbsp;风&nbsp;险&nbsp;</span>
                          <el-tag type="success" size="small" style="width:50px;">
                            {{detectInfo.sensitive_low}}
                          </el-tag>
                        </el-col>
                        <el-col :span="8"><span style="color: #606266;">中&nbsp;风&nbsp;险&nbsp;</span>
                          <el-tag type="warning" size="small" style="width:50px;">
                            {{detectInfo.sensitive_mid}}
                          </el-tag>
                        </el-col>
                        <el-col :span="8"><span style="color: #606266;">高&nbsp;风&nbsp;险&nbsp;</span>
                          <el-tag type="danger" size="small" style="width:50px;">
                            {{detectInfo.sensitive_high}}
                          </el-tag>
                        </el-col>
                      </el-row>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-button style="width:200px;" size="medium" @click="goPage('#tab-6')">
                        恶意代码检测
                      </el-button>
                    </td>
                    <td>
                      <el-tag type="default" style="width:60px;margin-top:5px" size="small">
                        {{detectInfo.suspect_number + detectInfo.confirm_number}}
                      </el-tag>
                    </td>
                    <td style="padding-top:18px;">
                      <el-row :gutter="10">
                        <el-col :span="8"><span style="color: #606266;">疑似恶意&nbsp;</span>
                          <el-tag type="success" size="small" style="width:50px;">
                            {{detectInfo.suspect_number}}
                          </el-tag>
                        </el-col>
                        <el-col :span="8"><span style="color: #606266;">恶&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;意&nbsp;</span>
                          <el-tag type="warning" size="small" style="width:50px;">
                            {{detectInfo.confirm_number}}
                          </el-tag>
                        </el-col>
                      </el-row>
                    </td>
                  </tr>

                  <tr>
                    <td rowspan=1 style="padding-top:18px">
                      <b><i class="fa fa-cog fa-spin" style="color:#0088C7;"></i>&nbsp;&nbsp;漏洞分析</b>
                    </td>
                    <td>
                      <el-button style="width:200px;" size="medium" @click="goPage('#tab-5')">
                        组件漏洞
                      </el-button>
                    </td>
                    <td>
                      <el-tag type="default" style="width:60px;margin-top:5px" size="small">
                        {{detectInfo.vul_low + detectInfo.vul_mid + detectInfo.vul_high}}
                      </el-tag>
                    </td>
                    <td style="padding-top:18px;">
                      <el-row :gutter="10">
                        <el-col :span="8"><span style="color: #606266;">低&nbsp;风&nbsp;险&nbsp;</span>
                          <el-tag type="success" size="small" style="width:50px;">
                            {{detectInfo.vul_low}}
                          </el-tag>
                        </el-col>
                        <el-col :span="8"><span style="color: #606266;">中&nbsp;风&nbsp;险&nbsp;</span>
                          <el-tag type="warning" size="small" style="width:50px;">
                            {{detectInfo.vul_mid}}
                          </el-tag>
                        </el-col>
                        <el-col :span="8"><span style="color: #606266;">高&nbsp;风&nbsp;险&nbsp;</span>
                          <el-tag type="danger" size="small" style="width:50px;">
                            {{detectInfo.vul_high}}
                          </el-tag>
                        </el-col>
                      </el-row>
                    </td>
                  </tr>
                  </tbody>
                </table>
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
        //基础信息
        task_id: '',
        start_time: '',
        finish_time: '',
        cost_time: '',
        projectInfo: [],
        //获取检测结果统计信息
        detectInfo: [],
        cloneFileNum: 0,
        openSourceNum: 0,
        openSourceVulNum: 0,
        openSourceLicenseNum: 0,

        //提示
        hashToolTip: '文件Hash值与开源项目匹配，即文件完全一致。',
        codeToolTip: '代码预处理后与开源代码匹配，即代码内容类似或结构类似',
        fileToolTip: '文件预处理后与开源项目匹配，即文件类似。'
      }
    },

    mounted: function () {
      this.task_id = this.$route.params.id;
      this.getTaskInfo();
      this.getDetectInfo();
    },

    methods: {
      goPage(val) {
        this.$emit("goPage", val);
      },

      getTaskInfo() {
        this.$http.get("/api/task/" + this.task_id + "/info").then(response => {
          this.projectInfo = response.data;
        });
      },

      getDetectInfo() {
        this.$http.get("/api/detect/" + this.task_id).then(response => {
          let resutl = response.data;
          this.detectInfo = resutl;
          this.cloneFileNum = resutl.file_clone_files + resutl.code_clone_files + resutl.fingerprint_clone_files;
          this.openSourceNum = resutl.code_component + resutl.lib_component + resutl.conf_component;
          this.openSourceVulNum = resutl.vul_low + resutl.vul_mid + resutl.vul_high;
          this.openSourceLicenseNum = resutl.component_no_conflict + resutl.component_indirect_conflict + resutl.component_conflict;
        });
      }
    },

    watch: {
      projectInfo: function () {
        var vm = this;
        var newDate = new Date();
        //将任务创建时间转换成当地时间，格式为：2014年6月18日 上午10:33:24
        newDate.setTime(this.projectInfo.start_time);
        vm.start_time = newDate.toLocaleString();

        //将任务结束时间转化为当地时间
        newDate.setTime(this.projectInfo.finish_time);
        vm.finish_time = newDate.toLocaleString();

        var cost = this.projectInfo.finish_time - this.projectInfo.start_time;
        let hours = parseInt(cost / 1000 / 60 / 60);
        let mins = parseInt((cost - hours*60*60*1000) / 1000 / 60);
        let secs = parseInt((cost - hours*60*60*1000 - mins*60*1000) / 1000);
        this.cost_time = (hours == 0 ? "" : hours + "小时") + (mins == 0 ? "" : mins + "分") + secs + "秒";
      }
    }
  }

</script>
<style>
  .center {
    text-align: center;
  }

  .center > thead > tr > th {
    text-align: center;
  }

  .card {
    border-radius: 0px;
    background-color: #ffffff;
    -webkit-box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
    -moz-box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
    box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
    border: 1px solid #eee;
    min-height: 100px;
  }

  .card-warning {
    background: #fbad4c;
  }

  .card-success {
    background: #59d05d;
  }

  .card-danger {
    background: #ff646d;
  }

  .card-primary {
    background: #1D62F0;
  }

  .card-default, .card-primary, .card-info, .card-success, .card-warning, .card-danger {
    color: #ffffff;
    border: 0px;
  }

  .clone-card-body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1.25rem;
  }

  .card .card-category {
    margin-top: 5px;
    font-size: 14px;
    font-weight: 400;
  }
</style>
