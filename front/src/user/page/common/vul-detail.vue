<template>
    <div class="wrapper">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <Header></Header>
                <!--      <div class="content-wrapper" style="margin-top:30px;background-color:white;">-->
                <!-- Content Header (Page header) -->
                <section class="content bg-style vul-main">
                    <center>
                        <h3>{{vul_detail.vuln_title}}</h3>
                    </center>
                    <div class="container">
                        <!--第一层-->

                        <div class="fl w770 vul">
                            <div class="title_bt">
                                <h2 style="width:140px;">漏洞信息详情</h2>
                            </div>
                            <div style="height:20px;"></div>
                            <div class="detail_xq w770">
                                <div class="col-md-6">
                                    <ul>
                                        <li>
                                            <span>CVE编号：</span>
                                            <a v-bind:href="cve_url" target="_blank"
                                               rel="nofollow">{{vul_detail.cveId}}</a>
                                            <input type="hidden" id="formId" name="formId" value="2,017,090,507"/>
                                        </li>
                                        <li>
                                            <span>CNNVD编号：{{vul_detail.cnnvd_id}}</span></li>
                                        <li>
                                            <span>发布时间：</span> {{vul_detail.vuln_published}}
                                        </li>
                                        <li>
                                        <li>
                                            <span>CVSS漏洞评分：</span> {{vul_detail.cvssV2 == null ? ""
                                            :vul_detail.cvssV2.baseScore}}
                                        </li>
                                        <li>
                                            <span>Bugtraq编号：</span> {{vul_detail.bugtraq_id == null ? "无" :
                                            vul_detail.bugtraq_id}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <ul>
                                        <li>
                                            <span>危害等级：</span>&nbsp;
                                            <a style="color:#4095cc;cursor:pointer;">
                                                <img v-show="vul_detail.vuln_severity=='超危'"
                                                     src="../../../../static/image/jb_4.png" border="0">
                                                <img v-show="vul_detail.vuln_severity=='高危'"
                                                     src="../../../../static/image/jb_3.png" border="0">
                                                <img v-show="vul_detail.vuln_severity=='中危'"
                                                     src="../../../../static/image/jb_2.png" border="0">
                                                <img v-show="vul_detail.vuln_severity=='低危'"
                                                     src="../../../../static/image/jb_1.png" border="0">
                                                <br/></a></li>
                                        <li>
                                            <span>漏洞类型：</span>
                                            <span>{{vul_detail.type}}&nbsp;</span>
                                        </li>
                                        <li>
                                            <span>更新时间：</span> {{vul_detail.updatetime}}
                                        <li>
                                            <span>评分方式：</span> cvssV2
                                        </li>
                                        <li>
                                            <span>发布单位：</span> {{vul_detail.vuln_source}}
                                        </li>

                                    </ul>
                                </div>
                                <div class="cb"></div>
                            </div>
                            <div class="w770">
                                <div class="title_bt">
                                    <h2 style="width:100px;">漏洞描述</h2>
                                </div>
                                <div style="height:20px;"></div>
                                <p style="text-indent:2em" class="ckwz">
                                    {{vul_detail.vuln_describe}}</p>
                            </div>
                            <div class="d_ldjj w770">
                                <div class="title_bt">
                                    <h2 style="width:100px;">漏洞威胁</h2>
                                </div>
                                <div style="height:20px;"></div>
                                <div class="col-md-6">
                                    <ul>
                                        <li>
                                            <span>漏洞利用方式：</span>{{vul_detail.cvssV2 == null ? "NULL" :
                                            vul_detail.cvssV2.vuln_av}}
                                        </li>
                                        <li>
                                            <span>漏洞利用复杂度：</span>&nbsp;
                                            <!--<a style="color:#4095cc;cursor:pointer;">{{vul_detail.access_complexity}}</a>-->
                                            {{vul_detail.cvssV2 == null ? "NULL" : vul_detail.cvssV2.vuln_ac}}
                                        </li>
                                        <li>
                                            <span>漏洞利用身份验证:</span>&nbsp;{{vul_detail.cvssV3 == null ? "NULL" :
                                            vul_detail.cvssV3.vuln_pr}}
                                        </li>
                                        <li>
                                            <span>是否需要用户交互及程度:</span>&nbsp;{{vul_detail.cvssV3 == null ? "NULL" :
                                            vul_detail.cvssV3.vuln_ui}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <ul>
                                        <li>
                                            <span>系统保密性影响：</span>{{vul_detail.cvssV2 == null ? "NULL" :
                                            vul_detail.cvssV2.vuln_a}}
                                        </li>
                                        <li>
                                            <span>系统完整性影响:</span>&nbsp;{{vul_detail.cvssV2 == null ? "NULL" :
                                            vul_detail.cvssV2.vuln_i}}
                                        </li>
                                        <li>
                                            <span>系统可用性影响:</span>&nbsp;{{vul_detail.cvssV2 == null ? "NULL" :
                                            vul_detail.cvssV2.vuln_c}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="cb"></div>
                            </div>

                            <div class="d_ldjj w770" v-show="vul_detail.exploit_code_publish != null">
                                <div class="title_bt">
                                    <h2 style="width:100px;">ExploitDB</h2>
                                </div>
                                <div style="height:20px;"></div>
                                <div class="col-md-6">
                                    <ul>
                                        <li>
                                            <span>漏洞利用代码：</span><a
                                                :href="getExploitDBCodeUrl(vul_detail.vuln_exploit_code)">{{getExploitDBCodeUrl(vul_detail.vuln_exploit_code)}}</a>
                                        </li>
                                        <li>
                                            <span>利用代码的作者:</span>&nbsp;{{vul_detail.exploit_code_author}}
                                        </li>
                                        <li>
                                            <span>利用代码是否经过验证:</span>&nbsp;{{vul_detail.exploit_code_verified}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <ul>
                                        <li>
                                            <span>利用代码的适用平台：</span>{{vul_detail.exploit_code_platform}}
                                        </li>
                                        <li>
                                            <span>利用代码的发布时间:</span>&nbsp;{{vul_detail.exploit_code_publish}}
                                        </li>

                                    </ul>
                                </div>
                                <div class="cb"></div>
                            </div>

                            <div class="d_ldjj m_t_20">
                                <div class="title_bt">
                                    <h2 style="width:100px;">参考链接</h2>
                                </div>
                                <div style="height:20px;"></div>
                                <div v-for="url in vul_detail.vuln_refs">
                                    <pre v-for="u in url">{{u}}</pre>
                                </div>
                            </div>
                            <div class="d_ldjj">
                                <div class="title_bt">
                                    <h2 style="width:120px;">受影响产品</h2>
                                </div>
                                <div style="height:20px;"></div>
                                <div v-for="term in vul_detail.affects">
                                    <p style="text-indent:2em"><a><b>厂商名称：{{term.vuln_manufacturer_name}}</b></a>
                                    </p>
                                    <div class="vulnerability_list">
                                        <ul id="ent" v-for="item in term.product.product_data">
                                            <li>
                                                <div class="fl">产品：{{item.vuln_product_name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                                <div style="overflow: hidden; white-space:nowrap;text-overflow:ellipsis;"
                                                     v-bind:title="item.version.version_data[0].vuln_version_number">
                                                    版本：<span v-for=" i in item.version.version_data">{{i.version_affected == "=" ? " " : i.version_affected}}{{i.vuln_version_number}} </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <br>
                                </div>
                            </div>
                            <div class="d_ldjj" v-show="vul_detail.files != null && vul_detail.files.length != 0">
                                <div class="title_bt">
                                    <h2 style="width:200px;">漏洞文件</h2>
                                </div>
                                <div style="height:20px;"></div>
                                <div v-for="f in vul_detail.files">
                                    <a data-toggle="modal" style="cursor: pointer;text-indent:2em;padding-left: 20px"
                                       data-target="#FileModal" v-on:click="getContent(f)">{{f.name}}</a>
                                </div>
                            </div>
                            <div class="d_ldjj">
                                <div class="title_bt">
                                    <h2 style="width:200px;"
                                        v-show="vul_detail.step_links != null && vul_detail.step_links.length != 0">
                                        漏洞补丁参考链接</h2>
                                </div>
                                <div style="height:20px;"></div>
                                <!--<div v-for="suggestion in vul_detail.step_links">-->
                                <a style="text-indent:2em;padding-left: 20px" target="_blank" class="ckwz"
                                   :href="suggestion">
                                    {{solution}}</a>
                                <!--</div>-->
                            </div>
                        </div>
                        <Footer></Footer>

                    </div>
                    <!--主体结束-->
                </section>

                <div class="modal fade" id="FileModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog modal-file" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="myModalLabel">漏洞文件</h4>
                            </div>
                            <div class="modal-body">
                                <div class="row n">
                                    <div class="col-md-6">
                                        <p><b><a>漏洞文件名称：{{file.name}}</a></b></p>
                                        <p class="code-path"><b><a>漏洞文件路径： {{file.path}}</a></b></p>
                                    </div>
                                </div>

                                <nav id="navbar-example" class="navbar-default navbar-static" role="navigation">
                                    <div>
                                        <div class="navbar-header">
                                            <button class="navbar-toggle" type="button" data-toggle="collapse"
                                                    data-target=".bs-js-navbar-scrollspy">
                                                <span class="sr-only">切换导航</span>
                                            </button>
                                        </div>
                                        <div class="file-body">
                      <pre style="height: 100%;padding: 0px" v-highlight>
                            <code v-html="file.content"></code>
                        </pre>
                                        </div>

                                    </div>
                                </nav>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" data-dismiss="modal"
                                            v-on:click=getButtonId()>
                                        确定
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {

        data: function () {
            return {
                cve_id: "",
                vul_detail: "",
                vul_severity: "",
                cve_url: "",
                file: "",
            }
        },

        mounted: function () {
            this.cve_id = this.$route.params.id;
            this.getDetail();
        },

        methods: {
            getContent(val) {
                this.file = val;
            },

            getExploitDBCodeUrl(url) {
                if (url == null) {
                    return null;
                }
                let tmp = url.split(".");
                let newUrl = "";
                for (let i = 0; i < tmp.length - 1; i++) {
                    newUrl += tmp[i] + ((i === tmp.length - 2) ? "" : ".");
                }

                return newUrl;
            },

            getDetail() {
                var cve_id = this.cve_id;
                this.cve_url = "http://cve.mitre.org/cgi-bin/cvename.cgi?name=" + cve_id;
                this.$http.get("/api/vul/" + cve_id).then(response => {
                    this.vul_detail = response.data;

                    //判断漏洞的危险等级高、中、低
                    if (this.vul_detail.severity == "HIGH") {
                        this.vul_severity = 3;
                        //console.log("vul_severity:" + vm.vul_severity);
                    } else if (this.vul_detail.severity == "MEDIUM") {
                        this.vul_severity = 2;
                    } else if (this.vul_detail.severity == "LOW") {
                        this.vul_severity = 1;
                    }
                });
            },
        },

        watch: {},

    }
</script>

<style>
    .table-hide td {
        text-overflow: ellipsis;
        /* for IE */
        -moz-text-overflow: ellipsis;
        /* for Firefox,mozilla,在chrome中测试也通过了*/
        overflow: hidden;
        white-space: nowrap;
    }

    .vul {
        padding-bottom: 50px;
    }

    .modal-file {
        width: 1200px
    }

    .file-body {
        height: 500px;
        position: relative;
        border-radius: 3px;
        border: 1px solid #C3CCD0;
        background: #FFF;
    }
</style>
