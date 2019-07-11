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
                      <i class="fa fa-circle-o text-green"></i>&nbsp;检测项目加密算法检测&nbsp;&nbsp;
                    </p>
                  </b>
                </h5>
                <hr>
                <p>
                  加密算法是指在数据加密过程中，将明文的文件或数据处理成不可读的一段代码所用到的算法。加密算法分为对称加密算法、非对称加密算法和哈希算法三大类别,市面上主流的加密算法
                  多达几十种，其加密等级也不尽相同。加密算法检测模块可以检测出项目中使用的加密算法，并且定位到代码片段，方便用户判定其所用的加密算法等级是否符合项目需求。</p>
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
                      <i class="fa fa-circle-o text-green"></i>&nbsp;加密算法检测详情&nbsp;&nbsp;
                    </p>
                  </b>
                </h5>
              </div>
              <!-- /.box-body -->
            </div>
            <div class="box box-solid box-default">
              <div class="box-body">
                <table class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th width="20%">加密算法</th>
                    <th width="20%">类型</th>
                    <th width="20%">来源</th>
                    <th width="20%">是否包含</th>
                    <th width="20%">查看详情</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="term in encryption_list">
                    <td>
                      <a target="_blank">{{term.encryption_name}}</a></td>
                    <td>{{term.encryption_type}}
                    </td>
                    <td>{{term.resources}}
                    </td>
                    <td v-show="term.result==1">
                      <el-tag type="danger" size="mini" round>&nbsp;&nbsp;包含&nbsp;&nbsp;</el-tag>
                      <span class="badge bg-red"></span></td>
                    <td v-show="term.result==0">
                      <el-tag type="info" size="mini" round>未包含</el-tag>
                    </td>
                    <td v-show="term.result==1">
                      <el-button @click="getLocation(term.file_location,term.location_detail)" data-toggle="modal" data-target="#encrypitonModal" size="mini" type="primary" icon="el-icon-view" plain></el-button>
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
          <div class="col-md-12">
            <div class="box box-solid box-default collapsed-box">
              <div class="box-header with-border">
                <p>
                  <b>
                    <i class="fa fa-lock"></i>&nbsp;&nbsp;加密算法类型</b>
                </p>
                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse">
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <!-- /.box-header -->
              <div class="box-body">
                <el-collapse accordion>
                  <el-collapse-item>
                    <template slot="title">
                      对称加密算法 Symmetric encryption algorithm
                      <a class="pull-right">16</a>&nbsp;&nbsp;&nbsp;
                    </template>
                    <div>
                      <p class="text-muted">对称加密算法中，数据发信方将明文（原始数据）和加密密钥（mi
                        yao）一起经过特殊加密算法处理后，使其变成复杂的加密密文发送出去。收信方收到密文后，若想解读原文，则需要使用加密用过的密钥及相同算法的逆算法对密文进行解密，才能使其恢复成可读明文。在对称加密算法中，使用的密钥只有一个，发收信双方都使用这个密钥对数据进行加密和解密，这就要求解密方事先必须知道加密密钥。</p>

                      <a><i class="fa fa-pencil margin-r-5"></i></a> 包含算法

                      <br>
                      <p>
                        <span class="label label-info">Blowfish</span>
                        <span class="label label-info">DES</span>
                        <span class="label label-info">DESX</span>
                        <span class="label label-info">RC4/ARC4</span>
                        <span class="label label-info">RC2</span>
                        <span class="label label-info">RC5</span>
                        <span class="label label-info">IDEA</span>
                        <span class="label label-info">CAST5</span>
                        <span class="label label-info">AES</span>
                        <span class="label label-info">3DES</span>
                        <span class="label label-info">CHACHA20</span>
                        <span class="label label-info">Camellia</span>
                        <span class="label label-info">CAST_128</span>
                        <span class="label label-info">SM4</span>
                        <span class="label label-info">SM7</span>
                        <span class="label label-info">ZUC</span>
                      </p>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item>
                    <template slot="title">
                      非对称加密算法 Asymmetric encryption
                      algorithm.<a class="pull-right">6</a>&nbsp;&nbsp;&nbsp;
                    </template>
                    <div>
                      <p class="text-muted">
                        非对称加密算法是一种密钥的保密方法。非对称加密算法需要两个密钥：公开密钥（publickey）和私有密钥（privatekey）。公开密钥与私有密钥是一对，如果用公开密钥对数据进行加密，只有用对应的私有密钥才能解密；如果用私有密钥对数据进行加密，那么只有用对应的公开密钥才能解密。因为加密和解密使用的是两个不同的密钥，所以这种算法叫作非对称加密算法。 </p>
                      <a><i class="fa fa-pencil margin-r-5"></i></a> 包含算法
                      <br>
                      <p>
                        <span class="label label-danger">DH</span>
                        <span class="label label-danger">DSA</span>
                        <span class="label label-danger">ECDSA</span>
                        <span class="label label-danger">RSA</span>
                        <span class="label label-danger">ECDH</span>
                        <span class="label label-danger">SM2</span>
                      </p>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item>
                    <template slot="title">
                      哈希加密算法 Hash encryption
                      algorithm<a class="pull-right">12</a>&nbsp;&nbsp;&nbsp;
                    </template>
                    <div>
                      <p class="text-muted">
                        哈希算法将任意长度的二进制值映射为较短的固定长度的二进制值，这个小的二进制值称为哈希值。哈希值是一段数据唯一且极其紧凑的数值表示形式。如果散列一段明文而且哪怕只更改该段落的一个字母，随后的哈希都将产生不同的值。要找到散列为同一个值的两个不同的输入，在计算上是不可能的，所以数据的哈希值可以检验数据的完整性。一般用于快速查找和加密算法。</p>
                      <a><i class="fa fa-pencil margin-r-5"></i></a> 包含算法

                      <p>
                        <span class="label label-success">HMAC</span>
                        <span class="label label-success">MD2</span>
                        <span class="label label-success">MD4</span>
                        <span class="label label-success">MD5</span>
                        <span class="label label-success">MDC2</span>
                        <span class="label label-success">RIPEMD160</span>
                        <span class="label label-success">SHA1</span>
                        <span class="label label-success">SHA224</span>
                        <span class="label label-success">SHA256</span>
                        <span class="label label-success">SHA384</span>
                        <span class="label label-success">SHA512</span>
                        <span class="label label-success">CBC_MAC</span>
                      </p>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="encrypitonModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" style="width:800px" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>
                <h4>加密算法检测详情</h4>
              </div>
              <div class="modal-body">
                <div class="panel panel-default" v-for="(term,index) in code_detail">
                  <!-- Default panel contents -->
                  <div class="panel-heading"><i class="fa fa-hand-o-right"></i>&nbsp;加密算法定位展示{{index+1}}
                  </div>
                  <div class="panel-body">
                    <strong>
                      <a><i class="fa fa-map-marker margin-r-5"></i>
                        定位的文件名及行号:</a>
                    </strong>
                    <p>{{file_path}}:<span class="badge bg-blue">{{term.encryption_location}}</span>
                    </p>
                    <strong>
                      <a><i class="fa fa-map-marker margin-r-5"></i>
                        定位的源代码内容</a>
                    </strong>
                    <div class="" v-for="(item,index) in term.encryption_code" v-bind:key="item.index">
                      <div v-show="term.encryption_location!==1">
                        <a>{{index+term.encryption_location-1}}</a> {{item}}
                      </div>
                      <!--代码定位到第一行-->
                      <div v-show="term.encryption_location==1">
                        <a>{{index+term.encryption_location}}</a> {{item}}
                      </div>
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
        <div style="height:280px;"></div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        //任务ID
        task_id: '',
        //任务名称
        name: '',

        //加密算法详情表单
        encryption_list: [],
        //加密算法程序定位
        file_path: '',
        //加密算法代码详情
        code_detail: [],
        encryption_library: []
      }
    },

    mounted: function () {
      this.task_id = this.$route.params.id;
      this.getEncryptionList();
      //getTaskData('encryption_library', vm.encryption_library);
    },

    methods: {
      getEncryptionList() {
        this.$http.get("/api/encryption/" + this.task_id).then(response => {
          this.encryption_list = response.data;
        });
      },

      getLocation(file_path, code) {
        var vm = this;
        vm.file_path = file_path;
        vm.code_detail = code;
      },
    }
  }

</script>
