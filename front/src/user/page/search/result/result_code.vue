<template>
  <el-container class="es">
    <el-container>
      <el-main>
        <el-row class="resultInfo">
          为您找到 <span style="font-size: 20px;color: #f4201d">{{total}}</span> 条文件记录，
          本页显示其中 <span style="font-size: 20px;color: #f4201d">{{total > 4 ? 5 : total}}</span> 条文件记录所对应 <span style="font-size: 20px;color: #f4201d">{{results.length}}</span> 个项目
        </el-row>  <!--style="background-color: #ecedf4"-->

        <div>
          <li class="menu-item selected" v-for="r in results">
            <h3><!--<a class="pointer" @click="goFilePage(r, null)">{{r.fileName}}</a>--><div class="right info">{{r.lang}}</div></h3>

            <div class="info">
              所在项目：<a :class=formatClass(r) @click="goVersionPage(r.prj)">{{(r.prj.project_url.indexOf("https://github.com") != -1) ? r.prj.project_url.substring(19, r.prj.project_url.length) : r.prj.full_name}}</a>
            </div>
            <div class="info" v-if="r.prj.versionList == null || r.prj.versionList == 0">
              <a class="pointer verDown" @click="getVersionByItemsKeyAndProjectId(r)" >
                查看版本
              </a>
            </div>
            <div class="info" v-else>
              版本：
              <template v-for="v in r.prj.versionList">
                <a class="pointer" @click="goFilePage(v, r.id)">
                  {{v.version}}
                </a>
                <span class="glyphicon glyphicon-save verDown pointer" @click="downloads(v)" style="top:0px"></span>
              </template>
              </div>
            <pre v-highlight>
              <code v-html="r.highLight"></code>
            </pre>
          </li>
          <li class="menu-item selected" v-if="results.length == 0">
            <h3>{{$t("noResult")}}</h3>
          </li>
        </div>

        <div class="pagination" v-if="results.length != 0">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size=page_size
            layout=" prev, pager, next"
            :total=total>
          </el-pagination>
        </div>

      </el-main>
    </el-container>
  </el-container>
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
        //search others
        results: [],
        vuls: [],
        //search box
        searchContent: '',
        mySelect: {},
        search_type: [
          {"value": "project_name", "label": "项目名称"},
          {"value": "vul_list.cve_id", "label": "CVE"},
          {"value": "project_user", "label": "开发者"},
          {"value": "dependencies", "label": "依赖组件"},
          {"value": "vul_list.cnnvd_id", "label": "CNNVD"}
        ],
        sortBys: [{
          value: '',
          label: '匹配度'
        }, {
          value: 'project_star',
          label: '热门度'
        }, {
          value: 'total_vul_num',
          label: '漏洞数'
        }],
        mySort: '',

        //pagination
        currentPage: 1,
        total: 0,
        page_size: 5,
      }
    },

    methods: {
      formatClass (r) {
        return "pointer " + (r.prj.is_vul_able ? "bugCon" : "nobugCon");
      },

      goVersionPage(r) {
        let data = JSON.stringify(r);
        this.$router.push( {path : "/search/version/", query: {prj :data} })
      },

      home() {
        this.$emit("goPage", 'main_search');
      },

      handleCurrentChange(val) {
        this.currentPage = val;
        this.requestEs();
      },

      goFilePage(row, fileId) {
        this.$router.push({
          path: '/search/file',
          query: {pname: row.project_name, v: row.version, fid: fileId, pid: row.id}
        })
      },

      getVersionByItemsKeyAndProjectId(r) {
        this.$http.get('/es/project/' + r.prj.project_id + "?itemsKey=" + r.id).then(response => {
            if (response.data.resultCode != 200) {
              //ERROR
              return;
            }
            else {
              r.prj.versionList = response.data.projects;
            }
          }
        );
      },

      downloads(prj){
          this.$http.get('/es/zip',
          {
            params: {
              project_id: prj.project_id,
              project_name: prj.project_name,
              version: prj.version
            }
          }
        ).then(response => {
            if (response.data.status == 1) {
              var path = encodeURI(response.data.data);
              var url = "/es/download?name=" + response.data.msg + "&path=" + path;
              window.location.href = url;
            }
            else {
              this.$alert(response.data.msg, {
                confirmButtonText: '确定',
              });
            }
          }
        );

      },
      requestEs() {
        const loading = this.$loading({
          lock: true,
          text: '正在查询...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.$http.get('/es/code', {
          params:
            {
              pageNo: this.currentPage,
              pageSize: this.page_size,
              key: "content",
              values: this.searchContent,
            }
        }).then(response => {
          if (response.data.resultCode != 200) {
            loading.close();
            return;
          };
          this.results = response.data.codes;
          this.total = response.data.totalCount;
          this.vuls = response.data.per_vul;
          loading.close();

        }, response => {
          loading.close();
        });
      }
    },

    mounted: function () {
      this.$emit("smallSideBar");
      this.user = JSON.parse(localStorage.getItem('user'));
      this.searchContent = this.$route.query.content;
      this.requestEs();
    },


  }
</script>

<style scoped>

  .info {
    font-size: 10px;
    padding: 5px
  }

  pre {
    background-color: white;
  }

  .border {
    border: 1px #e1e4e8 solid;
  }

  .vul-filter {
    background-color: white;
    margin-bottom: 15px;
    list-style: none;
    background-color: #fff;
    border: 1px solid #d1d5da;
    border-radius: 3px;
  }

  .menu-item {
    cursor: pointer;
    position: relative;
    display: block;
    padding: 8px 10px;
    border-bottom: 1px solid #e1e4e8;
    font-size: 14px;
  }

  .menu-item.selected {
    color: #24292e;
    cursor: default;
    background-color: #fff;
  }

  .vul-item:hover {
    font-weight: 600;
    text-decoration: none;
    background-color: #f6f8fa;
  }

  .right {
    float: right;
  }

  .tag {
    display: inline-block;
    padding: 2px 5px;
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
    color: #586069;
    background-color: rgba(27, 31, 35, 0.08);
    border-radius: 20px;
  }

  .el-aside {
    width: 200px !important;
    margin-top: 65px;
  }

  .pagination {
    float: right;
    padding: 20px;
  }

  .resultInfo {
    padding: 10px;
  }

  .es {
    font-family: Segoe UI;
    padding-left: 200px;
    padding-right: 200px;
  }
  .nobugCon{
    background-color: green;
    color: #fff;
    padding: 1px 3px;
  }
  .bugCon{
    background-color: red;
    color: #fff;
    padding: 1px 3px;
  }
  .verDown{
    padding-right: 5px;
  }
  .verDown span{
    vertical-align: text-top;
  }
</style>
