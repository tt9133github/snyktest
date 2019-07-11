<template xmlns="http://www.w3.org/1999/html">
  <div style="padding-right: 50px">
    <div class="es-version">
      <div class="card form white" id="form1">
        <div class="card-header">
          <h3 style="margin-top: 0px;">
            项目信息
            <el-button v-show="isAdmin" data-toggle="modal"
                       data-target="#prjInfoModal" size="mini" type="primary"
                       icon="el-icon-edit"
                       plain>
            </el-button>
          </h3>

          <div style="float: right">

            <button type="button" @click="downloadEsReport" class="btn btn-primary" style="margin: 30px">
              <i class="fa fa-arrow-circle-right"></i>导出项目信息
            </button>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-md-4" style="padding-left: 30px">
            <div class="form-group row">
              <label style="width: 85px;" class="col-form-label">项目名</label>
              <div class="col-md-8 "  @click="handleEdit(1)">
              <span v-if="editA">{{project.project_name}}</span>
                <div v-else>
                  <el-input v-model="project.project_name" @blur="editA = true"></el-input>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label style="width: 85px;" class=" col-form-label">项目地址</label>
              <div class="col-md-8 " @click="handleEdit(2)">
                <span v-if="editB">{{project.project_url}}</span>
                <div v-else>
                  <el-input v-model="project.project_url" @blur="editB = true"></el-input>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label style="width: 85px;" class=" col-form-label">项目描述</label>
              <div class="col-9">
                {{project.project_desc}}
              </div>
            </div>
            <div class="form-group row">
              <label style="width: 85px;" class=" col-form-label">软件类型</label>
              <div class="col-9">

                {{project.soft_type == "" ? "待更新" : $t(project.soft_type) }}
              </div>
            </div>

            <div class="form-group row">
              <label style="width: 85px;" class=" col-form-label">平台</label>
              <div class="col-9">
                <span v-for="p in project.os_platform">{{ p }} </span>
               <!-- <span v-if=" project.os_platform.length == 0">待更新 </span>-->
              </div>
            </div>

          </div>

          <div class="col-md-4">
            <div class="form-group row">
              <label style="width: 85px;" class=" col-form-label">主语言</label>
              <div class="col-9">
                {{project.main_language}}
              </div>
            </div>

            <div class="form-group row">
              <label style="width: 85px;" class=" col-form-label">创建时间</label>
              <div class="col-9">
                {{project.created_time}}
              </div>
            </div>
            <div class="form-group row">
              <label style="width: 85px;" class=" col-form-label">作者</label>
              <div class="col-9">
                {{project.project_user}}
              </div>
            </div>

            <div class="form-group row">
              <label style="width: 85px;" class=" col-form-label">项目星级</label>
              <div class="col-9">
                {{project.project_star}}
              </div>
            </div>

            <div class="form-group row">
              <label style="width: 85px;" class=" col-form-label">国家</label>
              <div class="col-md-8" @click="handleEdit(3)">
               <span v-show="editC">{{project.country == "" ? "待更新" : $t(project.country)}}</span>
               <template >
                  <el-select v-show="!editC" @blur="editC = true"
                    v-model="project.country"
                    allow-create
                    default-first-option
                    placeholder="--请选择国家--">
                    <el-option
                      v-for="item in countrySelects"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
               </template>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group row">
              <label style="width: 85px;" class="col-form-label">最新版本</label>
              <div class="col-9">
                {{project.latest_version}}
              </div>
            </div>

            <div class="form-group row">
              <label style="width: 85px;" class="col-form-label">是否含漏洞</label>
              <div class="col-9">
                {{project.is_vul_able == true ? "是" : "否"}}
              </div>
            </div>

            <div class="form-group row">
              <label style="width: 85px;" class="col-form-label">漏洞总数</label>
              <div class="col-9">
                {{project.total_vul_num}}
              </div>
            </div>

            <div class="form-group row">
              <label style="width: 85px;" class="col-form-label">项目主页</label>
              <div class="col-9">
                {{project.homepage == "" ? "暂无" : project.homepage}}
              </div>
            </div>

            <div class="form-group row">
              <label style="width: 85px;" class=" col-form-label">是否为组件</label>
              <div class="col-9">
                {{project.is_library == true ? "是" : "否"}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="es-version" style="padding-top: 0px">
      <div class="card form white" id="form2">
        <el-table :data="versions" empty-text="暂无版本记录">

          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.dependencies" empty-text="暂无依赖信息">
                <el-table-column type="index">
                </el-table-column>
                <el-table-column label="依赖组件" prop="d_name">
                </el-table-column>
                <el-table-column label="版本" prop="d_version">
                </el-table-column>
                <el-table-column label="类型" prop="d_kind">
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>

          <el-table-column label="版本号" prop="version">
            <template slot-scope="scope">
              <a class="pointer" @click="toFilePage(scope.row)">{{
                scope.row.version
                }}</a>
            </template>
          </el-table-column>
          <el-table-column label="漏洞数量" prop="total_vul_num">
            <template slot-scope="scope">
              <span v-if="scope.row.low_vul_num == 0 && scope.row.high_vul_num == 0 && scope.row.mid_vul_num == 0">
                无漏洞
              </span>
              <span v-else>
                <el-tag color="#C33531" class="vul_tag" data-toggle="modal" data-target="#cveModal" @click.native="setVuls(scope.row, scope.row.hig_vul_list)">
                {{scope.row.high_vul_num}}
              </el-tag>
              <el-tag color="#EE9201" class="vul_tag" data-toggle="modal" data-target="#cveModal" @click.native="setVuls(scope.row, scope.row.mid_vul_list)">
                {{scope.row.mid_vul_num}}
              </el-tag>
              <el-tag color="#EFE42A" class="vul_tag" data-toggle="modal" data-target="#cveModal" @click.native="setVuls(scope.row, scope.row.low_vul_list)">
                {{scope.row.low_vul_num}}
              </el-tag>

              </span>

              <el-tag style="margin-left: 20px" data-toggle="modal" data-target="#editCveModal" v-show="isAdmin" @click.native="setId(scope.row.id)">
                <i class="fa fa-plus pointer">
                  添加漏洞
                </i>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="项目大小" prop="volume">
            <template slot-scope="scope">
              {{(scope.row.volume / 1024).toFixed(2)}}KB
            </template>
          </el-table-column>
          <el-table-column label="项目行数" prop="rowsnumber">
          </el-table-column>
          <el-table-column label="源码下载">
            <template slot-scope="scope">
              <a class="fa fa-download pointer" @click="download(scope.row)">
              </a>
            </template>
          </el-table-column>
        </el-table>

        <center>
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size=page_size
            layout="prev, pager, next, total"
            :total=total v-show="total!=0">
          </el-pagination>
        </center>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="cveModal" tabindex="-1" role="dialog">
        <div class="modal-dialog vul-modal" role="document">
          <div class="modal-content ">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <b style="padding-left: 10px">漏洞列表</b>
            </div>
            <div class="modal-body">
              <div class="box box-solid box-default ">
                <el-table :data="vul_list" stripe class="vul-list slim-bar">
                  <el-table-column
                    type="index" label="序号"
                    header-align="center" align="center">
                  </el-table-column>

                  <el-table-column label="CVE" width="200" header-align="center" align="center">
                    <template slot-scope="scope">
                      {{scope.row.cve_id}}
                    </template>
                  </el-table-column>

                  <el-table-column label="CNNVD" width="200" header-align="center" align="center">
                    <template slot-scope="scope">
                      {{scope.row.cnnvd_id}}
                    </template>
                  </el-table-column>

                  <el-table-column label="详情" width="100" header-align="center" align="center">
                    <template slot-scope="scope">
                      <router-link target="_blank" :to="{path:'/vul_detail/'+ scope.row.cve_id }">
                        <i class="fa fa-sign-in pointer" style="color: cornflowerblue" aria-hidden="true"></i>
                      </router-link>
                    </template>
                  </el-table-column>

                </el-table>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">
                确定
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- vul edit Modal -->
      <div class="modal fade" id="editCveModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document" style="padding-top: 100px">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <b style="padding-left: 10px">新增漏洞</b>
            </div>
            <div class="modal-body">
              <el-form label-width="80px">
                <el-form-item label="CVE">
                  <el-select
                    v-model="value9"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入关键词"
                    :remote-method="remoteMethod"
                    :loading="loading">
                    <el-option
                      v-for="item in cve_options"
                      :key="item.cveId"
                      :label="item.cveId"
                      :value="item.cveId">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="漏洞等级">
                  <el-select v-model="vul_severity" placeholder="请选择">
                    <el-option
                      v-for="item in vul_level"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>


                <el-form-item label="漏洞名称">
                  <el-input v-model="mySelect.vuln_title"></el-input>
                </el-form-item>

                <el-form-item label="CNNVD">
                  <el-input v-model="mySelect.cnnvd_id"></el-input>
                </el-form-item>

                <el-form-item label="发布时间">
                  <el-input v-model="mySelect.vuln_published"></el-input>
                </el-form-item>

                <el-form-item label="类型">
                  <el-input v-model="mySelect.type"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="onSubmit" data-dismiss="modal">增加到项目</el-button>
                  <el-button data-dismiss="modal">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>

      <!-- project info Modal -->
      <div class="modal fade" id="prjInfoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
           style="padding-top: 100px">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button aria-hidden="true" data-dismiss="modal" class="close" type="button">
                ×
              </button>
              <h4 class="modal-title">{{project.project_name}} 项目信息</h4>
            </div>
            <div class="modal-body">
              <form role="form" class="form-horizontal">
                <div class="row form-group">
                  <label class="col-lg-2 control-label">国家</label>
                  <div class="col-lg-10">
                    <el-select
                            v-model="project.country"
                            allow-create
                            default-first-option
                            placeholder="--请选择国家--">
                      <el-option
                              v-for="item in countrySelects"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="row form-group">
                  <label class="col-lg-2 control-label">主语言</label>
                  <div class="col-lg-10">
                    <el-select
                            v-model="project.main_language"
                            allow-create
                            default-first-option
                            placeholder="--请选择主语言--">
                      <el-option
                              v-for="item in languagesSelects"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="row form-group">
                  <label class="col-lg-2 control-label">软件类型</label>
                  <div class="col-lg-10">
                    <el-select
                            v-model="project.soft_type"
                            allow-create
                            default-first-option
                            placeholder="--请选择软件类型--">
                      <el-option
                              v-for="item in softtypeSelects"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="row form-group">
                  <label class="col-lg-2 control-label">应用平台</label>
                  <div class="col-lg-10">
                    <el-select
                            v-model="project.os_platform"
                            multiple
                            allow-create
                            default-first-option
                            placeholder="--请选择操作平台--">
                      <el-option
                              v-for="item in platforms"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="row">
                  <div class=" col-md-2 ">
                  </div>
                  <div class=" col-md-10">
                    <button class="btn btn-primary ml-3 pull-right " @click="savePrjInfo" data-dismiss="modal">保存</button>
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
  import navBar from '../../common/nav.vue';

  export default {
    props: ['param'],

    components: {
      navBar,
    },

    data() {
      return {
        //user
        user: {},
        isAdmin: false,
        editA: true,
        editB: true,
        editC: true,

        //project version
        pid: 0,
        project: {},
        versions: [],
        id: 0,

        //pagination
        currentPage: 1,
        total: 0,
        page_size: 10,

        //vuls
        vul_list: [],
        cve_url: "",
        vul_detail: "",
        vul_severity: "",

        //modal
        vul_level: [
          {"value": 1, "label": "低危"},
          {"value": 2, "label": "中危"},
          {"value": 3, "label": "高危"},
        ],

        row: {},
        cve_options: [],
        value9: {},
        list: [],
        loading: false,
        mySelect: {},

        //edit
        platforms: [
          {
            value: 'Windows',
            label: 'Windows'
          },
          {
            value: 'Linux',
            label: 'Linux'
          },
          {
            value: 'Unix',
            label: 'Unix'
          },
          {
            value: 'macOs',
            label: 'macOs'
          },
          {
            value: 'Android',
            label: 'Android'
          },
          {
            value: 'Ios',
            label: 'Ios'
          }
        ],

        countrySelects: [
          {
            label: "中国",
            value: 'China'
          },
          {
            label: '美国',
            value: 'USA'
          },
          {
            label: '英国',
            value: 'UK'
          },
          {
            label: '日本',
            value: 'Japan'
          },
          {
            label: '印度',
            value: 'India'
          },
          {
            label: '其他国家',
            value: 'Others'
          }
        ],

        softtypeSelects: [
          {
            label: "操作系统",
            value: 'os'
          },
          {
            label: '数据库',
            value: 'db'
          },
          {
            label: '网络服务',
            value: 'web_service'
          },
          {
            label: '办公软件',
            value: 'Office'
          },
          {
            label: '游戏',
            value: 'game'
          },
          {
            label: '工具',
            value: 'tool'
          },
          {
            label: '浏览器',
            value: 'Browser'
          },

          {
            label: '大数据处理',
            value: 'big_data'
          },
          {
            label: '人工智能',
            value: 'ai'
          },
          {
            label: '网络爬虫',
            value: 'spider'
          },
          {
            label: '媒体播放',
            value: 'media'
          },
          {
            label: '图像浏览',
            value: 'image_reader'
          },
          {
            label: '其他类型',
            value: 'others'
          }
        ],

        languagesSelects: [
          {
            label: "Java",
            value: 'java'
          },
          {
            label: 'C',
            value: 'c'
          },
          {
            label: 'C++',
            value: 'cpp'
          },
          {
            label: 'Python',
            value: 'python'
          },
          {
            label: 'Php',
            value: 'php'
          },
          {
            label: 'C#',
            value: 'csharp'
          },
          {
            label: 'VHDL',
            value: 'vhdl'
          },
          {
            label: 'Verilog',
            value: 'verilog'
          },
          {
            label: '其他语言',
            value: 'others'
          }
        ],

        rely_type: [
          {
            value: 'runtime',
            label: 'runtime'
          },
          {
            value: 'development',
            label: 'development'
          }
        ],
        os_select: [],

      }
    },

    methods: {
      savePrjInfo() {
        var os = "";
        this.project.os_platform.forEach(item => {
          os += item + ",";
        });

        var form = {
          project_id: this.project.project_id,
          country: this.project.country,
          soft_type: this.project.soft_type,
          main_language: this.project.main_language,
          osUplate: os
        };
        this.$http.post('/es/project/', form, {emulateJSON: true}).then(response => {
          if (response.data.status == 1) {
            this.$notify({
              title: '成功',
              message: '修改成功!',
              type: 'success',
              customClass: 'ljqc-message'
            });
            let data = JSON.stringify(this.project);
            this.$router.push({path: "/search/version/", query: {prj: data}})
          } else {
            this.$notify({
              title: '错误',
              message: '修改失败!' + response.data.msg,
              type: 'error',
              customClass: 'ljqc-message'
            });
          }
        });
      },

      downloadEsReport() {
        window.location.href = "/es/project/excel/" + this.pid;
      },
      handleEdit(con) {
        if(con == 1){
          this.editA = false
          console.log(11111)
        }
        if(con == 2){
          this.editB = false
        }
        if(con == 3) {
          this.editC = false
        }
      },
      remoteMethod(query) {
        if (query.toLowerCase().indexOf("cve-") !== -1) {
          this.loading = true;
          this.$http.get('/api/vul/search/1', {params: {content: query}}).then(response => {
            this.cve_options = response.data.content;
            this.loading = false;
          });
        }
      },

      onSubmit() {
        this.$http.patch('/es/version/vul?id=' + this.id, {
          cveId: this.mySelect.cveId,
          cnnvdId: this.mySelect.cnnvdId,
          vuln_severity: this.vul_severity,
        }, {emulateJSON: true}).then(response => {
          if (response.status == 200) {
            this.$notify({
              showClose: true,
              message: '更新成功！',
              type: 'success',
              customClass: 'ljqc-message'
            });
          }
          else {
            this.$notify({
              showClose: true,
              message: '更新是时发生错误！代码' + response.status,
              type: 'error',
              customClass: 'ljqc-message'
            });
          }
        });

      },

      setVuls(row, val) {
        this.row = row;
        val.sort(function(a, b) {
          if (b.cve_id > a.cve_id) {
            return 1;
          } else if (b.cve_id < a.cve_id) {
            return -1;
          } else {
            return 0;
          }
        });
        this.vul_list = val;
      },

      setId(id) {
        this.id = id;
      },

      handleCurrentChange(val) {
        this.currentPage = val;
        this.requestEs();
      },

      toFilePage(row) {
        var fid = this.$route.query.fid;

        this.$router.push({
          path: '/search/file',
          query: {
            pname: row.project_name,
            v: row.version,
            pid: row.id,
            fid: fid,
          }
        })
      },

      requestEs() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.$http.get('/es/project', {
          params:
            {
              pageNo: this.currentPage,
              pageSize: this.page_size,
              key: "project_id",
              values: this.pid,
            }
        }).then(response => {
          if (response.data.resultCode != 200) {
            alert("es request error!")
          }
          this.versions = response.data.projects;
          this.total = response.data.totalCount;
          this.versions.forEach(function (item) {
            item.dependencies = this.project.subdependencies;
          }.bind(this));
          loading.close();
        }, response => {
          alert("request failed " + response.resultCode);
          loading.close();
        });
      },

      getDetail(cve_id) {
        this.cve_url = "http://cve.mitre.org/cgi-bin/cvename.cgi?name=" + cve_id;
        this.$http.get("/vul/" + cve_id).then(response => {
          this.vul_detail = response.data;

          //判断漏洞的危险等级高、中、低
          if (this.vul_detail.severity == "HIGH") {
            this.vul_severity = 3;
            //console.log("vul_severity:" + vm.vul_severity);
          } else if (this.vul_detail.severity == "MEDIUM") {
            this.vul_severity = 2;
          } else if (this.vul_detail.severity == "LOW") {
            this.vul_severity = 1;
          }
        });
      },

      download(prj) {
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
      }
    },

    mounted: function () {
      this.$emit("smallSideBar");

      //this.project = JSON.parse(this.$route.query.prj);
      //this.pid = this.project.project_id;
      this.user = JSON.parse(localStorage.getItem('user'));
      this.isAdmin = true;//(this.user.resources.indexOf("8") != -1);
      //this.requestEs();
    },

    watch: {
      value9: function (val) {
        this.mySelect = this.cve_options.filter(item => {
          return item.cveId == val;
        });

        this.mySelect = this.mySelect[0];
        if(this.mySelect.vuln_severity == "低危")
        {
          this.vul_severity = 1;
        }
        if(this.mySelect.vuln_severity == "中危")
        {
          this.vul_severity = 2;
        }
        if(this.mySelect.vuln_severity == "高危")
        {
          this.vul_severity = 3;
        }
      }
    }
  }
</script>

<style scoped>

  .es-version {
    padding: 20px;
  }

  .vul-modal {
    padding-top: 100px;
  }

  .modal-content {
    border-radius: .25rem;
  }

  .vul-list {
    height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
  }


  .vul_tag {
    cursor: pointer;
    margin-right: 3px;
    color: white;
  }

  .demo-table-expand {
    font-size: 0;
    padding: 5px 50px;
  }

  .demo-table-expand label {
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 30%;
  }

  .pagination {
    float: right;
  }

  .content-header {
    padding: 10px;
  }

  .vul-modal {
    overflow: auto;
  }

  .vul-modal::-webkit-scrollbar { /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .vul-modal::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    height: 50px;
    background-color: #999;
    -webkit-border-radius: 4px;
    outline: 2px solid #EDEDED;
    outline-offset: -2px;
  }

  .vul-modal::-webkit-scrollbar-track { /*滚动条里面轨道*/
    background-color: #EDEDED; /*滚动条的背景颜色*/
    -webkit-border-radius: 0; /*滚动条的圆角宽度*/
  }

  .li-vul {
    padding: 10px;
    margin-left: 5px;
  }

  .el-pagination {
    padding: 20px 5px;
  }
/deep/  .el-input__inner{
    height: 30px;
  }
</style>
