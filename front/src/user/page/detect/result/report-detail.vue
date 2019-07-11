<style>
  .report-style {
    padding: 20px;
    font-size: 16px;
    margin: 10px;
  }

  .border-style h4 {
    font-weight: 600;
    color: dimgrey;
  }

  .chartp4 {
    margin: 0;
    width: 600px;
    height: 700px;
  }

  .chartp6 {
    margin: 0;
    width: 500px;
    height: 400px;
  }

  .chartp7 {
    margin: 0;
    width: 500px;
    height: 400px;
  }

  .chartp8 {
    margin: 0;
    width: 500px;
    height: 400px;
  }

</style>
<template>
  <div class="row detect_page">
    <div class="col-md-12">
      <section class="content bg-style">
        <div class="row">
          <div class="col-md-12">
            <div class="box box-solid box-default">
              <!-- /.box-header -->
              <div class="box-body">
                <h5>
                  <p>
                    <b>&nbsp;
                      <i class="fa fa-circle-o text-red"></i>&nbsp;定制检测报告 &nbsp;&nbsp;
                    </b>
                  </p>
                </h5>
                <hr>
                <p>详细检测报告包含项目基础信息，克隆文件检测，开源项目溯源检测，项目许可证检测，安全风险检测等。</p>
                <p style="color: red">因Microsoft
                  Office版本原因，生成报告后，打开时若出现提示，请选择“确定”和“是”。</p>
              </div>
              <!-- /.box-body --></div>


          </div>
          <div class="col-md-12">
            <div class="box box-solid box-default">
              <div class="box-header with-border">
                <p>
                  <b>
                    <i class="fa fa-cloud-download"></i>&nbsp;&nbsp;详细报告下载</b>&nbsp;&nbsp;&nbsp;&nbsp;Report
                </p>
              </div>
              <div class="box-footer">
                <button type="button" @click="download" class="btn btn-primary" style="margin: 10px">
                 生成检测报告 <i class="fa fa-arrow-circle-down"></i>
                </button>
                <button type="button" @click="download1" class="btn btn-primary" style="margin: 10px">
                  溯源项目清单 <i class="fa fa-arrow-circle-down"></i>
                </button>
                <button type="button" @click="download2" class="btn btn-primary" style="margin: 10px">
                  克隆文件清单 <i class="fa fa-arrow-circle-down"></i>
                </button>
                <button type="button" @click="download3" class="btn btn-primary" style="margin: 10px">
                  开源漏洞清单 <i class="fa fa-arrow-circle-down"></i>
                </button>
                <button type="button" @click="download4" class="btn btn-primary" style="margin: 10px">
                  开源许可证清单 <i class="fa fa-arrow-circle-down"></i>
                </button>
                <button type="button" @click="download5" class="btn btn-primary" style="margin: 10px">
                  Fortify检测清单 <i class="fa fa-arrow-circle-down"></i>
                </button>
              </div>
            </div>
            <!-- /.box -->
          </div>
        </div>
        <!--row-->
        <div style="height:240px;"></div>
        <div>
          <!--report图片内容需要进行base64转换，图形在这里-->
          <center>
            <div class="chartp4" id="cloneSimPie" v-show="false"></div>
          </center>
          <center>
            <div class="chartp4" id="cloneSimSizePie" v-show="false"></div>
          </center>
          <center>
            <div class="chartp4" id="cloneSimLinePie" v-show="false"></div>
          </center>
          <center>
            <div class="chartp4" id="projectPie" v-show="false"></div>
          </center>
          <center>
            <div class="chartp4" id="projectSizePie" v-show="false"></div>
          </center>
          <center>
            <div class="chartp6" id="comNumBarReport" v-show="false"></div>
          </center>
          <center>
            <div class="chartp6" id="licenseBarReport" v-show="false"></div>
          </center>
          <center>
            <div class="chartp7" id="licenseOpenBarReport" v-show="false"></div>
          </center>
          <center>
            <div class="chartp8" id="vulBarCloneReport" v-show="false"></div>
          </center>

        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import {
    initChartBarElemensize,
    initsimPie,
    initsimPiesize,
    initLinePie,
    initsimPieproject,
    initsimPiesizeproject,
    initChartBarLib,
    initLicenseBar,
    initVulBar,
    initLicenseBusiBar
  } from '../../../style/js/result/chartUtil.js';

  export default {
    data() {
      return {
        task_id: '',
        values: {
          a: true,
          b: true,
          c: true,
          d: true
        },

        //报告名称单位设置
        reportName: '检测报告',
        hasExcel: false,
        hasWord: true,
        ready: true,
        reportUnit: '',
        nameStatus: 0,
        unitStatus: 0,
        projectStatus: 0,

        task_id: '',
        user_id: '',
        //项目自身详情
        project_info: [],
        element_list: [],
        table_element_list: [],
        //项目语言成份图
        elementBar: '',
        elementBarSize: '',
        //克隆详情
        clone: [],
        cloneSimPie: '',
        cloneSimSizePie: '',
        cloneSimLinePie: '',
        projectPie: '',
        projectSizePie: '',
        cloneSimLinePie: '',
        //克隆溯源项目列表
        project_list: [],
        table_project: [],
        //组件检测
        componentComNumBar: '',
        common_component_info: [],
        //组件详细列表
        common_component_list: [],
        table_component: [],

        //根据项目成份检测出的license详情列表
        component_license_list: [],
        component_license_detail: [],
        component_license_location: [],
        component_license_conflict: [],
        //组件包含的许可证统计表格
        table_component_license: [],
        //组件包含的许可证定位信息表格
        table_component_license_location: [],
        table_component_license_conflict: [],
        //组件包含的许可证柱状图
        licenseBar: '',
        //开源项目包含的许可证柱状图
        componentlicense: "",
        licenseOpenBar: '',
        licenseBusiBar: '',
        //根据项目成份检测出的license详情列表
        opensource_license_list: [],
        opensource_license_detail: [],
        opensource_license_location: [],
        opensource_license_conflict: [],
        //开源项目包含的许可证统计表格
        table_opensource_license: [],
        //开源项目包含的许可证定位信息表格
        table_opensource_license_location: [],
        table_opensource_license_conflict: [],
        //安全漏洞检测
        cve_vul_list: [],
        table_vul: [],
        vul_level: [],
        vulBarClone: '',
        //恶意代码
        webshell: [],
        APT: [],
        hacker: [],
        bugUsing: [],
        other: [],
        table_trojan: [],
        //敏感行为
        sensitive_behavior_list: [],
        table_behavior: [],
        //加密算法详情表单
        encryption_list: [],
        table_encryption: [],
        //代码缺陷
        error_list: [],
        table_code_error: [],

        token: 0, //default 0 as sourcecode
        type: -1, //default -1 as non clone

      }
    },

    mounted: function () {
      this.task_id = this.$route.params.id;
      this.user_id = JSON.parse(localStorage.getItem('user')).id;
      //项目自身详情
      this.getTaskInfo();
      this.getFileIngredient();
      this.getLicenseCompatibility();
      //this.getComponentVulSummary();
      this.getLicenseCommercial();
    },

    methods: {

      getTaskInfo() {
        this.$http.get("/api/task/" + this.task_id + "/info").then(response => {
          this.clone = response.data;
        });
      },

      getFileIngredient() {
        this.$http.get("/api/element/" + this.task_id).then(response => {
          this.element_list = response.data;
        });
      },

      getLicenseCompatibility() {
        this.$http.get("/api/license/compatibility/" + this.task_id).then(response => {
          this.licenseBar = initLicenseBar(this.licenseBar, "licenseBarReport", response.data);
        });
      },

      getLicenseCommercial() {
        this.$http.get("/api/license/commercial/" + this.task_id).then(response => {
          this.componentlicense = response.data;
          this.licenseBusiBar = initLicenseBusiBar(this.licenseBusiBar, "licenseOpenBarReport", this.componentlicense);
        });
      },

      getComponentVulSummary() {
        this.$http.get("/api/component/vul/" + this.task_id).then(response => {
          this.common_component_info = response.data;
        });
      },

      download() {
        this.$notify({
          title: '提示',
          message: '正在生成报告...',
          type: 'success',
          customClass: 'ljqc-message'
        });
        var vue = this;
        setTimeout(function()  {
          vue.generateReport()
        },2000);
      },

      generateReport() {
        var picInfo1 = this.cloneSimPie.getDataURL('image/png');
        var picInfo2 = this.cloneSimSizePie.getDataURL('image/png');
        var picInfo3 = this.cloneSimLinePie.getDataURL('image/png');

        var picInfo4 = this.projectPie.getDataURL('image/png');
        var picInfo5 = this.projectSizePie.getDataURL('image/png');

        var picInfo6 = this.licenseBar.getDataURL('image/png');
        //许可证BAR
        var picInfo7 = this.licenseBusiBar.getDataURL('image/png');

        this.$http.post('/api/report',
          {
            taskId: this.task_id,
            num_language_img: picInfo1,
            size_language_img: picInfo2,
            lines_language_img: picInfo3,
            num_all_img: picInfo4,
            size_all_img: picInfo5,
            license_confict_img: picInfo6,
            license_business_img: picInfo7,
          },
          {emulateJSON: true}).then(response => {
          let target = response.data.msg;
          let fileName = this.reportName+this.task_id;
          window.location.href = "/api/download/" + fileName + "/" + target;
        })
      },

      /**
       * 下载excel
       */
      download1(){
        this.$notify({
          title: '提示',
          message: '正在生成溯源清单...',
          type: 'success',
          customClass: 'ljqc-message'
        });
        this.$http.get('/api/report/excel',{
          params:
            {
              taskId:this.task_id,
              type:1,
            }
        }).then(response => {
          window.location.href = "/api/report/excel?taskId=" + this.task_id + "&type=1";
          this.ready = false;
        });
      },

      download2(){
        this.$notify({
          title: '提示',
          message: '正在生成克隆文件清单...',
          type: 'success',
          customClass: 'ljqc-message'
        });
        this.$http.get('/api/report/excel',{
          params:
            {
              taskId:this.task_id,
              type:2,
            }
        }).then(response => {
          window.location.href = "/api/report/excel?taskId=" + this.task_id + "&type=2";
          this.ready = false;
        });
      },

      download3(){
        this.$notify({
          title: '提示',
          message: '正在生成开源漏洞清单...',
          type: 'success',
          customClass: 'ljqc-message'
        });
        this.$http.get('/api/report/excel',{
          params:
            {
              taskId:this.task_id,
              type:3,
            }
        }).then(response => {
          window.location.href = "/api/report/excel?taskId=" + this.task_id + "&type=3";
          this.ready = false;
        });
      },

      download4(){
        this.$notify({
          title: '提示',
          message: '正在生成开源许可证清单...',
          type: 'success',
          customClass: 'ljqc-message'
        });
        this.$http.get('/api/report/excel',{
          params:
            {
              taskId:this.task_id,
              type:4,
            }
        }).then(response => {
          window.location.href = "/api/report/excel?taskId=" + this.task_id + "&type=4";
          this.ready = false;
        });
      },

      download5(){
        this.$notify({
          title: '提示',
          message: '正在生成Fortify清单...',
          type: 'success',
          customClass: 'ljqc-message'
        });
        this.$http.get('/api/report/excel',{
          params:
            {
              taskId:this.task_id,
              type:5,
            }
        }).then(response => {
          window.location.href = "/api/report/excel?taskId=" + this.task_id + "&type=5";
          this.ready = false;
        });
      },

      getExcel() {
        window.setInterval(function () {
          if(this.ready)
          {
            window.location.href = "/api/report/excel?taskId=" + this.task_id + "&type=1";
            this.ready = false;
          }
        },1000)
      },

      reportInfo() {
        var vm = this;
        if (vm.reportName == "" && vm.reportUnit == "") {
          vm.nameStatus = 1;
          vm.unitStatus = 1;
        } else if (vm.reportName == "" && vm.reportUnit !== "") {
          vm.unitStatus = 0;
          vm.nameStatus = 1;
        } else if (vm.reportUnit == "" && vm.reportName !== "") {
          vm.unitStatus = 1;
          vm.nameStatus = 0;
        } else {
          vm.nameStatus = 0;
          vm.unitStatus = 0;
          vm.projectStatus = 1;
        }
      },

    },

    watch: {
      element_list(val) {
        var vm = this;
        vm.table_element_list = new Array();
        var a0 = [{
          text: '序号',
          style: 'tableHeader'
        }, {
          text: '检测语言',
          style: 'tableHeader'
        }, {
          text: '文件数量',
          style: 'tableHeader'
        }, {
          text: '文件容量(KB)',
          style: 'tableHeader'
        },];
        vm.table_element_list[0] = a0;
        console.log("vm.table_element_list[0]" + vm.table_element_list[0]);
        if (val.length != 0) {
          //vm.elementBar = initChartBarElement(vm.elementBar, "elementBarReport", val, 1);
          //vm.elementBarSize = initChartBarElemensize(vm.elementBarSize, "elementBarSize", val, 1);
          initChartBarElemensize(vm.elementBarSize, "elementBarSize", vm.element_list);
          for (var i = 0; i < val.length; i++) {
            var d0 = i + 1 + " ";
            var d0 = i + 1 + " ";
            var d1 = val[i].name + " ";
            var d2 = val[i].files + " ";
            var d3 = val[i].size + " ";
            var b0 = [d0, d1, d2, d3,];

            vm.table_element_list[i + 1] = b0;
          }
          ;
        }
      },

      clone(val) {
        this.cloneSimPie = initsimPie(this.cloneSimPie, "cloneSimPie", val, 1);
        this.cloneSimSizePie = initsimPiesize(this.cloneSimSizePie, "cloneSimSizePie", val, 1);
        this.cloneSimLinePie = initLinePie(this.cloneSimLinePie, "cloneSimLinePie", val, 1);

        this.projectPie = initsimPieproject(this.projectPie, "projectPie", val, 1);
        this.projectSizePie = initsimPiesizeproject(this.projectSizePie, "projectSizePie", val, 1);
      },

      project_list(val) {
        var vm = this;
        vm.table_project = new Array();
        var a0 = [{
          text: '序号',
          style: 'tableHeader'
        }, {
          text: '项目名称',
          style: 'tableHeader'
        }, {
          text: '总数量',
          style: 'tableHeader'

        }, {
          text: '总容量',
          style: 'tableHeader'
        }, {
          text: '溯源文件数量',
          style: 'tableHeader'
        },
          {
            text: '溯源文件容量',
            style: 'tableHeader'
          }
        ];
        vm.table_project[0] = a0;
        if (val == 0) {
          for (var i = 0; i < val.length; i++) {
            var d0 = i + 1;
            var d1 = val[i].project_name + " ";
            var d2 = val[i].all_files + " ";
            var d3 = val[i].all_size + "KB" + " ";
            var d4 = val[i].match_number + " ";
            var d5 = val[i].match_size + "KB" + " ";
            var b0 = [d0, d1, d2, d3, d4, d5];

            vm.table_project[i + 1] = b0;
          }
        } else {
          vm.table_project[1] = ['1', '无结果', '无结果', '无结果', '无结果', '无结果',];
        }
      },

      common_component_info(val) {
        var vm = this;
        vm.table_component = new Array();
        var a0 = [{
          text: '序号',
          style: 'tableHeader'
        }, {
          text: '开源项目溯源名称',
          style: 'tableHeader'
        }, {
          text: '文件总数',
          style: 'tableHeader'
        }, {
          text: '文件匹配数',
          style: 'tableHeader'
        },
          {
            text: '文件利用率',
            style: 'tableHeader'
          },
          {
            text: '低危漏洞',
            style: 'tableHeader'
          },
          {
            text: '中危漏洞',
            style: 'tableHeader'
          },
          {
            text: '高危漏洞',
            style: 'tableHeader'
          },
          {
            text: '未评级漏洞',
            style: 'tableHeader'
          }
        ];
        vm.table_component[0] = a0;

        vm.common_component_list = val.component_list;
        vm.componentComNumBar = initChartBarLib(vm.componentComNumBar, "comNumBarReport", val, 1);
        if (vm.common_component_list != null) {
          for (var i = 0; i < vm.common_component_list.length; i++) {
            var d0 = i + 1 + " ";
            var d1 = vm.common_component_list[i].component_name + " ";
            var d2 = vm.common_component_list[i].valid_files + " ";
            var d3 = vm.common_component_list[i].clone_files + " ";
            var d4 = (vm.common_component_list[i].files_use_percent * 100).toFixed(2) + " ";
            var d5 = vm.common_component_list[i].vul_low_num + " ";
            var d6 = vm.common_component_list[i].vul_mid_num + " ";
            var d7 = vm.common_component_list[i].vul_high_num + " ";
            var d8 = vm.common_component_list[i].vul_unknown + " ";
            var b0 = [d0, d1, d2, d3, d4, d5, d6, d7, d8];
            //  console.log("i"+i);
            vm.table_component[i + 1] = b0;
          }
        } else {
          vm.table_component[1] = ['1', '无结果', '无结果', '无结果', '无结果', '无结果', '无结果', '无结果', '无结果',];
        }
      },

      component_license_detail(val) {
        var vm = this;

        vm.table_component_license = new Array();
        var a0 = [{
          text: '序号',
          style: 'tableHeader'
        }, {
          text: '许可证名称',
          style: 'tableHeader'
        }, {
          text: '类型',
          style: 'tableHeader'
        }, {
          text: '冲突情况',
          style: 'tableHeader'
        },
          {
            text: '商用性',
            style: 'tableHeader'
          },
        ];
        vm.table_component_license[0] = a0;
        if (val.length != 0) {
          for (var i = 0; i < val.length; i++) {
            var d0 = i + 1 + " ";
            var d1 = val[i].license + " ";
            var d2 = val[i].self_type + " ";
            if (val[i].conflict == 0) {
              var d3 = "兼容" + " ";
            } else if (val[i].conflict == 1) {
              var d3 = "条件兼容" + " ";
            } else if (val[i].conflict == 2) {
              var d3 = "不兼容" + " ";
            }
            ;
            if (val[i].type == 0) {
              var d4 = "商用未知" + " ";
            } else if (val[i].type == 1) {
              var d4 = "商用友好" + " ";
            } else if (val[i].type == 2) {
              var d4 = "商用不友好" + " ";
            }
            ;

            var b0 = [d0, d1, d2, d3, d4,];
            vm.table_component_license[i + 1] = b0;
          }
        } else {
          vm.table_component_license[1] = ['1', '无结果', '无结果', '无结果', '无结果',]
        }
      },

      component_license_location(val) {
        var vm = this;

        var a0 = [{
          text: '序号',
          style: 'tableHeader'
        }, {
          text: '许可证名称',
          style: 'tableHeader'
        }, {
          text: '许可证来源组件',
          style: 'tableHeader'
        }, {
          text: '许可证定位文件',
          style: 'tableHeader'
        },
          {
            text: '开源组件链接',
            style: 'tableHeader'
          },
        ];
        vm.table_component_license_location = new Array();
        vm.table_component_license_location[0] = a0;
        //console.log("val[i]" + val[0].project_name);
        if (val.length != 0) {
          for (var i = 0; i < val.length; i++) {
            var d0 = i + 1;
            var d1 = val[i].license + " ";
            var d2 = val[i].project_name + " ";
            var d3 = val[i].location + " ";
            var d4 = val[i].url + " ";
            var b0 = [d0, d1, d2, d3, d4];

            vm.table_component_license_location[i + 1] = b0;
          }
          ;
        } else {
          vm.table_component_license_location[1] = ['1', '无结果', '无结果', '无结果', '无结果',]
        }
      },

      component_license_conflict(val) {
        var vm = this;
        var a0 = [{
          text: '序号',
          style: 'tableHeader'
        }, {
          text: '许可证名称',
          style: 'tableHeader'
        }, {
          text: '冲突的许可证名称',
          style: 'tableHeader'
        }, {
          text: '冲突的许可证官网链接',
          style: 'tableHeader'
        },];
        vm.table_component_license_conflict = new Array();
        vm.table_component_license_conflict[0] = a0;
        if (val.length != 0) {
          console.log("val[i]" + val[0].project_name);
          for (var i = 0; i < val.length; i++) {
            var d0 = i + 1;
            var d1 = val[i].license + " ";
            var d2 = val[i].name + " ";
            var d3 = val[i].link + " ";
            var b0 = [d0, d1, d2, d3];

            vm.table_component_license_conflict[i + 1] = b0;
          }
          ;
          //console.log("vm.table_opensource_license_location:" + vm.table_opensource_license_location[2]);

        } else {
          vm.table_component_license_conflict[1] = ['1', '无结果', '无结果', '无结果',];
        }
      },

      vul_level(val) {
        var vm = this;
        if (val.length != 0) {
          initVulBar(vm.vulBarClone, "vulBarCloneReport", val[0]);
        }
      },

      cve_vul_list(val) {
        var vm = this;
        vm.table_vul = new Array();

        var a0 = [{
          text: '序号',
          style: 'tableHeader'
        }, {
          text: '漏洞编号',
          style: 'tableHeader'
        }, {
          text: '漏洞评分',
          style: 'tableHeader'
        }, {
          text: '危害等级',
          style: 'tableHeader'
        }, {
          text: '漏洞来源',
          style: 'tableHeader'
        },];
        vm.table_vul[0] = a0;
        console.log(" vm.table_vul[0]" + vm.table_vul[0])
        if (val.length != 0) {
          for (var i = 0; i < val.length; i++) {
            var d0 = i + 1 + " ";
            var d1 = val[i].cve_id + " ";
            var d2 = val[i].level + " ";
            var d3 = val[i].severity + " ";
            var d4 = val[i].component_list[0].component_name + " ";
            var b0 = [d0, d1, d2, d3, d4];
            vm.table_vul[i + 1] = b0;
          }
          ;
        } else {
          vm.table_vul[1] = ['1', '无结果', '无结果', '无结果', '无结果',];
        }
        console.log(" vm.table_vul[1]" + vm.table_vul[1])
      },

      sensitive_behavior_list(val) {
        var vm = this;
        vm.table_behavior = new Array();
        var a0 = [{
          text: '序号',
          style: 'tableHeader'
        }, {
          text: '敏感行为名称',
          style: 'tableHeader'
        }, {
          text: '风险等级',
          style: 'tableHeader'
        }, {
          text: '检测项目是否包含敏感行为',
          style: 'tableHeader'
        },];
        vm.table_behavior[0] = a0;
        if (val.length != 0) {
          for (var i = 0; i < val.length; i++) {
            var d0 = i + 1 + " ";
            var d1 = val[i].behavior_name + " ";
            if (val[i].level = 1) {
              var d2 = "高风险" + " ";
              var d2 = "高风险" + " ";
            } else if (val[i].level = 2) {
              var d2 = "中风险" + " ";
            } else {
              var d2 = "低风险" + " ";
            }
            ;
            if (val[i].result == 0) {
              var d3 = "无敏感行为" + " ";
            } else {
              var d3 = "包含敏感行为" + " ";
            }
            ;
            var b0 = [d0, d1, d2, d3];
            vm.table_behavior[i + 1] = b0;
          }
          ;
        } else {
          vm.table_behavior[1] = ['1', '无结果', '无结果', '无结果',];
        }
        console.log("vm.table_behavior[1]" + vm.table_behavior[1])
      },

      encryption_list(val) {
        var vm = this;
        vm.table_encryption = new Array();

        var a0 = [{
          text: '序号',
          style: 'tableHeader'
        }, {
          text: '加密算法',
          style: 'tableHeader'
        }, {
          text: '类型',
          style: 'tableHeader'
        }, {
          text: '来源',
          style: 'tableHeader'
        }, {
          text: '是否包含',
          style: 'tableHeader'
        },];
        vm.table_encryption[0] = a0;
        if (val.length != 0) {
          for (var i = 0; i < val.length; i++) {
            var d0 = i + 1 + " ";
            var d1 = val[i].encryption_name + " ";
            var d2 = val[i].encryption_type + " ";
            var d3 = val[i].resources + " ";
            if (val[i].result == 0) {
              var d4 = "未包含" + " ";
            } else {
              var d4 = "包含" + " ";
            }
            ;
            var b0 = [d0, d1, d2, d3, d4];
            vm.table_encryption[i + 1] = b0;
          }
          ;
        } else {
          vm.table_encryption[1] = ['1', '无结果', '无结果', '无结果', '无结果',];
        }
        console.log(" vm.table_encryption[1]" + vm.table_encryption[1])
      },

      project_info(val) {
        var vm = this;
        var newDate = new Date();

        //将任务创建时间转换成当地时间，格式为：2014年6月18日 上午10:33:24
        newDate.setTime(val.create_time);
        var local_create_time = newDate.toLocaleString();
        vm.create_time = local_create_time;

        //将任务结束时间转化为当地时间
        newDate.setTime(val.finish_time);
        var local_finish_time = newDate.toLocaleString();
        vm.finish_time = local_finish_time;

        vm.token = val.token;
        vm.type = val.type;
        //判断是否是指纹检测
        if (vm.token == 1) {
          vm.riskStatus = "未检测";
          //判断是否是文件级检测
          if (vm.type == 0) {
            vm.codeCloneStatus = "未检测";
          } else {
            if (vm.type == -1) {
              //如果不检测克隆,克隆相关的检测项关闭，包含开源许可证检测
              vm.cloneStatus = "未检测";
              vm.codeCloneStatus = "未检测";
              vm.fileCloneStatus = "未检测";
              vm.sourceLicenseStatus = "未检测";
            } else if (vm.type == 0) {
              //如果不检测克隆,克隆相关的检测项关闭，包含开源许可证检测
              vm.codeCloneStatus = "未检测";
            }
          }
        } else {
          //判断是否是文件级检测
          if (vm.type == 0) {
            vm.codeCloneStatus = "未检测";
          } else {
            if (vm.type == -1) {
              //如果不检测克隆,克隆相关的检测项关闭，包含开源许可证检测
              vm.cloneStatus = "未检测";
              vm.codeCloneStatus = "未检测";
              vm.fileCloneStatus = "未检测";
              vm.sourceLicenseStatus = "未检测";
            } else if (vm.type == 0) {
              //如果不检测克隆,克隆相关的检测项关闭，包含开源许可证检测
              vm.codeCloneStatus = "未检测";
            }
          }
        }
      }
    }
  }

</script>
