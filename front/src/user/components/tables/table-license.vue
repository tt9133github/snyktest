<style>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

</style>
<template>
    <el-table :data="data" style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
                <p v-if="props.row.details.project_list.length!=0">
                    <a>许可证定位详情</a>
                </p>
                <el-table :data="props.row.details.project_list" style="width: 100%" border
                          v-if="props.row.details.project_list.length!=0">
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column label="组件名称" prop="project_name" width="150"></el-table-column>
                    <el-table-column label="来源" prop="project_url"></el-table-column>
                    <!-- <el-table-column label="文件定位" prop="location"></el-table-column>
                    -->
                </el-table>
                <br>
                <p v-if="props.row.details.conflict_license.length!=0">
                    <a>许可证冲突详情</a>
                </p>
                <el-table :data="props.row.details.conflict_license" style="width: 100%" border
                          v-if="props.row.details.conflict_license.length!=0">
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column label="冲突License" prop="name" width="150"></el-table-column>
                    <el-table-column label="描述" prop="conflict_desc"></el-table-column>
                </el-table>
            </template>
        </el-table-column>
        <el-table-column label="许可证名称" prop="license"></el-table-column>
        <el-table-column label="类型" prop="self_type">
            <template slot-scope="scope">
                <span v-if="scope.row.self_type==''">&nbsp;&nbsp;暂无分类&nbsp;&nbsp;</span>
                <span v-if="scope.row.self_type!=''">{{scope.row.self_type}}</span>
            </template>
        </el-table-column>
        <el-table-column label="冲突情况" prop="conflict">
            <template slot-scope="scope">
                <el-tag type="info" v-if="scope.row.conflict==0">&nbsp;&nbsp;无冲突&nbsp;&nbsp;</el-tag>
                <el-tag type="warning" v-if="scope.row.conflict==1">条件兼容</el-tag>
                <el-tag type="danger" v-if="scope.row.conflict==2">&nbsp;&nbsp;不兼容&nbsp;&nbsp;</el-tag>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
    export default {
        props: ['data']
    }

</script>
