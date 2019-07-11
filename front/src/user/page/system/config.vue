<template>
  <div>
    <div class="main-content">
      <section class="content-header">
        <h1>系统配置</h1>
      </section>
      <section class="content">
        <div class="border-style">
          <form class="form-horizontal" id="uploadForm">
            <div class="form-group">
              <label class="col-sm-2 control-label" style="color:#909399;">Fortify服务地址</label>
              <div class="col-sm-4">
                <input id="ip" style="height:34px;width:270px" name="name" type="text" class="form-control" v-model="fortifyIp" placeholder="172.168.1.187:8899/api/task/scan"/>
              </div>

              <label class="col-sm-2 control-label text-blue">
                远程登录
              </label>

              <div class="col-sm-4">
                <el-switch
                  v-model="login_radio"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </div>

            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label" style="color:#909399;">Fortify服务参数</label>
              <div class="col-sm-4">
                <input id="port" style="height:34px;width:270px" name="name" type="text" class="form-control" v-model="fortifyParam" placeholder="tid"/>
              </div>

              <label class="col-sm-2 control-label text-blue">
                秘钥
              </label>
              <div class="col-sm-4">
                <input style="height:34px;width:270px" name="name" type="text" class="form-control" v-model="des" :placeholder="des" :disabled="!login_radio"/>
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-5 control-label"></label>
              <div class="col-sm-2">
                <button style="height:34px;width:270px" id="submitBtn" class="btn btn-primary btn-block" @click="saveConfig" type="button">
                  保存配置
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section class="content-header">
        <h1>防火墙</h1>
      </section>
      <section class="content">
        <el-button class="pull-right" data-toggle="modal" data-target="#modal" @click="getRow(null)">
          <i class="fa fa-plus-circle"></i>添加白名单
        </el-button>

        <el-table :data=" whiteIpList" stripe>
          <el-table-column label="序号" type="index" align="center">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="value" label="IP">
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button data-toggle="modal" data-target="#modal" size="mini" type="primary" @click="getRow(scope.row)">
                编辑
              </el-button>
              |
              <i class="fa fa-trash pointer" @click="deleteWhiteList(scope.row.id)">
              </i>
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
              <h4 class="modal-title" id="myModalLabel">白名单</h4>
            </div>

            <div class="modal-body">
              <form role="form" class="form-horizontal">
                <div class="row form-group">
                  <label class="col-lg-2 control-label">名称</label>
                  <div class="col-lg-10">
                    <input type="text" v-model="row.name" :placeholder="row.name" id="whitelistName" class="form-control">
                  </div>
                </div>

                <div class="row form-group">
                  <label class="col-lg-2 control-label">IP</label>
                  <div class="col-lg-10">
                    <input type="text" v-model="row.value" :placeholder="row.value" id="whitelistIp" class="form-control">
                  </div>
                </div>

                <div class="row">
                  <div class=" col-md-2 ">
                  </div>
                  <div class=" col-md-10">
                    <button class="btn btn-primary ml-3 pull-right" @click="updateWhiteList" data-dismiss="modal" aria-label="Close">
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
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        login_radio:true,
        des: "",
        fortifyId: 0,
        loginId: 0,
        fortifyIp: '',
        fortifyParam: '',
        whiteIpList: [],
        row: {}
      }
    },

    methods: {
      getRow(r) {
        if(r != null)
        {
          this.row = r;
        }
        else
        {
          this.row = {};
        }
      },

      getWhiteList() {
        this.$http.get("/api/sys/whitelist").then(response => {
          this.whiteIpList = response.data;
        })
      },

      getConfig() {
        this.$http.get("/api/sys/config").then(response => {
          if(response.data != null)
          {
            this.fortifyIp = response.data.fvalue;
            this.fortifyParam = response.data.fmark;
            this.fortifyId = response.data.fid;

            this.loginId = response.data.lid;
            this.des = response.data.des;
          }
        })
      },

      saveConfig() {
        if(this.login_radio)
        {
          this.$http.post('/api/sys/config', {
            id: this.loginId,
            value: this.des,
            mark: 1
          }, {emulateJSON: true}).then(response => {
          });
        }
        else
        {
          this.$http.post('/api/sys/config', {
            id: this.loginId,
            value: "",
            mark: 0
          }, {emulateJSON: true}).then(response => {
          });
        }

        this.$http.post('/api/sys/config', {
          id: this.fortifyId,
          value: this.fortifyIp,
          mark: this.fortifyParam
        }, {emulateJSON: true}).then(response => {
          this.getConfig();
          this.$message({
            type: 'success',
            message: '您保存了配置！',
            customClass: 'ljqc-message'
          });
        });
      },

      updateWhiteList() {
        this.$http.post('/api/sys/whitelist', this.row, {emulateJSON: true}).then(response => {
          this.getWhiteList();
        });
      },

      deleteWhiteList(id) {
        var msg = "您确定要删除该IP吗?";

        this.$confirm(msg, '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'ljqc-message'
        }).then(() => {
          this.$http.delete('/api/sys/whitelist?id=' + id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!',
              customClass: 'ljqc-message'
            });
            this.getWhiteList();
          });
        });
      },
    },

    mounted() {
      this.getWhiteList();
      this.getConfig();
    }
  }

</script>

<style>
</style>
