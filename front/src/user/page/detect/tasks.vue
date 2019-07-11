<template>
  <div>
      <section class="content">
        <div class="panel panel-default">
              <div class="panel-body">
                <el-table :data=" tasks" stripe v-loading="loading" element-loading-text="正在停止检测任务">
                  <el-table-column label="序号" type="index" align="center">
                    <template slot-scope="scope">
                      {{(currentPage - 1) * pageSize + scope.$index + 1}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="检测项目名称" ></el-table-column>
                  <el-table-column label="检测类型" align="center">
                    <template slot-scope="scope">
                      <p class="text-center" v-show="scope.row.token == 0">
                        源代码</p>
                      <p class="text-center" v-show="scope.row.token == 1">
                        指纹</p></template>
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                        <p class="text-center" v-show="scope.row.type!= -1">
                          检测语言: {{scope.row.language}}</p>
                        <p class="text-center" v-show="scope.row.type == -1">
                          检测语言:无</p>
                        <p class="text-center" v-show="scope.row.type == 0">
                          克隆检测:文件级别</p>
                        <p class="text-center" v-show="scope.row.type == 1">
                          克隆检测:代码片段级别</p>
                        <p class="text-center" v-show="scope.row.type == -1">
                          克隆检测:不检测</p>
                        <div slot="reference" class="name-wrapper">
                          <el-tag size="medium">
                            <span class="text-center" v-show="scope.row.token == 0">源代码</span>
                            <p class="text-center" v-show="scope.row.token == 1">
                              &nbsp;&nbsp;指纹&nbsp;&nbsp;</p></el-tag>
                        </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column label="检测状态" align="center">
                    <template slot-scope="scope">
                      <div v-show="scope.row.status == -1" style="color:red">
                        失败
                      </div>
                      <div v-show="scope.row.status == 0">待检测</div>

                      <el-progress v-show="scope.row.status==1" :text-inside="true" :stroke-width="18" :percentage="scope.row.progress" status="success"></el-progress>

                      <div v-show="scope.row.status == 2">完成</div>
                      <div v-show="scope.row.status == 3" style="color:red">
                        手动停止
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="createTime" label="上传时间" align="center"></el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-tag type="info" v-show="scope.row.status == 2" size="medium">
                        <router-link :to="{path: scope.row.id + '/clone' }">查看</router-link>
                      </el-tag>
                      <el-button v-show="scope.row.status == -1 || scope.row.status == 1" type="info" plain size="mini" disabled>
                        查看
                      </el-button>
                      <el-button v-show="scope.row.status==0" plain size="mini" disabled>
                        暂无
                      </el-button>
                      <template v-if="scope.row.status != 3">
                        |
                      </template>
                      <i class="fa fa-trash pointer" @click="deleteTask(scope.row)">
                      </i>

                    </template>
                  </el-table-column>
                </el-table>
                <hr>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 15,20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="taskTotal"></el-pagination>
              </div>
            </div>
      </section>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        user_id: 0,
        tasks: [],
        //表格分页试用
        currentPage: 1,
        pageSize: 10,
        taskTotal: 0,
        loading: false
      };
    },

    methods: {
      handleSizeChange(size) {
        this.pageSize = size
        this.getPagedTaskList();
      },

      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getPagedTaskList();
      },

      getUserTasks() {
        this.user_id = JSON.parse(localStorage.getItem('user')).id;
        if(this.user_id == null)
        {
          this.$router.push({path: '/login'});
        }
        this.getPagedTaskList();
      },

      getPagedTaskList() {
        this.$http.get('/api/task/user',{
          params:
            {
              id: this.user_id,
              pageNo: this.currentPage,
              pageSize: this.pageSize,
            }
        }).then(response => {
          this.tasks = [];
          this.taskTotal = response.data.totalElements;
          if(this.taskTotal == null)
          {
            this.$router.push({path: '/login'});
          }

          response.data.content.forEach(task => {
            task.createTime = new Date(task.create_time).toLocaleString();
            if (task.message) {
              task.message_cut = task.message.substr(0, 20) + "...";
            }
            this.tasks.push(task);
          });
        })
      },

      deleteTask: function (row) {
        var msg = "您真的确定要删除该项目吗?";

        this.$confirm(msg, '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('/api/task/' + row.id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
              customClass: 'ljqc-message'
            });
            this.getPagedTaskList();
          });
          /*if(row.status != 1)
          {
            this.$http.delete('/api/task/' + row.id).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!',
                customClass: 'ljqc-message'
              });
              this.getPagedTaskList();
            });
          }*/
          /*else
          {
            this.loading = true;
            {
              this.$http.get('/api/sys/restart').then(() => {
                this.loading = false;

                this.$message({
                  type: 'success',
                  message: '删除成功!',
                  customClass: 'ljqc-message'
                });
                this.getPagedTaskList();
              });
            }
          }*/
        });
      }
    },

    mounted: function () {
      this.getUserTasks();
      this.interval1 = setInterval(this.getUserTasks, 10000);
    },

    beforeDestroy: function () {
      clearInterval(this.interval1);
    }
  }
</script>
