<template>
    <div>
        <div
                v-loading="globalLoading"
                element-loading-text="正在添加..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <!--title top头-->
            <div class="permissManaTool">
                <el-input size="small" placeholder="请输入角色英文名..." v-model="role.name">
                    <template slot="prepend">ROLE_</template>
                </el-input>
                <el-input size="small" placeholder="请输入角色中文名..." v-model="role.nameZh"
                          @keydown.enter.native="doAddRole">
                </el-input>
                <el-button type="primary" size="small" @click="doAddRole">添加角色</el-button>
            </div>
            <!--权限组数据-->
            <div class="permissManaMain">
                <el-collapse v-model="activeName"
                             v-loading="loading"
                             element-loading-text="正在加载..."
                             element-loading-spinner="el-icon-loading"
                             element-loading-background="rgba(0, 0, 0, 0.8)"
                             accordion
                             @change="change">
                    <!--初始化角色roles类型-->
                    <el-collapse-item :title="r.nameZh" :name="r.id" :key="index" v-for="(r,index) in roles">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>可访问资源</span>
                                <el-button style="float: right; padding: 3px 0; color: #ff0000;" type="text"
                                           icon="el-icon-delete"></el-button>
                            </div>
                            <!--权限则  ref 指的是映射名称-->
                            <div>
                                <el-tree show-checkbox
                                         node-key="id"
                                         ref="tree"
                                         :default-checked-keys="selectedMenus"
                                         :data="allmenus"
                                         :props="defaultProps"></el-tree>
                                <el-button @click="doCancle">取消修改</el-button>
                                <el-button type="primary" @click="doUpdate(r.id,index)">确认修改</el-button>
                            </div>
                        </el-card>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PermissionManager",
        data() {
            return {
                role: {
                    name: '',
                    nameZh: ''
                },
                allmenus: [],
                activeName: -1,
                selectedMenus: [],
                roles: [],
                loading: false,
                globalLoading: false,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        mounted() {
            this.initRoles();
        },
        methods: {

            //进行添加角色
            doAddRole(){
                //name和namezh不能为空
                if (this.role.name && this.role.nameZh){
                    this.globalLoading=true;
                    this.postRequest("/system/basic/permission/role",this.role).then(resp=>{
                        this.glothbalLoading=false;
                        if (resp){
                            this.role.nameZh='';
                            this.role.name='';
                            //初始化角色
                            this.initRoles();
                        }
                    })
                }
            },
            doCancle(){
              this.activeName=-1;
            },
            //进行修改操作
            doUpdate(rid,index){
                console.log(rid)
                //获取当前角色的tree index
                let tree=this.$refs.tree[index]
                //只返回被选中的叶子结点
                let selectKey=tree.getCheckedKeys(true);
                console.log("所选中的key"+selectKey)

                //进行请求更新数据
                let url='/system/basic/permission/?rid='+rid
                selectKey.forEach(key=>{
                    url+="&mids="+key
                })
                this.putRequest(url).then(resp=>{
                        if (resp){
                            this.activeName=-1
                        }
                })

            },
            //初始化菜单
            initAllMenus() {
                this.getRequest("/system/basic/permission/menus").then(resp => {
                    if (resp) {
                        //将menus值赋给allmenus
                        this.allmenus = resp
                    }
                })
            },
            //初始化所选的菜单选项
            initSelectedMenus(rid) {
                this.getRequest("/system/basic/permission/menus/" + rid).then(resp => {
                    //请求成功
                    if (resp) {
                        this.selectedMenus = resp;
                    }
                })
            },
            //折叠板change触发事件
            change(rid) {
                //rid存在
                if (rid) {
                    //初始化菜单
                    this.initAllMenus();
                    //初始化所选的菜单
                    this.initSelectedMenus(rid);
                }
            },


            //初始化角色名称
            initRoles() {
                this.loading = true;
                this.getRequest("/system/basic/permission/roles").then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.roles = resp;
                    }
                })
            }
        }
    }
</script>

<style>
    .permissManaTool {
        display: flex;
        justify-content: flex-start;
    }

    .permissManaTool .el-input {
        width: 300px;
        margin-right: 6px;
    }

    .permissManaMain {
        margin-top: 10px;
        width: 700px;
    }
</style>
