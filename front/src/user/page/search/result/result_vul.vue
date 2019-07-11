<template>
  <div class="vul_search">
    <el-row class="resultInfo">
      为您找到 <span style="font-size: 20px;color: #f4201d">{{cve_result.totalElements}}</span>
      条记录
    </el-row>

    <div style="width: 100%;min-height: 600px;">
      <el-table :data="cve_result.content">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div v-if="props.row.vuln_describe == null || props.row.vuln_describe == ''">
              无描述
            </div>

            <div v-else>
              <h5>描述：</h5>
              <div>{{props.row.vuln_describe}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="CVE-ID" prop="cveId" min-width="20%">
          <template slot-scope="props">
            <router-link target="_blank" :to="{path:'/vul_detail/'+ props.row.cveId }">
              {{props.row.cveId}}
            </router-link>
            <router-link target="_blank" :to="{path:'/search/prj',query: {type: 'vul_list.cve_id', content:props.row.cveId} }" style="margin-left: 8px;color: #33363f">
              <i class="fa fa-search" aria-hidden="true"></i>
            </router-link>

          </template>
        </el-table-column>

        <el-table-column label="CNNVD" prop="cnnvd_id" min-width="20%"></el-table-column>
        <el-table-column label="漏洞名称" prop="vuln_title" min-width="40%"></el-table-column>
        <el-table-column label="类型" prop="type" min-width="20%"></el-table-column>
        <el-table-column label="等级" prop="vuln_severity" min-width="10%"></el-table-column>
        <el-table-column label="厂商" prop="vuln_manufacturer_name" min-width="10%"></el-table-column>
      </el-table>
    </div>

    <div class="pagination" v-if="cve_result.totalElements != 0">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="total, prev, pager, next, jumper"
        :total=cve_result.totalElements>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {
      ElRow
    },
    props: ['param'],

    data() {
      return {
        loading: {},

        cve_result: [],
        searchContent: '',

        //pagination
        currentPage: 1
      }
    },

    methods: {
      searchPrj(r) {
        let data = JSON.stringify(r);
        this.$router.push({path: "/search/version/", query: {prj: data}})
      },

      home() {
        this.$emit("goPage", 'main_search');
      },

      handleCurrentChange(val) {
        this.currentPage = val;
        this.searchVul();
      },

      searchVul() {
        this.loading = this.$loading({
          lock: true,
          text: '正在查询...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.$http.get('/api/vul/search/' + this.currentPage, {params: {content: this.searchContent}}).then(response => {
          this.cve_result = response.data;

          this.loading.close();
        });
      }
    },

    mounted: function () {
      /* this.$emit("smallSideBar");*/

      this.searchContent = this.$route.query.content;
      this.searchVul();
    },


  }
</script>

<style scoped>

  .pagination {
    float: right;
    padding: 20px;
  }

  .resultInfo {
    padding: 10px;
  }

  .vul_search {
    font-family: Segoe UI;
    padding-left: 100px;
    padding-right: 100px;
  }
</style>
