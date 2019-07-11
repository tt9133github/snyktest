<style>
  .chartComponent_detail_radar {
    width: 450px;
    height: 400px;
  }

  .modal-ul {
    overflow: auto;
    /*height: 600px;*/
  }

  .modal-ul::-webkit-scrollbar {/*滚动条整体样式*/
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .modal-ul::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    height: 50px;
    background-color: #999;
    -webkit-border-radius: 4px;
    outline: 2px solid #EDEDED;
    outline-offset: -2px;
  }
  .modal-ul::-webkit-scrollbar-track {/*滚动条里面轨道*/
    background-color: #EDEDED; /*滚动条的背景颜色*/
    -webkit-border-radius: 0; /*滚动条的圆角宽度*/
  }

  .li-vul {
    padding: 10px;
    margin-left: 5px;
  }

  .repo-detail-modal {
    padding-top: 80px;
  }
</style>

<template>
  <div class="wrapper">
    <Header></Header>
    <!-- Content Header (Page header) -->
    <br>
    <!-- Content Header (Page header) -->
    <section class="content-header" style="padding-top: 100px">
      <h1>开源项目详情
        <i class="glyphicon glyphicon-saved"></i></h1>
      <ol class="breadcrumb">
        <li>
          <router-link :to="{path:'/my_projects', query:{ user_id: user_id } }">
            <i class="fa fa-list"></i> 我的项目</router-link>
        </li>
        <li>
            <router-link :to="{ path: '/task/' + task_id + '/common_component', query:{ user_id: user_id } }">
            开源项目溯源分析
          </router-link>
        </li>
        <li class="active">开源项目详情</li>
      </ol>
    </section>
    <section class="content bg-style">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-solid box-default">
            <!-- /.box-header -->
            <div class="box-body">
              <h5>
                <b>
                  <p>&nbsp;
                    <i class="fa fa-circle-o text-green"></i>&nbsp;开源项目详情&nbsp;&nbsp;
                  </p>
                </b>
              </h5>
              <hr>
              <p>
                项目中包含（或调用）的开源项目详情包括开源项目的基本信息，开源项目质量评估分析，开源项目版本匹配详情等。其中开源项目质量评估部分对开源项目的安全性（漏洞指标），关注度（watcher,fork,star等指标），可维护性（贡献者指标），活跃度（更新频率，更新次数，更新版本数等指标），使用友好性（使用指南完整性等指标）进行综合评估，给出开源项目质量评估。</p>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
        <!--/.col-->
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="box box-primary">
            <div class="box-header with-border">
              <p>
                <b>
                  <i class="fa fa-folder-open-o"></i>&nbsp;&nbsp;开源项目基本信息</b>&nbsp;&nbsp;&nbsp;&nbsp;Component
                details
              </p>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse">
                  <i class="fa fa-minus"></i>
                </button>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body no-padding">
              <div class="col-md-6">
                <ul class="list-group list-group-unbordered">
                  <li class="list-group-item">开源项目名称
                    <span class="pull-right">{{common_component_detail.project_name}}</span>
                  </li>
                  <li class="list-group-item" v-if="common_component_detail.homepage!=''">官方网址
                    <a class="pull-right" :href="common_component_detail.homepage.indexOf('http://') === -1 ? 'http://' + common_component_detail.homepage : common_component_detail.homepage" target="_blank">{{common_component_detail.homepage}}</a>
                  </li>
                  <li class="list-group-item">来源网址
                    <a class="pull-right" :href="common_component_detail.project_url" target="_blank">{{common_component_detail.project_url}}</a>
                  </li>
                  <li class="list-group-item" >组件依赖
                    <router-link v-show="hasRelies" class="pull-right" :to="{ path: '/relies/' + common_component_detail.project_id , query:{user_id: user_id} }">
                      <i class="fa fa-eye"></i>
                    </router-link>
                    <span class="pull-right" v-show="!hasRelies">暂无</span>
                  </li>
                </ul>
              </div>
              <div class="col-md-6">
                <ul class="list-group list-group-unbordered">
                  <li class="list-group-item">项目创建时间
                    <span class="pull-right">{{common_component_detail.created_time}}</span>
                  </li>
                  <li class="list-group-item">最新版本
                    <span class="pull-right">{{common_component_detail.latest_version == '' ? "暂无" : common_component_detail.latest_version}}</span>
                  </li>
                  <li class="list-group-item">许可证
                    <span class="pull-right" v-for="l in license">{{l.license}}</span>
                    <span class="pull-right" v-if="license.length == 0">暂无</span>
                  </li>

                </ul>
              </div>

              <div class="col-md-12">
                <ul class="list-group list-group-unbordered" v-if="common_component_detail.detail_info!=''">
                  开源项目说明：&nbsp;&nbsp;&nbsp;&nbsp;{{common_component_detail.detail_info}}
                </ul>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col (TOP) -->
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="box box-solid box-default">
            <!-- /.box-header -->
            <div class="box-body bg-color-HEX6">
              <h5>
                <i class="fa fa-file-text-o"></i>&nbsp;
                <b>开源项目质量评估分析</b>&nbsp;&nbsp;</h5>
            </div>
            <!-- /.box-body --></div>
        </div>
      </div>
      <!--row-->
      <div class="row">
        <div class="col-md-6">
          <div class="box box-primary">
            <div class="box-header with-border">
              <p>
                <b>
                  <i class="fa fa-folder-open-o"></i>&nbsp;&nbsp;指标详情</b>&nbsp;&nbsp;&nbsp;&nbsp;Index
                details
              </p>
            </div>
            <!-- /.box-header -->
            <div class="box-body no-padding">

              <div class="col-md-12">
                <ul class="list-group list-group-unbordered">
                  <li class="list-group-item">star
                    <span class="pull-right">{{common_component_detail.project_star}}</span>
                  </li>
                  <li class="list-group-item">fork
                    <span class="pull-right">{{common_component_detail.project_fork}}</span>
                  </li>
                  <li class="list-group-item">watcher
                    <span class="pull-right">{{common_component_detail.project_watch}}</span>
                  </li>
                  <li class="list-group-item">下载量
                    <span class="pull-right">{{common_component_detail.downloads}}</span>
                  </li>
                  <li class="list-group-item">热度等级
                    <span class="pull-right">{{common_component_detail.popularity}}</span>
                  </li>
                  <li class="list-group-item">总版本数
                    <span class="pull-right">{{common_component_detail.version_num}}</span>
                  </li>
                  <li class="list-group-item">所有版本漏洞数
                    <span class="pull-right">{{common_component_detail.whole_vul_num}}</span>
                  </li>
                  <li class="list-group-item">贡献者数
                    <span class="pull-right">{{common_component_detail.contributors}}</span>
                  </li>
                  <li class="list-group-item">更新频率(天/次)
                    <span class="pull-right">{{common_component_detail.frequency}}</span>
                  </li>

                </ul>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <div class="col-md-6">
          <div class="box box-primary">
            <div class="box-header with-border">
              <p>
                <b>
                  <i class="fa fa-folder-open-o"></i>&nbsp;&nbsp; 开源项目质量评估分析</b>&nbsp;&nbsp;&nbsp;&nbsp;Component
                quality analysis
              </p>
            </div>
            <div class="box-bod chartComponent_detail_radar">
              <center>
                <div class="chartComponent_detail_radar" id="componentRadar"></div>
              </center>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col (TOP) -->
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="box box-primary">
            <div class="box-header with-border">
              <p>
                <b>
                  <i class="fa fa-folder-open-o"></i>&nbsp;&nbsp;最佳版本匹配详情</b>&nbsp;&nbsp;&nbsp;&nbsp;
                Best match component version details
              </p>
              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse">
                  <i class="fa fa-minus"></i>
                </button>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table class="table table-hover table-bordered table-striped">
                <thead>
                <tr>
                  <th width="25%">开源项目版本</th>
                  <th width="15%">文件总数</th>
                  <th width="15%">被引用文件数</th>
                  <th width="15%">发布时间</th>
                  <th width="15%">匹配详情</th>
                  <th width="15%">漏洞详情</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{{common_component_detail.version}}</td>
                  <td>{{common_component_detail.valid_files}}</td>
                  <td>{{common_component_detail.matched_file_num}}</td>
                  <td>{{common_component_detail.created_time}}
                  </td>
                  <td>
                    <button class="btn btn-default" data-toggle="modal" data-target="#vulModal" @click="getComponentDetail()">
                      查看
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-default" data-toggle="modal" data-target="#cveModal" @click="getVul(common_component_detail.vul_ids)" v-if="common_component_detail.vul_ids == null || common_component_detail.vul_ids.length==0" disabled="disabled">
                      无
                    </button>
                    <button class="btn btn-default" data-toggle="modal" data-target="#cveModal" @click="getVul(common_component_detail.vul_ids)" v-else>
                      查看
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col (TOP) -->
      </div>
      <!-- Modal -->
      <div class="modal fade repo-detail-modal" id="vulModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" >
        <div class="modal-dialog modal-lg"   role="document" style="width: 1100px;">
          <div class="modal-content " >
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h3>开源项目目录结构</h3>
            </div>
            <div class="modal-body" style="padding: 0px">
              <!--主体-->
            <div style="overflow-y: auto;overflow-x: hidden">
              <el-table :data=" component_match" stripe style="overflow-x: hidden">
                <el-table-column label="序号" type="index" width="60" align="center">
                  <template slot-scope="scope">
                    {{(currentPage - 1) * page_size + scope.$index + 1}}
                  </template>
                </el-table-column>
                <el-table-column prop="match_file_name" label="开源项目文件名称" width="170">
                </el-table-column>
                <el-table-column prop="match_path" label="开源项目文件路径" width="270">
                </el-table-column>
                <el-table-column prop="check_file_name" label="匹配文件名称" width="170">
                </el-table-column>
                <el-table-column prop="check_path" label="匹配文件路径" width="270">
                </el-table-column>
                <el-table-column label="匹配类型" width="120">
                  <template slot-scope="scope">
                    <el-tag type="warning" v-if="scope.row.match_type==1">&nbsp;&nbsp;代码级&nbsp;&nbsp;</el-tag>
                    <el-tag v-if="scope.row.match_type==0">&nbsp;&nbsp;文件级&nbsp;&nbsp;</el-tag>
                    <el-tag v-if="scope.row.match_type!=1 && scope.row.match_type!=0">原文件级</el-tag>

                  </template>

                </el-table-column>
              </el-table>
            </div>
              <center>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="page_size" layout="total, sizes, prev, pager, next" :total="file_total">
                </el-pagination>
              </center>
              <!--主体结束-->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">
                确定
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="cveModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document" style="padding-top: 50px">
          <div class="modal-content" >
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h3>漏洞列表</h3>
            </div>
            <div class="modal-body">
              <div class="box box-solid box-default">
                <ul class="list-inline modal-ul">
                  <li v-for="term in vul_list" class="li-vul" >
                    <a data-toggle="modal" style="cursor: pointer" data-target="#vuldetailModal" v-on:click="getDetail(term)">{{term}}</a>
                  </li>
                </ul>
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

      <div class="modal fade" id="vuldetailModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" style="width:1000px" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <!--                        <h3>漏洞分析&nbsp;&nbsp;</h3>-->
            </div>
            <div class="modal-body">
              <center>
                <h3>{{vul_detail.vul_title}}</h3>
              </center>
              <div class="container ">
                <div class="container">
                  <!--第一层-->
                  <div class="fl w770">
                    <div class="title_bt w770">
                      <h2 style="width:140px;">漏洞信息详情</h2>
                    </div>
                    <div style="height:20px;"></div>
                    <div class="detail_xq w770">
                      <div class="col-md-6">
                        <ul>
                          <li>
                            <span>CVE编号：</span>
                            <a v-bind:href="cve_url" target="_blank" rel="nofollow">{{vul_detail.cve_id}}</a>
                            <input type="hidden" id="formId" name="formId" value="2,017,090,507"/>
                          </li>
                          <li>
                            <span>CNNVD编号：{{vul_detail.cnnvd_id}}</span></li>
                          <li>
                            <span>发布时间：</span> {{vul_detail.published_date}}
                          </li>
                          <li>
                          <li>
                            <span>CVSS漏洞评分：</span> {{vul_detail.level}}
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-6">
                        <ul>
                          <li>
                            <span>危害等级：</span>&nbsp;
                            <a style="color:#4095cc;cursor:pointer;">{{vul_detail.severity}}
                              <img v-show="vul_severity==3" src="../../../../../static/image/jb_4.png" border="0">
                              <img v-show="vul_severity==2" src="../../../../../static/image/jb_3.png" border="0">
                              <img v-show="vul_severity==1" src="../../../../../static/image/jb_2.png" border="0">
                              <img v-show="vul_severity==0" src="../../../../../static/image/jb_1.png" border="0">
                              <br/></a></li>
                          <li>
                            <span>漏洞类型：</span>
                            <span v-for="type in vul_detail.vul_type">
                                                {{type}}&nbsp;
                                            </span></li>
                          <li>
                            <span>更新时间：</span> {{vul_detail.update_date}}
                          <li>
                            <span>评分方式：</span> {{vul_detail.level_method}}
                          </li>
                        </ul>
                      </div>
                      <div class="cb"></div>
                    </div>
                    <div class="d_ldjj">
                      <div class="title_bt">
                        <h2 style="width:100px;">漏洞描述</h2>
                      </div>
                      <div style="height:20px;"></div>
                      <p style="text-indent:2em" class="ckwz">
                        {{vul_detail.description}}</p>
                    </div>
                    <div class="d_ldjj w770">
                      <div class="title_bt">
                        <h2 style="width:100px;">漏洞威胁</h2>
                      </div>
                      <div style="height:20px;"></div>
                      <div class="col-md-6">
                        <ul>
                          <li>
                            <span>漏洞利用方式：</span>{{vul_detail.access_vector}}
                          </li>
                          <li>
                            <span>漏洞利用复杂度：</span>&nbsp;
                            {{vul_detail.access_complexity}}
                          </li>
                          <li>
                            <span>漏洞利用身份验证:</span>&nbsp;{{vul_detail.authentication}}
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-6">
                        <ul>
                          <li>
                            <span>系统保密性影响：</span>{{vul_detail.confidentiality}}
                          </li>
                          <li>
                            <span>系统完整性影响:</span>&nbsp;{{vul_detail.integrity}}
                          </li>
                          <li>
                            <span>系统可用性影响:</span>&nbsp;{{vul_detail.availability}}
                          </li>
                        </ul>
                      </div>
                      <div class="cb"></div>
                    </div>
                    <div class="d_ldjj m_t_20">
                      <div class="title_bt">
                        <h2 style="width:100px;">参考网址</h2>
                      </div>
                      <div style="height:20px;"></div>
                      <div v-for="url in vul_detail.reference_data">
                        <a style="text-indent:2em;width: 890px;" class="ckwz" :href="url" target="_blank">{{url}}</a>
                      </div>
                    </div>
                    <div class="d_ldjj">
                      <div class="title_bt">
                        <h2 style="width:120px;">受影响产品</h2>
                      </div>
                      <div style="height:20px;"></div>
                      <div v-for="term in vul_detail.impact_products">
                        <p style="text-indent:2em"><a><b>厂商名称：{{term.vender_name}}</b></a>
                        </p>
                        <div class="vulnerability_list">
                          <ul id="ent" v-for="item in term.product_info">
                            <li>
                              <div class="fl">产品：{{item.product_name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                              <div style="overflow: hidden; white-space:nowrap;text-overflow:ellipsis;" v-bind:title="item.version_list">
                                版本：<span v-if="item.version_list.length > 1">{{item.version_list}}</span>
                                <span v-if="item.version_list.length == 1">{{item.version_list[0]}}</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <br>
                      </div>
                    </div>
                    <div class="d_ldjj">
                      <div class="title_bt">
                        <h2 style="width:200px;">漏洞文件</h2>
                      </div>
                      <div style="height:20px;"></div>
                      <div v-for="f in vul_detail.files">
                        <a data-toggle="modal" style="cursor: pointer;text-indent:2em;padding-left: 20px" data-target="#FileModal" v-on:click="getContent(f)">{{f.name}}</a>
                      </div>
                    </div>
                    <div class="d_ldjj">
                      <div class="title_bt">
                        <h2 style="width:200px;">漏洞补丁参考链接</h2>
                      </div>
                      <div style="height:20px;"></div>
                      <div v-for="suggestion in vul_detail.step_links">
                        <p style="text-indent:2em" class="ckwz">
                          {{suggestion}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--主体结束-->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">
                确定
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="reliesModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" style="width:1000px;height: 600px" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <!--                        <h3>漏洞分析&nbsp;&nbsp;</h3>-->
            </div>
            <div class="modal-body">
              <center>
                <h3>组件依赖关系</h3>
              </center>
              <div class="container ">
                <div class="container">
                  <!--第一层-->

                </div>
              </div>
              <!--主体结束-->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import Header from '../../../components/Header.vue';

  import {
    initRadar
  } from '../../../style/js/result/chartUtil.js';
  export default {
    components: {
      Header
    },
    data: function () {
      return {
        hasRelies: false,
        license: [],
        //任务ID
        task_id: '',
        user_id: '',
        //开源项目ID
        project_id: '',
        version: '', //instant version
        //分页数据```
        currentPage: 1,
        page_size: 10,
        //匹配数量
        file_total: 0,
        //开源项目雷达图
        componentRadar: '',

        //目录结构根结点
        //root: [],

        values: {
          a: true,
          b: true,
          c: true,
          d: true,
          e: true
        },
        vul_list: [],
        vul_detail: {},
        vul_detailInfo: {},
        common_component_detail: {},
        cve_url: '',
        vul_severity: 0,

        //开源项目匹配列表
        component_match: [],
      }
    },

    mounted: function () {
      this.task_id = this.$route.params.id;
      this.user_id = JSON.parse(localStorage.getItem('user')).id;
      if(this.user_id == null)
      {
        this.$router.push({path: '/login'});
      }
      this.project_id = this.$route.params.pid;
      this.getComponentVulSummary();
      this.hasPrjRelies();
    },

    methods: {
      hasPrjRelies() {
        this.$http.get('/api/hasRely/' + this.project_id).then(response => {
          this.hasRelies = response.body.data;
        });
      },

      getComponentVulSummary() {
        this.$http.get("/api/component/" + this.task_id + "/" + this.project_id).then(response => {
          this.common_component_detail = response.data;
          this.license = response.data.official_license;
        });
      },

      //获取匹配详情
      getComponentDetail: function () {
        this.$http.get("/api/detect/match/file/" + this.common_component_detail.project_id,{
          params:
            {
              id: this.task_id,
              pageNo: this.currentPage,
              pageSize: this.page_size,
            }
        }).then(response => {
          this.file_total = response.data.totalCount;
          this.component_match = response.data.result;
        });
      },

      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        this.getComponentDetail()
      },

      handleSizeChange: function (size) {
        this.page_size = size;
        this.getComponentDetail()
      },

      getVul(vul) {
        this.vul_list = vul;
      },
      getDetail(cve_id) {
        this.cve_url = "http://cve.mitre.org/cgi-bin/cvename.cgi?name=" + cve_id;
        this.$http.get("/api/vul/cve/"+ this.task_id + '/' + cve_id).then(response => {
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
    },
    watch: {
      common_component_detail: function (val) {
        initRadar(this.componentRadar, "componentRadar", val);
      },
    }
  }

</script>
