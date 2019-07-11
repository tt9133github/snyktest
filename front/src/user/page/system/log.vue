<template>
  <div >
    <div class="main-content" >
      <section class="content" style="min-height: 863px">
        <div class="row">
          <div class="col-md-12">
            <div class="panel panel-default">
              <div class="panel-body">
                <el-table :data=" logs">
                  <el-table-column label="序号" width="60" type="index" align="center">
                    <template slot-scope="scope">
                      {{(currentPage - 1) * pageSize + scope.$index + 1}}
                    </template>-->
                  </el-table-column>
                  <el-table-column prop="username" label="操作人员" align="center"></el-table-column>
                  <el-table-column prop="description" label="操作说明" align="center"></el-table-column>
                  <el-table-column prop="status" label="操作结果" align="center"></el-table-column>
                  <el-table-column prop="ipaddr" label="操作IP" align="center"></el-table-column>
                  <el-table-column prop="datetime" label="操作时间" align="center"></el-table-column>
                </el-table>
                <hr>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15,30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="logtotal"></el-pagination>
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
      data: function () {
        return {
          user_id: 0,
          logs: [],
          //表格分页试用
          currentPage: 1,
          pageSize: 15,
          logtotal: 0,
          loading: false
        };
      },

      methods: {
        handleSizeChange(size) {
          this.pageSize = size
          this.getLogPage();
        },

        handleCurrentChange(currentPage) {
          this.currentPage = currentPage;
          this.getLogPage();
        },

        getUserTasks() {
          this.user_id = JSON.parse(localStorage.getItem('user')).id;
          if(this.user_id == null)
          {
            this.$router.push({path: '/login'});
          }
          this.getLogPage();
        },

        getLogPage() {
          this.$http.get('/api/sys/log',{
            params:
              {
                pageNo: this.currentPage,
                pageSize: this.pageSize,
              }
          }).then(response => {
            this.logs =  response.data.content;
            this.logtotal = response.data.totalElements;

          })
        },

      },

      created: function () {
        this.getLogPage();
      },
    }
</script>
