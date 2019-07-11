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
            <el-table-column prop="name" label="检测项目名称"></el-table-column>
            <el-table-column prop="createTime" label="上传时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-tag type="info" size="medium">
                  <router-link :to="{path: '/home/' + scope.row.id + '/fortify/result' }">查看</router-link>
                </el-tag>
                <template v-if="scope.row.status != 3">
                  |
                </template>
                <i class="fa fa-trash pointer" @click="deleteTask(scope.row)">
                </i>

              </template>
            </el-table-column>
          </el-table>
          <hr>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="currentPage" :page-sizes="[10, 15,20, 50, 100]" :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="taskTotal"></el-pagination>
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
        if (this.user_id == null) {
          this.$router.push({path: '/login'});
        }
        this.getPagedTaskList();
      },

      getPagedTaskList() {
        this.$http.get('/api/tool/fortify/task/user', {
          params:
            {
              id: this.user_id,
              pageNo: this.currentPage,
              pageSize: this.pageSize,
            }
        }).then(response => {
          this.tasks = [];
          this.taskTotal = response.data.totalElements;

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
          this.$http.delete('/api/tool/fortify/task?id=' + row.id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
              customClass: 'ljqc-message'
            });
            this.getPagedTaskList();
          });
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
