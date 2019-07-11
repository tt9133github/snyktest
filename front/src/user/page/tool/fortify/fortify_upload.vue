<template>
  <div style="background-color:white;min-height:850px;padding: 10px;">

    <div>
      <div class="border-style">
        <h4><a><i class="fa fa-plus"></i></a>&nbsp;&nbsp;创建Fortify任务</h4>
      </div>

      <form class="form-horizontal" id="form">
        <div class="form-group">
          <label class="col-sm-1 control-label" style="color:#909399;">项目名称</label>
          <div class="col-sm-4">
            <input id="name" style="height:34px;width:270px" name="name" type="text" class="form-control" v-model="taskName" maxlength="40" placeholder="请输入项目名称"
                   onkeyup="this.value=this.value.replace(/[*,!@#$%^&]/g,'')"/>
          </div>
        </div>
      </form>

      <div class="border-style">
        <form class="form-horizontal upload-block" id="uploadForm">
          <div class="col-sm-12" style="margin-left: 15px">

            <el-upload
              class="upload"
              ref="uploadXP"
              :limit=limitNum
              :multiple=isMultiple
              drag
              accept='.xml'
              :show-file-list="true"
              action="/file/new"
              :on-success="uploadSuccess">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将Fortify解析结果.xml文件拖拽至此
              </div>
            </el-upload>
            <img style="float:right" v-show="uploading" src="../../../../../static/image/wait.gif"/>

          </div>


          <div class="form-group">
            <div class="col-sm-1" style="padding-top: 20px;margin-left: 30px">
              <button style="height:34px;width:270px;" id="submitBtn" class="btn btn-primary btn-block" @click="addTask" type="button">
                开始检测
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

  export default {

    data() {
      return {
        user_id: '',
        fortifyLog: "",
        path: "",
        taskName: ""
      }
    },

    created: function () {
      this.user_id = JSON.parse(localStorage.getItem('user')).id;
      if (this.user_id == null) {
        this.$router.push({path: '/login'});
      }
    },

    mounted: {},

    methods: {
      addTask: function () {
        var vm = this;
        if (vm.file === 0) {
          this.$message(
            {
              message: '请上传Fortify检测结果文件!',
              type: 'error',
              customClass: 'ljqc-message'
            });
          return;
        };
        if (vm.path === 0) {
          this.$message(
            {
              message: '请等待上传完成!',
              type: 'error',
              customClass: 'ljqc-message'
            });
          return;
        };
        this.$http.post("/api/tool/fortify/task",{
          name: vm.taskName,
          user: vm.user_id,
          create_time: new Date().getTime(),
          path: this.path
        },{emulateJSON:true}).then(response => {
          this.$router.push({path: '/home/' + vm.user_id + '/fortify/task'});
        });
      },

      getFortifyLog() {
        this.$http.get("api/task/" + this.task_id).then(response => {
          this.fortifyLog = response.data.message;
          var tmp = this.fortifyLog.split("-");
          this.fortifyLog = tmp;
        })
      },


      uploadSuccess(response, file, fileList) {
       this.path = response.info.path;
      },
    },
  }
</script>

<style scoped>
  .upload-block {
    padding-top: 10px;
  }

  .border-style {
    border-bottom: 1px solid #e5e5e5;
    padding: 10px;
    font-size: 16px;
    margin: 10px;
  }

  .upload > .el-upload  > .el-upload-dragger {
    font-size: 28px;
    color: #8c939d;
    width: 600px;
    height: 300px;
    text-align: center;
  }
</style>
