<template>
  <el-container><!--background-image: url('../../../../static/image/search.jpg')-->
    <el-header>
      <div>
      </div>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="4" :offset="8">
        <div class="search-tab">
          <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane label="元项目" name="first"></el-tab-pane>
            <el-tab-pane label="源代码" name="second"></el-tab-pane>
            <el-tab-pane label="漏洞" name="third"></el-tab-pane>
          </el-tabs>
        </div>
        </el-col>
      </el-row>

      <el-row>
        <div class="search_line">
          <el-input v-show="activeName != 'third'" :placeholder="mySelect.label" v-model="searchContent" @keyup.enter.native="goSearch" class="input-with-select">
            <el-select v-model="mySelect" slot="prepend" :placeholder="mySelect.label" class="select">
              <template v-for="type in search_types">
                <el-option :label="type.label" :value="type">
                </el-option>
              </template>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="goSearch" ></el-button>
            <el-button slot="append" icon="el-icon-more" @click="goHighSearch"></el-button>
          </el-input>

          <div style="display: flex">
          <el-input v-show="activeName == 'third'" placeholder="漏洞关键字" v-model="vul_content" @keyup.enter.native="goSearch" class="input-with-select"
                    style="width: 601px"></el-input>

          <el-button v-show="activeName == 'third'" slot="append" icon="el-icon-search" @click="goSearch"></el-button>

          </div>
        </div>
      </el-row>
        <div class="row" style="padding-top: 100px;" v-show="cve.cveId != null">
          <div class="col-md-4" style="padding-left: 30px">
            <div class="form-group row">
              <label style="width: 85px;" class=" col-form-label">漏洞名称</label>
              <div class="col-9">
                {{cve.vuln_title}}
              </div>
            </div>
            <div class="form-group row">
              <label style="width: 85px;" class="col-form-label">CVE ID</label>
              <div class="col-9">
                {{cve.cveId}}
              </div>
            </div>
            <div class="form-group row">
              <label style="width: 85px;" class=" col-form-label">CNNVD ID</label>
              <div class="col-9">
                {{cve.cnnvd_id}}
              </div>
            </div>

          </div>
          <div class="col-md-4" style="padding-left: 30px">
            <div class="form-group row">
              <label style="width: 85px;" class="col-form-label">漏洞类型</label>
              <div class="col-9">
                {{cve.type}}
              </div>
            </div>
            <div class="form-group row">
              <label style="width: 85px;" class=" col-form-label">危害等级</label>
              <div class="col-9">
                {{cve.vuln_severity}}
              </div>
            </div>
            <div class="form-group row">
              <label style="width: 85px;" class=" col-form-label">漏洞评分</label>
              <div class="col-9">
                {{cve.cvssV2 == null ? "" : cve.cvssV2.baseScore}}
              </div>
            </div>
          </div>
          <div class="col-md-4" style="padding-left: 30px">
            <div class="form-group row">
              <label style="width: 85px;" class="col-form-label">漏洞厂商</label>
              <div class="col-9">
                {{cve.vuln_manufacturer_name}}
              </div>
            </div>
            <div class="form-group row">
              <label style="width: 85px;" class=" col-form-label">发布时间</label>
              <div class="col-9">
                {{cve.vuln_published}}
              </div>
            </div>
            <div class="form-group row">
              <label style="width: 85px;" class=" col-form-label">更新时间</label>
              <div class="col-9">
                {{cve.vuln_modified}}
              </div>
            </div>
          </div>

          <div class="col-md-12" style="padding-left: 30px">
            <div class="form-group row">
              <label style="width: 85px;" class="col-form-label">漏洞描述</label>
              <div class="col-9">
                {{cve.vuln_describe}}
              </div>
            </div>

          </div>
        </div>
    </el-main>
  </el-container>
</template>

<script>

  export default {
    name: "search_home",

    data() {
      return {
        user_id: "",

        cve_options: [],
        cve: {},
        vul_content: "",
        loading: false,
        mySelect: {},

        activeName: 'first',
        searchContent: '',
        mySelect: {},
        placeHold: '',
        tableData: [],
        search_types: [],

        project_search_types: [
          {"value": "project_name", "label": "项目名称"},
          {"value": "project_user", "label": "开发者"},
          {"value": "subdependencies.d_name", "label": "依赖组件"},
          {"value": "vul_list.cve_id", "label": "CVE精确"},
          {"value": "vul_list.cnnvd_id", "label": "CNNVD"},
        ],

        code_search_types: [
          {"value": "", "label": "Java"},
          {"value": "c++", "label": "C++"},
          {"value": "c", "label": "C"},
          {"value": "php", "label": "PHP"},
        ]
      }
    },

    methods: {
      remoteMethod(query) {
        if (query.toLowerCase().indexOf("cve-") !== -1) {
          this.loading = true;
          this.$http.get('/api/vul/search', {params: {content: query}}).then(response => {
            this.cve_options = response.data;
            this.loading = false;
          });
        }
      },

      tabClick(tab, event) {
        if (tab.name == "first") {
          this.search_types = this.project_search_types
        } else {
          this.search_types = this.code_search_types
        }
        this.getPlaceHolder();
      },

      getPlaceHolder() {
        this.mySelect = this.search_types[0];
      },

      goSearch() {
        if(this.activeName == "third")
        {
          this.$router.push({
            path: '/search/vul',
            query: {content:this.vul_content}
          })
        }
        else if (this.search_types == this.project_search_types) {
          this.$router.push({
            path: '/search/prj',
            query: {type: this.mySelect.value, content:this.searchContent}
          })
        } else {
          this.$router.push({
            path: '/search/code',
            query: {content:this.searchContent}
          })
        }
      },

      goHighSearch() {
        //this.$emit("goPage", 'Search_Adv');
        this.$router.push({path: 'search/adv'})
      },
    },


    mounted() {
      this.user_id  = JSON.parse(localStorage.getItem('user')).id;
      if(this.user_id == null)
      {
        this.$router.push({path: '/login'});
      }
      this.search_types = this.project_search_types;
      this.getPlaceHolder();
    }
  }
</script>


<style>
  .search_line {
    width: 700px;
    height: 60px;
    border-radius: 4px;
    margin: 0 auto;
  }

  .search-tab {
    width: 240px;
  }

  .el-tabs__active-bar {
    width: 60px;
  }

  .input-with-select .el-input__inner {
    height: 50px;
  }

  .select {
    width: 110px;
  }
</style>
