<style>
  .border-style {
    border-bottom: 1px solid #e5e5e5;
    padding: 10px;
    font-size: 16px;
    margin: 10px;
  }

  .modal-code {
    width: 1200px
  }

  .modal {
    scroll-y: hidden;
  }

  .code-path {
    word-break: break-all;
  }

  .code-body {
    height: 500px;
    width: 570px;
  }

  .match_file {
    padding: 10px;
  }

</style>

<template>
  <div>
    <div style="background-color:white;min-height:850px;padding: 10px;">

      <div class="match_file">
        <div class="border-style">
          <h4><a><i class="fa fa-copy"></i></a>&nbsp;&nbsp;匹配详情</h4>
        </div>
        <el-tabs type="border-card" >
          <el-tab-pane label="原文件匹配">
            <!--原文件（hash）级克隆分页获取数据-->
            <el-table :data=" hashFileList" stripe>
              <el-table-column label="序号" type="index" align="center">
                <template slot-scope="scope">
                  {{(currentPage_hash - 1) * pageSize_hash + scope.$index + 1}}
                </template>
              </el-table-column>
              <el-table-column prop="lfilename" label="左侧文件名称">
              </el-table-column>
              <el-table-column prop="rfilename" label="右侧文件路径">
              </el-table-column>
              <el-table-column prop="similarity" label="相似度" align="center">
                <template slot-scope="scope">
                  {{parseInt(scope.row.similarity * 100)}}%
                </template>
              </el-table-column>
<!--              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button data-toggle="modal" data-target="#myModalHash" @click="codeCompare(scope.row)" size="mini" type="primary" icon="el-icon-view" plain></el-button>
                </template>
              </el-table-column>-->
            </el-table>
            <br>
            <center>
              <el-pagination @current-change="handelHashPageChange" :current-page="currentPage_hash" :page-size="pageSize_hash" layout="total, prev, pager, next" :total="hash_count">
              </el-pagination>
            </center>
          </el-tab-pane>
          <el-tab-pane label="文件级克隆">
            <!--文件级克隆分页获取数据-->
            <el-table :data=" cloneFileList" stripe>
              <el-table-column label="序号" type="index" align="center">
                <template slot-scope="scope">
                  {{(currentPage_file - 1) * pageSize_file + scope.$index + 1}}
                </template>
              </el-table-column>
              <el-table-column label="克隆文件名称">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>文件路径: {{scope.row.lpath}}</p>
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row.lfilename}}
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="匹配文件名称">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>文件路径: {{ scope.row.rpath}}</p>
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row.rfilename}}
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="similarity" label="相似度" align="center">
                <template slot-scope="scope">
                  {{parseInt(scope.row.similarity * 100)}}%
                </template>
              </el-table-column>
              <!--<el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button data-toggle="modal" data-target="#myModalHash" @click="codeCompare(scope.row)" size="mini" type="primary" icon="el-icon-view" plain></el-button>
                </template>
              </el-table-column>-->
            </el-table>
            <br>
            <center>
              <el-pagination @current-change="handelFilePageChange" :current-page="currentPage_file" :page-size="pageSize_file" layout="total, prev, pager, next" :total="file_clone_count">
              </el-pagination>
            </center>
          </el-tab-pane>
          <el-tab-pane label="代码级克隆">
            <el-table :data=" codeCloneList" stripe>
              <el-table-column label="序号" type="index" align="center">
                <template slot-scope="scope">
                  {{(currentPage_code - 1) * pageSize_code + scope.$index +
                  1}}
                </template>
              </el-table-column>
              <el-table-column label="左侧文件名称">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>文件路径: {{scope.row.lpath}}</p>
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row.lfilename}}
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="右侧文件名称">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>文件路径: {{ scope.row.rpath}}</p>
                    <div slot="reference" class="name-wrapper">
                      {{ scope.row.rfilename}}
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="similarity" label="相似度" align="center">
                <template slot-scope="scope">
                  {{parseInt(scope.row.similarity * 100)}}%
                </template>
              </el-table-column>
              <!--<el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button data-toggle="modal" data-target="#myModalHash" @click="codeCompare(scope.row)" size="mini" type="primary" icon="el-icon-view" plain></el-button>
                </template>
              </el-table-column>-->
            </el-table>
            <br>
            <center>
              <el-pagination @current-change="handleCurrentChangeCode" :current-page="currentPage_code" :page-size="pageSize_code" layout="total, prev, pager, next, jumper" :total="code_clone_count">
              </el-pagination>
            </center>
          </el-tab-pane>
        </el-tabs>

      </div>

      <Footer></Footer>
    </div>

    <div class="modal fade" id="myModalHash" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-code" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click=getButtonId()>
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">文件级代码克隆检测详情</h4>
          </div>
          <div class="modal-body">
            <div class="row n">
              <div class="col-md-6">
                <p><b><a>左侧文件名称：</a></b>{{current_fileInfo.lfilename}}</p>
                <p class="code-path"><b><a>左侧文件路径：</a></b>{{current_fileInfo.lpath}}
                </p>
              </div>
              <div class="col-md-6">
                <p><b><a>右侧文件名称：</a></b>{{current_fileInfo.rfilename}}</p>
                <p class="code-path"><b><a>右侧文件路径：</a></b>{{current_fileInfo.rpath}}
                </p>
              </div>
            </div>

            <nav id="navbar-example" class="navbar-default navbar-static" role="navigation">
              <div class="container-fluid">
                <div class="navbar-header">
                  <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-js-navbar-scrollspy">
                    <span class="sr-only">切换导航</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" style="font-size:16px;">匹配的代码片段</a>
                </div>
                <div class="collapse navbar-collapse bs-js-navbar-scrollspy" style="padding:0">
                  <ul class="nav navbar-nav">
                    <li v-for="(item,index) in current_fileInfo.same_fragmentList">
                      <a v-on:click="getIndex(index)" v-bind:class="{'bg-color-HEX4': buttonId==index}">代码片段{{index
                        + 1}}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div class="row n">
              <div class="col-md-6">
                <pre class="code-body slim-bar" v-highlight>
                    <code v-html="check_fragment"></code>
                  </pre>
              </div>
              <div class="col-md-6">
                                <pre class="code-body slim-bar" v-highlight>
                    <code v-html="source_fragment"></code>
                  </pre>
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
  </div>
</template>

<script>
  import {
    initChartBarElement,
    initChartBarElemensize
  } from '../../../style/js/result/chartUtil.js';

  export default {

    data: function () {
      return {
        isFinger: 0, //0:sourcecode 1:token

        name: "",
        file: 0,
        file2: 0,
        threshold: 0.6,
        granularity: 10,
        fileInfo: "选择文件",
        fileInfo2: "选择文件",
        uploading: false,
        uploading2: false,

        user_id: '',
        task_id: 0,

        //others
        result: {},
        elementBarL: '',
        elementBarR: '',
        element_list: '',
        radio: "number",
        currentPage_hash: 1,
        pageSize_hash: 7,
        hashFileList: [],
        hash_count: 0,

        currentPage_file: 1,
        pageSize_file: 7,
        cloneFileList: [],
        file_clone_count: 0,

        currentPage_code: 1,
        pageSize_code: 7,
        codeCloneList: [],
        code_clone_count: 0,

        current_fileInfo: [],

        //modal
        check_fragment: "",
        source_fragment: "",
        buttonId: 0,

        //step
        active: 0,
        progress: 0,

        //interval
        interval1: {}
      };
    },

    methods: {
      getPagedHashClone() {
        this.$http.get("/api/tool/task/pair/match/hash",
          {
            params:
              {
                id: this.task_id,
                pageNo: this.currentPage_hash,
                pageSize: this.pageSize_hash,
              }
          }).then(response => {
          this.hashFileList = response.data.result;
          this.hash_count = response.data.totalCount;
        });
      },

      getPagedFileClone() {
        this.$http.get("/api/tool/task/pair/match/file",
          {
            params:
              {
                id: this.task_id,
                pageNo: this.currentPage_file,
                pageSize: this.pageSize_file,
              }
          }).then(response => {
          this.cloneFileList = response.data.result;
          this.file_clone_count = response.data.totalCount;
        });
      },

      getPagedCodeClone() {
        this.$http.get("/api/tool/task/pair/match/code",
          {
            params:
              {
                id: this.task_id,
                pageNo: this.currentPage_code,
                pageSize: this.pageSize_code,
              }
          }).then(response => {
          this.codeCloneList = response.data.result;
          this.code_clone_count = response.data.totalCount;
        });
      },

      getResult() {
        this.$http.get("/api/tool/inter_compare/?taskId=" + this.task_id).then(response => {
          this.result = response.data.summary;
          this.element_list = response.data.element_l;
          this.element_listR = response.data.element_r;
          initChartBarElement(this.elementBarL, "elementBarL", this.element_list, 0);
          initChartBarElement(this.elementBarR, "elementBarR", this.element_listR, 0);
        });

        this.getPagedHashClone();
        this.getPagedFileClone();
        this.getPagedCodeClone();
      },

      granularityCheck: function () {
        var vm = this;
        if (vm.granularity === "") {
          vm.granularity = 10;
          return;
        }
        vm.granularity = parseInt(vm.granularity);
        if (vm.granularity < 10 || vm.granularity > 100) {
          alert("请输入正确的分析粒度(范围15~100)");
          vm.granularity = 10;
          return;
        }
      },

      thresholdCheck: function () {
        var vm = this;
        if (vm.threshold === "") {
          vm.threshold = 0.6;
          return;
        }
        vm.threshold = parseFloat(vm.threshold).toFixed(1);
        if (vm.threshold < 0.5 || vm.threshold > 1.0) {
          alert("请输入正确的检测阈值(范围0.5~1.0)");
          vm.threshold = 0.6;
          return;
        }
      },

      typeChange: function () {
        var vm = this;
        vm.granularity = 10;
        vm.threshold = 0.6;
      },

      //文件级
      handelFilePageChange: function (currentPage) {
        this.currentPage_file = currentPage;
        this.getPagedFileClone();
      },

      //hash
      handelHashPageChange: function (currentPage) {
        this.currentPage_hash = currentPage;
        this.getPagedHashClone();
      },

      //代码级
      handleCurrentChangeCode: function (currentPage) {
        this.currentPage_code = currentPage;
        this.getPagedCodeClone();
      },

      //通过代码片段index,切换显示内容
      getIndex(term) {
        this.buttonId = term;
        this.codeCompare(this.current_fileInfo);
      },

      //克隆文件展示页面
      codeCompare(row) {
        this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.current_fileInfo = row;

        this.checkStartLine = 1;
        this.matchStartLine = 1;
        var v = this;
        if (row.same_fragment_content == null) {
          this.$http.get("/api/tool/clone/pair/match/file/" + this.task_id,
            {
              params:
                {
                  match_type: row.match_type,
                  check_path: this.result.l_prefix + "/" + row.lpath, //path for finding file
                  check_file_name: row.lpath, //file_name for finding start line
                  match_path: this.result.r_prefix + "/" + row.rpath,
                  match_file_name: row.rpath,
                }
            }).then(response => {
            this.check_fragment = response.data.sourceFile;
            this.source_fragment = response.data.matchFile;
            v.loading.close();

            if((this.check_fragment) != null && (this.source_fragment != null))
            {
              //this.addLineNumber();

            }
            else
            {
              this.check_fragment = response.data.matchStart;
              this.source_fragment = response.data.sourceStart;
            }
          }, (response) => {
            v.loading.close();
            alert("没有找到对应文件");
          });
        }
        else {
          this.check_fragment = row.same_fragment_content[this.buttonId].check_fragment;
          this.source_fragment = row.same_fragment_content[this.buttonId].source_fragment;
          let lineStr = row.same_fragment_line;
          let lineObj = lineStr.substring(1, lineStr.length - 2).split(",");
          this.matchStartLine = lineObj[2];
          this.checkStartLine = lineObj[0];

          //this.addLineNumber();
          this.loading.close();

        }
      },

      addLineNumber() {
        var lines = this.source_fragment.split("\n")
        var codeWithLines = "";
        for(var i = 0; i < lines.length; i++)
        {
          codeWithLines += this.matchStartLine +  " " + lines[i] + "\n";
          this.matchStartLine++;
        }
        this.source_fragment = codeWithLines;

        var checklines = this.check_fragment.split("\n")
        var checkCodeWithLines = "";

        for(var i = 0; i < checklines.length; i++)
        {
          checkCodeWithLines += this.checkStartLine +  " " + checklines[i] + "\n"
          this.checkStartLine++;
        }
        this.check_fragment = checkCodeWithLines;
      }
    },

    mounted: function () {
      this.user_id = JSON.parse(localStorage.getItem('user')).id;
      this.task_id = this.$route.params.id;
      this.getResult();
    },

    watch: {
      active: function (val) {
        if(val == 2)
        {
          this.getResult();
        }
      },

      radio: function (val) {
        if (val == "number") {
          initChartBarElement(this.elementBarL, "elementBarL", this.element_list, 0);
          initChartBarElement(this.elementBarR, "elementBarR", this.element_listR, 0);
        }
        else if (val == "size") {
          initChartBarElemensize(this.elementBarL, "elementBarL", this.element_list, 0);
          initChartBarElemensize(this.elementBarR, "elementBarR", this.element_listR, 0);
        }
      }
    },

    beforeDestroy: function () {
      clearInterval(this.interval1);
    }
  };

</script>
