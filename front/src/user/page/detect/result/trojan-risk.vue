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
                      <i class="fa fa-circle-o text-red"></i>&nbsp;恶意代码检测&nbsp;&nbsp;
                    </p>
                  </b>
                </h5>
                <hr>
                <p>
                  恶意代码是指会对用户实施不安全行为的代码，如木马后门等。恶意代码检测系统支持木马后门检测、APT攻击检测、黑客工具检测、漏洞利用检测和其它恶意程序检测等功能，能发现被植入到检测项目中的恶意代码，防范安全风险。</p>
              </div>
              <!-- /.box-body -->
            </div>
          </div>
          <!--/.col-->
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="box box-solid box-default">
              <!-- /.box-header -->
              <div class="box-body">
                <h5>
                  <b>
                    <p>&nbsp;
                      <i class="fa fa-circle-o text-red"></i>&nbsp;恶意代码检测详情&nbsp;&nbsp;
                    </p>
                  </b>
                </h5>
              </div>
              <!-- /.box-body -->
            </div>
          </div>
          <div class="col-md-12">
            <div class="box box-solid box-default">
              <!--
              <div class="box-header with-border">
                  <p>

                      <b><i class="fa fa-exclamation-circle"></i>&nbsp;&nbsp;恶意代码检测详情</b>
                                      &nbsp;&nbsp;Malicious code detection details
                  </p>

                  <div class="box-tools pull-right">
                      <button type="button" class="btn btnh-box-tool" data-widget="collapse">
                                  <i class="fa fa-minus"></i>
                              </button>
                  </div>
              </div>
      -->
              <div class="box-body">
                <table class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th width="25%">恶意代码种类</th>
                    <th width="25%">恶意代码文件数量</th>
                    <th width="25%">疑似恶意代码文件数量</th>
                    <th width="25%">恶意代码定位详情</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-if="webshell.length>0">
                    <td>木马后门</td>
                    <td>{{data.webShell_confirm_number}}</td>
                    <td>{{data.webShell_suspect_number}}</td>
                    <td v-show="(data.webShell_confirm_number + data.webShell_suspect_number) !== 0">
                      <el-button data-toggle="modal" data-target="#trojanModal" @click="getLocation(webshell)" size="small" type="primary" icon="el-icon-view" plain></el-button>

                    </td>
                    <td v-show="(data.webShell_confirm_number + data.webShell_suspect_number)==0">
                      <el-button type="info" size="small" plain disabled>无
                      </el-button>
                    </td>
                  </tr>
                  <tr v-if="APT.length>0">
                    <td>APT攻击</td>
                    <td>{{data.apt_confirm_number}}</td>
                    <td>{{data.apt_suspect_number}}</td>
                    <td v-show="(data.apt_confirm_number + data.apt_suspect_number)!==0">
                      <el-button data-toggle="modal" data-target="#trojanModal" @click="getLocation(APT)" size="small" type="primary" icon="el-icon-view" plain></el-button>
                    </td>
                    <td v-show="(data.apt_confirm_number + data.apt_suspect_number)==0">
                      <el-button type="info" size="mini" plain disabled>无
                      </el-button>
                    </td>
                  </tr>
                  <tr v-if="hacker.length>0">
                    <td>黑客工具</td>
                    <td>{{data.hakers_confirm_number}}</td>
                    <td>{{data.hakers_suspect_number}}</td>
                    <td v-show="(data.hakers_confirm_number + data.hakers_suspect_number)!==0">
                      <el-button data-toggle="modal" data-target="#trojanModal" @click="getLocation(hacker)" size="small" type="primary" icon="el-icon-view" plain></el-button>
                    </td>
                    <td v-show="(data.hakers_confirm_number + data.hakers_suspect_number)==0">
                      <el-button type="info" size="small" plain disabled>无
                      </el-button>
                    </td>
                  </tr>
                  <tr v-if="bugUsing.length>0">
                    <td>漏洞利用</td>
                    <td>{{data.bugUsing_confirm_number}}</td>
                    <td>{{data.bugUsing_suspect_number}}</td>
                    <td v-show="(data.bugUsing_confirm_number + data.bugUsing_suspect_number)!==0">
                      <el-button data-toggle="modal" data-target="#trojanModal" @click="getLocation(bugUsing)" size="small" type="primary" icon="el-icon-view" plain></el-button>
                    </td>
                    <td v-show="(data.bugUsing_confirm_number + data.bugUsing_suspect_number)==0">
                      <el-button type="info" size="small" plain disabled>无
                      </el-button>
                    </td>
                  </tr>
                  <tr v-if="other.length>0">
                    <td>其它恶意程序</td>
                    <td>{{data.other_confirm_number}}</td>
                    <td>{{data.other_suspect_number}}</td>
                    <td v-show="(data.other_confirm_number + data.other_suspect_number)!==0">
                      <el-button data-toggle="modal" data-target="#trojanModal" @click="getLocation(other)" size="small" type="primary" icon="el-icon-view" plain></el-button>
                    </td>
                    <td v-show="(data.other_confirm_number + data.other_suspect_number)==0">
                      <el-button type="info" size="small" plain disabled>无
                      </el-button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="box box-solid box-default collapsed-box">
              <div class="box-header with-border">
                <p>
                  <b>
                    <i class="fa fa-exclamation-circle"></i>&nbsp;&nbsp;恶意代码分类
                  </b>
                </p>
                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse">
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <!-- /.box-header -->
              <div class="box-body ">
                <el-collapse accordion>
                  <el-collapse-item>
                    <template slot="title">
                      木马后门 Trojan Backdoor <a class="pull-right"></a>&nbsp;&nbsp;&nbsp;
                    </template>
                    <div>
                      木马后门是指潜伏在电脑中，可受外部用户控制以窃取本机信息或者控制权的程序。木马还可进一步分为Webshell木马、下载型木马、破坏型木马、远控木马、键盘记录木马、Dos攻击木马等。目前，系统支持100多种被植入木马的DLL文件或exe文件的检测，以及1万多种各类木马检测。
                    </div>
                  </el-collapse-item>
                  <el-collapse-item>
                    <template slot="title">
                      APT攻击 APT attack<a class="pull-right"></a>&nbsp;&nbsp;&nbsp;
                    </template>
                    <div> APT是指高级持续性威胁。
                      APT攻击是一种利用先进的攻击手段对特定目标进行长期持续性网络攻击的攻击形式，APT攻击相对于其他攻击形式更为高级和先进，其高级性主要体现在APT在发动攻击之前需要对攻击对象的业务流程和目标系统进行精确的收集。目前，系统支持50多中APT攻击类型的检测，包括Equation
                      Group APT、Carbanak APT、Arid Viper APT、Skeleton Key
                      APT、WoolenGoldfish APT、OpCleaver APT等。
                    </div>
                  </el-collapse-item>
                  <el-collapse-item>
                    <template slot="title">
                      黑客工具 Hacker tools<a class="pull-right"></a>&nbsp;&nbsp;&nbsp;
                    </template>
                    <div>
                      黑客工具一般是由黑客或者恶意程序安装到计算机，用来盗窃信息、让电脑死机与无法使用引起系统故障和完全控制电脑的恶意软件程序。目前，系统支持180多个黑客工具的检测，包括PMAC.exe、GetSysKey.exe、Churrasco.exe、mysql_injectV1.1_Creak.exe等。
                    </div>
                  </el-collapse-item>
                  <el-collapse-item>
                    <template slot="title">
                      漏洞利用 The exploit<a class="pull-right"></a>&nbsp;&nbsp;&nbsp;
                    </template>
                    <div>
                      漏洞利用是专门针对已知安全漏洞的恶意程序。漏洞利用恶意程序利用安全漏洞对目标进行远程控制、指令执行、系统破坏、信息窃取等恶意行为。目前，系统支持10余种漏洞利用恶意程序的检测，包括CVE-2015-1674、CVE-2015-1701、CVE-2015-2406等。
                    </div>
                  </el-collapse-item>
                  <el-collapse-item>
                    <template slot="title">
                      其它恶意程序 Other malicious
                      programs<a class="pull-right"></a>&nbsp;&nbsp;&nbsp;
                    </template>
                    <div>
                      我们将不宜分为木马后门、APT工具、黑客工具、漏洞利用的恶意代码称为其它恶意程序，包括宏病毒、广告软件和其它可疑程序。目前，系统支持的100多种其它恶意程序。
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>

        <div class="modal fade" id="trojanModal" tabindex="-1" role="dialog" aria-labelledby="trojanModal">
          <div class="modal-dialog" style="width:1000px;padding-top: 100px" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Cl&nbsp;无结果&nbsp;ose">
                  <span aria-hidden="true">&times;</span></button>
                <h3>恶意代码定位详情</h3>
              </div>
              <div class="modal-body" style="max-height: 600px;overflow: auto">
                <table class="table table-bordered table-striped" v-if="hash == null">
                  <thead>
                  <tr>
                    <th width="10%">序号</th>
                    <th width="30%">恶意代码所在文件路径</th>
                    <th width="30%">代码内容</th>
                    <th width="10%">结果类型</th>
                    <th width="20%">说明</th>
                  </tr>
                  </thead>
                  <tbody >
                  <tr v-for="(term,index) in path">
                    <td>{{index+1}}</td>
                    <td>{{term.webshell_path}}</td>
                    <td>{{term.code_location}}</td>
                    <td>
                      <div v-show="term.type==0">恶意程序</div>
                      <div v-show="term.type==1">疑似文件</div>
                    </td>
                    <td>{{term.desc}}</td>
                  </tr>
                  </tbody>
                </table>
                <el-table
                        :data="path"
                        style="width: 100%!important;min-width: 100%"  v-if="hash != null">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-table :data="props.row.reason">
                        <el-table-column
                                label="规则路径"
                        >
                          <template slot-scope="scope">
                            <span>{{scope.row.RULE_PATH}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                                label="代码内容"
                        >
                          <template slot-scope="scope">
                            <span>{{scope.row.code}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                                label="代码所在行数"
                        >
                          <template slot-scope="scope">
                            <span>{{scope.row.codeline}}</span>
                          </template>
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>
                  <el-table-column
                          type="index"
                          label="序号"
                  >
                  </el-table-column>
                  <el-table-column
                          label="恶意代码所在文件路径"
                          prop="file">
                  </el-table-column>
                  <el-table-column
                          label="MD5"
                          prop="md5">
                  </el-table-column>
                  <el-table-column
                          label="结果类型"
                  >
                    <template slot-scope="scope">
                      <div v-show="scope.row.reason[0].type==0">恶意程序</div>
                      <div v-show="scope.row.reason[0].type==1">疑似文件</div>
                    </template>
                  </el-table-column>
                  <el-table-column
                          label="说明"
                          prop="reason[0].DESCRIPTION"
                  >
                  </el-table-column>
                </el-table>
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
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        task_id: '',
        //检测webshell信息
        hash: "",
        webshell: [],
        path: [],
        data: {},
        APT: [],
        hacker: [],
        bugUsing: [],
        other: []
      }
    },

    mounted: function () {
      this.task_id = this.$route.params.id;
      this.getMalevolenceCode();
    },

    methods: {
      getMalevolenceCode() {
        this.$http.get("/api/malevolence_code/" + this.task_id).then(response => {
          this.data = response.data;
          this.webshell = response.data.webShells;
          this.APT = response.data.apts;
          this.hacker = response.data.hakers;
          this.bugUsing = response.data.bugUsings;
          this.other = response.data.others;
        });
      },

      getLocation(path) {
        this.path = path;

        if (path[0].md5 != null) {
          this.hash = path[0].md5;
        }
        else
        {
          this.hash = null;
        }
      }
    },
  }

</script>
