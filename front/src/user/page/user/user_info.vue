<style>
    .btn-message {
        width: 45px;
    }

    .btn-apply {
        width: 145px;
    }

    .btn-style {
        width: 120px;
    }

</style>
<template>
    <div class="main-content">
        <section class="content-header">
            <h1>个人信息
                <i class="fa fa-edit"></i></h1>
            <ol class="breadcrumb">
                <li>
                    <i class="fa fa-edit"></i>个人信息管理
                </li>
            </ol>
        </section>
        <!-- Main content -->
        <!-- Info boxes -->
        <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div class="col-md-4 col-sm-6 col-xs-12">
                                <div class="info-box">
                                        <span class="info-box-icon bg-red">
                                            <i class="fa fa-user-md"></i>
                                        </span>
                                    <div class="info-box-content">
                                        <span class="info-box-text">用户名</span>
                                        <span class="info-box-number">{{user.username}}</span></div>
                                </div>
                            </div>
                            <!-- /.col -->
                            <div class="col-md-4 col-sm-6 col-xs-12">
                                <div class="info-box">
                                        <span class="info-box-icon bg-green">
                                            <i class="fa fa-university"></i>
                                        </span>
                                    <div class="info-box-content">
                                        <span class="info-box-text">单位信息</span>
                                        <span class="info-box-number">
                                                <small>{{user.organization}}</small></span>
                                    </div>
                                </div>
                            </div>
                            <!-- /.col -->
                            <div class="col-md-4 col-sm-6 col-xs-12">
                                <div class="info-box">
                                        <span class="info-box-icon bg-yellow">
                                            <i class="fa fa-users"></i>
                                        </span>
                                    <div class="info-box-content">
                                        <span class="info-box-text">用户类型</span>
                                        <span class="info-box-number">{{user.roleName}}</span>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <!-- /.row -->
                            <div class="col-md-12">
                                <!-- Horizontal Form -->
                                <div class="box box-info">
                                    <center>
                                        <div class="box-header with-border">
                                            <h3 class="box-title">查看个人信息</h3>
                                            <p>
                                                <small>Modify Personal Information</small></p>
                                        </div>
                                    </center>
                                    <br>
                                    <form class="form-horizontal">
                                        <div class="box-body">

                                            <br>
                                            <div class="input-group">
                                                <div class="input-group-btn">
                                                    <button type="button" class="btn btn-primary btn-style">
                                                        <i class=" fa fa-university"></i>&nbsp;&nbsp;单位名称
                                                    </button>
                                                </div>
                                                <!-- /btn-group -->
                                                <input type="text" class="form-control" placeholder="单位名称"
                                                       v-model="user.organization" id="unitname"></div>
                                            <br>

                                            <div class="input-group">
                                                <div class="input-group-btn">
                                                    <button type="button" class="btn btn-primary btn-style">
                                                        <i class=" fa fa-envelope"></i>&nbsp;&nbsp;邮箱地址
                                                    </button>
                                                </div>
                                                <!-- /btn-group -->
                                                <input type="text" class="form-control" placeholder="邮箱地址"
                                                       v-model="user.email" id="email"></div>
                                            <br>
                                            <div class="input-group">
                                                <div class="input-group-btn">
                                                    <button type="button" class="btn btn-primary  btn-style">
                                                        <i class=" fa fa-users"></i>&nbsp;&nbsp;用户类型
                                                    </button>
                                                </div>
                                                <!-- /btn-group -->
                                                <input type="text" class="form-control" placeholder="用户类型"
                                                       v-model="user.roleName" readonly="true"></div>
                                        </div>
                                        <!-- /.box-body -->
                                        <div class="box-footer">
                                            <center>
                                                <button type="button" @click='modifyUserInfo' class="btn btn-primary">
                                                    保存修改
                                                </button>&nbsp;&nbsp;
                                            </center>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ./row -->
        </section>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                user: {},
            }
        },
        created: function () {
            if (localStorage.getItem('user') == null || localStorage.getItem('user') == "") {
                this.$router.push({path: '/login'});
            }
            this.getUserInfo();
        },
        methods: {
            getUserInfo: function () {
                this.user_id = JSON.parse(localStorage.getItem('user')).id;
                if (this.user_id == null) {
                    this.$router.push({path: '/login'});
                }
                this.$http.get('/api/user/' + this.user_id).then(response => {
                    if (response.body == null) {
                    } else {
                        this.user = response.body
                    }
                });
            },

            modifyUserInfo: function () {
                var vm = this;
                this.$confirm("确认修改用户信息", '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: 'ljqc-message'
                }).then(() => {
                    $.ajax({
                        type: 'post',
                        url: '/api/user/',
                        dataType: 'json',
                        data: vm.user,

                        success: function (data) {
                            var json = data;
                            if (json.status == 1) {
                                vm.$alert('修改个人信息成功！', {
                                    confirmButtonText: '确定',
                                });
                            } else {
                                vm.$message({
                                    showClose: true,
                                    message: "修改成功！",
                                    type: 'success'
                                });
                            }
                        },
                        error: function (data) {
                        }
                    });
                })
            },
        }
    }

</script>
