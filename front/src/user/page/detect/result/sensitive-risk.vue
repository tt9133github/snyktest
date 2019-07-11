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
                  <b>
                    <p>&nbsp;
                      <i class="fa fa-circle-o text-yellow"></i>&nbsp;检测项目敏感行为检测&nbsp;&nbsp;
                    </p>
                  </b>
                </h5>
                <hr>
                <p>
                  敏感行为检测是用来检测源代码中的敏感操作行为，这些操作有可能并不是用户知晓的或者容许的，包括摄像头操作，键盘鼠标操作，文件敏感操作以及外部链接访问和使用一些敏感端口号等等。</p>
              </div>
              <!-- /.box-body -->
            </div>
          </div>
          <!--/.col-->
          <hr>
          <div class="col-md-12">
            <div class="box box-solid box-default">
              <div class="box-body">
                <table class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th width="10%">序号</th>
                    <th width="30%">敏感行为名称</th>
                    <th width="20%">危险等级</th>
                    <th width="20%">是否包含</th>
                    <th width="20%">查看详情</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(term,index) in sensitive_behavior_list">
                    <td>
                      {{index+1}}
                    </td>
                    <td>
                      &nbsp;&nbsp;{{term.behavior_name}}
                    </td>
                    <td><span v-show="term.behavior_level==1">高风险</span>
                      <span v-show="term.behavior_level==2">中风险</span>
                      <span v-show="term.behavior_level==3">低风险</span></td>
                    <td v-show="term.result==1">
                      <el-tag type="danger" size="mini" round>&nbsp;&nbsp;包含&nbsp;&nbsp;</el-tag>
                      <span class="badge bg-red"></span></td>
                    <td v-show="term.result==0">
                      <el-tag type="info" size="mini" round>未包含</el-tag>
                    </td>
                    <td v-show="term.result==1">
                      <!--                            <button class="btn bg-color-HEX6" data-toggle="modal" data-target="#encrypitonModal" @click="getLocation(term.file_location,term.location_detail)">-->
                      <!--                                            <i class="fa fa-arrow-circle-right"></i>查看详情</button>-->
                      <el-button v-show="term.result==1" data-toggle="modal" data-target="#behaviorModal" @click="getLocation(term.behavior_name,term.behavior_location)" size="mini" type="primary" icon="el-icon-view" plain></el-button>
                    </td>
                    <td v-show="term.result==0">
                      <el-button type="info" size="mini" plain disabled>无
                      </el-button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="behaviorModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document" style="width:800px;height:1000px;">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>
                <h4>敏感行为检测详情</h4>
              </div>
              <div class="modal-body">
                <div class="panel panel-default" v-for="(term,index) in behavior_detail">
                  <div class="panel-heading"><i class="fa fa-hand-o-right"></i>&nbsp;<b>{{behavior_name}}行为</b>定位展示{{index+1}}
                  </div>
                  <div class="panel-body">
                    <strong>
                      <i class="fa fa-map-marker margin-r-5"></i>
                      <a>定位的文件名</a>
                    </strong>
                    <p>{{term.file_location}}</p>
                    <hr>
                    <div v-for="item in term.location_detail">
                      <strong>
                        <i class="fa fa-map-marker margin-r-5"></i>
                        <a>定位到的行号:</a>
                      </strong>
                      <span class="badge bg-blue">{{item.code_location}}</span><br>
                      <strong>
                        <i class="fa fa-map-marker margin-r-5"></i>
                        <a>定位的源代码内容</a>
                      </strong>
                      <div class="" v-for="(code,index) in item.code_detail" v-bind:key="code.index">
                        <div v-show="item.code_location!==1">
                          <a>{{index+item.code_location-1}}</a> {{code}}
                        </div>
                        <!--代码定位到第一行-->
                        <div v-show="item.code_location==1">
                          <a>{{index+item.code_location}}</a> {{code}}
                        </div>
                      </div>
                      <hr>
                    </div>
                  </div>
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
        <div class="row">
          <div class="col-md-12">
            <div class="box box-solid box-default">
              <div class="box-body">
                <h5>
                  <b>
                    <p>&nbsp;
                      <i class="fa fa-circle-o text-yellow"></i>&nbsp;检测项目操作的网络端口行为&nbsp;&nbsp;
                    </p>
                  </b>
                </h5>
              </div>
              <!-- /.box-body -->
            </div>
            <div class="box box-solid box-default" v-show="port_list.length>0">
              <div class="box-body">
                <table class="table table-hover table-bordered table-striped">
                  <thead>
                  <tr>
                    <th width="10%">网络端口号</th>
                    <th width="30%">程序定位</th>
                    <th width="25%">定位的源代码</th>
                    <th width="25%">描述信息</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="term in port_list">
                    <td><span class="badge bg-blue">{{term.network_port}}</span>
                    </td>
                    <td><span>{{term.port_file_location}}</span></td>
                    <td>{{term.port_code_location}}</td>
                    <td>{{term.description}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="box  box-solid box-default" v-show="port_list==0">
              <div class="box-body">
                <h4>检测项目中未发现任何操作网络端口行为！</h4>
              </div>
            </div>
          </div>
        </div>
        <!--row-->
      </section>
    </div>
  </div>
</template>
<script>
  import {
    getTaskID,
    //        ifAlreadyLogin,
    getTaskDataList
  } from '../../../style/js/result/util.js';
  import Header from '../../../components/Header.vue';
  import Seadbar from '../../../components/Result_seadbar.vue';
  import Footer from '../../../components/Footer.vue';

  export default {
    components: {
      Header,
      Seadbar,
      Footer,
    },
    data: function () {
      return {

        //任务ID
        task_id: '',
        user_id: '',

        //敏感行为列表
        sensitive_behavior_list: [],
        //敏感行为程序定位
        behavior_detail: [],
        behavior_name: '',
        //网络端口号列表
        port_list: [],
      }
    },
    mounted: function () {
      var vm = this;
      this.task_id = this.$route.params.id;
      this.user_id = JSON.parse(localStorage.getItem('user')).id;
      //getTaskDataList(vm.task_id + '/network_port', vm.port_list);
      this.getSensitiveBahaviors();
    },
    methods: {
      getSensitiveBahaviors() {
        this.$http.get("/api/sensitive_behaviors/" + this.task_id).then(response => {
          this.sensitive_behavior_list = response.data;
        });
      },
      getLocation(name, detail) {
        var vm = this;
        vm.behavior_detail = detail;
        vm.behavior_name = name;
      },
    }
  }

</script>
