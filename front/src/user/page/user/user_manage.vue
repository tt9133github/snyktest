<style>
  .panel-body {
    margin: 20px auto;
  }

  .w770 {
    width: 870px;
  }

  .fl {
    float: left;
  }

  .title_bt {
    background: url("../../../../static/image/title_bt_bg.gif") repeat-x bottom;
    height: 62px;
  }

  .d_ldjj p {
    line-height: 26px;
    font-size: 14px;
  }

  .title_bt h2 {
    font-weight: normal;
    font-size: 20px;
    line-height: 60px;
    border-bottom: 2px solid #4095cc;
    padding-left: 10px;
  }

  .cb {
    line-height: 0px;
    clear: both;
    height: 0px;
    font-size: 0px;
  }

</style>
<template>
  <div class="main-content">
    <section class="content-header">
      <h1>用户管理
        <i class="fa fa-user-plus"></i></h1>
      <ol class="breadcrumb">
        <li>
          <i class="fa fa-user-plus"></i>用户信息管理
        </li>
      </ol>
    </section>
    <!-- Main content -->
    <section class="content">
      <!-- Info boxes -->
      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-default">
            <!--系统管理员新建用户，管理下级用户-->
            <div class="panel-body">
              <div v-show="usertype==0">
                <button class="btn btn-success" v-show="new_user==false" v-on:click="showNewUser">
                  <b>添加企业用户</b>&nbsp;
                  <i class="fa fa-plus"></i></button>
              </div>
              <div v-show="usertype==1">
                <button class="btn btn-success" v-show="new_user==false" v-on:click="showNewUser">
                  <b>添加一般用户</b>&nbsp;
                  <i class="fa fa-plus"></i></button>
              </div>
              <div class="box box-primary" v-show="new_user==true">
                <center>
                  <div class="box-header with-border">
                    <h3 class="box-title">创建新用户</h3></div>
                </center>
                <!-- /.box-header -->
                <div class="box-body">
                  <div class="col-md-6">

                    <div class="form-group row" id="account-form">
                      <label for="example-text-input" style="width: 85px;" class=" col-form-label">用户帐号：</label>
                      <div class="col-md-9">
                        <input class="form-control " type="text" id="example-text-input" v-model="newPerson.username">
                      </div>
                    </div>

                    <div class="form-group row" id="password-form">
                      <label for="p" style="width: 85px;" class=" col-form-label">用户密码：</label>
                      <div class="col-md-9">
                        <input type="password" class="form-control" id="p" v-model="newPerson.password">
                      </div>
                    </div>

                    <div class="form-group row" id="confirm-form">
                      <label for="c" style="width: 85px;" class=" col-form-label">确认密码：</label>
                      <div class="col-md-9">
                        <input type="password" class="form-control" id="c" v-model="newPerson.password_confirm">
                      </div>
                    </div>

                    <div class="form-group row" id="type-form">
                      <label for="ut" style="width: 85px;" class=" col-form-label">用户类型：</label>
                      <div class="col-md-9">
                        <select class="form-control" id="ut" v-model="newPerson.role">
                          <option v-for="r in roles" :value="r.id">{{r.name}}</option>
                        </select>
                      </div>
                    </div>

                  </div>
                  <div class="col-md-6">

                    <div class="form-group row">
                      <label for="u" style="width: 85px;" class=" col-form-label">单位名称：</label>
                      <div class="col-md-9">
                        <input class="form-control" type="text" id="u" v-model="newPerson.organization">
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="m" style="width: 85px;" class=" col-form-label">邮箱地址：</label>
                      <div class="col-md-9">
                        <input class="form-control" type="text" id="m" v-model="newPerson.email">
                      </div>
                    </div>

                    <div class="form-group row">
                      <label style="width: 85px;" class=" col-form-label">用户状态：</label>
                      <div class="col-md-9">
                        <select class="form-control" v-model="newPerson.status">
                          <option value=1 selected="selected">激活</option>
                          <option value=0>禁用</option>
                        </select>
                      </div>
                    </div>

                  </div>
                </div>
                <div class="row" style="padding: 20px">
                  <div class="col-md-offset-5 col-md-7">
                    <el-button type="primary" @click="createPerson" round>创建
                    </el-button>
                    <el-button round @click="closePerson">取消</el-button>
                  </div>

                </div>
              </div>
            </div>
            <div class="panel-body">
              <table class="table table-bordered table-striped text-center">
                <thead>
                <tr>
                  <th class="text-center">用户名称</th>
                  <th class="text-center">状态</th>
                  <th class="text-center">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-show="usertype==0" v-for="person in userList">
                  <td>{{ person.username }}</td>
                  <td v-show="person.status==true">
                    <el-tooltip class="item" effect="dark" content="更改用户状态" placement="top-start">
                      <el-button type="success" plain size="small" v-on:click="change(person)">
                        已激活
                      </el-button>
                    </el-tooltip>
                  </td>
                  <td v-show="person.status==false">
                    <el-tooltip class="item" effect="dark" content="更改用户状态" placement="top-start">
                      <el-button type="info" plain size="small" v-on:click="change(person)">
                        已禁用
                      </el-button>
                    </el-tooltip>
                  </td>
                  <td>
                    <el-button type="primary" plain size="small" @click="showPerson(person)" data-toggle="modal" data-target="#userModal">
                      详情
                    </el-button>
                    <el-button type="danger" plain size="small" @click="delPerson(index,person.id)" :disabled="person.id === 39">
                      删除
                    </el-button>
                  </td>
                </tr>
                <tr v-show="usertype==1" v-for="person in userList">
                  <td>{{ person.username }}</td>
                  <td v-show="person.status==true">
                    <el-tooltip class="item" effect="dark" content="更改用户状态" placement="top-start">
                      <el-button type="success" plain size="mini" v-on:click="change(person)">
                        已激活
                      </el-button>
                    </el-tooltip>
                  </td>
                  <td v-show="person.status==false">
                    <el-tooltip class="item" effect="dark" content="更改用户状态" placement="top-start">
                      <el-button type="info" plain size="mini" v-on:click="change(person)">
                        已禁用
                      </el-button>
                    </el-tooltip>
                  </td>
                  <td>
                    <el-button type="danger" plain size="mini" @click="delPerson(index,person.id)">
                      删除
                    </el-button>
                    <el-button type="primary" plain size="mini" @click="showPerson(person)" data-toggle="modal" data-target="#userModal">
                      详情
                    </el-button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="padding-top: 100px">
        <div class="modal-dialog" style="width:1000px" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h3>{{userDetail.username}}用户详情</h3></div>
            <div class="modal-body">
              <div class="container">
                <!--第一层-->
                <div class="fl w770">
                  <div class="title_bt w770">
                    <h2 style="width:140px;">用户自身信息</h2></div>
                  <div style="height:20px;"></div>
                  <div class="detail_xq w770">
                    <div class="box ">
                      <!-- form start -->
                      <form class="form-horizontal">
                        <div class="box-body">
                          <div class="input-group ">
                            <div class="input-group-btn">
                              <button type="button" class="btn btn-info btn-style">
                                <i class=" fa fa-user"></i>&nbsp;&nbsp;用户名称
                              </button>
                            </div>
                            <!-- /btn-group -->
                            <input type="text" class="form-control" placeholder="username" readonly="true" v-model="userDetail.username">
                          </div>
                          <br>
                          <div class="input-group ">
                            <div class="input-group-btn">
                              <button type="button" class="btn btn-primary btn-style">
                                <i class=" fa fa-university"></i>&nbsp;&nbsp;单位名称
                              </button>
                            </div>
                            <!-- /btn-group -->
                            <input type="text" class="form-control" placeholder="单位名称" v-model="userDetail.organization" id="unitname" readonly="true">
                          </div>
                          <br>

                          <br>
                          <div class="input-group ">
                            <div class="input-group-btn">
                              <button type="button" class="btn btn-danger btn-style">
                                <i class=" fa fa-envelope"></i>&nbsp;&nbsp;邮箱地址
                              </button>
                            </div>
                            <!-- /btn-group -->
                            <input type="text" class="form-control" placeholder="邮箱地址" v-model="userDetail.email" id="email" readonly="true">
                          </div>
                          <br>
                          <div class="input-group ">
                            <div class="input-group-btn">
                              <button type="button" class="btn btn-default  btn-style">
                                <i class=" fa fa-users"></i>用户类型
                              </button>
                            </div>
                            <!-- /btn-group -->
                            <input type="text" class="form-control " :placeholder="userDetail.roleName" readonly="true">
                          </div>
                        </div>
                      </form>
                    </div>
                    <div class="cb"></div>
                  </div>
                </div>
              </div>
              <!--主体结束--></div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        //角色
        roles: [],
        //是否显示新建用户表单
        new_user: false,
        //登录用户类型
        usertype: '',
        //登录用户自身剩余权限

        id: '',
        username: '',
        newPerson: {
          user_id: '', //上级用户ID，新建企业用户，ID为系统管理员ID；新建一般用户，ID为企业用户的ID
          username: '', //新建用户名称
          status: '', //新建用户状态，ture为激活状态，false为禁用状态
          organization: '', //新建用户单位名称
          password: '', //新建用户密码
          email: '', //邮箱地址
          type: '', //用户类别：1为企业用户，2为一般用户
        },
        //下级用户详情
        userDetail: [],
        //下级用户列表信息
        userList: [],
      }
    },
    created: function () {
      this.getRoles();
      this.getUserList();
    },

    methods: {
      getRoles() {
        this.$http.get('/api/user/root').then(response => {
          this.roles = response.data;
        })
      },

      showNewUser: function () {
        this.new_user = true;
      },

      createPerson: function () {
        if (this.usertype == 0) {
          this.newPerson.type = 1;
        } else if (this.usertype == 1) {
          this.newPerson.type = 2;
        };
        if (!(this.newPerson.username)) {
          $('#account-form').addClass("has-error");
          this.$alert('请输入正确格式的用户信息！', {
            confirmButtonText: '确定',
          });
          return;
        }
        else
        {
          $('#account-form').removeClass("has-error");
          $('#account-form').addClass("has-success");
        }
        if (!(this.newPerson.password)) {
          $('#password-form').addClass("has-error");
          this.$alert('请输入密码！', {
            confirmButtonText: '确定',
          });
          return;
        }
        else
        {
          $('#password-form').removeClass("has-error");
          $('#password-form').addClass("has-success");
        }
        if (!(this.newPerson.password == this.newPerson.password_confirm)) {
          $('#confirm-form').addClass("has-error");
          this.$alert('请输入相同的密码！', {
            confirmButtonText: '确定',
          });
          return;
        }
        else
        {
          $('#confirm-form').removeClass("has-error");
          $('#confirm-form').addClass("has-success");
        }
        if (!(this.newPerson.role)) {
          $('#type-form').addClass("has-error");
          this.$alert('请选择用户角色！', {
            confirmButtonText: '确定',
          });
          return;
        }
        else
        {
          $('#type-form').removeClass("has-error");
          $('#type-form').addClass("has-success");
        }
        $.ajax({
          type: 'post',
          url: '/api/user/',
          dataType: 'json',
          data: {
            username: this.newPerson.username,
            password: this.newPerson.password,
            organization: this.newPerson.organization,
            email: this.newPerson.email,
            status: this.newPerson.status,
            role: this.newPerson.role,
          },

          success: function (data) {
            if (data.status === 1) {
              this.$message({
                message: '创建用户成功！',
                type: 'success',
                customClass: 'ljqc-message'
              });
              this.newPerson = "";
              this.getUserList();
            } else {
              this.$message({
                message: '创建用户失败！',
                type: 'error',
                customClass: 'ljqc-message'
              });
              console.error(data.info);
            }
          }.bind(this),
        });
      },

      getUserList: function () {
        this.user_id = JSON.parse(localStorage.getItem('user')).id;
        if(this.user_id == null)
        {
          this.$router.push({path: '/login'});
        }
        this.$http.get('/api/user/user_list').then(response => {
          if (response.data != null) {
            this.userList = response.data;
          }


        });
      },

      closePerson: function () {
        this.new_user = false;
        this.newPerson = {
          username: '',
          status: '',
        };
      },
      delPerson: function (index, user_id) {
        var vm = this;
        var msg = "您真的确定要删除该用户吗?";

        this.$confirm(msg, '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.ajax({
            type: 'GET',
            dataType: "json",
            url: '/api/user/remove/' + user_id,
            data: '',
            success: function (data) {
              var json = data;
              if (json.status == 1) {
                vm.$message({
                  message: '删除用户成功！',
                  type: 'success'
                });
                vm.getUserList();
              } else {
                console.log(json.msg);
              }
            },
          });
          // 删一个数组元素
          this.userList.splice(index, -1);
        });
      },
      change(person) {
        var vm = this;
        var msg = "您真的确定要修改该用户状态吗?";

        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (person.status == 0) {
            person.status = 1;
          } else if (person.status == 1) {
            person.status = 0;
          }
          ;
          $.ajax({
            type: 'GET',
            dataType: "json",
            url: '/api/user/status/' + person.id + '/' + person.status,
            data: '',
            success: function (data) {
              var json = data;
              if (json.status == 1) {
                vm.$message({
                  message: '用户状态修改成功！',
                  type: 'success'
                });
                vm.getUserList();
              } else {
                console.log(json.msg);
              }
            },
          });
        });
      },
      showPerson(person) {
        this.userDetail = person;
      }
    }
  }

</script>
