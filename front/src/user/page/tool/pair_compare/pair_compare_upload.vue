<style>
  .button-bottom {
    padding-top: 100px;
  }

  .upload-block {
    padding-top: 10px;
  }

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

  .upload > .el-upload  > .el-upload-dragger {
    font-size: 28px;
    color: #8c939d;
    width: 600px;
    height: 300px;
    text-align: center;
  }

  .upload {
    width: 600px;
  }

  .el-icon-upload {
    padding-top: 50px;
  }

</style>

<template>
  <div>
    <div style="background-color:white;min-height:850px;padding: 10px;">
      <div>
        <div class="border-style">
          <h4><a><i class="fa fa-plus"></i></a>&nbsp;&nbsp;创建检测任务</h4>
        </div>

        <form class="form-horizontal" id="form">
          <div class="form-group">
            <label class="col-sm-1 control-label" style="color:#909399;">项目名称</label>
            <div class="col-sm-4">
              <input id="name" style="height:34px;width:270px" name="name" type="text" class="form-control" v-model="name" maxlength="40" placeholder="请输入项目名称"
                     onkeyup="this.value=this.value.replace(/[*,!@#$%^&]/g,'')"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-1 control-label" style="color:#909399;">检测类型</label>
            <div class="col-sm-4">
              <select style="height:34px;width:270px" name="type" v-model="isFinger">
                <option value=0 selected>源代码</option>
                <option value=1>指纹</option>
              </select>
            </div>
          </div>
        </form>

        <div class="border-style">
          <form class="form-horizontal upload-block" id="uploadForm">
            <div class="col-sm-6">

              <el-upload
                class="upload"
                drag
                action="/file/new"
                :limit="1"
                accept='.zip, .7z, .rar, .tar'
                :on-success="setFile1">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将左侧待检测文件拖到此处，或<em>点击</em></div>
                <div class="el-upload__tip" slot="tip">上传左侧待比较项目压缩包</div>
              </el-upload>
              <img style="float:right" v-show="uploading" src="../../../../../static/image/wait.gif"/>

            </div>


            <div class="col-sm-6">
              <el-upload
                class="upload"
                drag
                :limit="1"
                accept='.zip, .7z, .rar, .tar'
                :on-success="setFile2"
                action="/file/new">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将右侧待检测文件拖到此处，或<em>点击</em></div>
                <div class="el-upload__tip" slot="tip">上传右侧待比较项目压缩包</div>
              </el-upload>
            </div>


            <div class="form-group">
              <label class="col-sm-4 control-label"></label>
              <div class="col-sm-4" style="padding-top: 100px">
                <button style="height:34px;width:270px;" id="submitBtn" class="btn btn-primary btn-block" @click="addTask" type="button" v-show="active == 0">
                  开始检测
                </button>
              </div>
            </div>
          </form>
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

      setFile1(res, file) {
        this.file = res.info.id;
      },

      setFile2(res, file) {
        this.file2 = res.info.id;
      },

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
          this.hashFileList = response.data.pair_elements;
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
          this.cloneFileList = response.data.pair_elements;
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
          this.codeCloneList = response.data.pair_elements;
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

      addTask: function () {
        var vm = this;
        if (vm.file === 0) {
          this.$message(
            {
              message: '请上传左侧检测源码压缩文件!',
              type: 'error',
              customClass: 'ljqc-message'
            });
          return;
        }
        if (vm.file2 === 0) {
          this.$message(
            {
              message: '请上传右侧检测源码压缩文件!',
              type: 'error',
              customClass: 'ljqc-message'
            });
          return;
        }

        $.ajax({
          type: 'post',
          url: '/api/tool/inter_compare',
          dataType: 'json',
          data: {
            name: vm.name,
            file1: vm.file,
            file2: vm.file2,
            user: vm.user_id,
            status: 0,
            threshold: 0.1,
            isFinger: vm.isFinger,
            create_time: new Date().getTime(),
          },

          success: function (data) {
            if (data.status === 1) {
              this.$router.push("home/pairTasks");
            }
          }.bind(this),
        });
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

    },

    mounted: function () {
      this.user_id = JSON.parse(localStorage.getItem('user')).id;
    },

    watch: {

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
