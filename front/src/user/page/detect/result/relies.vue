<template>

  <div class="wrapper rely">
    <Header></Header>
    <section class="content-header">
      <el-col :span="8">
        <h4>项目依赖</h4>
        <el-col :span="16">
          <el-tree
            :props="props1"
            :load="loadNode1"
            :highlight-current="true"
            @node-click="handleNodeClick"
            :default-expanded-keys="check"
            lazy>
          </el-tree>
        </el-col>
      </el-col>
      <el-col :span="16">
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="row">
              <div class="col-md-12">
                <div class="box box-primary">
                  <div class="box-header with-border">
                    <p>
                      <b>
                        <i class="fa fa-folder-open-o"></i>&nbsp;&nbsp;依赖详情</b>&nbsp;&nbsp;&nbsp;&nbsp;Component
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
                          <span class="badge bg-red pull-right">{{prj.project_name}}</span>
                        </li>
                        <li class="list-group-item">类型
                          <span class="pull-right">{{prj.is_library == 1 ? "库" : "非库"}}</span>
                        </li>
                        <li class="list-group-item">官方网址
                          <a class="pull-right" :href="prj.homepage" target="_blank">{{prj.homepage}}</a>
                        </li>
                        <li class="list-group-item">来源网址
                          <a class="pull-right" :href="prj.project_url" target="_blank">{{prj.project_url}}</a>
                        </li>

                      </ul>
                    </div>
                    <div class="col-md-6">
                      <ul class="list-group list-group-unbordered">
                        <li class="list-group-item">项目热度
                          <el-rate class="pull-right"
                            v-model="score"
                            disabled
                            text-color="#ff9900"
                            score-template="{value}">
                          </el-rate>
                        </li>
                        <li class="list-group-item">项目创建时间
                          <span class="pull-right">{{prj.created_time}}</span>
                        </li>
                        <li class="list-group-item">最新版本
                          <span class="pull-right">{{prj.latest_version}}</span>
                        </li>
                        <li class="list-group-item">许可证
                          <span class="pull-right" v-for="l in prj.official_license">{{l.license}}</span>
                        </li>
                      </ul>
                    </div>

                    <div class="col-md-12">
                      <ul class="list-group list-group-unbordered">
                        开源项目说明&nbsp;&nbsp;&nbsp;&nbsp;<span>{{prj.detail_info}}</span>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </section>
    <Footer></Footer>
  </div>
</template>
<script>
  import ElRow from "element-ui/packages/row/src/row";
  import Footer from '../../../components/Footer.vue';
  import Header from '../../../components/Header.vue';

  export default {
    props: ['pid'],

    data() {
      return {
        score: 3.7,
        check: [],
        props1: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        relies: [],
        projectList: [],
        prj: {},
        loading: null
      }
    },

    components: {
      ElRow,
      Footer,
      Header
    },

    mounted: function () {
    },

    methods: {
      loadNode1(node, resolve) {
        if(this.loading == null)
        {
          this.loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
        }
        //if (node.level > 3) return resolve([]);
        let projectList = [];
        let id = node.data == null ? this.pid : node.data.pid;
        this.$http.get('/api/relies/' + id).then(response => {
          if(this.relies.length == 0 && response.data.length == 1)
          {
            this.relies.push(response.data[0]);
            this.relies.push(response.data[0]);
          }
          else
          {
            this.relies = response.data;
          }
          this.relies.forEach(function (item) {
            projectList.push({
              "name": item.project_name,
              "project_name": item.project_name,
              "pid": item.pid,
              "homepage": item.homepage,
              "project_url": item.project_url,
              "created_time": item.created_time,
              "latest_version": item.latest_version,
              "official_license": item.official_license,
              "popularity_level": item.popularity_level,
              "is_library": item.is_library,
              "detail_info": item.detail_info,
            });
          });

          return resolve(projectList);
        });
      },

      handleNodeClick(data) {
        this.prj = data;
        this.score = this.prj.popularity_level + 1;
      }
    },

    watch: {
      relies: function (val) {
        if(this.prj.id ==null)
        {
          this.prj = val[0];
          this.score = this.prj.popularity_level + 1;

          this.loading.close();
        }
      }

    }
  }

</script>

<style>
.rely {
  padding-right: 200px;
  padding-left: 200px;
}
</style>
