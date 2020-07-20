<template>
    <div>
        <div>
            <el-input
                    size="small"
                    class="addPosInput"
                    placeholder="添加职位..."
                    prefix-icon="el-icon-plus"
                    v-model="pos.name"
                    @keydown.enter.native="addPosition">
            </el-input>
            <el-button icon="el-icon-plus" size="small" type="primary" @click="addPosition"></el-button>
        </div>
        <div class="posMain">
            <el-table
                    highlight-current-row
                    :data="positions"
                    border
                    stripe
                    style="width: 80%"
                    @selection-change="handleSelectionChange"
                    size="small">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职位名称"
                >
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间"
                >
                </el-table-column>
                <el-table-column
                        label="是否启用"
                >
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
                        <el-tag type="danger" v-else>未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" size="small" style="margin-top: 8px" :disabled="multipleSelection.length==0"
                       @click="deleteMay">批量删除
            </el-button>
        </div>
        <el-dialog
                title="修改岗位"
                :visible.sync="dialogVisible"
                width="30%">
            <table>
                <tr>
                    <td>
                        <el-tag>职位名称</el-tag>
                    </td>
                    <td>
                        <el-input size="small" class="updateInput" v-model="updatePos.name"></el-input>
                    </td>

                </tr>
                <tr>
                    <td>
                        <el-tag>是否启用</el-tag>
                    </td>
                    <td>
                        <el-switch
                                v-model="updatePos.enabled"
                                active-text="启用"
                                inactive-text="禁用">
                        </el-switch>
                    </td>
                </tr>
            </table>

            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doUpdate">确 定</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "PosManager",
        data() {
            return {
                pos: {
                    name: ''
                },
                dialogVisible: false,
                updatePos: {
                    name: '',
                    enabled:''
                },
                positions: [],
                multipleSelection: [],
                ids: []
            }
        },
        methods: {
            //批量删除数据
            deleteMay() {
                this.$confirm('此操作将永久删除[' + this.multipleSelection.length + ']条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log("进行删除######");
                    let ids = '?';
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    });
                    //let ids = this.multipleSelection.map(item=>item.id).toString();
                    console.log("进行删除######33" + ids);
                    this.deleteRequest("/system/basic/pos/" + ids).then(resp => {
                        if (resp) {
                            this.initPositions();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //选中的行数
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)
            },
            addPosition() {
                //判断一下添加职位是否有值
                if (this.pos.name) {
                    this.postRequest("/system/basic/pos", this.pos).then(resp => {
                        //添加成功
                        if (resp) {
                            //刷新表格
                            this.initPositions();
                            this.pos.name = '';
                        }
                    })
                } else {
                    this.$message.error('职位名称不可以为空')
                }
            },
            //编辑
            showEdit(index, row) {
                console.log(index, row);
                //this.updatePos=row;
                //拷贝属性值
                Object.assign(this.updatePos, row);
                console.log(this.updatePos)
                this.dialogVisible = true;
            },
            //删除
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除[' + row.name + ']职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //进行删除操作
                    this.deleteRequest("/system/basic/pos/" + row.id).then(resp => {
                        //删除成功刷新表格
                        if (resp) {
                            this.initPositions();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //进行更新数据
            doUpdate() {
                this.putRequest("/system/basic/pos", this.updatePos).then(resp => {
                    //进行更新请求操作 刷新表格
                    if (resp) {
                        this.initPositions();
                    }
                })
            },
            //初始化position数据
            initPositions() {
                this.getRequest("/system/basic/pos").then(resp => {
                    //resp存在即为请求成功
                    if (resp) {
                        //将获取的结果集赋值给position
                        this.positions = resp;
                        this.updatePos.name = '';
                        this.dialogVisible = false;
                    }
                })
            },

        },
        mounted() {
            this.initPositions();
        }
        // //页面加载时初始化position数据
        // created() {
        //     this.getRequest("/system/basic/pos").then(resp => {
        //         //resp存在即为请求成功
        //         if (resp) {
        //             //将获取的结果集赋值给position
        //             this.position = resp;
        //         }
        //     })
        // }
    }
</script>

<style>
    .addPosInput {
        width: 300px;
        margin-right: 8px
    }

    .updateInput {
        width: 200px;
        margin-left: 3px;
    }

    .posMain {
        margin-top: 10px;
    }
</style>
