<template>

    <div style="background-color:white;min-height:860px;padding: 10px;">

        <div class="row">
            <div class="col-md-12">
                <div class="box box-solid box-default">
                    <!-- /.box-header -->
                    <div class="box-body">
                        <h5>
                            <b>
                                <p>&nbsp;
                                    <i class="fa fa-circle-o text-red"></i>&nbsp;元数据提取&nbsp;&nbsp;
                                </p>
                            </b>
                        </h5>
                        <hr>
                        <p>
                            元数据提取：通过上传项目压缩包，解析出项目的函数列表，依赖和资源文件。</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row extract">
            <div class="col-md-4">
                <form class="form-horizontal" id="uploadForm">
                    <div class="box box-solid box-default">
                        <div class="box-header with-border">
                            <p>
                                <b><i class="fa fa-folder-open-o"></i>&nbsp;&nbsp;上传压缩包</b>
                            </p>
                        </div>
                        <div class="box-body">
                            <el-upload
                                    drag
                                    action="/api/tool/meta/file"
                                    :limit="1"
                                    accept='.zip'
                                    :on-success="onUploadSuccess"
                                    style="padding-left: 10px;"
                            >
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将压缩文件拖到此处，或<em>点击</em>
                                </div>
                                <div class="el-upload__tip" slot="tip">仅支持.zip文件</div>
                            </el-upload>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-8">

                <div class="panel panel-default">
                    <div class="panel-body">
                        <el-table :data="extracts" style="height: 550px;">
                            <el-table-column label="序号" width="60" type="index" align="center">
                                <template slot-scope="scope">
                                    {{(currentPage - 1) * pageSize + scope.$index +
                                    1}}
                                </template>
                                -->
                            </el-table-column>
                            <!--<el-table-column prop="user" label="上传用户" align="center"></el-table-column>-->
                            <el-table-column prop="zippath" label="文件路径" align="center"></el-table-column>
                            <el-table-column prop="creat_time" label="上传时间" align="center"></el-table-column>
                            <el-table-column prop="meta_status" label="提取状态" align="center">
                                <template slot-scope="scope">
                                    <div v-show="scope.row.meta_status == -1" style="color:red">
                                        失败
                                    </div>
                                    <div v-show="scope.row.meta_status == 1" style="color:blue">
                                        提取中...
                                    </div>
                                    <div v-show="scope.row.meta_status == 0">待提取
                                    </div>
                                    <div v-show="scope.row.meta_status == 2" style="color:green">
                                        完成
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button v-show="scope.row.meta_status == 2" type="info" data-toggle="modal"
                                               data-target="#resultModal" size="mini"
                                               @click="getResult(scope.row.id,scope.row.zippath)"
                                               style="background: cornflowerblue">
                                        查看
                                    </el-button>
                                    <el-button v-show="scope.row.meta_status == -1" type="info" plain size="mini"
                                               disabled>
                                        查看
                                    </el-button>
                                    <el-button v-show="scope.row.meta_status==0 || scope.row.meta_status == 1" plain
                                               size="mini" disabled>
                                        暂无
                                    </el-button>
                                    <i class="fa fa-trash pointer" @click="deleteTask(scope.row.id)">
                                    </i>
                                </template>
                            </el-table-column>
                        </el-table>
                        <hr>
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                       :current-page="currentPage" :page-size="pageSize"
                                       layout="total, prev, pager, next, jumper" :total="extractTotal"></el-pagination>
                    </div>
                </div>

            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="resultModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             style="padding-top: 100px">
            <div class="modal-dialog modal-code" role="document" style="width: 1000px;">
                <div class="modal-content" style="border-radius: .25rem;">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">提取结果</h4>
                    </div>
                    <div class="modal-body" style="height: 700px;overflow: auto">
                        <div class="row">
                            <div class="col-md-12">
                                <el-tabs type="border-card">
                                    <el-tab-pane label="项目依赖">
                                        <hr style="margin-top: 10px">
                                        <table class="table table-hover table-bordered table-striped table-hide ">
                                            <thead>
                                            <tr>
                                                <th class="text-center">序号</th>
                                                <th>依赖包名</th>
                                                <th>依赖版本</th>
                                                <th>语言</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(term, index)  in relies_paged">
                                                <td align="center">{{ (repository_page - 1) * 10 + index + 1 }}
                                                </td>
                                                <td>{{ term.packageName }}</td>
                                                <td>{{ term.version }}</td>
                                                <td>{{ term.language }}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <el-pagination @current-change="repository_pageChange"
                                                       :current-page="repository_page" :page-size=10
                                                       :total="repository_count">
                                        </el-pagination>
                                    </el-tab-pane>

                                    <el-tab-pane label="文件元数据">
                                        <el-table :data="class_paged" empty-text="无结果" tooltip-effect="dark">
                                            <el-table-column type="expand">
                                                <template slot-scope="props">
                                                    <el-table :data="props.row.funParams" empty-text="无函数参数信息">
                                                        <el-table-column type="index"></el-table-column>
                                                        <el-table-column label="方法名" prop="function" align="left">
                                                        </el-table-column>
                                                        <el-table-column label="参数" prop="params" align="left">
                                                        </el-table-column>

                                                    </el-table>
                                                </template>
                                            </el-table-column>

                                            <el-table-column label="类名" prop="classname" width="195">
                                            </el-table-column>
                                            <el-table-column label="文件路径" prop="filepath" width="295">
                                            </el-table-column>

                                            <el-table-column
                                                    prop="comments"
                                                    label="注释"
                                                    width="495"
                                                    show-overflow-tooltip>
                                                <!--<template slot-scope="scope">
                                                    <pre class="code-body slim-bar">
                                                        <code v-html="scope.row.comments"></code>
                                                    </pre>
                                                </template>-->
                                            </el-table-column>

                                        </el-table>
                                        <el-pagination @current-change="class_pageChange" :current-page="class_page"
                                                       :page-size=10 :total="class_count">
                                        </el-pagination>

                                    </el-tab-pane>
                                    <el-tab-pane label="资源文件">
                                        <table class="table table-hover table-bordered table-striped table-hide">
                                            <thead>
                                            <tr>
                                                <th width="15%">序号</th>
                                                <th width="85%">资源路径</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(term, index)  in resources_paged ">
                                                <td>{{ (res_page - 1) * 10 + index + 1 }}</td>
                                                <td>{{ term }}</td>
                                                <td></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <el-pagination @current-change="res_pageChange" :current-page="res_page"
                                                       :page-size=10 :total="res_count">
                                        </el-pagination>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!---->
    </div>
</template>

<script>
    export default {

        data: function () {
            return {
                user_id: '',
                task_id: 0,
                result: {},
                libraryRequires: [],
                libraryRequires_paged: [],

                relies: [],
                relies_paged: [],
                repository_page: 1,
                repository_count: 0,

                classes: [],
                class_paged: [],
                class_count: 0,
                class_page: 1,

                resources: [],
                resources_paged: [],
                res_count: 0,
                res_page: 1,

                //interval
                interval: {},
                loading: {},

                res_page: 0,
                res_count: 0,

                extracts: [],
                extractTotal: 0,
                pageSize: 10,
                currentPage: 1,
                filezippath: '暂无展示项目',

            };
        },

        methods: {
            formatComment(comments) {
                let commentAll = "";
                for(let i = 0; i < comments.length - 1; i++)
                {
                    commentAll += comments[i];
                }
                return commentAll;
            },
            onUploadSuccess(res, file) {
                var filePath = res.data;
                this.addTask(filePath);
            },
            handleSizeChange(size) {
                this.pageSize = size
                this.getExtractsPage();
            },

            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.getExtractsPage();
            },

            getTaskStatus() {
                this.$http.get("/api/tool/meta/task/" + this.task_id).then(response => {
                    if (response.data.meta_status == 2) {
                        this.getResult();
                        clearInterval(this.interval);
                    }
                });
            },

            addTask(filePath) {
                this.$http.post("/api/tool/meta?filePath=" + filePath + "&userId=" + this.user_id,
                    {emulateJSON: true}).then(response => {
                    if (response.data.status == 1) {
                        this.$message({
                            message: '新建任务成功！',
                            type: 'success',
                            customClass: 'ljqc-message'
                        });
                        this.task_id = response.data.data;
                        this.getExtractsPage();
                        this.getTaskStatus();
                    }
                });
            },

            getResult(taskid, zippath) {
                this.$http.get("/api/tool/meta/task/result/" + taskid).then(response => {
                    this.result = response.data;
                    this.relies = this.result.projectMetaInfo.libraryRequires;
                    this.classes = this.result.projectMetaInfo.fileMetaInfos;
                    this.resources = this.result.projectMetaInfo.resources;
                    this.filezippath = "项目路径为：" + zippath;
                    for (let i = 0; i < this.classes.length; i++)
                    {
                        this.classes[i].comments = this.formatComment(this.classes[i].comments);
                    }
                });
            },

            getUserLastTask() {
                this.$http.get("/api/tool/meta/task/user/" + this.user_id).then(response => {
                    if (response.data != null) {
                        this.task_id = response.data.id;
                        var path = response.data.zippath;
                        this.getResult(this.task_id, path);
                    }
                });
            },

            repository_pageChange(currentPage) {
                this.repository_count = this.relies.length;
                this.repository_page = currentPage;
                this.relies_paged = [];
                let start = 10 * (currentPage - 1);
                let end = 10 * (currentPage - 1) + 10;
                for (var i = start; i < end; i++) {
                    if (i == this.relies.length) {
                        return;
                    }
                    this.relies_paged.push(this.relies[i]);
                }
            },

            class_pageChange(currentPage) {
                this.class_count = this.classes.length;
                this.class_page = currentPage;
                this.class_paged = [];
                let start = 10 * (currentPage - 1);
                let end = 10 * (currentPage - 1) + 10;
                for (var i = start; i < end; i++) {
                    if (i == this.classes.length) {
                        return;
                    }
                    this.class_paged.push(this.classes[i]);
                }
            },

            res_pageChange(currentPage) {
                this.res_count = this.resources.length;
                this.res_page = currentPage;
                this.resources_paged = [];
                let start = 10 * (currentPage - 1);
                let end = 10 * (currentPage - 1) + 10;
                for (var i = start; i < end; i++) {
                    if (i == this.resources.length) {
                        return;
                    }
                    this.resources_paged.push(this.resources[i]);
                }
            },

            getExtractsPage() {
                this.$http.get('/api/tool/meta/tasks', {
                    params:
                        {
                            id: this.user_id,
                            pageNo: this.currentPage,
                            pageSize: this.pageSize,
                        }
                }).then(response => {
                    this.extracts = [];
                    this.extractTotal = response.data.totalElements;
                    this.extracts = response.data.content;
                });
            },

            deleteTask: function (id) {
                var msg = "您真的确定要删除该项目吗?";
                this.$confirm(msg, '提示', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get('/api/tool/meta/task/delete', {
                        params:
                            {
                                id: id,
                            }
                    }).then(response => {
                        console.info(response)
                        console.info(response.body.status)
                        this.$message({
                            showClose: true,
                            type: 'success',
                            message: '删除成功!',
                            customClass: 'ljqc-message'
                        });
                        this.getExtractsPage();
                    });
                });
            }
        },

        mounted: function () {
            if (localStorage.getItem('user') == null) {
                this.$router.push({path: '/login'});
            }
            this.user_id = JSON.parse(localStorage.getItem('user')).id;
            if (this.user_id == null) {
                this.$router.push({path: '/login'});
            }
            this.getExtractsPage();
            this.getUserLastTask();
            this.interval = setInterval(this.getExtractsPage, 10000);
        },

        watch: {
            relies() {
                this.repository_pageChange(1);
            },

            classes() {
                this.class_pageChange(1);
            },

            resources() {
                this.res_pageChange(1);
            }
        },

        beforeDestroy: function () {
            clearInterval(this.interval);
        }
    };

</script>

<style>
    .extract {
        height: 600px;
    }

    .el-icon-upload {
        padding-top: 100px;
    }

    html {
        width: 100%;
    }

    .el-upload-dragger {
        font-size: 28px;
        color: #8c939d;
        width: 35rem;
        height: 550px;
        text-align: center;
    }

    .el-upload-dragger {
        font-size: 28px;
        color: #8c939d;
        width: 100%;
        height: 550px;
        text-align: center;
    }

    .el-upload {
        display: block;
    }

    .el-tooltip__popper {
        max-width: 1000px;
    }
</style>
