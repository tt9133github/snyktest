<template>
  <div>
    <div class="result_file">

      <el-row :gutter="20">
        <el-col :span="6">
          <h4>
            <i class="fa fa-folder-open-o "></i>
            {{pname}}/{{version}}
          </h4>
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <div class="file_tree white">
            <el-tree ref="tree" :data="data" :props="defaultProps" node-key="key" :default-expand-all="false" :filter-node-method="filterNode"
                     @node-click="handleNodeClick" :default-expanded-keys="defaultExpand" :default-checked-keys="defaultExpand" :highlight-current="true"></el-tree>
          </div>
        </el-col>

        <el-col :span="18">

          <h4>源代码
            <i class="glyphicon glyphicon-saved"></i></h4>

          <div class="panel panel-default" style="height: 700px;" v-if="file.content !== ''">

            <pre style="height: 100%;padding: 0px" v-highlight>
                <code v-html="file.content"></code>
            </pre>

            <div v-if="file.volume != null">
              <div class="pull-right">
                <div class="form-group row">
                  文件大小：{{(file.volume/1024).toFixed(1) }}kb
                </div>
              </div>
            </div>
          </div>

          <div class="center-vertical" v-else>
            <el-col :span="16" :offset="8">
              <h4 style="padding-top: 200px;color: grey"><b>1.单击文件展示代码</b></h4>
            </el-col>
            <el-col :span="16" :offset="8">
              <h4 style="padding-top: 20px;color: grey"><b>2.暂不支持文档类文件浏览</b>
              </h4></el-col>
            <el-col :span="16" :offset="8">
              <h4 style="padding-top: 20px;color: grey"><b>3.输入关键字可搜索文件</b></h4>
            </el-col>
            <el-col :span="16" :offset="8">
              <h4 style="padding-top: 20px;color: grey"><b>4.支持语言类型：[C, Java,
                C++, PHP] </b></h4>
            </el-col>
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

    name: "result_file",

    data() {
      return {
        pname: "",
        version: "",
        id: "",
        defaultExpand: [],
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        file: {},
        filterText: '',
        currentFile: null,
      }
    },

    methods: {
      filterNode(value, data) {
        if (!value || data == null) return true;
        return data.label.indexOf(value) !== -1;
      },

      getFileStructure() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.$http.get('/es/tree/' + this.id + "?fid=" + this.currentFile).then(response => {
          this.data.push(response.data);

          this.defaultExpand.push(0);
          //this.$refs.tree.setCurrentKey(0);

            this.$nextTick(() => {
              this.$refs.tree.setCurrentKey(0);
            });

          this.getFileContent(this.currentFile);
        })

        loading.close();
      },

      getFileContent(id) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.$http.get('/es/file/' + id).then(response => {
          loading.close();
          this.file = response.data
        }, (response) => {
          // error callback
          this.$alert('搜索发生错误！', {
            confirmButtonText: '确定',
          });
          loading.close();
        });
      },

      handleNodeClick(data) {
        if (data == null) {
          return;
        }
        if (data.id != null && data.id != "") {
          this.getFileContent(data.id);
        }
      }
    },

    mounted: function () {
      this.currentFile = this.$route.query.fid;
      this.id = this.$route.query.pid;
      this.pname = this.$route.query.pname;
      this.version = this.$route.query.v;

      this.getFileStructure();
    },

    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
  }

</script>

<style scoped>
  panel {
    height: 800px;
  }

  .content-header {
    padding: 10px;
  }

  .result_file {
    padding-right: 50px;
  }

  .file_tree {
    overflow-y: auto;
    overflow-x: auto;
    height: 652px;
    margin-top: 10px;
    border-radius: 3px;
    border: 1px solid #C3CCD0;
  }

  ::-webkit-scrollbar { /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  ::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    height: 50px;
    background-color: #999;
    -webkit-border-radius: 4px;
    outline: 2px solid #EDEDED;
    outline-offset: -2px;
  }

  ::-webkit-scrollbar-track { /*滚动条里面轨道*/
    background-color: #EDEDED; /*滚动条的背景颜色*/
    -webkit-border-radius: 0; /*滚动条的圆角宽度*/
  }

  .center-vertical {
    position: relative;
    top: 20%;
  }
</style>
