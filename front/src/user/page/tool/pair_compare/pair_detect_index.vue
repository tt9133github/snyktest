<template>
  <div>
    <div class="detect">
      <section class="content-header">
        <el-tabs style="height: 50px;" @tab-click="changeView">
          <el-tab-pane label="项目基础信息" value="Elements"></el-tab-pane>
          <el-tab-pane label="开源成份分析" value="Clone"></el-tab-pane>
          <el-tab-pane label="清单导出" value="Export"></el-tab-pane>
        </el-tabs>
      </section>
      <section class="content bg-grey">
        <component :is="view" @goPage="goPage"></component>
      </section>
    </div>
  </div>
</template>

<script>
  import Elements from './pair_elements';
  import Clone from './pair_clone';
  import Export from './pair-export';


  export default {
    data() {
      return {
        view: Elements
      }
    },

    components: {
      Elements,
      Clone,
      Export
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

</style>
