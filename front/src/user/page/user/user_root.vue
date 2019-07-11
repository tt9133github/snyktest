<style>
  .btn-message {
    width: 45px;
  }

  .btn-apply {
    width: 145px;
  }


</style>
<template>
  <div class="main-content">
    <section class="content-header">
      <h1>权限分配</h1>
    </section>
    <section class="content">
      <el-button class="pull-right" data-toggle="modal" data-target="#modal" @click="getRow(null)">
        <i class="fa fa-plus-circle"></i>添加角色
      </el-button>

      <el-table :data=" roles" stripe>
        <el-table-column label="序号" type="index" align="center">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="resources" label="权限">
          <template slot-scope="scope">
            <span v-for="r in scope.row.resources">
              {{root[r-1].label}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button data-toggle="modal" data-target="#modal" size="mini" type="primary" @click="getRow(scope.row)" :disabled="scope.row.id === 1">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </section>

    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="padding-top: 100px">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">角色详情</h4>
          </div>

          <div class="modal-body">
            <form role="form" class="form-horizontal">
              <div class="row form-group">
                <label class="col-lg-2 control-label">名称</label>
                <div class="col-lg-10">
                  <input type="text" v-model="row.name" :placeholder="row.name" id="roleName" class="form-control">
                </div>
              </div>

              <div class="row form-group">
                <label class="col-lg-2 control-label">描述</label>
                <div class="col-lg-10">
                  <input type="text" v-model="row.description" :placeholder="row.description" id="inputEmail1" class="form-control">
                </div>
              </div>

              <div class="row form-group">
                <label class="col-lg-2 control-label">权限</label>
                <div class="col-lg-10">
                  <el-select style="display: flex"
                             v-model="row.resources"
                             multiple
                             allow-create
                             default-first-option
                             placeholder="请选择操作系统">
                    <el-option
                      v-for="item in root"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="row">
                <div class=" col-md-2 ">
                </div>
                <div class=" col-md-10">
                  <button class="btn btn-primary ml-3 pull-right " @click="updateRole" data-dismiss="modal" aria-label="Close">
                    保存
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        root: [
          {label: "查看所有检测", value: "1"},
          {label: "检测项目", value: "2"},
          {label: "统计信息", value: "3"},
          {label: "用户管理", value: "4"},
          {label: "系统", value: "5"},
          {label: "搜索", value: "6"},
          {label: "编辑项目", value: "7"},
          {label: "编辑漏洞", value: "8"}
        ],
        roles: [],
        row: {}
      };
    },

    created: function () {
      this.getRoles();
    },

    methods: {
      getRow(r) {
        if (r == null) {
          this.row = {
            name: "",
            description: "",
            resources: []
          }
        }
        else {
          this.row = r;
        }
      },

      updateRole() {
        this.row.resources = this.row.resources.toString();
        this.$http.patch('/api/user/root', this.row, {emulateJSON: true}).then(response => {
          this.getRoles();
        });
      },

      getRoles() {
        this.roles = [];
        this.$http.get('/api/user/root').then(response => {
          response.data.forEach(function (item) {
            var rootList = item.resources.split(",");
            item.resources = rootList;
            this.roles.push(item);
          }.bind(this));
        })
      },

      deleteRole(id) {
        if(id === 1)
        {
          this.$alert("管理员账号不能删除", '提示', {
            confirmButtonText: '确定',
          })
          return
        }
        var msg = "您确定要删除该角色吗?";

        this.$confirm(msg, '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'ljqc-message'
        }).then(() => {
          this.$http.delete('/api/user/root?id=' + id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!',
              customClass: 'ljqc-message'
            });
            this.getRoles();
          });
        });
      },

      updatePassward() {
        var vm = this;
        if (vm.old_password.length <= 0 || vm.new_password.length <= 0 || vm.confirm_password.length <= 0) {

          this.$message({
            showClose: true,
            message: '修改密码信息填写不完整，请重新填写！',
            type: 'warning'
          });
          return
        } else if (vm.new_password.length < 6) {
          this.$message({
            showClose: true,
            message: '设置密码的长度需大于等于6位!',
            type: 'warning'
          });
          return
        } else if (vm.new_password != vm.confirm_password) {
          this.$message({
            showClose: true,
            message: '两次输入新密码不一致!',
            type: 'warning'
          });
          return
        }
        ;
        var param = {
          'id': vm.user_id,
          'password': vm.old_password,
        };
        var urlstr = vm.urlstr;
        $.ajax({
          type: 'POST',
          dataType: "json",
          url: '/api/user/pwd/' + vm.new_password,
          data: param,
          success: function (data) {
            console.log(data);
            var json = data;
            if (json.status == 1) {
              vm.$alert('密码设置成功！', {
                confirmButtonText: '确定',
                callback: action => {
                  vm.$router.push({
                    path: '/login'
                  })
                  vm.$message({
                    showClose: true,
                    type: 'info',
                    message: '请使用新密码重新登录！'
                  });
                }
              });
            } else {
              vm.$alert('原密码不正确，修改密码失败！', {
                confirmButtonText: '确定',
                callback: action => {
                  vm.old_password = '';
                  vm.new_password = '';
                  vm.confirm_password = '';
                  console.log(json.msg);
                }
              });
            }
          },
          error: function (data) {
          }
        });
      },

    },

  }

</script>
