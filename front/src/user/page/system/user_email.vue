<template>
  <div >
      <section style="min-height: 860px;">
        <div class="row">
          <div class="col-md-12">
            <div class="panel panel-default">
              <div class="box box-primary">
                <center>
                  <div class="box-header with-border">
                    <h3 class="box-title">提醒邮箱设置</h3>
                    <p>
                      <small>Modify User E-mail</small></p>
                  </div>
                </center>
                <br>
                <!-- /.box-header -->
                <div class="box-body">






                  <div class="form-group has-feedback">

                    <el-row>
                      <label class="text-blue">
                        开启邮箱提醒
                      </label>
                      <el-switch
                        v-model="email_radio"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                      </el-switch>
                    </el-row>
                  </div>



                  <div class="form-group has-feedback">
                    <label class="text-blue">
                      <i class="fa fa-pencil"></i>&nbsp;&nbsp;服务器邮箱&nbsp;&nbsp;</label>
                    <input type="text" class="form-control" placeholder="请输入邮箱" id="email" v-model="email" :disabled=!email_radio>
                  </div>

                  <div class="form-group has-feedback">
                    <label class="text-blue">
                      <i class="fa fa-pencil"></i>&nbsp;&nbsp;服务器邮箱授权码&nbsp;&nbsp;</label>
                    <input type="text" class="form-control" placeholder="请输入邮箱授权码" v-model="password" :disabled=!email_radio>
                  </div>

                  <div class="form-group has-feedback">
                    <label class="text-blue">
                      <i class="fa fa-pencil"></i>&nbsp;&nbsp;发件人&nbsp;&nbsp;</label>
                    <el-input
                      class="el_input_content"
                      type="textarea"
                      :rows="1"
                      placeholder="请输入发件人"
                      v-model="text_content"
                      :disabled=!email_radio>
                    </el-input>
                  </div><div class="form-group has-feedback">
                  <label class="text-blue">
                    <i class="fa fa-pencil"></i>&nbsp;&nbsp;邮件标题&nbsp;&nbsp;</label>
                  <el-input
                    class="el_input_content"
                    type="textarea"
                    :rows="1"
                    placeholder="请输入邮件标题"
                    v-model="text_content"
                    :disabled=!email_radio>
                  </el-input>
                </div>


                  <div class="form-group has-feedback">
                    <label class="text-blue">
                      <i class="fa fa-pencil"></i>&nbsp;&nbsp;发送内容&nbsp;&nbsp;</label>
                    <el-input
                      class="el_input_content"
                      type="textarea"
                      :rows="3"
                      placeholder="请输入发送内容"
                      v-model="text_content"
                      :disabled=!email_radio>
                    </el-input>
                  </div>



                  <el-button  :plain="true" @click="updateEmail"  class="btn btn-primary btn-block btn-flat" style="margin-top: 10px">确认修改</el-button>
                  <br>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  </div>
</template>
<script>
  export default {
    data: function() {
      return {
        email: '',
        email_radio:true,
        password:"",
        text_content:"",

      }
    },

    methods: {
      updateEmail: function() {
        var vm = this;
        if (vm.email_radio) {

          if (vm.email.length <=0) {
            this.$message({
              showClose: true,
              message: '请输入邮箱',
              type: 'warning'
            });
            return
          } else {
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(vm.email)) {
              this.$message({
                showClose: true,
                message: '请输入正确邮箱',
                type: 'warning'
              });
              returns
            }
          }

          if (vm.password.length <=0) {
            this.$message({
              showClose: true,
              message: '请输入邮箱授权码',
              type: 'warning'
            });
            return
          }

          if (vm.text_content.length <=0) {
            this.$message({
              showClose: true,
              message: '请输入内容',
              type: 'warning'
            });
            return
          }
        }

        this.$http.get("/api/sys/mail/config/",{
          params: {
            isSend: vm.email_radio,
            account: vm.email,
            pwd:vm.password,
            content: vm.text_content,
            personal:vm.text_content,
            title:vm.text_content
          }

        }).then(response => {

          console.log(response.data);
          this.projectInfo = response.data;

          if (response.data.status == 1) {
            vm.$alert('设置成功！', {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          } else {
            vm.$alert('邮箱设置失败！', {
              confirmButtonText: '确定',
              callback: action => {
                vm.password = '';
                vm.confirm_password = '';
              }
            });
          }
        });
      },

    },
  }

</script>

<style>
</style>
