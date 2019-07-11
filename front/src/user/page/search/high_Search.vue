<template>
  <div class="adv_search">
    <ol class="breadcrumb" style="background: none;position: absolute;top: 5px;padding: 10px 0px;">
      <li>
        <router-link to="/search">返回搜索首页</router-link>
      </li>
      <li class="active">高级搜索</li>
    </ol>
      <div>
        <div class="rule-item">
          <li class="selected">
            已有查询规则：
          </li>
          <el-tag class="pointer"
            :key="r.id"
            v-for="r in rules"
            closable
            :disable-transitions="false"
            type = "success"
            @close="delRule(r.id)" @click.native="clickRule(r)">
            {{r.name}}</el-tag>
          <!--<li class="rule-item" v-for="r in rules">
            <a>{{r.name}}</a>
            <i class="fa fa-remove"></i>
          </li>-->
        </div>
        <!--<el-select v-model="myRule" slot="prepend" placeholder="请选择">
          <el-option v-for="r in rules" :label = r.name :value = r.id></el-option>
        </el-select>
        <i class="el-icon-delete pointer deleteIcon" @click="delRule"></i>-->
        <div class="pull-right" v-show="results != null">
        为您找到 <span style="font-size: 20px;color: #f4201d">{{total}}</span>
        个结果
        </div>
      </div>

      <div>
        <el-row>
          <el-col :span="12">
            <div class="radios">
              <el-radio-group v-model="tabPosition">
                <el-radio-button label="必须包含">必须包含</el-radio-button>
                <el-radio-button label="或">或</el-radio-button>
                <el-radio-button label="必须不包含">必须不包含</el-radio-button>
              </el-radio-group>
            </div>

            <div class="zone">
              <el-tag class="pointer" type="info" @click.native="addLanguage('C++')">C++</el-tag>
              <el-tag class="pointer" type="info" @click.native="addLanguage('Java')">Java</el-tag>
              <el-tag class="pointer" type="info" @click.native="addLanguage('C')">C</el-tag>
              <el-tag class="pointer" type="info" @click.native="addLanguage('Python')">Python</el-tag>
              <el-tag class="pointer" type="info" @click.native="addLanguage('PHP')">PHP</el-tag>
              <el-tag class="pointer" type="info" @click.native="addLanguage('JavaScript')">JavaScript</el-tag>
              <el-tag class="pointer" type="info" @click.native="addType()">软件类型</el-tag>
              <el-tag class="pointer" type="info" @click.native="addUser()">开发者</el-tag>
              <el-tag class="pointer" type="info" @click.native="addDeps()">依赖组件</el-tag>
              <el-tag class="pointer" type="info" @click.native="addCve()">CVE</el-tag>
              <el-tag class="pointer" type="info" @click.native="addCnnvd()">CNNVD</el-tag>
              <el-tag class="pointer" type="info" @click.native="containVuls()">包含漏洞</el-tag>

              <div class="rule_content">
                <textarea class="rule_content" v-model="ruleStr">{{ruleStr}}</textarea>
              </div>

              <div class="buttons">
                <el-button type="info" @click="reset">重置</el-button>
                <el-button @click="saveMyRule">保存规则</el-button>
                <el-button @click="preview">预览</el-button>
                <el-button class="pull-right" type="primary" @click="goSearch">Go查询</el-button>
              </div>
            </div>
          </el-col>

          <el-col :span="10" :offset="2">

            <div>
              <li class="menu-item selected" v-for="r in results">
                <h3>{{r.project_name}}
                  <div class="right info"><i class="fa fa-star"></i>{{r.project_star}}
                  </div>
                  <div class="right2 info">
                    {{r.main_language}}
                  </div>
                </h3>
                <div class="info">{{r.project_desc}}</div>
              </li>
            </div>
          </el-col>
        </el-row>
      </div>
  </div>
</template>


<script>
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {ElRow},
    name: 'high_Search',

    data() {
      return {
        myRule: '',
        rules: [],
        tabPosition: '必须包含',

        rule: {must: [], must_not: [], should: []},

        ruleStr: "{\"must\": [], \"must_not\": [], \"should\": []}",

        //preview
        total: 0,
        results: null
      }
    },

    mounted() {
      this.getMyRules();
    },

    methods: {
      clickRule(r) {
        this.rule = JSON.parse(r.rule);
        this.ruleStr = r.rule;
      },

      saveMyRule() {
        this.$prompt('请输入规则名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\S+]/,
          inputErrorMessage: '请输入规则名称',
          customClass: 'ljqc-message'
        }).then(({ value }) => {
          this.$http.post('/es/rule',
            {
              name: value,
              userId: 16,
              rule: this.ruleStr,
            },
            {emulateJSON:true}).then(response => {
            this.$message({
              type: 'success',
              message: "规则 " + value + " 已保存到 我的规则 ",
              customClass: 'ljqc-message'
            });
            this.getMyRules();
          })
        })
      },

      getMyRules() {
        this.$http.get('/es/rule/' + 16).then(response => {
          this.rules = response.data;
        });
      },

      delRule(id) {
        var msg = "您确定要删除该规则吗?";

        this.$confirm(msg, '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'ljqc-message'
        }).then(() => {
          this.$http.delete('/es/rule/' + id).then(response => {
            this.$message({
              type: 'success',
              message: "删除了规则 ",
              customClass: 'ljqc-message'
            });
            this.getMyRules();
            this.reset();
          });
        })
      },

      goSearch() {
        this.$router.push({
          path: '/search/prj',
          query: {searchRule: this.ruleStr}
        })
      },

      preview() {
        this.$http.get('/es/search', {
          params:
            {
              pageNo: 1,
              pageSize: 6,
              searchRule: this.ruleStr,
            }
        }).then(response => {
          if (response.data.resultCode != 200) {
            this.info("es request error!")
          }
          this.results = response.data.projects;
          this.total = response.data.totalCount;
        })
      },

      reset() {
        this.rule = {
          must: [],
          must_not: [],
          should: []
        };
        this.myRule = null;
        this.ruleStr = "{\"must\": [], \"must_not\": [], \"should\": []}";
      },

      addType() {
        if (this.tabPosition == '必须包含') {

          for(var i = 0; i < this.rule.must.length; i++)
          {
            if(this.rule.must[i].soft_type != null)
            {
              this.ruleStr = JSON.stringify(this.rule);
              return;
            }
          }
          this.rule.must = this.rule.must.concat({soft_type : ["输入类型"]});
          this.ruleStr = JSON.stringify(this.rule);
        }
        else if (this.tabPosition == '必须不包含') {
          for(var i = 0; i < this.rule.must_not.length; i++)
          {
            if(this.rule.must_not[i].soft_type != null)
            {
              this.ruleStr = JSON.stringify(this.rule);
              return;
            }
          }
          this.rule.must_not = this.rule.must_not.concat({soft_type : ["输入类型"]});
          this.ruleStr = JSON.stringify(this.rule);
        }
        else if (this.tabPosition == '或') {
          for(var i = 0; i < this.rule.should.length; i++)
          {
            if(this.rule.should[i].soft_type != null)
            {
              this.ruleStr = JSON.stringify(this.rule);
              return;
            }
          }
          this.rule.should = this.rule.should.concat({soft_type : ["输入类型"]});
          this.ruleStr = JSON.stringify(this.rule);
        }
      },

      addLanguage(val) {
        this.rule = JSON.parse(this.ruleStr);
        if (this.tabPosition == '必须包含') {
          for(var i = 0; i < this.rule.must.length; i++)
          {
            if(this.rule.must[i].main_language != null)
            {
              this.rule.must[i].main_language.push(val);
              this.ruleStr = JSON.stringify(this.rule);
              return;
            }
          }
          this.rule.must = this.rule.must.concat({main_language : [val]});
          this.ruleStr = JSON.stringify(this.rule);

        }
        else if (this.tabPosition == '必须不包含') {
          for(var i = 0; i < this.rule.must_not.length; i++)
          {
            if(this.rule.must_not[i].main_language != null)
            {
              this.rule.must_not[i].main_language.push(val);
              this.ruleStr = JSON.stringify(this.rule);
              return;
            }
          }
          this.rule.must_not = this.rule.must_not.concat({main_language : [val]});
          this.ruleStr = JSON.stringify(this.rule);
        }
        else if (this.tabPosition == '或') {
          for(var i = 0; i < this.rule.should.length; i++)
          {
            if(this.rule.should[i].main_language != null)
            {
              this.rule.should[i].main_language.push(val);
              this.ruleStr = JSON.stringify(this.rule);
              return;
            }
          }
          this.rule.should = this.rule.should.concat({main_language : [val]});
          this.ruleStr = JSON.stringify(this.rule);
        }

      },

      addUser() {
        if (this.tabPosition == '必须包含') {
          for(var i = 0; i < this.rule.must.length; i++)
          {
            if(this.rule.must[i].project_user != null)
            {
              this.ruleStr = JSON.stringify(this.rule);
              return;
            }
          }
          this.rule.must = this.rule.must.concat({project_user : "输入作者"});
          this.ruleStr = JSON.stringify(this.rule);
        }
        else if (this.tabPosition == '必须不包含') {
          for(var i = 0; i < this.rule.must_not.length; i++)
          {
            if(this.rule.must_not[i].project_user != null)
            {
              this.ruleStr = JSON.stringify(this.rule);

              return;
            }
          }
          this.rule.must_not = this.rule.must_not.concat({project_user : "输入作者"});
          this.ruleStr = JSON.stringify(this.rule);

        }
        else if (this.tabPosition == '或') {
          for(var i = 0; i < this.rule.should.length; i++)
          {
            if(this.rule.should[i].project_user != null)
            {
              this.ruleStr = JSON.stringify(this.rule);

              return;
            }
          }
          this.rule.should = this.rule.should.concat({project_user : "输入作者"});
          this.ruleStr = JSON.stringify(this.rule);

        }
      },

      addDeps() {
        if (this.tabPosition == '必须包含') {
          for(var i = 0; i < this.rule.must.length; i++)
          {
            if(this.rule.must[i].dependencies != null)
            {
              this.rule.must[i].dependencies.push("");
              this.ruleStr = JSON.stringify(this.rule);

              return;
            }
          }
          this.rule.must = this.rule.must.concat({dependencies : ["输入依赖"]});

        }
        else if (this.tabPosition == '必须不包含') {
          for(var i = 0; i < this.rule.must_not.length; i++)
          {
            if(this.rule.must_not[i].dependencies != null)
            {
              this.rule.must[i].dependencies.push("");
              this.ruleStr = JSON.stringify(this.rule);

              return;
            }
          }
          this.rule.must_not = this.rule.must_not.concat({dependencies : ["输入依赖"]});
        }
        else if (this.tabPosition == '或') {
          for(var i = 0; i < this.rule.should.length; i++)
          {
            if(this.rule.should[i].dependencies != null)
            {
              this.rule.must[i].dependencies.push("");
              this.ruleStr = JSON.stringify(this.rule);

              return;
            }
          }
          this.rule.should = this.rule.should.concat({dependencies : ["输入依赖"]});
        }
        this.ruleStr = JSON.stringify(this.rule);

      },

      addCve() {
        if (this.tabPosition == '必须包含') {
          for(var i = 0; i < this.rule.must.length; i++)
          {
            if( this.rule.must[i].cve_id != null)
            {
              this.ruleStr = JSON.stringify(this.rule);

              return;
            }
          }
          this.rule.must = this.rule.must.concat({'cve_id' : ["输入cve-id"]});
        }
        else if (this.tabPosition == '必须不包含') {
          for(var i = 0; i < this.rule.must_not.length; i++)
          {
            if(this.rule.must_not[i].cve_id != null)
            {
              this.ruleStr = JSON.stringify(this.rule);

              return;
            }
          }
          this.rule.must_not = this.rule.must_not.concat({'cve_id' : ["输入cve-id"]});
        }
        else if (this.tabPosition == '或') {
          for(var i = 0; i < this.rule.should.length; i++)
          {
            if(this.rule.should[i].cve_id != null)
            {
              this.ruleStr = JSON.stringify(this.rule);

              return;
            }
          }
          this.rule.should = this.rule.should.concat({'cve_id' : ["输入cve-id"]});
        }
        this.ruleStr = JSON.stringify(this.rule);

      },

      addCnnvd() {
        if (this.tabPosition == '必须包含') {
          for(var i = 0; i < this.rule.must.length; i++)
          {
            if(this.rule.must[i].cnnvd_id != null)
            {
              this.ruleStr = JSON.stringify(this.rule);

              return;
            }
          }
          this.rule.must = this.rule.must.concat({'cnnvd_id' : ["输入cnnvd-id"]});
        }
        else if (this.tabPosition == '必须不包含') {
          for(var i = 0; i < this.rule.must_not.length; i++)
          {
            if(this.rule.must_not[i].cnnvd_id != null)
            {
              this.ruleStr = JSON.stringify(this.rule);

              return;
            }
          }
          this.rule.must_not = this.rule.must_not.concat({'cnnvd_id' : ["输入cnnvd-id"]});
        }
        else if (this.tabPosition == '或') {
          for(var i = 0; i < this.rule.should.length; i++)
          {
            if(this.rule.should[i].cnnvd_id != null)
            {
              this.ruleStr = JSON.stringify(this.rule);

              return;
            }
          }
          this.rule.should = this.rule.should.concat({'cnnvd_id' : ["输入cnnvd-id"]});
          this.ruleStr = JSON.stringify(this.rule);

        }
      },

      containVuls() {
        if (this.tabPosition == '必须包含') {
          for(var i = 0; i < this.rule.must.length; i++)
          {
            if(this.rule.must[i].total_vul_num != null)
            {
              this.ruleStr = JSON.stringify(this.rule);

              return;
            }
          }
          this.rule.must = this.rule.must.concat({"is_vul_able": [true]});
          this.ruleStr = JSON.stringify(this.rule);

        }
        else if (this.tabPosition == '必须不包含') {
          for(var i = 0; i < this.rule.must_not.length; i++)
          {
            if(this.rule.must_not[i].total_vul_num != null)
            {
              this.ruleStr = JSON.stringify(this.rule);

              return;
            }
          }
          this.rule.must_not = this.rule.must_not.concat({"is_vul_able": [true]});
        }
        else if (this.tabPosition == '或') {
          for(var i = 0; i < this.rule.should.length; i++)
          {
            if(this.rule.should[i].total_vul_num != null)
            {
              this.ruleStr = JSON.stringify(this.rule);
              return;
            }
          }
          this.rule.should = this.rule.should.concat({"is_vul_able": [true]});
        }
        this.ruleStr = JSON.stringify(this.rule);

      }
    },

    watch: {

      ruleStr: function () {

      }
    },
  }

</script>


<style>
  .adv_search {
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 50px;

  }

  .deleteIcon {
    padding: 10px;
  }

  .zone {
    padding: 20px;
    clear: both;
  }

  .buttons {
    padding-top: 20px;
  }

  .rule_content {
    height: 400px;
    width: 100%;
  }

  .radios {
    /*padding-left: 300px;*/
    padding-top:20px;
    float: right;
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
    font-weight: 600;
    color: #24292e;
    cursor: default;
  }

  .right2 {
    float: right;
    margin-right: 200px
  }

  .info {
    font-size: 12px;
    padding: 5px
  }

  .right {
    float: right;
  }

  .rule-item {
    width: 600px
  }
</style>
