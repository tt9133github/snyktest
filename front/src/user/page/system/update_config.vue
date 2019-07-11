<template>
  <div>
    <div class="main-content">
      <section class="content-header">
        <h1>数据更新</h1>
      </section>
      <section class="content">
        <div class="border-style">
          <form class="form-horizontal" id="uploadForm">
            <div class="form-group">
              <label class="col-sm-2 control-label" style="color:#909399;">挂载地址</label>
              <div class="col-sm-4">
                <input id="port" style="height:34px;width:270px" name="name" type="text" class="form-control" v-model="path" placeholder="挂载路径"/>
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-2 control-label"></label>
              <div class="col-sm-4">
                <button style="height:34px;width:270px" id="submitBtn" class="btn btn-primary btn-block" @click="addUpdateTask" type="button">
                  新增更新任务
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section class="content-header">
        <h1>历史任务</h1>
      </section>

        <el-table :data=" tasks" stripe>
          <el-table-column label="序号" type="index" align="center">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="建立时间"></el-table-column>
          <el-table-column prop="path" label="路径"></el-table-column>
          <el-table-column prop="library_status" label="指纹更新状态">
            <template slot-scope="scope">
              {{$t("update_status." + scope.row.library_status)}}
            </template>
          </el-table-column>
          <el-table-column prop="library_status" label="搜索系统更新状态">
            <template slot-scope="scope">
              {{$t("update_status." + scope.row.esStatus)}}
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        fortifyId: 0,
        fortifyIp: '',
        path: '',
        tasks: [],
        row: {}
      }
    },

    methods: {
      formatTime(date) {
        var newDate = new Date(date);
        //将任务创建时间转换成当地时间，格式为：2014年6月18日 上午10:33:24
        return newDate.toLocaleString();
      },

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


      getTaskList() {
        this.$http.get("/api/sys/update_config").then(response => {
          this.tasks = response.data;
          for(let i = 0; i < this.tasks.length; i++)
          {
            this.tasks[i].createdAt = this.formatTime(this.tasks[i].createdAt)
          }
        })
      },

      addUpdateTask() {
        var lastC = this.path.charAt(this.path.length - 1);
        if(lastC !== "/")
        {
          this.path = this.path + "/"
        }

        this.$http.post("/api/sys/update_config?path=" + this.path,{emulateJSON:true}).then(response => {
          this.getTaskList();
          //es request
          /*this.$http.get("/api/sys/update_config").then(response => {
            this.tasks = response.data;
          })*/
        })
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
      this.getTaskList();
    }
  }

</script>

<style>
</style>
