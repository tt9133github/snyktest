<template>
    <div>
        <el-container class="es">
            <el-header>
                <div class="search_line">
                    <el-input v-model="searchContent" @keyup.enter.native="goSearch" class="input-with-select">
                        <el-select v-model="mySelect" slot="prepend" placeholder="请选择" class="select">
                            <template v-for="type in search_type">
                                <el-option :label="type.label" :value="type.value">
                                </el-option>
                            </template>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button>
                        <el-button slot="append" icon="el-icon-more" @click="goHighSearch"></el-button>
                    </el-input>
                </div>
            </el-header>

            <el-container>
                <el-aside>
                    <div class="lang-filter border card">
                        <h3 class="lang-tile">
                            语言
                        </h3>
                        <div class=" ">
                            <li class="filter-item" v-for="l in languages" @click="filter('lang', l.name)">
                                {{l.name === '' ? '未知' : l.name}}
                                <div class="count">{{l.count}}</div>
                            </li>
                        </div>
                    </div>

                    <div class="vul-filter border card">
                        <li class="menu-item">
                            漏洞项目
                        </li>
                        <li class="menu-item" v-for="v in vuls" @click="filter('vul', v.name)">
                            <a>{{$t("vul_level." + v.name)}}</a>
                            <div class="count tag">{{v.count}}</div>
                        </li>
                    </div>
                </el-aside>

                <el-main>
                    <el-row class="resultInfo">
                        为您找到 <span style="font-size: 20px;color: #f4201d">{{total}}</span>
                        个相关的项目
                        <el-select v-model="mySort" placeholder="匹配度" size="mini" class="sort">
                            <el-option
                                    v-for="item in sortBys"
                                    :key="item.mySort"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-row>
                    <div class="card">
                        <li class="menu-item" v-for="r in results">
                            <div class="row">
                                <div class="col-md-6">
                                    <h3><a class="pointer" @click="goVersionPage(r)">{{(r.project_url.indexOf("https://github.com")
                                        != -1) ? r.project_url.substring(19, r.project_url.length) : r.full_name}}</a>

                                    </h3>
                                </div>
                                <div class="col-md-2">
                                    <div class="right info"><i class="fa fa-star"></i>{{r.project_star}}
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="right info"><i class="fa fa-bug">
                                    </i>{{r.total_vul_num}}
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="right info">
                                        {{r.main_language == "" ? "未知" : r.main_language}}
                                    </div>
                                </div>
                            </div>

                            <div class="info">{{r.project_desc}}</div>
                        </li>
                        <li class="menu-item" v-if="results.length == 0">
                            <h3>{{$t("noResult")}}</h3>
                        </li>
                    </div>

                    <div class="pagination" v-show="results.length != 0">
                        <el-pagination
                                background
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage"
                                :page-size=page_size
                                layout="total, prev, pager, next"
                                :total=total>
                        </el-pagination>
                    </div>
                </el-main>

            </el-container>
        </el-container>

    </div>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";

    export default {
        components: {ElRow},

        data() {
            return {

                //search result
                results: [],
                languages: [],
                vuls: [],

                //search box
                searchContent: '',
                mySelect: "",
                search_type: [
                    {"value": "project_name", "label": "项目名称"},
                    {"value": "vul_list.cve_id", "label": "CVE"},
                    {"value": "project_user", "label": "开发者"},
                    {"value": "subdependencies.d_name", "label": "依赖组件"},
                    {"value": "vul_list.cnnvd_id", "label": "CNNVD"}
                ],
                sortBys: [{
                    value: '',
                    label: '匹配度'
                }, {
                    value: 'project_star',
                    label: '热门度'
                }, {
                    value: 'total_vul_num',
                    label: '漏洞数'
                }],
                mySort: '',

                //pagination
                currentPage: 1,
                total: 0,
                page_size: 10,
                filterLang: null,
                filterVul: null,
                project_name: "",
                lang: [],
                checked: 0,
                searchRule: '',

                //modal
                rely: {},

                user: {},
            }
        },

        methods: {
            goVersionPage(prj) {
                let data = JSON.stringify(prj);
                this.$router.push({path: "/search/version/", query: {prj: data}})
            },

            saveRelyInfo() {
                this.$http.post('/es/project/', this.rely, {emulateJSON: true}).then(response => {
                    if (response.data.status == 1) {
                        this.$notify({
                            title: '成功',
                            message: '修改成功!',
                            type: 'success',
                            customClass: 'ljqc-message'
                        });
                    } else {
                        this.$notify({
                            title: '错误',
                            message: '修改失败!' + response.data.msg,
                            type: 'error',
                            customClass: 'ljqc-message'
                        });
                    }
                });
            },

            handleCurrentChange(val) {
                this.currentPage = val;
                this.requestEs(null);
            },

            goHighSearch() {
                this.$router.push({
                    path: '/search/adv',
                })
            },

            goSearch() {
                $(".filter-item").removeClass("selected");
                //init param
                this.currentPage = 1;
                this.total = 0;
                this.filterLang = "";
                this.filterVul = "";
                this.project_name = "";
                this.lang = [];
                this.searchRule = "";
                this.requestEs(null);
            },

            requestEs(rule) {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                this.$http.get('/es/search', {
                    params:
                        {
                            pageNo: this.currentPage,
                            pageSize: this.page_size,
                            key: this.mySelect == "" ? "project_name" : this.mySelect,
                            values: this.searchContent,
                            checked: this.checked, //0模糊 1精确
                            orderBy: this.mySort,
                            //project_name: this.param.project_name,
                            lang: JSON.stringify(this.lang),
                            cve: this.mySelect == "cve" ? this.searchContent : null,
                            cnnvd: this.mySelect == "cnnvd" ? this.searchContent : null,
                            searchRule: rule == null ? this.searchRule : rule,
                        }
                }).then(response => {
                    if (response.data.resultCode != 200) {
                        this.$alert('搜索发生错误！', {
                            confirmButtonText: '确定',
                        });
                        loading.close();
                    }
                    this.results = response.data.projects;
                    this.total = response.data.totalCount;
                    if (rule == null) {
                        this.languages = response.data.per_language;
                        this.vuls = response.data.per_vul;
                    }

                    loading.close();
                });
            },

            filter(type, param) {
                $(".filter-item").removeClass("selected");
                $(event.currentTarget).addClass('selected');

                var must = []

                if (this.searchRule == null || this.searchRule == '') {
                    if (this.mySelect == "project_name") {
                        must.push({"project_name": this.searchContent})
                    }
                    if (this.mySelect == "project_user") {
                        must.push({"project_user": this.searchContent})
                    }
                    if (this.mySelect == "vul_list.cve_id") {
                        must.push({"cve": this.searchContent})
                    }
                    if (this.mySelect == "vul_list.cnnvd_id") {
                        must.push({"cnnvd": this.searchContent})
                    }
                    if (this.mySelect == "subdependencies.d_name") {
                        must.push({"dependencies": [this.searchContent]})
                    }
                } else {
                    let rule = JSON.parse(this.searchRule);
                    must = rule.must;
                }

                if ("lang" == type) {
                    must.push({"main_language": [param]});
                } else if (param == 'high_vul_num') {
                    must.push({high_vul_num: 1});
                } else if (param == 'low_vul_num') {
                    must.push({low_vul_num: 1});
                } else if (param == 'mid_vul_num') {
                    must.push({mid_vul_num: 1});
                } else if (param == 'unk_vul_num') {
                    must.push({unk_vul_num: 1});
                }

                this.currentPage = 1;
                var rule = {"must": []};
                rule.must = must;
                this.requestEs(JSON.stringify(rule))
            },
        },

        mounted: function () {
            if (localStorage.getItem('user') == null || localStorage.getItem('user') == "") {
                this.$router.push({name: 'login'});
            }
            this.user = JSON.parse(localStorage.getItem('user'));

            this.$emit("smallSideBar");

            this.searchContent = this.$route.query.content;
            if (this.$route.query.type != null) {
                this.mySelect = this.$route.query.type;
            }

            if (this.$route.query.searchRule != null) {
                this.searchRule = this.$route.query.searchRule;
            }
            if (this.$route.query.lang != null) {
                this.lang = this.$route.query.lang;
            }

            this.requestEs(null);
        }
        ,

        watch: {
            mySort: function () {
                $(".filter-item").removeClass("selected");
                this.requestEs(null);
            }
            ,

            $route(to, from) {
                this.searchContent = this.$route.query.content;
                if (this.$route.query.type != null) {
                    this.mySelect = this.$route.query.type;
                }

                if (this.$route.query.searchRule != null) {
                    this.searchRule = this.$route.query.searchRule;
                }
                if (this.$route.query.lang != null) {
                    this.lang = this.$route.query.lang;
                }

                this.requestEs(null);
            }
        }

    }
</script>

<style scoped>
    .right2 {
        float: right;
        margin-right: 200px
    }

    .info {
        font-size: 12px;
        padding: 5px
    }

    .right {
        float: right;
    }

    .select {
        width: 110px;
    }

    .selected {
        background-color:  #eaecef;
    }

    .sort {
        float: right;
        width: 100px;
        font-size: 5px;
        margin-top: 0px;
    }

    .lang-tile {
        font-weight: 600;
        font-size: 14px;
        padding-top: 0px;
        padding-left: 10px;
    }

    .border {
        border: 1px #e1e4e8 solid;
    }

    .lang-filter {
        background-color: white;

        font-size: 14px;
        margin-bottom: 20px;
    }

    .vul-filter {
        background-color: white;
        margin-bottom: 15px;
        list-style: none;
        background-color: #fff;
        border: 1px solid #d1d5da;
        border-radius: 3px;
    }

    .menu-item {
        position: relative;
        display: block;
        padding: 8px 10px;
        border-bottom: 1px solid #e1e4e8;
        font-size: 14px;

        font-weight: 600;
        color: #24292e;
        cursor: default;
        background-color: #fff;
    }

    .menu-item:hover {
        text-decoration: none;
        background-color: #f6f8fa;
    }

    .filter-item {
        cursor: pointer;
        padding: 5px;
        padding-right: 10px;
        padding-left: 20px;
    }

    .filter-item:hover {
        text-decoration: none;
        background-color: #eaecef;
    }

    .count {
        float: right;
    }

    .tag {
        display: inline-block;
        padding: 2px 5px;
        font-size: 12px;
        font-weight: 600;
        line-height: 1;
        color: #586069;
        background-color: rgba(27, 31, 35, 0.08);
        border-radius: 20px;
    }

    .el-aside {
        width: 200px !important;
        margin-top: 65px;
    }

    .el-main {
        position: relative;
    }

    .pagination {
        float: right;
        padding: 20px;
    }

    .resultInfo {
        padding: 10px;
    }

    .es {
        font-family: Segoe UI;
        padding-right: 100px;
    }

    .search_line {
        width: 600px;
        height: 80px;
        border-radius: 4px;
        margin: 0 auto;
        padding: 10px;
    }

    .modal {

        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1050;
        display: none;
        outline: 0;
    }


</style>
