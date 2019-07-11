<template>
  <div>
    <div class="detect">
      <section class="content-header">
        <el-tabs style="height: 50px;width: 100%;overflow-x: auto;overflow-y: hidden" @tab-click="changeView">
          <el-tab-pane label="检测结果概览" value="Clone"></el-tab-pane>
          <el-tab-pane label="项目基础信息" value="Task_Info"></el-tab-pane>
          <el-tab-pane label="开源成份分析" value="Clone_Detail"></el-tab-pane>
          <el-tab-pane label="开源项目溯源" value="Source_Prj"></el-tab-pane>
          <!--<el-tab-pane label="溯源推荐" value="Prj_Advice"></el-tab-pane>-->
          <el-tab-pane label="许可证检测" value="Prj_License"></el-tab-pane>
          <el-tab-pane label="安全漏洞检测" value="Security"></el-tab-pane>
          <el-tab-pane label="恶意代码检测" value="Trojan"></el-tab-pane>
          <el-tab-pane label="加密算法检测" value="Encryption"></el-tab-pane>
          <el-tab-pane label="敏感行为检测" value="Sensitive"></el-tab-pane>
          <el-tab-pane label="Fortify" value="Fortify" id="Fortify"></el-tab-pane>
          <el-tab-pane label="检测报告" value="Report" id="Report"></el-tab-pane>
        </el-tabs>
      </section>
      <section class="content bg-grey">
        <component :is="view" @goPage="goPage"></component>
      </section>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '../../components/Footer';
  import Clone from './result/clone-summary';
  import Task_Info from './result/task-info';
  import Clone_Detail from './result/clone-detail';
  import Source_Prj from './result/common-component';
  import Prj_Advice from './result/trace-detail';
  import Prj_License from './result/license-detail';
  import Security from './result/vulnerability';
  import Trojan from './result/trojan-risk';
  import Encryption from './result/protocol-encryption';
  import Sensitive from './result/sensitive-risk';
  import Report from './result/report-detail';
  import Fortify from './result/fortify';


  export default {
    data() {
      return {
        view: Clone
      }
    },

    components: {
      Footer,
      Clone,
      Task_Info,
      Clone_Detail,
      Source_Prj,
      Prj_Advice,
      Prj_License,
      Security,
      Trojan,
      Encryption,
      Sensitive,
      Report,
      Fortify,
    },

    mounted: function () {
    },

    methods: {
      changeView(tab, event) {
        this.view = tab.$attrs.value;
      },

      goPage(tab) {
        $(tab).click();
        //this.view = page;
      }
    },
  }

</script>
<style>

  .bg-grey {
    background-color: #fbfbfb;
  }

  .el-tabs__item {
    font-size: 15px;
    font-weight: 500;
  }
  @media only screen and (-webkit-min-device-pixel-ratio:1.5){
    .el-tabs__item {
        font-size: 1.1rem;
        font-weight: 500;
    }
  }
</style>
