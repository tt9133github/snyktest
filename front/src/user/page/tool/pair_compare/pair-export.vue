<template>
  <div class="row detect_page">
    <div class="col-md-12">
      <section class="content bg-style">
        <div class="row">
          <div class="col-md-12">
            <div class="box box-solid box-default">
              <div class="box-header with-border">
                <p>
                  <b>
                    <i class="fa fa-cloud-download"></i>&nbsp;&nbsp;克隆清单导出</b>&nbsp;&nbsp;&nbsp;&nbsp;Report
                </p>
              </div>
              <div class="box-footer">
                <button type="button" @click="download2" class="btn btn-primary" style="margin: 10px">
                  克隆文件清单 <i class="fa fa-arrow-circle-down"></i>
                </button>
              </div>
            </div>
            <!-- /.box -->
          </div>
        </div>
        <!--row-->
      </section>
    </div>
  </div>
</template>
<script>
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
    },

    methods: {
      download2(){
        this.$notify({
          title: '提示',
          message: '正在生成克隆文件清单...',
          type: 'success',
          customClass: 'ljqc-message'
        });
          window.location.href = "/api/report/excel?taskId=" + this.task_id + "&type=6";
          this.ready = false;
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
      }
    }
  }

</script>
