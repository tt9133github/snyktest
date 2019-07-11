<style>
  .form-control {
    width: 100%;
  }

  .border-style {
    border-bottom: 1px solid #e5e5e5;
    padding: 10px;
    font-size: 16px;
    margin: 10px;
  }

</style>
<template>
  <div>
    <div style="background-color:white;">
      <section class="content-header">
        <h1>上传新项目
          <i class="fa fa-upload"></i>
          <small></small>
        </h1>
        <ol class="breadcrumb">
          <li><i class="fa fa-upload"></i> 上传新项目
          </li>

        </ol>
      </section>
      <div class="border-style" v-show="!status">
        <h3>您的检测次数已用完，请联系系统厂商申请检测权限！</h3>
      </div>
      <div v-show="status">
        <br/>
        <div class="border-style">
          <h4><a><i class="fa fa-plus"></i></a>&nbsp;&nbsp;创建检测任务</h4>
        </div>

        <div class="border-style">

          <form class="form-horizontal" id="uploadForm">
            <div class="form-group">
              <label class="col-sm-2 control-label" style="color:#909399;">项目名称</label>
              <div class="col-sm-4">
                <input id="name" style="height:34px;width:270px" name="name" type="text" class="form-control" v-model="name" maxlength="40" placeholder="请输入项目名称"
                       onkeyup="this.value=this.value.replace(/[*,!@#$%^&]/g,'')"/><span style="color: red" v-show="prjNameExist">项目名称已存在！</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label" style="color:#909399;">检测类型</label>
              <div class="col-sm-3">
                <select style="height:34px;width:270px" name="type" v-model="testType" @change="typeChange">
                  <option value=0 selected>源代码</option>
                  <option value=1>指纹</option>
                </select>
              </div>
            </div>

            <div v-show="testType==0">
              <div v-show="cloneTest=='0'">
                <div class="form-group">
                  <label class="col-sm-2 control-label" style="color:#909399;">克隆检测语言</label>
                  <div class="col-sm-4">
                    <select style="height:34px;width:270px" name="language" id="language" v-model="language">
                      <option value=0 selected="selected">请选择检测语言</option>
                      <option v-for="language in languages" v-bind:value="language.id">
                        {{language.name}}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-2 control-label" style="color:#909399;">是否进行安全检测</label>
                  <div class="col-sm-4">
                    <select style="height:34px;width:270px" name="security" id="security" v-model="security">
                      <option value=0 selected="selected">否</option>
                      <option value=1>是</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-2 control-label" style="color:#909399;">克隆检测级别</label>
                  <div class="col-sm-3">
                    <select style="height:34px;width:270px" name="type" v-model="classType" @change="typeChange">
                      <option value=0 selected>文件级别检测</option>
                      <option value=1>代码片段级别检测</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label"></label>
                  <div class="col-sm-6">
                    <p v-show="classType == 0" style="font-style: italic;font-size:15px">
                      说明: 文件级别检测，以检测语言的整个文件作为检测单元</p>
                    <p v-show="classType == 1" style="font-style: italic;font-size:15px">
                      说明: 代码片段级别，以检测语言的代码片段为检测单元</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label" style="color:#909399;">上传文件</label>
              <div class="col-sm-4">
                <input type="file" name="file" id="file" class="inputfile inputfile-2"/>
                <label for="file" style="height:34px;width:270px"><span></span>
                  <strong>
                    {{ fileInfo }}&hellip;</strong><img style="float:right" v-show="uploading" src="../../../../static/image/wait.gif"/></label>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label"></label>
              <div class="col-sm-6">
                <p style="font-style: italic;font-size:15px">
                  请上传zip压缩文件格式的检测项目源码</p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label"></label>
              <div class="col-sm-4">
                <button style="height:34px;width:270px" id="submitBtn" class="btn btn-primary btn-block" @click="addTask" type="button">
                  上传项目
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div v-show="!status">
        <br>
        <h3 style="margin:30px;">您的检测权限已用完，无法上传检测项目，请联系管理员！</h3>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        prjNameExist:false,
        language: 0,
        security: 0,
        classType: 0,
        testType: 0, //0:sourcecode 1:token
        cloneTest: '0', //1:not test, 0:test
        languages: [],
        name: "",
        file: 0,
        threshold: 0.6,
        granularity: 10,
        fileInfo: "",
        uploading: false,
        //判断用户是否有权限上传项目,remain为0时不可检测
        user_id: '',
        username: '',
        //用户剩余权限状态
        status: true,
        //用户剩余权限
        remain_number: '',
        remain_size: '',
        version: ''
      };
    },

    methods: {
      addFortifyTask(taskId) {
        var formData = new FormData();
        formData.append("file", document.getElementById("file").files[0]);
        this.$http.post("/api/fortify/task?taskId=" + taskId + "&lang=" + this.language, formData, {emulateJSON:true}).then(response => {
          if(response.data.status == 1)
          {
            this.$message({
              message: "Fortify服务正在同步解析...",
              type: 'success',
              customClass: 'ljqc-message'
            });
          }
          else
          {
            this.$message({
              message: response.data.msg,
              type: 'error',
              customClass: 'ljqc-message'
            });
          }
        })
      },

      getAllLanguages: function () {
        var vm = this;
        $.ajax({
          type: 'GET',
          dataType: 'json',
          url: '/api/languages',
          cache: true,
          success: function (data) {
            vm.languages = data;
          },
        });
      },

      progress: function (e) {
        var vm = this;
        if (e.lengthComputable) {
          var max = e.total;
          var current = e.loaded;
          var Percentage = (current * 100) / max;
          vm.fileInfo = "文件上传中" + Math.ceil(Percentage) + "%";
          if (Percentage >= 100) {
            vm.fileInfo = "即将完成"
          }
        }
      },

      addTask: function () {
        var vm = this;
        if (vm.name === "") {
          this.$message.error({
            message: '请输入项目名称',
            type: 'error',
            customClass: 'ljqc-message'
          });
          return;
        }
        //用户上传文件大小，字节数
        var file_size = document.getElementById("file").files[0].size;
        //上传文件大小限制为10000MB
        var max_size = 100 * 100 * 1024 * 1024;

        if (vm.file === 0) {
          this.$message.error(
            {
              message: '请上传待检测源码压缩文件',
              type: 'error',
              customClass: 'ljqc-message'
            });
          return;
        }
        if (parseInt(vm.testType) === 0) { //0:soucecode 1:token
          if (parseInt(vm.cloneTest) === 0) { //1:not test, 0:test
            if (parseInt(vm.language) === 0) {
              alert("请选择检测语言");
              return;
            }
            if (parseInt(vm.classType) === 1) { //1:part of code 0:all code
              if (vm.granularity === "" || parseInt(vm.granularity) < 10 || parseInt(vm.granularity) > 100) {
                this.$alert('请输入正确的分析粒度', '提示', {
                  confirmButtonText: '好的',
                });
                return;
              }
              if (vm.threshold === "" || parseFloat(vm.threshold) < 0.5 || parseFloat(vm.threshold) > 1.0) {
                alert("请输入正确的检测阈值");
                return;
              }
            }
          }
        }

        if (file_size > max_size) {
          this.$alert('请上传小于10000M的压缩文件', '提示', {
            confirmButtonText: '好的',
          });
          return;
        }

        $.ajax({
          type: 'post',
          url: '/api/task',
          dataType: 'json',
          data: {
            name: vm.name,
            language: parseInt(vm.language),
            type: parseInt(vm.classType),
            need_python: parseInt(vm.security),
            file: vm.file,
            status: 0,
            email_status: 0,
            user: vm.user_id,
            granularity: parseInt(vm.granularity),
            threshold: parseFloat(vm.threshold),
            token: parseInt(vm.testType),
            create_time: new Date().getTime(),
          },

          success: function (data) {
            if (data.status === 1) {
              this.addFortifyTask(data.data);
              vm.$router.push({
                path: '/home/tasks'
              })
            } else {
              this.$message.error(
                {
                  message: '上传失败，服务器内部错误！' + data.msg,
                  type: 'error',
                  customClass: 'ljqc-message'
                });
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
      }
    },
    created: function () {
      var vm = this;
      vm.getAllLanguages();
    },

    mounted: function () {
      var vm = this;
      vm.user_id  = JSON.parse(localStorage.getItem('user')).id;
      if(vm.user_id == null)
      {
        this.$router.push({path: '/login'});
        this.$router.push({path: '/login'});
      }

      var inputs = document.querySelectorAll('.inputfile');
      Array.prototype.forEach.call(inputs, function (input) {
        input.addEventListener('change', function (e) {
          var fileName = e.target.value.split('\\').pop();
          if (fileName) {
            var suffix = (fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length)).toLowerCase();
            if (suffix != "zip" && suffix != "rar" && suffix != "7z" && suffix != "tar") {
              alert("请选择正确的压缩格式文件上传!");
              return
            }
            var formData = new FormData();
            formData.append("file", document.getElementById("file").files[0]);
            vm.fileInfo = '文件上传中';
            vm.uploading = true;
            $("#submitBtn").attr("disabled", true);
            $.ajax({
              type: 'post',
              url: '/file/new',
              dataType: 'json',
              data: formData,
              enctype: 'multipart/form-data',
              success: function (data) {
                vm.file = data.info.id;
                vm.fileInfo = fileName;
                vm.uploading = false;
                $("#submitBtn").attr("disabled", false);
              },
              xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                  myXhr.upload.addEventListener('progress', vm.progress, false);
                }
                return myXhr;
              },
              contentType: false,
              processData: false,
            });
          }
        });
      });
    }
  };

</script>
