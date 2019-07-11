<style>
  .lg-container {
    width: 550px;
    /*margin-top: 250px;*/
    /*margin-left: -50px;*/
    padding: 20px 20px;
    border: 1px solid #f4f4f4;
    background: rgba(255, 255, 255, .5);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -webkit-box-shadow: 0 0 2px #aaa;
    -moz-box-shadow: 0 0 2px #aaa;
  }

  .user-icon {
    position: absolute;
    right: 10px;
    line-height: 34px;
  }
  .login-box{
    margin: 0;
    width: 100%;
  }
#app.login-box{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
<template>
  <div class="login-box" id="app">
    <!-- /.login-logo -->
    <div class="login-box-body lg-container">
      <div class="row">
        <div class="col-md-3">
          <a href="index.html"><img src="../../../static/image/logo-2.png" style="width:100px;"></a>
        </div>
        <div class="col-md-9 color-white">
          <h2>源代码处理与分析系统</h2>
        </div>
      </div>
      <!--            <b><p class="login-box-msg" style="font-size:20px;">登&nbsp;&nbsp;录</p></b>-->
      <br>
      <div class="form-group has-feedback">
        <input type="text" class="form-control" placeholder="用户名" id="username">
        <span class="glyphicon glyphicon-user user-icon"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="密码" id="password" @keyup.enter="userLogin">
        <span class="glyphicon glyphicon-lock user-icon"></span>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-md-5" style="padding-right: 0px;padding-left: 0px">
            <input type="text" class="form-control" placeholder="验证码" id="captcha2" @keyup.enter="userLogin">
          </div>
          <div class="col-md-4">
            <img src="/api/user/captcha" id="captcha" alt="captcha" style="height:32px;">
          </div>
          <div class="col-md-3">
            <button class="btn btn-default btn-block" v-on:click="reloadCaptcha()" id="refresh" style="cursor:pointer;height:32px;">
              更新
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <!-- /.col -->
        <div class="col-xs-12" style="padding-right: 0px;padding-left: 0px">
          <button v-on:click="userLogin" class="btn btn-primary btn-block btn-flat">
            登录
          </button>
        </div>
        <!-- /.col -->
      </div>
    </div>
    <!-- /.login-box-body -->
  </div>
</template>
<script>
  import $ from 'jquery';

  export default {
    name: 'Login',
    data() {
      return {
        user_type: [{
          value: 0,
          name: "系统管理员"
        },
          {
            value: 1,
            name: "企业用户"
          },
          {
            value: 2,
            name: "一般用户"
          },
        ],
        username: '',
        password: '',
      }
    },

    methods: {
      reloadCaptcha: function () {
        document.getElementById('captcha').src = document.getElementById('captcha').src + '?' + new Date();
      },
      userLogin: function () {

        var vue = this;
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var captcha = document.getElementById("captcha2").value;
        if (username === "") {
          this.$message({
            showClose: true,
            message: "用户名不能为空，请输入用户名！",
            type: 'error'
          });
          return;
        }
        if (password === "") {
          this.$message({
            showClose: true,
            message: "密码不能为空，请输入正确的密码！",
            type: 'error'
          });
          return;
        }
        if (captcha === "") {
          this.$message({
            showClose: true,
            message: "验证码不能为空，请输入验证码！",
            type: 'error'
          });
          return;
        }

        var param = {
          'username': username,
          'password': password,
          'captcha': captcha,
        };

        $.ajax({
          type: 'POST',
          dataType: 'json',
          url: '/api/user/login',
          cache: false,
          data: param,
          success: function (data) {
            if (data.status == 1) {
              //window.document.cookie = JSON.stringify(data.data);
              localStorage.setItem('user', JSON.stringify(data.data));

              if (data.data.resources.indexOf("1") != -1) {
                vue.$router.push({path: '/home'});
              }
              else {
                vue.$router.push({path: '/home/tasks'});
              }
            }

            else if (data.status == 0) {
              if (data.msg == "captcha") {
                vue.$message({
                  showClose: true,
                  message: '验证码错误，请重新输入！',
                  type: 'error'
                });
                document.getElementById("captcha2").value = '';
              }
              else if (data.msg == "user") {
                vue.$message({
                  showClose: true,
                  message: '用户名不存在,请重试！',
                  type: 'error'
                });
              }
              else if (data.msg == "password") {
                vue.$message({
                  showClose: true,
                  message: '密码错误,请重新输入！',
                  type: 'error'
                });
              }
              else if (data.msg == "locked") {
                vue.$message({
                  showClose: true,
                  message: '该用户已禁用，请联系系统管理员更改用户状态！',
                  type: 'error'
                });
              }
              else if (data.msg == "expired") {
                vue.$message({
                  showClose: true,
                  message: '用户已过期，请联系厂商！',
                  type: 'error'
                });
              }
              else if (data.msg == "firewall") {
                vue.$message({
                  showClose: true,
                  message: '防火墙阻止了您的请求！请联系管理员！',
                  type: 'error'
                });
              }
            }
            else {
              vue.$router.push({path: '/sysLicense'});
            }
          }
        });
      }
    },

    mounted: function () {
      var key = this.$route.query.key;
      if (key != null) {
        this.$http.get("/api/user/login?key=" + key).then(response => {
          if (response.data.status == 1) {
            localStorage.setItem('user', JSON.stringify(response.data.data));
            this.$router.push({path: '/home'});
          }

          else if (response.data.msg == "user") {l
            this.$message({
              showClose: true,
              message: '用户名不存在,请重试！',
              type: 'error'
            });
          }
          else if (response.data.msg == "password") {
            this.$message({
              showClose: true,
              message: '密码错误,请重新输入！',
              type: 'error'
            });
          }
          else if (response.data.msg == "des") {
            this.$message({
              showClose: true,
              message: '错误的key值！',
              type: 'error'
            });
          }
          else if (response.data.msg == "firewall") {
            this.$message({
              showClose: true,
              message: '防火墙阻止了您的请求！请联系管理员！',
              type: 'error'
            });
          }
        })
      }
    }

  }

</script>
