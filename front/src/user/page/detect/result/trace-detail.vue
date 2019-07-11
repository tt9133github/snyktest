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
                      <i class="fa fa-circle-o text-red"></i>&nbsp;溯源推荐&nbsp;&nbsp;
                    </p>
                  </b>
                </h5>
                <hr>
                <p>
                  溯源推荐：对检测项目包含的开源成份进行分析，主要包括检测项目的克隆文件分别来自哪些开源项目，对应的开源文件及路径等。</p>
              </div>
            </div>
          </div>
        </div>
        <div class="box box-solid box-default ">
          <div class="box-header with-border">
            <p>
              <b>
                <i class="fa fa-folder-open-o"></i>&nbsp;&nbsp;检测项目成份TOP10</b>
            </p>
          </div>
          <div class="box-body">
            <div class="col-md-12">
              <center>
                <div class="cloneFromEchart" id="chartComponent"></div>
              </center>
            </div>
          </div>
        </div>
        <div class="box box-solid box-default ">
          <div class="box-header with-border">
            <p>
              <b>
                <i class="fa fa-folder-open-o"></i>&nbsp;&nbsp;检测项目成份溯源分析</b>
            </p>
          </div>
          <div class="box-body">
            <table class="table table-bordered table-hover table-striped table-style">
              <thead>
              <tr>
                <th width="20%">项目名称</th>
                <th width="20%">项目版本</th>
                <th width="13%">项目热度</th>
                <th width="12%">项目文件总数</th>
                <th width="10%">项目总容量</th>
                <th width="14%">溯源文件容量</th>
                <th width="16%">溯源文件数量</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in project_list">
                <td class="wrap">
                  <a v-bind:href="item.url" target="_blank">{{item.project_name}}</a>
                </td>
                <td class="AutoNewline">{{item.version}}</td>
                <td class="AutoNewline"><span>
                                    <a v-show="item.popularity==0" style="padding-right:58px;">
                                        <i class="fa fa-star"></i></a>
                                    <a v-show="item.popularity==1" style="padding-right:40px;">
                                        <i class="fa fa-star"></i>&nbsp;
                                        <i class="fa fa-star"></i></a>
                                    <a v-show="item.popularity==2" style="padding-right:32px;">
                                        <i class="fa fa-star"></i>&nbsp;
                                        <i class="fa fa-star"></i>&nbsp;
                                        <i class="fa fa-star"></i></a>
                                    <a v-show="item.popularity==3" style="padding-right:20px;">
                                        <i class="fa fa-star"></i>&nbsp;
                                        <i class="fa fa-star"></i>&nbsp;
                                        <i class="fa fa-star"></i>&nbsp;
                                        <i class="fa fa-star"></i></a>
                                    <a v-show="item.popularity==4">
                                        <i class="fa fa-star"></i>&nbsp;
                                        <i class="fa fa-star"></i>&nbsp;
                                        <i class="fa fa-star"></i>&nbsp;
                                        <i class="fa fa-star"></i>&nbsp;
                                        <i class="fa fa-star"></i></a>&nbsp;</span>
                </td>
                <td class="AutoNewline">{{item.all_files}}</td>
                <td class="AutoNewline">{{item.all_size}}KB</td>
                <td class="AutoNewline">{{item.match_size}}KB</td>
                <td class="AutoNewline ">
                  <button class="btn btn-default" data-toggle="modal" data-target="#myModal3" @click="getFile(item.project_id)" style="width:55px;text-align: center;">
                    {{item.match_number}}
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3">
          <div class="modal-dialog" style="width:960px" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click=getButtonId()>
                  <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">检测项目成份溯源详情</h4>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-12">
                    <el-table :data="chosed" stripe height="650px">
                      <el-table-column label="序号" type="index" width="60px" align="center">
                        <template slot-scope="scope">
                          {{(currentPage - 1) * pageSize + scope.$index + 1}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="check_file_name" label="溯源文件名称" width="180px">
                      </el-table-column>
                      <el-table-column prop="check_path" label="溯源文件路径" width="250px">
                      </el-table-column>
                      <el-table-column prop="match_file_name" label="来源文件名称" align="center" width="180px">
                      </el-table-column>
                      <el-table-column prop="match_path" label="来源文件路径" width="250px">
                      </el-table-column>
                    </el-table>

                    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>

                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click=getButtonId()>
                    确定
                  </button>
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
  import {
    initChartPie,
  } from '../../../style/js/result/chartUtil.js';

  export default {
    data() {
      return {
        //echart
        componentPie: '',

        //项目成份的匹配详情
        project_list: [],
        cloneInfo: [],
        components_list_detail: [],

        //相似项目匹配到的克隆文件详情
        chosed: [],
        projectId: 0,
        totalCount: 0,
        currentPage: 1,
        pageSize: 6,

        //项目克隆详情
        name: '',
        task_id: '',
      }
    },

    created: function () {
      this.task_id = this.$route.params.id;
      this.getComponent();
    },

    methods: {
      getComponent() {
        this.$http.get("/api/component/top10/" + this.task_id).then(response => {
          this.project_list = response.data;
          this.getCloneInfo();
        });
      },

      getCloneInfo() {
        this.$http.get("/api/task/" + this.task_id + "/info").then(response => {
          this.cloneInfo = response.data;
        });
      },

      handleSizeChange: function (size) {
        this.pageSize = size;
        this.getFile(this.projectId);
      },

      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        this.getFile(this.projectId);
      },

      //获取相似项目的匹配文件详情
      getFile(item) {
        this.projectId = item;
        this.$http.get("/api/detect/project/match/file/" + item, {
          params:
            {
              id: this.task_id,
              pageNo: this.currentPage,
              pageSize: this.pageSize,
            }
        }).then(response => {
          this.totalCount = response.data.totalCount;
          this.chosed = response.data.result;
        });
      },

      //关闭代码详情展示框时，将buttonId初始化为1；
      getButtonId() {
        this.code_index = 1;
        this.buttonId = 1;
      },
    },

    watch: {
      cloneInfo: function (val) {
        var data = {};
        data.clone_files = val.clone_fragment_files + val.hash_prog_main_files + val.hash_no_prog_files + val.hash_prog_no_main_files + val.empty_files_main;
        data.valid_files = val.all_files - val.empty_files;
        data.project_list = this.project_list;
        data.name = val.name;
        initChartPie(this.componentPie, "chartComponent", data);
      },
    }
  }

</script>

<style>
  .cloneFromEchart {
    margin: 10px;
    width: 600px;
    height: 450px;
  }

</style>
