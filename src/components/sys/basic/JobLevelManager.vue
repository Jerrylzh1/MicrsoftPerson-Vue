<template>
    <div>
        <div>
            <el-input
                    placeholder="添加职称"
                    prefix-icon="el-icon-plus"
                    size="medium"
                    class="inputJob"
                    v-model="job.name"
                    @keydown.enter.native="addJob">
            </el-input>
            <el-select v-model="job.titleLevel" clearable placeholder="职称等级" size="medium"
                       style="margin-left: 5px;margin-right: 5px">
                <el-option
                        v-for="item in jobOptions"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
            <el-button icon="el-icon-plus" size="small" type="primary" @click="addJob">添加</el-button>
        </div>
        <div style="margin-top: 10px">
            <el-table
                    :data="jobData"
                    border
                    stripe
                    size="small"
                    style="width: 80%"
                    @selection-change="SelectJob"
            >
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职称名称"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        prop="titleLevel"
                        label="职称级别"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        label="是否启用">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
                        <el-tag type="danger" v-else>未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        prop="operation"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" size="small" style="margin-top: 5px" :disabled="multipleSelection.length==0"
                       @click="doBatchDelete">批量删除
            </el-button>
        </div>
        <!--显示修改内容-->
        <el-dialog
                title="修改职称"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <table class="tableMargin">
                    <tr>
                        <td>
                            <el-tag>职称名称</el-tag>
                        </td>
                        <td>
                            <el-input size="small" v-model="updateJob.name"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-tag>职称级别</el-tag>
                        </td>
                        <td>
                            <el-select v-model="updateJob.titleLevel" clearable  placeholder="职称等级" size="small"
                                    >
                                <el-option
                                        v-for="item in jobOptions"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-tag>是否启用</el-tag>
                        </td>
                        <td>
                            <el-switch
                                    v-model="updateJob.enabled"
                                    active-text="启用"
                                    inactive-text="禁用">
                            </el-switch>
                        </td>
                    </tr>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "JobLevelManager",
        data() {
            return {
                job: {
                    name: '',
                    titleLevel: ''
                },
                updateJob:{
                    id:'',
                    name: '',
                    titleLevel: '',
                    enabled:''
                },
                jobOptions: [
                    // '正高级',
                    // '副高级',
                    // '中级',
                    // '初级',
                    // '员级',
                ],
                jobData: [],
                multipleSelection: [],
                //编辑悬浮框
                dialogVisible: false,
                updateOptions:[]
            }
        },
        methods: {
            //进行更新
            doUpdate(){
                this.putRequest('/system/basic/job/',this.updateJob).then(resp=>{
                    if (resp){
                        //更新table
                        this.initTable();
                        this.dialogVisible=false;
                    }
                })
            },
            handleEdit(index, row) {
                console.log(index, row);
                //this.updatePos=row;
                //拷贝属性值
                Object.assign(this.updateJob, row);
                console.log(this.job)
                this.dialogVisible = true;
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('此操作将永久删除['+this.multipleSelection.name+']条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //进行删除操作
                    this.deleteRequest('/system/basic/job/'+row.id).then(resp=>{
                        if (resp){
                            this.initTable();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            SelectJob(val) {
                this.multipleSelection = val;
            },
            //新增Job
            addJob() {
                if (this.job.name && this.job.titleLevel) {
                    this.postRequest("/system/basic/job", this.job).then(resp => {
                        if (resp) {
                            this.initTable();
                            this.job={
                                name: '',
                                titleLevel: ''
                            }
                        }
                    })
                } else {
                    this.$message.error("添加字段不能为空！");
                }

            },
            //批量删除
            doBatchDelete() {
                this.$confirm('此操作将永久删除【' + this.multipleSelection.length + '】条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // let ids = '?';
                    // this.multipleSelection.forEach(item => {
                    //     ids += 'ids=' + item.id + '&';
                    // })
                    let ids=this.multipleSelection.map(item=>item.id).toString();
                    console.log(ids)
                    this.deleteRequest("/system/basic/job/",{ids:ids}).then(resp => {
                        if (resp) {
                            this.initTable();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //初始化select下拉框选项
            initSelect() {
                this.getRequest("/system/basic/job/jobLevel").then(resp => {
                    if (resp) {
                        this.jobOptions = resp;
                    }
                })
            },
            //初始化Table数据信息
            initTable() {
                this.getRequest("/system/basic/job").then(resp => {
                    if (resp) {
                        this.jobData = resp;
                    }
                })
            }
        },
        mounted() {
            this.initSelect();
            this.initTable();
        }
    }
</script>

<style>
    .inputJob {
        width: 300px;
    }
    .tableMargin tr {
        margin: 10px;
        display: block;
        margin: 10px;
    }
</style>
