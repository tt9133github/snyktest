<style>
  .licenseEchartBar {
    width: 430px;
    height: 310px;
    margin-left: -15px;
  }
</style>

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
                      <i class="fa fa-circle-o text-blue"></i>&nbsp;开源组件许可证分析&nbsp;&nbsp;
                    </p>
                  </b>
                </h5>
                <hr>
                <p>
                  开源许可证是开源软件的作者对用户使用其开源软件的法律许可。开源许可证都有各自的授权条款，当不同开源许可证的条款出现冲突时，许可证不兼容。使用不兼容的许可证会有知识产权风险。系统通过检测开源组件的许可证信息，分析许可证的兼容性和商用友好性，使用户能够安全使用开源组件。</p>
              </div>
              <!-- /.box-body -->
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="box box-solid box-default box-style-400">
              <div class="box-header with-border">
                <p>
                  <b>
                    <i class="fa fa-tags"></i>&nbsp;&nbsp;许可证兼容性统计</b>
                  <!--                            &nbsp;&nbsp;License compatibility statistics-->
                </p>
              </div>
              <div class="box-body box-profile">
                <center>
                  <div class="licenseEchartBar" id="licenseBar"></div>
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
                    <i class="fa fa-tags"></i>&nbsp;&nbsp;许可证商用性统计</b>
                  <!--                            &nbsp;&nbsp;License business analysis-->
                </p>
              </div>
              <div class="box-body box-profile">
                <center>
                  <div class="licenseEchartBar" id="licenseBusiBar"></div>
                </center>
              </div>
              <!-- /.box-body -->
            </div>
          </div>
          <div class="col-md-12">
            <el-tabs type="border-card">
              <el-tab-pane label="许可证类兼容性详情">
                <Mytable :data="tableLicense"></Mytable>
              </el-tab-pane>
              <el-tab-pane label="许可证商用性分析">
                <h4 v-show="componentlicense.length==0">检测项目未包含任何许可证信息！</h4>
                <div class="row">
                  <!--license商用友好性检测详情-->
                  <div class="col-md-12" v-for="term in componentlicense">
                    <div class="box box-solid box-primary" v-show="term.type==0">
                      <!-- /.000 -->
                      <div class="box-header">
                        <h3 class="box-title">{{term.license}}</h3>
                      </div>
                      <!-- /.box-header -->
                      <div class="box-body" style="min-height:100px">
                        <dd>
                          <i class="fa fa-map-marker margin-r-5"></i>来源&nbsp;&nbsp;
                          <span class="label label-default">{{term.projects.length}}</span>
                          <i class="fa fa-adjust margin-r-5 pull-right text-primary">商用性未知</i>
                          <br/>
                          <br/>
                          <div class="row">
                            <div class="col-md-3" v-for="item in term.projects">
                                                    <span>
                                                        <a target="_blank" v-bind:href="item.url">
                                                            <small>
                                                                <i class="glyphicon glyphicon-folder-open"></i>&nbsp;&nbsp;&nbsp;</small>{{item.project_name}}</a>
                                                    </span>
                            </div>
                          </div>
                        </dd>
                      </div>
                      <!-- /.box-body -->
                      <div class="box-footer">

                        <a :href="getLicenseUrl(term.map_id)" class="btn btn-default" v-show="term.map_id<21" target="_blank">
                          <i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;详情</a>

                        <a class="btn btn-default" target="_blank" v-bind:href="term.link">
                          <i class="fa fa-paper-plane  ">&nbsp;&nbsp;链接</i></a>
                        <!--
                                                <a class="btn btn-primary disabled" v-show="term.map_id>21">
                                                    <i class="fa fa-arrow-circle-right"></i>暂无收录</a>
                        -->
                      </div>
                      <!-- /.box-footer-->
                    </div>
                    <!-- /.box -->
                    <div class="box box-solid box-success" v-show="term.type==1">
                      <!-- /.111 -->
                      <div class="box-header">
                        <h3 class="box-title">{{term.license}}</h3>
                      </div>
                      <!-- /.box-header -->
                      <div class="box-body" style="min-height:100px">
                        <dd>
                          <i class="fa fa-map-marker margin-r-5 "></i>来源&nbsp;&nbsp;
                          <span class="label label-default">{{term.projects.length}}</span>
                          <i class="fa fa-thumbs-o-up margin-r-5 text-green pull-right ">商用友好</i>
                          <br/>
                          <br/>
                          <div class="row">
                            <div class="col-md-3" v-for="item in term.projects">
                                                    <span>
                                                        <a target="_blank" v-bind:href="item.url">
                                                            <small>
                                                                <i class="glyphicon glyphicon-folder-open"></i>&nbsp;&nbsp;&nbsp;</small>{{item.project_name}}</a>
                                                    </span>
                            </div>
                          </div>
                        </dd>
                      </div>
                      <!-- /.box-body -->
                      <div class="box-footer">
                        <a :href="getLicenseUrl(term.map_id)" class="btn btn-default" v-show="term.map_id<21" target="_blank">
                          <i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;详情</a>
                        <a class="btn btn-default" target="_blank" v-bind:href="term.link">
                          <i class="fa fa-paper-plane  ">&nbsp;&nbsp;链接</i></a>
                        <!--
                                                <a class="btn btn-primary disabled" v-show="term.map_id>21">
                                                    <i class="fa fa-arrow-circle-right"></i>暂无收录</a>
                        -->
                      </div>
                      <!-- /.box-footer-->
                    </div>
                    <!-- /.box -->
                    <div class="box box-solid box-warning" v-show="term.type==2">
                      <!-- /.222 -->
                      <div class="box-header">
                        <h3 class="box-title">{{term.license}}</h3>
                      </div>
                      <!-- /.box-header -->
                      <div class="box-body " style="min-height:100px">
                        <dd>
                          <i class="fa fa-map-marker margin-r-5"></i>来源&nbsp;&nbsp;
                          <span class="label label-default">{{term.projects.length}}</span>
                          <i class="fa fa-thumbs-o-down margin-r-5 text-red pull-right ">商用不友好</i>
                          <br/>
                          <br/>
                          <div class="row">
                            <div class="col-md-3" v-for="item in term.projects">
                                                    <span>
                                                        <a target="_blank" v-bind:href="item.url">
                                                            <small>
                                                                <i class="glyphicon glyphicon-folder-open"></i>&nbsp;&nbsp;&nbsp;</small>{{item.project_name}}</a>
                                                    </span>
                            </div>
                          </div>
                        </dd>
                      </div>
                      <!-- /.box-body -->
                      <div class="box-footer">
                        <a :href="getLicenseUrl(term.map_id)" class="btn btn-default" v-show="term.map_id<21" target="_blank">
                          <i class="fa fa-arrow-circle-right"></i>&nbsp;&nbsp;详情</a>
                        <a class="btn btn-default" target="_blank" v-bind:href="term.link">
                          <i class="fa fa-paper-plane  ">&nbsp;&nbsp;链接</i></a>
                        <!--
                        <a class="btn btn-primary disabled" v-show="term.map_id>21">
                            <i class="fa fa-arrow-circle-right"></i>暂无收录</a>
                        -->
                      </div>
                      <!-- /.box-footer-->
                    </div>
                    <!-- /.col -->
                  </div>
                  <!-- /.box -->
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div style="height:180px;"></div>
      </section>
    </div>
  </div>
</template>

<script>
  import {
    getTaskData,

  } from '../../../style/js/result/util.js';
  import {
    initLicenseBar,
    initLicensePie,
    initLicenseBusiBar
  } from '../../../style/js/result/chartUtil.js';
  import Mytable from '../../../components/tables/table-license.vue';

  export default {
    components: {
      Mytable
    },
    data: function () {
      return {
        //任务id
        task_id: '',
        user_id: '',
        //根据项目成份检测出的license详情列表
        componentlicense: [],
        license_list: [],
        license_detail: [],
        licenseBar: '',
        licensePie: '',
        licenseBusiBar: '',
        tableLicense: [],
        listChildren: []
      }
    },

    mounted: function () {
      this.getLicenseCompatity();
      this.getLicenseCommercial();
    },

    created: function () {
      this.task_id = this.$route.params.id;
      this.user_id = JSON.parse(localStorage.getItem('user')).id;
    },

    methods: {
      getLicenseCompatity() {
        this.$http.get("/api/license/compatibility/" + this.task_id).then(response => {
          this.license_list = response.data;
          initLicenseBar(this.licenseBar, "licenseBar", response.data);
          initLicensePie(this.licensePie, "licensePie", response.data);
          this.tableLicense = response.data.license_list;
        });
      },

      getLicenseCommercial() {
        this.$http.get("/api/license/commercial/" + this.task_id).then(response => {
          this.componentlicense = response.data;
          initLicenseBusiBar(this.licenseBusiBar, "licenseBusiBar", this.componentlicense);
        });
      },

      rowExpand: function (row) {
        //this.listChildren = row.children;
        console.log(row)
      },

      getLicenseUrl: function (project_id) {
        var vm = this;
        return '#/license?' + project_id + '=' + vm.task_id;
      },

      getLicenseUrl: function (project_id) {
        var vm = this;
        return '#/license?' + project_id + '=' + vm.task_id;
      },

      getLicenseDetail(id) {
        var vm = this;
        vm.license_detail = [];
        getTaskData(vm.task_id + '/' + id, vm.license_detail);
      },

    },

  }

</script>
