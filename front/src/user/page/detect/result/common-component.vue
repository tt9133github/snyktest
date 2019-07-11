<template>
  <div class="row detect_page">
    <div class="col-md-12">
      <section class="content bg-style">
        <div class="row">
          <div class="col-md-12">
            <div class="box box-solid box-default">
              <!-- /.box-header -->
              <div class="box-body">
                <h5>
                  <b>
                    <p>&nbsp;
                      <i class="fa fa-circle-o text-green"></i>&nbsp;开源项目溯源分析&nbsp;&nbsp;
                    </p>
                  </b>
                </h5>
                <hr>
                <p>
                  开源项目溯源分析：通过特征匹配检测，动态库调用检测，能够发现项目中所包含的开源项目成份，形成完整的开源成份物料清单。同时，用户可以详细了解到项目中所用开源项目的版本情况、更新情况、license情况以及安全漏洞情况等等。</p>
              </div>
              <!-- /.box-body -->
            </div>
          </div>
          <!--/.col-->
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="box box-solid box-default box-style-400">
              <div class="box-header with-border">
                <p>
                  <b>
                    <i class="fa fa-list-alt"></i>&nbsp;&nbsp;开源项目风险等级分布</b>
                  <!--                           &nbsp;&nbsp;Distribution of Component Risk Level-->
                </p>
              </div>
              <div class="box-body box-profile">
                <center>
                  <div class="componentEchart" id="componentComNumBar"></div>
                </center>
              </div>
              <!-- /.box-body -->
            </div>
          </div>
          <div class="col-md-6">
            <div class="box box-solid box-default box-style-400">
              <div class="box-header with-border">
                <p>
                  <b>
                    <i class="fa fa-bomb"></i>&nbsp;&nbsp;漏洞风险等级分布</b>
                  <!--                        &nbsp;&nbsp;Distribution of Vulnerability Risk Level-->
                </p>
              </div>
              <div class="box-body box-profile">
                <center>
                  <div class="componentEchart" id="componentVulNumBar"></div>
                </center>
              </div>
              <!-- /.box-body -->
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="box box-solid box-default">
              <!-- /.box-header -->
              <div class="box-body">
                <h5>
                  <b>
                    <p>&nbsp;
                      <i class="fa fa-circle-o text-green"></i>&nbsp;检测项目包含的开源项目详情
                    </p>
                  </b>
                </h5>
              </div>
              <!-- /.box-body -->
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <el-tabs type="border-card">
              <el-tab-pane label="源代码检测">
                <!--                           <div class="box box-solid box-default">-->
                <!-- /.box-header -->
                <!--					<div class="box-body">-->
                <div>
                  <span style="padding-right: 30px">请选择下列表格的排序方式：</span>
                  <input type="radio" id="number" value="number" v-model="radio">
                  <label for="number" style="margin-bottom: 0px;float:none;font-weight:normal;padding-right: 30px;">按文件匹配数排序</label>
                  <input type="radio" id="percent" value="percent" v-model="radio">
                  <label for="percent" style="margin-bottom: 0px;float:none;font-weight:normal;padding-right: 30px;">按文件利用率排序</label>
                </div>
                <hr style="margin-top: 10px">
                <table class="table table-hover table-bordered table-striped table-hide ">
                  <thead>
                  <!--                                <tr style="background-color:#D8D8D8;color:white">-->
                  <tr>
                    <th width="6%">序号</th>
                    <th width="18%">开源项目名称</th>
                    <th width="12%">项目热度</th>
                    <th width="15%">版本</th>
                    <th width="15%">文件匹配数</th>
                    <th width="12%">文件利用率</th>
                    <th width="15%">安全风险</th>
                    <th width="7%">详情</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(term, index)  in code_component_list_paged">
                    <td>{{ (code_page - 1) * 10 + index + 1 }}</td>
                    <td>
                      <a class="pull-left" :href="term.project_url" target="_blank" :title="term.component_name">{{term.project_name}}</a>
                    </td>
                    <td>
                      <a><span v-show="term.popularity==0">
                                        <i class="fa fa-star"></i>
                                        </span>
                        <span v-show="term.popularity==1">
                                        <i class="fa fa-star"></i>&nbsp;<i class="fa fa-star"></i>
                                        </span>
                        <span v-show="term.popularity==2">
                                        <i class="fa fa-star"></i>&nbsp;<i class="fa fa-star"></i>&nbsp;<i class="fa fa-star"></i>
                                        </span>
                        <span v-show="term.popularity==3">
                                        <i class="fa fa-star"></i>&nbsp;<i class="fa fa-star"></i>&nbsp;<i class="fa fa-star"></i>&nbsp;<i class="fa fa-star"></i>
                                        </span>
                        <span v-show="term.popularity==4">
                                        <i class="fa fa-star"></i>&nbsp;<i class="fa fa-star"></i>&nbsp;<i class="fa fa-star"></i>&nbsp;<i class="fa fa-star"></i>&nbsp;<i class="fa fa-star"></i>
                                        </span></a>
                    </td>
                    <td :title="term.version">{{term.version}}</td>
                    <td><span class="label label-default" title="原文件匹配">{{term.hash_matched}}</span>
                      <span class="label label-primary" title="文件级克隆">{{term.clone_file_matched}}</span>
                      <span class="label label-info" title="代码级克隆">{{term.clone_fragment_matched}}</span>
                    </td>
                    <td>{{(term.file_usage_percent*100).toFixed(2)}}%</td>
                    <td style="padding-top:12px;">
                      <span class="label label-danger" v-show="term.vul_high_num > 0">{{term.vul_high_num}}</span>
                      <span class="label label-warning" v-show="term.vul_medium_num > 0">{{term.vul_medium_num}}</span>
                      <span class="label label-success" v-show="term.vul_low_num > 0">{{term.vul_low_num}}</span>
                      <span class="label label-info" v-show="term.vul_unknown > 0">{{term.vul_unknown}}</span>
                      <span class="label label-default" v-show="term.whole_vul_num==0" style=" color:white">尚无风险</span>
                    </td>
                    <td>
                        <router-link :to="{ path: 'clone/common_component/' + term.project_id }" target="_blank">
                          <i class="fa fa-eye"></i>
                        </router-link>
                      <!--<el-button type="danger" plain size="mini" @click=" ">删除</el-button>-->
                    </td>
                  </tr>
                  </tbody>
                </table>
                <el-pagination @current-change="component_pageChange" :current-page="code_page" :page-size=10 :total="common_component_count">
                </el-pagination>
                <!--                    </div>-->
                <!-- /.box-body -->
                <!--                </div>-->
              </el-tab-pane>
              <el-tab-pane label="二进制检测">
                <table class="table table-hover table-bordered table-striped table-hide ">
                  <thead>
                  <!--<tr style="background-color:#D8D8D8;color:white">-->
                  <tr>
                    <th width="7%">序号</th>
                    <th width="23%">开源项目名称</th>
                    <th width="12%">版本</th>
                    <th width="15%">文件名称</th>
                    <th width="20%">文件路径</th>
                    <th width="13%">安全风险</th>
                    <!--<th width="10%" >操作</th>-->
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(term, index)  in lib_component_list">
                    <td>{{index+1}}</td>
                    <td>
                      <a class="pull-left" :href="term.lib_link" target="_blank">{{term.lib_name == null ? term.artifactId  : term.lib_name}}</a>
                    </td>
                    <td :title="term.lib_version_name">
                      {{term.lib_version_name}}
                    </td>
                    <td :title="term.file_name">{{term.file_name}}</td>
                    <td :title="term.file_path">{{term.file_path}}</td>
                    <td>
                      <span class="label label-danger" v-show="term.component_vul_high !=0">{{term.component_vul_high}}</span>
                      <span class="label label-warning" v-show="term.component_vul_mid != 0">{{term.component_vul_mid}}</span>
                      <span class="label label-success" v-show="term.component_vul_low != 0">{{term.component_vul_low}}</span>
                      <span class="label label-info" v-show="term.component_vul_non != 0">{{term.component_vul_non}}</span>
                      <span class="label label-default" v-show="term.component_vul_low==0&&term.component_vul_high==0&&term.component_vul_mid==0&&term.component_vul_non==0" style=" color:white">尚无风险</span>
                    </td>
                    <!--
                                                        <td>
                                                            <el-button type="danger" plain size="mini" @click=" ">删除</el-button>
                                                        </td>
                    -->
                  </tr>
                  </tbody>
                </table>
              </el-tab-pane>
              <el-tab-pane label="配置文件检测">
                <table class="table table-hover table-bordered table-striped table-hide">
                  <thead>
                  <tr>
                    <th width="7%">序号</th>
                    <th width="20%">开源项目名称</th>
                    <th width="10%">版本</th>
                    <th width="20%">文件名称</th>
                    <th width="20%">文件路径</th>
                    <th width="13%">安全风险</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(term, index)  in conf_component_list_paged">
                    <td>{{ (conf_page - 1) * 10 + index+1}}</td>
                    <td>
                      <a class="pull-left" :href="term.lib_link" target="_blank">{{term.lib_name == null ? term.artifactId  : term.lib_name}}</a>
                    </td>
                    <td>{{term.lib_version_name}}</td>
                    <td :title="term.file_name">{{term.file_name}}</td>
                    <td :title="term.file_path">{{term.file_path == null ? "暂无" : term.file_path}}</td>
                    <td>
                      <span class="label label-danger" v-show="term.component_vul_high!=0">{{term.component_vul_high}}</span>
                      <span class="label label-warning" v-show="term.component_vul_mid!=0">{{term.component_vul_mid}}</span>
                      <span class="label label-success" v-show="term.component_vul_low!=0">{{term.component_vul_low}}</span>
                      <span class="label label-info" v-show="term.component_vul_non!=0">{{term.component_vul_non}}</span>
                      <span class="label label-default" v-show="term.component_vul_high==null||(term.component_vul_high==0&&term.component_vul_mid==0&&term.component_vul_low==0)" style=" color:white">尚无风险</span>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <el-pagination @current-change="conf_pageChange" :current-page="conf_page" :page-size=10 :total="conf_count">
                </el-pagination>
              </el-tab-pane>
            </el-tabs>

          </div>
        </div>
        <!--row-->
        <div style="height:50px"></div>
      </section>
    </div>
  </div>
</template>

<script>
  import {
    initChartBarVul,
    initChartBarLib
  } from '../../../style/js/result/chartUtil.js';

  export default {

    data: function () {
      return {
        conf_page: 1,
        conf_count: 0,
        code_page: 1,
        //任务ID
        task_id: '',
        //代码检测组件详细列表
        common_component_count: 0,
        code_component_list_paged: [],

        //组件包含漏洞数分析
        componentVulNumBar: '',
        //不同漏洞组件数分析
        componentComNumBar: '',

        vul_level: {},
        common_component_all: {},
        radio: "number",
        //二进制组件详细列表
        lib_component_list: [],
        //配置文件组件详细列表
        conf_component_info: [],
        conf_component_list: [],
        conf_component_list_paged: [],
      }
    },

    mounted: function () {
      this.task_id = this.$route.params.id;

      this.getVulSummary();
      this.getComponentVulSummary();

      this.getPagedComponentList();
      this.getBinaryList();
      this.getConfigList();
    },

    methods: {
      getVulSummary() {
        this.$http.get("/api/vul/statistics/" + this.task_id).then(response => {
          this.vul_level = response.data;
        });
      },

      getComponentVulSummary() {
        this.$http.get("/api/component/vul/" + this.task_id).then(response => {
          this.common_component_all = response.data;
        });
      },

      getBinaryList() {
        this.$http.get("/api/detect/binary/" + this.task_id).then(response => {
          this.lib_component_list = response.data.lib_list;
        });
      },

      getConfigList() {
        this.$http.get("/api/detect/config/" + this.task_id).then(response => {
          this.conf_component_list = response.data.lib_list;
        });
      },

      getPagedComponentList() {
        this.$http.get("/api/detect/code",
          {
            params:
              {
                id: this.task_id,
                pageNo: this.code_page,
                pageSize: 10,
                orderBy: this.radio
              }
          }).then(response => {
          this.code_component_list_paged = response.data.result;
          this.common_component_count = response.data.totalCount;
        });
      },

      component_pageChange: function (currentPage) {
        this.code_page = currentPage;
        this.getPagedComponentList();
      },

      conf_pageChange: function (currentPage) {
        if(this.conf_component_list == null)
        {
          return;
        }
        this.conf_count = this.conf_component_list.length;
        this.conf_page = currentPage;
        this.conf_component_list_paged = [];
        let start = 10 * (currentPage - 1);
        let end = 10 * (currentPage - 1) + 10;
        for (var i = start; i < end; i++) {
          if (i == this.conf_component_list.length) {
            return;
          }
          this.conf_component_list_paged.push(this.conf_component_list[i]);
        }
      },
    },

    watch: {
      conf_component_list: function (val) {
        this.conf_pageChange(1);
      },

      vul_level: function (val) {
        initChartBarVul(this.componentVulNumBar, "componentVulNumBar", val);
      },
      common_component_all: function (val) {
        initChartBarLib(this.componentComNumBar, "componentComNumBar", val);
      },
      radio: function () {
        this.getPagedComponentList();
      }
    },
  }
</script>

<style>
  .componentEchart {
    margin-left: -15px;
    width: 430px;
    height: 310px !important;
  }

  .table-hide {
    table-layout: fixed;
    word-wrap: break-word;
  }

  .table-hide td {
    text-overflow: ellipsis;
    /* for IE */
    -moz-text-overflow: ellipsis;
    /* for Firefox,mozilla,在chrome中测试也通过了*/
    overflow: hidden;
    white-space: nowrap;
  }

  .box-style-400 {
    height: 400px;
  }
</style>
