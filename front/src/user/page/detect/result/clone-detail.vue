<template>
  <div class="row detect_page">
    <div class="col-md-12">
      <section class="content bg-style" style="padding-top: 0px;padding-bottom: 50px">
        <div class="row">
          <div class="col-md-12">
            <div class="box box-solid box-default">
              <!-- /.box-header -->
              <div class="box-body">
                <h5>
                  <b>
                    <p>&nbsp;
                      <i class="fa fa-circle-o text-red"></i>&nbsp;开源成份分析&nbsp;&nbsp;
                    </p>
                  </b>
                </h5>
                <hr>
                <p>
                  开源成份分析：通过代码级克隆、文件级克隆、原文件匹配（Hash匹配）三种检测方式，分析整个软件工程和项目主体语言的文件成份，对于克隆的文件，提供详细的克隆代码展示。</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <el-tabs type="border-card">
              <el-tab-pane label="检测语言概况">
                <div class="col-md-5">
                  <div class="box box-solid box-default">
                    <div class="box-header with-border">
                      <p>
                        <i class="fa fa-folder-open-o"></i>&nbsp;&nbsp;克隆文件检测基本信息
                      </p>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                      <br>
                      <ul class="list-group list-group-unbordered">
                        <li class="list-group-item">检测项目名称
                          <span class="pull-right">{{project_info.name}}</span>
                        </li>
                        <li class="list-group-item">检测语言
                          <el-tag class="pull-right" type="danger" size="small">
                            {{project_info.main_language}}
                          </el-tag>
                        </li>
                        <li class="list-group-item">
                          {{project_info.main_language}}语言文件数量
                          <span class="pull-right">{{project_info.valid_files + project_info.filter_files}}</span>
                        </li>
                        <li class="list-group-item">
                          有效{{project_info.main_language}}语言文件数量
                          <span class="pull-right">{{project_info.valid_files + project_info.filter_files - project_info.empty_files_main}}</span>
                        </li>
                        <li class="list-group-item">
                          {{project_info.main_language}}语言文件容量
                          <span class="pull-right">{{((project_info.valid_size + project_info.filter_size)/1024).toFixed(2)}} KB</span>
                        </li>
                        <li class="list-group-item">
                          有效{{project_info.main_language}}语言文件容量
                          <span class="pull-right">{{((project_info.valid_size + project_info.filter_size - project_info.empty_files_main_size)/1024).toFixed(2)}} KB</span>
                        </li>
                        <li class="list-group-item">
                          有效{{project_info.main_language}}语言代码行数(包含注释、空行)
                          <span class="pull-right">{{project_info.line_num}} 行</span>
                        </li>
                        <li class="list-group-item" v-show="project_info.clone_lines != null">
                          克隆总行数(包含注释、空行)
                          <span class="pull-right">{{project_info.clone_lines}} 行</span>
                        </li>
                        <li class="list-group-item" v-show="project_info.origin != null">
                          原创总行数(包含注释、空行)
                          <span class="pull-right">{{project_info.origin}} 行</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-7">
                  <div class="box box-solid box-default">
                    <div class="box-header with-border">
                      <P>
                        <i class="fa fa-clipboard margin-r-5"></i>
                        <span>克隆文件统计</span></P>
                    </div>
                    <div class="box-body">
                      <div class="col-md-12">
                        <center>
                          <p>请选择统计维度：</p>
                          <input type="radio" id="number" value="number" v-model="radio"><label for="number">&nbsp;文件数量</label>&nbsp;&nbsp;&nbsp;&nbsp;
                          <input type="radio" id="size" value="size" v-model="radio"><label for="size">&nbsp;文件容量</label>&nbsp;&nbsp;&nbsp;&nbsp;
                          <input type="radio" id="line" value="line" v-model="radio" v-show="project_info.origin != null"><label for="line" v-show="project_info.origin != null">&nbsp;文件行数</label>
                        </center>
                        <center>
                          <div class="cloneEchart" id="chartSimPie"></div>
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="软件工程概况">
                <div class="col-md-5">
                  <div class="box box-solid box-default">
                    <div class="box-header with-border">
                      <p>
                        <i class="fa fa-folder-open-o"></i>&nbsp;&nbsp;软件工程克隆基本信息
                      </p>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                      <br>
                      <ul class="list-group list-group-unbordered">
                        <!--<li class="list-group-item">检测项目名称
                          <span class="pull-right">{{project_info.name}}</span></li>
                        <li class="list-group-item">检测语言
                          <el-tag class="pull-right" type="danger" size="small">
                            {{project_info.main_language}}
                          </el-tag>
                        </li>-->
                        <li class="list-group-item">检测项目总文件数
                          <span class="pull-right">{{project_info.all_files}}</span>
                        </li>
                        <li class="list-group-item">检测项目总容量
                          <span class="pull-right">{{(project_info.all_size/1024).toFixed(2)}}KB</span>
                        </li>
                        <li class="list-group-item">
                          {{project_info.main_language}}语言克隆数量
                          <span class="pull-right">{{project_info.clone_file_files + project_info.clone_fragment_files + project_info.hash_prog_main_files}}</span>
                        </li>
                        <li class="list-group-item">其他语言克隆数量
                          <span class="pull-right">{{project_info.hash_prog_no_main_files}}</span>
                        </li>
                        <el-tooltip class="item" effect="light" :content=otherFileToolTip placement="top-start">
                          <li class="list-group-item">其他文件克隆
                            <span class="pull-right">{{project_info.hash_no_prog_files}} </span>
                          </li>
                        </el-tooltip>
                        <li class="list-group-item">
                          {{project_info.main_language}}语言原创数量
                          <span class="pull-right">{{project_info.valid_files + project_info.filter_files - (project_info.clone_file_files + project_info.clone_fragment_files + project_info.hash_prog_main_files) - project_info.empty_files_main}}</span>
                        </li>
                        <li class="list-group-item">其他语言原创数量
                          <span class="pull-right">{{project_info.program_files - project_info.valid_files - project_info.filter_files - project_info.hash_prog_no_main_files - (project_info.empty_files_prog - project_info.empty_files_main)}}</span>
                        </li>
                        <el-tooltip class="item" effect="light" :content=otherFileToolTip placement="top-start">
                          <li class="list-group-item">其他文件原创数量
                            <span class="pull-right">{{project_info.all_files - project_info.program_files - project_info.hash_no_prog_files - project_info.empty_files_no_prog - project_info.small_unjudged_files}}</span>
                          </li>
                        </el-tooltip>
                        <li class="list-group-item">总过滤文件
                          <span class="pull-right">{{project_info.empty_files}}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-7 charts">
                  <div class="box box-solid box-default">
                    <div class="box-header with-border">
                      <P>
                        <i class="fa fa-clipboard margin-r-5"></i>
                        <span>软件工程克隆文件统计</span></P>
                    </div>
                    <div class="box-body">
                      <div class="col-md-12">
                        <center>
                          <p>请选择展示类型：</p>
                          <input type="radio" id="total_clone" value="total" v-model="project_radio"><label for="total_clone">&nbsp;项目总览</label>&nbsp;&nbsp;&nbsp;&nbsp;
                          <input type="radio" id="number2" value="number" v-model="project_radio"><label for="number2">&nbsp;项目文件数量</label>&nbsp;&nbsp;&nbsp;&nbsp;
                          <input type="radio" id="size2" value="size" v-model="project_radio"><label for="size2">&nbsp;项目文件容量</label>
                        </center>
                        <center>
                          <div class="projectEchartPie" id="chartSimPieproject"></div>
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="原文件匹配">
                <!--原文件（hash）级克隆分页获取数据-->
                <el-table :data=" hashFileList" stripe>
                  <el-table-column label="序号" type="index" align="center">
                    <template slot-scope="scope">
                      {{(currentPage_hash - 1) * pageSize_hash + scope.$index +
                      1}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="check_file_name" label="克隆文件名称">
                  </el-table-column>
                  <el-table-column prop="check_path" label="克隆文件路径">
                  </el-table-column>
                  <el-table-column prop="similarity" label="相似度" align="center">
                    <template slot-scope="scope">
                      {{scope.row.similarityPercentage}}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button data-toggle="modal" data-target="#myModalHash" @click="codeCompare(scope.row)" size="mini" type="primary" icon="el-icon-view" plain></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <br>
                <center>
                  <el-pagination @current-change="handelHashPageChange" :current-page="currentPage_hash" :page-size="pageSize_hash" layout="total, prev, pager, next" :total="hash_count">
                  </el-pagination>
                </center>
              </el-tab-pane>
              <el-tab-pane label="文件级克隆">
                <!--文件级克隆分页获取数据-->
                <el-table :data=" cloneFileList" stripe>
                  <el-table-column label="序号" type="index" align="center">
                    <template slot-scope="scope">
                      {{(currentPage_file - 1) * pageSize_file + scope.$index +
                      1}}
                    </template>
                  </el-table-column>
                  <el-table-column label="克隆文件名称">
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                        <p>文件路径: {{scope.row.check_path}}</p>
                        <div slot="reference" class="name-wrapper">
                          {{ scope.row.check_file_name}}
                        </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column label="匹配文件名称">
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                        <p>文件路径: {{ scope.row.match_path}}</p>
                        <div slot="reference" class="name-wrapper">
                          {{ scope.row.match_file_name}}
                        </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column prop="similarity" label="相似度(%)" align="center">
                    <template slot-scope="scope">
                      {{scope.row.similarityPercentage}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="project_name" label="匹配开源项目" align="center">
                  </el-table-column>
                  <el-table-column prop="version_name" label="版本号" align="center">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button data-toggle="modal" data-target="#myModalFile" @click="codeCompare(scope.row)" size="mini" type="primary" icon="el-icon-view" plain></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <br>
                <center>
                  <el-pagination @current-change="handelFilePageChange" :current-page="currentPage_file" :page-size="pageSize_file" layout="total, prev, pager, next" :total="file_clone_count">
                  </el-pagination>
                </center>
              </el-tab-pane>
              <el-tab-pane label="代码级克隆">
                <el-table :data=" codeCloneList" stripe>
                  <el-table-column label="序号" type="index" align="center">
                    <template slot-scope="scope">
                      {{(currentPage_code - 1) * pageSize_code + scope.$index +
                      1}}
                    </template>
                  </el-table-column>
                  <el-table-column label="克隆文件名称">
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                        <p>文件路径: {{scope.row.check_path}}</p>
                        <div slot="reference" class="name-wrapper">
                          {{ scope.row.check_file_name}}
                        </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column label="匹配文件名称">
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                        <p>文件路径: {{ scope.row.match_path}}</p>
                        <div slot="reference" class="name-wrapper">
                          {{ scope.row.match_file_name}}
                        </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column prop="similarity" label="相似度(%)" align="center">
                    <template slot-scope="scope">
                      {{scope.row.similarityPercentage}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="project_name" label="匹配开源项目" align="center">
                  </el-table-column>
                  <el-table-column prop="version_name" label="版本号" align="center">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button data-toggle="modal" data-target="#myModalCode" @click="codeCompare(scope.row)" size="mini" type="primary" icon="el-icon-view" plain></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <br>
                <center>
                  <el-pagination @current-change="handleCurrentChangeCode" :current-page="currentPage_code" :page-size="pageSize_code" layout="total, prev, pager, next, jumper" :total="code_clone_count">
                  </el-pagination>
                </center>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

      </section>
      <!-- Modal Hash -->
      <div class="modal fade" id="myModalHash" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-code" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click=getButtonId()>
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">文件级代码克隆检测详情</h4>
            </div>
            <div class="modal-body">
              <div class="row n">
                <div class="col-md-6">
                  <p><b><a>克隆文件名称：</a></b>{{current_fileInfo.check_file_name}}
                  </p>
                  <p class="code-path"><b><a>克隆文件路径：</a></b>{{current_fileInfo.check_path}}
                  </p>
                </div>
                <div class="col-md-6">
                  <p><b><a>匹配的开源项目：</a></b>{{current_fileInfo.project_name}}</p>
                  <p><b><a>匹配的文件名称：</a></b>{{current_fileInfo.match_file_name}}
                  </p>
                  <p class="code-path"><b><a>匹配的文件路径：</a></b>{{current_fileInfo.match_path}}
                  </p>
                </div>
              </div>

              <nav id="navbar-example" class="navbar-default navbar-static" role="navigation">
                <div class="container-fluid">
                  <div class="navbar-header">
                    <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-js-navbar-scrollspy">
                      <span class="sr-only">切换导航</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" style="font-size:16px;">匹配文件代码</a>
                  </div>
                  <div class="collapse navbar-collapse bs-js-navbar-scrollspy" style="padding:0">
                    <ul class="nav navbar-nav">
                      <li v-for="(item,index) in current_fileInfo.same_fragmentList">
                        <a v-on:click="getIndex(index)" v-bind:class="{'bg-color-HEX4': buttonId==index}">代码片段{{index
                          + 1}}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div class="row n">
                <div class="col-md-6">
                  <pre class="code-body slim-bar" v-highlight>
                    <code v-html="check_fragment"></code>
                  </pre>
                </div>
                <div class="col-md-6">
                  <pre class="code-body slim-bar" v-highlight>
                    <code v-html="source_fragment"></code>
                  </pre>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click=getButtonId()>
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal文件级 -->
      <div class="modal fade" id="myModalFile" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-code" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click=getButtonId()>
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">文件级代码克隆检测详情</h4>
            </div>
            <div class="modal-body">
              <div class="row n">
                <div class="col-md-6">
                  <p><b><a>克隆文件名称：</a></b>{{current_fileInfo.check_file_name}}
                  </p>
                  <p class="code-path"><b><a>克隆文件路径：</a></b>{{current_fileInfo.check_path}}
                  </p>
                </div>
                <div class="col-md-6">
                  <p><b><a>匹配的开源项目：</a></b>{{current_fileInfo.project_name}}</p>
                  <p><b><a>匹配的文件名称：</a></b>{{current_fileInfo.match_file_name}}
                  </p>
                  <p class="code-path"><b><a>匹配的文件路径：</a></b>{{current_fileInfo.match_path}}
                  </p>
                </div>
              </div>

              <nav id="navbar-example" class="navbar-default navbar-static" role="navigation">
                <div>
                  <div class="navbar-header">
                    <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-js-navbar-scrollspy">
                      <span class="sr-only">切换导航</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" style="font-size:16px;">匹配的代码片段</a>
                  </div>
                  <div class="collapse navbar-collapse bs-js-navbar-scrollspy" style="padding:0">
                    <ul class="nav navbar-nav">
                      <li v-for="(item,index) in current_fileInfo.same_fragmentList">
                        <a v-on:click="getIndex(index)" v-bind:class="{'bg-color-HEX4': buttonId==index}">代码片段{{index
                          + 1}}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div class="row n">
                <div class="col-md-6">
                  <pre class="code-body slim-bar" v-highlight>
                    <code v-html="check_fragment"></code>
                  </pre>
                </div>
                <div class="col-md-6">
                  <pre class="code-body slim-bar" v-highlight>
                    <code v-html="source_fragment"></code>
                  </pre>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click=getButtonId()>
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal代码级 -->
      <div class="modal fade" id="myModalCode" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-code" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click=getButtonId()>
                <span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">代码级代码克隆检测详情</h4>
            </div>
            <div class="modal-body">
              <div class="row n">
                <div class="col-md-6">
                  <p><b><a>克隆文件名称：</a></b>{{current_fileInfo.check_file_name}}
                  </p>
                  <p class="code-path"><b><a>克隆文件路径：</a></b>{{current_fileInfo.check_path}}
                  </p>
                </div>
                <div class="col-md-6">
                  <p><b><a>匹配的开源项目：</a></b>{{current_fileInfo.project_name}}</p>
                  <p><b><a>匹配的文件名称：</a></b>{{current_fileInfo.match_file_name}}
                  </p>
                  <p class="code-path"><b><a>匹配的文件路径：</a></b>{{current_fileInfo.match_path}}
                  </p>
                </div>
              </div>
              <nav id="navbar-example3" class="navbar-default navbar-static" role="navigation">
                <div>
                  <div class="navbar-header">
                    <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-js-navbar-scrollspy">
                      <span class="sr-only">切换导航</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                  </div>
                  <div class="collapse navbar-collapse bs-js-navbar-scrollspy" style="padding:0">
                    <ul class="nav navbar-nav">
                      <li v-for="(item,index) in current_fileInfo.same_fragmentList">
                        <a v-on:click="getIndex(index)" v-bind:class="{'bg-color-HEX4': buttonId==index}">代码片段{{index
                          + 1}}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div class="row n">
                <div class="col-md-6">
                  <pre class="code-body slim-bar" v-highlight>
                    <code v-html="check_fragment"></code>
                  </pre>
                </div>
                <div class="col-md-6">
                  <pre class="code-body slim-bar">{{source_fragment}}</pre>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click=getButtonId()>
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import {
    initsimPie,
    initsimPiesize,
    initLinePie,
    initChartBar,
    initChartPie,
    initsimPieproject,
    initsimPiesizeproject,
    initPrjTotalClone
  } from '../../../style/js/result/chartUtil.js';

  export default {
    data() {
      return {
        task_id: '',
        currentPage_hash: 1,
        pageSize_hash: 10,
        hashFileList: [],
        hash_count: 0,

        currentPage_file: 1,
        pageSize_file: 10,
        cloneFileList: [],
        file_clone_count: 0,

        currentPage_code: 1,
        pageSize_code: 10,
        codeCloneList: [],
        code_clone_count: 0,

        //软件工程克隆
        project_info: {},
        root: [],
        components_list: [],

        chartBar: '',
        barComponent: '',

        //model
        current_file: '',
        current_path: '',
        current_code: '',
        match_file: '',
        match_path: '',
        match_code: '',
        end_line: '',
        end_line_match: '',
        start_line: '',
        start_line_match: '',
        checkStartLine: 0,
        matchStartLine: 0,

        //以下为克隆代码展示需要用到的参数
        //文件数量克隆度分析
        filesNumberOption: {},
        filesNumberPie: '',

        //文件容量克隆度分析
        capacityOption: {},
        capacityPie: '',

        match_line: [],
        match_project_name: '',
        //项目克隆详情

        values: {
          a: true,
          b: true,
          c: true,
          d: true
        },

        radio: 'number',
        project_radio: 'total',
        token: 0, //default 0 as sourcecode
        type: -1, //default -1 as non clone

        componentPie: '',

        components_list_detail: [],

        //相似项目匹配到的克隆文件详情
        chosed: [],
        //克隆文件展示
        current_fileInfo: [],

        //项目克隆详情
        name: '',
        check_fragment: "",
        source_fragment: "",
        buttonId: 0,

        //总览
        detectInfo: "",

        //提示
        otherFileToolTip: '其他文件包括：文档文件、资源文件和未识别文件',

      }
    },
    mounted: function () {
      this.task_id = this.$route.params.id;

      this.getDetectInfo();

      this.getTaskInfo();

      this.getPagedFileClone();

      this.getPagedHashClone();

      this.getPagedCodeClone();
    },

    methods: {
      getTaskInfo() {
        this.$http.get("/api/task/" + this.task_id + "/info").then(response => {
          this.project_info = response.data;
        });
      },

      getDetectInfo() {
        this.$http.get("/api/detect/" + this.task_id).then(response => {
          let resutl = response.data;
          this.detectInfo = resutl;
        });
      },

      getPagedHashClone() {
        this.$http.get("/api/clone/hash",
          {
            params:
              {
                id: this.task_id,
                pageNo: this.currentPage_hash,
                pageSize: this.pageSize_hash,
              }
          }).then(response => {
          this.hashFileList = response.data.result;
          this.hash_count = response.data.totalCount;
        });
      },

      getPagedCodeClone() {
        this.$http.get("/api/clone/code",
          {
            params:
              {
                id: this.task_id,
                pageNo: this.currentPage_code,
                pageSize: this.pageSize_code,
              }
          }).then(response => {
          this.codeCloneList = response.data.result;
          this.code_clone_count = response.data.totalCount;
        });
      },

      getPagedFileClone() {
        this.$http.get("/api/clone/file",
          {
            params:
              {
                id: this.task_id,
                pageNo: this.currentPage_file,
                pageSize: this.pageSize_file,
              }
          }).then(response => {
          this.cloneFileList = response.data.result;
          this.file_clone_count = response.data.totalCount;
        });
      },

      //文件级
      handelFilePageChange: function (currentPage) {
        this.currentPage_file = currentPage;
        this.getPagedFileClone();
      },

      //hash
      handelHashPageChange: function (currentPage) {
        this.currentPage_hash = currentPage;
        this.getPagedHashClone();
      },

      //代码级
      handleCurrentChangeCode: function (currentPage) {
        this.currentPage_code = currentPage;
        this.getPagedCodeClone();
      },

      //通过代码片段index,切换显示内容
      getIndex(term) {
        this.buttonId = term;
        this.codeCompare(this.current_fileInfo);
      },

      //关闭代码详情展示框时，将buttonId初始化为1；
      getButtonId() {
        this.buttonId = 0;
      },

      //获取相似项目的匹配文件详情
      getFile(item) {
        this.chosed = [];
        this.chosed.push(item);
      },

      //克隆文件展示页面
      codeCompare(row) {
        this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.current_fileInfo = row;

        this.checkStartLine = 1;
        this.matchStartLine = 1;
        var v = this;
        if (row.same_fragmentList == null) {
          this.$http.get("/api/clone/match/" + this.task_id,
            {
              params:
                {
                  match_type: row.match_type,
                  check_path: row.check_path,
                  match_path: row.match_path
                }
            }).then(response => {
            this.check_fragment = response.data.sourceFile;
            this.source_fragment = response.data.matchFile;
            v.loading.close();

            //this.addLineNumber();

          });
        }
        else {
          this.check_fragment = row.same_fragmentList[this.buttonId].same_fragment_content.check_fragment;
          this.source_fragment = row.same_fragmentList[this.buttonId].same_fragment_content.source_fragment;
          this.matchStartLine = row.same_fragmentList[this.buttonId].match_file_start_index;
          this.checkStartLine = row.same_fragmentList[this.buttonId].check_file_start_index;

          //this.addLineNumber();
          this.loading.close();

        }
      },

      addLineNumber() {
        var lines = this.source_fragment.split("\n")
        var codeWithLines = "";
        for (var i = 0; i < lines.length; i++) {
          codeWithLines += this.matchStartLine + " " + lines[i] + "\n";
          this.matchStartLine++;
        }
        this.source_fragment = codeWithLines;

        var checklines = this.check_fragment.split("\n")
        var checkCodeWithLines = "";

        for (var i = 0; i < checklines.length; i++) {
          checkCodeWithLines += this.checkStartLine + " " + checklines[i] + "\n"
          this.checkStartLine++;
        }
        this.check_fragment = checkCodeWithLines;
      }

    },

    watch: {
      project_info: function (val) {
        if (val == null || val.length == 0) {
          return;
        }
        initsimPie(this.chartSimPie, "chartSimPie", val, 0);
        initsimPieproject(this.chartSimPie, "chartSimPieproject", val, 0);
        initChartBar(this.componentBar, "barComponent", val);
        initPrjTotalClone(this.chartSimPie, "chartSimPieproject", this.detectInfo.file_clone_files + this.detectInfo.code_clone_files + this.detectInfo.fingerprint_clone_files, val.all_files, 0);
      },

      project_radio: function (val) {
        var vm = this;
        if (val == "number")
          initsimPieproject(vm.chartSimPie, "chartSimPieproject", vm.project_info, 0);
        else if (val == "size")
          initsimPiesizeproject(vm.chartSimPie, "chartSimPieproject", vm.project_info, 0);
        else if (val == "total")
          initPrjTotalClone(vm.chartSimPie, "chartSimPieproject", vm.detectInfo.file_clone_files + vm.detectInfo.code_clone_files + vm.detectInfo.fingerprint_clone_files, vm.project_info.all_files, 0);
      },

      radio: function (val) {
        var vm = this;
        if (val == "number") {
          initsimPie(vm.chartSimPie, "chartSimPie", vm.project_info, 0);
        }
        else if (val == "size") {
          initsimPiesize(vm.chartSimPie, "chartSimPie", vm.project_info, 0);
        }
        else if (val == "line") {
          initLinePie(this.chartSimPie, "chartSimPie", vm.project_info, 0)
        }
      },

      components_list_detail: function (val) {
        var vm = this;
        if (val.length != 0) {
          initChartPie(vm.componentPie, "chartComponent", val[0]);
        }
      }

    }
  }
</script>

<style>
  .modal {
    scroll-y: hidden;
  }

  .code-path {
    word-break: break-all;
  }

  html {width:100% }

  .cloneEchart {
    width: 55rem;
    height: 41rem;
  }

  .projectEchartPie {
    width: 59rem;
    height: 50rem;
  }
  @media only screen and (-webkit-min-device-pixel-ratio:1.5){
    .cloneEchart {
      width: 47rem;
      height: 41rem;
    }

    .projectEchartPie {
      width: 40rem;
      height: 50rem;
    }
  }
  code {
    display: block;
    padding: 12px 24px;
    font-weight: 300;
    font-family: Menlo, monospace;
    font-size: 0.8em;
  }

  code.has-numbering {
    margin-left: 21px;
  }

  .pre-numbering {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    padding: 12px 2px 12px 0;
    border-right: 1px solid #C3CCD0;
    border-radius: 3px 0 0 3px;
    background-color: #EEE;
    text-align: right;
    font-family: Menlo, monospace;
    font-size: 0.8em;
    color: #AAA;
  }

  .list-group-item {
    padding: 13px 15px;
  }

  .modal-code {
    width: 1200px
  }

  .code-body {
    height: 500px;
    width: 570px;
  }

</style>
