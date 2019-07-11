<template>
  <div>
    <div class="main-content">
      <section class="content bg-style" style="margin:0 15px;">
        <div class="row">
          <div class="col-md-12">
            <div class="box box-solid box-default">
              <!-- /.box-header -->
              <div class="box-body">
                <h5>
                  <p>
                    <b>&nbsp;
                      <i class="fa fa-circle-o text-yellow"></i>&nbsp;系统证书信息
                      &nbsp;&nbsp;
                    </b>
                  </p>
                </h5>
                <hr>
                <p>
                  系统证书：系统证书是验证系统是否可用的证书文件。若证书过期，请联系管理员获取新的证书文件并上传。</p>
              </div>
              <!-- /.box-body --></div>
          </div>

          <div class="col-md-12">
            <div class="box box-solid box-default">
              <div v-if="start != 'Invalid Date'">
                <div class="box-header">
                  开始时间：{{start}}
                </div>
                <div class="box-header">
                  结束时间：{{end}}
                </div>
              </div>
              <div v-else="start == 'Invalid Date'">
                <div class="box-header">
                  <span style="color: red">证书文件损坏或不存在</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12" v-show="invalid">
            <div class="box box-solid box-default">

              <div class="box-header with-border">
                <div class="col-md-6">
                  <el-upload
                    class="upload-demo" ref="upload"
                    drag
                    action="api/sys/license">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将证书文件拖到此处，或<em>点击上传</em></div>
                  </el-upload>
                </div>
                <div class="col-md-6">
                  <div class="tip">Tip1:若证书文件过期，请联系管理员更新证书。</div>
                  <div class="tip">Tip2:证书到期后将不能上传项目。</div>
                  <div class="tip">Tip3:上传完成后刷新页面以获取新证书。</div>
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
    name: "license",

    data() {
      return {
        fileList: [],
        license: {},
        start: "",
        end: "",
        invalid: false,
      }
    },

    mounted: function () {
      //this.getLicenseInfo();
    },

    methods: {
      submitUpload() {

        this.$refs.upload.submit();
        if (this.$refs.upload.fileList.length == 0) {
          this.$message({
            showClose: true,
            message: '请上传证书文件',
            type: 'error'
          });
        }
        else {
          this.$message({
            showClose: true,
            message: '更新成功！',
            type: 'success'
          });
        }
      },

      getLicenseInfo() {
        this.$http.get("/api/sys/license").then(response => {
          var newDate = new Date();
          newDate.setTime(response.data.start);
          this.start = newDate.toLocaleString();

          var newDate2 = new Date();
          newDate2.setTime(response.data.end);
          this.end = newDate2.toLocaleString();

          //证书认证没有通过
          if(response.data.status != 1)
          {
            this.invalid = true;
          }
        });
      }
    },


  }
</script>

<style scoped>
  .upload-demo {
    width: 360px;
  }

  .el-upload-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .tip {
    padding: 10px;
  }

</style>
