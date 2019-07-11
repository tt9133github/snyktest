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
                  <p>
                    <b>&nbsp;
                      <i class="fa fa-circle-o text-yellow"></i>&nbsp;项目基础信息
                      &nbsp;&nbsp;
                    </b>
                  </p>
                </h5>
                <hr>
                <p>
                  项目基础信息：统计检测项目的文件构成，包括文件种类、数量、容量、主体编程语言等；分析并展示检测项目的目录结构，形成项目基础信息，对检测项目进行总体认识。</p>
              </div>
              <!-- /.box-body --></div>
          </div>
          <div class="col-md-4">
            <div class="box box-solid box-default box-style">
              <div class="box-header with-border">
                <p>
                  <b>
                    <i class="fa fa-folder-open-o"></i>&nbsp;&nbsp;检测项目基本信息</b>
                  <!--Project details-->
                </p>
              </div>
              <!-- /.box-header -->
              <div class="box-body">
                <br>
                <ul class="list-group list-group-unbordered">
                  <li class="list-group-item">检测项目名称
                    <span class="pull-right">{{project_info.name}}</span></li>
                  <li class="list-group-item">主体语言
                    <span class="badge bg-red pull-right">{{project_info.main_language}}</span>
                  </li>
                  <li class="list-group-item">项目文件总数
                    <span class="pull-right">{{project_info.all_files}}</span>
                  </li>
                  <li class="list-group-item">项目总容量
                    <span class="pull-right">{{all_file_size}} KB</span></li>
                  <li class="list-group-item">检测项目版本
                    <span class="pull-right">{{project_info.version}}</span>
                  </li>

                  <li class="list-group-item">{{project_info.main_language}}文件总数
                    <span class="pull-right">{{project_info.valid_files + project_info.filter_files}}</span>
                  </li>
                  <li class="list-group-item">{{project_info.main_language}}总容量
                    <span class="pull-right">{{((project_info.valid_size + project_info.filter_size)/1024).toFixed(2)}}KB</span>
                  </li>
                  <li class="list-group-item">许可证
                    <span class="pull-right" v-for="item in project_info.license">
                      {{item}}&nbsp;
                    </span>
                    <span v-if="project_info.license == null || project_info.license.length == 0" class="pull-right">暂无&nbsp;</span>
                  </li>
                </ul>
              </div>
              <!-- /.box-body -->
              <!-- /.box -->
            </div>
          </div>
          <div class="col-md-8">
            <div class="box box-solid box-default box-style">
              <div class="box-header with-border">
                <p>
                  <b>
                    <i class="fa fa-folder-open-o"></i>&nbsp;&nbsp;检测项目成份分析</b>
                </p>
              </div>
              <div class="box-body">
                <center>
                  <!--<p>请选择展示类型：</p>-->
                  <input type="radio" id="number" value="number" v-model="radio"><label for="number" style="font-weight:normal">按文件数量分析</label>&nbsp;&nbsp;&nbsp;
                  <input type="radio" id="size" value="size" v-model="radio"><label for="size" style="font-weight:normal">按文件容量分析</label>
                </center>
                <center>
                  <div class="elementEchartBar" id="elementBar"></div>
                </center>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import {
    initsimPie2,
    initChartBarElement,
    initChartBarElemensize
  } from '../../../style/js/result/chartUtil.js';

  export default {
    data: function () {
      return {
        project_info: {},
        element_list: [],

        task_id: '',
        user_id: '',
        all_file_size: 0,
        language_size: 0,

        //表格中的语言成份展示
        languageList: [{
          language_ext: "",
          language: "",
          language_files: '',
          language_percent: ''
        }],

        elementBar: '',
        //检测项目目录结构根结点
        root: [],
        radio: "number",
      }
    },
    mounted: function () {
      this.task_id = this.$route.params.id;
      this.user_id = JSON.parse(localStorage.getItem('user')).id;
      if (this.user_id == null) {
        this.$router.push({path: '/login'});
      }
      this.getTaskInfo();
      this.getFileIngredient();

    },
    methods: {
      getTaskInfo() {
        this.$http.get("/api/task/" + this.task_id + "/info").then(response => {
          this.project_info = response.data;
          this.all_file_size = (this.project_info.all_size / 1024).toFixed(2);
          this.language_size = (this.project_info.main_all_size / 1024).toFixed(2);

          var others = this.project_info.all_files;
          var others_size = this.all_file_size;
          for (let i = 0; i < this.element_list.length; i++) {
            others -= this.element_list[i].files;
            others_size -= this.element_list[i].size;
          }
          others_size = (others_size).toFixed(2);
          var other_files = {
            "name": "未识别文件",
            "files": others,
            "size": others_size
          };
          this.element_list.push(other_files);

        });
      },

      getFileIngredient() {
        this.$http.get("/api/element/" + this.task_id).then(response => {
          this.element_list = response.data;
        });
      },
    },
    watch: {
      element_list: function (val) {
        initChartBarElement(this.elementBar, "elementBar", val, 0);
      },

      radio: function (val) {
        if (val == "number")
          initChartBarElement(this.elementBar, "elementBar", this.element_list, 0);
        else if (val == "size")
          initChartBarElemensize(this.elementBar, "elementBar", this.element_list, 0);
      }
    }
  }

</script>

<style>
  .box-style-side {
    overflow: auto;
    height: 710px;
  }

  .elementEchartBar {
    width: 700px;
    height: 400px;
  }
  @media only screen and (-webkit-min-device-pixel-ratio:1.5){
    .elementEchartBar {
      width: 600px;
      height: 400px;
    }
  }
  .box-style {
    height: 510px;
  }

  .box-style2 {
    height: 330px;
  }

  .list-group-item {
    padding: 13px 15px;
  }

</style>
